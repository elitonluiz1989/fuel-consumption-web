import { FuelConsumptionCardActionTypeEnum } from "./fuel-consumption-card-action-type.enum";

export type FuelConsumptionCardFormActionType = (input: string) => void;

export type FuelConsumptionCardButtonActionType = (
  action: FuelConsumptionCardActionTypeEnum
) => void;

export interface FuelConsumptionCardFormProps {
  label: string;
  buttonText: string;
  action: FuelConsumptionCardFormActionType;
  close: () => void;
}
