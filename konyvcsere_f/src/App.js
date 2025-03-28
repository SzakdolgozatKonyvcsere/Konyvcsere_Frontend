import { BrowserRouter, Route, Routes } from "react-router-dom";
import VendegLayout from "./layouts/VendegLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import useAuthContext from "./contexts/AuthContext";
import React, { Suspense } from "react";
import Loader from "./components/Loader";
import { BookuploadContext } from "./contexts/BookuploadContext";
import UserOwnInfo from "./pages/UserOwnInfo";
import AllAvailableBooks from "./pages/AllAvailabelBooks";
import OtherUserInfo from "./pages/OtherUserInfo";

const Kezdolap = React.lazy(() => import("./pages/Kezdolap"));
const Bejelentkezes = React.lazy(() => import("./pages/Bejelentkezes"));
const Regisztracio = React.lazy(() => import("./pages/Regisztracio"));
const KezdolapUser = React.lazy(() => import("./pages/KezdolapUser"));
const EditContentPage = React.lazy(() => import("./pages/EditContentPage"));
const UsersTableAdminPage = React.lazy(() => import("./pages/UsersTableAdminPage"));
const BooksTableAdminPage = React.lazy(() => import("./pages/BooksTableAdminPage")) ;
const KonyvFeltoltes = React.lazy(() => import("./components/KonyvFeltoltes"));
const KonyvInfoSajat = React.lazy(() => import("./pages/UserOwnBooksInfo"));

function App() {
  const { user } = useAuthContext();
  const { loading } = useAuthContext();

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        {/* Vendég layout */}
        {!user && (
          <Route element={<VendegLayout />}>        
              <Route path="/" element={<Kezdolap/>} />
              <Route path="/bejelentkezes" element={<Bejelentkezes />} />
              <Route path="regisztracio" element={<Regisztracio />} />          
          </Route>  
        )}

        {/* Admin specifikus útvonalak */}
        {user && user.role === 0 && <Route element={<AdminLayout />}>
          <Route path="/" element={<Kezdolap />} />
          <Route path="osszesuser" element={<UsersTableAdminPage />} />
          <Route path="osszeskonyv" element={<BooksTableAdminPage />} />
          <Route path="tartalomszerk" element={<EditContentPage />} />
          <Route path="profil" element={<UserOwnInfo />} />
        </Route>}

        {/* User specifikus útvonalak */}
        {user && user.role === 1 && <Route element={<UserLayout />}>
          <Route path="/" element={<KezdolapUser />} />
          <Route path="konyvek-sajat" element={<KonyvInfoSajat />} />
          <Route path="konyvfeltoltes" element={<KonyvFeltoltes />} />
          <Route path="konyvkereses" element={<AllAvailableBooks />} />
          <Route path="profil" element={<UserOwnInfo />} />
          <Route path="/profil/:id" element={<OtherUserInfo />} />
          {/*<Route path="osszeskonyv" element={<TablazatKonyvek />} />*/}          
        </Route>}
      </Routes>
    </Suspense>
  );
}

export default App;
