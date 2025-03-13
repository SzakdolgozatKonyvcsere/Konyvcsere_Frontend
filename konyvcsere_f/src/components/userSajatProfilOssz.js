import { unstable_usePrompt } from "react-router-dom";


export default function userSajatProfilOssz() {


  const {userSajatAdatokLista}=useContext(userProfilContext);
  const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése


  return(
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Szerkesztés</button>
        </div>
        {userSajatAdatokLista.map((user)=>{
          return <userSajatProfil user={user} key={user.id} />
      })}
        </div>
    </div>

  );
}

/*

    const [user, setUser] = useState("");
    const {name, getName} = useState();
    const {email, getEmail} = useState();
    const {full_name, getFullName} = useState();
    const {city, getCity} = useState();
    const {tel, getTel} = useState();
    const {img_url, getImgUrl} = useState();

    useEffect(() => {
        if (authUser) {
          setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
        }
      }, [authUser]);

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const konyvAdat = {
          user,
          name,
          email,
          full_name,
          city,
          tel,
          img_url,
        };

      }
    */