import { DrawerBody, DrawerHeader, Spinner, VStack } from '@chakra-ui/react';
import { GenericDrawer } from '@repo/ui/components';
import { useMemo } from 'react';
import useUpdateSearchParams from '~/lib/hooks/useUpdateSearchParams';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';
import { setAsset } from '~/lib/redux/slices/AssetSlice';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import GenericErrorState from '../../UI/GenericErrorState';
import AssetInfo from './AssetInfo';
import AssetTabs from './AssetTabs';
import AssetHeader from './Header';

interface AssetDetailProps {
  data: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  type?: 'template' | 'main';
}

const AssetDetail = ({ isOpen, onClose, type = 'main' }: AssetDetailProps) => {
  const dispatch = useAppDispatch();
  const assetSlug = SYSTEM_CONTEXT_DETAILS.ASSETS.slug;
  const selectedAsset = useAppSelector((state) => state.asset.asset);
  const { removeSearchParam, getSearchParam, clearSearchParamsAfter } =
    useUpdateSearchParams();

  const assetId = getSearchParam(assetSlug)
    ? Number(getSearchParam(assetSlug))
    : null;

  const { data: assetData, isLoading } = useGetAssetInfoHeaderByIdQuery(
    { id: assetId! },
    {
      skip: !assetId || Boolean(selectedAsset),
    }
  );

  const closeDrawer = () => {
    removeSearchParam([assetSlug, 'tabSelected']);
    onClose();
  };

  const asset = useMemo(() => {
    if (assetData?.data && !selectedAsset) dispatch(setAsset(assetData?.data));

    return selectedAsset || assetData?.data;
  }, [assetData, selectedAsset]);

  const assetNotFound = useMemo(() => {
    const notFound = !asset && !isLoading;

    if (notFound) clearSearchParamsAfter(assetSlug);

    return notFound;
  }, [asset, isLoading]);

  return (
    <GenericDrawer
      isOpen={isOpen}
      onClose={closeDrawer}
      maxWidth="850px"
      customStyle={{ trapFocus: true }}
    >
      {assetNotFound && (
        <GenericErrorState
          title="Error: Asset Not Found!"
          subtitle="The Selected Asset Could not be found"
        />
      )}

      {isLoading && !asset && (
        <VStack width="full" minH="100vh" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </VStack>
      )}

      {asset && (
        <>
          <DrawerHeader px="32px" pt="16px" pb="29px">
            <AssetHeader handleBack={closeDrawer} type={type} />
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack width="full" alignItems="flex-start" spacing="24px">
              <AssetInfo />
              <AssetTabs />
            </VStack>
          </DrawerBody>
        </>
      )}
    </GenericDrawer>
  );
};

export default AssetDetail;
