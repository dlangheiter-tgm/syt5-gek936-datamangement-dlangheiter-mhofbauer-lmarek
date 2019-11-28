import React from 'react';
import PropTypes from 'prop-types';
import {EntryList} from "./EntryList";
import {db, sync, createItem, deleteItem, updateEntry} from './db';
import {CreateEntry} from "./CreateEntry";
import {EditEntry} from "./EditEntry";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        alignItems: 'start',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
        }
    },
});

class app extends React.Component {

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
                this.setState({
                    list: setList,
                });
            }
        ).catch((err) => console.log(err));
    }

    render() {
        return (
            <div className={this.props.classes.root}>
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
    };

    closeEdit = () => {
        this.setState({
            curEdit: null,
        });
    }
}

app.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(app);
