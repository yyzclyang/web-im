// eslint-disable-next-line @typescript-eslint/class-name-casing
declare class connection {
  apiUrl: string;
  constructor(options: any);
  listen: (options: { [key: string]: (...args: any) => void }) => void;
  registerUser: (options: { [key: string]: any }) => void;
  open: (options: { [key: string]: any }) => void;
  close: () => void;
  getRoster: (options: { [key: string]: any }) => void;
}

declare const websdk: {
  connection: connection;
  debug: (option: boolean) => void;
};

export default websdk;
