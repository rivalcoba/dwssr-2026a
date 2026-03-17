import { getHomeViewModel } from "./home.service.js";

export function renderHome(req, res) {
  const viewModel = getHomeViewModel();
  res.render("index", viewModel);
}
