import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddForm({ submitHandler }) {
  return (
    <>
      <Form stile={{ padding: "5px" }} onSubmit={submitHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Название
          </Form.Label>
          <Col sm="8">
            <Form.Control type="text" placeholder="Наименование" name="title" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Описание
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
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
            <Form.Control type="text" placeholder="Изображение" name="image" />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </>
  );
}

export default AddForm;
