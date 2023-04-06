import { createTypeMapRule, wide } from "src/runtime";
import { AlphaChar, LowerAlphaChar, UpperAlphaChar, Digit } from "src/types";

/**
 * strip off the `literal:` tag on string literals
 */
const stringLiteral = createTypeMapRule("startsWith", "literal:", ["StripLeading", "literal:"]);

const bool = createTypeMapRule(["Extends", wide.boolean], [wide.boolean,"ToString"]);
const numbers = createTypeMapRule(["Extends", wide.number],[wide.number,"ToString"]);
const strings = createTypeMapRule(["Extends", wide.string],[wide.string,"Identity"]);

const opString = createTypeMapRule("equals", "<string>", "AsString");
const opNumber = createTypeMapRule("equals", "<number>", "AsNumericString");
const opBoolean = createTypeMapRule("equals", "<boolean>", "AsBooleanString");
const opDigit = createTypeMapRule("equals", "<digit>", ["As", "<digit>" as `${Digit}`]);
const opLetter = createTypeMapRule("equals", "<letter>", ["As", "<letter>" as `${AlphaChar}`]);
const opLetterLower = createTypeMapRule("equals", "<letter:lowercase>", ["As", "0" as `${LowerAlphaChar}`]);
const opLetterUpper = createTypeMapRule("equals", "<letter:uppercase>", ["As", "0" as `${UpperAlphaChar}`]);

const capitalized = createTypeMapRule("equals", "<capitalized>", "Capitalized");
const pascalCase = createTypeMapRule("equals", "<pascal-case>", "PascalCase");
const camelCase = createTypeMapRule("equals", "<camel-case>", "CamelCase");
const kebabCase = createTypeMapRule("equals", "<kebab-case>", "KebabCase");

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
