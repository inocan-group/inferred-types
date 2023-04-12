import { createTypeMapRule, wide } from "src/runtime";
import { AlphaChar, LowerAlphaChar, UpperAlphaChar, Digit } from "src/types";

/**
 * strip off the `literal:` tag on string literals
 */
const stringLiteral = createTypeMapRule(["StartsWith", "literal:"], ["StripLeading", "literal:"]);

const bool = createTypeMapRule(["Extends", wide.boolean], ["ToString"]);
const numbers = createTypeMapRule(["Extends", wide.number],["ToString"]);
const strings = createTypeMapRule(["Extends", wide.string],["Identity"]);

const opString = createTypeMapRule(["Equals", "<string>"], ["AsString"]);
const opNumber = createTypeMapRule(["Equals", "<number>"], ["AsNumericString"]);
const opBoolean = createTypeMapRule(["Equals", "<boolean>"], ["AsBooleanString"]);
const opDigit = createTypeMapRule(["Equals", "<digit>"], ["As", "<digit>" as `${Digit}`]);
const opLetter = createTypeMapRule(["Equals", "<letter>"], ["As", "<letter>" as `${AlphaChar}`]);
const opLetterLower = createTypeMapRule(["Equals", "<letter:lowercase>"], ["As", "0" as `${LowerAlphaChar}`]);
const opLetterUpper = createTypeMapRule(["Equals", "<letter:uppercase>"], ["As", "0" as `${UpperAlphaChar}`]);

const capitalized = createTypeMapRule(["Equals", "<capitalized>"], ["Capitalized"]);
const pascalCase = createTypeMapRule(["Equals", "<pascal-case>"], ["PascalCase"]);
const camelCase = createTypeMapRule(["Equals", "<camel-case>"], ["CamelCase"]);
const kebabCase = createTypeMapRule(["Equals", "<kebab-case>"], ["KebabCase"]);

export const mapStringLiterals = [
  opString,
  opNumber,
  opBoolean,
  opDigit,
  opLetter,
  opLetterLower,
  opLetterUpper,
  capitalized,
  pascalCase,
  camelCase,
  kebabCase,

  bool,
  numbers,
  strings,
  stringLiteral
] as const;
