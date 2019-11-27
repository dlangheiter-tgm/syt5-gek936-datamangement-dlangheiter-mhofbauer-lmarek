import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@material-ui/core";

export class CreateEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            createTitle: '',
            createCommentary: '',
        };
    }

    render() {
        return (
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

CreateEntry.propTypes = {
    create: PropTypes.func,
};