export const parsePayloadString = (input: string): string =>
  decodeURIComponent(JSON.parse(JSON.stringify(input))).replaceAll('+', ' ');
