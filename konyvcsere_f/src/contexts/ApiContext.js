import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./AuthContext";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  const user = useAuthContext();
  
  const [loading, setLoading] = useState(true);
  const [userLista, setUserLista] = useState([]);
  const [bookLista, setBookLista] = useState([]);
  const [bookDemandLista, setBookDemandLista] = useState([]);
  const [availableBookLista, setAvailableBookLista] = useState([]);

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

  const getAllAvailableOfferedBooks = async () => {
    try {
      const { data } = await myAxios.get("/api/all-available-books");
      console.log("Kapott adatok:", data);
      setAvailableBookLista(data);
      //setFilteredBooks(data); // Alapértelmezésben az összes könyv látszik
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba:" + error.message);
      }
    } finally{
      setLoading(false); // Stop loading after fetching books
    }
  }
  

  useEffect(()=>{
    //if (user.role === 0) {
      getUsers("/api/users", setUserLista)
      getBooks("/api/book-offers", setBookLista)
      getAllAvailableOfferedBooks("/api/all-available-books", setAvailableBookLista)
    //} 
    //getBookDemands("/api/book-demands", setBookDemandLista)
    //postWorks("/api/work-upload")
    //postBooks("/api/book-offer-upload")
   
  },[])


  return (
    <ApiContext.Provider value={{ userLista, bookLista, bookDemandLista, availableBookLista, getUsers, postUsers, getBooks, postBooks, getBookDemands, getAllAvailableOfferedBooks }}>
      {children}
    </ApiContext.Provider>
  );
};


export default function useApiContext() {
  return useContext(ApiContext);
}

