import React from 'react';
import ReactDOM from 'react-dom';
import { Dispatcher } from 'flux'; 
import { EventEmitter } from 'events';
const AppDispancher = new Dispatcher();

let _count = 0; // _underscore
const change_EVENT = 'CHANGE';

const CounterStore = Object.assign({}, EventEmitter.prototype, {
	emitChange() {
		console.log(_count);
		this.emit(change_EVENT)
	},

	addChangeListener(callback) { // регистрация
		this.on(change_EVENT, callback)
	},

	removeChangeListener(callback) {
		this.removeListener(change_EVENT, callback)
	},

	getCount() {
		return _count;
	}
});

AppDispancher.register(action => {
	if(action.type === 'INCREMENT') {
		_count++;
		CounterStore.emitChange();
	};

	if (action.type === 'DECREMENT') {
		_count--;
		CounterStore.emitChange();
	}
})

function increment() { // action creater
	AppDispancher.dispatch({
		type: 'INCREMENT'
	})
};

function decrement() { // action creater
	AppDispancher.dispatch({
		type: 'DECREMENT'
	})
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getStateFromFlux();
		this.updateState = this.updateState.bind(this);
	}

	getStateFromFlux() {
		return {
			count: CounterStore.getCount()
		}
	}

	componentDidMount() {
		CounterStore.addChangeListener(this.updateState)
	}

	componentWillUnmount() {
		CounterStore.removeChangeListener(this.updateState)
	}

	updateState() {
		this.setState(this.getStateFromFlux())
	}

	render() {
		return <div>
			<button onClick={increment}>+</button>
			{this.state.count }
			<button onClick={decrement}>-</button>
		</div>
	}
}

ReactDOM.render(
	<div>
		<App />
		<button onClick={increment}>Pluse</button>
	</div>,
	document.getElementById('root')
)