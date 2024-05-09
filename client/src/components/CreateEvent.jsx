import {
  Box,
  Input,
  Textarea,
  Button,
  Select,
  FormControl,
  FormLabel,
  Text,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { createEvent } from "../api/api";
import toast from "react-hot-toast";
import { categories } from "../helper/helper";

function CreateEvent() {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    category: "",
    posterPhoto: "",
  });
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    handleAvatarUploadLogic(file);
  };

  const handleAvatarUploadLogic = async (file) => {
    setIsUploading(true);

    if (!file) {
      toast.error("Please Select an Image!");
      setIsUploading(false);
      return;
    }

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      toast.error("Please Select a JPG or PNG Image!");
      setIsUploading(false);
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("Image size should be less than 500KB!");
      fileInputRef.current.value = "";
      setIsUploading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "suvaranjan");

      const res = axios.post(
        "https://api.cloudinary.com/v1_1/suvaranjan/image/upload",
        data
      );

      toast.promise(res, {
        loading: `Uploading..`,
        success: (res) => {
          setFormData((prevState) => ({
            ...prevState,
            posterPhoto: res.data.url.toString(),
          }));
          console.log("Image Uploaded", res.data.url.toString());
          return "Image Uploaded";
        },
        error: (e) => {
          console.error(e);
          return "An error occurred";
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key]) {
        toast.error(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
        return;
      }
    }

    try {
      const res = createEvent(token, formData);

      toast.promise(res, {
        loading: `Creating An Event`,
        success: (res) => {
          console.log(res);
          setFormData({
            title: "",
            description: "",
            date: "",
            location: "",
            price: "",
            category: "",
            posterPhoto: "",
          });
          return "Event Created..";
        },
        error: (e) => {
          console.error(e);
          return "An error occurred";
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="container" minH="100vh">
      <Box p={4} borderRadius="md" pt={6} pb={6} mt={5}>
        <Text textAlign="center" fontWeight="600" fontSize="1.5rem" mb={5}>
          Create Event
        </Text>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing="2rem">
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event description"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Ticket Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter Price (if free enter 0)"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Select event category"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Event Poster Photo</FormLabel>
              <Input
                type="file"
                name="posterPhoto"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                p={1}
              />
            </FormControl>
          </SimpleGrid>
          <Flex justifyContent="flex-end">
            <Button colorScheme="teal" type="submit">
              Create Event
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default CreateEvent;
