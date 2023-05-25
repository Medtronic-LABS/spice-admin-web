import { renderHook, act } from '@testing-library/react-hooks';
import { useProgressiveIncrementorHook } from '../progressiveIncrementor';

jest.useFakeTimers();

describe('useProgressiveIncrementorHook', () => {
  const mockCallBack = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should not start the timer when displayProgress is false', () => {
    const { result } = renderHook(() =>
      useProgressiveIncrementorHook({
        displayProgress: false,
        callBack: mockCallBack
      })
    );

    expect(result.current).toBe(0);
  });

  test('should start the timer and increment timerVal until stopAt is reached', () => {
    const { result } = renderHook(() =>
      useProgressiveIncrementorHook({
        displayProgress: true,
        callBack: mockCallBack
      })
    );

    expect(result.current).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000); // Assuming REACT_APP_ORG_SUCCESS_DELAY_TIME = 1000
    });

    expect(result.current).toBe(0);

    act(() => {
      jest.advanceTimersByTime(500); // Timer should not trigger yet
    });

    expect(result.current).toBe(5);

    act(() => {
      jest.advanceTimersByTime(500); // Timer should trigger and increment by 5%
    });

    expect(result.current).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000); // Timer should increment by 5% each second until 1000
    });

    expect(result.current).toBe(10);
  });

  test('should clean up timers when unmounted', () => {
    const { unmount } = renderHook(() =>
      useProgressiveIncrementorHook({
        displayProgress: true,
        callBack: mockCallBack
      })
    );

    unmount();
  });
});
