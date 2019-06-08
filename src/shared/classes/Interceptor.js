import axios from "axios";
import Token from "./Token";

export default class Interceptor {
  intercept() {
    axios.interceptors.request.use(
      function(config) {
        const token = Token.getAuthUserToken();
        if (token) {
          config.headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
          };
          config.headers.Authorization = `${token}`;
          console.log(config);
          return config;
        } else {
          console.log("There is not token yet...");
          return config;
        }
      },
      function(err) {
        return Promise.reject(err);
      }
    );
  }
}
