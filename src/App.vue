<script setup lang="ts">
import TheHeader from "./components/layout/the-header.vue";
import TheContent from "./components/layout/the-content.vue";
</script>

<template>
  <main class="container-fluid">
    <TheHeader />

    <TheContent />
  </main>
</template>

<style lang="scss">
@import "./assets/scss/_variables.scss";

.header__title {
  color: $gray;
}

.content {
  min-height: 25rem;
  background-color: $gray;
}
</style>
