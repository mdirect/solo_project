import React, { useEffect, useState } from "react";
import { SquarePlus, X } from "lucide-react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import AddForm from "../features/AddForm/AddForm";
import PlanCard from "../widgets/PlanCard/PlanCard";
import axiosInstance from "../shared/lib/axiosInstance";
import Loader from "../shared/hocs/Loader";

export default function PlanPage({ user }) {
  const [plans, setPlans] = useState([]);
  const [addForm, showAddForm] = useState(false);

  async function getPlans() {
    try {
      const { data } = await axiosInstance(`/api/plans`);

      if (data) setPlans(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPlans();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));
      const newPlan = {
        name: dataForApi.name,
        description: dataForApi.description,
        status: dataForApi.status,
      };

      if (!dataForApi.name || !dataForApi.description || !dataForApi.status)
        return alert("Заполните все поля");
      const response = await axiosInstance.post("/api/plans", newPlan);

      if (response.status === 201) {
        setPlans((prev) => [response.data, ...prev]);
        targetData.reset();
      }
      showAddForm((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (id, updatePlan) => {
    try {
      const response = await axiosInstance.put(`/api/plans/${id}`, {
        name: updatePlan.name,
        description: updatePlan.description,
        status: updatePlan.status,
      });

      setPlans((prev) => prev.map((el) => (el.id === id ? response.data : el)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete(`/api/plans/${id}`);
      setPlans(plans.filter((el) => el.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loader isLoading={!user.data?.id}>
        <Row>
          {plans.length === 0
            ? "Здесь еще нет планов, но ты можешь их добавить..."
            : plans.map((obj) => (
                <PlanCard
                  key={obj.id}
                  plan={obj}
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
