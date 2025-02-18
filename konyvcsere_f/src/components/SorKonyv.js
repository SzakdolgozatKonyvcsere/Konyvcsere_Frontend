import React from "react";


function SorKonyv(props){
   
return (
    <tr className="konyvSor">
    <td scope="row"></td>
    <td>{props.konyv.title}</td>
    <td>{props.konyv.publisher}</td>
    <td>{props.konyv.work}</td>
    <td>{props.konyv.language}</td>
    <td>{props.konyv.publication_year}</td>
    <td>{props.konyv.book_status}</td>
    </tr>
)
}
export default SorKonyv;