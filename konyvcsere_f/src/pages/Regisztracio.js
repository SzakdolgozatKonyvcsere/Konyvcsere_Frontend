import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Regisztracio(){
    const [user_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [full_name, setUserName] = useState("");
    const [city, setCity] = useState("");
    const [tel, setTel] = useState("");
    //const [img_url, setImgUrl] = useState("");

    const navigate = useNavigate();
    const {loginReg, errors} = useAuthContext();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    //összegyűjtjük az adatokat egyetlen objektumba
        const adat = {
            user_name:user_name,
            email:email,
            password:password,
            password_confirmation:password_confirmation,
            full_name:full_name,
            city:city,
            tel:tel,
            //img_url:img_url,
        };
        console.log(adat);
        loginReg(adat, "/register");
    };
    return(
        <div className=" m-auto" style={{ maxWidth: "400px" }}>
        <h1 className="text-center">Regisztráció</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="user_name" className="form-label">Felhaszálónév:</label>
            <input type="text" value={user_name} onChange={(e) => {setName(e.target.value);}} className="form-control" id="user_name" placeholder="Felhaszálónév" name="user_name"/>
            <div>
              {errors.name && (<span className="text-danger">{errors.name[0]}</span>)}
            </div>
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value);}} className="form-control" id="email" placeholder="email" name="email"/>
            <div>
              {errors.email && (<span className="text-danger">{errors.email[0]}</span>)}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Jelszó:</label>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value);}} className="form-control" id="password" placeholder="jelszó" name="password"
            />
            <div>
              {errors.password && (<span className="text-danger">{errors.password[0]}</span>)}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password2" className="form-label">Jelszó újra:</label>
            <input type="password" value={password_confirmation} onChange={(e) => {setPasswordConfirmation(e.target.value);}} className="form-control" id="password2" placeholder="jelszó újra" name="password2"/>
            <div>
              {errors.password_confirmation && (<span className="text-danger">{errors.password_confirmation[0]}</span>)}
            </div>
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="full_name" className="form-label">Név:</label>
            <input type="text" value={full_name} onChange={(e) => {setUserName(e.target.value);}} className="form-control" id="full_name" placeholder="Név" name="full_name"/>
            <div>
              {errors.user_name && (<span className="text-danger">{errors.user_name[0]}</span>)}
            </div>
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="city" className="form-label">Város:</label>
            <input type="text" value={city} onChange={(e) => {setCity(e.target.value);}} className="form-control" id="city" placeholder="Város" name="city"/>
            <div>
              {errors.city && (<span className="text-danger">{errors.city[0]}</span>)}
            </div>
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="tel" className="form-label">Telefonszám:</label>
            <input type="text" value={tel} onChange={(e) => {setTel(e.target.value);}} className="form-control" id="tel" placeholder="Telefonszám" name="tel"/>
            <div>
              {errors.tel && (<span className="text-danger">{errors.tel[0]}</span>)}
            </div>
          </div>
          
  
          <button type="submit" className="btn btn-primary w-100">Regisztrálok</button>
        </form>
      </div>
    );
    /*<div className="mb-3 mt-3">
    <label htmlFor="img_url" className="form-label">Profilkép:</label>
    <input type="text" value={img_url} onChange={(e) => {setImgUrl(e.target.value);}} className="form-control" id="img_url" placeholder="Profilkép" name="img_url"/>
    <div>
      {errors.img_url && (<span className="text-danger">{errors.img_url[0]}</span>)}
    </div>
  </div>*/
}