export function env(key: string, defaultValue = ""): string {
  return process.env[key] ?? defaultValue;
}

export function vueEnv(key: string, defaultValue = ""): string {
  return env(`VUE_APP_${key}`, defaultValue);
}

export function isNullOrUndefined(value: any): boolean {
  return value === undefined || value === null;
}

export function isNullOrWhiteSpace(value: string | null | undefined): boolean {
  return isNullOrUndefined(value) || value?.trim()?.length === 0;
}
