import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Grid, ListItemAvatar } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import React, { useState } from 'react';

import CustomizedDialogs from './Details';

export interface SearchReceived {
  GetSearch: string;
  getIsArchived: string;
}

const ListErrands: React.FC<SearchReceived> = ({ GetSearch, getIsArchived }) => {
  const selectedNote = useAppSelector(state => state.errand);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleOpenDialog = (id: string) => {
    setSelectedItemId(id);
    setOpenDialog(!openDialog);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {openDialog && selectedItemId !== null && (
        <CustomizedDialogs
          noteIndex={selectedItemId}
          noteId={selectedNote[parseInt(selectedItemId)].errandId}
          setStateModal={setOpenDialog}
          stateModal={openDialog}
          getIsArchive={getIsArchived}
        />
      )}

      <Grid container spacing={2}>
        {selectedNote
          .filter(item => item.description.includes(GetSearch))
          .map((value, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
              <ListItem onClick={() => handleOpenDialog(index.toString())} disablePadding>
                <ListItemButton sx={{ height: '80px', backgroundColor: 'rgba(153, 204, 50, 0.5)' }}>
                  <ListItemAvatar sx={{ minWidth: '48px' }}>
                    <Avatar>{1 + index}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ '& > span': { fontSize: '1.5rem !important', fontWeight: '600 !important' } }}
                    id={value.errandId}
                    primary={`: ${value.description.slice(0, 15)}`}
                  />
                </ListItemButton>
              </ListItem>
            </Grid>
          ))}
      </Grid>
    </List>
  );
};

export default ListErrands;
