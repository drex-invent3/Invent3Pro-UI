import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Header from './Header';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import { FormikProvider, useFormik } from 'formik';
import { assetTransferSchema } from '~/lib/schemas/asset/main.schema';
import { useAppDispatch } from '~/lib/redux/hooks';
import { clearAsset, setAsset } from '~/lib/redux/slices/assetSlice';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import Button from '../../UI/Button';
import AssetSuccessModal from '../Modals/AssetSuccessModal';

interface AssetTransferProps {
  data: Asset;
}
const AssetTransfer = (props: AssetTransferProps) => {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      newOwner: '',
      transferDate: '',
      condition: '',
      reason: '',
    },
    validationSchema: assetTransferSchema,
    onSubmit: async () => {
      onOpen();
    },
  });

  useEffect(() => {
    dispatch(setAsset(data));

    return () => {
      dispatch(clearAsset());
    };
  }, [data]);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Flex width="full" direction="column" gap="24px" mt="32px">
            <Flex
              width="full"
              py="32px"
              px="25px"
              direction="column"
              gap="40px"
              rounded="6px"
              bgColor="white"
            >
              <SectionOne />
              <SectionTwo />
            </Flex>
            <HStack spacing="16px" justifyContent="flex-end" width="full">
              <HStack
                as="button"
                px="16px"
                rounded="8px"
                bgColor="#F6F6F6B2"
                minH="50px"
                minW="96px"
                justifyContent="center"
              >
                <Text size="md" color="primary.500">
                  Cancel
                </Text>
              </HStack>

              <Button type="submit" customStyles={{ width: '161px' }}>
                Transfer
              </Button>
            </HStack>
          </Flex>
        </form>
      </FormikProvider>
      <AssetSuccessModal
        isOpen={isOpen}
        onClose={onClose}
        buttonWidth="193px"
        successText="Asset Transfer Successful"
      />
    </Flex>
  );
};

export default AssetTransfer;
