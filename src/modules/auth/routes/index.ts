import { resolve } from "pathe";

const authRoutes = [
  {
    name: "login",
    path: "/login",
    file: resolve(__dirname, "../pages/LoginPage.vue"),
  },

  {
    name: "forgetpassword",
    path: "/forgetpassword",
    file: resolve(__dirname, "../pages/ForgetPassword.vue"),
  },

  {
    name: "forget-password-for-tenant",
    path: "/forget-password",
    file: resolve(__dirname, "../pages/ForgetPasswordForTenant.vue"),
  },

  {
    name: "checkemail",
    path: "/checkemail",
    file: resolve(__dirname, "../pages/CheckingEmail.vue"),
  },

  {
    name: "tenant-reset-password",
    path: "/tenant/reset-password",
    file: resolve(__dirname, "../pages/TenantResetPassword.vue"),
  },

  {
    name: "terms",
    path: "/terms-conditions",
    file: resolve(__dirname, "../pages/Terms.vue"),
  },

  {
    name: "faqs",
    path: "/faqs",
    file: resolve(__dirname, "../pages/Faqs.vue"),
  },

  {
    name: "verifyEmail",
    path: "/verify-email",
    file: resolve(__dirname, "../pages/VerifyEmail.vue"),
  },

  {
    name: "signup",
    path: "/signup",
    file: resolve(__dirname, "../pages/RegisterPage.vue"),
  },

  {
    name: "signup-volunteer",
    path: "/signup-volunteer",
    file: resolve(__dirname, "../pages/RegisterCharity.vue"),
  },

  {
    name: "signup-donor",
    path: "/signup-donor",
    file: resolve(__dirname, "../pages/RegisterDonor.vue"),
  },

  {
    name: "create-tenant",
    path: "/create/website",
    file: resolve(__dirname, "../pages/CreateTenant.vue"),
  },
  {
    path: "/create-site",
    redirect: "/create/website",
  },

  {
    name: "pending",
    path: "/pending",
    file: resolve(__dirname, "../pages/PendingPage.vue"),
  },
  {
    name: "google-callback",
    path: "/google/callback",
    file: resolve(__dirname, "../pages/GoogleCallback.vue"),
  },
  {
    name: "google",
    path: "/google",
    file: resolve(__dirname, "../pages/Google.vue"),
  },
];

export default authRoutes;
