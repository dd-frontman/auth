<template>
  <label class="relative">
    <input
      class="w-full px-[50px] py-[20px] rounded-[10px] border-input-br border-2 text-lg leading-[1.5rem] mb-2.5 focus:ring-inset focus:ring-regal-gray focus:ring-[2px] focus:outline-none placeholder:capitalize placeholder:text-input-ph bg-input-bg bg-no-repeat bg-[left_13px_center] password"
      v-model="computedValue"
      :type="effectiveType"
      placeholder="Password"
    />
    <img
      class="absolute top-[-5px] right-[20px]"
      :src="effectiveIconPath"
      alt="eye"
      @click="passwordVisible = !passwordVisible"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import eye from "/assets/img/icons/eye.svg";
import eyeSlash from "/assets/img/icons/eye-slash.svg";

const props = defineProps({
  modelValue: [String, Number],
});

const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const passwordVisible = ref(false);

const effectiveType = computed(() => {
  return passwordVisible.value ? "text" : "password";
});

const effectiveIconPath = computed(() => {
  return passwordVisible.value ? eye : eyeSlash;
});

const computedValue = computed({
  get: () => modelValue!.value,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped></style>
