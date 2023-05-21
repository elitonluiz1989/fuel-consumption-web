<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";

type FuelConsumptionCardItemProps = {
  description: string;
  value: any;
  tableCell?: boolean;
};

const props = withDefaults(defineProps<FuelConsumptionCardItemProps>(), {
  tableCell: false,
});

const containerStyle = computed(() => ({
  "d-flex flex-column flex-fill": props.tableCell,
  "d-flex flex-column": props.tableCell === false,
}));
const descriptionStyle = computed(() => ({
  "cell-header fw-bolder text-center": props.tableCell,
  "fw-bolder text-center": props.tableCell === false,
}));
const valueStyle = computed(() => ({
  "cell-content text-center bg-white": props.tableCell,
  "text-center": props.tableCell === false,
}));
</script>

<template>
  <div :class="containerStyle">
    <div :class="descriptionStyle">{{ props.description }}</div>
    <div :class="valueStyle">{{ props.value }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.cell-header {
  background-color: $gray-dark;
}

.cell-content {
  border-width: 0 1px 1px;
  border-style: solid;
  border-color: $gray-dark;
}
</style>
