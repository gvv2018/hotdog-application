import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
	hotdogs: [],
	hotdog: {
	    name1: 'Current name',
	    name: 'Simple hotdog',
	    price: 20
	}
    }

    componentDidMount() {
	this.getHotdogs();
    }

    getHotdogs = _ => {
	fetch(`http://54.93.118.176:4000/hotdog`)
	    .then(response => response.json())
	    .then(response => this.setState({ hotdogs: response.data}))
	    .catch(err => console.error(err))
    }

    addHotdog = _ => {
	const { hotdog } = this.state;
	fetch(`http://54.93.118.176:4000/add_hotdog?name=${hotdog.name}&price=${hotdog.price}`)
	    .then(this.getHotdogs)
	    .catch(err => console.error(err))
    }

    delHotdog = _ => {
	const { hotdog } = this.state;
	fetch(`http://54.93.118.176:4000/del_hotdog?name=${hotdog.name}`)
	    .then(this.getHotdogs)
	    .catch(err => console.error(err))
    }


    updHotdog = _ => {
	const { hotdog } = this.state;
	fetch(`http://54.93.118.176:4000/upd_hotdog?name1=${hotdog.name1}&name=${hotdog.name}&price=${hotdog.price}`)
	    .then(this.getHotdogs)
	    .catch(err => console.error(err))
    }


    renderHotdog = ({ id, name, price}) => 
	<div> 
	    <ul><li key={id}>{name} - {price}$</li></ul>
	</div>
    renderHotdogSelect = ({ id, name}) => <div key={id}>{name}</div>

    render() {
	const { hotdogs, hotdog } = this.state;
	return (
	    <div className="App">
		<h3>Hotdogs list (API #1)</h3>
		{hotdogs.map(this.renderHotdog)}
		<div>
		    <h3>Add new hotdog(API #2)</h3>
		    <input 
			value={hotdog.name} 
			onChange={e => this.setState({hotdog: { ...hotdog, name: e.target.value}})} />
		    <input 
			value={hotdog.price} 
			onChange={e => this.setState({hotdog: { ...hotdog, price: e.target.value}})} />
		    <button onClick={this.addHotdog}>Add HotDog</button>
		</div>
		<div>
		    <h3>Delete hotdog (API №3) </h3>
		    <p>Enter the name:</p>
		    <input
			value={hotdog.name}
			onChange={e => this.setState({hotdog: { ...hotdog, name: e.target.value}})} />
		    <button onClick={this.delHotdog}>Delete HotDog</button>
		</div>
		<div>
		    <h3>Update hotdog (API №4)</h3>
		    Current name: 
		    <input
			value={hotdog.name1}
			onChange={e => this.setState({hotdog: { ...hotdog, name1: e.target.value}})} />
		    New name: 
		    <input
			value={hotdog.name}
			onChange={e => this.setState({hotdog: { ...hotdog, name: e.target.value}})} />
		    New price: 
		    <input
			value={hotdog.price}
			onChange={e => this.setState({hotdog: { ...hotdog, price: e.target.value}})} />
		    <button onClick={this.updHotdog}>Update HotDog</button> 

		</div>


	    </div>
	);
    }

}

export default App;
