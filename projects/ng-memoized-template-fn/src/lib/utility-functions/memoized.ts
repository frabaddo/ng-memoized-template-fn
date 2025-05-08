export function memoized<T extends (...args: any[]) => any>(
    fn: T,
    cacheFn?: (...args: Parameters<T>) => any
  ): (...args: Parameters<T>) => ReturnType<T> {
    const cache = new Map<string, ReturnType<T>>();
    return (...args: Parameters<T>): ReturnType<T> => {
      const key = JSON.stringify(cacheFn ? cacheFn(...args) : args); // Crea una chiave unica per gli argomenti
  
      if (cache.has(key)) {
        return cache.get(key)!; // Restituisce il risultato memoizzato
      }
  
      const result = fn(...args); // Calcola il risultato
      cache.set(key, result); // Memoizza il risultato
      return result; // Restituisce il risultato
    };
  }