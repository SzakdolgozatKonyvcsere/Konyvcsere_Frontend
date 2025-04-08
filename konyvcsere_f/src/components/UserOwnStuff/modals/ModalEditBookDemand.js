import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import useApiContext from '../../../contexts/ApiContext';

function ModalEditBookDemand({ show, handleClose, book, onUpdated }) {
  const {
    putUserUpdateBookDemand, userUpdateBookDemand, setUserUpdateBookDemand, genreList, getGenreList
  } = useApiContext();

  useEffect(() => {
    getGenreList();
  }, []);

  useEffect (()=>{
    if (book) {
      const matchingGenre = genreList.find(g => g.genre_name === book.genre_name); //Megkapjuk mufaj id-t neve alapjan
        setUserUpdateBookDemand({
          publisher_name: book.publisher_name,
          title: book.title,
          language: book.language,
          authors: book.authors,
          genre_id: matchingGenre ? matchingGenre.genre_id : "",
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
            <Form.Label>Cím (kötelező)</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={userUpdateBookDemand.title || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Műfaj (kötelező)</Form.Label>
            <Form.Select
              name="genre_id"
              value={userUpdateBookDemand.genre_id || ""}
              onChange={handleInputChange}
            >
              <option value={null}>-- Válassz műfajt --</option>
              {genreList.map((genre) => (
                <option key={genre.genre_id} value={genre.genre_id}>
                  {genre.genre_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Szerzők (több szerzőt felsorolhat vesszővel elválasztva)</Form.Label>
            <Form.Control
              type="text"
              name="authors"
              value={userUpdateBookDemand.authors|| ""}
              onChange={handleInputChange}
            />
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
            <Form.Label>Minimum kiadási év (kötelező)</Form.Label>
            <Form.Control
              type="number"
              name="min_publication_year"
              value={userUpdateBookDemand.min_publication_year || ""}
              onChange={handleInputChange}
              min={1700}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Maximum kiadási év (kötelező)</Form.Label>
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
          onClick={async () => {
            await putUserUpdateBookDemand(book.demand_id, userUpdateBookDemand);
            onUpdated();
            await handleClose();
          }}
        >módosítás</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditBookDemand