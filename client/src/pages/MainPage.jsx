import React from "react";

export default function MainPage({ user }) {
  return (
    <>
      <div className="main_greeting">
        <div>
          <img
            className="main_img"
            alt="План с дельфином"
            src="/title_plan.png"
          />
        </div>
        <div className="main_text">
          <h2>
            Добро пожаловать
            {user.status === "logged" ? `, ${user.data?.name}!` : `!`}
          </h2>
          <p>
            <span>Plan</span> — разберем ваш код по косточкам!
          </p>
        </div>
      </div>
    </>
  );
}
