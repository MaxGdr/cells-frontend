import { Box, Button, Container, Flex, Spacer, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { type ModelsGetResponseSchema, ModelsService } from "../../client"
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

  return (
    <>
      <Container maxW="full">
        <Flex pt={20}>
          <Box p="4">
            <Text fontSize="2xl">Your models ({models?.count})</Text>
          </Box>
          <Spacer />
          <Box p="4">
            <Button>+</Button>
          </Box>
        </Flex>

        <Box pt={12} m={4}>
          {models?.data.map((model) => (
            <Model model={model} key={model.id} />
          ))}
        </Box>
      </Container>
    </>
  )
}
