import { createContext, use, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./AuthContext";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  const {user, crsf} = useAuthContext();
  
  const [loading, setLoading] = useState(true);
  const [userLista, setUserLista] = useState([]);
  const [bookLista, setBookLista] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [bookDemandLista, setBookDemandLista] = useState([]);
  const [availableBookLista, setAvailableBookLista] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userUpdateBookDemand, setUserUpdateBookDemand] = useState([]);

  const [userProfileInfoList, setUserProfileInfoList] = useState([]); 
  const [userBookOffersInfo, setUserBookOffersInfo] = useState([]);
  const [userBookDemandsInfo, setUserBookDemandsInfo] = useState([]);

  //Users
  const getUsers = async (vegpont) => {
    setLoading(true);
    try{
      //console.log("getusers");
      const {data} = await myAxios.get(vegpont);
      setUserLista(data);
    } catch (error) {
        console.log("Hiba:", error);
    }finally{
      setLoading(false); // Stop loading after fetching user 
    }
  }
  const postUsers = async(vegpont,adat)=>{
    setLoading(true);
    try{
        const response = await myAxios.post(vegpont,adat);
        //console.log("adat:", response.data)
    }catch(error){
        console.log("Hiba",error);
    }finally{
    }
  }

  //Books
  const getBooks = async (vegpont) => {
    setLoading(true);
    try {
      const { data } = await myAxios.get(vegpont);
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
    setLoading(true);
    try{
        const response = await myAxios.post(vegpont,adat);
        //console.log("adat:", response.data)
    }catch(error){
        console.log("Hiba",error);
    }finally{
      setLoading(false);
    }
  }

  const getGenreList = async() => {
    setLoading(true)
    try {
      const response = await myAxios.get("/api/genres");
      setGenreList(response.data);
    } catch (error) {
      console.error("Hiba a műfajok lekérése közben:", error);
    } finally {
      setLoading(false);
    }
  }

  //Book demands
  const getBookDemands = async () => {
    setLoading(true);
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
//osszes elerheto (s + f) konyv
  const getAllAvailableOfferedBooks = async () => {
    try {
      //console.log("Fetching data from backend..."); // Debug log before request
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
//csere tortenet valtoztatasa elso kerelemmel
  const postExchangeRequest = async (adat) => {
    try {
      const response = await myAxios.post('/api/exchange-request', adat)
      console.log("cseretortenet", adat);
      if (response.status === 201) {
        alert('Sikeresen elküldted a kérést!'); // Success message
      }
    } catch (error) {
      console.error('Hiba történt a kérés során:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // backend üzenete
      } else {
        alert('Hiba történt, próbáld újra!'); // alapértelmezett hibaüzenet
      }
    }
  };
  // Egy adott felhasználó lekérése API-ból
  const getUserById = async (adat) => {
    try {
        const response = await myAxios.get(`/api/user/${adat}`);
        return response.data;
    } catch (error) {
        console.error("Hiba a user lekérdezésnél:", error);
        return null;
    }
};


  

  //Mindet at lehete irni nem parameteresre
  const getUserProfileInfo = async (user_id) => {
    setLoading(true);
    try {
      const {data} = await myAxios.get(`/api/user/${user_id}/profile-info`);
      setUserProfileInfoList(data);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba:" + error.message);
      } 
    } finally {
      setLoading(false);
    }
  }
  const getUserBookOffersInfo = async (user_id) => {
    try {
      const {data} = await myAxios.get(`/api/user/${user_id}/book-offer-info`);
      setUserBookOffersInfo(data);
    } catch (error) {
        console.log("Hiba:" + error.message);
    } finally {
      setLoading(false);
    }
  }
  const getUserBookDemandsInfo = async (user_id) => {
    try {
      const {data} = await myAxios.get(`/api/user/${user_id}/book-demand-info`);
      setUserBookDemandsInfo(data);
    } catch (error) {
        console.log("Hiba:" + error.message);
    } finally {
      setLoading(false);
    }
  }

  const patchUserPFP = async (vegpont, adat) => {
    setLoading(true);
    try {
      await myAxios.post(vegpont, adat);      
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }

  const putUserUpdateBookDemand = async (book_demand_id, adat) => {
    setLoading(true);
    try {
      await myAxios.put(`/api/book-demands/${book_demand_id}/user-update`, adat);  
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }

  //Ezeket a vegpontokat lehet hasznalni barmely adat lekeresere!
  //getUserrel ha vegpontot adunk parameterbe akkor barmilyen vegpontot
  //meghivhatunk tehat lehetne ezt egysegesiteni



  useEffect(()=>{
    //if (user.role === 0) {
      getUsers("/api/users", setUserLista)
      getBooks("/api/book-offers", setBookLista)
      getAllAvailableOfferedBooks("/api/all-available-books", setAvailableBookLista)
      //getUsers("/api/users", setUserLista)
      //getBooks("/api/book-offers", setBookLista)
    //} 
    //getBookDemands("/api/book-demands", setBookDemandLista)
    //postWorks("/api/work-upload")
    //postBooks("/api/book-offer-upload")
   
  },[])


  return (
    <ApiContext.Provider value={
      { 
        userLista, bookLista, bookDemandLista,
        getUsers, postUsers, getBooks, postBooks, getBookDemands,
        genreList, getGenreList,
        userProfileInfoList, getUserProfileInfo, userBookOffersInfo, getUserBookOffersInfo, userBookDemandsInfo, getUserBookDemandsInfo,
        availableBookLista, getAllAvailableOfferedBooks,
        patchUserPFP, selectedImage, setSelectedImage, postExchangeRequest, getUserById,
        putUserUpdateBookDemand, userUpdateBookDemand, setUserUpdateBookDemand
        }
      }>
      {children}
    </ApiContext.Provider>
  );
};


export default function useApiContext() {
  return useContext(ApiContext);
}

