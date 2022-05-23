import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = ({ queryKey }) => {
  return axios.get("http://localhost:4000/superheros/" + queryKey[1]);
};

const UseSuperHeroData = (heroId) => {
  const querClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = querClient
        .getQueryData("super-heros")
        ?.data.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return {
          data: hero,
        }
      } else return undefined
    },
  });
};

export default UseSuperHeroData;
