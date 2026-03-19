import homeRouter from "../modules/home/home.routes.js";
import diagnosticsRouter from "../modules/diagnostics/diagnostics.routes.js";
import usersRouter from "../modules/users/users.routes.js";

export function addRoutes(app) {
  app.use("/", homeRouter);
  app.use("/users", usersRouter);

  if (process.env.NODE_ENV !== "production") {
    app.use("/", diagnosticsRouter);
  }
}