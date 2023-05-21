import { vueEnv } from "@/helpers/helpers";
import { useState } from "@/state/state";
import axios, { AxiosError, AxiosResponse } from "axios";

export class AxiosHandler {
  public static configure() {
    axios.defaults.baseURL = vueEnv("API_URL");

    this.configureHeaders();
    this.defineGlobalInterceptors();
  }

  private static configureHeaders() {
    axios.defaults.headers["Content-Type"] = "application/json";
  }

  private static defineGlobalInterceptors() {
    axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error: AxiosError) => this.errorHandler(error)
    );
  }

  private static errorHandler(error: AxiosError) {
    const errors = this.getErrorMessage(error);

    if (Array.isArray(errors) === false) return;

    const state = useState();
    state.value.notifications = errors;
  }

  private static getErrorMessage(error: AxiosError): string[] {
    const { message, response } = error;

    if (!response || !response.data) return [message];

    if (Array.isArray(response.data) && response.data.length > 0)
      return response.data;

    return [response.data as string];
  }
}
