import React from 'react';
import {EntryList} from "./EntryList";
import {db, sync, createItem, deleteItem, updateEntry} from './db';
import {CreateEntry} from "./CreateEntry";
import {EditEntry} from "./EditEntry";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            curEdit: null,
        };

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
            <div style={{display: 'grid', gridTemplateColumns: '1fr 400px', alignItems: 'start'}}>
                <EntryList
                    list={this.state.list}
                    update={this.updateCompleted}
                    delete={this.delete}
                    select={this.select}
                />
                <div>
                    {this.state.curEdit &&
                    <EditEntry
                        entry={this.state.curEdit}
                        update={this.updateGeneral}
                        close={this.closeEdit}
                    />
                    }
                    <CreateEntry create={this.create}/>
                </div>
            </div>
        );
    }

    updateCompleted = (entry, v) => {
        entry.completed = v;
        this.updateGeneral(entry);
    };

    updateGeneral = (entry) => {
        updateEntry(entry);
        this.updateFromDb();
    };

    delete = (entry) => {
        deleteItem(entry);
        this.updateFromDb();
    };

    create = (entry) => {
        createItem(entry.title, entry.commentary);
        this.updateFromDb();
    };

    select = (entry) => {
        this.setState({
            curEdit: null,
        }, () => this.setState({
            curEdit: entry,
        }));
    }

    closeEdit = () => {
        this.setState({
            curEdit: null,
        });
    }

}

export default App;
