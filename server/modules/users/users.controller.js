import { listUsers } from "./users.service.js";

export function getUsers(req, res) {
  const users = listUsers();
  res.json({ data: users });
}
