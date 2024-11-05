import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../Form/FormSectionInfo';
import NumberBox from '../Common/NumberBox';
import RepeatFields from './RepeatFields';
import { updateRecurrence } from '~/lib/redux/slices/DateSlice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';

interface IntervalsProps {
  maxInterval: number;
}
const Intervals = (props: IntervalsProps) => {
  const { maxInterval } = props;
  const dispatch = useAppDispatch();
  const recurrence = useAppSelector((state) => state.date.info.recurrence);
  const interval = recurrence.interval;

  return (
    <>
      <HStack width="full" spacing="29px" mb="32px">
        <SectionInfo
          title="Interval"
          info="Add name that users can likely search with"
          isRequired={false}
          maxWidth="130px"
        />
        <HStack spacing="24px">
          <NumberBox
            minNumber={1}
            maxNumber={maxInterval}
            value={interval}
            handleValueChange={(value) =>
              dispatch(updateRecurrence({ interval: value }))
            }
            handleDecrement={() =>
              interval > 1 &&
              dispatch(
                updateRecurrence({
                  interval: interval - 1,
                })
              )
            }
            handleIncrement={() =>
              interval < maxInterval &&
              dispatch(
                updateRecurrence({
                  interval: interval + 1,
                })
              )
            }
            customStyle={{ bgColor: 'transparent' }}
          />
          <Text textTransform="capitalize">{recurrence.frequency?.label}</Text>
        </HStack>
      </HStack>
      <RepeatFields selectedDateTime={recurrence.startDate ?? null} />
    </>
  );
};

export default Intervals;
