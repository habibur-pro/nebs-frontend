import { useState, useCallback } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export const useSort = (defaultSort: string = '-createdAt') => {
  const [sortBy, setSortBy] = useState<string>(defaultSort);

  const handleSortChange = useCallback((field: string) => {
    setSortBy(currentSort => {
      // If currently sorted by this field in descending order, switch to ascending
      if (currentSort === `-${field}`) {
        return field;
      }
      // If currently sorted by this field in ascending order, switch to descending
      if (currentSort === field) {
        return `-${field}`;
      }
      // If not currently sorted by this field, start with descending
      return `-${field}`;
    });
  }, []);

  const getSortIcon = useCallback((field: string) => {
    const isSortingByField = sortBy === field || sortBy === `-${field}`;
    
    if (!isSortingByField) {
      return 'none';
    }

    return sortBy.startsWith('-') ? 'desc' : 'asc';
  }, [sortBy]);

//   const getCurrentSortField = useCallback(() => {
//     return sortBy.startsWith('-') ? sortBy.slice(1) : sortBy;
//   }, [sortBy]);

//   const getSortDirection = useCallback((field: string): SortDirection => {
//     if (sortBy === `-${field}`) return 'desc';
//     if (sortBy === field) return 'asc';
//     return 'none';
//   }, [sortBy]);

  return {
    sortBy,
    setSortBy,
    handleSortChange,
    getSortIcon,
    // getCurrentSortField,
    // getSortDirection,
  };
};