import { createSelector } from 'reselect';
import { AppState } from '../rootReducer';

const getLoading = (state: AppState) => state.labtest.loading;
const getLabtests = (state: AppState) => state.labtest.lab_tests;

const getLabtestsCount = (state: AppState) => state.labtest.total;

const getUnits = (state: AppState) => state.labtest.units;

const getUnitsLoading = (state: AppState) => state.labtest.unitsLoading;

const getLabResultUnits = (state: AppState) => state.labtest.labResultRanges;

const getUnitType = (state: AppState) => state.labtest.unitType;

export const labtestLoadingSelector = createSelector(getLoading, (loading) => loading);

export const labtestsSelector = createSelector(getLabtests, (labtests) => labtests);

export const labtestCountSelector = createSelector(getLabtestsCount, (labtestCount) => labtestCount);

export const unitsSelector = createSelector(getUnits, (units) => units);

export const unitsLoadingSelector = createSelector(getUnitsLoading, (unitsLoading) => unitsLoading);

export const labResultRangesSelector = createSelector(getLabResultUnits, (labResultRanges) => labResultRanges);

export const unitTypeSelector = createSelector(getUnitType, (unitType) => unitType);