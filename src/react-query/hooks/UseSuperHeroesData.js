import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheros");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheros", hero);

}

export const UseSuperHerosData = (onSuccess, onError) => {

  return useQuery(
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


export const useAddSuperHero = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess: (res) => {
    // queryClient.invalidateQueries("super-heros")
    // queryClient.setQueriesData("super-heros", (oldQueryData) => {
    // return ({
    // ...oldQueryData,
    // data: [...oldQueryData.data, res.data]
    // })
    // })
    // },

    //Called before mutation is fired, receives same params
    onMutate: async (newHero) => {
      await queryClient.cancelMutations("super-heros")
      const previousHeroData = queryClient.getQueriesData("super-heros")
      queryClient.setQueriesData("super-heros", (oldQueryData) => {
        return ({
          ...oldQueryData,
          data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newHero }]
        })
      })
      return { previousHeroData }
    },
    onError: (_err, _hero, context) => {
      queryClient.setQueriesData("super-heros", context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heros")
    }
  })
}