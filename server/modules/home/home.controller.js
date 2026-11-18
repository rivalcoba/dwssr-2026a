import { getHomeViewModel } from "./home.service.js";

export const about = (req, res) => {
  res.send("⚠️ UNDER CONSTRUCTION: GET /about ⚠️");
}

export const renderHome = (req, res) => {
  const viewModel = getHomeViewModel();
  res.render("home/index", viewModel);
}