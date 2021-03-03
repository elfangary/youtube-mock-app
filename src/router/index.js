import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import VideoDetails from "@/views/VideoDetails.vue";

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
