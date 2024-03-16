import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_API_URL } from "@/lib/constants";
import { useParams } from "react-router-dom";
import { RootState, util } from "@/store";
import { minLength } from "class-validator";
import * as toast from "@/components/toasts";

export default function CreateTaskForm() {
  const [content, setContent] = useState("");

  const params = useParams();
  const projectId = params.id;

  const featureId = useSelector(({ feature }: RootState) => feature.featureId);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!minLength(content, 6)) {
      return toast.error("Task content must be at least 6 characters long");
    }

    const res = await fetch(
      `${BASE_API_URL}/projects/${projectId}/features/${featureId}/tasks`,
      {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    try {
      const json = await res.json();

      if (json.id) {
        setContent("");
        toast.success("Task created.");
        dispatch(util.invalidateTags(["Tasks"]));
      }
    } catch (e) {
      console.error(e);
      toast.error("Oops. Something went wrong trying to create a task.");
    }
  };

  return (
    <Accordion mt={4} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "blue.500", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              Create Task
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex as="form" gap={2} onSubmit={handleSubmit}>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content of your task."
            />
            <Button type="submit" colorScheme="success">
              Create
            </Button>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
