import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: false,
    formatters: true,
    stylistic: {
      quotes: "double",
      semi: true,
    },
  }
)
