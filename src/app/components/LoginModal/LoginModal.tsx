"use client";
import { useContext, useEffect, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Tabs,
  TabPanel,
  TabList,
  TabPanels,
} from "@chakra-ui/react";
import UserContext from "@/app/context/userContext";

export default function LoginModal() {
  const userCtx = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [job, setJob] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const [userDataAlreadyAvailable, setUserDataAlreadyAvailable] =
    useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: userCtx.profileData.username === "",
  });

  useEffect(() => {
    if (userCtx.profileData && typeof window !== undefined) {
      setUsername(userCtx.profileData.username ?? "");
      setJob(userCtx.profileData.job ?? "");
      setUserDataAlreadyAvailable(userCtx.isLoggedIn);
    }
  }, [userCtx]);

  const handleSave = () => {
    if (tabIndex == 0) {
      setTabIndex(tabIndex + 1);
    }
    if (tabIndex == 1) {
      onClose();
      setTabIndex(0);
    }

    userCtx.setUser({
      username,
      job,
    });
  };

  return (
    <>
      <Flex align="right" justify="right">
        <Button leftIcon={<EditIcon mr="3" />} onClick={onOpen} m="3">
          Profile Info
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent
          width={{ md: "75%", base: "75%" }}
          height={{ md: "400px", base: "400px" }}
        >
          <ModalHeader>
            {!userDataAlreadyAvailable
              ? "Hold on.. Tell us a little about yourself.."
              : `Hello again, ${userCtx.profileData.username}!`}{" "}
          </ModalHeader>
          {/* {userDataAlreadyAvailable && <ModalCloseButton />} */}
          <ModalBody>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
                <TabList>
                  {/* <Tab isDisabled>Email</Tab>
                  <Tab isDisabled>Job</Tab> */}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {tabIndex === 0 && (
                      <FormControl mb="5">
                        <FormLabel id="username">
                          What is your email?
                          <Input
                            type="email"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </FormLabel>
                        <FormHelperText>ex. ash@pokemon.com</FormHelperText>
                      </FormControl>
                    )}
                  </TabPanel>

                  <TabPanel>
                    {tabIndex === 1 && (
                      <FormControl mb="5">
                        <FormLabel>
                          What is your current job title?
                          <Input
                            type="text"
                            id="job"
                            name="job"
                            required
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                          />
                        </FormLabel>
                        <FormHelperText>
                          ex. Software Developer or Pokemon Trainer
                        </FormHelperText>
                      </FormControl>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Button
                title="Next"
                type="submit"
                mr={3}
                isDisabled={tabIndex == 1 && (job === "" || username === "")}
              >
                {tabIndex == 1 ? "Done" : "Next"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
