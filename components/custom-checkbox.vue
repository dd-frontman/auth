<template>
  <label class="flex items-center cursor-pointer relative">
    <input v-model="computedValue" type="checkbox" class="hidden" />
    <span
      class="w-5 h-5 border-2 border-regal-light-blue bg-white rounded transition duration-150 flex justify-center align-middle"
    >
      <span
        class="text--regal-light-blue"
        v-show="computedValue"
        v-text="'✔'"
      />
    </span>
    <span class="ml-2">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = defineProps({
  modelValue: Boolean,
});

const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get: () => modelValue!.value,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>
