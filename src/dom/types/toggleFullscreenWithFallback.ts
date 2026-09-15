export type TPseudoFullscreenState =
  | { mode: 'class'; className: string; added: boolean }
  | {
      mode: 'style';
      position: string;
      top: string;
      left: string;
      width: string;
      height: string;
      zIndex: string;
      overflow: string;
    };
