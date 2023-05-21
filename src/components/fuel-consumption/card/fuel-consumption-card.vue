<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { FuelConsumption } from "../fuel-consumption.model";
import FuelConsumptionCardItem from "./fuel-consumption-card-item.vue";
import FuelConsumptionCardAction from "./fuel-consumption-card-action.vue";
import FuelConsumptionCardForm from "./fuel-consumption-card-form.vue";
import { FuelConsumptionCardActionTypeEnum } from "./fuel-consumption-card-action-type.enum";
import {
  FuelConsumptionCardButtonActionType,
  FuelConsumptionCardFormActionType,
  FuelConsumptionCardFormProps,
} from "./fuel-consuption-card.types";
import { FuelConsumptionApiService } from "../fuel-consumption-api.service";
import { FuelConsumptionRecordHelper } from "./fuel-consumption-record.helper";

type FuelConsumptionCardProps = {
  record: FuelConsumption;
};

const buttonBarVisible = ref(true);
const formProps = ref<FuelConsumptionCardFormProps>();
const formLabel = ref("");
const formButtonText = ref("");
const formAction = ref<FuelConsumptionCardFormActionType>();

const props = defineProps<FuelConsumptionCardProps>();

const buttonBarStyles = computed(() => ({
  "d-flex justify-content-evenly fade show": buttonBarVisible.value,
  "d-flex justify-content-evenly fade": buttonBarVisible.value === false,
}));

const formStyles = computed(() => ({
  "fade show": buttonBarVisible.value === false,
  fade: buttonBarVisible.value,
}));

const buttonAction: FuelConsumptionCardButtonActionType = (
  action: FuelConsumptionCardActionTypeEnum
): void => {
  if (action === FuelConsumptionCardActionTypeEnum.Fuel) {
    formProps.value = FuelConsumptionRecordHelper.createFormProps(
      FuelConsumptionCardActionTypeEnum.Fuel,
      fuelAction,
      closeAction
    );
  } else {
    formProps.value = FuelConsumptionRecordHelper.createFormProps(
      FuelConsumptionCardActionTypeEnum.Run,
      runAction,
      closeAction
    );
  }

  buttonBarVisible.value = false;
};
const closeAction = () => (buttonBarVisible.value = true);
const fuelAction: FuelConsumptionCardFormActionType = async (
  input: string
): Promise<void> => {
  const dto = FuelConsumptionRecordHelper.createDto(
    props.record.serialNumber,
    input
  );

  if (!dto) return;

  const updatedRecord = await FuelConsumptionApiService.fuel(dto);

  if (!updatedRecord) return;

  FuelConsumptionRecordHelper.updateRecord(updatedRecord);

  buttonBarVisible.value = true;
};
const runAction: FuelConsumptionCardFormActionType = async (
  input: string
): Promise<void> => {
  const dto = FuelConsumptionRecordHelper.createDto(
    props.record.serialNumber,
    input
  );

  if (!dto) return;

  const updatedRecord = await FuelConsumptionApiService.run(dto);

  if (!updatedRecord) return;

  FuelConsumptionRecordHelper.updateRecord(updatedRecord);

  buttonBarVisible.value = true;
};
</script>

<template>
  <div class="card border-0 mt-2 p-3">
    <div class="d-flex justify-content-evenly mb-3">
      <FuelConsumptionCardItem
        description="Serial Number"
        :value="props.record.serialNumber"
      />

      <FuelConsumptionCardItem
        description="Owner"
        :value="props.record.owner"
      />
    </div>

    <div class="d-flex mb-3">
      <FuelConsumptionCardItem
        description="Capacity"
        :value="props.record.capacity"
        :table-cell="true"
      />

      <FuelConsumptionCardItem
        description="Refueled"
        :value="props.record.refueledLiters"
        :table-cell="true"
      />

      <FuelConsumptionCardItem
        description="Available"
        :value="props.record.availableCapacity"
        :table-cell="true"
      />
    </div>

    <div :class="buttonBarStyles" v-if="buttonBarVisible">
      <FuelConsumptionCardAction
        description="Fuel"
        :type="FuelConsumptionCardActionTypeEnum.Fuel"
        :action="buttonAction"
      />

      <FuelConsumptionCardAction
        description="Run"
        :type="FuelConsumptionCardActionTypeEnum.Run"
        :action="buttonAction"
        :close="closeAction"
      />
    </div>

    <div v-else>
      <FuelConsumptionCardForm
        :class="formStyles"
        :label="formLabel"
        :button-text="formButtonText"
        :action="formAction"
        :close="closeAction"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.card {
  background-color: $gray;
}
</style>
