import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardActions, CardContent, CardHeader, TextField, IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";

export class EditEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            updateTitle: props.entry.title,
            updateCommentary: props.entry.commentary,
        };
    }

    render() {
        return (
            <Card style={{margin: 24}} raised>
                <form noValidate autoComplete={'off'} onSubmit={this.updateItem}>
                    <CardHeader
                        title={"Edit entry"}
                        action={
                            <IconButton onClick={this.props.close}>
                                <Close/>
                            </IconButton>
                        }
                    />
                    <CardContent>

                        <TextField
                            label={"Item *"}
                            fullWidth
                            value={this.state.updateTitle}
                            onChange={this.setTitle}
                        />
                        <TextField
                            margin={"normal"}
                            label={"Commentary"}
                            fullWidth
                            value={this.state.updateCommentary}
                            onChange={this.setCommentary}
                        />

                    </CardContent>
                    <CardActions>
                        <Button color={"primary"} type={'submit'}>
                            Save
                        </Button>
                    </CardActions>
                </form>
            </Card>
        );
    }

    setTitle = (e) => {
        this.setState({updateTitle: e.target.value});
    };

    setCommentary = (e) => {
        this.setState({updateCommentary: e.target.value});
    };

    updateItem = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.state.updateTitle) {
            return;
        }
        this.props.update({
            ...this.props.entry,
            title: this.state.updateTitle,
            commentary: this.state.updateCommentary
        });
        this.props.close();
    };
}

EditEntry.propTypes = {
    entry: PropTypes.object,
    update: PropTypes.func,
    close: PropTypes.func,
};