{/*import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AllUsersContext = createContext("");

export const AuthProvider = ({ children }) => {

    //const navigate = useNavigate();
    const [userLista, setUserLista] = useState(null);
    

    //
    const getAdat=async(vegpont, callbackfv)=>{
        try{
            console.log("getadat");
            const response = await myAxios.get(vegpont);
            callbackfv(response.data)
        } catch (err) {
            console.log("Hiba:", err);
        }finally{
            
        }

        }

        const postAdat = async(vegpont,adat)=>{
            try{
                const response = await myAxios.post(vegpont,adat);
                console.log("adat:", response.data)
            }catch(err){
                console.log("Hiba",err);
            }finally{

            }
        }

        useEffect(()=>{
            getAdat("osszes-felhasznalo", setUserLista)
            
        },[])



        return (
            <AllUsersContext.Provider value={{userLista, getAdat, postAdat}}>
                {children}
            </AllUsersContext.Provider>
        )

}


*/}
