import React from 'react';
import {List} from "@material-ui/core";
import {Entry} from "./Entry";

export class EntryList extends React.Component {

    render() {
        return (
            <List>
                {this.props.list.map(e => <Entry
                    key={e.id}
                    entry={e}
                    update={this.props.update}
                    delete={this.props.delete}
                />)}
            </List>
        );
    }

}