import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  UnorderedList,
} from "@chakra-ui/react";
import { NavMenu } from "../Header";

// eslint-disable-next-line react/prop-types
export default function NavDrawer({ isOpen, onClose }) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent p={2}>
          <DrawerCloseButton p={2} fontSize="1.2rem" />
          <DrawerBody
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <UnorderedList
              display="flex"
              gap="10"
              fontSize="1.5rem"
              fontWeight="500"
              flexDirection="column"
            >
              <NavMenu onClose={onClose} />
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
