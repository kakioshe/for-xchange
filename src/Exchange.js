import React, { Component } from "react";
import ExchangeItems from "./ExchangeItems";
import Select from 'react-select';

const currencyOptions = [
  { value: 'USD', label: 'USD'},
  { value: 'CAD', label: 'CAD'},
  { value: 'IDR', label: 'IDR'},
  { value: 'GBP', label: 'GBP'},
  { value: 'CHF', label: 'CHF'},
  { value: 'SGD', label: 'SGD'},
  { value: 'INR', label: 'INR'},
  { value: 'MYR', label: 'MYR'},
  { value: 'JPY', label: 'JPY'},
  { value: 'KRW', label: 'KRW'},
]
class Exchange extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.updateBaseCurrency = this.updateBaseCurrency.bind(this);

    this.state = {
      items: [],
      data: [],
      baseCur: {
        value: "USD",
        label: "USD"
      },
      selectedCur: null,
    };
  }
  addItem(e){
    if (this.state.selectedCur !== "") {
      var newItem = {
        text: this.state.selectedCur.value,
        key: Date.now()
      };

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
      this.state.selectedCur = null;
    }
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
    console.log(this.state.data)

  }

  updateBaseCurrency = baseCur => {
    this.setState({ baseCur })
    this.fetchAPI(baseCur.value);
  }

  handleChange = selectedCur => {
    this.setState({ selectedCur })
    console.log(selectedCur);
  }
  componentDidMount(){
    this.fetchAPI();
  }
  render() {
    return (
      <div className="exchangeMain">
        <div className="header">
          <Select
            value={this.state.baseCur}
            onChange={this.updateBaseCurrency}
            options={currencyOptions}/>
        </div>
        <br />
        <div className="body">
          <form onSubmit={this.addItem}>
            <ExchangeItems entries={this.state.items} rates={this.state.rates}/>
            <Select value = {this.state.selectedCur}
                    placeholder="Item Name"
                    onChange={this.handleChange}
                    options={currencyOptions}/>
            <button type="submit">Add</button>
          </form>
        </div>
        <p>{this.state.data.base}</p>
        <p>{this.state.baseCur.value}</p>
      </div>
    )
  }
}

export default Exchange;
