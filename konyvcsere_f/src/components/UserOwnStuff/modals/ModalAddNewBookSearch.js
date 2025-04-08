import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import useAuthContext from '../../../contexts/AuthContext';
import useApiContext from '../../../contexts/ApiContext';

function ModalAddNewBookSearch({ show, handleClose, onUpdated }) {

  const { user } = useAuthContext();
  const { postBookSearch, genreList } = useApiContext();
  
  const [validated, setValidated] = useState(false);
  const [bookDemandData, setBookDemandData] = useState({
    user:user.id,
    publisher_name:"",
    title:"",
    genre_id:"",
    authors:"",
    language:"",
    min_publication_year:"",
    max_publication_year:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDemandData((prevData) => ({
      ...prevData,
      [name]: value, // Frissítjük a state-et kapott névvel és értékkel
    }));
  }

  const handleSubmit = async () => {
    const form = document.getElementById("upload-user-book-demand-form");
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
  
    setValidated(true);
  
    const formData = new FormData();
    Object.entries(bookDemandData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    await postBookSearch(formData);
    onUpdated();
    await handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Keresés felvitele</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="upload-user-book-demand-form" noValidate validated={validated}>
          <Form.Group className="mb-3">
            <Form.Label>Kiadó</Form.Label>
            <Form.Control
              type="text"
              name="publisher_name"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Kérem töltse ki ezt a mezőt!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cím (kötelező)</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Kérem töltse ki ezt a mezőt!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Műfaj (kötelező)</Form.Label>
            <Form.Select
              name="genre_id"
              onChange={handleInputChange}
              required
            >
              <option value="">-- Válassz műfajt --</option>
              {genreList.map((genre) => (
                <option key={genre.genre_id} value={genre.genre_id}>
                  {genre.genre_name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Kérem töltse ki ezt a mezőt!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Szerzők (több szerzőt felsorolhat vesszővel elválasztva)</Form.Label>
            <Form.Control
              type="text"
              name="authors"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Kérem töltse ki ezt a mezőt!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nyelv</Form.Label>
            <Form.Control
              type="text"
              name="language"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Kérem töltse ki ezt a mezőt!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Minimum kiadási év (kötelező)</Form.Label>
            <Form.Control
              type="number"
              name="min_publication_year"
              onChange={handleInputChange}
              min={1700}
              required
            />
            <Form.Control.Feedback type="invalid">Kérem töltse ki ezt a mezőt!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Maximum kiadási év (kötelező)</Form.Label>
            <Form.Control
              type="number"
              name="max_publication_year"
              onChange={handleInputChange}
              max={new Date().getFullYear()}
              required
            />
            <Form.Control.Feedback type="invalid">Kérem töltse ki ezt a mezőt!</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>mégse</Button>
        <Button variant='primary' onClick={handleSubmit}>feltölt</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAddNewBookSearch