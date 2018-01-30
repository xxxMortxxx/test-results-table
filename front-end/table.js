import React from 'react';
import ReactDOM from 'react-dom';

import './react-table.css'
import ReactTable from 'react-table';

const rootColumnsConfig = [{
  Header: 'Test ID',
  accessor: 'testId'
}, {
  Header: 'Status',
  accessor: 'status'
}, {
  id: 'allCovered',
  Header: 'All covered',
  accessor: d => d.allCovered.toString()
}];

const subColumnsConfig = [{
  Header: 'Case ID',
  accessor: 'caseId'
}, {
  id: 'Covered',
  Header: 'covered',
  accessor: d => d.covered.toString()
}, {
  Header: 'Invokes',
  accessor: 'invokes'
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: [],
      isLoading: false
    };

    this.makeApiRequest = this.makeApiRequest.bind(this);
    this.onRequestButtonClick = this.onRequestButtonClick.bind(this);
  }

  render() {
    const { testData, isLoading } = this.state;

    return (
      <div>
        <span>API key: </span>
        <input type="text" ref={input => this.apiKeyInput = input}/>
        <input type="button" value="Make request" onClick={this.onRequestButtonClick}/>
        <ReactTable
          filterable
          showPagination={false}
          loading={ isLoading }
          data={testData}
          columns={rootColumnsConfig}
          className="-striped -highlight"
          SubComponent={this.renderSubTable}
        />
      </div>
    )
  }

  renderSubTable({ original: { caseResults }}) {
    return (
      <div style={{ padding: "20px"}}>
        <h3>Cases results</h3>
        <ReactTable
          filterable
          data={caseResults}
          columns={subColumnsConfig}
          showPagination={false}
        />
      </div>
    )
  }

  onRequestButtonClick() {
    this.makeApiRequest(this.apiKeyInput.value);
  }

  makeApiRequest(apiKey) {
    this.setState({ isLoading: true });
    fetch(`https://app.ticketmaster.com/marketplace-sandbox/v1/tests/results?apikey=${apiKey}`, { mode: 'cors' })
      .then(res => res.json())
      .then(json => this.setState({ testData: json, isLoading: false }))
      .catch(error => console.log(error))
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
