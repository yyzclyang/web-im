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
  }
};

export default WebIM;
export {
  SignUpData,
  SignUpSuccessResult,
  SignUpErrorResult,
  SignInData,
  SignInSuccessResult
};
