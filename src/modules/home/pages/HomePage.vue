<template>
  <HomeSlider :slideshows="slideshows" :status="slideshowsStatus" />
  <!-- <HomeHeroSection /> -->
  <HomeStatisticsSection :statistics="statistics" :status="statisticsStatus" />
  <HomeCompletedCampaigns
    v-if="completedCampaigns"
    :completedCampaigns="completedCampaigns"
    :status="completedCampaignsStatus"
  />
  <HomeSixCampaigns
    v-if="!tenant_name"
    :campaigns="sixCampaigns"
    :status="sixCampaignsStatus"
  />

  <HomeCampaignSectionCampaignSlider
    v-if="latestCampaigns?.length"
    sectionName="home.latest_campaigns"
    :campaigns="latestCampaigns"
    :status="campaignsLatestStatus"
  />

  <HomeFeaturedVideosSection
    v-if="videos?.length"
    :videos="videos"
    :status="videosStatus"
  />

  <HomeCampaignSectionCampaignSlider
    v-if="publicCampaigns?.length"
    sectionName="home.public_campaigns"
    :campaigns="publicCampaigns"
    :status="publicCampaignsStatus"
  />

  <HomeTrustedPartners
    v-if="Parteners?.length"
    :partners="Parteners"
    :status="partnersStatus"
  />
  <HomeSuccessStories
    v-if="stories?.length"
    :stories="stories"
    :status="storiesStatus"
  />
  <HomeLatestBlogsSection
    v-if="blogs?.length"
    :blogs="blogs"
    :status="blogsStatus"
  />
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";
import { useSlideshows } from "~/modules/home/services/slideshows";
import { useCompletedCampaigns } from "~/modules/home/services/completedCampaigns";
import { useBlogs } from "~/modules/blogs/services/blogs";
import { useSixCampaigns } from "~/modules/campaigns/services/sixCampaigns";
import { usePublicCampaigns } from "~/modules/campaigns/services/public-campaigns";
import { useCampaigns } from "~/modules/campaigns/services/campaigns";
import { useLatestCampaigns } from "~/modules/campaigns/services/latest-campaigns";
import { useParteners } from "~/modules/home/services/parteners";
import { useStatistics } from "~/modules/home/services/statistics";
import { useStories } from "~/modules/stories/services/stories";
import { useVideos } from "~/modules/videos/services/videos";
import { useTenant } from "~/helpers/tenant";

const { siteName, tenant } = useGlobalVar();
siteName("home.page_title_home");

const { tenant_name } = useTenant();

const { slideshows, status: slideshowsStatus } = useSlideshows();
const { sixCampaigns, status: sixCampaignsStatus } = useSixCampaigns();
const { completedCampaigns, status: completedCampaignsStatus } =
  useCompletedCampaigns();
const { statistics, status: statisticsStatus } = useStatistics();
// const { campaigns, status: campaignsStatus } = useCampaigns();
const { publicCampaigns, status: publicCampaignsStatus } = usePublicCampaigns();
const { latestCampaigns, status: campaignsLatestStatus } = useLatestCampaigns();
const { videos, status: videosStatus } = useVideos();
const { Parteners, status: partnersStatus } = useParteners();
const { stories, status: storiesStatus } = useStories();
const { blogs, status: blogsStatus } = useBlogs();
</script>
