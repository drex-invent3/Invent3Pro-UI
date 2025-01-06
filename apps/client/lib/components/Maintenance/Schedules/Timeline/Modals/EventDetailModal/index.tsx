import {
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';

import HeaderInfo from './HeaderInfo';
import OtherInfo from './OtherInfo';
import PlanDetail from './PlanDetail';
import ModalButtons from './ModalButtons';
import { CloseIcon } from '~/lib/components/CustomIcons';
import { useGetScheduleInstanceByGuidQuery } from '~/lib/redux/services/maintenance/scheduleInstance.services';
import { LoadingSpinner } from '@repo/ui/components';
import GenericErrorState from '~/lib/components/UI/GenericErrorState';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleInstanceGuid: string | null;
}
const EventDetailModal = (props: EventDetailModalProps) => {
  const { isOpen, onClose, scheduleInstanceGuid } = props;
  const { data, isLoading, isError } = useGetScheduleInstanceByGuidQuery(
    {
      instanceGuid: scheduleInstanceGuid!,
    },
    { skip: !scheduleInstanceGuid }
  );
  const { removeSearchParam } = useCustomSearchParams();

  const handleClose = () => {
    removeSearchParam(
      SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent
        minW={{ base: '90%', lg: '729px' }}
        maxHeight="90%"
        rounded="4px"
      >
        <ModalBody p={0} m={0} position="relative" minH="579px">
          <Icon
            as={CloseIcon}
            boxSize="24px"
            position="absolute"
            mt="16px"
            mr="16px"
            right={0}
            color="primary.500"
            cursor="pointer"
            onClick={() => onClose()}
          />
          {isLoading ? (
            <LoadingSpinner />
          ) : data?.data ? (
            <VStack>
              <VStack
                width="full"
                spacing="40px"
                bgColor="#0366EF14"
                alignItems="flex-start"
                pt="16px"
                px="16px"
                pb="20px"
              >
                <HeaderInfo data={data?.data} />
                <OtherInfo data={data?.data} />
              </VStack>
              <VStack
                width="full"
                alignItems="flex-start"
                spacing="68px"
                mt="28px"
                px="16px"
                pb="26px"
              >
                <PlanDetail data={data?.data} />
                <ModalButtons
                  planId={data?.data?.maintenancePlanId}
                  scheduleInstanceGuid={data?.data?.scheduleInstanceGuid}
                />
              </VStack>
            </VStack>
          ) : (
            isError && <GenericErrorState subtitle="Invalid Schedule" />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventDetailModal;
