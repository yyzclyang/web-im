class TokenUtil {
  private token: string = "";

  getToken() {
    return this.token;
  }
  setToken(newToken: string) {
    this.token = newToken;
  }
}

export default new TokenUtil();
