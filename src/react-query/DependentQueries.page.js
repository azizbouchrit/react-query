import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
  return axios.get("http://localhost:4000/users/" + email);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get("http://localhost:4000/channels/" + channelId);
};

const DependentQueriesPage = ({ email }) => {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery(["user", email], () => fetchUserByEmail(email));
  const channelId = user?.data.channelId;

  const {
    data: courses,
    isError: coursesError,
    isLoading: coursesLoading,
  } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  if (isLoading || coursesLoading) {
    return <h2>Loading</h2>;
  }
  if (isError || coursesError) {
    return <h2>Error</h2>;
  }
  return (
    <ul>
      {courses.data.courses.map((course) => (
        <li key={course}>{course}</li>
      ))}
    </ul>
  );
};

export default DependentQueriesPage;
