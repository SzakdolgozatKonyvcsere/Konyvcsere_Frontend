import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  //bejelentkezett felhasználó adatainak lekérdezése
  const getUser = async () => {
    // megpróbál auto. bejelentkeztetni
    // lefut a getUser valahol, akkor is ha nincs bejelentkezve a felhasznalo
    // ha nem 401 unauthorized hibát kap hanem valami mást, kiírja
    try {
      const { data } = await myAxios.get("/api/user");
      setUser(data);
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
      console.log(resp + "skibidi");
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
export default function useAuthContext() {
  return useContext(AuthContext);
}