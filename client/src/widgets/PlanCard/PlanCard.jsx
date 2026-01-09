import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Trash, SquarePen } from "lucide-react";
import EditForm from "../../features/EditForm/EditForm";

export default function PlanCard({ user, plan, onDelete, onUpdate }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [planUpd, setPlanUpd] = useState(plan);

  return (
    <>
      <Card className="plan_card">
        <Card.Body>
          <Row>
            <Col sm={2}>
              {plan.status ? (
                <Card.Text style={{ color: "rgba(116, 198, 86)" }}>
                  ready
                </Card.Text>
              ) : (
                <Card.Text style={{ color: "rgba(198, 123, 86)" }}>
                  prepare
                </Card.Text>
              )}
            </Col>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Card.Title>{plan.name}</Card.Title>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Card.Img
                style={{ maxWidth: "225px" }}
                alt="image"
                src={plan.image || "./plan_icon.png"}
              ></Card.Img>
            </Col>
            <Col sm={8}>
              <Card.Subtitle>{plan.description}</Card.Subtitle>
            </Col>
          </Row>
          <Row>
            <Col sm={10}></Col>
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
            <Col sm={2}>
              {user.data.id === plan.userId && !showEditForm ? (
                <button
                  className="button_edit"
                  onClick={() => setShowEditForm((prev) => !prev)}
                >
                  <SquarePen />
                </button>
              ) : (
                ""
              )}
              {user.data.id === plan.userId && !showEditForm ? (
                <button className="button_delete" onClick={onDelete}>
                  <Trash />
                </button>
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
