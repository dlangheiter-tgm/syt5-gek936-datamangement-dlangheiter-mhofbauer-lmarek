import React from 'react';
import PropTypes from 'prop-types';
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
                    delete={() => this.props.delete(e)}
                    select={() => this.props.select(e)}
                />)}
            </List>
        );
    }
}

EntryList.propTypes = {
    list: PropTypes.array,
    update: PropTypes.func,
    delete: PropTypes.func,
    select: PropTypes.func,
};