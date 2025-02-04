import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SorKonyv from "./SorKonyv";

function TablazatKonyvek() {
    const {konyvekLista} = useContext(AuthContext);
    return (
        <div>
            <table className="konyvekTabla">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Cím</th>
                        <th scope="col">Kiadó</th>
                        <th scope="col">Mű</th>
                        <th scope="col">Nyelv</th>
                        <th scope="col">Kiadási év</th>
                        <th scope="col">Könyv állapota</th>
                    </tr>
                </thead>
                <tbody>
                    {konyvekLista.map((konyvek, key)=>(
                        <SorKonyv key={key} konyvek={konyvek}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default TablazatKonyvek;