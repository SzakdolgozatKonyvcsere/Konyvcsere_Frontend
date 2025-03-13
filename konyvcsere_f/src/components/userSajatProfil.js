export default function UserProfil({ userData }) {
  return (
 /*    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { BookuploadContext } from "../contexts/BookuploadContext";
import { myAxios } from "../api/axios";

export default function userSajatProfil(props) {
    
    


// ez idk milyen, nem néztem még, ha szar átirom csak legyen itt valami
return(

    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Edit
          </button>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={userData.img_url || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-20 h-20 rounded-full border"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{userData.full_name}</h2>
        </div>
        <div className="mt-4 space-y-2">
          <p><strong>Név:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Telefon:</strong> {userData.tel}</p>
          <p><strong>Város:</strong> {userData.city}</p>
          {/*<img src={props.profilePic} alt="Profile" className="w-20 h-20 rounded-full border" />*/}
          <h2 className="text-2xl font-semibold text-gray-800">{props.user.fullName}</h2>
        </div>
        <div className="mt-4 space-y-2">
          <p><strong>Név:</strong> {props.user.name}</p>
          <p><strong>Email:</strong> {props.user.email}</p>
          <p><strong>Telefon:</strong> {props.user.tel}</p>
          <p><strong>Város:</strong> {props.user.city}</p>
        </div>
      </div>
    </div>
  ); */
}