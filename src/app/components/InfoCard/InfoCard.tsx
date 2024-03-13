"use client";

import {
  Card,
  Stack,
  Heading,
  Image,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

export default function InfoCard({
  title,
  image,
  id,
  openModal,
}: {
  title: string;
  image: string;
  id: number;
  openModal: any;
}) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={image} alt={`Picture of ${title}`} borderRadius="lg" />
        <Stack mt="3" spacing="2">
          <Heading size="md">{title.toUpperCase()}</Heading>
        </Stack>
        <CardFooter>
          <Button
            title="Learn more"
            variant="solid"
            onClick={() => openModal(id)}
          >
            Learn more
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
