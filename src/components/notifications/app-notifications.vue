<script setup lang="ts">
import { useState } from "@/state/state";

const state = useState();

const closeNotification = (index: number) =>
  state.value.notifications.splice(index, 1);
</script>

<template>
  <div class="position-relative" v-if="state.notifications?.length > 0">
    <div class="notification-container position-absolute">
      <div
        class="d-flex justify-content-between align-items-center alert alert-danger mt-3 me-3"
        role="alert"
        v-for="(notification, index) in state.notifications"
        :key="index"
      >
        <div>{{ notification }}</div>

        <button
          type="button"
          class="fw-bolder border-0 bg-transparent ps-3"
          data-dismiss="alert"
          aria-label="Close"
          @click="closeNotification(index)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-container {
  right: 0;
  z-index: 99999;
}
</style>
