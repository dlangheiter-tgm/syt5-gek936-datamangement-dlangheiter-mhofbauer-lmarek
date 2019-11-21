import React from 'react';
import './App.css';
import {List} from "@material-ui/core";
import {Entry} from "./Entry";
import {EntryList} from "./EntryList";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.list = [
            {title: "Testing", completed: true, id: 'xdhaha'},
            {title: "Hello", completed: false, id: 'hahaxd'},
            {title: "Hello2", completed: false, id: 'haxdha'},
        ];
    }

    render() {
        console.log("RENDER", this.list);
        return (
            <EntryList list={this.list} update={this.update} delete={this.delete} />
        );
    }

    update = (entry) => {
        this.setState({
            list: this.list.map(e => {
                if (e.id === entry.id) {
                    return entry;
                }
                return e;
            })
        });
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
