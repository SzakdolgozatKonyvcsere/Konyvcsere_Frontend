import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function NoPage() {
  const navigate = useNavigate("");
  
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate("/")
    }, 2000);
    return () => {clearTimeout(timeOut)};
  }, [navigate]);
  return (
      <h1>Nem létező oldal... Átírányítás kezdőlapra...</h1>
  )
}

export default NoPage