import React, { Component } from "react";
import ExchangeItems from "./ExchangeItems";
import Select from 'react-select';

import './Exchange.css';

import { Grid, Container, Row, Col, Button } from 'react-bootstrap';

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
      value: 10.00,
      selectedCur: null,
      isSelectCur: false,
    };
  }
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
      this.state.selectedCur = null;
    }
    this.setState({ isSelectCur: false });
    e.preventDefault();
  }

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

  updateBaseCurrency = baseCur => {
    this.setState({ baseCur })
    this.fetchAPI(baseCur.value);
  }

  addCur = selectedCur => {
    this.setState({ selectedCur })
  }

  deleteCurrency = currencyKey => {
    const items = this.state.items.filter(item => item.key !== currencyKey);
    this.setState({ items: items});
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleAddNewCur() {
    if (this.state.isSelectCur === false){
      this.setState({ isSelectCur: true });
    } else {
      this.setState({ isSelectCur: false });
    }
  }

  componentDidMount(){
    this.fetchAPI();
  }
  render() {
    const isSelectCur = this.state.isSelectCur;
    let selectNewCur;

    if (isSelectCur) {
      selectNewCur = (
        <Row
        className="newCurForm">
          <Col xs={12} lg={8} className="formItem">
            <Select value = {this.state.selectedCur}
                    placeholder="Currency Name"
                    onChange={this.addCur}
                    options={currencyOptions}/>
          </Col>
          <Col xs={6} lg={2} className="formItem">
            <Button variant="primary" type="submit" block>Add</Button>
          </Col>
          <Col xs={6} lg={2} className="formItem">
            <Button variant="light" onClick={this.handleAddNewCur} block>Cancel</Button>
          </Col>
        </Row>
      );
    } else {
      selectNewCur = (
        <Row
        className="newCurForm">
          <Col>
            <Button variant="light" onClick={this.handleAddNewCur} block>Add New Currency</Button>
          </Col>
        </Row>
      )
    }

    return (
      <Container>
        <Row>
          <div className="exchangeMain">
            <div className="header">
              <p className="headerTitle">{this.state.baseCur.value} - {this.state.baseCur.text}</p>
              <Row>
                <Col sm={8} xs={12} className="formItem">
                  <Select
                    value={this.state.baseCur}
                    onChange={this.updateBaseCurrency}
                    options={currencyOptions}/>
                </Col>
                <Col sm={4} xs={12} className="formItem">
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange} />
                </Col>
              </Row>
            </div>
            <div className="body">
              <form onSubmit={this.addItem}>
                <ExchangeItems
                  entries={this.state.items}
                  rates={this.state.rates}
                  value={this.state.value}
                  currentCur={this.state.baseCur.value}
                  onDelete={this.deleteCurrency}/>
                { selectNewCur }
              </form>
            </div>
          </div>
        </Row>
    </Container>
    )
  }
}

export default Exchange;
