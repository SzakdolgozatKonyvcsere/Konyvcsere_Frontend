import { useState, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";

export default function UserProfilAdatos() {
  /* const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó

  // Összes adat egy objektumban
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    full_name: "",
    city: "",
    tel: "",
    img_url: "",
  });

  useEffect(() => {
    if (authUser) {
      setUserData({
        id: authUser.id || "",
        name: authUser.name || "",
        email: authUser.email || "",
        full_name: authUser.full_name || "",
        city: authUser.city || "",
        tel: authUser.tel || "",
        img_url: authUser.img_url || "",
      });
    }
  }, [authUser]);

  return <UserProfil userData={userData} />; */
}