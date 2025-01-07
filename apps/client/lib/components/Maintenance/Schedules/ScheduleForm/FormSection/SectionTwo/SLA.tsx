import { Flex, HStack } from '@chakra-ui/react';
import { useField } from 'formik';

import { FormSectionInfo, SelectableButtonGroup } from '@repo/ui/components';

const staticSLA = [
  {
    label: '2 hours',
    value: 2,
  },
  {
    label: '10 hours',
    value: 10,
  },
  {
    label: '1 day',
    value: 1,
  },
];

interface ServiceLevelAgreementProps {
  sectionMaxWidth: string;
  spacing: string;
  buttonVariant: 'secondary' | 'outline';
}
const ServiceLevelAgreement = (props: ServiceLevelAgreementProps) => {
  const { sectionMaxWidth, spacing, buttonVariant } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('sla');
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Service Level Agreement"
          info="Specify the terms of service for maintenance"
          isRequired
        />
      </Flex>
      <SelectableButtonGroup
        options={staticSLA}
        selectedOptions={[{ value: meta.value, label: meta.value }]}
        handleSelect={(options) => {
          helpers.setValue(options[0]?.value);
        }}
        isMultiSelect={false}
        buttonVariant={buttonVariant}
        customButtonStyle={{ width: 'max-content' }}
      />
    </HStack>
  );
};

export default ServiceLevelAgreement;
