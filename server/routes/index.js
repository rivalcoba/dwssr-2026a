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

function validateRouteConfig(config, index) {
  const { basePath, router, enabled } = config;

  if (typeof basePath !== "string" || basePath.length === 0) {
    throw new TypeError(`domainRoutes[${index}].basePath debe ser un string no vacío`);
  }

  if (typeof router !== "function") {
    throw new TypeError(`domainRoutes[${index}].router debe ser un router/middleware de Express`);
  }

  if (enabled !== undefined && typeof enabled !== "boolean") {
    throw new TypeError(`domainRoutes[${index}].enabled debe ser boolean cuando se define`);
  }
}

export function addRoutes(app) {
  for (const [index, route] of domainRoutes.entries()) {
    validateRouteConfig(route, index);

    const { basePath, router, enabled = true } = route;
    if (!enabled) continue;

    app.use(basePath, router);
  }
}