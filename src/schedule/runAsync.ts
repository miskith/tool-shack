/**
 * Run function in asynchronously in Worker
 *
 * @param workerFunction Function to be run asynchronously in a worker
 * @returns Promise of expected result
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
