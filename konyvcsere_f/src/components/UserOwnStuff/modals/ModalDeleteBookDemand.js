import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import useApiContext from '../../../contexts/ApiContext'

function ModalDeleteBookDemand({show, handleClose, book, onUpdated}) {
  const {softDeleteBookDemand} = useApiContext();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Keresés törlése</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Biztos törölni szeretnéd?</span>
        <Button onClick={handleClose}>nem</Button>
        <Button onClick={ async () => {
            await softDeleteBookDemand(book.demand_id)
            onUpdated();
            await handleClose();
          }
        }>igen</Button>
      </Modal.Body>
    </Modal>
  )
}

export default ModalDeleteBookDemand