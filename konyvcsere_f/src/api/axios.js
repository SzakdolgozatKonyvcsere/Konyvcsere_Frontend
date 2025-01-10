import axios from "axios";
//létrehozunk új egyedi Axios példányt
export const myAxios=axios.create({
    //backend api elérési útja
    baseURL:"http://localhost:8000",
    //beállítjuk, hogy a kérések azonosítása cookiek segítségével történjen
    withCredentials:true,
});

//lehetővé teszik a kérések, válaszok feldolgozását még azelőtt, hogy elküldésre vagy fogadásra kerülnének
myAxios.interceptors.request.use(
    (config) => {
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
    if (token) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    }
    return config;
  },
  (error) => {
    //Hiba esetén kiírja a hibát
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);