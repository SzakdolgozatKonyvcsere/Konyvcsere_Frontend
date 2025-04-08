import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import useApiContext from '../../../contexts/ApiContext';

function ModalDeleteBookOffer({ show, handleClose, book, onUpdated}) {
  const {softDeleteBookOffer} = useApiContext();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kínált könyv törlése</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Biztos törölni szeretnéd?</span>
        <Button onClick={handleClose}>nem</Button>
        <Button onClick={ async () => {
            await softDeleteBookOffer(book.offer_id);
            onUpdated();
            await handleClose();
          }
        }>igen</Button>
      </Modal.Body>
    </Modal>
  )
}

export default ModalDeleteBookOffer