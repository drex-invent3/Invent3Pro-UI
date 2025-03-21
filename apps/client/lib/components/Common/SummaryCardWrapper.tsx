import {
  ComponentWithAs,
  HeadingProps,
  HStack,
  Icon,
  IconProps,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../Dashboard/Common/CardHeader';

interface SummaryCardWrapperProps {
  title: string;
  icon?: ComponentWithAs<'svg', IconProps>;
  children: React.ReactNode;
  containerStyle?: StackProps;
  iconStyle?: IconProps;
  headerStyle?: HeadingProps;
  iconWrapperStyle?: StackProps;
}

const SummaryCardWrapper = (props: SummaryCardWrapperProps) => {
  const {
    title,
    icon,
    children,
    containerStyle,
    headerStyle,
    iconStyle,
    iconWrapperStyle,
  } = props;

  return (
    <VStack
      width="full"
      height="full"
      p="16px"
      alignItems="flex-start"
      bgColor="white"
      rounded="8px"
      {...containerStyle}
    >
      <HStack
        width="full"
        alignItems="flex-start"
        justifyContent="space-between"
        position="relative"
      >
        <CardHeader customStyle={headerStyle}>{title}</CardHeader>
        {icon && (
          <HStack width="24px" height="24px" p={0} m={0} {...iconWrapperStyle}>
            <Icon
              as={icon}
              boxSize="24px"
              position="absolute"
              right={0}
              {...iconStyle}
            />
          </HStack>
        )}
      </HStack>
      {children}
    </VStack>
  );
};

export default SummaryCardWrapper;
