import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Regisztracio(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    const navigate = useNavigate();

    
}