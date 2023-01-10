import { wide } from "src/runtime";
import { createTypeMapper } from "src/runtime/runtime/createTypeMatcher";
import { Alpha, LowerAlpha, UpperAlpha } from "src/types/alphabetic";
import { Digit } from "src/types/Numeric";

/**
 * strip off the `literal:` tag on string literals
 */
const stringLiteral = createTypeMapper("startsWith", "literal:", ["StripLeading", "literal:"]);

const bool = createTypeMapper("extends", wide.boolean,"ToString");
const numbers = createTypeMapper("extends",wide.number,"ToString");
const strings = createTypeMapper("extends",wide.string,"identity");

const opString = createTypeMapper("equals", "<string>", "AsString");
const opNumber = createTypeMapper("equals", "<number>", "AsNumericString");
const opBoolean = createTypeMapper("equals", "<boolean>", "AsBooleanString");
const opDigit = createTypeMapper("equals", "<digit>", ["As", "<digit>" as `${Digit}`]);
const opLetter = createTypeMapper("equals", "<letter>", ["As", "<letter>" as `${Alpha}`]);
const opLetterLower = createTypeMapper("equals", "<letter:lowercase>", ["As", "0" as `${LowerAlpha}`]);
const opLetterUpper = createTypeMapper("equals", "<letter:uppercase>", ["As", "0" as `${UpperAlpha}`]);

const capitalized = createTypeMapper("equals", "<capitalized>", "Capitalized");
const pascalCase = createTypeMapper("equals", "<pascal-case>", "PascalCase");
const camelCase = createTypeMapper("equals", "<camel-case>", "CamelCase");
const kebabCase = createTypeMapper("equals", "<kebab-case>", "KebabCase");

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
