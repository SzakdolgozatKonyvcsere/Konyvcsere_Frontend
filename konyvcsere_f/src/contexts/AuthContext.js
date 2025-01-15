import { createContext, useState, useContext, useEffect } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({
        user_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        full_name: "",
        tel: "",
        city: "",
        //img_url:"",
    });
    //lekérjük a csrf tokent a backendről
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

    //felhasználó adatainak lekérése
    const getUser = async () => {
        try {
            const { data } = await myAxios.get("/api/user");
            console.log(data)
    
            setUser(data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    useEffect(()=>{
        getUser()
    },[])

    //elküldi a kijelentkezési kérelmet, majd törli a felhasználói adatokat
    const logout = async () => {
        await csrf();

        myAxios.post("/logout").then((resp) => {
            setUser(null);
            console.log(resp);
        });
    };

    useEffect(()=>{
        if (!user) {
            getUser() // user oldal frissitesenel elveszett eddig, ez megelozi azt
        }
     },[getUser])
    

    //elküldi a bejelentkezési v. regisztrációs kérelmet
    const loginReg = async ({ ...adat }, vegpont) => {
        //lekérem a csrf tokent
        await csrf();
        console.log(adat, vegpont);
        try {
            await myAxios.post(vegpont, adat);
            console.log("sikerült!")
            getUser()
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};
export default function useAuthContext() {
    return useContext(AuthContext);
}

  