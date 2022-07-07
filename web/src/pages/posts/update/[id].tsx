import { Box, Button, Flex } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { getBlogsById, postBlog, updatePost } from "../../api/axios";

interface Props {}

const Index: React.FC<Props> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (intId !== -1) {
      getBlogsById(intId).then(({ data, fetching }) => {
        setBlogs(data);
        setLoading(fetching);
      });
    }
  }, [intId]);
  // console.log(blogs);
  if(loading){
    return(<Layout>
      Loading...
    </Layout>)
  }
  if(!blogs){
    return (
      <Layout>Could not find post</Layout>
    )
  }
  return (
    <Layout>
      <Formik
        initialValues={{ title: blogs[0], content: blogs[1] }}

        onSubmit={async (values) => {
          try {
            const { data } = await updatePost(intId, values);
            router.push(`/posts/content/${intId}`);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {!loading && blogs
          ? (props) => (
              <Form>
                <Field as={InputField} name='title' placeholder='Title' label='Title' />
                <Box mt={4}>
                  <Field as={InputField} name='content' placeholder='Content' label='Content' textarea />
                </Box>
                <Flex mt={4} justifyContent="center" width={"100%"}>
                  <Button
                    type="submit"
                    w={"40%"}
                    variant="ghost"
                    bg={"telegram.700"}
                  >
                    Update
                  </Button>
                </Flex>
              </Form>
            )
          : null}
      </Formik>
      
    </Layout>
  );
};

export default Index;
