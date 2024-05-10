import {
  Box,
  Image,
  Text,
  Card,
  CardBody,
  Stack,
  Heading,
  Code,
  SimpleGrid,
  Center,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { categories } from "../helper/helper";
import { searchByQuery } from "./../api/api";
import LoadingCard from "./LoadingCard";
import { baseUrl } from "./../api/api";

function EventsMain() {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, [currentPage]); // Trigger fetchEvents when currentPage changes

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${baseUrl}/event/all-events?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res.data.events);
      setEvents(res.data.events);
      setPagination(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pagination.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const searchResults = async (query) => {
    try {
      setIsSearching(true);
      const res = await searchByQuery(token, query);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm !== "") {
      searchResults(searchTerm);
    }
  };

  return (
    <Box className="container" mt="3rem">
      <Box
        mb="2rem"
        fontSize="1.3rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Text fontWeight="700">Trusted by</Text>
        <Text fontWeight="600" color="teal">
          Thousands of events
        </Text>
      </Box>
      <Box mb={4} display="flex" gap={3}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Search title or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button
          colorScheme="cyan"
          onClick={handleSearch}
          fontWeight="400"
          isLoading={isSearching}
          loadingText="Searching"
        >
          Search
        </Button>
      </Box>
      <Center>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="2rem">
          {!isLoading &&
            events.map((event) => <EventCard key={event._id} event={event} />)}

          {isLoading && (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          )}
        </SimpleGrid>
      </Center>
      <Box
        display="flex"
        justifyContent="space-between"
        margin="0 auto"
        gap="2"
        mt={5}
      >
        <Button
          colorScheme="teal"
          fontWeight="400"
          variant="outline"
          onClick={handlePrevPage}
          isDisabled={!pagination || !pagination.previous}
        >
          Prev
        </Button>
        <Button
          // colorScheme="teal"
          fontWeight="400"
          bg="#00BFA5"
          color="#000"
          onClick={handleNextPage}
          isDisabled={!pagination || !pagination.next}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

function EventCard({ event }) {
  const navigate = useNavigate();
  return (
    <Card
      maxW="sm"
      cursor="pointer"
      onClick={() => navigate(`/event/${event._id}`)}
    >
      <CardBody>
        <AspectRatio ratio={4 / 3}>
          <Image
            src={event.poster}
            alt={event.title}
            borderRadius="lg"
            objectFit="cover"
          />
        </AspectRatio>
        <Stack mt="6" spacing="3">
          <Box display="flex" gap="3">
            <Code colorScheme="green">{`$${event.price}`}</Code>
            <Code>{event.category}</Code>
          </Box>
          <Heading size="md">{event.title}</Heading>
          <Text
            fontSize=".8rem"
            color="#4A5568"
          >{`${event.description.substring(0, 100)}...`}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default EventsMain;
