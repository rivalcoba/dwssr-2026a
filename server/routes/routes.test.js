import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Rutas home", () => {
  it.each(["/", "/home", "/index"])("GET %s renderiza la página", async (url) => {
    const res = await request(app).get(url);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
    expect(res.text).toContain("ProjNotes");
  });

  it("GET /about responde", async () => {
    const res = await request(app).get("/about");
    expect(res.status).toBe(200);
    expect(res.text).toContain("/about");
  });
});

describe("Rutas users", () => {
  it.each(["/users/login", "/users/logout", "/users/register"])(
    "GET %s responde 200",
    async (url) => {
      const res = await request(app).get(url);
      expect(res.status).toBe(200);
    },
  );

  it("GET /users devuelve JSON con data", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("data");
  });
});

describe("Rutas projects", () => {
  it.each(["/projects", "/projects/create"])("GET %s responde 200", async (url) => {
    const res = await request(app).get(url);
    expect(res.status).toBe(200);
  });
});

describe("Rutas inexistentes", () => {
  it("devuelve 404", async () => {
    const res = await request(app).get("/no-existe");
    expect(res.status).toBe(404);
  });
});
