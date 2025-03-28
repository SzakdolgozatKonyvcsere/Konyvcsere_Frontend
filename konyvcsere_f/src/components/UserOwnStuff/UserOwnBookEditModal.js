import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function UserOwnBookEditModal({ show, handleClose, data }) {
  const interFaceType = (key, value) => {
    if (typeof value === "number") return "number";
    if (key.includes('img_url')) return value ? "image-preview" : "file";
    return "text";
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>szerkesztés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.entries(data).map(([key, value]) => {
            return ( <Form.Group key={key} className="mb-3">
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  type={interFaceType(key, value)}
                  defaultValue={typeof value === "object" ? JSON.stringify(value) : value} />
              </Form.Group>
            )
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>vissza</Button>
        <Button variant="primary" className="btn-primary">módosítás</Button>
      </Modal.Footer>
    </Modal>
  );
}