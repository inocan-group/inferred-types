import eslint from '@eslint/js';
import ts from 'typescript-eslint';

export default ts.config({
    files: ["**/*.ts"],
    extends: [ 
        eslint.configs.recommended,
        ...ts.configs.recommended
    ],
    rules: {
        "quotes": [
            "warn",
            "double",
            {
              "avoidEscape": true,
              "allowTemplateLiterals": true
            }
          ],
          "no-unused-vars": "off",
          "curly": "error",
          "brace-style": [
            "error",
            "1tbs",
            {
              "allowSingleLine": true
            }
          ],
          "no-nested-ternary": "off",
          // we need exceptions to be only "warn" because
          // there are valid use cases for generic variables being
          // used before being defined
          "no-use-before-define": [
            "warn"
          ],
          "@typescript-eslint/no-unsafe-member-access": "off",
          "@typescript-eslint/no-unsafe-call": "off",
          "@typescript-eslint/no-unsafe-assignment": "off",
          "semi": "off",
          "prefer-const": "off",
          "@typescript-eslint/no-explicit-any": "off",
          "@typescript-eslint/semi": "off",
          // "cases" allows for graceful use of that variable
          // name in Typescript test cases
          "@typescript-eslint/no-unused-vars": [
            "error",
            {
              "varsIgnorePattern": "cases|^_",
              "argsIgnorePattern": "^_"
            }
          ]
    },
});
