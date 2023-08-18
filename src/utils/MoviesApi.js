import { MOVIES_API_URL } from "./constants"

export class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  getMovies() {
      return fetch(`${this._baseUrl}`, {
          method: 'GET',
      })
      .then(this._checkResult)
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_URL,
});

export default moviesApi;