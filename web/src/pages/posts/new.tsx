import { Flex, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { postBlog } from "../api/axios";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const router = useRouter();
  return (
    <Layout>
      <Formik
        initialValues={{ title: "", content: "" }}
        onSubmit={async (values) => {
          try {
            const { data } = await postBlog(values);
            router.push("/");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(props) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={4}>
              <InputField
                name="content"
                placeholder="Content"
                label="Content"
                textarea
              />
            </Box>
            <Flex mt={4} justifyContent="center" width={"100%"}>
              <Button
                type="submit"
                w={"40%"}
                variant="ghost"
                bg={"telegram.700"}
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePost;
