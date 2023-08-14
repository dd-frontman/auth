<template>
  <Default
    leftTitle="Login to your Account"
    leftUnderTitle="with email"
    rightTitle="Connect with any device."
    rightUnderTitle="Everything you need is an internet connection."
    :rightImg="loginGroup"
  >
    <template #left>
      <CustomInput
        v-model="email"
        type="email"
        placeholder="email"
        icon="email"
      />
      <CustomPassword
        v-model="password"
        type="password"
        placeholder="password"
        icon="password"
      />
      <CustomBtn
        :is-loading="isLoading"
        :is-form-valid="!isFormValid"
        class="mb-5"
        @click="login"
        @keyup.enter="login"
      >
        log in
      </CustomBtn>
      <p class="text-center text-base">
        Don’t have account?
        <NuxtLink to="/sign-up" class="font-bold text-regal-light-blue"
          >Create an account
        </NuxtLink>
      </p>
    </template>
  </Default>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import Default from "../layouts/default.vue";
import CustomInput from "../components/custom-input.vue";
import CustomBtn from "../components/custom-btn.vue";
import useValidation from "../composables/useValidation";
import userData from "@/interfaces/userData";
import loginGroup from "/assets/img/login-group.png";

const router = useRouter();
const { setUserData } = useAuthStore();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const { isFormValid } = useValidation([email, password]);

/**
 * тестовый вход
 * username: 'atuny0',
 * password: '9uQFF1Lh',
 */
function login() {
  isLoading.value = true;
  useFetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      const { error } = res;
      if (error.value) {
        throw new Error(`UseFetch error: ${error.value?.data.message}`);
      }

      const { data } = res;
      console.log("%c success auth: ", "background: green;");
      console.table(data.value);
      alert("success authentication");
      setUserData(data.value as userData);
      router.push({ path: "/otp" });
    })
    .catch((err) => {
      alert(err);
      console.error(err);
    })
    .finally(() => (isLoading.value = false));
}
</script>
