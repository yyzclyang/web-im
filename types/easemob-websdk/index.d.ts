import { SignUpErrorResult, SignUpSuccessResult } from "@/config/WebIM";

type messageType = "txt" | "img" | "cmd" | "file" | "audio" | "video" | "read";
export interface MessageBody {
  id: number;
  to: string;
  msg: string;
  type: messageType;
  roomType?: boolean;
  ext?: { [key: string]: any };
  success?: Function;
  fail?: Function;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
declare class connection {
  apiUrl: string;
  constructor(options: any);
  listen: (options: { [key: string]: Function }) => void;
  registerUser: (options: {
    password: string;
    apiUrl: string;
    success: (result: SignUpSuccessResult) => void;
    nickname: string;
    appKey: string;
    error: (error: SignUpErrorResult) => void;
    username: string;
  }) => void;
  open: (options: {
    user: string;
    pwd?: string;
    accessToken?: string;
    appKey: string;
    apiUrl?: string;
    xmppURL?: string;
    success?: Function;
    error?: Function;
  }) => void;
  close: () => void;
  getRoster: (options: { success?: Function; error?: Function }) => void;
  subscribe: (options: { to: string; nick?: string; message?: string }) => {};
  subscribed: (options: { to: string; message?: string }) => void;
  unsubscribed: (options: { to: string; message?: string }) => void;
  getUniqueId: (prefix?: string) => number;
  send: (messageSource: MessageBody) => void;
  fetchHistoryMessages: (options: {
    queue: string;
    isGroup: boolean;
    count: number;
    success?: Function;
    fail?: Function;
  }) => void;
}
// eslint-disable-next-line @typescript-eslint/class-name-casing
declare class message {
  constructor(type: messageType, id: number);
  id: number;
  type: messageType;
  body: MessageBody;
  value: string;
  set: (options: {
    apiUrl?: string;
    id?: string;
    to: string; // 接收消息对象（用户id / 群组id）
    msg?: string; // 消息内容
    body?: {
      //  发送URL图片消息
      type: "file";
      url: string;
      size: {
        width: number;
        height: number;
      };
      length: number;
      filename: string;
      filetype: string;
    };
    action?: string;
    file?: any;
    roomType?: boolean; // 群聊类型，true时为聊天室，false时为群组
    ext?: { [key: string]: any }; //扩展消息
    onFileUploadError?: Function; // 文件上传失败
    onFileUploadComplete?: Function; // 文件上传成功
    success?: (id: string, serverMsgId: string) => void; // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
    fail?: Function; // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    [key: string]: any;
  }) => void;
  setGroup: (type: "groupchat") => void;
}

declare const websdk: {
  connection: connection;
  message: message;
  debug: (option: boolean) => void;
};

export default websdk;
