import { BrowserRouter, Route, Routes } from "react-router-dom";
import VendegLayout from "./layouts/VendegLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import useAuthContext from "./contexts/AuthContext";
import TablazatKonyvek from "./components/TablazatKonyvek";
import React, { Suspense } from "react";
import Loader from "./components/Loader";


const Kezdolap = React.lazy(() => import("./pages/Kezdolap"));
const Bejelentkezes = React.lazy(() => import("./pages/Bejelentkezes"));
const Regisztracio = React.lazy(() => import("./pages/Regisztracio"));
const KezdolapUser = React.lazy(() => import("./pages/KezdolapUser"));
const UsersTableAdmin = React.lazy(() => import("./pages/UsersTableAdmin"));
const KonyvFeltoltes = React.lazy(() => import("./components/KonyvFeltoltes"));

function App() {
  const { user } = useAuthContext();
  
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        {/* Vendég layout */}
        {!user && (
          <Route element={<VendegLayout />}>        
              <Route path="/" element={<Kezdolap/>} />
              <Route path="bejelentkezes" element={<Bejelentkezes />} />
              <Route path="regisztracio" element={<Regisztracio />} />          
          </Route>  
        )}

        {/* Admin specifikus útvonalak */}
        {user && user.role === 0 && <Route element={<AdminLayout />}>
          <Route path="/" element={<Kezdolap />} />
          <Route path="osszesuser" element={<UsersTableAdmin />} />
          {/*<Route path="osszeskonyv" element={<TablazatKonyvek />} />*/}
        </Route>}

        {/* User specifikus útvonalak */}
        {user && user.role === 1 && <Route element={<UserLayout />}>
          <Route path="/" element={<KezdolapUser />} />
          <Route path="konyvfeltoltes" element={<KonyvFeltoltes />} />
          {/*<Route path="osszeskonyv" element={<TablazatKonyvek />} />*/}
        </Route>}
      </Routes>
    </Suspense>
  );
}

export default App;
