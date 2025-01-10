import { createContext, useState, useContext, use } from "react";
import {myAxios} from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({
        name:"",
        email:"",
        password:"",
        password_confirmation:"",
    });
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");
    const getUser = async () => {
        const {data} = await myAxios.get("/api/user");
        console.log(data)
        setUser(data);
    };
    const logout = async () => {
        await csrf();

        myAxios.post("/logout").then((resp) => {
            setUser(null);
            console.log(resp);
        });
    };

    const loginReg = async ({ ...adat}, vegpont) => {
        //lekérem a csrf tokent
        await csrf();
        console.log(adat,vegpont);

    try{
        await myAxios.post(vegpont, adat);
        console.log("sikerült!")
        getUser()
        navigate("/");
    }catch (error){
        console.log(error);
        if (error.response.status === 422){
            setErrors(error.response.data.errors);
        }
    }
 };

 return (
    <AuthContext.Provider value={{logout, loginReg, errors, getUser, user}}>
        {children}
    </AuthContext.Provider>
 );
};
export default function useAuthContext(){
    return useContext(AuthContext);
}