import websdk from "easemob-websdk";
import webImConfig from "./WebIMConfig";

interface SignUpData {
  username: string;
  password: string;
  nickname: string;
  successFn?: Function;
  errorFn?: Function;
}
interface SignUpUserData {
  activated: boolean;
  created: number;
  modified: number;
  nickname: string;
  type: string;
  username: string;
  uuid: string;
}
interface SignUpSuccessResult {
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
interface SignUpErrorResult {
  data: string;
  type: number;
}

interface SignInData {
  username: string;
  password: string;
  successFn?: Function;
  errorFn?: Function;
}
interface SignInSuccessResult {
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

type FriendSubscription = "both" | "to" | "from";
interface FriendData {
  name: string;
  subscription: FriendSubscription;
  jid: {
    appKey: string;
    name: string;
    domain: string;
    clientResource: string;
  };
}
type GetFriendResult = Array<FriendData>;

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
  getFriend: (): Promise<GetFriendResult> => {
    return new Promise((resolve, reject) => {
      WebIM.conn.getRoster({
        success: (result: GetFriendResult) => {
          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });
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
      onTextMessage: (message: any) => {
        //收到文本消息
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
      onPresence: (message: any) => {
        //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
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
export {
  SignUpData,
  SignUpSuccessResult,
  SignUpErrorResult,
  SignInData,
  SignInSuccessResult,
  FriendData,
  GetFriendResult
};
