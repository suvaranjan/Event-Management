import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../api/api";

// eslint-disable-next-line react/prop-types
export default function Register({ isOpen, onClose }) {
  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: closeLoginModal,
  } = useDisclosure();

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const toast = useToaster();
  const handleClick = () => setShow(!show);

  const handleRegister = async (values, formik) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, values);
      toast.success("Registration Successfull");
      onClose();
    } catch (error) {
      console.log("Login failed:", error.message);
      toast.error(error.response.data.msg);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      avatar: "https://bit.ly/broken-link",
    },
    onSubmit: (values) => {
      handleRegister(values, formik);
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is required";
      }

      if (!values.username) {
        errors.username = "Username is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", md: "md", lg: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={5}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                id="email"
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                  id="emailInput"
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="username"
                mt="4"
                isInvalid={formik.errors.username && formik.touched.username}
              >
                <Input
                  type="text"
                  placeholder="Username"
                  {...formik.getFieldProps("username")}
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="password"
                mt="4"
                isInvalid={formik.errors.password && formik.touched.password}
              >
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                    placeholder="Password"
                    id="passwordInput"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                mt="6"
                colorScheme="teal"
                type="submit"
                width="full"
                isLoading={formik.isSubmitting}
              >
                Register
              </Button>
            </form>
            {/* <Box mt="4" textAlign="center" fontSize=".7rem">
              <Text display="inline">Already have an account?</Text>
              <Link>
                <Text
                  display="inline"
                  fontWeight="600"
                  ml="1"
                  onClick={() => {
                    onClose();
                    // openLoginModal();
                  }}
                >
                  Login
                </Text>
              </Link>
            </Box> */}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <Login isOpen={isLoginModalOpen} onClose={closeLoginModal} /> */}
    </>
  );
}
