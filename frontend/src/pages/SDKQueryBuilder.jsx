import React from 'react';
import {
    MetabaseProvider,
    CreateQuestion,
    defineMetabaseAuthConfig,
    defineMetabaseTheme,
} from "@metabase/embedding-sdk-react";
  
const config = defineMetabaseAuthConfig({
    metabaseInstanceUrl: import.meta.env.VITE_METABASE_INSTANCE_URL,
    authProviderUri: import.meta.env.VITE_AUTH_PROVIDER_URI,
});

const theme = defineMetabaseTheme({
    fontFamily: "sans-serif",
    fontSize: "16px",
    lineHeight: 5,
    colors: {
      brand: "#1F2937",
      "text-primary": "#111827",
      "text-secondary": "#6B7280",
      "text-tertiary": "#9CA3AF",
      background: "#ffffff",
      "background-hover": "#E5E7EB",
      border: "#ffffff",
      filter: "#3B82F6",
      summarize: "#10B981",
      shadow: "rgba(0,0,0,0.0)",
    },
    components: {
      question: {
        backgroundColor: "#FFFFFF",
      },
      table: {
        cell: {
          textColor: "#374151",
          backgroundColor: "#FFFFFF",
        },
        idColumn: {
          textColor: "#1F2937",
          backgroundColor: "#E5E7EB",
        },
      },
    },
  });
  

const SDKQueryBuilder = () => {
  return (
    <div className="App" style={{ width: "1200px", height: "800px" }}>
        <div><p>This is the same dashboard being rendered natively on the application without any iframes. You can appreciate the difference in the speed of the rendering along the changes in the formatting that you can make. You can see more information about our SDK in this <a href='https://www.metabase.com/docs/latest/embedding/sdk/introduction' style={{ color: 'blue', textDecoration: 'underline' }}>link</a></p></div>
      <MetabaseProvider authConfig={config} theme={theme}>
        <CreateQuestion />
      </MetabaseProvider>
    </div>
  );
};

export default SDKQueryBuilder;