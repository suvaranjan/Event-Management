import React from "react";
import { Box, Text } from "@chakra-ui/react";

function PaymentFailed() {
  return (
    <Box className="container" minH="100vh">
      <Text
        textAlign="center"
        mt={5}
        fontSize="1rem"
        fontWeight="600"
        color="red"
      >
        Payment Failed
      </Text>
    </Box>
  );
}

export default PaymentFailed;
