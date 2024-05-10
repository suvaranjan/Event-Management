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
  useToast,
  // useColorMode,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import axios from "axios";
import toast from "react-hot-toast";
import useStore from "../../zustand";
import { baseUrl } from "../../api/api";

// eslint-disable-next-line react/prop-types
export default function Login({ isOpen, onClose }) {
  const { setLoginUser, loginUser, setStoreToken } = useStore((state) => state);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const toast = useToaster();
  const handleClick = () => setShow(!show);

  const handleLogin = async (values, formik) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, values);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
      setStoreToken(res.data.token);
      setLoginUser(res.data.userInfo);
      toast.success("Login Successfull");
      onClose();
    } catch (error) {
      console.log("Login failed:", error);
      toast.error(error.response.data.msg);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values, formik);
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is required";
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
          <ModalHeader textAlign="center">Login</ModalHeader>
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
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
                Login
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
