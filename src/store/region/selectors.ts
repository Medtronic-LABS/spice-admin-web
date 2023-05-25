import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

const getLoading = (state: AppState) => state.region.loading;
const getLoadingMore = (state: AppState) => state.region.loadingMore;
const getRegions = (state: AppState) => state.region.regions;
const getRegionsCount = (state: AppState) => state.region.total;
const getRegionDetail = (state: AppState) => state.region.detail;

export const getRegionsLoadingSelector = createSelector(
  getLoading,
  (loading) => loading
);

export const getRegionsSelector = createSelector(
  getRegions,
  (regions) => regions
);

export const getRegionsCountSelector = createSelector(
  getRegionsCount,
  (regiosCount) => regiosCount
);

export const getRegionsLoadingMoreSelector = createSelector(
  getLoadingMore,
  (loadingMore) => loadingMore
);

export const getRegionDetailSelector = createSelector(
  getRegionDetail,
  (detail) => detail
);
