import React, { useEffect, useState } from 'react';
import SelectInput from '~/lib/components/UI/Select';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllAislesQuery,
  useSearchAisleMutation,
} from '~/lib/redux/services/asset/location.services';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { Operators } from '~/lib/utils/operators';

interface BuildingSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const AisleSelect = (props: BuildingSelectProps) => {
  const { handleSelect } = props;
  const [searchAisle] = useSearchAisleMutation({});
  const { handleSubmit } = useCustomMutation();

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAislesQuery({
    pageSize: 25,
    pageNumber,
  });
  const [options, setOptions] = useState<Option[]>([]);

  const handlePagination = () => {
    if (data?.data && data?.data?.totalPages > pageNumber) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleSearch = async (inputValue: string): Promise<Option[]> => {
    const searchCriterion = {
      criterion: [
        {
          columnName: 'aisleName',
          columnValue: inputValue,
          operation: Operators.Contains,
        },
      ],
      pageNumber: 1,
      pageSize: 25,
    };
    const response = await handleSubmit(searchAisle, searchCriterion, '');
    const formattedOptions = generateOptions(
      response?.data?.data.items,
      'aisleName',
      'aisleId'
    );
    return formattedOptions;
  };

  useEffect(() => {
    if (data?.data) {
      const formattedOptions = generateOptions(
        data?.data?.items,
        'aisleName',
        'aisleId'
      );
      setOptions((prev) => [...prev, ...formattedOptions]);
    }
  }, [data]);

  return (
    <SelectInput
      name="aisleId"
      title="Aisle"
      options={options}
      handleSelect={(option) => handleSelect && handleSelect(option)}
      isLoading={isLoading}
      callBackFunction={(inputValue: string) => handleSearch(inputValue)}
      isAsync
      handleOnMenuScrollToBottom={handlePagination}
      isSearchable
    />
  );
};

export default AisleSelect;
