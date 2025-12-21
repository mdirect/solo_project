import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Trash, SquarePen } from "lucide-react";
import EditForm from "../../features/EditForm/EditForm";

export default function SkeletCard({ skelet, onDelete, onUpdate }) {
  const [editSkelet, showEditSkelet] = useState(false);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{skelet.name}</Card.Title>
          <Card.Subtitle>{skelet.description}</Card.Subtitle>
          <Card.Text>{skelet.status}</Card.Text>
          {/* {!editSkelet ? (
            <EditForm skelet={skelet} showEditSkelet={showEditSkelet} onUpdate={onUpdate} />
          ) : ( */}
          <Button onClick={() => {} /*showEditSkelet((prev) => !prev)*/}>
            <SquarePen />
          </Button>
          {/* )} */}

          <Button onClick={onDelete}>
            <Trash />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
