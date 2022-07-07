import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import { getBLogsById } from "../api/axios";

interface postProps {}

const Post: React.FC<postProps> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getBLogsById(intId).then(({ data, fetching }) => {
      setBlogs(data);
      setLoading(fetching);
    })
  })
  console.log(blogs)
  return (
    <Wrapper variant="large">
      
    </Wrapper>
  );
};

export default Post;
