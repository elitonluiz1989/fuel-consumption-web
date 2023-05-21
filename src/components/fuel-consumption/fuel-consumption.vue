<script setup lang="ts">
import { onMounted } from "vue";
import { FuelConsumptionApiService } from "./fuel-consumption-api.service";
import FuelConsumptionCard from "./card/fuel-consumption-card.vue";
import { useState } from "@/state/state";

const state = useState();
const messagenoRecords = "No records.";

onMounted(
  async () => (state.value.records = await FuelConsumptionApiService.list())
);
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center justify-content-md-evenly">
      <template v-if="state.records.length > 0">
        <div
          class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3"
          v-for="(record, index) in state.records"
          :key="index"
        >
          <FuelConsumptionCard :record="record" />
        </div>
      </template>

      <div class="col-12" v-else>
        <p class="text-center py-3">{{ messagenoRecords }}</p>
      </div>
    </div>
  </div>
</template>
