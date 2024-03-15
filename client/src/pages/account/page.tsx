import {
  LockIcon,
  EmailIcon,
  CheckCircleIcon,
  WarningIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import {
  List,
  ListIcon,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Avatar,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState, useEffect } from "react";
import { EditIcon } from "@chakra-ui/icons";
import EditEmailForm from "../../components/EditEmailForm";
import EditPasswordForm from "../../components/EditPasswordForm";
import { EditEmailFormResponse } from "../../lib/types";
import { useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../store/authSlice";
import SignoutButton from "../../components/SignoutButton";
import DeleteAccountButton from "../account/DeleteAccountButton";
import { errorToast, successToast } from "../../components/toasts";

export default function AccountPage() {
  const email = useSelector(({ auth }: RootState) => auth.acc_email);
  const createdAt = useSelector(({ auth }: RootState) => auth.acc_createdAt);
  const dispatch = useDispatch();

  const response = useActionData() as EditEmailFormResponse;

  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  useEffect(() => {
    if (response?.error) {
      errorToast(
        response.error ??
          "Oops. Something went wrong trying update your account."
      );
    }
    if (response?.data?.success) {
      if (response.data.email) {
        setShowEditEmail(false);
        dispatch(update(response.data.email));
      } else {
        setShowEditPassword(false);
      }
      successToast("acount updated");
    }
  }, [
    response?.error,
    response?.data?.success,
    dispatch,
    response?.data?.email,
  ]);

  return (
    <Tabs mt={4} p={4} colorScheme="blue" variant="enclosed">
      <TabList>
        <Tab _selected={{ color: "white", bg: "blue.400" }}>Account Info</Tab>
        <Tab _selected={{ color: "white", bg: "blue.400" }}>Recent Updates</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <List spacing={4} fontSize="lg">
            <ListItem
              display="flex"
              alignItems="center"
              bg="blue.100"
              p={4}
              borderRadius="lg"
            >
              <Avatar
                name={email?.split("@")[0]}
                bg="blue.500"
                src="/avatar.png"
                color="white"
                alignContent={"center"}
              />
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={EmailIcon} />
              <Button
                mx={2}
                bg="none"
                p={0}
                h={0}
                sx={{ _hover: { transform: "scale(1.1)" } }}
                onClick={() => setShowEditEmail((prev) => !prev)}
              >
                <EditIcon />
              </Button>
              {showEditEmail ? (
                <EditEmailForm defaultEmail={email ?? ""} />
              ) : (
                <>Email: {email} </>
              )}
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={LockIcon} />
              <Button
                mx={2}
                bg="none"
                p={0}
                h={0}
                sx={{ _hover: { transform: "scale(1.1)" } }}
                onClick={() => setShowEditPassword((prev) => !prev)}
              >
                <EditIcon />
              </Button>
              {showEditPassword ? (
                <EditPasswordForm />
              ) : (
                <>Password: ******** </>
              )}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} mr={8} />
              <Text as="i">
                created on: {createdAt && new Date(createdAt).toDateString()}
              </Text>
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel>
          <List spacing={4}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400" />
              Lorem ipsum dolor sit amet.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400" />
              Lorem ipsum dolor sit amet.
            </ListItem>
            <ListItem>
              <ListIcon as={WarningIcon} color="red.400" />
              Lorem ipsum dolor sit amet.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400" />
              Lorem ipsum dolor sit amet.
            </ListItem>
            <ListItem>
              <ListIcon as={WarningIcon} color="red.400" />
              Lorem ipsum dolor sit amet.
            </ListItem>
          </List>
        </TabPanel>
      </TabPanels>
      <Flex mt={4} gap={4}>
        <SignoutButton />
        {/* <Button colorScheme="danger">Delete Account</Button> */}
        <DeleteAccountButton />
      </Flex>
    </Tabs>
  );
}
