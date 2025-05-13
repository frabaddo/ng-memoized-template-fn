import {
  assertInInjectionContext,
  inject,
  Injector,
  runInInjectionContext,
  Signal,
} from '@angular/core';

export type PipeCreator<P extends any[], R extends any> = (_injector?: Injector) => (...args: P) => R

export function createPipe<P extends any[], R extends any>(
  fn: (...args: P) => R,
  options?: {
    pure?: boolean;
    cacheFn?: (...args: P) => any;
  }
): PipeCreator<P, R> {
  const entryPoint = (_injector?: Injector) => {
    assertInInjectionContext(entryPoint);
    let injector = _injector ?? inject(Injector);
    const cache = new Map<string, R>();
    let mainFunction = (...args: P) => {
      if (options?.pure ?? true) {
        const key = JSON.stringify(
          options?.cacheFn ? options.cacheFn(...args) : args
        ); // Crea una chiave unica per gli argomenti
        if (cache.has(key)) {
          return cache.get(key)!; // Restituisce il risultato memoizzato
        }
        const result = runInInjectionContext(injector, () => fn(...args)); // Calcola il risultato
        cache.set(key, result); // Memoizza il risultato
        return result; // Restituisce il risultato
      }
      return runInInjectionContext(injector, () => fn(...args)); // Calcola il risultato
    };
    return mainFunction as (...args: P) => R;
  };
  return entryPoint;
}
