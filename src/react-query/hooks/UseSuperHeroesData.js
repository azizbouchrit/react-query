import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheros");
  };

const UseSuperHerosData = (onSuccess, onError) => {

    return  useQuery(
        "super-heros",
        fetchSuperHeros,
        {
          // cacheTime: 60000,
          // staleTime: 10000,
          // refetchOnMount: false,
          // refetchOnWindowFocus: !true,
          // refetchInterval: poll,
          // enabled: false,
          onSuccess,
          onError,
        //   select: (res) => ({
        //     ...res,
        //     data: res.data.map((hero) => hero.name),
        //   }),
        }
      );

}
 
export default UseSuperHerosData;