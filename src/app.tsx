import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./router/router";
import routes_definition from "./router/routes-definition";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router routes={routes_definition} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
