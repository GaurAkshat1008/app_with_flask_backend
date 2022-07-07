import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/Layout";
import { getBlogsById } from "../../api/axios";

interface postProps {}

const Post: React.FC<postProps> = ({}) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  useEffect(() => {
    // setTimeout(() => {
    if(intId !== -1){
      getBlogsById(intId).then(({ data, fetching }) => {
        setBlogs(data);
        setLoading(fetching);
      });
    }

    // }, 1500);
  }, [intId]);
  let body = null;
  if (loading) {
    body = (<Flex
        boxShadow={"dark-lg"}
        bg={"blackAlpha.300"}
        p={4}
        minH={"70vh"}
        flexDir="column"
        w={"100%"}
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4"/>
        <SkeletonText mt="4" noOfLines={4} spacing="4"/>
        <SkeletonText mt="4" noOfLines={4} spacing="4"/>
      </Flex>)
  } else {
    body = (
      <Flex
        boxShadow={"dark-lg"}
        bg={"blackAlpha.300"}
        p={4}
        h={"70vh"}
        flexDir="column"
        w={"100%"}
      >
        <Box flex={0.1} ml="auto" mr={"auto"} p={4}>
          {blogs[0]}
        </Box>
        <Flex flex={0.1} justifyContent={"space-between"}>
          <Box>{blogs[2]}</Box>
          <Box>{blogs[3]}</Box>
        </Flex>
        <Box flex={0.8} p={4} border="1px solid white">
          {blogs[1]}
        </Box>
      </Flex>
    );
  }
  // console.log(blogs);
  return (
    <Layout variant="large">
      <Flex>{body}</Flex>
    </Layout>
  );
};

export default Post;
