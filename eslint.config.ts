import antfu from "@antfu/eslint-config";

const config = antfu(
    {
        type: "lib",
        unocss: false,
        formatters: true,
        stylistic: {
            quotes: "double",
            semi: true,
            indent: 4,
            overrides: {
                "style/indent": ["error", 4],
                "style/indent-binary-ops": ["off"],
                "quote-props": ["off"],
                "style/quote-props": ["off"],
                "array-callback-return": ["warn"],
                "valid-typeof": ["warn"],
                "no-fallthrough": ["off"],
                "style/comma-dangle": ["warn", "only-multiline"],
                "node/prefer-global/process": ["warn"]
            }
        },
        regexp: {
            overrides: {
                "regexp/no-super-linear-backtracking": ["warn"],
                "regexp/no-unused-capturing-group": ["warn"],
            }
        },
        typescript: {
            overrides: {
                "ts/consistent-type-definitions": ["off"],
                "ts/explicit-function-return-type": ["off"],
                "ts/no-unused-vars": [
                    "warn",
                    {
                        varsIgnorePattern: "^_|^cases$",
                        argsIgnorePattern: "^_|^cases$",
                        destructuredArrayIgnorePattern: "^_|^cases$",
                    },
                ],
                "ts/no-unsafe-function-type": ["off"],
                "ts/method-signature-style": ["off"]
            },
        }
    }
);

// Type assertion to bypass TypeScript's need to resolve transitive dependencies
export default config as any;
