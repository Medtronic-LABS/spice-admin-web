import { useCallback, useRef } from 'react';

/**
 * A hook for load more pagination
 * @param param0
 * @returns { isLastPage: boolean; loadMore: () => void; resetPage: () => void; }
 */
export const useLoadMorePagination = ({
  total,
  itemsPerPage,
  onLoadMore,
  defaultPage = 1
}: {
  total: number;
  itemsPerPage: number;
  onLoadMore: (data: { skip: number; limit: number | null; onFail: () => void }) => void;
  defaultPage?: number;
}): {
  isLastPage: boolean;
  loadMore: () => void;
  resetPage: () => void;
} => {
  const totalPages = Math.max(Math.ceil(total / itemsPerPage), 1);
  const page = useRef<number>(defaultPage <= totalPages ? defaultPage : 1);
  const loadMore = useCallback(() => {
    if (totalPages > page.current) {
      page.current = page.current + 1;
      onLoadMore({
        skip: (page.current - 1) * itemsPerPage,
        limit: itemsPerPage,
        onFail: () => {
          page.current = page.current - 1;
        }
      });
    }
  }, [totalPages, itemsPerPage, onLoadMore]);
  const resetPage = useCallback(() => {
    page.current = 1;
  }, []);
  return {
    loadMore,
    isLastPage: totalPages === page.current,
    resetPage
  };
};
