import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      mt="3rem"
      bg="#00BFA5"
      py={{ base: "1.2rem", md: "2rem" }}
      // px={{ base: "1rem", md: "1rem" }}
      // borderTop="2px solid red"
      display={{ base: "flex", md: "block" }}
      flexDirection={{ base: "column", md: "" }}
    >
      <Box
        // maxW={{ base: "100%", md: "960px" }}
        // mx="auto"
        display={{ base: "block", md: "flex" }}
        flexDirection={{ base: "column-reverse", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        className="container"
        // justifyContent="center"
      >
        <Box
          maxW={{ base: "100%", md: "300px" }}
          mb={{ base: "1.3rem", md: 0 }}
          textAlign={{ base: "center", md: "match-parent" }}
        >
          <Text
            fontSize={{ base: ".9rem", md: "1rem" }}
            fontWeight="600"
            mb={3}
          >
            Transforming Your Events into Unforgettable Experiences
          </Text>
          <Text fontSize=".7rem" fontWeight="300">
            EasyEvent 2024, All rights reserved
          </Text>
          <Box bg="#00BFA5" textAlign="center">
            <Text fontSize=".7rem" fontWeight="300" mt={3}>
              Made By{" "}
              <Text
                display="inline"
                fontWeight="600"
                textDecoration="underline"
                cursor="pointer"
              >
                <Link to="https://suvaranjan.vercel.app/"> @Suvaranjan</Link>
              </Text>
            </Text>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={{ base: "row", md: "row" }}
          gap={{ base: "3rem", md: "5rem" }}
          fontSize=".7rem"
          // alignItems="center"
          justifyContent="space-between"
          // border="2px solid black"
          maxW="500px"
        >
          <Flex flexDir="column" gap={2}>
            <Text fontWeight="500">Platform</Text>
            <Text cursor="pointer">Plans & Pricing</Text>
            <Text cursor="pointer">Features</Text>
            <Text cursor="pointer">AI Implementation</Text>
          </Flex>
          <Flex flexDir="column" gap={2}>
            <Text fontWeight="500">Company</Text>
            <Text cursor="pointer">Blog</Text>
            <Text cursor="pointer">Careers</Text>
            <Text cursor="pointer">News</Text>
          </Flex>
          <Flex flexDir="column" gap={2}>
            <Text fontWeight="500">Resources</Text>
            <Text cursor="pointer">Documentation</Text>
            <Text cursor="pointer">Papers</Text>
            <Text cursor="pointer">Press Conferences</Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
