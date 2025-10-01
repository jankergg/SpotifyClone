import * as ReactNativeWeb from 'react-native';

const globalScope =
  typeof globalThis !== 'undefined'
    ? (globalThis as typeof globalThis & {
        require?: (moduleId: string) => unknown;
      })
    : // Fall back to window when running in older environments without globalThis.
      (window as unknown as typeof globalThis & {
        require?: (moduleId: string) => unknown;
      });

if (typeof globalScope.require !== 'function') {
  const shim = (moduleId: string) => {
    if (moduleId === 'react-native') {
      return ReactNativeWeb;
    }

    throw new Error(
      `Cannot dynamically require module "${moduleId}" in the browser.`
    );
  };

  Object.defineProperty(globalScope, 'require', {
    value: shim,
    configurable: true,
    writable: true,
  });
}
