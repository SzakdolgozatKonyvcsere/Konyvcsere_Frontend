const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése

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