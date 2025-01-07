import React, { useEffect } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { HStack } from '@chakra-ui/react';
import { FormSectionInfo, SelectableButtonGroup } from '@repo/ui/components';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateRepeatInterval } from '~/lib/redux/slices/DateSlice';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Weekly = () => {
  const dispatch = useAppDispatch();
  const weeklyInterval = useAppSelector(
    (state) => state.date.info.recurrence.repeatIntervals.weekly
  );

  //Sets today as the default day
  useEffect(() => {
    if (weeklyInterval.length === 0) {
      const today = moment().day();
      dispatch(updateRepeatInterval({ weekly: [today] }));
    }
  }, []);

  return (
    <HStack width="full" spacing="29px" alignItems="flex-start" mb="32px">
      <FormSectionInfo
        title="On days"
        info="Select specific days for the occurence schedule"
        isRequired={false}
        maxWidth="130px"
      />

      <SelectableButtonGroup
        options={DAYS.map(
          (item, index) => ({ label: item, value: index }) as Option
        )}
        selectedOptions={weeklyInterval.map(
          (item) => ({ label: item, value: item }) as unknown as Option
        )}
        handleSelect={(options) =>
          dispatch(
            updateRepeatInterval({
              weekly: options.map((item) => item.value as number),
            })
          )
        }
        buttonVariant="outline"
        customContainerStyle={{ spacing: '4px', flexWrap: 'nowrap' }}
        customButtonStyle={{ width: '42px', height: '42px' }}
        isMultiSelect
        hasAtLeastOneSelected
      />
    </HStack>
  );
};

export default Weekly;
