import { FuelConsumption } from "@/components/fuel-consumption/fuel-consumption.model";

export interface State {
  records: FuelConsumption[];
  notifications: string[];
}
