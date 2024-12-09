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
      }
    },
    typescript: {

    },
  }
)

