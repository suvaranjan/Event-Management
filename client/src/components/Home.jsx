import { Box, Button } from "@chakra-ui/react";
import Hero from "./Hero";
import EventsMain from "./EventsMain";
import useStore from "./../zustand";

function Home() {
  const token = localStorage.getItem("token");

  if (token) {
    console.log(token);
  }

  return (
    <Box height="100%">
      <Hero />
      <EventsMain />
    </Box>
  );
}

export default Home;
