import React, { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { Option } from '~/lib/interfaces/general.interfaces';
import GenericModal from '~/lib/components/UI/Modal';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import Button from '~/lib/components/UI/Button';
import { FormikProvider, useFormik } from 'formik';
import EmployeeSelect from '../../EmployeeSelect';
import { assigneeSchema } from '~/lib/schemas/general.schema';

interface UserSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSelectUser: (option: Option) => void;
  sectionInfoText?: string;
}

const UserSelectModal = (props: UserSelectModalProps) => {
  const { isOpen, onClose, handleSelectUser, sectionInfoText } = props;
  const [selectedUser, setSelectedUser] = useState<Option | null>(null);

  const formik = useFormik({
    initialValues: {
      assignee: null,
    },
    validationSchema: assigneeSchema,
    enableReinitialize: true,
    onSubmit: async (_, { resetForm }) => {
      if (selectedUser) {
        handleSelectUser(selectedUser);
      }
      resetForm();
      onClose();
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { md: '526px' } }}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            width="full"
            spacing="79px"
            alignItems="flex-end"
            pl="32px"
            pr="50px"
            pt="56px"
            pb="32px"
          >
            <HStack
              width="full"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <SectionInfo
                title="Assign"
                info={
                  sectionInfoText ??
                  'Add name that users can likely search with'
                }
                isRequired={false}
                maxWidth="125px"
              />
              <EmployeeSelect
                selectName="assignee"
                selectTitle="Enter User"
                handleSelect={(option) => setSelectedUser(option)}
                showTitleAfterSelect={false}
              />
            </HStack>
            <HStack spacing="16px">
              <Button
                variant="secondary"
                customStyles={{ width: '116px' }}
                handleClick={onClose}
              >
                Cancel
              </Button>
              <Button customStyles={{ width: '116px' }} type="submit">
                Assign
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default UserSelectModal;
