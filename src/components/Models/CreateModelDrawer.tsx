import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { AxiosError } from "axios"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import {
  type ApiError,
  type ModelsCreateRequestSchema,
  ModelsService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

enum ModelTypes {
  Classification = "classification",
  Regression = "regression",
  TextClassification = "text_classification",
}

interface CreateModelDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CreateModelDrawer = ({ isOpen, onClose }: CreateModelDrawerProps) => {
  const [error, setError] = useState<string | null>(null)
  const showToast = useCustomToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ModelsCreateRequestSchema>()

  const createModel = async (data: ModelsCreateRequestSchema) => {
    const newModel = await ModelsService.createModelApiV1ModelsPost({
      requestBody: {
        name: data.name,
        description: data.description,
        model_type: data.model_type,
      },
    })
    return newModel
  }

  const createModelMutation = useMutation({
    mutationFn: createModel,
    onSuccess: (data) => {
      queryClient.setQueryData(["models", { id: data.id }], data)
      showToast("Success", "Your model has been created!", "success")
      onClose()
      navigate({
        to: "/models/$modelId",
        params: { modelId: String(data.id) },
      })
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

  const onSubmit: SubmitHandler<ModelsCreateRequestSchema> = async (data) => {
    if (isSubmitting) return

    setError(null)
    console.log(data)
    try {
      await createModelMutation.mutateAsync(data)
    } catch {
      showToast(
        "Something went wrong",
        "Your model has not been created. Please try again.",
        "error",
      )
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <Container as="form" onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new model
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Please enter model name"
                  {...register("name", { required: true })}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Please enter a model description"
                  {...register("description")}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="model_type">Select Model Type</FormLabel>
                <Select
                  id="model_type"
                  {...register("model_type", { required: true })}
                >
                  {Object.values(ModelTypes).map((val) => {
                    return <option value={val}>{val}</option>
                  })}
                </Select>
              </Box>
              <Box>{error && <FormErrorMessage>{error}</FormErrorMessage>}</Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" type="submit" isLoading={isSubmitting}>
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Container>
    </Drawer>
  )
}

export default CreateModelDrawer
