import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/router";
import routes_definition from "./router/routes-definition";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { purple } from "@ant-design/colors";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: purple[5],
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router routes={routes_definition} />
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
