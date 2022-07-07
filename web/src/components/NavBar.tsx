//#1a202c background color
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getUser, logout } from "../pages/api/axios";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(['user', 'Not authenticated']);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    getUser().then(({ data, fetching }) => {
      setUser(data);
      setFetching(fetching);
    });      
  }, []);
  let body = null;
  if(fetching){

  } else if (user[1] === 'Not authenticated') {
    body = (
      <>
        <NextLink href="/login">
          <Button mr={2} variant={'solid'} bgColor={'facebook.800'}>Log In</Button>
        </NextLink>
        <NextLink href={"/register"}>
          <Button variant={'solid'} bgColor={'telegram.500'}>Register</Button>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex>
        <Box as={Button} variant='solid' cursor={'default'} _focus={{bg:'blackAlpha.800', boxShadow:'0 0 0 0'}} _hover={{bg:'blackAlpha.800'}} bg='blackAlpha.800'  mr={3} p={4}>{user[0]}</Box>
        <Button
          backgroundColor={"red.500"}
          variant={"ghost"}
          onClick={async() => {
            await logout();
            router.reload()
          }}
        >
          Log Out
        </Button>
      </Flex>
    )
  }
  return (
    <Flex position={"sticky"} top={0} zIndex={1} bg="#aabbcc" p={4} mb={8}>
      <Flex flex={1} m={"auto"} maxW={800} align={"center"}>
        <NextLink href={"/"}>
          <Link>
            <Heading fontSize={'2xl'}>Flask_app</Heading>
          </Link>
        </NextLink>
        {/* <Box
          ml={"auto"}
          fontSize={20}
          fontWeight={600}
          fontFamily={"heading"}
        ></Box> */}
      </Flex>
      <Flex ml={"auto"}>{body}</Flex>
    </Flex>
  );
};
