export function cacheFunctionWithTimeout<T, U>(
  func: (input: U) => T,
  timeoutInMilliseconds: number
): (input: U) => T {
  const cache: Map<U, { value: T; timestamp: number }> = new Map();

  return (input: U) => {
    const currentTime = Date.now();
    const cachedResult = cache.get(input);

    if (
      !cachedResult ||
      currentTime - cachedResult.timestamp >= timeoutInMilliseconds
    ) {
      const newValue = func(input);
      cache.set(input, { value: newValue, timestamp: currentTime });
      return newValue;
    }

    return cachedResult.value;
  };
}
