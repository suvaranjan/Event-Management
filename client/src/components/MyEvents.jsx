import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  SimpleGrid,
  Center,
  Code,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AspectRatio,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { userOrganizedEventsApi, userJoinedEventsApi } from "../api/api";
import LoadingCard from "./LoadingCard";
import { useNavigate } from "react-router-dom";

function MyEvents() {
  const [userJoinedEvents, setUserJoinedEvents] = useState([]);
  const [userOrganizedEvents, setUserOrganizedEvents] = useState([]);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserJoinedEvents();
    fetchUserOrganizedEvents();
  }, []);

  const fetchUserJoinedEvents = async () => {
    try {
      setIsLoading1(true);
      const res = await userJoinedEventsApi(token);
      setUserJoinedEvents(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading1(false);
    }
  };

  const fetchUserOrganizedEvents = async () => {
    try {
      setIsLoading2(true);
      const res = await userOrganizedEventsApi(token);
      setUserOrganizedEvents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <Box className="container" minH="100vh" mt="3rem">
      <Tabs mt={3}>
        <TabList>
          <Tab>
            <Heading fontWeight="500" fontSize="1.3rem">
              The Events you joined
            </Heading>
          </Tab>
          <Tab>
            {" "}
            <Heading fontWeight="500" fontSize="1.3rem">
              The Events you Organized
            </Heading>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* <Center> */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="2rem">
              {!isLoading1 &&
                userJoinedEvents.length > 0 &&
                userJoinedEvents.map((u) => {
                  return (
                    <EventJoinCard
                      eventId={u._id}
                      title={u.title}
                      organizer={u.organizer}
                      price={u.price}
                      date={u.date}
                      src={u.poster}
                      orgUsername={u.organizer.username}
                      key={u._id}
                    />
                  );
                })}
              {isLoading1 && (
                <>
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </>
              )}
              {!isLoading1 && userJoinedEvents.length == 0 && (
                <Text fontSize="1rem" mt="2rem">
                  You have not joined any event.
                </Text>
              )}
            </SimpleGrid>
            {/* </Center> */}
          </TabPanel>
          <TabPanel>
            {/* <Center> */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="2rem">
              {!isLoading2 &&
                userOrganizedEvents.length > 0 &&
                userOrganizedEvents.map((u) => {
                  return (
                    <EventYouOrganize
                      eventId={u._id}
                      title={u.title}
                      des={u.description}
                      src={u.poster}
                      key={u._id}
                    />
                  );
                })}
              {isLoading2 && (
                <>
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </>
              )}
              {!isLoading2 && userOrganizedEvents.length == 0 && (
                <Text fontSize="1rem" mt="2rem">
                  You have not Organized any event.
                </Text>
              )}
            </SimpleGrid>
            {/* </Center> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function EventJoinCard({ title, price, date, src, orgUsername, eventId }) {
  const navigate = useNavigate();
  return (
    <Card maxW="md">
      <CardBody>
        <AspectRatio ratio={4 / 3}>
          <Image src={src} alt={title} borderRadius="lg" objectFit="cover" />
        </AspectRatio>
        <Stack mt="6" spacing="2">
          {/* <Code colorScheme="blue">Ticket id : 15641651</Code> */}
          <Heading size="md">{title}</Heading>
          <Text fontSize=".8rem">Organizer : {orgUsername}</Text>
          <Text fontSize=".8rem">Price : {price}</Text>
          <Text fontSize=".8rem">Event Date : {date}</Text>
          <Button
            size="sm"
            colorScheme="green"
            onClick={() => navigate(`/event/${eventId}`)}
          >
            View Event
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

function EventYouOrganize({ title, des, src, eventId }) {
  const navigate = useNavigate();
  return (
    <Card maxW="md">
      <CardBody>
        <AspectRatio ratio={4 / 3}>
          <Image src={src} alt={title} borderRadius="lg" objectFit="cover" />
        </AspectRatio>

        <Stack mt="6" spacing="2">
          <Heading size="md">{title}</Heading>
          <Text fontSize=".8rem">{`${des.substring(0, 100)}...`}</Text>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => navigate(`/event/${eventId}`)}
          >
            View Event
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default MyEvents;
