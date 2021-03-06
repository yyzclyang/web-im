import websdk from "easemob-websdk";
import webImConfig from "./WebIMConfig";
import {
  addFriendStatusMessage,
  friendRequest
} from "@/page/chat/components/modal/addFriend";
import { receiveTextMessage } from "@/page/chat/components/chatPanel";

export interface SignUpData {
  username: string;
  password: string;
  nickname: string;
  successFn?: Function;
  errorFn?: Function;
}
export interface SignUpUserData {
  activated: boolean;
  created: number;
  modified: number;
  nickname: string;
  type: string;
  username: string;
  uuid: string;
}
export interface SignUpSuccessResult {
  action: string;
  application: string;
  applicationName: string;
  duration: number;
  entities: Array<SignUpUserData>;
  organization: string;
  path: string;
  timestamp: number;
  uri: string;
}
export interface SignUpErrorResult {
  data: string;
  type: number;
}

export interface SignInData {
  username: string;
  password: string;
  successFn?: Function;
  errorFn?: Function;
}
export interface SignInSuccessResult {
  access_token: string;
  expires_in: number;
  user: {
    activated: boolean;
    created: number;
    modified: number;
    type: string;
    username: string;
    uuid: string;
  };
}

export type FriendSubscription = "both" | "to" | "from";
export interface FriendInfo {
  name: string;
  subscription: FriendSubscription;
  jid: {
    appKey: string;
    name: string;
    domain: string;
    clientResource: string;
  };
}
export type FriendResult = Array<FriendInfo>;
export type PresenceMessageType = "subscribe" | "subscribed";
export interface PresenceMessage<T> {
  type: T;
  to: string;
  from: string;
  status: string;
}

export type MessageType = "chat";
export interface TextMessage {
  id: string;
  type: MessageType;
  from: string;
  to: string;
  data: string;
  ext: { [key: string]: any };
  sourceMsg: string;
  time: string;
  error: boolean;
  errorText: string;
  errorCode: number;
}

const WebIM = {
  config: webImConfig,
  // @ts-ignore
  conn: new websdk.connection({
    appKey: webImConfig.appkey,
    isHttpDNS: webImConfig.isHttpDNS,
    isMultiLoginSessions: webImConfig.isMultiLoginSessions,
    https: webImConfig.https,
    url: webImConfig.xmppURL,
    apiUrl: webImConfig.apiURL,
    isAutoLogin: webImConfig.isAutoLogin,
    heartBeatWait: webImConfig.heartBeatWait,
    autoReconnectNumMax: webImConfig.autoReconnectNumMax,
    autoReconnectInterval: webImConfig.autoReconnectInterval,
    isStropheLog: webImConfig.isStropheLog,
    delivery: webImConfig.delivery
  }),
  signUp: ({
    username,
    password,
    nickname,
    successFn,
    errorFn
  }: SignUpData) => {
    return WebIM.conn.registerUser({
      username,
      password,
      nickname,
      appKey: webImConfig.appkey,
      apiUrl: webImConfig.apiURL,
      success: function(result: SignUpSuccessResult) {
        successFn && successFn(result);
        console.log("register success", result);
      },
      error: function(error: SignUpErrorResult) {
        errorFn && errorFn(error);
        console.log("register error", error);
      }
    });
  },
  signInWithPassword: ({
    username,
    password,
    successFn,
    errorFn
  }: SignInData) => {
    return WebIM.conn.open({
      apiUrl: webImConfig.apiURL,
      appKey: webImConfig.appkey,
      user: username,
      pwd: password,
      success: function(result: SignInSuccessResult) {
        successFn && successFn(result);
        WebIM.listen();
        console.log("login success", result);
      },
      error: function() {
        errorFn && errorFn();
        console.log("login error");
      }
    });
  },
  quit: () => {
    return WebIM.conn.close();
  },
  getFriend: (): Promise<FriendResult> => {
    return new Promise((resolve, reject) => {
      WebIM.conn.getRoster({
        success: (result: FriendResult) => {
          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  },
  addFriend: (user: string) => {
    return WebIM.conn.subscribe({ to: user, message: "加个好友呗!" });
  },
  acceptFriendRequest: (user: string) => {
    return WebIM.conn.subscribed({ to: user, message: "[resp:true]" });
  },
  declineFriendRequest: (user: string) => {
    return WebIM.conn.unsubscribed({
      to: user,
      message: "rejectAddFriend"
    });
  },
  sendSingleMessage: (
    id: number,
    to: string,
    message: string
  ): Promise<{ id: string; serverMsgId: string }> => {
    return new Promise((resolve, reject) => {
      // const id = WebIM.conn.getUniqueId(); // 生成本地消息id
      // @ts-ignore
      const msg = new websdk.message("txt", id); // 创建文本消息
      console.log("msg", msg);
      msg.set({
        msg: message, // 消息内容
        to: to, // 接收消息对象（用户id）
        roomType: false,
        ext: {}, //扩展消息
        success: (id: string, serverMsgId: string) => {
          // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
          resolve({ id, serverMsgId });
        },
        fail: () => {
          // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
          reject();
        }
      });
      WebIM.conn.send(msg.body);
    });
  },
  listen: () => {
    WebIM.conn.listen({
      onOpened: (message: any) => {
        //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();
        console.log("onOpened", message);
      },
      onClosed: (message: any) => {
        //连接关闭回调
        console.log("onClosed", message);
      },
      onTextMessage: (message: TextMessage) => {
        //收到文本消息
        receiveTextMessage(message);
        console.log("onTextMessage", message);
      },
      onEmojiMessage: (message: any) => {
        //收到表情消息
        console.log("onEmojiMessage", message);
      },
      onPictureMessage: (message: any) => {
        //收到图片消息
        console.log("onPictureMessage", message);
      },
      onCmdMessage: (message: any) => {
        //收到命令消息
        console.log("onCmdMessage", message);
      },
      onAudioMessage: (message: any) => {
        //收到音频消息
        console.log("onAudioMessage", message);
      },
      onLocationMessage: (message: any) => {
        //收到位置消息
        console.log("onLocationMessage", message);
      },
      onFileMessage: (message: any) => {
        //收到文件消息
        console.log("onFileMessage", message);
      },
      onVideoMessage: (message: any) => {
        //收到视频消息
        console.log("onVideoMessage", message);
      },
      onPresence: (message: PresenceMessage<PresenceMessageType>) => {
        //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
        switch (message.type) {
          case "subscribe":
            {
              friendRequest(message as PresenceMessage<"subscribe">);
            }
            break;
          case "subscribed":
            {
              addFriendStatusMessage(message as PresenceMessage<"subscribed">);
            }
            break;
          default: {
          }
        }
        console.log("onPresence", message);
      },
      onRoster: (message: any) => {
        //处理好友申请
        console.log("onRoster", message);
      },
      onInviteMessage: (message: any) => {
        //处理群组邀请
        console.log("onInviteMessage", message);
      },
      onOnline: () => {
        //本机网络连接成功
        console.log("onOnline");
      },
      onOffline: () => {
        //本机网络掉线
        console.log("onOffline");
      },
      onError: (message: any) => {
        //失败回调
        console.log("onError", message);
      },
      onBlacklistUpdate: (list: any) => {
        //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log("onBlacklistUpdate", list);
      },
      onRecallMessage: (message: any) => {
        //收到撤回消息回调
        console.log("onRecallMessage", message);
      },
      onReceivedMessage: (message: any) => {
        //收到消息送达服务器回执
        console.log("onReceivedMessage", message);
      },
      onDeliveredMessage: (message: any) => {
        //收到消息送达客户端回执
        console.log("onDeliveredMessage", message);
      },
      onReadMessage: (message: any) => {
        //收到消息已读回执
        console.log("onReadMessage", message);
      },
      onCreateGroup: (message: any) => {
        //创建群组成功回执（需调用createGroupNew）
        console.log("onCreateGroup", message);
      },
      onMutedMessage: (message: any) => {
        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
        console.log("onMutedMessage", message);
      }
    });
  }
};

export default WebIM;
