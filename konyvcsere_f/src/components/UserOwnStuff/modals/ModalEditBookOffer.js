import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import useApiContext from '../../../contexts/ApiContext';

function ModalEditBookOffer({ show, handleClose, book}) {
  const {
    putUserUpdateBookOffer, userUpdateBookOffer, setUserUpdateBookOffer, genreList, getGenreList
  } = useApiContext();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserUpdateBookOffer((prevData) => ({
      ...prevData,
      [name]: value, // Frissítjük a state-et kapott névvel és értékkel
    }));
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>szerkesztés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Kiadó</Form.Label>
            <Form.Control
              type="text"
              name="publisher_name"
              value={book.publisher_name || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cím</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={book.title || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Műfaj</Form.Label>
            <Form.Select
              name="genre_id"
              value={book.genre_id || ""}
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
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nyelv</Form.Label>
            <Form.Control
              type="text"
              name="language"
              value={book.language || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Minimum kiadási év</Form.Label>
            <Form.Control
              type="number"
              name="publication_year"
              value={book.publication_year || ""}
              onChange={handleInputChange}
              min={1700} max={new Date().getFullYear()}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>vissza</Button>
        <Button
          variant="primary"
          className="btn-primary"
          onClick={() => putUserUpdateBookOffer(book.offer_id, userUpdateBookOffer)}
        >módosítás</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditBookOffer