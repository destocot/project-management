import {
  ChatIcon,
  EmailIcon,
  StarIcon,
  CheckCircleIcon,
  WarningIcon,
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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import EditEmailForm from "../components/EditEmailForm";

export default function AccountPage() {
  const email = useSelector(({ auth }: RootState) => auth.acc_email);

  const [showEditEmail, setShowEditEmail] = useState(false);

  return (
    <Tabs mt={4} p={4} colorScheme="blue" variant="enclosed">
      <TabList>
        <Tab _selected={{ color: "white", bg: "blue.400" }}>Account Info</Tab>
        <Tab _selected={{ color: "white", bg: "blue.400" }}>Recent Updates</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <List spacing={0}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={EmailIcon} />
              <Button
                mx={2}
                size=""
                onClick={() => setShowEditEmail((prev) => !prev)}
              >
                <EditIcon />
              </Button>
              {showEditEmail ? (
                <EditEmailForm
                  setShowEditEmail={setShowEditEmail}
                  defaultEmail={email ?? ""}
                />
              ) : (
                <>Email: {email} </>
              )}
            </ListItem>
            <ListItem>
              <ListIcon as={ChatIcon} />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, fuga!
            </ListItem>
            <ListItem>
              <ListIcon as={StarIcon} />
              Lorem ipsum dolor sit amet.
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
    </Tabs>
  );
}
