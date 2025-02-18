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

                {/* Admin és User útvonalai */}
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
                
                {/* Admin specifikus útvonalak */}
                {user && user.role === 0 && (
                    <Route                   
                        element={                     
                                <AdminLayout />                            
                        }
                    >
                    </Route>
                     )}

                {/* User specifikus útvonalak */}
                {user && user.role === 1 && (
                    <Route                   
                        element={                     
                                <UserLayout />
                            
                        }
                    >
                    </Route>
                     )}
          </Routes>
        
      );
  }
  
  export default App;
