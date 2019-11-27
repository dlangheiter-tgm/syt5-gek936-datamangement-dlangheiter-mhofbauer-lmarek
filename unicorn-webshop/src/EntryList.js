import React from 'react';
import {IconButton, List, TextField} from "@material-ui/core";
import {Entry} from "./Entry";
import AddIcon from "@material-ui/icons/Add";

export class EntryList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {addTitle: ''};
    }

    render() {
        return (
            <div>
                <List>
                    {this.props.list.map(e => <Entry
                        key={e._id}
                        entry={e}
                        update={(v) => this.props.update(e, v)}
                        delete={this.props.delete}
                    />)}
                </List>
                <br/>
                <TextField value={this.state.addTitle} onChange={this.setTitle}/>
                <IconButton
                    onClick={this.createItem}>
                    <AddIcon/>
                </IconButton>
            </div>
        );
    }

    setTitle = (e) => {
        this.setState({addTitle: e.target.value});
    };

    createItem = () => {
        this.props.create({title: this.state.addTitle, commentary: this.state.addTitle});
        this.setState({
            addTitle: "",
        });
    };

}