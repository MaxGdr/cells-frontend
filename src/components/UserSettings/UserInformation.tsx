import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import type { UserPublicSchema } from "../../client"
import useAuth from "../../hooks/useAuth"

const UserInformation = () => {
  const color = useColorModeValue("inherit", "ui.light")
  const { user: currentUser } = useAuth()
  const {
    formState: { errors },
  } = useForm<UserPublicSchema>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      full_name: currentUser?.full_name,
      email: currentUser?.email,
    },
  })

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          User Information
        </Heading>
        <Box w={{ sm: "full", md: "50%" }} as="form">
          <FormControl>
            <FormLabel color={color} htmlFor="name">
              Full name
            </FormLabel>
            <Text
              size="md"
              py={2}
              color={!currentUser?.full_name ? "ui.dim" : "inherit"}
            >
              {currentUser?.full_name}
            </Text>
          </FormControl>
          <FormControl mt={4} isInvalid={!!errors.email}>
            <FormLabel color={color} htmlFor="email">
              Email
            </FormLabel>
            <Text size="md" py={2}>
              {currentUser?.email}
            </Text>
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
      </Container>
    </>
  )
}

export default UserInformation
