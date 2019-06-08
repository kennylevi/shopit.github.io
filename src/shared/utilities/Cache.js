import { CUSTOM_CONSTANTS } from "./constants";
import Encryption from "../classes/Encryption";

const encryptionService = new Encryption();

export const Cookie = {
  /**
   *
   * @param cname
   * @param cvalue
   * @param ex
   */
  set: (cname, cvalue, ex) => {
    const encryptedUser = Encryption.encrypt(cvalue);
    const date = new Date();
    date.setTime(date.getTime() + ex.expires * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();

    document.cookie = cname + "=" + encryptedUser + ";" + expires + ";path=/";
  },

  /**
   *
   * @param cname
   */
  remove: cname => {
    if (typeof Storage !== "undefined") {
      const d = new Date();
      d.setTime(d.getTime() - 12 * 24 * 60 * 60 * 1000000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + undefined + ";" + expires + ";path=/";
    }
  },

  /**
   *
   * @param cname
   */
  prepareGet: cname => {
    if (typeof Storage !== "undefined") {
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length) || undefined;
        }
      }
      return "";
    } else {
      return 0;
    }
  },

  /**
   *
   * @param cname
   */
  get: cname => {
    if (
      cname === CUSTOM_CONSTANTS.APP_VARIABLE &&
      !Encryption.decrypt(Cookie.prepareGet(CUSTOM_CONSTANTS.APP_VARIABLE))
    ) {
      return null;
    }
    return Encryption.jwtDecrypt(Encryption.decrypt(Cookie.prepareGet(cname)));
    // return Cookie.prototype.prepareGet(cname)
  },

  getToken: () => {
    if (!Cookie.prepareGet(CUSTOM_CONSTANTS.APP_VARIABLE)) {
      return null;
    }
    return Encryption.decrypt(Cookie.prepareGet(CUSTOM_CONSTANTS.APP_VARIABLE));
    // return Cookie.prototype.prepareGet('appName');
  }
};

export const Session = {
  /**
   * @description set data from sessionStorage and also encrypt it
   * @param key
   * @param data
   */
  set: (key, data) => {
    const encryptedData = Encryption.encrypt(data);
    sessionStorage.setItem(key, encryptedData);
  },

  /**
   * @description get data from sessionStorage and also decrypt it
   * @param key
   * @returns any
   */
  get: key => {
    if (!sessionStorage.getItem(key)) {
      return null;
    }
    return encryptionService.decrypt(sessionStorage.getItem(key));
  },

  /**
   * @description clear all data from sessionStorage
   */
  clear: () => {
    sessionStorage.clear();
  },

  /**
   * @description remove an item from sessionStorage
   * @param key
   */
  remove: key => {
    sessionStorage.removeItem(key);
  }
};
