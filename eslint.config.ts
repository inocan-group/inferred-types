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
        "array-callback-return": ["warn"],
        "valid-typeof": ["warn"]
      }
    },
    regexp: {
      overrides: {
        "regexp/no-super-linear-backtracking": ["warn"]
      }
    },
    typescript: {
      overrides: {
        "ts/explicit-function-return-type": ["off"]
      }
    },
  }
)

