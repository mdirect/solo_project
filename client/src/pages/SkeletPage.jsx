import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import SkeletCard from "../widgets/SkeletCard/SkeletCard";
import axiosInstance from "../shared/lib/axiosInstance";
import Loader from "../shared/hocs/Loader";

export default function SkeletPage() {
  const [skelets, setSkelets] = useState([]);

  async function getSkelets() {
    try {
      const { data } = await axiosInstance(`/api/skelets`);

      if (data) setSkelets(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSkelets();
  }, []);

  return (
    <>
      <Loader isLoading={skelets.length === 0}>
        <Row>
          {skelets.map((obj) => (
            <SkeletCard key={obj.id} skelet={obj} />
          ))}
        </Row>
      </Loader>
    </>
  );
}
