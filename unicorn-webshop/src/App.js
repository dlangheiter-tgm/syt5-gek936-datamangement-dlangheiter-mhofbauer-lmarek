import React from 'react';
import PropTypes from 'prop-types';
import {EntryList} from "./EntryList";
import {db, sync, createItem, deleteItem, updateEntry} from './db';
import {CreateEntry} from "./CreateEntry";
import {EditEntry} from "./EditEntry";
import {withStyles, AppBar, Toolbar, Typography, Link, Avatar} from "@material-ui/core";

const styles = theme => ({
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        alignItems: 'start',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        }
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        marginRight: 8,
    },
    link: {
         fontSize: '0.5rem'
    }
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

    render() {
        const classes = this.props.classes;

        return (
            <div>
                <AppBar position={"static"}>
                    <Toolbar>
                        <Avatar variant="square" src={"/logo192.png"} className={classes.icon} />
                        <Typography className={classes.title}>Unicorn Webshop</Typography>
                        <Typography variant={"caption"} className={classes.link}>
                            Icons made by <Link
                                color="secondary"
                                href="https://www.flaticon.com/authors/freepik"
                                title="Freepik"
                            > Freepik </Link>
                            from <Link color={"secondary"}
                                  href="https://www.flaticon.com/"
                                  title="Flaticon">www.flaticon.com</Link
                            >

                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
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
            </div>
        );
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
