import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';

import SectionInfo from '../../../UI/Form/FormSectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import CustomDatePicker from '../../../UI/Form/FormDatePicker';

const DepreciationDetails = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Depreciation Details"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
        <GridItem colSpan={1}>
          <CustomDatePicker name="depreciationStartDate" label="Select Date" />
        </GridItem>
        <GridItem colSpan={2} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <Field
              as={TextInput}
              name="depreciationMethod"
              type="text"
              label="Depreciation Method"
              customStyles
            />
            <Field
              as={TextInput}
              name="depreciationRate"
              type="number"
              label="Depreciation Rate"
              customStyles
            />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default DepreciationDetails;
