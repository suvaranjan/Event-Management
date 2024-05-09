import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { paymentSuccessApi } from "../api/api";

function PaymentSuccess() {
  const { eventId } = useParams();
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   fetchOrderDetails();
  // }, []);

  // const fetchOrderDetails = async () => {
  //   const res = await paymentSuccessApi(token, eventId);
  //   console.log(res);
  // };

  return (
    <Box className="container" minH="100vh">
      <Text
        textAlign="center"
        mt={5}
        fontSize="1rem"
        fontWeight="600"
        color="green"
      >
        Payment Success
      </Text>
    </Box>
  );
}

export default PaymentSuccess;
