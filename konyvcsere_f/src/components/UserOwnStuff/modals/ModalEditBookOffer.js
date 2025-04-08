import React, { useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import useApiContext from '../../../contexts/ApiContext';

function ModalEditBookOffer({ show, handleClose, book, onUpdated}) {
  const {
    putUserUpdateBookOffer, userUpdateBookOffer, setUserUpdateBookOffer, genreList, getGenreList, getUserBookOffersInfo
  } = useApiContext();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserUpdateBookOffer((prevData) => ({
      ...prevData,
      [name]: value, // Frissítjük a state-et kapott névvel és értékkel
    }));
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUserUpdateBookOffer(prev => ({
      ...prev,
      imageFile: file
    }));
  };

  useEffect(() => {
    getGenreList();
  }, []);

  useEffect(() => {
    if (book && genreList.length > 0) {
      setUserUpdateBookOffer({
        publisher_name: book.publisher_name,
        title: book.title,
        language: book.language,
        authors: book.authors,
        genre_id: genreList.find(g => g.genre_name === book.genre_name)?.genre_id || "",
        publication_year: book.publication_year,
        quality: book.quality,
        img_url: book.img_url
      });
    }
  }, [book, genreList]);

  if (!userUpdateBookOffer) return null;

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
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cím</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={userUpdateBookOffer.title || ""}
              onChange={handleInputChange}
              required
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
            <Form.Label>Szerzők (több szerzőt felsorolhat vesszővel elválasztva)</Form.Label>
            <Form.Control
              type="text"
              name="authors"
              value={userUpdateBookOffer.authors|| ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nyelv</Form.Label>
            <Form.Control
              type="text"
              name="language"
              value={userUpdateBookOffer.language || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kiadási év</Form.Label>
            <Form.Control
              type="number"
              name="publication_year"
              value={userUpdateBookOffer.publication_year || ""}
              onChange={handleInputChange}
              min={1700} max={new Date().getFullYear()}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Minőség</Form.Label>
            <Form.Control
              type="number"
              name="quality"
              value={userUpdateBookOffer.quality || ""}
              onChange={handleInputChange}
              min={1} max={5}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kép (opcionális)</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Form.Group>
          {/*userUpdateBookOffer.img_url && (
            <div className="mb-3">
              <Form.Label>Jelenlegi kép</Form.Label>
              <div>
                <img
                  src={`http://localhost:8000/${userUpdateBookOffer.img_url}`}
                  alt="Jelenlegi könyv kép"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </div>
            </div>
          )*/}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>vissza</Button>
        <Button
          variant="primary"
          //className="btn-primary"
          onClick={async () => {
            await putUserUpdateBookOffer(book.offer_id, userUpdateBookOffer);
            await getUserBookOffersInfo();
            onUpdated();
            await handleClose();
            //window.location.reload();
          }}
        >
          módosítás
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditBookOffer