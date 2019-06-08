import axios from "axios";
import { from } from "rxjs";

const DEFAULT_URL = "https://backendapi.turing.com/";

export const RequestHandler = {
  /**
   * post
   * @param path
   * @param data
   * @returns Observable
   */
  post: (path, data) => {
    const url = `${DEFAULT_URL}${path}`;
    return from(axios.post(url, data || {}));
  },

  /**
   *
   * @param {string} path
   * @returns {Observable<any>}
   */
  get: path => {
    const url = `${DEFAULT_URL}${path}`;
    return from(axios.get(url));
  },

  /**
   *
   * @param {string} path
   * @param data
   * @returns {Observable<any>}
   */
  put: (path, data) => {
    const url = `${DEFAULT_URL}${path}`;
    return from(axios.put(url, data));
  },

  /**
   *
   * @param path
   * @param data
   */
  delete: path => {
    const url = `${DEFAULT_URL}${path}`;
    return from(axios.delete(url));
  }
};
