const { resolve } = require("path");

module.exports = {
  verbose: true,
  testMatch: ["**/tests/?(*-)+(spec|test).ts", "**/src/?(*-)+(spec|test).ts"],

  // Maps a regular expression for a "path" and maps it to a transformer
  // https://jestjs.io/docs/en/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // modules which do NOT export CJS must have an entry to
  // https://jestjs.io/docs/en/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    "^[/]{0,1}~/(.*)$": resolve(process.cwd(), "src", "$1"),
  },

  // adds more assertions to the default library that Jest provides
  setupFilesAfterEnv: ["jest-extended"],
  testEnvironment: "node",
};
