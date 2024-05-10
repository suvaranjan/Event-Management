import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";

function About() {
  return (
    <Box minH="100vh" className="container">
      <Box mt="1.3rem">
        <Heading>About</Heading>
        <Text fontSize=".9rem" mt="1rem">
          Welcome to EasyEvent, where organizing and managing your events has
          never been easier!
        </Text>
        <Flex gap={2} flexDir="column">
          <Heading fontSize="1.5rem" mt="1rem">
            Our Mission
          </Heading>
          <Text fontSize=".9rem">
            At EasyEvent, our mission is to provide a seamless and intuitive
            platform for users to create, manage, and join events effortlessly.
            Whether you're hosting a small gathering or a large conference,
            we've got you covered.
          </Text>
          <Heading fontSize="1.5rem" mt="1rem">
            Features
          </Heading>
          <Heading fontSize="1rem" mt="1rem">
            Event Creation and Management
          </Heading>
          <Text fontSize=".9rem">
            With our user-friendly interface, users can easily create and manage
            their events. From setting event details such as date, time, and
            location to customizing event descriptions and adding images,
            organizing your event has never been simpler.
          </Text>
          <Heading fontSize="1rem" mt="1rem">
            Joining Events
          </Heading>
          <Text fontSize=".9rem">
            Users can browse through a variety of events and join those that
            pique their interest. If an event is free, users can join with just
            a click. For paid events, users are seamlessly redirected to our
            integrated payment page, powered by Strapi. Once payment is
            successfully processed, users receive a ticket confirming their
            participation.
          </Text>
          <Heading fontSize="1rem" mt="1rem">
            Search Functionality
          </Heading>
          <Text fontSize=".9rem">
            Looking for a specific event? Use our search feature for quick and
            efficient browsing. Simply enter keywords or filters to find events
            tailored to your preferences and interests.
          </Text>
          <Heading fontSize="1.5rem" mt="1rem">
            Deployment
          </Heading>
          <Text fontSize=".9rem">
            EasyEvent is powered by a robust backend deployed to Render,
            providing reliability and scalability. Our frontend is deployed to
            the client, ensuring fast and efficient access for users worldwide.
          </Text>
          <Heading fontSize="1.5rem" mt="1rem">
            Meet the Developer
          </Heading>
          <Box fontSize=".9rem">
            <Text mb={2}>
              Hi, I'm Suvaranjan, the full-stack developer behind EasyEvent.
              With a passion for creating innovative solutions, I strive to
              deliver high-quality applications that exceed expectations. Check
              out my recent projects in my portfolio:
            </Text>

            <Link href="https://suvaranjan.vercel.app/" isExternal color="blue">
              https://suvaranjan.vercel.app/
            </Link>
            <Text mt={2}>
              Thank you for visiting EasyEvent. We look forward to helping you
              create memorable events!
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default About;
