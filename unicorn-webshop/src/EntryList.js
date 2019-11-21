import React from 'react';
import {List} from "@material-ui/core";
import {Entry} from "./Entry";

export class EntryList extends React.Component {

    render() {
        return (
            <List>
                {this.props.list.map(e => <Entry
                    key={e._id}
                    entry={e}
                    update={(v) => this.props.update(e, v)}
                    delete={this.props.delete}
                />)}
            </List>
        );
    }

}