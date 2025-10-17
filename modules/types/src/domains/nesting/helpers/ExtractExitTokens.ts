

/**
 * Helper to extract exit tokens from NestingKeyValue values
 * Handles both simple (string) and hierarchical ([exit, nextLevel]) forms
 * Also handles readonly tuples from constants
 */
export type ExtractExitTokens<V> = V extends readonly [infer Exit extends string, infer _NextLevel]
    ? Exit
    : V extends [infer Exit extends string, infer _NextLevel]
        ? Exit
        : V extends string
            ? V
            : never;
