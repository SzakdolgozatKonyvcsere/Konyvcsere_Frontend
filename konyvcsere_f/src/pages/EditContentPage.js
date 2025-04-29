import React from "react";
import UsersTableAdminPage from "./UsersTableAdminPage";
import ExchangesTableAdminPage from "./ExchangesTableAdminPage";
import { Link } from "react-router-dom";

function EditContentPage() {
  return (
    <>
      <div className="content-edit">
        <div className="content-edit--selection">
          <Link className="content-edit--selection__item" to="/osszesuser">
            Felhasználók
          </Link>
          <Link className="content-edit--selection__item" to="/osszeskonyv">
            Könyvek
          </Link>
          <Link className="content-edit--selection__item" to="/osszescsere">
            Cserefolyamatok
          </Link>
        </div>
      </div>
    </>
  );
}

export default EditContentPage;
