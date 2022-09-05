export async function toList<T>(iter: AsyncIterable<T>): Promise<T[]> {
  const result = [] as T[]

  for await (const obj of iter) {
    result.push(obj)
  }

  return result
}

export function fromList<T>(list: T[]): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      let index = 0
      const source = list

      return {
        async next() {
          if (index >= source.length) {
            return { value: null, done: true }
          }

          return {
            value: source[index++],
            done: false,
          }
        },
      }
    }
  }
}