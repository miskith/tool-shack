export type TAriaLabelKey =
  | 'atomic'
  | 'busy'
  | 'controls'
  | 'current'
  | 'describedby'
  | 'details'
  | 'disables'
  | 'dropeffect'
  | 'errormessage'
  | 'expanded'
  | 'flowto'
  | 'grabbed'
  | 'haspopup'
  | 'hidden'
  | 'invalid'
  | 'keyshortcuts'
  | 'label'
  | 'labelledby'
  | 'live'
  | 'modal'
  | 'owns'
  | 'relevant'
  | 'roledescription';

export interface IExtendingElementProps {
  children?: HTMLElement[];
  listeners?: Record<
    string,
    EventListenerOrEventListenerObject | EventListenerOrEventListenerObject[]
  >;
  role?: string;
  aria?: Partial<Record<TAriaLabelKey, string>>;
  dataset?: Record<string, string>;
  style?: Record<string, string | number>;
}
