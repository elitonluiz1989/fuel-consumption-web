import { FuelConsumptionDto } from "../fuel-consumption.dto";
import { FuelConsumption } from "../fuel-consumption.model";
import { useState } from "@/state/state";

export class FuelConsumptionRecordHelper {
  private static state = useState();

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
