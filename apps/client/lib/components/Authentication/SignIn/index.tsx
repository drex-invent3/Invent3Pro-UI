'use client';

import { Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { loginSchema } from '~/lib/schemas/auth.schema';
import { Field, FormikProvider, useFormik } from 'formik';
import AuthLayout from '../AuthLayout';
import TextInput from '../../UI/TextInput';
import SSOLogin from './SSOLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { utilityApi } from '~/lib/redux/services/utility.services';
import { setCredentials } from '~/lib/redux/slices/GeneralSlice';
import { Button } from '@repo/ui/components';

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const result = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (result?.error) {
        // Handle error
        console.error(result.error);
      } else {
        const result = await dispatch(
          utilityApi.endpoints.getAppConfigValues.initiate({})
        );
        dispatch(
          setCredentials({
            appConfigValues: result?.data?.data,
          })
        );
        router.push(ref ?? '/dashboard');
      }
      setSubmitting(false);
    },
  });

  return (
    <AuthLayout>
      <Flex
        mt={{ base: '51px', lg: '0px' }}
        width="full"
        maxW="404px"
        direction="column"
        pt={{ base: '32px', lg: '71px' }}
        px={{ base: '16px', lg: '40px' }}
        pb={{ base: '32px', lg: '43px' }}
        bgColor="#0000004D"
        rounded={{ base: '8.49px', lg: '10px' }}
      >
        <VStack
          alignItems="flex-start"
          spacing={{ base: '13px', lg: '16px' }}
          mb={{ base: '64px', lg: '77px' }}
        >
          <Heading
            as="h2"
            fontWeight={800}
            fontSize={{ base: '32px', lg: '40px' }}
            lineHeight={{ base: '38.02px', lg: '47.52px' }}
            color="neutral.100"
          >
            Sign in
          </Heading>
          <Text
            color="neutral.300"
            fontSize={{ base: '14px', lg: '15px' }}
            lineHeight={{ base: '16.63px', lg: '17.82px' }}
            fontWeight={500}
          >
            Don't have an account?
            <Link href="#">
              <Text fontWeight={700} as="span" color="brand.500">
                {' '}
                Contact admin
              </Text>
            </Link>
          </Text>
        </VStack>
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              spacing="16px"
              width="full"
              mb={{ base: '34px', lg: '40px' }}
            >
              <Field
                as={TextInput}
                name="username"
                type="text"
                label="Username"
                placeholder="Username"
                variant="secondary"
              />

              <Flex direction="column" w="full" gap="16px">
                <Field
                  as={TextInput}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  variant="secondary"
                />

                <Flex width="full" justifyContent="flex-end" color="brand.500">
                  <Link href="/forgot-password">
                    <Text size="md" fontWeight={700}>
                      Forgot Password?
                    </Text>
                  </Link>
                </Flex>
              </Flex>
            </VStack>

            <Button
              isLoading={formik.isSubmitting}
              loadingText="Logging In..."
              type="submit"
            >
              Sign in
            </Button>
          </form>
        </FormikProvider>
        <Flex
          alignItems="center"
          mt={{ base: '54px', lg: '64px' }}
          mb={{ base: '27px', lg: '32px' }}
          gap="4px"
        >
          <Divider borderColor="white" borderWidth="1px" flexGrow={1} />
          <Text size="md" fontWeight={400} color="white" whiteSpace="nowrap">
            Or
          </Text>
          <Divider borderColor="white" borderWidth="1px" flexGrow={1} />
        </Flex>
        <SSOLogin />
      </Flex>
    </AuthLayout>
  );
};

export default SignIn;
