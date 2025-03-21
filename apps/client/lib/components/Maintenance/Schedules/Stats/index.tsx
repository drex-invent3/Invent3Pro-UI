import { VStack } from '@chakra-ui/react';

import GeneralStats from './GeneralStats';
import StatusCount from './StatusCount';
import { useGetMaintenanceScheduleStatsQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { AREA_ENUM } from '~/lib/utils/constants';

const ScheduleStats = () => {
  const { selectedCountry, selectedState, timelineStartDate, timelineEndDate } =
    useAppSelector((state) => state.maintenance.scheduleInfo);
  const isProperState = selectedState?.label && selectedState?.label !== 'All';
  const { data, isLoading, isFetching } = useGetMaintenanceScheduleStatsQuery(
    {
      areaId: isProperState
        ? (selectedState.value as number)
        : (selectedCountry?.value as number),
      areaType: isProperState ? AREA_ENUM.state : AREA_ENUM.country,
      startDate: timelineStartDate!,
      endDate: timelineEndDate!,
    },
    { skip: !timelineStartDate }
  );
  return (
    <VStack width="full" spacing="16px">
      {<GeneralStats isLoading={isLoading || isFetching} data={data?.data} />}
      <StatusCount isLoading={isLoading || isFetching} data={data?.data} />
    </VStack>
  );
};

export default ScheduleStats;
