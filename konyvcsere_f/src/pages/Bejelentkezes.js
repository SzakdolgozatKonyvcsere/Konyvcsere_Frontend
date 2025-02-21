import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);

  const { loginReg, errors, user } = useAuthContext();  

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    } else {
      setLoading(false);
    }
  }, [user, navigate]);
  if (loading) {
    return null;
  }  

  const handleSubmit = async (e) => {
    e.preventDefault(); //megakadályozza az alapértelmezett újratöltődést

    //összegyűjtjük az adatokat egyetlen objektumba
    const adat = {
      email: email,
      password: password,
    };

    loginReg(adat, "/login");
  };

  // value beállítása a state értékére
  // state értékének módosítása ha változik a beviteli mező tartalma
  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); }} className="form-control" id="email" placeholder="email" name="email" />
        </div>
        <div>
          {errors.email && (<span className="text-danger">{errors.email[0]}</span>)}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Jelszó:</label>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); }} className="form-control" id="password" placeholder="jelszó" name="password" />
          <div>
            {errors.password && (<span className="text-danger">{errors.password[0]}</span>)}
          </div>
        </div>

        <div className=" text-center">
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <p>
            Még nincs fiókja?
            <Link className="nav-link text-info" to="/regisztracio">Regisztráció</Link>
          </p>
        </div>
      </form>
    </div>
  );
}