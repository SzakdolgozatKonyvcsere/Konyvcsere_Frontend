import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const [konyvekLista, setKonyvekLista]=useState([]);
  
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Amíg tölt az oldal ne jelenlenek meg az adatok
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  //könyvek listája
  /*const getAdat = async (vegpont, callbackFv) => {
    try{
      const response = await myAxios.get(vegpont);
      console.log("adat: ", response.data);
      callbackFv(response.data)
    }catch (err){
      console.log("Hiba", err);
    }finally{

    }
  };

  const postAdat = async (vegpont, adat) => {
    try {
        const response = await myAxios.post(vegpont, adat);
        console.log("adat: ", response.data);

    } catch (err) {
        console.log("Hiba", err);
    } finally {
    }
};*/

  //bejelentkezett felhasználó adatainak lekérdezése

  const getUser = useCallback(async () => { 
    try {
      const { data } = await myAxios.get("/api/user");
      setUser(data); 
    } catch (error) { 
        if (error.response && error.response.status !== 401) { 
          navigate("/bejelentkezes");
        } 
      } finally { 
        setLoading(false); // Stop loading after fetching user 
      } 
    }, [navigate]);

  const logout = async () => {
    await csrf();
    myAxios.post("/logout").then((resp) => {
      setUser(null);
      navigate("/"); 
    });
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    //lekérjük a csrf tokent
    await csrf();
    console.log(adat, vegpont);

    try {
      await myAxios.post(vegpont, adat);
      //console.log("siker");
      //sikeres bejelentkezés/regisztráció esetén
      //Lekérdezzük a usert
      //await getUser();
      //elmegyünk a kezdőlapra
      await getUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  useEffect(() => {
    //getAdat("/api/osszes-konyv", setKonyvekLista)
    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user, csrf }}>
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}