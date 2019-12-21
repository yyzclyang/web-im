const webImConfig = {
  xmppURL: "//im-api-v2.easemob.com/ws", // xmpp Server地址，对于在console.easemob.com创建的appKey，固定为该值
  apiURL: "//a1.easemob.com", // rest Server地址，对于在console.easemob.com创建的appkey，固定为该值
  appkey: "1119191221065862#web-im",
  Host: "easemob.com",
  https: false, // 是否使用https
  isHttpDNS: false, // 3.0 SDK支持，防止DNS劫持从服务端获取XMPPUrl、restUrl
  isMultiLoginSessions: false, // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能
  isWindowSDK: false,
  isSandBox: false,
  isDebug: true, // 打开调试，会自动打印log，在控制台的console中查看log
  isStropheLog: false,
  autoReconnectNumMax: 5, // 断线重连最大次数
  autoReconnectInterval: 2, // 断线重连时间间隔
  heartBeatWait: 4500, // 使用webrtc（视频聊天）时发送心跳包的时间间隔，单位ms
  isWebRTC:
    window.RTCPeerConnection && /^https\:$/.test(window.location.protocol),
  i18n: "cn",
  isAutoLogin: true, // 自动出席，（如设置为false，则表示离线，无法收消息，需要在登录成功后手动调用conn.setPresence()才可以收消息）
  p2pMessageCacheSize: 500,
  delivery: true, // 是否发送已读回执
  groupMessageCacheSize: 200,
  loglevel: "ERROR",
  enableLocalStorage: true
};

export default webImConfig;
