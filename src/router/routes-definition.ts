import { Route } from "./router";
import { routes } from "./routes";

const routes_definition: Route[] = [
  {
    path: routes.THIRD_PARTY_AUTHENTICATE({ domain: ":domain" }),
    loader: () => import("../pages/third-party/third-party-authenticate.page"),
  },
];

export default routes_definition;
