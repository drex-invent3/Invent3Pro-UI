import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allTasks', 'allTasksByScheduleId'],
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (body: any) => ({
        url: `/Tasks`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTasksByScheduleId', 'allTasks'],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/Tasks/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTasksByScheduleId', 'allTasks'],
    }),
    deleteTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/Tasks/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTasksByScheduleId', 'allTasks'],
    }),
    getAllTasks: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Tasks?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTasks'],
    }),
    getAllTasksByScheduleId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Tasks/GetTasksByMaintenanceScheduleId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTasksByScheduleId'],
    }),
    searchTasks: builder.mutation({
      query: (body: any) => ({
        url: `/Tasks/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useSearchTasksMutation,
  useGetAllTasksByScheduleIdQuery,
} = taskApi;
