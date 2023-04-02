import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import RenderProfile from "../../Component/RenderProfile.jsx";

const SearchedFriend = () => {
  const params = useParams();
  const userId = params.userId;
  return <RenderProfile userId={userId} />;
};

export default SearchedFriend;
