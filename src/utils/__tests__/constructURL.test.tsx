import { constructUrl } from '../constructURL';

describe('constructUrl', () => {
  it('should construct the URL correctly', () => {
    const requestUrl = {
      resource: '/api/resource',
      query: {
        pageNo: 2,
        limit: 10,
        sortField: 'name',
        sortOrder: 'asc',
        filters: 'category=books',
        search: [{ field: 'title', value: 'react' }],
        coreFilters: { field: 'status', value: ['active', 'pending'] }
      }
    };

    const expectedUrl =
      '/api/resource?$limit=10&$skip=20&$sort[name]=asc&$or[0][title][$search]=react&$or[0][status][$in]=active[$in]=pending&category=books';

    const constructedUrl = constructUrl(requestUrl as any);
    expect(constructedUrl).toBe(expectedUrl);
  });

  it('should construct the URL correctly when limit is "all"', () => {
    const requestUrl = {
      resource: '/api/resource',
      query: {
        pageNo: 1,
        limit: 'all',
        sortField: 'name',
        sortOrder: 'asc',
        filters: '',
        search: [],
        coreFilters: null
      }
    };

    const expectedUrl = '/api/resource?$limit=null&$sort[name]=asc';

    const constructedUrl = constructUrl(requestUrl as any);
    expect(constructedUrl).toBe(expectedUrl);
  });
});
