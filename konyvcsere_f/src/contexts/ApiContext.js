import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  
  
  const [loading, setLoading] = useState(true);
  const [userLista, setUserLista] = useState([]);
  const [bookLista, setBookLista] = useState([]);
  const [bookDemandLista, setBookDemandLista] = useState([]);
  
  //Users
  const getUsers = async (vegpont, callbackfv) => {
    try{
      //console.log("getusers");
      const response = await myAxios.get(vegpont);
      callbackfv(response.data)
    } catch (error) {
        console.log("Hiba:", error);
    }finally{
      setLoading(false); // Stop loading after fetching user 
    }
  }
  const postUsers = async(vegpont,adat)=>{
    try{
        const response = await myAxios.post(vegpont,adat);
        //console.log("adat:", response.data)
    }catch(error){
        console.log("Hiba",error);
    }finally{
    }
  }

  //Books
  const getBooks = async () => {
    try {
      const { data } = await myAxios.get("/api/book-offers");
      setBookLista(data);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba:" + error.message);
      }
    } finally{
      setLoading(false); // Stop loading after fetching books
    }
  };
  const postBooks = async(vegpont,adat)=>{
    try{
        const response = await myAxios.post(vegpont,adat);
        //console.log("adat:", response.data)
    }catch(error){
        console.log("Hiba",error);
    }finally{
    }
  }

  //Book demands
  const getBookDemands = async () => {
    try {
      const { data } = await myAxios.get("/api/book-demands");
      setBookDemandLista(data);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba:" + error.message);
      }
    } finally{
      setLoading(false); // Stop loading after fetching
    }
  };


  useEffect(()=>{
    getUsers("/api/users", setUserLista)
    getBooks("/api/book-offers", setBookLista)
    getBookDemands("/api/book-demands", setBookDemandLista)
  },[])


  return (
    <ApiContext.Provider value={{ userLista, bookLista, bookDemandLista, getUsers, postUsers, getBooks, postBooks, getBookDemands }}>
      {children}
    </ApiContext.Provider>
  );
};


export default function useApiContext() {
  return useContext(ApiContext);
}

