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
      return (
        <Row key={i} className="currency-list">
          <Col xs={12} sm={10}>
              <Row>
                <Col xs={2}><p className="item-title">{item.key}</p></Col>
                <Col xs={10}><p className="converted-amount item-title">{convertedAmount}</p></Col>
              </Row>
              <Row>
                <Col><p className="item-description">{item.key} - {item.text}</p></Col>
              </Row>
              <Row>
                <Col><p className="item-currency">1 {currentCur} = {item.key} {currencyRates[item.key].toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </p></Col>
              </Row>
          </Col>
          <Col xs={12} sm={2}>
            <Button onClick={() => this.props.onDelete(item.key)} variant="danger" block>X</Button>
          </Col>
        </Row>
      )
    });

    return (
      <Container>
        {listItems}
      </Container>
    )
  }
}

export default ExchangeItems;
