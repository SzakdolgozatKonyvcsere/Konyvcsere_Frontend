import React from "react";


function SorKonyv(props){
   
return (
    <tr className="konyvSor">
    <td scope="row"></td>
    <td>{props.konyv.cim}</td>
    <td>{props.konyv.kiado}</td>
    <td>{props.konyv.mu}</td>
    <td>{props.konyv.nyelv}</td>
    <td>{props.konyv.kiadas_ev}</td>
    <td>{props.konyv.konyv_allapot}</td>
    </tr>
)
}
export default SorKonyv;