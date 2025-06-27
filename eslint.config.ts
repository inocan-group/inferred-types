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
        "style/indent": ["error", 4],
        // "style/indent-binary-ops": ["error", 4],
        "style/indent-binary-ops": ["off"],
        "quote-props": ["off"],
        "style/quote-props": ["off"],
        "array-callback-return": ["warn"],
        "valid-typeof": ["warn"],
        "no-fallthrough": ["off"],
        "style/comma-dangle": ["warn", "only-multiline"],
      }
    },
    regexp: {
      overrides: {
        "regexp/no-super-linear-backtracking": ["warn"],
        "regexp/no-unused-capturing-group": ["warn"]
      }
    },
    typescript: {
      overrides: {
        // Disable the interface-over-type rule
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
)
