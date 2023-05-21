<script setup lang="ts">
import FuelConsumption from "@/components/fuel-consumption/fuel-consumption.vue";
</script>

<template>
  <div class="row justify-content-center">
    <div class="content col-11">
      <FuelConsumption />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

.content {
  min-height: 25rem;
}
</style>
