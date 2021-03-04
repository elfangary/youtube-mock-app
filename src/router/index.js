import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import VideoDetails from "@/views/VideoDetails.vue";
import ChannelDetails from "@/views/ChannelDetails.vue";
import PlayListDetails from "@/views/PlayListDetails.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage
  },
  {
    path: "/video/:id",
    name: "VideoDetails",
    component: VideoDetails
  },
  {
    path: "/channel/:id",
    name: "ChannelDetails",
    component: ChannelDetails
  },
  {
    path: "/playlist/:id",
    name: "PlaylistDetails",
    component: PlayListDetails
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
