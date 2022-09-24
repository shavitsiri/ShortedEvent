import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function AlignItemsList(props) {
  return (
    <List sx={{ width: '100%', width: 250, bgcolor: '#262626',borderRadius:'20px',color:'white' }}>
      <ListItem alignItems="flex-start" style={{cursor:'pointer'}} onClick={() => props.openChat(props.email, props.name)} >
        <ListItemAvatar>
          <Avatar alt={props.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          sx={{textAlign:'center'}}
          primary={props.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {props.title}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

    </List>
  );
}
