import { computed, ComputedRef } from "vue";

interface Input {
  value: string | string[] | number | number[];
}

export default function useValidation(inputs: Input[]): {
  isFormValid: ComputedRef<boolean>;
} {
  const isValidValue = (value: string | number): boolean => {
    return (
      (typeof value === "string" && value.trim() !== "") ||
      typeof value === "number"
    );
  };

  const isValidArray = (array: (string | number)[]): boolean => {
    return array.every(isValidValue);
  };

  const isFormValid = computed(() => {
    return inputs.every((input) => {
      if (Array.isArray(input.value)) {
        return isValidArray(input.value);
      } else {
        return isValidValue(input.value);
      }
    });
  });

  return { isFormValid };
}
