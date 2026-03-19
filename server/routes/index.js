import homeRouter from "../modules/home/home.routes.js";
import diagnosticsRouter from "../modules/diagnostics/diagnostics.routes.js";
import usersRouter from "../modules/users/users.routes.js";

const domainRoutes = [
  { basePath: "/", router: homeRouter },
  { basePath: "/users", router: usersRouter },
  {
    basePath: "/",
    router: diagnosticsRouter,
    enabled: process.env.NODE_ENV !== "production",
  },
];

export function addRoutes(app) {
  for (const { basePath, router, enabled = true } of domainRoutes) {
    if (!enabled) continue;
    app.use(basePath, router);
  }
}
