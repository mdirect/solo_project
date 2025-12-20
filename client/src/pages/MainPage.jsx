import React from "react";
import Loader from "../shared/hocs/Loader";

export default function MainPage({ user }) {
  return (
    <>
      <Loader isLoading={!user.data}>
        <h2>
          Добро пожаловать
          {user.status === "logged" ? `, ${user.data?.name}!` : `!`}
        </h2>
        <p>
          <span>Skelet</span> — разберем ваш код по косточкам!
        </p>
      </Loader>
    </>
  );
}
