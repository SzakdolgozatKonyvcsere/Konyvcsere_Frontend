import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import useAuthContext from "./contexts/AuthContext";
import TablazatKonyvek from "./components/TablazatKonyvek";
import Loader from "./components/Loader";
import { myAxios } from "./api/axios";
import UsersTablazatAdmin from "./pages/UsersTablazatAdmin";
import KezdolapUser from "./pages/KezdolapUser";

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

      {/* Admin specifikus útvonalak */}
      {user && user.role === 0 && <Route element={<AdminLayout />}>
        <Route path="/" element={<Kezdolap />} />
        <Route path="osszesuser" element={<UsersTablazatAdmin />} />
        {/*<Route path="osszeskonyv" element={<TablazatKonyvek />} />*/}
      </Route>}

      {/* User specifikus útvonalak */}
      {user && user.role === 1 && <Route element={<UserLayout />}>
        <Route path="/" element={<KezdolapUser />} />
        {/*<Route path="osszeskonyv" element={<TablazatKonyvek />} />*/}
      </Route>}
    </Routes>
  );
}

export default App;
