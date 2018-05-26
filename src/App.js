import React, { Component } from 'react';
import './App.css';

const API = 'https://digikent.basaksehir.bel.tr:8091/VadiRestMobile/login/belediyeler/';
const QUERY = '34';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            items2: []
        };
    }
    componentDidMount() {
        fetch(API+QUERY,{
            method: "GET",
            headers : {
                "Content-type": "application/json"
            }
        }).then(res => res.json()
                ).then((ilResult) => {
                    this.setState({
                        isLoaded: true,
                        items: ilResult
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }



    render() {
        const { error, isLoaded, items  } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.id} {item.tanim}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default App;
