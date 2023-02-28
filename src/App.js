import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import CovidLogo from './covid19.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://covid-19.dataflowkit.com/v1')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);
  return (
    <div>
      <Container>
      <Navbar bg='#f0f0f0' expand="lg">
      <Container>
        <a href='#home'><img src={CovidLogo} id="covidlogo"></img></a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" class="homebtn">Home</Nav.Link>
            <Nav.Link href="https://covid-19.dataflowkit.com/v1" class="apibtn">API</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
        <Form>
          <InputGroup className='my-3'>

            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search for Country'
            />
          </InputGroup>
        </Form>
        <table className="table">
          <thead>
            <tr>
              <th>Country Name</th>
              <th>New Cases</th>
              <th>New Deaths</th>
              <th>Total Cases</th>
              <th>Total Deaths</th>
              <th>Total Recovered</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort( (a,b) => a.Country_text > b.Country_text ? 1 : -1 )
              .filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.Country_text && item.Country_text.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.Country_text}</td>
                  <td>{item['New Cases_text']}</td>
                  <td>{item['New Deaths_text']}</td>
                  <td>{item['Total Cases_text']}</td>
                  <td>{item['Total Deaths_text']}</td>
                  <td>{item['Total Recovered_text']}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default App;
