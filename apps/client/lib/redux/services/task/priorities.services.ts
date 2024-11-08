import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  QueryParams,
} from '~/lib/interfaces/general.interfaces';
import { TaskPriority } from '~/lib/interfaces/task.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskPrioritiesApi = createApi({
  reducerPath: 'taskPrioritiesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTaskPriorities'],
  endpoints: (builder) => ({
    getAllTaskPriorities: builder.query<
      BaseApiResponse<{ items: TaskPriority[] }>,
      QueryParams
    >({
      query: (data: any) => ({
        url: generateQueryStr(`/TaskPriorities?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTaskPriorities'],
    }),
    searchTaskPriorities: builder.mutation({
      query: (body: any) => ({
        url: `/TaskPriorities/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllTaskPrioritiesQuery, useSearchTaskPrioritiesMutation } =
  taskPrioritiesApi;
