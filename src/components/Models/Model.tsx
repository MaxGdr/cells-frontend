import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  IconButton,
  Tag,
  Text,
} from "@chakra-ui/react"
import { CgDetailsMore } from "react-icons/cg"
import { IoCubeOutline } from "react-icons/io5"

import { useNavigate } from "@tanstack/react-router"
import { BsThreeDotsVertical } from "react-icons/bs"
import type { ModelSchema } from "../../client"
import { truncateString } from "../../utils"

interface ModelProps {
  model: ModelSchema
  // onClick?: () => void
}

const Model = ({ model }: ModelProps) => {
  const navigate = useNavigate()

  return (
    <Card height="100%" mt={5}>
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <IoCubeOutline size="45" />
            <Box>
              <Heading size="sm">{truncateString(model.name, 22)}</Heading>
              <HStack spacing={4}>
                <Tag size="md" key="md" borderRadius="full" colorScheme="red">
                  {model.model_type}
                </Tag>
              </HStack>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{model.description}</Text>
      </CardBody>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button
          onClick={() =>
            navigate({
              to: "/models/$modelId",
              params: { modelId: String(model.id) },
            })
          }
          flex="1"
          variant="ghost"
          leftIcon={<CgDetailsMore />}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Model
