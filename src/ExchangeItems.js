import React, { Component } from "react";
import { Grid, Container, Row, Col, Button } from 'react-bootstrap';

class ExchangeItems extends Component {

  render(){
    var currencyEntries = this.props.entries;
    var currencyRates = this.props.rates;
    var value = this.props.value;
    var currentCur = this.props.currentCur;

    var listItems = currencyEntries.map((item, i) =>{
      const convertedAmount = (value * currencyRates[item.key]).toFixed(2);
      console.log(value);
      return (
        <Row key={i}>
          <Col>
            <div>
              <Row>
                <Col>{item.key}</Col>
                <Col>{convertedAmount}</Col>
              </Row>
              <Row>
                <Col><p>{item.key} - {item.text}</p></Col>
              </Row>
              <Row>
                <Col><p>1 {currentCur} = {item.key} {currencyRates[item.key].toFixed(4)} </p></Col>
              </Row>
            </div>
          </Col>
          <Col>
            <Button onClick={() => this.props.onDelete(item.key)} variant="danger">Delete</Button>
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
