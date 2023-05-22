<script setup lang="ts">
import { defineProps, ref } from "vue";
import { FuelConsumptionCardFormActionType } from "./fuel-consuption-card.types";
import { StringResource } from "@/StringResource";

type FuelConsumptionCardFormProps = {
  label: string;
  buttonText: string;
  action: FuelConsumptionCardFormActionType | undefined;
  close: () => void;
};

const inputValue = ref("");

const props = defineProps<FuelConsumptionCardFormProps>();

const formAction = (): void => {
  if (!props.action) return;

  props.action(inputValue.value);
};
const formClose = () => {
  inputValue.value = "";

  props.close();
};
</script>

<template>
  <form class="inline-form container-fluid">
    <div class="form-group row card border-0 p-3">
      <div class="col-12 text-center mb-3">
        <label class="text-white">{{ props.label }}</label>
      </div>

      <div class="col-12 d-flex flex-column justify-content-center">
        <div>
          <input
            type="number"
            class="form-control border-0 text-right"
            v-model="inputValue"
          />
        </div>

        <div class="d-flex justify-content-evenly mt-3">
          <button
            class="btn action bg-white fw-bold"
            @click.prevent="formAction"
          >
            {{ props.buttonText }}
          </button>

          <button
            class="btn close text-white border-white fw-bold"
            @click.prevent="formClose"
          >
            {{ StringResource.close }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.card {
  background-color: $red;

  .action {
    color: $red-dark;
  }

  .close {
    background-color: $red-dark;
  }
}
</style>
