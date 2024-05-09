import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  Stack,
  Code,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleEvent, joinFreeEventApi, makePaymentApi } from "../api/api";
import { useEffect, useState } from "react";
import useStore from "../zustand";
import toast from "react-hot-toast";
import { deleteEvent } from "../api/api";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./../components/lottie/Loading";

function SingleEvent() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const loginUser = JSON.parse(localStorage.getItem("userInfo"));
  const [event, setEvent] = useState(null);
  const { setPrevEventData } = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      setIsLoading(true);
      const res = await getSingleEvent(token, id);
      setEvent(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBtnClick = () => {
    setPrevEventData(event);
    navigate("/update-event");
  };

  const deleteThisEvent = async () => {
    try {
      const res = deleteEvent(token, event._id);

      toast.promise(res, {
        loading: `Deleting The Event`,
        success: (res) => {
          navigate("/");
          return "Event Deleted..";
        },
        error: (e) => {
          console.log(e);
          return "An error occurred";
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PDohfSC4n1uA83PPhNCs26nbDGApaOdWpHjzwSPtfUj8oNncHdRnxiwg5xJghy2VbW3oB73v7KIJ0J4rpjdjn0I00InL9uAnh"
    );

    const res = await makePaymentApi(token, event);

    // console.log(res);

    const result = stripe.redirectToCheckout({
      sessionId: res.data.sessionId,
    });

    console.log(result);

    if (result.error) {
      console.log(result.error);
    }
  };

  const joinFreeEvent = async () => {
    // console.log(token);
    try {
      const res = await joinFreeEventApi(token, event._id);
      if (res.status === 200) return toast.success("Joined Suceess");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box minH="100vh" className="container" mt="3rem">
        {!isLoading &&
          event && ( // Check if event data exists before rendering
            <Box w="100%">
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "column", lg: "row" }}
                gap={{ base: "", md: 6 }}
                alignItems={{ base: "center", md: "center", lg: "flex-start" }}
                justifyContent={{
                  base: "center",
                  md: "center",
                  lg: "flex-start",
                }}
                textAlign={{ base: "center", md: "center", lg: "left" }}
              >
                <Image
                  src={event.poster} // Use event poster as image source
                  alt={event.title} // Use event title as image alt
                  borderRadius="lg"
                  w={{ base: "md", md: "md", lg: "lg" }}
                />
                <Stack mt={{ base: 6, md: 0 }} spacing="3">
                  <Heading size="lg">{event.title}</Heading>
                  {token && (
                    <Text fontSize=".8rem" color="#4A5568" fontWeight="500">
                      {`Event Organiser : ${
                        loginUser._id == event.organizer._id
                          ? "You"
                          : event.organizer.username
                      }`}
                    </Text>
                  )}
                  <Text Text fontSize=".8rem" color="#4A5568" fontWeight="500">
                    {event.attendees.length} users joined
                  </Text>
                  <Text
                    fontSize={{ base: ".9rem", md: ".9rem" }}
                    color="#4A5568"
                  >
                    {event.description}
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    ₹ {event.price}
                  </Text>
                  <Flex
                    justifyContent={{
                      base: "center",
                      md: "center",
                      lg: "flex-start",
                    }}
                  >
                    {token &&
                      loginUser._id !== event.organizer._id &&
                      event.price > 0 && (
                        <Button
                          colorScheme="blue"
                          type="submit"
                          onClick={makePayment}
                        >
                          Buy Ticket
                        </Button>
                      )}
                    {token && loginUser._id == event.organizer._id && (
                      <>
                        <Button
                          colorScheme="cyan"
                          mr={3}
                          onClick={updateBtnClick}
                        >
                          update
                        </Button>
                        <Button colorScheme="red" onClick={() => onOpen()}>
                          Delete
                        </Button>
                      </>
                    )}
                    {!token && (
                      <Code colorScheme="red" size="xs" display="inline">
                        Login is required for buying ticket
                      </Code>
                    )}
                    {token &&
                      loginUser._id !== event.organizer._id &&
                      event.price == 0 &&
                      !event.attendees.includes(loginUser._id) && (
                        <Button colorScheme="green" onClick={joinFreeEvent}>
                          Join Free
                        </Button>
                      )}
                    {token && event.attendees.includes(loginUser._id) && (
                      <Button
                        colorScheme="green"
                        onClick={joinFreeEvent}
                        isDisabled
                      >
                        Joined
                      </Button>
                    )}
                  </Flex>
                </Stack>
              </Box>
            </Box>
          )}
        {isLoading && <Loading />}
      </Box>
      <DeleteEventModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        deleteThisEvent={deleteThisEvent}
      />
    </>
  );
}

function DeleteEventModal({ isOpen, onClose, deleteThisEvent }) {
  const handleConfirmDelete = () => {
    onClose();
    deleteThisEvent();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="1rem">Are you sure</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default SingleEvent;
