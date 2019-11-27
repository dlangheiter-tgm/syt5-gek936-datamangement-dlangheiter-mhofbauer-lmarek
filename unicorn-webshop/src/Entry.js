import React from 'react';
import PropTypes from 'prop-types';
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
                    <IconButton onClick={this.props.delete}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

Entry.propTypes = {
    entry: PropTypes.object,
    update: PropTypes.func,
    delete: PropTypes.func,
};