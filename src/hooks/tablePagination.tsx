import { useState } from 'react';

import APPCONSTANTS from '../constants/appConstants';

interface IListParamsState {
  page: number;
  rowsPerPage: number;
  searchTerm: string;
}

export const useTablePaginationHook = () => {
  const [listParams, setListReqParams] = useState<IListParamsState>({
    page: APPCONSTANTS.INITIAL_PAGE,
    rowsPerPage: APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE,
    searchTerm: ''
  });

  const handleSearch = (searchString: string) => {
    setListReqParams((prevstate) => ({
      ...prevstate,
      page: 1,
      searchTerm: searchString
    }));
  };

  const handlePage = (pageNo: number, rowsPerPage: number | undefined = APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE) => {
    setListReqParams((prevstate) => ({
      ...prevstate,
      page: pageNo,
      rowsPerPage
    }));
  };

  return { listParams, handleSearch, handlePage };
};
