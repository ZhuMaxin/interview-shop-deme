import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: '',
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: 'category/:id',
          component: () => import("@/views/Category/index.vue"),
        },
        {
          path: 'member',
          component: () => import("@/views/Member/index.vue"),
          children: [
            {
              path: '',
              component: () => import("@/views/Member/components/user.vue"),
            },
          ]
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
  ],
});

export default router;
