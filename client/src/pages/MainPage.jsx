import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function MainPage({ user }) {
  const navigate = useNavigate();

  return (
    <>
      <h2>
        Добро пожаловать
        {user.status === "logged" ? `, ${user.data?.name}` : ``}!
      </h2>
      <p>
        <span>«Coding Wiki»</span> — персональный и при этом социальный словарь
        разработчика. Это веб-приложение, где ментор может легко сохранить
        объяснение сложного термина для своего подопечного, а джун — быстро
        найти и понять, что такое, например, «React Hook» или «Dependency
        Injection», причём так, как это объясняет его наставник.
      </p>
    </>
  );
}
