import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteErrandAction } from '../store/modules/errandSlice';
import { UserTypes } from '../types/UserTypes';

export interface StateModalProps {
  indexNote: string;
  getIsArchive: string;
  stateModalDelete: boolean;
  setStateModalDelete: (value: boolean) => void;
  setStateModal: (value: boolean) => void;
}

export default function DialogDelete(props: StateModalProps) {
  const loggedUser = useAppSelector(state => state.login) as UserTypes;
  const dispatch = useAppDispatch();

  const handleClose = () => {
    props.setStateModalDelete(false);
  };

  const saveNote = () => {
    const errandDelete = {
      userId: loggedUser.userId,
      errandId: props.indexNote.toString(),
      isArchived: props.getIsArchive
    };
    console.log(errandDelete);
    dispatch(deleteErrandAction(errandDelete));
    props.setStateModalDelete(false);
    props.setStateModal(false);
    console.log('eu certo');
  };

  return (
    <div>
      <Dialog open={props.stateModalDelete} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Do you really want to delete this note?</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={handleClose}
            sx={{ color: 'white', backgroundColor: '#ff4440' }}
          >
            Disagree
          </Button>
          <Button variant="contained" onClick={saveNote} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
