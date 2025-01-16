const jwt = require("jsonwebtoken");
const url = require("url");

// this is the signing key that Metabase provides in settings->admin->auth->JWT, which is used to sign the JWT token for interactive embedding
const JWT_SIGNING_KEY_INTERACTIVE_EMBEDDING = process.env.JWT_SIGNING_KEY_INTERACTIVE_EMBEDDING;
// this is the signing key that Metabase provides in settings->embedding->static embedding, which is used to sign the JWT token for static embedding, see that the key is different from the one used for interactive embedding
const JWT_SIGNING_KEY_STATIC_EMBEDDING = process.env.JWT_SIGNING_KEY_STATIC_EMBEDDING;
const METABASE_URL = process.env.METABASE_URL;

// this is the user that will be used to SSO and signed with the interactive embedding signing key for interactive embedding
const user = {
    email: "someone@somedomain.com",
    first_name: "Someone",
    last_name: "Somebody",
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // this is the expiration time for the token, in this case, it's 1 hour
    groups: ["viewer"], // groups property is optional, we're sending this to show how you can configure group mappings in Metabase
}

// this is where we sign the user token with the interactive embedding signing key
const signUserToken = user =>
    jwt.sign(
      {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        exp: user.exp,
      },
      JWT_SIGNING_KEY_INTERACTIVE_EMBEDDING
    );

// this is where we sign the static embedded dashboard with the static embedding signing key. We're using the dashboard id as the resource, and an empty object as the params, but the params object can be used to pass fixed filter values to the dashboard
const signStaticEmbeddedDashboard = dashboard_id => {
    return jwt.sign({
        resource: { dashboard: dashboard_id },
        params: {},
    }, 
    JWT_SIGNING_KEY_STATIC_EMBEDDING);
}

const server = Bun.serve({
    port: 9090,
    async fetch(req) {
        const reqUrl = new URL(req.url);
        const path = reqUrl.pathname;
        const params = reqUrl.searchParams;
        switch (path) {
            case '/api/health': // health check endpoint to make the frontend aware that the backend is running. It's not checking for anything at all, just returning a 200 status code
                return new Response(null, { status: 200 });
            case '/api/static': // this is the endpoint that the frontend will call to get the static embedded dashboard URL
                return Response.redirect(
                    url.format({
                        pathname: `${METABASE_URL}/embed/dashboard/${signStaticEmbeddedDashboard(1)}`, // dashboard id is always gonna be 1 for this example, as we're just generating 1 dashboard only
                    })
                    , 301);
            case '/api/auth': // this is the endpoint that the frontend will call to get the SSO URL
                return Response.redirect(
                    url.format({
                        pathname: `${METABASE_URL}/auth/sso`,
                        query: {
                            jwt: signUserToken(user),
                            return_to: params.get('return_to'),
                            // you can also include more parameters to customize the features you want to expose: https://www.metabase.com/docs/latest/embedding/interactive-embedding#showing-or-hiding-metabase-ui-components
                        },
                    }),
                    301);
            case '/api/sdk': // this is the endpoint that the frontend will call to get the session token with the SDK, it could have been done in the previous endpoint, but it's just here separated for clarity
                let token = await fetch(`http://metabase:3000/auth/sso?token=true&jwt=${signUserToken(user)}`); // check that we're using the Metabase container URL here instead of localhost, since the API call here is server to server to get the session token rather than a pure FE call like it's on the interactive embedding SSO endpoint
                token = await token.json();
                return Response.json(token, 
                    { 
                        headers: {
                            'Access-Control-Allow-Origin': 'http://localhost:8080',
                            'Access-Control-Allow-Credentials': 'true',
                            'Access-Control-Allow-Methods': 'GET'
                        } 
                    });
            default:
                return new Response(null, { status: 404 });
        }
    },
});

console.log(`Backend running on ${server.url}:${server.port}`);