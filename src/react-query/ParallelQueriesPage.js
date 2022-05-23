import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeros = (r) => {
    return axios.get("http://localhost:4000/superheros");
  };

  const fetchFriends = (r) => {
    return axios.get("http://localhost:4000/friends ");
  };

const ParallelQueriesPage= () => {

    useQuery("super-heros", fetchSuperHeros)
    useQuery("friends", fetchFriends)
    
    return ( 
        <div>ParallelQueriesPage</div>
     );
}
 
export default ParallelQueriesPage