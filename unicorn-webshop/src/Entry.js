import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import {Check, Close, Delete} from '@material-ui/icons';

export class Entry extends React.Component {

    render() {
        const entry = this.props.entry;
        return (
            <ListItem onClick={this.props.select} button>
                <ListItemIcon>
                    <IconButton onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.props.update(!entry.completed);
                    }}>
                        {entry.completed
                            ? <Check style={{color: '#28a745'}}/>
                            : <Close style={{color: '#dc3545'}}/>}
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary={entry.title} secondary={entry.commentary}/>
                <ListItemSecondaryAction>
                    <IconButton onClick={this.props.delete}>
                        <Delete/>
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
    select: PropTypes.func,
};