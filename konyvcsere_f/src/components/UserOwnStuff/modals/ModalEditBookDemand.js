import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import useApiContext from '../../../contexts/ApiContext';

function ModalEditBookDemand({ show, handleClose, book }) {
  const {
    putUserUpdateBookDemand, userUpdateBookDemand, setUserUpdateBookDemand, genreList, getGenreList
  } = useApiContext();

  useEffect (()=>{
    getGenreList();
    if (book) {
      setUserUpdateBookDemand({
        publisher_name: book.publisher_name,
        title: book.title,
        language: book.language,
        genre_id: book.genre_id,
        min_publication_year: book.min_publication_year,
        max_publication_year: book.max_publication_year,
      });
    }
  }, [book]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserUpdateBookDemand((prevData) => ({
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
              value={userUpdateBookDemand.publisher_name || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cím</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={userUpdateBookDemand.title || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Műfaj</Form.Label>
            <Form.Select
              name="genre_id"
              value={userUpdateBookDemand.genre_id || ""}
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
              value={userUpdateBookDemand.language || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Minimum kiadási év</Form.Label>
            <Form.Control
              type="number"
              name="min_publication_year"
              value={userUpdateBookDemand.min_publication_year || ""}
              onChange={handleInputChange}
              min={1700}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Maximum kiadási év</Form.Label>
            <Form.Control
              type="number"
              name="max_publication_year"
              value={userUpdateBookDemand.max_publication_year || ""}
              onChange={handleInputChange}
              max={new Date().getFullYear()}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>vissza</Button>
        <Button
          variant="primary"
          className="btn-primary"
          onClick={() => putUserUpdateBookDemand(book.demand_id, userUpdateBookDemand)}
        >módosítás</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditBookDemand