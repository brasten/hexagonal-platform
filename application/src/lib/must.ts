export function must<T>(val?: T | null): T {
  if (val == null || val == undefined)
    throw new Error(`Assertion failed`)

  return val
}