import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "~/store/auth.store";

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/otp" && !useAuthStore().isLoggedIn) {
    return navigateTo("/");
  }
});
