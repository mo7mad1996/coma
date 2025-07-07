import homeRoutes from "~/modules/home/routes";
import aboutRoutes from "~/modules/about/routes";
import authRoutes from "~/modules/auth/routes";
import blogsRoutes from "~/modules/blogs/routes";
import campaignsRoutes from "~/modules/campaigns/routes";
import charityRoutes from "~/modules/charity/routes";
import contactRoutes from "~/modules/contact/routes";
import dashboardDonorRoutes from "~/modules/donor/routes";
import storiesRoutes from "~/modules/stories/routes";
import videosRoutes from "~/modules/videos/routes";
import dashboardRoutes from "~/modules/dashboard/routes";

export default [
  ...dashboardRoutes,
  ...homeRoutes,
  ...aboutRoutes,
  ...contactRoutes,
  ...campaignsRoutes,
  ...authRoutes,
  ...blogsRoutes,
  ...storiesRoutes,
  ...charityRoutes,
  ...dashboardDonorRoutes,
  ...videosRoutes,
];
