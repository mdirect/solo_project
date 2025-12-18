import React from "react";
import { Outlet, useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import { Button, Col, Row } from "react-bootstrap";
import { LogOut } from "lucide-react";
import UserApi from "../../entities/user/api/UserApi";

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await UserApi.logout();
      setUser({ status: "guest", data: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={6}>
            <h1>Словарь разработчика</h1>
          </Col>
          <Col sm={2}></Col>
          <Col sm={4}>
            {user.status === "logged" ? (
              <div>
                {user.data?.name}
                <Button onClick={logoutHandler}>
                  <LogOut />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  navigate("/registery");
                }}
              >
                Войти
              </Button>
            )}
          </Col>
        </Row>
        <Outlet />
      </Container>
    </>
  );
}
