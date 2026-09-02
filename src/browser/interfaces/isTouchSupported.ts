export interface IExtendedWindow extends Window {
  DocumentTouch: { new (...args: unknown[]): unknown };
}
