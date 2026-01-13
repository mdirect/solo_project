import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Trash } from "lucide-react";

function EditForm({
  planUpd,
  setPlanUpd,
  onUpdate,
  setShowEditForm,
  onDelete,
}) {
  const submitHandler = (event) => {
    event.preventDefault();
    onUpdate(planUpd.id, planUpd);
    setShowEditForm(false);
  };

  return (
    <>
      <br />
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Название
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={planUpd.title}
              onChange={(ev) =>
                setPlanUpd({ ...planUpd, title: ev.target.value })
              }
              placeholder="Наименование"
              name="title"
              autoFocus
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Описание
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={planUpd.description}
              onChange={(ev) =>
                setPlanUpd({ ...planUpd, description: ev.target.value })
              }
              placeholder="Описание"
              name="description"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Картинка
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={planUpd.image}
              onChange={(ev) =>
                setPlanUpd({ ...planUpd, image: ev.target.value })
              }
              placeholder="Описание"
              name="image"
            />
          </Col>
        </Form.Group>
        <Row>
          <Col sm="4">
            <button
              className="button_edit_form"
              onClick={() => setShowEditForm((prev) => !prev)}
            >
              Скрыть
            </button>
          </Col>
          <Col sm="4">
            <button
              className="button_edit_form"
              variant="primary"
              type="submit"
            >
              Отправить
            </button>
          </Col>
          <Col sm="4">
            <button className="button_delete" onClick={onDelete}>
              <Trash />
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default EditForm;
