export function pipeFn<
  T extends (...args: any[]) => any,
  I extends Record<string, any>
>(
  fn: (tokens: I, ...args: Parameters<T>) => ReturnType<T>,
  injectFn?: () => I,
  cacheFn?: (...args: Parameters<T>) => any
): () => (...args: Parameters<T>) => ReturnType<T> {
  return () => {
    let injectedTokens = injectFn?.() ?? ({} as I);
    const cache = new Map<string, ReturnType<T>>();
    return (...args: Parameters<T>): ReturnType<T> => {
      const key = JSON.stringify(cacheFn ? cacheFn(...args) : args); // Crea una chiave unica per gli argomenti

      if (cache.has(key)) {
        return cache.get(key)!; // Restituisce il risultato memoizzato
      }
      const result = fn(injectedTokens, ...args); // Calcola il risultato
      cache.set(key, result); // Memoizza il risultato
      return result; // Restituisce il risultato
    };
  };
}