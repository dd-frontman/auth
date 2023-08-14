<template>
  <Default
    leftTitle="Create your account"
    leftUnderTitle="Unlock all Features!"
    rightTitle="Join us!"
    rightUnderTitle="Just go through the boring process of creating an account."
    :rightImg="signUpGroup"
  >
    <template #left>
      <CustomInput
        v-model="username"
        type="text"
        placeholder="username"
        icon="username"
      />
      <CustomInput
        v-model="email"
        type="email"
        placeholder="email"
        icon="email"
      />
      <CustomPassword v-model="password" />
      <CustomPassword v-model="confirmPassword" />
      <CustomCheckbox v-model="isAgree" class="text-regal-gray">
        Accept
        <a
          href="/terms"
          class="text-regal-light-blue"
          @click.prevent="openTermsWindow"
        >
          terms and conditions
        </a>
      </CustomCheckbox>
      <CustomBtn
        :is-loading="isLoading"
        :is-form-valid="!isFormValid"
        class="mb-5 mt-[25px]"
        @click="signUp"
      >
        SIGN UP
      </CustomBtn>
      <p class="text-center">
        You have account?
        <NuxtLink to="/" class="font-bold text-regal-light-blue"
          >Login now
        </NuxtLink>
      </p>
    </template>
  </Default>
</template>
<script setup lang="ts">
import Default from "@/layouts/default.vue";
import CustomInput from "@/components/custom-input.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import CustomPassword from "@/components/custom-password.vue";
import CustomBtn from "@/components/custom-btn.vue";
import signUpGroup from "@/assets/img/signup-group.png";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import userData from "~/interfaces/userData";
import { useAuthStore } from "~/store/auth.store";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isLoading = ref(false);
const isAgree = ref(false);
const isDataChanged = computed(() => {
  return Boolean(
    username.value ||
      email.value ||
      password.value ||
      confirmPassword.value ||
      isAgree.value,
  );
});
const { setUserData } = useAuthStore();
const { isFormValid } = useValidation([
  username,
  email,
  password,
  confirmPassword,
]);

function openTermsWindow() {
  const windowFeatures =
    "width=600,height=400,menubar=no,toolbar=no,status=no,scrollbars=yes";
  window.open("/terms", "_blank", windowFeatures);
}

async function signUp() {
  isLoading.value = true;
  // должен быть signup
  await useFetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: email.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      const { error } = res;
      if (error.value)
        throw new Error(`UseFetch error: ${error.value?.data.message}`);

      const { data } = res;
      console.log("%c success registration: ", "background: green;");
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

onBeforeRouteLeave(() => {
  if (isDataChanged.value) {
    const confirmResult = window.confirm(
      "Your data may be lost. Are you sure you want to continue?",
    );

    if (confirmResult) {
      username.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      isAgree.value = false;
      return true;
    } else return false;
  }
  return true;
});
</script>
