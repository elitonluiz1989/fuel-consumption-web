import { FuelConsumptionDto } from "../fuel-consumption.dto";
import { FuelConsumption } from "../fuel-consumption.model";
import { useState } from "@/state/state";
import { FuelConsumptionCardActionTypeEnum } from "./fuel-consumption-card-action-type.enum";
import {
  FuelConsumptionCardFormActionType,
  FuelConsumptionCardFormProps,
} from "./fuel-consuption-card.types";

export class FuelConsumptionRecordHelper {
  private static state = useState();

  public static createFormProps(
    actionType: FuelConsumptionCardActionTypeEnum,
    action: FuelConsumptionCardFormActionType,
    close: () => void
  ): FuelConsumptionCardFormProps {
    if (actionType === FuelConsumptionCardActionTypeEnum.Fuel) {
      return {
        label: "Enter with the number of liters to fuel",
        buttonText: "Fuel",
        action: action,
        close: close,
      };
    }

    return {
      label: "Enter with the number of liters to run",
      buttonText: "Run",
      action: action,
      close: close,
    };
  }

  public static createDto(
    serialNumber: number,
    input: string
  ): FuelConsumptionDto | null {
    const liters = Number(input);

    if (isNaN(liters) || liters <= 0) return null;

    return {
      serialNumber: serialNumber,
      liters: liters,
    };
  }

  public static updateRecord(updatedRecord: FuelConsumption): void {
    const originalRecord = FuelConsumptionRecordHelper.state.value.records.find(
      (r) => r.serialNumber === updatedRecord?.serialNumber
    );

    if (!originalRecord) {
      window.location.reload();

      return;
    }

    originalRecord.refueledLiters = updatedRecord.refueledLiters;
    originalRecord.availableCapacity = updatedRecord.availableCapacity;
  }
}
