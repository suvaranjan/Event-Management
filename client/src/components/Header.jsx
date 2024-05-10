import {
  Flex,
  Hide,
  Show,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Button,
  Box,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import NavDrawer from "./auth/NavDrawer";
import Login from "./auth/Login";
import useStore from "../zustand";
import { useEffect, useState } from "react";
import Register from "./auth/Register";
// import { useEffect } from "react";

export default function Header() {
  const {
    isOpen: isNavModalOpen,
    onOpen: openNavModal,
    onClose: closeNavModal,
  } = useDisclosure();
  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: closeLoginModal,
  } = useDisclosure();

  const {
    isOpen: isRegisterModalOpen,
    onOpen: openRegisterModal,
    onClose: closeRegisterModal,
  } = useDisclosure();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const { setStoreToken, storeToken } = useStore((state) => state);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));
    if (!token || (!userInfo && tokenFromStorage && userInfoFromStorage)) {
      setToken(tokenFromStorage);
      setUserInfo(userInfoFromStorage);
    }

    return () => {
      setToken(null);
      setUserInfo(null);
    };
  }, [storeToken]);

  return (
    <Flex
      p="20px"
      pl="40px"
      pr="40px"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="#FAFAFA"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      <Box fontSize="1.3rem" fontWeight="600" color="#2D2E32">
        <Link href="/" _hover={{ textDecoration: "none" }}>
          EasyEvent
        </Link>
      </Box>
      {token && (
        <Hide breakpoint="(max-width: 760px)">
          <UnorderedList
            display="flex"
            gap="10"
            fontSize="1rem"
            fontWeight="500"
            color="#4A5568"
            alignItems="center"
          >
            <NavMenu onClose={closeNavModal} />
          </UnorderedList>
        </Hide>
      )}
      <Hide breakpoint="(max-width: 760px)">
        {!token && (
          <Box display="flex" alignItems="center" gap={4}>
            <Text
              color="#4A5568"
              fontSize="1rem"
              fontWeight="500"
              onClick={openLoginModal}
              cursor="pointer"
            >
              Login
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={openRegisterModal}
            >
              Sign up
            </Button>
          </Box>
        )}
        {token && (
          <AvatarMenu
            loginUser={userInfo}
            setStoreToken={setStoreToken}
            setToken={setToken}
            setUserInfo={setUserInfo}
          />
        )}
      </Hide>
      <Show breakpoint="(max-width: 760px)">
        <Box>
          {!token && (
            <Box display="flex" alignItems="center" gap={4}>
              <Text
                color="#4A5568"
                fontSize="1rem"
                fontWeight="500"
                onClick={openLoginModal}
                cursor="pointer"
              >
                Login
              </Text>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={openRegisterModal}
              >
                Sign up
              </Button>
            </Box>
          )}
          {token && (
            <AvatarMenu
              loginUser={userInfo}
              setStoreToken={setStoreToken}
              setToken={setToken}
              setUserInfo={setUserInfo}
            />
          )}
          {token && (
            <HamburgerIcon
              height="40px"
              width="30px"
              onClick={openNavModal}
              ml={2}
            />
          )}
        </Box>
      </Show>
      <NavDrawer isOpen={isNavModalOpen} onClose={closeNavModal} />
      <Login isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <Register isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </Flex>
  );
}

// eslint-disable-next-line react/prop-types
export function NavMenu({ onClose }) {
  return (
    <>
      <ListItem listStyleType="none">
        <Link onClick={onClose} href="/">
          Home
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link onClick={onClose} href="/create-event">
          CreateEvent
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link onClick={onClose} href="/myevents">
          MyEvents
        </Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Link onClick={onClose}>About</Link>
      </ListItem>
    </>
  );
}

function AvatarMenu({ loginUser, setStoreToken, setToken, setUserInfo }) {
  // console.log(loginUser);
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Avatar name={loginUser.username} src={loginUser.avatar} size="xs" />
      </MenuButton>
      <MenuList>
        <Box
          p={2}
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
        >
          <Avatar name={loginUser.username} src={loginUser.avatar} size="sm" />
          <Text fontSize="1rem" fontWeight="600">
            {loginUser.username}
          </Text>
          <Text fontSize=".8rem">{loginUser.email}</Text>
          <Button
            size="xs"
            colorScheme="red"
            onClick={() => {
              localStorage.clear();
              setToken(null);
              setUserInfo(null);
              setStoreToken(null);
            }}
          >
            logout
          </Button>
        </Box>
      </MenuList>
    </Menu>
  );
}
