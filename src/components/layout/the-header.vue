<script setup lang="ts">
import { StringResource } from "@/StringResource";
</script>

<template>
  <header class="row justify-content-center pt-2 pb-4">
    <div class="col-12">
      <h1 class="header__title text-center">{{ StringResource.appTitle }}</h1>
    </div>
  </header>
</template>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

.header__title {
  color: $red;
}
</style>
