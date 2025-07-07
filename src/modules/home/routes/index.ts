import { resolve } from "pathe";

const homeRoutes = [
  {
    name: "home",
    path: "/",
    file: resolve(__dirname, "../pages/HomePage.vue"), // Adjusted path
  },
  {
    name: "start-campaign",
    path: "/start-campaign",
    file: resolve(__dirname, "../pages/StartCampaign.vue"), // Adjusted path
  },

  // {
  //   name: "donate-all",
  //   path: "/donate/all",
  //   file: resolve(__dirname, "../pages/DonateAll.vue"), // Adjusted path
  // },
  {
    name: "sponsorship",
    path: "/sponsorship",
    file: resolve(__dirname, "../pages/Sponsorship.vue"), // Adjusted path
  },
  {
    name: "show-page",
    path: "/page/:id",
    file: resolve(__dirname, "../pages/showPage.vue"), // Adjusted path
  },
  {
    name: "not-allow",
    path: "/not-allow",
    file: resolve(__dirname, "../pages/NotAllow.vue"), // Adjusted path
  },
];

export default homeRoutes;
