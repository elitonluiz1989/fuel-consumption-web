<script setup lang="ts">
import AppNotifications from "./components/notifications/app-notifications.vue";
import TheHeader from "@/components/layout/the-header.vue";
import TheContent from "@/components/layout/the-content.vue";
</script>

<template>
  <AppNotifications />

  <main class="container-fluid">
    <TheHeader />

    <TheContent />
  </main>
</template>
