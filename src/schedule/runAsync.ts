/**
 * Run function in asynchronously in Worker
 *
 * @param fn Function to be run asynchronously
 * @returns Promise of expected result
 */
export const runAsync = <T>(fn: () => any): Promise<T> => {
  const worker = new Worker(URL.createObjectURL(new Blob([`postMessage((${fn})());`])));

  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data);
      worker.terminate();
    };

    worker.onerror = (err) => {
      rej(err);
      worker.terminate();
    };
  });
};
