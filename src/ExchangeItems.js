import React, { Component } from "react";
import { Grid, Container, Row, Col, Button } from 'react-bootstrap';

import './ExchangeItems.css';

class ExchangeItems extends Component {

  render(){
    var currencyEntries = this.props.entries;
    var currencyRates = this.props.rates;
    var value = this.props.value;
    var currentCur = this.props.currentCur;

    var listItems = currencyEntries.map((item, i) =>{
      const convertedAmount = (value * currencyRates[item.key]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      console.log(value);
      return (
        <Row key={i} className="currencyList">
          <Col sm={10}>
            <div>
              <Row>
                <Col><p>{item.key}</p></Col>
                <Col><p>{convertedAmount}</p></Col>
              </Row>
              <Row>
                <Col><p>{item.key} - {item.text}</p></Col>
              </Row>
              <Row>
                <Col><p>1 {currentCur} = {item.key} {currencyRates[item.key].toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </p></Col>
              </Row>
            </div>
          </Col>
          <Col sm={2}>
            <Button onClick={() => this.props.onDelete(item.key)} variant="danger">X</Button>
          </Col>
        </Row>
      )
    });
    console.log(listItems);

    return (
      <Container>
        {listItems}
      </Container>
    )
  }
}

export default ExchangeItems;
