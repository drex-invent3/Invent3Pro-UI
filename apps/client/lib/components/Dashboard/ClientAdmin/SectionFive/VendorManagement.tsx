import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import VendorTable from '~/lib/components/VendorManagement/VendorTable';
import { useGetAllVendorsQuery } from '~/lib/redux/services/vendor.services';

const VendorManagement = () => {
  const { data, isLoading, isFetching } = useGetAllVendorsQuery({
    pageNumber: 1,
    pageSize: 5,
  });

  return (
    <VStack
      width="full"
      height="full"
      pl="16px"
      pr="15px"
      pt="21px"
      pb="12px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Vendor Management</CardHeader>
        <Button
          href={`/${ROUTES.TICKETS}`}
          customStyles={{
            py: 0,
            height: '28px',
            width: '68px',
            fontSize: '12px',
            lineHeight: '14.26px',
          }}
        >
          View All
        </Button>
      </HStack>
      <VendorTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        isSelectable={false}
        emptyLines={4}
        showFooter={false}
      />
    </VStack>
  );
};

export default VendorManagement;
