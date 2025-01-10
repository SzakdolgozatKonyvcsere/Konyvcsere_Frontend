import useAuthContext from "../contexts/AuthContext";

export default function Kezdolap(){
    const {user} = useAuthContext();

    //ellenőrizzük van-e bejelentkezett felhasználó
    return(
        <div>
        <h1>Kezdőlap</h1>
        <p>Bejelentkezett felhasználó: {user==null?"Nincs bejelentkezett felhasználó":user.name}</p>
        </div>
    )
}