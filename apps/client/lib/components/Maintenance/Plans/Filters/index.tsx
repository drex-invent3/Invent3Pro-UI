import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '~/lib/components/Common/FilterComponents/FilterWrapper';
import { Option } from '~/lib/interfaces/general.interfaces';
import { PlanFilter } from '~/lib/interfaces/maintenance.interfaces';
import { initialFilterData } from '..';
import PlanTypeFilter from './PlanTypeFilter';

interface FiltersProps {
  filterData: PlanFilter;
  setFilterData: React.Dispatch<React.SetStateAction<PlanFilter>>;
  handleApplyFilter: () => Promise<void>;
}
const Filters = (props: FiltersProps) => {
  const { filterData, setFilterData, handleApplyFilter } = props;

  type FilterLabel = keyof PlanFilter;

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    setFilterData((prev) => {
      const selectedFilterData = [...prev[filterLabel]];

      const optionIndex = selectedFilterData.find(
        (item) => item.value === option.value
      );

      if (optionIndex) {
        // Remove the value if it already exists
        return {
          ...prev,
          [filterLabel]: selectedFilterData.filter(
            (item) => item.value !== option.value
          ),
        };
      } else {
        // Add the value if it does not exist
        return {
          ...prev,
          [filterLabel]: [...selectedFilterData, option],
        };
      }
    });
  };
  return (
    <FilterWrapper
      handleApplyFilter={handleApplyFilter}
      handleClearFilter={() => setFilterData(initialFilterData)}
    >
      <PlanTypeFilter
        selectedOptions={filterData.planType}
        handleSelectedOption={(value) => handleFilterData(value, 'planType')}
      />
      <CombinedLocationFilter
        selectedRegion={filterData.region}
        selectedArea={filterData.area}
        selectedBranch={filterData.branch}
        handleSelectedOption={handleFilterData}
      />
    </FilterWrapper>
  );
};

export default Filters;
