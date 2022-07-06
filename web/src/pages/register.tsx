import { Flex, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { register } from "./api/axios";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", name: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { data } = await register(values);
            console.log(data);
            if(data[0] === 'email'){
              setErrors({email: data[1]})
            } else {
              router.push("/");
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(props) => (
          <Form>
            <InputField name="name" placeholder="username" label="Username" />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type={"email"}
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type={"password"}
              />
            </Box>
            <Flex color={"blue.100"} cursor={"pointer"} direction={"column"}>
              <NextLink href={"/login"}>
                <Box ml={"auto"} mt={2}>
                  Already a User?
                </Box>
              </NextLink>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
