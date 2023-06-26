import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { TextField, Typography } from '@mui/material';
import { useState } from 'react';

import DialogConfirm from './DialogConfirm';
import DialogDelete from './DialogDelete';
import { updateErrandAction } from '../store/modules/errandSlice';
import { UserTypes } from '../types/UserTypes';
import { UpdateErrandtypes } from '../types/ErrandsTypes';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export interface DialogTitleProps {
  id: string;

  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export interface CustomizedDialogsProps {
  getIsArchive: string;
  noteIndex: string;
  noteId: string;
  stateModal: boolean;
  setStateModal: (value: boolean) => void;
}

export default function CustomizedDialogs(props: CustomizedDialogsProps) {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(state => state.login) as UserTypes;

  const { noteIndex } = props;
  const selectedNote = useAppSelector(state => state.errand);
  const noteIdNumber = parseInt(noteIndex);
  const note = noteIdNumber > -1 ? selectedNote[noteIdNumber] : null;

  const [edit, setEdit] = useState<boolean>(true);
  const [editDescription, setEditDescription] = useState<string | undefined>(note?.description);
  const [editDetails, setEditDetails] = useState<string | undefined>(note?.details);
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [switchMode, setSwitchMode] = useState<string>('false');

  if (!note) {
    return null;
  }

  const handleEdit = () => {
    setEdit(!edit);
  };

  const deleteNote = () => {
    setOpenModalDelete(!openModalDelete);
  };

  const handleClose = () => {
    props.setStateModal(false);
  };

  let changeName = 'archive';
  if (props.getIsArchive === 'true') {
    changeName = 'unarchive';
  } else if (props.getIsArchive === 'false') {
    changeName = 'archive';
  }

  const dialogConfirm = () => {
    if (note.description === editDescription && note.details === editDetails && note.isArchived === switchMode) {
      props.setStateModal(false);
    } else {
      setOpenModalConfirm(!openModalConfirm);
    }
  };

  const changeArchiveMode = () => {
    if (props.getIsArchive === 'true') {
      setSwitchMode('false');
    } else if (props.getIsArchive === 'false') {
      setSwitchMode('true');
    }
  };

  const editSaveNote = () => {
    setEdit(!edit);

    const editedNote: UpdateErrandtypes = {
      userId: loggedUser.userId,
      errandId: props.noteId,
      description: editDescription,
      details: editDetails,
      isArchived: props.getIsArchive,
      archive: switchMode
    };
    dispatch(updateErrandAction(editedNote));

    props.setStateModal(false);
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.stateModal}>
        {openModalConfirm && (
          <DialogConfirm
            stateModalConfirm={openModalConfirm}
            setStateModalConfirm={setOpenModalConfirm}
            indexNote={props.noteId}
            editConfirm={editSaveNote}
          />
        )}
        {openModalDelete && (
          <DialogDelete
            indexNote={props.noteId}
            stateModalDelete={openModalDelete}
            setStateModalDelete={setOpenModalDelete}
            setStateModal={handleClose}
            getIsArchive={props.getIsArchive}
          />
        )}

        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {edit && <Typography>{editDescription}</Typography>}
          {!edit && (
            <TextField
              onChange={e => setEditDescription(e.target.value)}
              fullWidth
              id="standard-basic"
              variant="standard"
              value={editDescription}
            />
          )}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ minWidth: '30vw' }}>
          {edit && <Typography>{editDetails}</Typography>}
          {!edit && (
            <TextField
              onChange={e => setEditDetails(e.target.value)}
              fullWidth
              id="outlined-multiline-static"
              multiline
              rows={4}
              value={editDetails}
              disabled={edit}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={changeArchiveMode} sx={{ color: '#ff4440' }}>
            {changeName}
          </Button>
          <Button autoFocus onClick={deleteNote} sx={{ color: '#ff4440' }}>
            Delete
          </Button>
          <Button autoFocus onClick={handleEdit} sx={{ color: '#32CD99' }}>
            Edit
          </Button>
          <Button autoFocus onClick={dialogConfirm}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
