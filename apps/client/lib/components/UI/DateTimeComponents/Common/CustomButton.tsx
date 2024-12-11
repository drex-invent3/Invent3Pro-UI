import { Icon } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import { PenIcon } from '~/lib/components/CustomIcons';

interface CustomButtonProps {
  buttonVariant: 'solid' | 'outline';
  handleClick: () => void;
  buttonText?: string;
}
const CustomButton = (props: CustomButtonProps) => {
  const { buttonVariant, handleClick, buttonText } = props;

  const buttonStyle = {
    py: '10px',
    px: '16px',
    height: '37px',
    color: 'black',
    width: 'max-content',
    border: buttonVariant === 'outline' ? '1px solid #898989' : 'none',
    bgColor: buttonVariant === 'solid' ? '#E4E4E4' : 'transparent',
    _hover: { bgColor: 'none' },
    _active: { bgColor: 'none' },
    _focus: { bgColor: 'none' },
  };

  return (
    <Button customStyles={buttonStyle} handleClick={handleClick}>
      <Icon as={PenIcon} boxSize="16px" color="#374957" mr="8px" />
      {buttonText ?? 'Custom'}
    </Button>
  );
};

export default CustomButton;
