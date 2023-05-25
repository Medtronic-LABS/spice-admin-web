import { CallEffect, PutEffect } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ITimezone } from '../store/user/types';

export interface IActionProps {
  type: string;
  [key: string]: any;
}

/**
 * Type of generator function.
 * Generator<WhatYouYield, WhatYouReturn, WhatYouAccept>
 */
export type GeneratorFunction = Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<{ type: any; response: string }>
  | PutEffect<{ type: any; [key: string]: any }>,
  void,
  IActionProps
>;

export interface ISearch {
  field: string;
  value: string;
}

export interface IRequestQuery {
  pageNo?: number;
  limit?: number | string | null;
  sortField?: string;
  sortOrder?: number;
  search?: ISearch[];
  filters?: string;
  skip?: number;
  coreFilters?: { field: string; value: string[] };
}

export interface IAdminReqPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  timezone: string;
}

export interface IUpdateAdminReqPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  gender: string;
  address: string;
  timezone: string;
  _id: string;
}

export interface IAdminsFormValues extends Omit<IAdminReqPayload, 'timezone'> {
  timezone: ITimezone;
}
