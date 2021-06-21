export function randomString() {
  return Math.trunc((1 + Math.random()) * 0x10000)
    .toString(16)
    .slice(1);
}
