import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Note from './note.jsx';
import Col from 'react-bootstrap/lib/Col';
import Masonry from 'react-masonry-component';
import autosize from 'autosize';
require( __dirname + '/../css/style.css' );

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.deleteBlock = this.deleteBlock.bind(this);
		this.updateText = this.updateText.bind(this);
		this.addBlock = this.addBlock.bind(this);
		this.updateClickEdit = this.updateClickEdit.bind(this);
		this.setDataTime = this.setDataTime.bind(this);
		this.prependChosen = this.prependChosen.bind(this)
	}

	updateText(text, title, i) {
		var arr = this.state.note;
		arr[i].text = text;
		arr[i].title = title;
		localStorage.setItem('note', JSON.stringify(arr));
		this.setState({
			note: arr
		})
	}

	updateClickEdit() {
		this.setState({
			note: JSON.parse(localStorage.getItem('note'))
		})
	}

	deleteBlock(i) {
		var arr = this.state.note;
		arr.splice(i,1);
		localStorage.setItem('note', JSON.stringify(arr));
		this.setState({
			note: arr
		})
	}

	componentWillMount() {
		if (localStorage.getItem('note') === null) {
			this.setState({
				note: []
			})
		} else {
			this.setState({
				note: JSON.parse(localStorage.getItem('note'))
			})
		}
	}

	componentDidUpdate() {
		autosize(document.querySelectorAll('textarea'))
	}

	addBlock() {
		var arr = this.state.note;

		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1;
		var curr_year = d.getFullYear();
		var getFullData = curr_year + "-" + curr_month + "-" + curr_date;

		arr.push({text: 'Text', title: 'Title', dataTime: getFullData + ' in ' + d.toLocaleTimeString(), imp: false});
		localStorage.setItem('note', JSON.stringify(arr));
		this.setState({
			note: JSON.parse(localStorage.getItem('note'))
		})
	}

	setDataTime() {
		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1;
		var curr_year = d.getFullYear();

		return curr_year + "-" + curr_month + "-" + curr_date;
	}

	prependChosen(index, prefer) {
		var arr = JSON.parse(localStorage.getItem('note'));
		var clickIndex = index;
		arr[index].imp = !prefer;
		localStorage.setItem('note', JSON.stringify(arr));
		this.setState({
			note: JSON.parse(localStorage.getItem('note'))
		})
	}

	getElementsNote() {
		return this.state.note.map((item, i, arr) => 
			<Note key={i} updateClickEdit={this.updateClickEdit} prefer={item.imp} setDataTime={this.setDataTime} dataTime={item.dataTime} text={item.text} title={item.title} index={i} update={this.updateText} delete={this.deleteBlock} length={arr.length}>
		</Note>)
	}

	render() {
		var masonryOptions = {
			horizontalOrder: true,
			itemSelector: '.image-element-class'
		};

		return <div>
			<div><p className='LithosPro_Regular text_center'>Note<span>App</span></p></div>
			<Masonry options={masonryOptions}>
					{ this.state.note != '' ? this.getElementsNote() : '' }
					<div className="image-element-class">
						<div className='add'>
							<img onClick={this.addBlock}  src="images/Subtraction 1.png" />
						</div>
					</div>
			</Masonry>
		</div>
	}
}