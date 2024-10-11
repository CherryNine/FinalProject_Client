import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Toolbar, Typography, Alert } from '@mui/material';
import { Delete, Block, LockOpen } from '@mui/icons-material';
import Header from 'components/header';
import { getUsers, deleteUser, changeUserStatus, updateRole } from './store/admin.actions';
import { usersSelector, usersLoadingSelector, usersErrorSelector } from './store/admin.selectors';
import { resetUser } from 'app/auth/store/auth.slice';
import { userProfileSelector } from 'app/auth/store/auth.selectors';
import { signOut } from 'app/auth/store/auth.actions';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const loading = useSelector(usersLoadingSelector);
  const error = useSelector(usersErrorSelector);
  const userInfo = useSelector(userProfileSelector);
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    dispatch<any>(getUsers());
  }, [dispatch]);

  const handleDelete = () => {
    const hasCurrentUser = userInfo && selectedIds.includes(userInfo.id);

    dispatch<any>(deleteUser(selectedIds)).then(() => {
      if (hasCurrentUser) {
        dispatch<any>(signOut());
        dispatch(resetUser());
        navigate('/auth/sign-in');
      }
      dispatch<any>(getUsers());
    });
  };

  const handleChangeStatus = (status: 'blocked' | 'unblocked') => {
    const hasCurrentUser = userInfo && selectedIds.includes(userInfo.id);

    dispatch<any>(changeUserStatus({ ids: selectedIds, status })).then(() => {
      if (hasCurrentUser && status === 'blocked') {
        dispatch<any>(signOut());
        dispatch(resetUser());
        navigate('/auth/sign-in');
      }
      dispatch<any>(getUsers());
    });
  };

  const handleChangeRole = (role: 'ADMIN' | 'USER') => {
    const hasCurrentUser = userInfo && selectedIds.includes(userInfo.id);
    dispatch<any>(updateRole({ userIds: selectedIds, role })).then(() => {
      if (hasCurrentUser) {
        dispatch<any>(signOut());
        dispatch(resetUser());
        navigate('/auth/sign-in');
      }
      dispatch<any>(getUsers());
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
  ];

  return (
    <>
      <Header />
      <div style={{ height: 'auto', width: '95%', padding: '20px' }}>
        <h1>Users List</h1>
        {error.getUsers ? (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error.getUsers === 'denied' ? 'Access denied.' : 'An error occurred.'}
          </Alert>
        ) : (
          <>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Actions
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleChangeStatus('blocked')}
                startIcon={<Block />}
                sx={{ marginRight: '5px' }}
              >
                Block
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleChangeStatus('unblocked')}
                startIcon={<LockOpen />}
                sx={{ marginRight: '5px' }}
              >
                Unblock
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                startIcon={<Delete />}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleChangeRole('ADMIN')}
                startIcon={<LockOpen />}
                sx={{ marginLeft: '5px' }}
              >
                Make Admin
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleChangeRole('USER')}
              
                sx={{ marginLeft: '5px' }}
              >
                Make User
              </Button>
            </Toolbar>

            <DataGrid
              rows={users}
              columns={columns}
              autoHeight
              pageSize={users.length}
              rowsPerPageOptions={[users.length]}
              disableSelectionOnClick
              checkboxSelection
              onSelectionModelChange={(newSelection) => {
                setSelectedIds(newSelection as string[]);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AdminPage;
