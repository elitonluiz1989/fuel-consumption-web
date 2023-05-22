<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from "vue";
import { FuelConsumption } from "../fuel-consumption.model";
import FuelConsumptionCardItem from "./fuel-consumption-card-item.vue";
import FuelConsumptionCardAction from "./fuel-consumption-card-action.vue";
import FuelConsumptionCardForm from "./fuel-consumption-card-form.vue";
import { FuelConsumptionCardActionTypeEnum } from "./fuel-consumption-card-action-type.enum";
import {
  FuelConsumptionCardButtonActionType,
  FuelConsumptionCardFormActionType,
} from "./fuel-consuption-card.types";
import { FuelConsumptionApiService } from "../fuel-consumption-api.service";
import { FuelConsumptionRecordHelper } from "./fuel-consumption-record.helper";
import { StringResource } from "@/StringResource";

type FuelConsumptionCardProps = {
  record: FuelConsumption;
};

const buttonBarVisible = ref(true);
const buttonRunDisabled = ref(false);
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

onMounted(() => validateIfPossibleRun());

const validateIfPossibleRun = () =>
  (buttonRunDisabled.value = props.record.refueledLiters <= 0);
const buttonAction: FuelConsumptionCardButtonActionType = (
  action: FuelConsumptionCardActionTypeEnum
): void => {
  configureFormPropsToFuel(action);
  configureFormPropsToRun(action);
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

  validateIfPossibleRun();
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

  validateIfPossibleRun();
};
const configureFormPropsToFuel = (
  actionType: FuelConsumptionCardActionTypeEnum
) => {
  if (actionType !== FuelConsumptionCardActionTypeEnum.Fuel) return;

  formLabel.value = StringResource.msgEnterWithTheNumberOfLiters(
    StringResource.fuel
  );
  formButtonText.value = StringResource.fuel;
  formAction.value = fuelAction;

  buttonBarVisible.value = false;
};
const configureFormPropsToRun = (
  actionType: FuelConsumptionCardActionTypeEnum
) => {
  if (actionType !== FuelConsumptionCardActionTypeEnum.Run) return;

  formLabel.value = StringResource.msgEnterWithTheNumberOfLiters(
    StringResource.run
  );
  formButtonText.value = StringResource.run;
  formAction.value = runAction;

  buttonBarVisible.value = false;
};
</script>

<template>
  <div class="card border-0 mt-2 p-3">
    <div class="d-flex justify-content-evenly mb-3">
      <FuelConsumptionCardItem
        :description="StringResource.serialNumber"
        :value="props.record.serialNumber"
      />

      <FuelConsumptionCardItem
        :description="StringResource.owner"
        :value="props.record.owner"
      />
    </div>

    <div class="d-flex mb-3">
      <FuelConsumptionCardItem
        :description="StringResource.capacity"
        :value="props.record.capacity"
        :table-cell="true"
      />

      <FuelConsumptionCardItem
        :description="StringResource.refueled"
        :value="props.record.refueledLiters"
        :table-cell="true"
      />

      <FuelConsumptionCardItem
        :description="StringResource.available"
        :value="props.record.availableCapacity"
        :table-cell="true"
      />
    </div>

    <div :class="buttonBarStyles" v-if="buttonBarVisible">
      <FuelConsumptionCardAction
        :description="StringResource.fuel"
        :type="FuelConsumptionCardActionTypeEnum.Fuel"
        :action="buttonAction"
      />

      <FuelConsumptionCardAction
        :description="StringResource.run"
        :type="FuelConsumptionCardActionTypeEnum.Run"
        :action="buttonAction"
        :close="closeAction"
        :disabled="buttonRunDisabled"
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
