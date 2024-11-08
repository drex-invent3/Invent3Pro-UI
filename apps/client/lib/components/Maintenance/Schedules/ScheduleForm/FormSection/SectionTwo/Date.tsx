import {
  Flex,
  HStack,
  Icon,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React from 'react';
import { RepeatIcon } from '~/lib/components/CustomIcons';
import Button from '~/lib/components/UI/Button';
import DateTimeButtons from '~/lib/components/UI/DateTimeComponents/DateTimeButtons';
import RecurrenceModal from '~/lib/components/UI/DateTimeComponents/RecurrenceModal';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import InfoCard from '~/lib/components/UI/InfoCard';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { RecurrenceInfo } from '~/lib/interfaces/general.interfaces';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useValidateFirstInstanceScheduledDateMutation } from '~/lib/redux/services/maintenance/schedule.services';
import { updateRecurrence } from '~/lib/redux/slices/DateSlice';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';

interface DateProps {
  sectionMaxWidth: string;
  spacing: string;
  minScheduleDate: Date;
  maxScheduleDate: Date | undefined;
  buttonVariant: 'secondary' | 'outline';
}
const Date = (props: DateProps) => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useAppDispatch();
  const { values, setValues, errors, submitCount } =
    useFormikContext<ScheduleFormDetails>();
  const {
    sectionMaxWidth,
    spacing,
    minScheduleDate,
    maxScheduleDate,
    buttonVariant,
  } = props;
  const {
    isOpen: isOpenRecurrence,
    onOpen: onOpenRecurrence,
    onClose: onCloseRecurrence,
  } = useDisclosure();
  const toast = useToast();
  const { handleSubmit } = useCustomMutation();
  const [validateScheduleFirstInstanceSchedule, { isLoading }] =
    useValidateFirstInstanceScheduledDateMutation({});

  const validateRecurrence = async (info: RecurrenceInfo) => {
    const startDateTime = `${moment(info.startDate).format('DD/MM/YYYY')} ${info.startTime}`;
    const endDateTime = info.endDate
      ? `${moment(info.endDate).format('DD/MM/YYYY')} ${info.endTime}`
      : null;

    const formattedInfo = {
      frequencyId: info.frequency?.value as number,
      intervalValue: info.interval,

      dayOccurrences: isEmpty(info.repeatIntervals.daily)
        ? null
        : info.repeatIntervals.daily,

      weekOccurrences: isEmpty(info.repeatIntervals.weekly)
        ? null
        : info.repeatIntervals.weekly,

      monthOccurrences: isEmpty(info.repeatIntervals.monthly)
        ? null
        : info.repeatIntervals.monthly,

      yearOccurences: isEmpty(info.repeatIntervals.annually)
        ? null
        : info.repeatIntervals.annually,
    };

    const response = await handleSubmit(validateScheduleFirstInstanceSchedule, {
      ...formattedInfo,
      startDate: moment(startDateTime, 'DD/MM/YYYY HH:mm')
        .utcOffset(0, true)
        .toISOString(),
      endDate: endDateTime
        ? moment(endDateTime, 'DD/MM/YYYY HH:mm')
            .utcOffset(0, true)
            .toISOString()
        : null,
    });

    if (response?.data) {
      setValues({
        ...values,
        ...formattedInfo,
        scheduledDate: startDateTime,
        endDate: endDateTime,
      });
      dispatch(updateScheduleForm({ frequencyName: info.frequency?.label }));
      onCloseRecurrence();
    } else {
      toast({
        title: 'Error',
        description: 'Selected Recurrence does not have an instance',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <HStack width="full" alignItems="flex-start" spacing={spacing}>
        <Flex width="full" maxW={sectionMaxWidth}>
          <SectionInfo
            title="Start Date and Time"
            info="Add name that users can likely search with"
            isRequired
          />
        </Flex>
        <VStack width="full" spacing="12px" alignItems="flex-start">
          <DateTimeButtons
            buttonVariant={buttonVariant}
            includeTime={true}
            minDate={minScheduleDate}
            maxDate={maxScheduleDate}
            selectedDate={values.scheduledDate?.split(' ')?.[0] ?? undefined}
            handleDateTimeSelect={(dateTime) => {
              setValues({
                ...values,
                scheduledDate: dateTime,
                frequencyId: null,
              });
              if (dateTime) {
                const splittedDateTime = dateTime?.split(' ');
                dispatch(
                  updateRecurrence({
                    startDate: splittedDateTime?.[0]
                      ? moment(
                          splittedDateTime?.[0],
                          'DD/MM/YYYY'
                        ).toISOString()
                      : null,
                    startTime: splittedDateTime?.[1] ?? null,
                    endDate: null,
                    endTime: null,
                  })
                );
              }
            }}
          >
            <Button
              handleClick={onOpenRecurrence}
              variant={buttonVariant}
              customStyles={{
                height: '37px',
                width: 'max-content',
                borderColor: '#898989',
              }}
            >
              <Icon as={RepeatIcon} boxSize="16px" color="#374957" mr="8px" />
              Repeat
            </Button>
          </DateTimeButtons>
          <InfoCard
            infoText="Start Date has to be within specified Plan Info Date"
            customStyle={{ width: 'full' }}
          />
          {submitCount > 0 && (errors.scheduledDate || errors.frequencyId) && (
            <ErrorMessage>
              {(errors.scheduledDate as string) ?? 'Recurrence is required'}
            </ErrorMessage>
          )}
        </VStack>
      </HStack>
      <RecurrenceModal
        isOpen={isOpenRecurrence}
        onClose={onCloseRecurrence}
        minStartDate={minScheduleDate}
        maxStartDate={maxScheduleDate}
        maxEndDate={maxScheduleDate}
        handleSetRecurrence={(info: RecurrenceInfo) => validateRecurrence(info)}
        isLoading={isLoading}
      />
    </>
  );
};

export default Date;
