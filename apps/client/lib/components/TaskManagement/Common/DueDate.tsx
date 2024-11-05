import { Flex, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import DateTimeButtons from '../../UI/DateTimeComponents/DateTimeButtons';
import { useField } from 'formik';
import ErrorMessage from '../../UI/ErrorMessage';

interface DueDateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const DueDate = (props: DueDateProps) => {
  const { sectionMaxWidth, spacing } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('dueDate');

  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Due Date"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>

      <VStack width="full" spacing="4px" alignItems="flex-start">
        <DateTimeButtons
          buttonVariant="secondary"
          includeTime={false}
          minDate={new Date()}
          selectedDate={meta.value ?? undefined}
          handleDateTimeSelect={(dateTime) => {
            helpers.setValue(dateTime?.trim() ?? null);
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </HStack>
  );
};

export default DueDate;
