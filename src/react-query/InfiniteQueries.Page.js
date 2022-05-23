import axios from "axios";
import { Fragment } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&page=${pageParam}`);
};

const InfiniteQueriesPage = () => {
  const {
    isError,
    isLoading,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (_lastpage, pages) => {
      //using static value because json server doesn't provide total length
      if (pages.length < 4) {
        return pages.length + 1;
      } else return undefined;
    },
  });

  if (isLoading) {
    return <h2>Is Loading</h2>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Fragment>
      <div>
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.data.map((color) => (
              <h2 key={color.id}>{color.label}</h2>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </Fragment>
  );
};

export default InfiniteQueriesPage;
