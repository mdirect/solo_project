import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Trash, SquarePen, ArrowBigRight } from "lucide-react";
import EditForm from "../../features/EditForm/EditForm";
import { useNavigate } from "react-router";

export default function PlanCard({ user, plan, onDelete, onUpdate }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [planUpd, setPlanUpd] = useState(plan);
  const navigate = useNavigate();

  return (
    <>
      <Card className="plan_card">
        <Card.Body>
          <Row>
            <Card.Img
              style={{ maxWidth: "225px" }}
              alt="image"
              src={plan.image || "./plan_icon.png"}
              onClick={() => {
                navigate(`/oneplan/${plan.id}`);
              }}
            ></Card.Img>
          </Row>
          <Row>
            <Card.Title>{plan.title}</Card.Title>
          </Row>
          <Row>
            <Card.Subtitle>{plan.description}</Card.Subtitle>
          </Row>
          <Row>
            <Col>
              {showEditForm ? (
                <EditForm
                  setShowEditForm={setShowEditForm}
                  onUpdate={onUpdate}
                  planUpd={planUpd}
                  setPlanUpd={setPlanUpd}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
              {user.data.id === plan.userId && !showEditForm ? (
                <>
                  <button
                    className="button_edit"
                    onClick={() => setShowEditForm((prev) => !prev)}
                  >
                    <SquarePen />
                  </button>
                  <button className="button_delete" onClick={onDelete}>
                    <Trash />
                  </button>
                  <button
                    className="button_edit"
                    onClick={() => {
                      navigate(`/oneplan/${plan.id}`);
                    }}
                  >
                    <ArrowBigRight />
                  </button>
                </>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
