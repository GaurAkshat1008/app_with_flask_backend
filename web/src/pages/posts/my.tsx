import {
  VStack,
  SkeletonCircle,
  SkeletonText,
  Heading,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getMyBlogs } from "../api/axios";
import NextLink from "next/link";
import { Layout } from "../../components/Layout";
interface MyProps {}

export const Index: React.FC<MyProps> = ({}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMyBlogs().then(({ data, fetching }) => {
      setBlogs(data);
      setLoading(fetching);
    });
  }, []);
  let body = null;
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
  return (
    <Layout>
      <Flex alignItems={"center"} justifyContent="center" flexDir={"column"}>
      {body}
      </Flex>
    </Layout>
  );
};

export default Index; 