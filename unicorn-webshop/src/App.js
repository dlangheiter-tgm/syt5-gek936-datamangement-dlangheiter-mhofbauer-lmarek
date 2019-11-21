import React from 'react';
import './App.css';
import {EntryList} from "./EntryList";
import {db, sync, checkboxChanged} from './db';

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
            <EntryList list={this.state.list} update={this.update} delete={this.delete} />
        );
    }

    update = (entry, v) => {
        checkboxChanged(entry, v);
        this.updateFromDb();
    }

    delete = (entry) => {
        console.log("DELETE", entry);
        const newList = this.list.filter(e => {
            return e.id !== entry.id;
        });
        console.log(newList);
        this.setState(({
            list: newList,
        }));
    }

}

export default App;
