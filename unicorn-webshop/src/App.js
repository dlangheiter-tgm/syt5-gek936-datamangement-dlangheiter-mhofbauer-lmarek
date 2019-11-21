import React from 'react';
import './App.css';
import {EntryList} from "./EntryList";

class App extends React.Component {

    constructor(props) {
        super(props);
        const list = [
            {title: "Testing", completed: true, id: 'xdhaha'},
            {title: "Hello", completed: false, id: 'hahaxd'},
            {title: "Hello2", completed: false, id: 'haxdha'},
        ];
        this.state = {list};
    }

    render() {
        return (
            <EntryList list={this.state.list} update={this.update} delete={this.delete} />
        );
    }

    update = (entry) => {
        this.setState({
            list: this.state.list.map(e => {
                if (e.id === entry.id) {
                    return entry;
                }
                return e;
            })
        });
    }

    delete = (entry) => {
        const newList = this.state.list.filter(e => {
            return e.id !== entry.id;
        });
        this.setState(({
            list: newList,
        }));
    }

    create = (entry) => {
        const newList = this.state.list.add({title: entry, completed: false, id:'sad'});
        this.setState(({
            list: newList,
        }));
    }



}

export default App;
