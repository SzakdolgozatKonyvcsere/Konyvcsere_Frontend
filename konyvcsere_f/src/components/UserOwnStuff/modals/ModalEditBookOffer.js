import React, { useEffect } from 'react'
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

  useEffect(() => {
    if (book && genreList.length > 0) {
      getGenreList();
      setUserUpdateBookOffer({
        publisher_name: book.publisher_name,
        title: book.title,
        language: book.language,
        genre_id: genreList.find(g => g.genre_name === book.genre_name)?.genre_id || "",
        publication_year: book.publication_year
      });
    }
  }, [book, genreList]);

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
              value={userUpdateBookOffer.publisher_name || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cím</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={userUpdateBookOffer.title || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Műfaj</Form.Label>
            <Form.Select
              name="genre_id"
              value={userUpdateBookOffer.genre_id || ""}
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
              value={userUpdateBookOffer.language || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Minimum kiadási év</Form.Label>
            <Form.Control
              type="number"
              name="publication_year"
              value={userUpdateBookOffer.publication_year || ""}
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
          onClick={() => putUserUpdateBookOffer(userUpdateBookOffer.offer_id, userUpdateBookOffer)}
        >módosítás</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditBookOffer