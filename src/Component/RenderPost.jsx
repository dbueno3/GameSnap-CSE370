import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RenderPost = () => {
  const params = useParams();
  const userId = params.userId;
  return <h1>Rendered Post of {userId}</h1>;
};

export default RenderPost;
