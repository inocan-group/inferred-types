import { randomString } from "./randomString";

export function uuid() {
  return `${randomString()}${randomString()}-${randomString()}-${randomString()}-${randomString()}-${randomString()}-${randomString()}${randomString()}${randomString()}`;
}
