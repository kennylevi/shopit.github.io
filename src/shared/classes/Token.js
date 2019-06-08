import { CUSTOM_CONSTANTS } from "../utilities/constants";
import { Cookie, Session } from "../utilities/Cache";

export const Token = {
  isTokenLogged: () => {
    return !!this.getAuthUser();
  },

  /**
   * setAuthUser
   */
  setAuthUser: user => {
    // Cookies.
    Cookie.set(CUSTOM_CONSTANTS.APP_VARIABLE, user, {
      expires: 1
    });
    Session.set(CUSTOM_CONSTANTS.APP_VARIABLE, user);
  },

  /**
   * getAuthUser
   */
  getAuthUser: () => {
    return Cookie.get(CUSTOM_CONSTANTS.APP_VARIABLE);
  },

  getAuthUserToken: () => {
    return Cookie.getToken().accessToken || Cookie.getToken();
    // return Cookie.getToken();
  },

  removeAuthUser: () => {
    Cookie.remove(CUSTOM_CONSTANTS.APP_VARIABLE);
    Session.remove(CUSTOM_CONSTANTS.APP_VARIABLE);
  },

  /**
   * removeLogUser
   */
  removeLoggedUser: () => {
    this.removeAuthUser();
    Session.clear();
    localStorage.clear();
    // this._router.navigateByUrl('');
  },

  logout: () => {
    this.removeAuthUser();
    Session.clear();
    localStorage.clear();
  }
};
