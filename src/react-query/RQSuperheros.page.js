import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {useAddSuperHero, UseSuperHerosData} from "./hooks/UseSuperHeroesData";

const fetchSuperHeros = (r) => {
  return axios.get("http://localhost:4000/superheros");
};

const RQSuperherosPage = () => {
  // const [poll, setPoll] = useState(3000);
  const [name, setName] = useState("")
  const [alterEgo, setAlterEgo] = useState("")

  const onSuccess = (res) => {
    console.log("perform side effect after Success", res);
    // if (res.data.length > 3) {
    //   setPoll(false);
    // }
  };

  const onError = (e) => {
    // setPoll(false);

    console.log("perform side effect after Error", e);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    UseSuperHerosData(onSuccess, onError);

    const {mutate: addHero, isLoading: _isLoading, isError: _isError, error: _error} = useAddSuperHero()
    
  const handleAddHeroClick = () => {
    const hero = {name, alterEgo}
    addHero(hero)
  }

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

      <div>
        <input value={name} onChange={e=> setName(e.target.value)} />
        <input value={alterEgo} onChange={e=> setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick}>AddHero</button>
      </div>


      {data?.data.map((hero) => (
        <div key={hero.name}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}

      {/* {data?.data.map((hero) => (
        <div key={hero}>{hero}</div>
      ))} */}
      <button onClick={refetch}>Fetch</button>
    </div>
  );
};

export default RQSuperherosPage;
