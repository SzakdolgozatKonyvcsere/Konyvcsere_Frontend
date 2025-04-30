import { createContext, use, useCallback, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { data, useNavigate } from "react-router-dom";
import useAuthContext from "./AuthContext";


export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, crsf } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const [userLista, setUserLista] = useState([]);
  const [bookLista, setBookLista] = useState([]);
  const [exchangeLista, setExchangeLista] = useState([]);
  const [emailLista, setEmailLista] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [bookDemandLista, setBookDemandLista] = useState([]);
  const [availableBookLista, setAvailableBookLista] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userUpdateBookDemand, setUserUpdateBookDemand] = useState([]);
  const [userUpdateBookOffer, setUserUpdateBookOffer] = useState([]);

  const [userProfileInfoList, setUserProfileInfoList] = useState([]);
  const [userBookOffersInfo, setUserBookOffersInfo] = useState([]);
  const [userBookDemandsInfo, setUserBookDemandsInfo] = useState([]);

  const [userBookOffersInfo2, setUserBookOffersInfo2] = useState([]);
  //const [userGetId, setUserGetId] = useState([]);
  //const [booksAllForExchangeList, setBooksAllForExchangeList] = useState([]);
  //const csrf = () => myAxios.get("/sanctum/csrf-cookie");
  const [demands, setDemands] = useState([])
  const [matches, setMatches] = useState({})   // { [demandId]: [offers...] }

  //Users
  const getUsers = async (vegpont) => {
    setLoading(true);
    try {
      const { data } = await myAxios.get(vegpont);
      setUserLista(data);
    } catch (error) {
      console.log("Hiba:", error);
    } finally {
      setLoading(false); // Stop loading after fetching user 
    }
  }

  const postUsers = async (vegpont, adat) => {
    setLoading(true);
    try {
      const response = await myAxios.post(vegpont, adat);
      //console.log("adat:", response.data)
    } catch (error) {
      console.log("Hiba", error);
    } finally {
      setLoading(false);
    }
  }

  const adminRoleChange = async (user_id, selected_role) => {
    setLoading(true);
    try {
      const response = await myAxios.patch(`/api/users/${user_id}/change-role`, {
        role: selected_role
      });
    } catch (error) {
      console.log("Hiba", error);
    } finally {
      setLoading(false);
    }
  }

  //Books
  const getBooks = async (vegpont) => {
    //setLoading(true);
    try {
      const { data } = await myAxios.get(vegpont);
      setBookLista(data);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba:" + error.message);
      }
    } finally {
      setLoading(false); // Stop loading after fetching books
    }
  };
  const postBooks = async (vegpont, adat) => {
    setLoading(true);
    try {
      const response = await myAxios.post(vegpont, adat);
      //console.log("adat:", response.data)
    } catch (error) {
      console.log("Hiba", error);
    } finally {
      setLoading(false);
    }
  }

  const getGenreList = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };


  // adott felhasználó könyveinek (s + f) lekérése
  const getUserBookOffersInfo2 = async (user_id) => {
    //setLoading(true);
    try {
      const { data } = await myAxios.get(`/api/user/${user_id}/book-offers`);
      console.log("Kapott user könyv adatok:", user_id);
      setUserBookOffersInfo2(data);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba:" + error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  //osszes elerheto (s + f) konyv
  const getAllAvailableOfferedBooks = async () => {

    try {
      //console.log("Fetching data from backend..."); // Debug log before request
      const { data } = await myAxios.get("/api/all-available-books");
      console.log("Kapott available konyv adatok:", data);
      setAvailableBookLista(data);
      //setFilteredBooks(data); // Alapértelmezésben az összes könyv látszik
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log("Hiba:" + error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  //csere tortenet valtoztatasa elso kerelemmel
  const postExchangeRequest = async (adat) => {
    //setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  // Egy adott felhasználó lekérése API-ból
  const getUserById = async (id) => {
    //setLoading(true);
    try {
      const response = await myAxios.get(`/api/user/${id}/showinfo`);
      return response.data;
      //return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error("Hiba a user lekérdezésnél:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  // adott user legtobbet cserelt mufaja
  const getUserByIdGenre = async (id) => {
    //setLoading(true);
    try {
      const response = await myAxios.get(`/api/user/${id}/book-offers`);
      return response.data;
      //return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error("Hiba a user lekérdezésnél:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  // adott userhez kapcsolodo osszes exchange
  const getExchangeByUser = async (userId) => {
    //setLoading(true);
    try {
      const response = await myAxios.get(`/api/user/${userId}/my-exchanges`);
      console.log("csere api 1: ", response.data)
      return response.data;
    } catch (error) {
      console.error("Hiba az exchange by user lekérdezésnél:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  // adott konyv lekerese az exchange kiirashoz
  const getBookByIdForExchange = async (id) => {
    //setLoading(true);
    try {
      const response = await myAxios.get(`/api/user/${id}/book-by-id`);
      return response.data;
    } catch (error) {
      console.error("Hiba a user lekérdezésnél:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  // cserefolyamat 1 elfogadas
  const patchAcceptExchange = async (exchange_id) => {
    try {
      //await csrf();
      console.log("Sending PATCH request with exchange_id:", exchange_id);
      const response = await myAxios.patch(`/api/user/exchange/${exchange_id}/accept`, {
        exchange_status: "f"
      });
      const data = response.data; // kell majd a local state frissiteshez
      if (response.status === 200) {
        alert('Sikeresen elküldted a kiválasztott könyvet!'); // Success message
      }
      return data;
    } catch (error) {
      console.error("acceptExchange error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  //cserefolyamat 2 konyv kivalasztasa
  const patchExchangeSelectOfferedBook = async (exchangeId, bookId) => {
    setLoading(true);
    try {
      const response = await myAxios.patch(`/api/user/exchange/${exchangeId}/select-book`, {
        offered_item: bookId
      });
      if (response.status === 200) {
        alert('Sikeresen elküldted a kiválasztott könyvet!2'); // Success message
        return response.data || true;
      }
      // Ha mégis más státusz jött
      console.warn("Váratlan státuszkód:", response.status);
      return null;
      //return data;
    } catch (error) {
      console.error("selectOfferedBook error2:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  // cserefolyamat 3 elfogadas
  const patchFinalizeExchange = async (exchangeId) => {
    try {
      const response = await myAxios.patch(`/api/user/exchange/${exchangeId}/acceptfinal`);
      if (response.status === 200) {
        alert('Sikeresen véglegesítetted a cserét! Minden további információt megkapsz e-mailben!'); // Success message
        return response.data || true;
      }
      return response.data;
    } catch (error) {
      console.error("Hiba a csere véglegesítésekor:", error);
      return null;
    }
  };
  //cserefolyamat 4 visszautasít
  const patchRejectExchange = async (exchangeId) => {
    try {
      const response = await myAxios.patch(`/api/user/exchange/${exchangeId}/reject`);
      if (response.status === 200) {
        alert('Sikeresen visszautasítottad a beleegyezést!'); // Success message
        return response.data || true;
      }
      return response.data;
    } catch (error) {
      console.error("Hiba a visszautasítás véglegesítésekor:", error);
      return null;
    }
  };

  //összes cserefolyamata
  const getExchange = useCallback(async (url) => {
    console.log("SzijaMIJA")
    setLoading(true);
    try {
      const response = await myAxios.get(url);
      setExchangeLista(response.data);
    } catch (error) {
      console.error("Exchange fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  //kereslet kinalat 1
  // 1) Keresések lekérdezése
  const getAllDemands = async () => {
    try {
      const response = await myAxios.get('/api/book-demands-list')
      setDemands(response.data);
      return response.data;            // response.data: tömb [{ demand_id, … }, …]
    } catch (error) {
      console.error('Hiba a mentett keresések lekérdezésénél:', error)
      return [];
    } finally {
      setLoading(false);
    }
  }
  // 2) Egy konkrét keresés találatainak lekérdezése
  const getMatchesForDemand = async (demandId) => {

    try {
      const response = await myAxios.get(`/api/book-demands-list/${demandId}/matches`)
      //setMatches(prev => ({ 
      //  ...prev, 
      //  [demandId]: response.data    // response.data: tömb ajánlatokkal
      //}))
      return response.data;
    } catch (error) {
      console.error(`Hiba a találatok lekérdezésénél (demand=${demandId}):`, error)
    } finally {
      setLoading(false);
    }
  }

  //admin stats
  const getRegistrationsStat = async (interval = 'daily') => {
    const { data } = await myAxios.get(`/api/admin/new-reg?interval=${interval}`);
    return data;
  };

  const getLoginsStat = async (interval = 'daily') => {
    const { data } = await myAxios.get(`/api/admin/logins?interval=${interval}`);
    return data;
  };

  const getUploadsByCategoryStat = async () => {
    const { data } = await myAxios.get('/api/admin/book-by-categ');
    return data;
  };

  const getUploadsTrendStat = async (interval = 'daily') => {
    const { data } = await myAxios.get(`/api/admin/upload-trend?interval=${interval}`);
    return data;
  };

  const getClosedExchangesStat = async (interval = 'daily') => {
    const { data } = await myAxios.get(`/api/admin/exchange-closed?interval=${interval}`);
    return data;
  };
const getUploadsByCategoryStat = async () => {
  const { data } = await myAxios.get('/api/admin/book-by-categ');
  return data;
};

const getUploadsTrendStat = async (interval = 'daily') => {
  const { data } = await myAxios.get(`/api/admin/upload-trend?interval=${interval}`);
  return data;
};

const getClosedExchangesStat = async (interval = 'daily') => {
  const { data } = await myAxios.get(`/api/admin/exchange-closed?interval=${interval}`);
  return data;
};

  const getExchangeSuccessRatioStat = async () => {
    const { data } = await myAxios.get('/api/admin/exchange-succes-ratio');
    return data;
  };

  const getAvgExchangeTimeStat = async () => {
    const { data } = await myAxios.get('/api/admin/exchange-avg-time');
    return data;
  };

  const getTopBooksStat = async () => {
    const { data } = await myAxios.get('/api/admin/book-top');
    return data;
  };

  const getTopAuthorsGenresStat = async () => {
    const { data } = await myAxios.get('/api/admin/author-genre-top');
    return data;
  };
  const getMostExchangedCity = async () => {
    const { data } = await myAxios.get('/api/admin/most-exchanged-city');
    return data;
  };

 

  


  //Mindet at lehete irni nem parameteresre
  const getUserProfileInfo = async (user_id) => {
    setLoading(true);
    try {
      const { data } = await myAxios.get(`/api/user/${user_id}/profile-info`);
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
    //setLoading(true);
    try {
      const { data } = await myAxios.get(`/api/user/${user_id}/book-offer-info`);
      setUserBookOffersInfo(data);
    } catch (error) {
      console.log("Hiba:" + error.message);
    } finally {
      setLoading(false);
    }
  }
  const getUserBookDemandsInfo = async (user_id) => {
    //setLoading(true);
    try {
      const { data } = await myAxios.get(`/api/user/${user_id}/book-demand-info`);
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
  /*const putUserUpdateBookOffer = async (book_demand_id, adat) => {
    setLoading(true);
    try {
      await myAxios.put(`/api/book-offers/${book_demand_id}/user-update`, adat);  
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }*/
  const putUserUpdateBookOffer = async (offerId, data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('publisher_name', String(data.publisher_name));
    formData.append('title', String(data.title));
    formData.append('language', String(data.language));
    formData.append('authors', String(data.authors));
    formData.append('genre_id', String(data.genre_id));
    formData.append('publication_year', String(data.publication_year));
    formData.append('quality', String(data.quality));
    // Optional image
    if (data.imageFile) {
      formData.append('image', data.imageFile);
    }
    try {
      const response = await myAxios.post(`/api/book-offers/${offerId}/user-update?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      console.error('Hiba:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const softDeleteBookDemand = async (demandId) => {
    try {
      await myAxios.patch(`/api/soft-delete/${demandId}/book-demand`);
    } catch (error) {
      console.log(error.message);
    }
  }
  const softDeleteBookOffer = async (offerId) => {
    try {
      await myAxios.patch(`/api/soft-delete/${offerId}/book-offer`);
    } catch (error) {
      console.log(error.message);
    }
  }
  const softDeleteExchange = async (exchangeId) => {
    try {
      await myAxios.patch(`/api/soft-delete/${exchangeId}/exchange`);
    } catch (error) {
      console.log(error.message);
    }
  }

  const softDeleteEmail = async (exchangeId) => {
    try {
      await myAxios.patch(`/api/soft-delete/${exchangeId}/exchange`);
    } catch (error) {
      console.log(error.message);
    }
  }

  const postBookSearch = async (data) => {
    setLoading(true);
    try {
      const response = await myAxios.post('/api/keresesfeltoltes', data);
      return response.data;
    } catch (error) {
      console.log("Hiba, " + error.message);
    } finally {
      setLoading(false);
    }
  }

  const userInfoUpdate = async (data, user_id) => {
    setLoading(true);
    try {
      const response = await myAxios.put(`/api/user/${user_id}/update-info`, data);
      return response.data;
    } catch (error) {
      console.log("Hiba, " + error.message);
    } finally {
      setLoading(false);
    }
  }

  //useEffect(()=>{
  //if (user.role === 0) {
  //getUsers("/api/users", setUserLista)
  //getBooks("/api/book-offers", setBookLista)
  //getAllAvailableOfferedBooks("/api/all-available-books", setAvailableBookLista)
  //getUserById("/api/user/${adat}/showinfo", user_id)
  //getUsers("/api/users", setUserLista)
  //getBooks("/api/book-offers", setBookLista)
  //} 
  //getBookDemands("/api/book-demands", setBookDemandLista)
  //postWorks("/api/work-upload")
  //postBooks("/api/book-offer-upload")

  //},[])

  //email ellenőrzés
  const getEmail = useCallback(async (url) => {
    console.log("valami")
    setLoading(true);
    try {
      const response = await myAxios.get(url);
      setEmailLista(response.data);
    } catch (error) {
      console.error("Exchange fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getGenreList();

    }
  }, [user]);

  return (
    <ApiContext.Provider
      value={
        {
          userLista, bookLista, getExchange, exchangeLista, setExchangeLista, emailLista, getEmail, setEmailLista, bookDemandLista,
          getUsers, postUsers, getBooks, postBooks, getBookDemands,
          userProfileInfoList, getUserProfileInfo, adminRoleChange,
          userBookOffersInfo, userBookOffersInfo2, getUserBookOffersInfo, getUserBookOffersInfo2,
          userBookDemandsInfo, getUserBookDemandsInfo,
          availableBookLista, getAllAvailableOfferedBooks,
          patchUserPFP, selectedImage, setSelectedImage, userInfoUpdate,
          postExchangeRequest, getUserById, getUserByIdGenre,
          genreList, getGenreList, postBookSearch,
          putUserUpdateBookDemand, userUpdateBookDemand, setUserUpdateBookDemand,
          putUserUpdateBookOffer, userUpdateBookOffer, setUserUpdateBookOffer,
          getExchangeByUser,
          getBookByIdForExchange,
          getAllDemands, getMatchesForDemand, demands, matches,
          patchAcceptExchange, patchExchangeSelectOfferedBook, patchFinalizeExchange, patchRejectExchange,
          softDeleteBookDemand, softDeleteBookOffer, softDeleteExchange, softDeleteEmail,
          loading, setLoading,

          getRegistrationsStat,
          getLoginsStat,
          getUploadsByCategoryStat,
          getUploadsTrendStat,
          getClosedExchangesStat,
          getExchangeSuccessRatioStat,
          getAvgExchangeTimeStat,
          getTopBooksStat,
          getTopAuthorsGenresStat,
          getMostExchangedCity
        }
      }>
      {children}
    </ApiContext.Provider>
  );
};


export default function useApiContext() {
  return useContext(ApiContext);
}

