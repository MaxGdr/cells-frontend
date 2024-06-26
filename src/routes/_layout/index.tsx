import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { type ModelsGetResponseSchema, ModelsService } from "../../client"
import Model from "../../components/Models/Model"
import useAuth from "../../hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()
  const { data: models } = useQuery<ModelsGetResponseSchema>({
    queryKey: ["models"],
    queryFn: () => ModelsService.getModelsApiV1ModelsGet({ limit: 5 }),
  })

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>
        <Box pt={12} m={4}>
          <Text fontSize="2xl">Your models</Text>
          <SimpleGrid minChildWidth="300px" columns={3} spacing={10} mb={20}>
            {models?.data.map((model) => (
              <Box>
                <Model model={model} />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  )
}
