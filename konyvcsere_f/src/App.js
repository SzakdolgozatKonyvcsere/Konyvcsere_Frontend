import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import useAuthContext from "./contexts/AuthContext";
import TablazatKonyvek from "./components/TablazatKonyvek";

    function App() {
        const { user } = useAuthContext(); 
        console.log(user)
      return (
          <Routes>
              {/* Vendég layout */}
              {!user && (
                    <Route element={<VendegLayout />}>
                        <Route path="/" element={<Kezdolap />} />
                        <Route path="bejelentkezes" element={<Bejelentkezes />} />
                        <Route path="regisztracio" element={<Regisztracio />} />
                    </Route>
                )}

                {/* Admin és User ugyanazon útvonalon */}
                {user && (
                    <Route                   
                        element={                     
                                <AdminLayout />
                           
                        }
                    >
                          <Route path="/" element={<Kezdolap />} />
                        <Route path="osszeskonyv" element={<TablazatKonyvek />} />
                    </Route>
                     )}
          </Routes>
        
      );
  }
  
  export default App;
