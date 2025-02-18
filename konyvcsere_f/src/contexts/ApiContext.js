import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  
  //const getBooks = async () => {
  const [userLista, setUserLista]=useState([]);

  /*const getBooks = async () => {
    try {
      const { data } = await myAxios.get("/api/osszes-konyv");
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba! " + error.message);
      }
    }
  };*/

  const getUsers = async (vegpont, callbackfv) => {
    try{
      console.log("getusers");
      const response = await myAxios.get(vegpont);
      callbackfv(response.data)
  } catch (err) {
      console.log("Hiba:", err);
  }finally{
      
  }
  }

  const postUsers = async(vegpont,adat)=>{
    try{
        const response = await myAxios.post(vegpont,adat);
        console.log("adat:", response.data)
    }catch(err){
        console.log("Hiba",err);
    }finally{

    }
}

useEffect(()=>{
  getUsers("/api/users", setUserLista)
  
},[])


  return (
    <ApiContext.Provider value={{ userLista, getUsers, postUsers }}>
      {children}
    </ApiContext.Provider>
  );
};

export default function useApiContext() {
  return useContext(ApiContext);
}

