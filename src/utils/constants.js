export const MAIN_API_URL = process.env.REACT_APP_MAIN_API_URL || "http://localhost:2000";
export const MOVIES_API_URL = process.env.REACT_APP_MOVIES_API_URL || "https://api.nomoreparties.co/beatfilm-movies";

export const SHORT_MOVIE_DURATION_IN_MINUTES = 40;

export const NUMBER_OF_CARDS_FOR_DESKTOP = 16;
export const MORE_CARDS_FOR_DESKTOP = 4;

export const BIG_TABLET_SCREEN_WIDTH = 920;
export const NUMBER_OF_CARDS_FOR_BIG_TABLET = 12;
export const MORE_CARDS_FOR_BIG_TABLET = 3;

export const TABLET_SCREEN_WIDTH = 768;
export const NUMBER_OF_CARDS_FOR_TABLET = 8;
export const MORE_CARDS_FOR_TABLET = 2;

export const MOBILE_SCREEN_WIDTH = 600;
export const NUMBER_OF_CARDS_FOR_MOBILE = 5;
export const MORE_CARDS_FOR_MOBILE = 1;

export const ERROR_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const ERROR_BAD_REQUEST_MESSAGE = "Ошибка при обновлении профиля! Попробуйте позже.";
export const ERROR_CONFLICT_MESSAGE = "Пользователь с такой почтой уже зарегистрирован";
export const ERROR_CREDIT_MESSAGE = "Неправильная почта или пароль";
export const UPDATE_PROFILE_MESSAGE = "Данные успешно сохранены!";

export function errorHeandler(err) {
  switch (err) {
    case "Ошибка: 401":
      return ERROR_CREDIT_MESSAGE;
    case "Ошибка: 409":
      return ERROR_CONFLICT_MESSAGE;
    case "Ошибка: 400":
      return ERROR_BAD_REQUEST_MESSAGE;
    default:
      return "Что-то пошло не так! Попробуйте ещё раз."
  }
}