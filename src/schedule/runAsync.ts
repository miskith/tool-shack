/**
 * Run a function in a Web Worker by serializing its source into a Blob URL
 *
 * Closures, imports, and `this` are not available. Async callbacks are not awaited before `postMessage`.
 *
 * @param workerFunction Function whose source is run in the worker
 * @returns Promise of the posted result
 */
export const runAsync = <T>(workerFunction: () => T | Promise<T>): Promise<T> => {
  const worker = new Worker(URL.createObjectURL(new Blob([`postMessage((${workerFunction})());`])));

  return new Promise((resolve, reject) => {
    worker.onmessage = ({ data }: MessageEvent<T>) => {
      resolve(data);
      worker.terminate();
    };

    worker.onerror = (error: ErrorEvent) => {
      reject(error);
      worker.terminate();
    };
  });
};
