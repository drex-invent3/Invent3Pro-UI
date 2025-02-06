// eslint-disable-next-line no-redeclare
import React from 'react';
import {
  Divider,
  Flex,
  HStack,
  Icon,
  Text as ChakraText,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '../CustomIcons';

const CompletedIcon = () => {
  return (
    <HStack
      width={{ base: '16px', md: '24px' }}
      height={{ base: '16px', md: '24px' }}
      bgColor="#34C759"
      rounded="4px"
      justifyContent="center"
    >
      <Icon as={CheckIcon} boxSize="11px" color="white" />
    </HStack>
  );
};

interface ActiveInactiveIconProps {
  active: boolean;
  boxIndex: number;
}
const ActiveInactiveIcon = (props: ActiveInactiveIconProps) => {
  const { active, boxIndex } = props;
  return (
    <HStack
      minW={{ base: '16px', md: '24px' }}
      minH={{ base: '16px', md: '24px' }}
      bgColor="primary.500"
      rounded="4px"
      opacity={active ? 1 : 0.5}
      justifyContent="center"
    >
      <ChakraText size={{base:'base', md: 'md' }} color="white" fontWeight={800}>
        {boxIndex + 1}
      </ChakraText>
    </HStack>
  );
};

interface FormStepperProps {
  currentStep: number;
  steps: string[];
}

const FormStepper = (props: FormStepperProps) => {
  const { currentStep, steps } = props;
  return (
    <Flex
      width="full"
      pt="19px"
      pb="18px"
      px="16px"
      bgColor="#B4BFCA80"
      rounded="4px"
      overflow="auto"
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        maxW={{ md: '95%' ,base:'100%'}}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <HStack spacing="12px" mr={{ md: '32px', base: '8px' }}>
              {currentStep > index + 1 && <CompletedIcon />}
              {currentStep <= index + 1 && (
                <ActiveInactiveIcon
                  boxIndex={index}
                  active={index + 1 === currentStep}
                />
              )}
              <VStack spacing="4px" alignItems="flex-start">
                <ChakraText
                  color="neutral.600"
                  letterSpacing={{ base: '0.15em', md: '0.2em' }}
                  fontSize="10px"
                  fontWeight={700}
                  lineHeight="11.88px"
                  whiteSpace="nowrap"
                >
                  STEP {index + 1}
                </ChakraText>
                <ChakraText
                  size={{ base: 'base', md: 'md' }}
                  color="black"
                  fontWeight={700}
                  whiteSpace="nowrap"
                >
                  {step}
                </ChakraText>
              </VStack>
            </HStack>
            {index !== steps.length - 1 && (
              <Divider
                orientation="horizontal"
                borderWidth="2px"
                borderColor="neutral.600"
                w="full"
                mr="29px"
                rounded="full"
              />
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
};

export default FormStepper;
