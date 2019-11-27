import React from 'react';
import {ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

export class Entry extends React.Component {

    render() {
        const entry = this.props.entry;
        return (
            <ListItem>
                <ListItemIcon>
                    <IconButton onClick={() => {
                        this.props.update(!entry.completed);
                    }}>
                        {entry.completed ? <CheckIcon/> : <CloseIcon/>}
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary={entry.title}/>
                <ListItemSecondaryAction>
                    <IconButton onClick={() => this.props.delete(entry)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

Entry.propTypes = {
    entry: () => null,
};