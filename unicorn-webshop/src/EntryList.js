import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardContent, CardHeader, List, TextField, Button} from "@material-ui/core";
import {Entry} from "./Entry";

export class EntryList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            createTitle: '',
            createCommentary: '',
        };
    }

    render() {
        return (
            <div>
                <List>
                    {this.props.list.map(e => <Entry
                        key={e._id}
                        entry={e}
                        update={(v) => this.props.update(e, v)}
                        delete={() => this.props.delete(e)}
                    />)}
                </List>
                <br/>
                <Card style={{margin: 24}} raised>
                    <form noValidate autoComplete={'off'} onSubmit={this.createItem}>
                        <CardHeader
                            title={"New entry"}
                        />
                        <CardContent>

                            <TextField
                                label={"Item *"}
                                fullWidth
                                value={this.state.createTitle}
                                onChange={this.setTitle}
                            />
                            <TextField
                                margin={"normal"}
                                label={"Commentary"}
                                fullWidth
                                value={this.state.createCommentary}
                                onChange={this.setCommentary}
                            />

                        </CardContent>
                        <CardActions>
                            <Button color={"primary"} type={'submit'}>
                                Create
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </div>
        );
    }

    setTitle = (e) => {
        this.setState({createTitle: e.target.value});
    };

    setCommentary = (e) => {
        this.setState({createCommentary: e.target.value});
    };

    createItem = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.state.createTitle) {
            return;
        }
        this.props.create({title: this.state.createTitle, commentary: this.state.createCommentary});
        this.setState({
            createTitle: '',
            createCommentary: '',
        });
    };
}

EntryList.propTypes = {
    list: PropTypes.array,
    update: PropTypes.func,
    delete: PropTypes.func,
    create: PropTypes.func,
};