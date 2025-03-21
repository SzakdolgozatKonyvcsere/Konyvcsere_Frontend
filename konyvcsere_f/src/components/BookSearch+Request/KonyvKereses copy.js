import React, { useCallback, useContext, useEffect } from 'react'
import { createContext, useState } from "react";
import { myAxios } from "../../api/axios";
import useApiContext from '../../contexts/ApiContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import KonyvKeresKartyak from '../KonyvKeresKartyak';

export default function KonyvKereses() {
  const { getAllAvailableOfferedBooks, availableBookLista, setAvailableBookLista } = useApiContext();


  const [searchQuery, setSearchQuery] = useState('');
  

  function handleSearch(){
    setSearchQuery(e.target.value)
  }
  
  return (
    <div>
      <h1>Könyvek keresése</h1>
      <h3>Elérhető könyvek: </h3>
      <label>Cím</label>
      <input
                type="text"
                placeholder="Keresés könyvcím alapján..."
                value={searchQuery}
                onChange={(e) => handleSearch()}
                style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
            />

        
    
            <Card style={{ width: '18rem' }}>
            <Card.Body> 
                {availableBookLista.map((book) => {
                        return <KonyvKeresKartyak book={book} key={book.id} />
                    })
                }
            <Button variant="primary">Részletek</Button>
        </Card.Body>
        </Card>



    </div>
  )
}