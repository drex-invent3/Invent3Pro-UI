import { Button, HStack, useDisclosure, useToast } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';
import ChangeAssetStatusModal from './StatusAction/ChangeAssetStatusModal';

const BulkActions = () => {
  const toast = useToast();
  const selectedAssetIds = useAppSelector(
    (state) => state.asset.selectedAssetIds
  );
  const {
    isOpen: isOpenChangeStatus,
    onOpen: onOpenChangeStatus,
    onClose: onCloseChangeStatus,
  } = useDisclosure();

  const handleBulkActionButtonClick = (buttonCallback: () => void) => {
    if (selectedAssetIds.length > 0) {
      buttonCallback();
    } else {
      toast({
        title: 'No Asset Selected',
        description: 'Please select atleast one asset',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  return (
    <>
      <HStack spacing="7px" width="full">
        <Button
          minH="36px"
          bgColor="white"
          color="neutral.800"
          fontSize="12px"
          lineHeight="14.26px"
          fontWeight={700}
          pl="12px"
          pr="8px"
          onClick={() => handleBulkActionButtonClick(() => {})}
        >
          Transfer Assets
        </Button>
        <Button
          minH="36px"
          bgColor="white"
          color="neutral.800"
          fontSize="12px"
          lineHeight="14.26px"
          fontWeight={700}
          pl="12px"
          pr="8px"
          onClick={() => handleBulkActionButtonClick(() => {})}
        >
          Dispose Assets
        </Button>
        <Button
          minH="36px"
          bgColor="white"
          color="neutral.800"
          fontSize="12px"
          lineHeight="14.26px"
          fontWeight={700}
          pl="12px"
          pr="8px"
          onClick={() => handleBulkActionButtonClick(onOpenChangeStatus)}
        >
          Change Status
        </Button>
      </HStack>
      <ChangeAssetStatusModal
        isOpen={isOpenChangeStatus}
        onClose={onCloseChangeStatus}
      />
    </>
  );
};

export default BulkActions;
