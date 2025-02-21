import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: "lib",
    unocss: false,
    formatters: true,
    stylistic: {
      quotes: "double",
      semi: true,
      overrides: {
        "style/indent-binary-ops": ["warn", 2],
        "quote-props": ["off"],
        "style/quote-props": ["off"],
        "array-callback-return": ["warn"],
        "valid-typeof": ["warn"],
        "no-fallthrough": ["off"],
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
        "ts/explicit-function-return-type": ["off"],
        "ts/no-unused-vars": [
          "warn",
          {
            varsIgnorePattern: "^_|^cases$",
            argsIgnorePattern: "^_|^cases$",
            destructuredArrayIgnorePattern: "^_|^cases$",
          },
        ],
        "ts/no-unsafe-function-type": ["off"]
      },
    }
  }
)
