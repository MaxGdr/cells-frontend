import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { type ModelsGetResponseSchema, ModelsService } from "../../client"
import CreateModelDrawer from "../../components/Models/CreateModelDrawer"
import Model from "../../components/Models/Model"

export const Route = createFileRoute("/_layout/models/")({
  component: Models,
})

function Models() {
  const { data: models } = useQuery<ModelsGetResponseSchema>({
    queryKey: ["models"],
    queryFn: () =>
      ModelsService.getModelsApiV1ModelsGet({ limit: 20, skip: 0 }),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Container maxW="full">
        <Flex pt={20}>
          <Box p="4">
            <Text fontSize="2xl">Your models ({models?.count})</Text>
          </Box>
          <Spacer />
          <Box p="4">
            <Tooltip hasArrow label="Create new model">
              <Button onClick={onOpen}>+</Button>
            </Tooltip>
          </Box>
        </Flex>
        <SimpleGrid minChildWidth="300px" columns={3} spacing={10} mb={20}>
          {models?.data.map((model) => (
            <Box>
              <Model model={model} key={model.id} />
            </Box>
          ))}
        </SimpleGrid>
        <CreateModelDrawer isOpen={isOpen} onClose={onClose} />
      </Container>
    </>
  )
}
