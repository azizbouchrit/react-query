import { useParams } from "react-router-dom";
import UseSuperHeroData from "./hooks/UseSuperHeroData";

const RQSuperHeroPage = () => {
  const { heroId } = useParams();

  const { data, isLoading, isError, error } = UseSuperHeroData(heroId);

  console.log(data);
  if (isLoading) {
    return <h2>Loading</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};

export default RQSuperHeroPage;
