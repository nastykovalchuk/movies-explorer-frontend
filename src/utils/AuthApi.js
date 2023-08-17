import { MAIN_API_URL } from "./constants"

class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  signUp({ email, password, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResult);
  }

  signIn({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        return res;
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResult);
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const authApi = new AuthApi({
  baseUrl: MAIN_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

export default authApi;