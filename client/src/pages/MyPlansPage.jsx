import React, { useEffect, useState } from "react";
import { SquarePlus, X } from "lucide-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import AddForm from "../features/AddForm/AddForm";
import PlanCard from "../widgets/PlanCard/PlanCard";
import axiosInstance from "../shared/lib/axiosInstance";
import Loader from "../shared/hocs/Loader";

export default function MyPlansPage({ user }) {
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
        title: dataForApi.title,
        description: dataForApi.description,
        image: dataForApi.image,
      };

      if (!dataForApi.title || !dataForApi.description || !dataForApi.image)
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
        title: updatePlan.title,
        description: updatePlan.description,
        image: updatePlan.image,
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
                <>
                  <Col sm={4}>
                    <PlanCard
                      key={obj.id}
                      plan={obj}
                      onDelete={() => deleteHandler(obj.id)}
                      onUpdate={updateHandler}
                      user={user}
                    />
                  </Col>
                </>
              ))}
          {user.status !== "guest" ? (
            <Col sm={4}>
              <Card>
                <button
                  className="button_add_form"
                  onClick={() => showAddForm((prev) => !prev)}
                >
                  {addForm ? <X /> : <SquarePlus />}
                </button>
                {addForm ? <AddForm submitHandler={submitHandler} /> : ``}
              </Card>
            </Col>
          ) : (
            ``
          )}
        </Row>
      </Loader>
    </>
  );
}
