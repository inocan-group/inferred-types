export function isFalse(i: unknown): i is false {
    return (typeof i === "boolean" && !i);
}
