import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/Layout";
import { deletePost, getBlogsById, getUser } from "../../api/axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
interface postProps {}

const Post: React.FC<postProps> = ({}) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(['user', 'Not authenticated']);
  const [userFetch, setUserFetch] = useState(true);
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  useEffect(() => {
    if (intId !== -1) {
      getBlogsById(intId).then(({ data, fetching }) => {
        setBlogs(data);
        setLoading(fetching);
      });
    }
    getUser().then(({ data, fetching }) => {
      setUser(data);
      setUserFetch(fetching);
    }
    );
    console.log('main: ', user[1] === blogs[3])
  }, [intId]);
  console.log(user, userFetch);
  let body = null;
  if (loading) {
    body = (
      <Flex
        boxShadow={"dark-lg"}
        bg={"blackAlpha.300"}
        p={4}
        minH={"70vh"}
        flexDir="column"
        w={"100%"}
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Flex>
    );
  } else {
    body = (
      <>
        <Flex
          boxShadow={"dark-lg"}
          bg={"blackAlpha.300"}
          p={4}
          h={"80vh"}
          flexDir="column"
          w={"100%"}
        >
          {(!userFetch && user[1] === blogs[3]) ? (
            <Flex flexDir={"row"} ml="auto">
            <IconButton
              aria-label="delete post"
              icon={<DeleteIcon />}
              fontSize="2xl"
              color={"red.500"}
              mr={4}
              onClick={() => {
                // console.log("delete");
                deletePost(intId).then(() => {
                  router.push("/");
                });
              }}
            />
            <IconButton
              aria-label="update post"
              icon={<EditIcon />}
              fontSize="2xl"
              color={"blue.500"}
              onClick={() => {
                router.push(`/posts/update/${intId}`);
              }}
            />
          </Flex>
          ) : null}
          
          {/* <DeleteIcon ml={'auto'} fontSize='2xl' color={'red.500'}/> */}
          <Box flex={0.1} ml="auto" mr={"auto"} p={4}>
            {blogs[0]}
          </Box>
          
          <Flex flex={0.1} justifyContent={"space-between"}>
            <Box>{blogs[2]}</Box>
            <Box>{(blogs[4]) ? (<>Edited on: {blogs[4]}</>) : (<>Created on: {blogs[3]}</>)}</Box>
          </Flex>
          <Box flex={0.8} p={4} border="1px solid white">
            {blogs[1]}
          </Box>
        </Flex>
      </>
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
