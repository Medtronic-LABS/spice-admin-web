import { fetchCount } from '../counterAPI';

// Import necessary Enzyme dependencies

describe('fetchCount', () => {
  it('returns a promise that resolves to the provided amount', async () => {
    const amount = 5;
    const response = await fetchCount(amount);
    expect(response.data).toEqual(amount);
  });

  it('returns a promise that resolves to the default amount', async () => {
    const response = await fetchCount();
    expect(response.data).toEqual(1);
  });

  it('returns a promise after a delay of 500ms', async () => {
    const amount = 2;
    const start = Date.now();
    await fetchCount(amount);
    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeGreaterThanOrEqual(500);
  });
});
