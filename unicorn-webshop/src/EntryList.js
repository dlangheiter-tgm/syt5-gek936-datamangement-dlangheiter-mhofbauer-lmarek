import React from 'react';
import {IconButton, List, ListItem, ListItemSecondaryAction, TextField} from "@material-ui/core";
import {Entry} from "./Entry";
import AddIcon from "@material-ui/icons/Add";

export class EntryList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {addTitle: ''};

        this.setTitle = this.setTitle.bind(this);
    }

    render() {
        return (
            <div>
            <List>
                {this.props.list.map(e => <Entry
                    key={e.id}
                    entry={e}
                    update={(v) => this.props.update(e, v)}
                    delete={this.props.delete}
                />)}
            </List>
            <br/>
            <TextField value={this.state.addTitle} onChange={this.setTitle}/>
            <IconButton onClick={() => this.props.create({title: this.state.addTitle})}>
                <AddIcon/>
            </IconButton>
            </div>
        );
    }

    setTitle (e) {
        console.log("SET", e.target.value);
        this.setState({addTitle: e.target.value});
    }

}