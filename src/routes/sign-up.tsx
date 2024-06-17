import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type UsersCreateRequestSchema,
  UsersService,
} from "../client"

import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useState } from "react"
import { isLoggedIn } from "../hooks/useAuth"
import useCustomToast from "../hooks/useCustomToast"
import { emailPattern } from "../utils"

interface UserSignUpForm extends UsersCreateRequestSchema {
  confirm_password: string
}

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserSignUpForm>()
  const [error, setError] = useState<string | null>(null)
  const showToast = useCustomToast()
  const navigate = useNavigate()

  const signup = async (data: UserSignUpForm) => {
    await UsersService.signupApiV1UsersSignupPost({
      requestBody: {
        email: data.email,
        full_name: data.full_name,
        password: data.password,
      },
    })
  }

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      showToast(
        "Your account has been created!",
        "Please, now sign in with your new account.",
        "success",
      )
      navigate({ to: "/" })
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

  const onSubmit: SubmitHandler<UserSignUpForm> = async (data) => {
    if (isSubmitting) return

    setError(null)

    try {
      await signupMutation.mutateAsync(data)
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <Container
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      h="100vh"
      maxW="sm"
      alignItems="stretch"
      justifyContent="center"
      gap={4}
      centerContent
    >
      <Heading size="xl" color="ui.main" textAlign="center" mb={2}>
        Sign up
      </Heading>
      <Text align="center">Create your account to access the platform.</Text>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: emailPattern,
          })}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="full_name">Full name</FormLabel>
        <Input
          id="full_name"
          {...register("full_name")}
          type="text"
          placeholder="John Doe"
        />
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Set Password</FormLabel>
        <Input
          id="password"
          {...register("password", {
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.confirm_password}>
        <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
        <Input
          id="confirm_password"
          {...register("confirm_password", {
            validate: (value) =>
              value === getValues().password || "The passwords do not match",
          })}
          placeholder="Password"
          type="password"
        />
        {errors.confirm_password && (
          <FormErrorMessage>{errors.confirm_password.message}</FormErrorMessage>
        )}
      </FormControl>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      <Button variant="primary" type="submit" isLoading={isSubmitting}>
        Create my account
      </Button>
    </Container>
  )
}
