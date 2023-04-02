import { useParams } from "react-router-dom";

const SearchedFriend = () => {
  const params = useParams();
  const username = params.username;
  return <h1>{username}</h1>;
};

export default SearchedFriend;
