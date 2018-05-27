/* odev
 * Fatih Yavuz 28.05.2018 02:10
 */
import React, { Component } from 'react';
import './App.css';
import Select from 'react-select';

import { Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

const API = 'https://digikent.basaksehir.bel.tr:8091/VadiRestMobile/login/belediyeler/';
const API2 = 'https://digikent.basaksehir.bel.tr:8091/VadiRestMobile/login/mahalle';
let QUERY = '34';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items : [],
            items2: [],
        };
    }

    getAPI=(QUERY) =>{
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
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentDidMount() {
        this.getAPI(QUERY)
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.value}`);
        this.state.selectedOptionIlce = '';


        let mahalleDTO = {
            userId : 1,
            belediyeId : selectedOption.value
        }
        fetch(API2,{
            method: "POST",
            headers : {
                "Content-type": "application/json"
            },
            body : JSON.stringify(mahalleDTO)
        }).then(res => res.json()
        ).then( (ilceResult) => {
            this.setState({
                isLoaded :true,
                items2 : ilceResult
            })
        })
    }
    handleChange2 = (selectedOptionIlce) => {
        this.setState({selectedOptionIlce})
    }

    handleClick = () => {
        console.log(this.state.input);
        QUERY = this.state.input;
        this.getAPI(QUERY);
        this.state.selectedOption = '';
        this.state.selectedOptionIlce = '';
    }

    handleChangeInput = (e) => {
        this.setState({ input: e.target.value });
    }

    render() {
        const { error, isLoaded, items ,selectedOption ,items2 ,selectedOptionIlce} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <div className="Select">
                    <div>
                        <input   type="number"  onChange = {this.handleChangeInput}/>
                        <Button  color ="success" onClick={this.handleClick}>İl Seç</Button>
                    </div>
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={
                            items.map(item => (
                                { value: item.id, label: item.tanim }
                            ))}
                    />
                    <Select id = "selectIlce"
                        selectedValue={this.state.value}
                        value={selectedOptionIlce}
                        onChange={this.handleChange2}
                        options={
                            items2.map(item => (
                                {value: item.id, label: item.tanim}
                            ))}
                    />
                </div>
            );

        }

    }
}

export default App;
