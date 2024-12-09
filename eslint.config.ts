import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    stylistic: {
      quotes: "double",
      semi: true
    }
  },
)
