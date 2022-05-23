import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import UseSuperHerosData from "./hooks/UseSuperHeroesData";

const fetchSuperHeros = (r) => {
  return axios.get("http://localhost:4000/superheros");
};

const RQSuperherosPage = () => {
  // const [poll, setPoll] = useState(3000);

  const onSuccess = (res) => {
    console.log("Success", res);
    if (res.data.length > 3) {
      // setPoll(false);
    }
  };

  const onError = (e) => {
    // setPoll(false);

    console.log("Error", e);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    UseSuperHerosData(onSuccess, onError);

  console.log(isLoading, isFetching);

  if (isLoading) {
    return <h2>Is Loading</h2>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h2>RQ SuperHerosPage</h2>
      <button onClick={refetch}>Fetch</button>

      {data?.data.map((hero) => (
        <div key={hero.name}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}

      {/* {data?.data.map((hero) => (
        <div key={hero}>{hero}</div>
      ))} */}
    </div>
  );
};

export default RQSuperherosPage;
