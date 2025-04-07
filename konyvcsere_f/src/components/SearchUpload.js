import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Form } from 'react-router-dom';

function SearchUpload() {
  const [] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('key', value);
  };


  return (
   <>
    <Form>
      

      <Button type='submit'>keresés mentése</Button>
    </Form>
   </> 
  )
}

export default SearchUpload