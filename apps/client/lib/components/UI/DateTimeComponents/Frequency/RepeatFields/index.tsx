import { Flex } from '@chakra-ui/react';
import React from 'react';
import Weekly from './Weekly';
import Annually from './Annually';
import Daily from './Daily';
import Monthly from './Monthly';
import { useAppSelector } from '~/lib/redux/hooks';

interface RepeatFieldProps {
  selectedDateTime: string | null;
}

const RepeatFields = (props: RepeatFieldProps) => {
  const { selectedDateTime } = props;
  const repeat = useAppSelector((state) => state.date.info.frequency.repeat);
  const label = repeat?.label?.toLowerCase();
  return (
    <Flex width="full" height="full">
      {label === 'daily' && <Daily selectedDateTime={selectedDateTime} />}
      {label === 'monthly' && <Monthly />}
      {label === 'weekly' && <Weekly />}
      {label === 'annually' && <Annually />}
    </Flex>
  );
};

export default RepeatFields;
