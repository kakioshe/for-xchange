import React, { Component } from "react";
import ExchangeItems from "./ExchangeItems";
import Select from 'react-select';

import './Exchange.css';

import { Container, Row, Col, Button } from 'react-bootstrap';

// Supported Currencies
const currencyOptions = [
  { value: 'USD', label: 'USD', text:'United States Dollar'},
  { value: 'CAD', label: 'CAD', text:'Canadian Dollar'},
  { value: 'IDR', label: 'IDR', text:'Indonesian Rupiah'},
  { value: 'GBP', label: 'GBP', text:'Pound Sterling'},
  { value: 'CHF', label: 'CHF', text:'Swiss Franc'},
  { value: 'SGD', label: 'SGD', text:'Singapore Dollar'},
  { value: 'INR', label: 'INR', text:'Indian Rupee'},
  { value: 'MYR', label: 'MYR', text:'Malaysian Ringgit'},
  { value: 'JPY', label: 'JPY', text:'Japanese Yen'},
  { value: 'KRW', label: 'KRW', text:'South Korean Won'},
]

class Exchange extends Component {
  // Base Constructor for the application
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.updateBaseCurrency = this.updateBaseCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddNewCur = this.handleAddNewCur.bind(this);

    this.state = {
      items: [],
      data: [],
      baseCur: {
        value: "USD",
        label: "USD",
        text: "United States Dollar"
      },
      value: 10.0000,
      selectedCur: null,
      isSelectCur: false,
    };
  }

  //Function to add a new currency
  addItem(e){
    if (this.state.selectedCur !== "") {
      var newItem = {
        key: this.state.selectedCur.value,
        text: this.state.selectedCur.text
      };
      if(this.state.items.filter(item => item.key === newItem.key).length === 0){
        this.setState((prevState) => {
          return {
            items: prevState.items.concat(newItem)
          };
        });
      }
      this.setState({ selectedCur: null });
    }
    this.setState({ isSelectCur: false });
    e.preventDefault();
  }

  //Function to fetch API data
  fetchAPI(baseCur = this.state.baseCur.value ){
    const apiData = fetch(`https://api.exchangeratesapi.io/latest?base=${baseCur}`)

    apiData.then(res => {
      if( res.status === 200 )
        return res.json()
    }).then( resJson => {
      this.setState({
        data: resJson,
        rates: resJson.rates
      })
    })
  }

  //Function to update the Base Currency
  updateBaseCurrency = baseCur => {
    this.setState({ baseCur })
    this.fetchAPI(baseCur.value);
  }

  //Function to add a new target currency
  addCur = selectedCur => {
    this.setState({ selectedCur })
  }

  //Function to remove target currency
  deleteCurrency = currencyKey => {
    const items = this.state.items.filter(item => item.key !== currencyKey);
    this.setState({ items: items});
  }

  //Function to handle value change
  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  //Function to handle adding new target currency event
  handleAddNewCur() {
    if (this.state.isSelectCur === false){
      this.setState({ isSelectCur: true });
    } else {
      this.setState({ isSelectCur: false });
    }
  }

  //Fetch API upon mount
  componentDidMount(){
    this.fetchAPI();
  }

  render() {
    const isSelectCur = this.state.isSelectCur;
    let selectNewCur;

    if (isSelectCur) {
      selectNewCur = (
        <Row
        className="new-currency-form">
          <Col xs={12} md={8} className="form-item">
            <Select value = {this.state.selectedCur}
                    placeholder="Currency Name"
                    onChange={this.addCur}
                    options={currencyOptions}/>
          </Col>
          <Col xs={6} md={2} className="form-item">
            <Button variant="primary" type="submit" block>Add</Button>
          </Col>
          <Col xs={6} md={2} className="form-item">
            <Button variant="light" onClick={this.handleAddNewCur} block>Cancel</Button>
          </Col>
        </Row>
      );
    } else {
      selectNewCur = (
        <Row
        className="new-currency-form">
          <Col>
            <Button variant="light" onClick={this.handleAddNewCur} block>Add More Currencies</Button>
          </Col>
        </Row>
      )
    }

    return (
        <Row>
          <div className="exchange-main">
            <div className="header">
              <h1>Foreign Exchange Rate</h1>
              <p className="header-title">{this.state.baseCur.value} - {this.state.baseCur.text}</p>
              <Row>
                <Col sm={8} xs={12} className="form-item">
                  <Select
                    value={this.state.baseCur}
                    onChange={this.updateBaseCurrency}
                    options={currencyOptions}/>
                </Col>
                <Col sm={4} xs={12} className="form-item">
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange} />
                </Col>
              </Row>
            </div>
            <Container className="main-body">
              <form onSubmit={this.addItem}>
                <ExchangeItems
                  entries={this.state.items}
                  rates={this.state.rates}
                  value={this.state.value}
                  currentCur={this.state.baseCur.value}
                  onDelete={this.deleteCurrency}/>
                { selectNewCur }
              </form>
            </Container>
          </div>
        </Row>
    )
  }
}

export default Exchange;
