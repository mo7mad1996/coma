import { resolve } from "pathe";

const dashboardDonorRoutes = [
  {
    name: "donor",
    path: "/dashboard/donor",
    file: resolve(__dirname, "../pages/Dashboard.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "donor-statistics",
    path: "/dashboard/donor/statistics",
    file: resolve(__dirname, "../pages/Statistics.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "donor-cart",
    path: "/dashboard/donor/cart",
    file: resolve(__dirname, "../pages/Cart.vue"), // Adjusted path
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "donor-donations-cart",
    path: "/dashboard/donor/donations-cart",
    file: resolve(__dirname, "../pages/DonationCart.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "donor-campaigns",
    path: "/dashboard/donor/campaigns-history",
    file: resolve(__dirname, "../pages/CampaignHistory.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "donor-donation-history",
    path: "/dashboard/donor/donation-history",
    file: resolve(__dirname, "../pages/DonationHistory.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "donor-notification",
    path: "/dashboard/donor/notification",
    file: resolve(__dirname, "../pages/Notifications.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "sponsored-list",
    path: "/dashboard/donor/sponsored",
    file: resolve(__dirname, "../pages/sponsored.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "sponsored-item-page",
    path: "/dashboard/donor/sponsored/:id",
    file: resolve(__dirname, "../pages/sponsored_id.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
  {
    name: "donor-settings",
    path: "/dashboard/donor/settings",
    file: resolve(__dirname, "../pages/Setting.vue"),
    meta: { middleware: ["require-auth", "only-donor", "valid-user"] },
  },
];

export default dashboardDonorRoutes;
