import React from "react";
import Card from "react-bootstrap/Card";

export default function SkeletCard({ skelet }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{skelet.name}</Card.Title>
          <Card.Subtitle>{skelet.description}</Card.Subtitle>
          <Card.Text>{skelet.status}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
