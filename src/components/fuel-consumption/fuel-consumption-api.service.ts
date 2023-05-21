import axios from "axios";
import { isNullOrWhiteSpace } from "@/helpers/helpers";
import { FuelConsumption } from "./fuel-consumption.model";
import { FuelConsumptionDto } from "./fuel-consumption.dto";

export class FuelConsumptionApiService {
  private static _baseUrl = "fuel-consumption";

  public static async list(): Promise<FuelConsumption[]> {
    const response = await axios.get<FuelConsumption[]>(
      FuelConsumptionApiService.getUrl()
    );

    if (!Array.isArray(response?.data)) return [];

    return response.data;
  }

  public static async fuel(
    dto: FuelConsumptionDto
  ): Promise<FuelConsumption | null> {
    if (!dto) return null;

    const response = await axios.put<FuelConsumption>(
      FuelConsumptionApiService.getUrl("fuel"),
      dto
    );

    if (!response?.data) return null;

    return response.data;
  }

  public static async run(
    dto: FuelConsumptionDto
  ): Promise<FuelConsumption | null> {
    if (!dto) return null;

    const response = await axios.put<FuelConsumption>(
      FuelConsumptionApiService.getUrl("run"),
      dto
    );

    if (!response?.data) return null;

    return response.data;
  }

  private static getUrl(endpoint: string | null = null): string {
    if (isNullOrWhiteSpace(endpoint)) return FuelConsumptionApiService._baseUrl;

    return `${FuelConsumptionApiService._baseUrl}/${endpoint}`;
  }
}
