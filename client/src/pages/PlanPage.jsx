import React, { useEffect, useState } from "react";
import { SquarePlus, X } from "lucide-react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import AddForm from "../features/AddForm/AddForm";
import PointCard from "../widgets/PointCard/PointCard";
import axiosInstance from "../shared/lib/axiosInstance";
import Loader from "../shared/hocs/Loader";

export default function PointPage({ user, planId }) {
  const [points, setPoints] = useState([]);
  const [addForm, showAddForm] = useState(false);

  async function getPoints() {
    try {
      const { data } = await axiosInstance(`/api/points/planId=${planId}`);

      if (data) setPoints(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPoints();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));
      const newPoint = {
        name: dataForApi.name,
        description: dataForApi.description,
        status: dataForApi.status,
      };

      if (!dataForApi.name || !dataForApi.description || !dataForApi.status)
        return alert("Заполните все поля");
      const response = await axiosInstance.post("/api/points", newPoint);

      if (response.status === 201) {
        setPoints((prev) => [response.data, ...prev]);
        targetData.reset();
      }
      showAddForm((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (id, updatePoint) => {
    try {
      const response = await axiosInstance.put(`/api/points/${id}`, {
        name: updatePoint.name,
        description: updatePoint.description,
        status: updatePoint.status,
      });

      setPoints((prev) =>
        prev.map((el) => (el.id === id ? response.data : el))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete(`/api/points/${id}`);
      setPoints(points.filter((el) => el.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loader isLoading={!user.data?.id}>
        <Row>
          {points.length === 0
            ? "Здесь еще нет пунктов, но ты можешь их добавить..."
            : points.map((obj) => (
                <PointCard
                  key={obj.id}
                  point={obj}
                  onDelete={() => deleteHandler(obj.id)}
                  onUpdate={updateHandler}
                  user={user}
                />
              ))}
          {user.status !== "guest" ? (
            <Card>
              <button
                className="button_add_form"
                onClick={() => showAddForm((prev) => !prev)}
              >
                {addForm ? <X /> : <SquarePlus />}
              </button>
              {addForm ? <AddForm submitHandler={submitHandler} /> : ``}
            </Card>
          ) : (
            ``
          )}
        </Row>
      </Loader>
    </>
  );
}
