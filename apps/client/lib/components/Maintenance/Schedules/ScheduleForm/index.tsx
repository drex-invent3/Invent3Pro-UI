'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import FormSection from './FormSection';
import SummarySection from './SummarySection';
import SlideTransition from '~/lib/components/UI/SlideTransition';
import withFormLeaveDialog from '~/lib/components/UI/Form/FormLeaveDialogProvider';

interface ScheduleFormProps {
  type: 'create' | 'edit';
}
const ScheduleForm = (props: ScheduleFormProps) => {
  const { type } = props;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Flex width="full" direction="column" pb="24px">
      <FormSection
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        type={type}
      />
      <SlideTransition trigger={activeStep === 1}>
        <SummarySection
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          type={type}
        />
      </SlideTransition>
    </Flex>
  );
};

export default withFormLeaveDialog(ScheduleForm);
