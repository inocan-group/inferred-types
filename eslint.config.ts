import antfu from "@antfu/eslint-config";

// Type assertion to bypass TypeScript's need to resolve transitive dependencies
export default antfu(
    {
        type: "lib",
        unocss: false,
        formatters: false,
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
    },
    // Add rule to prevent circular dependencies in runtime-types
    {
        files: ["**/modules/runtime/src/runtime-types/**/*.ts"],
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    paths: [
                        {
                            name: "runtime/runtime-types",
                            message: "Files within runtime-types should not import from the runtime-types barrel. Import directly from source files instead to avoid circular dependencies."
                        }
                    ]
                }
            ]
        }
    }
) as any;
