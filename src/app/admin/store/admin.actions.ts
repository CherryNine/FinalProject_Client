import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from 'repository';
import { ErrorResponse } from 'types/error.type';

export const getUsers = createAsyncThunk(
  'users/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get('users');
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (ids: string[], { rejectWithValue }) => {
    try {
      const response = await repository.post('users/delete', { ids });
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  'users/changeStatus',
  async ({ ids, status }: { ids: string[]; status: 'blocked' | 'unblocked' }, { rejectWithValue }) => {
    try {
      const response = await repository.post('users/change-status', { ids, status });
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const updateRole = createAsyncThunk(
  'users/change-role',
  async ({ userIds, role }: { userIds: string[]; role: 'ADMIN' | 'USER' }, { rejectWithValue }) => {
    try {
      const response = await repository.post('users/change-role', { userIds, role });
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);
