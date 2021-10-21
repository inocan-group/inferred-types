export function randomString() {
  return Math.trunc((1 + Math.random()) * 0x1_00_00)
    .toString(16)
    .slice(1);
}
