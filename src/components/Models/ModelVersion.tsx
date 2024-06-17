import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react"
import { IoSendSharp } from "react-icons/io5"

import { IoCubeOutline } from "react-icons/io5"

import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import {
  type ApiError,
  type ModelVersionSchema,
  type PredictSchema,
  type PredictsData,
  PredictsService,
} from "../../client"
import { calc } from "../../utils"

interface ModelVersionProps {
  model_id: number
  model_version: ModelVersionSchema
}

interface PredictForm {
  image: Blob | File
}

const ModelVersion = ({ model_id, model_version }: ModelVersionProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PredictForm>()

  const [fileSelected, setFileSelected] = useState<File>()
  const [predictResponse, setPredictionResponse] = useState<PredictSchema>()
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const predict = async (data: PredictsData) => {
    const result = await PredictsService.predictApiV1PredictPost({
      formData: data.PredictApiV1PredictPost.formData,
      modelId: model_id,
      modelVersion: model_version.number,
    })
    return result
  }

  const predictMutation = useMutation({
    mutationFn: predict,
    onSuccess: (data) => {
      setPredictionResponse(data)
    },
    onError: (err: ApiError) => {
      let errDetail = (err.body as any)?.detail

      if (err instanceof AxiosError) {
        errDetail = err.message
      }

      if (Array.isArray(errDetail)) {
        errDetail = "Something went wrong"
      }

      setError(errDetail)
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (!fileList) return
    setPredictionResponse(undefined)
    setFileSelected(fileList[0])
    setImage(URL.createObjectURL(fileList[0]))
  }

  const onSubmit: SubmitHandler<PredictForm> = async () => {
    if (isSubmitting) return

    setError(null)

    try {
      if (fileSelected) {
        const predictReq: PredictsData = {
          PredictApiV1PredictPost: {
            modelId: model_id,
            modelVersion: model_version.number,
            formData: {
              image: fileSelected,
            },
          },
        }
        const resp = await predictMutation.mutateAsync(predictReq)
        console.log(resp)
      }
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <SimpleGrid columns={2}>
      <Box bg="">
        <Card maxW="lg">
          <CardHeader>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <IoCubeOutline size="45" />
                <Box>
                  <Heading size="sm">Version Details</Heading>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <Container as="form" onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
              <Text>{model_version?.description}</Text>
              <Text pt={10}>
                Vertex endpoint: <Tag>{model_version?.endpoint_id}</Tag>
              </Text>
              <FormControl id="predict" pt={10}>
                <FormLabel>Select Image for prediction</FormLabel>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                  required
                />
              </FormControl>
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
                flex="1"
                variant="ghost"
                leftIcon={<IoSendSharp />}
                type="submit"
                isLoading={isSubmitting}
              >
                Predict
              </Button>
            </CardFooter>
          </Container>
        </Card>
      </Box>

      <Box>
        <Text fontSize="2xl" textAlign={"center"}>
          Prediction Result
        </Text>
        <SimpleGrid columns={2} spacing={15}>
          <Box>{image && <Image src={image} alt="Selected image" />}</Box>
          {predictResponse && (
            <Box>
              <Tag size="md" key="md" borderRadius="full" colorScheme="red">
                <TagLabel>{predictResponse?.predicted_class}</TagLabel>
              </Tag>
              <Stat mt={10}>
                <StatLabel>Confidence</StatLabel>
                <StatNumber>{calc(predictResponse?.confidences)}</StatNumber>
              </Stat>
            </Box>
          )}
          {error && <Text color="ui.danger">{error}</Text>}
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  )
}

export default ModelVersion
