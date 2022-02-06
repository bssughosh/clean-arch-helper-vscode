import * as changeCase from "change-case";

export const pascalCase = (str: string): string => {
  return changeCase.pascalCase(str.toLowerCase());
};

export const camelCase = (str: string): string => {
  return changeCase.camelCase(str.toLowerCase());
};

export const snakeCase = (str: string): string => {
  return changeCase.snakeCase(str.toLowerCase());
};

export const titleCase = (str: string): string => {
  const pascalCaseString = pascalCase(str);
  return (
    pascalCaseString.substring(0, 1).toUpperCase() +
    pascalCaseString.substring(1)
  );
};
