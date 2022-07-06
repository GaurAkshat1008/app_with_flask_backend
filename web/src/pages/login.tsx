import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextLink from "next/link";
import {login}  from "./api/axios";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try{
            const {data} = await login(values);
            // console.log(data);
            if(data[0] !== 'user'){
              const errMap:Record<string, string> = {}
              errMap[`${data[0]}`] = data[1]
              setErrors(errMap)
            } else {
              router.push("/");
            }
          }
          catch(error){
            console.log(error)
          }
        }}
      >
        {(props) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type={"password"}
              />
            </Box>

            <Flex
              color={"blue.100"}
              cursor={"pointer"}
              mt={2}
              direction={"column"}
            >
              {/* <NextLink href={"/forgot-password"}>
                <Box ml={"auto"}>Forgot Password?</Box>
              </NextLink> */}
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Login
              </Button>
              <NextLink href={"/register"}>
                <Box ml={"auto"} mt={2}>
                  Create a new account
                </Box>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
