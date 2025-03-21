import { HStack, Icon, StackProps, Text } from '@chakra-ui/react';

import { InfoIcon } from '../CustomIcons';

interface InfoCardProps {
  infoText: string;
  customStyle?: StackProps;
}
const InfoCard = (props: InfoCardProps) => {
  const { infoText, customStyle } = props;
  return (
    <HStack
      py="8px"
      px="16px"
      rounded="8px"
      bgColor="#0366EF0D"
      spacing="16px"
      alignItems="flex-start"
      width="full"
      {...customStyle}
    >
      <Icon as={InfoIcon} boxSize="16px" color="#0366EF" />
      <Text color="#0366EF" mt="2px">
        {infoText}
      </Text>
    </HStack>
  );
};

export default InfoCard;
