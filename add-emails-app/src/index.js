import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Button from "react-bootstrap/Button";

const sendToRestSvc = async emailArray => {
  
  console.log(emailArray);
  let emailAddresses = [];
  for (const object of emailArray) {
    emailAddresses.push(object.text);
  }
  const res = await fetch({ url: 'localhost:8080/takeEmails', method: "POST", body: emailAddresses });
  const data = await res.json();
  return data;
}

class EmailApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Request creation of JIRA users for the following users' email addresses</h3>
        <EmailList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-email">
            Enter email addresses one by one
          </label>
          <input
            id="new-email"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <Button variant="primary" type="button" onClick={() => sendToRestSvc(this.state.items)}>
          Submit
        </Button>
      </div>
    );
  }
  

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class EmailList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(
  <EmailApp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
