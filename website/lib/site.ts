export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/loza-optique" : "";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}