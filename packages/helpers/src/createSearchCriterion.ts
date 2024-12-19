import { OPERATORS } from './constants';
import { Criterion, SearchCriterion } from './interfaces/common.interface';

const generateSearchCriterion = (
  columnName: string,
  columnValues: (string | number)[],
  operator: (typeof OPERATORS)[keyof typeof OPERATORS]
) => {
  const finalSearchCriterion: Criterion[] = [];

  columnValues.forEach((item) =>
    finalSearchCriterion.push({
      columnName,
      columnValue: item,
      operation: operator,
    })
  );
  return finalSearchCriterion;
};

const createSearchCriterion = ({
  andCriterions,
  orCriterions,
  currentPage,
  pageSize,
  includeDeleted = false,
  useOrLogic = false,
  isLogicalOperatorSpecified = false,
}: {
  andCriterions?: Record<string, (string | number)[]>;
  orCriterions?: Record<string, (string | number)[]>;
  currentPage: number;
  pageSize: number;
  includeDeleted?: boolean;
  useOrLogic?: boolean;
  isLogicalOperatorSpecified?: boolean;
}): SearchCriterion => {
  const searchCriteria: SearchCriterion = {
    ...(andCriterions && Object.keys(andCriterions).length > 0
      ? {
          criterion: Object.entries(andCriterions).flatMap(([key, items]) =>
            generateSearchCriterion(key, items, OPERATORS.Equals)
          ),
        }
      : {}),
    ...(orCriterions && Object.keys(orCriterions).length > 0
      ? {
          orCriterion: Object.entries(orCriterions)
            .map(([key, items]) => {
              const values = items.map((item) => item);
              return values.length > 0
                ? generateSearchCriterion(key, values, OPERATORS.Equals)
                : null;
            })
            .filter(
              (criterion): criterion is Criterion[] => criterion !== null
            ),
        }
      : {}),
    pageNumber: currentPage,
    pageSize: pageSize,
    includeDeleted,
    useOrLogic,
    isLogicalOperatorSpecified,
  };

  return searchCriteria;
};

export default createSearchCriterion;
