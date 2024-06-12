import {
  Box,
  Container,
  Grid,
  GridItem,
  Select,
  Tag,
  Text,
} from "@chakra-ui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { set } from "react-hook-form"
import {
  type ModelSchema,
  type ModelVersionSchema,
  ModelsData,
  ModelsService,
} from "../../client"
import ModelVersion from "../../components/Models/ModelVersion"

export const Route = createFileRoute("/_layout/models/$modelId")({
  component: ModelDetail,
})

function ModelDetail() {
  const { modelId } = Route.useParams()
  const [version, setVersion] = useState<ModelVersionSchema>()

  const { data: model, isLoading } = useQuery<ModelSchema>({
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
    setVersion(
      model?.model_versions?.find(
        (model_version) =>
          model_version.number === model.model_versions?.length,
      ),
    )
  })
  return (
    <>
      <Container maxW="full">
        <Grid pt={20}>
          <GridItem rowSpan={2} colSpan={1} bg="">
            <Text fontSize="2xl">{model?.name}</Text>
          </GridItem>
          <GridItem w="10%" rowSpan={2}>
            <Select defaultValue={1} onChange={handleSelect}>
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
          </GridItem>
        </Grid>
        <Grid pt={25}>
          <GridItem colSpan={2}>
            <Text fontSize="2xl">Type: </Text>
            <Tag size="lg" key="lg" variant="solid" colorScheme="teal">
              {model?.model_type}
            </Tag>
          </GridItem>
        </Grid>
        <Grid pt={25}>
          <GridItem>
            <ModelVersion
              model_id={Number.parseInt(modelId)}
              model_version={version!}
            />
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}
