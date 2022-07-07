import {
  Box,
  Button,
  Flex,
  SkeletonCircle,
  SkeletonText,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import React, { useState, useEffect } from "react";
import { getBlogs, getMyBlogs, getUser, postBlog } from "./api/axios";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Index = () => {
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState([]);
  const [userFetch, setUserFetch] = useState(true);
  const router = useRouter();
  let body = null;

  useEffect(() => {
    getBlogs().then(({ data, fetching }) => {
      setBlogs(data);
      // console.log(data);
      setLoading(fetching);
    });
    getMyBlogs().then(({ data, fetching }) => {
      setMyBlogs(data);
      setFetching(fetching);
    });
    getUser().then(({ data, fetching }) => {
      setUser(data);
      setUserFetch(fetching);
    });
  }, []);
  // console.log(loading, blogs);
  if (loading) {
    body = (
      <VStack spacing={8} w="70%" mt={10}>
        {[...Array(5)].map((_, i) => (
          <Box padding="6" boxShadow="lg" bg="whiteAlpha.600" w="100%">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ))}
      </VStack>
    );
  } else {
    body = (
      <>
        {[...blogs].reverse().map((blog) => {
          return (
            <NextLink href={`/posts/content/${blog[0]}`}>
              <Box
                padding="6"
                boxShadow="xl"
                bg="whatsapp.300"
                w="70%"
                minH={"10rem"}
                mt={10}
                color="#1a202c"
                key={"blog" + blog[0]}
              >
                <Heading fontSize="3xl" fontWeight="bold">
                  {blog[1]}
                </Heading>
                <Heading fontSize="md" fontWeight="bold" color={"facebook.900"}>
                  ~{blog[3]}
                </Heading>
                <Heading fontSize="md" fontWeight="normal">
                  {blog[2]}
                </Heading>
              </Box>
            </NextLink>
          );
        })}
      </>
    );
  }
  let myBlog = null;
  if (fetching) {
    myBlog = (
      <Box padding="6" bg="transparent" w="100%">
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
    );
  } else if (myBlogs.length === 0) {
    myBlog = (
      <Box padding="6" boxShadow="lg" bg="transparent" w="100%">
        <Heading fontSize="3xl" fontWeight="bold">
          You have no blogs yet.
        </Heading>
      </Box>
    );
  } else if (user[1] === "Not authenticated") {
    myBlog = (
      <Box padding="6" bg="transparent" w="100%">
        <Heading fontSize="3xl" fontWeight="bold">
          Login to see your latest blogs.
        </Heading>
      </Box>
    );
  } else {
    myBlog = (
      <>
        Last Blog
        <Heading fontSize="3xl" fontWeight="bold">
          {!fetching && myBlogs.length > 0 ? (
            myBlogs[myBlogs.length - 1][1]
          ) : (
            <SkeletonText noOfLines={1} mb={4} />
          )}
        </Heading>
        <Heading fontSize="md" fontWeight="bold" color={"facebook.900"}>
          {!fetching && myBlogs.length > 0 ? (
            <>~{myBlogs[myBlogs.length - 1][3]}</>
          ) : (
            <SkeletonText noOfLines={1} mb={4} />
          )}
        </Heading>
        <Heading fontSize="md" fontWeight="normal">
          {!fetching && myBlogs.length > 0 ? (
            (myBlogs[myBlogs.length - 1][2]).slice(0, 280)
          ) :   (
            <SkeletonText noOfLines={1} />
          )}
        </Heading>
      </>
    );
  }
  return (
    <Layout variant="large">
      <Flex alignItems={"center"} justifyContent="center" flexDir={"column"}>
        <Flex
          w={"80%"}
          h={"25vh"}
          minH={"15vh"}
          p={"1rem"}
          flexDirection={"row"}
          boxShadow="lg"
          bg="blackAlpha.200"
        >
          <Flex
            flex={0.8}
            p={"0.25rem 1rem"}
            mr="1rem"
            bg={"whatsapp.300"}
            flexDir="column"
            color={"#1a202c"}
          >
            {myBlog}
          </Flex>
          <Flex ml={"auto"} flex={0.2} display="flex" flexDir={"column"}>
            <Button
              mb={"1rem"}
              onClick={() => {
                router.push("/posts/new");
              }}
            >
              Create Post
            </Button>
            <Button
              onClick={() => {
                router.push("/posts/my");
              }}
            >
              View my posts
            </Button>
          </Flex>
        </Flex>
        {body}
      </Flex>
    </Layout>
  );
};

export default Index;
