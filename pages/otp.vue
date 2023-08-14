<template>
  <Default
    leftTitle="Enter OTP"
    leftUnderTitle="Sent OTP on"
    rightTitle="Join us!"
    rightUnderTitle="Just go through the boring process of creating an account."
    :rightImg="otpGroup"
    isOtp
  >
    <template #left>
      <div class="flex justify-between mx-auto mb-5">
        <CustomInput
          v-for="(field, index) in otpFields"
          :key="index"
          v-model="field.value"
          type="number"
          name="otp"
          maxlength="1"
          placeholder="-"
          :inputRef="(el) => setRef(index, el)"
          @keyup="moveToNextInput(index)"
        />
      </div>
      <CustomBtn :disabled="!isFormValid" class="mb-5" @click="sendOtp">
        SUBMIT
      </CustomBtn>
    </template>
  </Default>
</template>

<script setup lang="ts">
import Default from "@/layouts/default.vue";
import CustomInput from "@/components/custom-input.vue";
import CustomBtn from "@/components/custom-btn.vue";
import useValidation from "@/composables/useValidation";
import otpGroup from "@/assets/img/otp-group.png";
import { ref } from "vue";

definePageMeta({
  middleware: "check-otp-access",
  prerender: false,
});

const OTP_LENGTH = 6;
const otpFields = Array(OTP_LENGTH)
  .fill(null)
  .map(() => ref(""));
const otpFieldRefs = ref<HTMLElement[]>([]);
const { isFormValid } = useValidation(otpFields);
const isLoading = ref(false);

const setRef = (index: number, el: HTMLElement) =>
  (otpFieldRefs.value[index] = el);

function moveToNextInput(index: number) {
  const nextIndex = index + 1;
  const nextField = otpFieldRefs.value[nextIndex];

  if (nextIndex < OTP_LENGTH && nextField) {
    nextField.focus();
  }
}

async function sendOtp() {
  const otp = otpFields.map((field) => field.value).join("");

  isLoading.value = true;
  await useFetch("https://dummyjson.com/auth/otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: otp,
    }),
  })
    .then((res) => {
      const { error } = res;
      if (error.value) {
        throw new Error(`UseFetch error: ${error.value?.data.message}`);
      }

      const { data } = res;
      console.log("%c otp success: ", "background: green;");
      console.table(data.value);
      alert("otp success");
    })
    .catch((err) => console.error(err))
    .finally(() => (isLoading.value = false));
}
</script>
