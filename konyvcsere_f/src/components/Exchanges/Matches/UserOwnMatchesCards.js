import React from "react";
import { Card, Button } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import useAuthContext from "../../../contexts/AuthContext";

export default function UserOwnMatchesCards( {offer} ){
    const { postExchangeRequest } = useContext(ApiContext);
    const { user: authUser } = useAuthContext();

    if (!offer) return null;
    // Biztos, hogy authors tömb, de ha nem, fallback
  const authors = Array.isArray(offer.authors) ? offer.authors.join(', ') : (offer.authors || '—');
  const statusLabel = {
    s: 'Szabad',
    f: 'Foglalt',
  }[offer.status] || offer.status;

  const handleExchangeRequest = async () => {
    if (!authUser?.id) return;
    const exchangeRequest = {
      interested_user: authUser.id,
      desired_item: offer.id,
      exchange_status: 'k'
    };
    console.log("Küldendő:", exchangeRequest);
    try {
      await postExchangeRequest(exchangeRequest);
    } catch (error) {
      console.error("Hiba a kérés során:", error.response?.data || error);
    }
  };

    return(
        <>
            <div className="userOwnMatchesCards">
            <Card className="h-100">
      {offer.image_url ? (
        <Card.Img
          variant="top"
          src={
            offer.image_url.startsWith("http")
              ? offer.image_url
              : `http://localhost:8000/${offer.image_url}`
          }
          style={{  maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            display: "inline-block", height: "180px" }}
        />
      ) : (
        <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: "180px" }}>
          Nincs kép
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5">{offer.title}</Card.Title>

        <Card.Text className="text-muted mb-1">
          <strong>Publikálva:</strong> {offer.year} | {offer.language?.toUpperCase() || "—"}
        </Card.Text>
        <Card.Text className="mb-1">
          <strong>Szerzők:</strong> {authors}
        </Card.Text>
        <Card.Text className="mb-1">
          <strong>Kiadó:</strong> {offer.publisher || "—"}
        </Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top">
          <span className="fw-semibold">Minőség: {offer.quality}/5</span>
          <span
            className={`badge ${
              offer.status === "s"
                ? "bg-success"
                : offer.status === "f"
                ? "bg-warning text-dark"
                : "bg-secondary"
            }`}
          >
            {statusLabel}
          </span>
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent d-flex justify-content-end"  onClick={handleExchangeRequest}>
        <Button size="sm" className="btn btn-sm">
          Elcserélem <BiCheck />
        </Button>
      </Card.Footer>
    </Card>


            </div>
        </>
    )
}