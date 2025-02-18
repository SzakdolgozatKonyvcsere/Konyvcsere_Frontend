import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

export const ApiContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      const { data } = await myAxios.get("/api/osszes-konyv");
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba! " + error.message);
      }
    }
  };

  const logout = async () => {
    await csrf();

    myAxios.post("/logout").then((resp) => {
      setUser(null);
      console.log(resp);
    });
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    //lekérjük a csrf tokent
    await csrf();
    console.log(adat, vegpont);

    try {
      await myAxios.post(vegpont, adat);
      console.log("siker");
      //sikeres bejelentkezés/regisztráció esetén
      //Lekérdezzük a usert
      //await getUser();
      //elmegyünk  a kezdőlapra
      await getUser()
      navigate("/");
      
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  return (
    <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export default function useApiContext() {
  return useContext(ApiContext);
}

