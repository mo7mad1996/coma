import { resolve } from "pathe";

const dashboardRoutes = [
  // campaigns
  {
    name: "home-dashboard",
    path: "/dashboard/home",
    file: resolve(__dirname, "../pages/Dashboard.vue"),
    meta: {
      middleware: ["require-auth", "valid-user"],
      layout: "dashboard",
    },
  },
  {
    name: "more_campaigns",
    path: "/dashboard/campaigns",
    file: "~/modules/campaigns/pages/AllCampaigns.vue",
    meta: {
      middleware: ["require-auth", "valid-user"],
      layout: "dashboard",
    },
  },
  {
    name: "campaigns-create",
    path: "/dashboard/campaigns/create",
    file: resolve(__dirname, "../pages/campaigns/Create.vue"),
    meta: {
      middleware: ["require-auth", "valid-user", "only-beneficiary"],
      layout: "dashboard",
    },
  },
  {
    name: "campaigns-show",
    path: "/dashboard/campaigns/:id",
    file: resolve(__dirname, "../pages/campaigns/Show.vue"),
    meta: {
      middleware: ["require-auth", "valid-user", "only-beneficiary"],
      layout: "dashboard",
    },
  },
  {
    name: "campaigns-edit",
    path: "/dashboard/campaigns/:id/edit",
    file: resolve(__dirname, "../pages/campaigns/Edit.vue"),
    meta: {
      middleware: ["require-auth", "valid-user", "only-beneficiary"],
      layout: "dashboard",
    },
  },

  // orphans
  {
    name: "orphans",
    path: "/dashboard/orphans",
    file: resolve(__dirname, "../pages/orphans/View.vue"),
    meta: {
      middleware: ["require-auth", "valid-user", "only-beneficiary"],
      layout: "dashboard",
    },
  },
  {
    name: "orphans-create",
    path: "/dashboard/orphans/create",
    file: resolve(__dirname, "../pages/orphans/Create.vue"),
    meta: {
      middleware: ["require-auth", "valid-user", "only-beneficiary"],
      layout: "dashboard",
    },
  },
  {
    name: "orphans-show",
    path: "/dashboard/orphans/:id",
    file: resolve(__dirname, "../pages/orphans/Show.vue"),
    meta: {
      middleware: ["require-auth", "valid-user", "only-beneficiary"],
      layout: "dashboard",
    },
  },
  {
    name: "orphans-edit",
    path: "/dashboard/orphans/:id/edit",
    file: resolve(__dirname, "../pages/orphans/Edit.vue"),
    meta: {
      middleware: ["require-auth", "valid-user", "only-beneficiary"],
      layout: "dashboard",
    },
  },

  // settings
  {
    name: "dashboard-settings",
    path: "/dashboard/campaigns/settings",
    file: resolve(__dirname, "../pages/Settings.vue"),
    meta: {
      middleware: ["require-auth", "valid-user"],
      layout: "dashboard",
    },
  },
];

export default dashboardRoutes;
