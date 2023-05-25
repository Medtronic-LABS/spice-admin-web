import { renderHook, act } from '@testing-library/react-hooks';
import { useLoadMorePagination } from '../pagination';

describe('useLoadMorePagination', () => {
  const mockOnLoadMore = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useLoadMorePagination({
        total: 20,
        itemsPerPage: 5,
        onLoadMore: mockOnLoadMore,
        defaultPage: 1
      })
    );

    expect(result.current.isLastPage).toBe(false);
  });

  test('should load more data when not on the last page', () => {
    const { result } = renderHook(() =>
      useLoadMorePagination({
        total: 20,
        itemsPerPage: 5,
        onLoadMore: mockOnLoadMore,
        defaultPage: 1
      })
    );

    act(() => {
      result.current.loadMore();
    });

    expect(mockOnLoadMore).toHaveBeenCalledWith({
      skip: 5,
      limit: 5,
      onFail: expect.any(Function)
    });
    expect(result.current.isLastPage).toBe(false);
  });

  test('should not load more data on the last page', () => {
    const { result } = renderHook(() =>
      useLoadMorePagination({
        total: 20,
        itemsPerPage: 5,
        onLoadMore: mockOnLoadMore,
        defaultPage: 4
      })
    );

    act(() => {
      result.current.loadMore();
    });

    expect(mockOnLoadMore).not.toHaveBeenCalled();
    expect(result.current.isLastPage).toBe(true);
  });

  test('should reset the page to 1', () => {
    const { result } = renderHook(() =>
      useLoadMorePagination({
        total: 20,
        itemsPerPage: 5,
        onLoadMore: mockOnLoadMore,
        defaultPage: 3
      })
    );

    act(() => {
      result.current.resetPage();
    });

    expect(result.current.isLastPage).toBe(false);
  });
});
