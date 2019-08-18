import React, { Component } from "react";

class ExchangeItems extends Component {
  
  render(){
    var currencyEntries = this.props.entries;
    var currencyRates = this.props.rates;

    var listItems = currencyEntries.map((item, i) =>{
      const tempRate = `this.props.rates.${item.text}`;
      return <li key={i}> {item.text} { currencyRates[item.text] }</li>
    });

    return (
      <ul className="listItem">
        {listItems}
      </ul>
    )
  }
}

export default ExchangeItems;
