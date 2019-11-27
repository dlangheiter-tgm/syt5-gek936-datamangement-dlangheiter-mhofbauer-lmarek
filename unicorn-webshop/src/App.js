import React from 'react';
import {EntryList} from "./EntryList";
import {db, sync, createItem, deleteItem, updateEntry} from './db';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {list: []};

        this.updateFromDb();
        sync().on('change', (change) => {
            this.updateFromDb();
        }).on('error', (err) => {
            console.error(err);
        });

    }

    updateFromDb() {
        db.allDocs({include_docs: true}).then(
            (result) => {
                const setList = result.rows.map((r) => ({...r.doc}));
                console.log(setList);
                this.setState({
                    list: setList,
                });
            }
        ).catch((err) => console.log(err));
    }

    render() {
        return (
            <EntryList list={this.state.list} update={this.update} delete={this.delete} create={this.create}/>
        );
    }

    update = (entry, v) => {
        entry.completed = v;
        updateEntry(entry, v);
        this.updateFromDb();
    };

    delete = (entry) => {
        deleteItem(entry);
        this.updateFromDb();
    };

    create = (entry) => {
        createItem(entry.title, entry.commentary);
        this.updateFromDb();
    }

}

export default App;
