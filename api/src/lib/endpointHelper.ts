export const endpointHelper = {
  encode: (input: { uri: string; location: string }[]) => JSON.stringify(input),
  decode: (input: string): { uri: string; location: string }[] =>
    JSON.parse(input),
}
