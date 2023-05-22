<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { FuelConsumptionCardButtonActionType } from "./fuel-consuption-card.types";
import { FuelConsumptionCardActionTypeEnum } from "./fuel-consumption-card-action-type.enum";

type FuelConsumptionCardActionProps = {
  description: string;
  type: FuelConsumptionCardActionTypeEnum;
  action: FuelConsumptionCardButtonActionType;
  disabled?: boolean;
};

const props = withDefaults(defineProps<FuelConsumptionCardActionProps>(), {
  disabled: false,
});
</script>

<template>
  <button
    class="btn fw-bold"
    @click="props.action(props.type)"
    :disabled="disabled"
  >
    {{ props.description }}
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.btn {
  border: 1px solid $red-dark;
  background-color: $red-dark;
  color: white;

  &:hover {
    background-color: white;
    color: $red-dark;
  }
}
</style>
