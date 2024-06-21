import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Select,
  Spacer,
  Spinner,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import type React from "react"
import {
  type ModelSchema,
  type ModelVersionSchema,
  ModelsService,
} from "../../client"
import ModelVersion from "../../components/Models/ModelVersion"

export const Route = createFileRoute("/_layout/models/$modelId")({
  component: ModelDetail,
})

function ModelDetail() {
  const { modelId } = Route.useParams()
  const [version, setVersion] = useState<ModelVersionSchema>()

  const { data: model } = useQuery<ModelSchema>({
    queryKey: ["model"],
    queryFn: () =>
      ModelsService.getModelApiV1ModelsModelIdGet({
        modelId: Number.parseInt(modelId),
      }),
  })

  const handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    const newValue = event.currentTarget.value
    setVersion(
      model?.model_versions?.find(
        (model_version) => model_version.number === Number.parseInt(newValue),
      ),
    )
    console.log(version)
  }

  useEffect(() => {
    console.log(model?.model_versions)
  })
  if (model === undefined) {
    return (
      <>
        <Spinner size="xl" color="red.500" />
      </>
    )
  }
  if (model?.model_versions) {
    if (version === undefined && model.model_versions.length > 0) {
      setVersion(
        model?.model_versions?.find(
          (model_version) =>
            model_version.number === model.model_versions?.length,
        ),
      )
    }
    return (
      <>
        <Container maxW="full">
          <Flex
            mt={20}
            alignItems="center"
            gap="2"
            rounded={10}
            border="solid"
            borderColor="grey"
          >
            <Box p="4">
              <Text fontSize="2xl">{model?.name}</Text>
            </Box>
            <Box w="10%">
              {model.model_versions.length > 0 && (
                <Select onChange={handleSelect}>
                  {model?.model_versions?.map((model_version) => (
                    <option
                      selected={
                        model_version.number === model?.model_versions?.length
                          ? true
                          : false
                      }
                      value={model_version.number}
                    >
                      v{model_version.number}
                    </option>
                  ))}
                </Select>
              )}
            </Box>
            <Spacer />
            <Box p="4">
              <Tooltip hasArrow label="Add new model version">
                <Button>+</Button>
              </Tooltip>
            </Box>
          </Flex>
          <Grid pt={25}>
            <GridItem colSpan={2}>
              <Text fontSize="2xl">Type: </Text>
              <Tag size="lg" key="lg" variant="solid" colorScheme="teal">
                {model?.model_type}
              </Tag>
            </GridItem>
          </Grid>
          <Grid pt={25}>
            {model.model_versions.length > 0 ? (
              <GridItem>
                <ModelVersion
                  model_id={Number.parseInt(modelId)}
                  model_version={version!}
                />
              </GridItem>
            ) : (
              <GridItem textAlign="center">
                <Text fontSize="2xl">No versions available</Text>
                <Button mt={5} size="lg" colorScheme="red" variant="outline">
                  Create your first model version
                </Button>
              </GridItem>
            )}
          </Grid>
        </Container>
      </>
    )
  }
}
