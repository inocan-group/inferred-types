import antfu from "@antfu/eslint-config"

export default antfu(
    {
        type: "lib",
        unocss: false,
        formatters: true,
        stylistic: {
            quotes: "double",
            semi: true,
            indent: 4,
            overrides: {
                "style/indent-binary-ops": ["warn", 4],
                "array-callback-return": ["warn"],
                "valid-typeof": ["warn"],
                "style/comma-dangle": ["warn", "only-multiline"],
            }
        },
        regexp: {
            overrides: {
                "regexp/no-super-linear-backtracking": ["warn"]
            }
        },
        typescript: {
            overrides: {
                "ts/explicit-function-return-type": ["off"],
                "ts/no-unused-vars": [
                    "warn",
                    {
                        varsIgnorePattern: "^_|^cases$",
                        argsIgnorePattern: "^_|^cases$",
                        destructuredArrayIgnorePattern: "^_|^cases$",

                    },
                ],
            },
        }
    }
)

