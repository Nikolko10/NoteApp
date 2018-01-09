import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
require( __dirname + '/../css/style.css' );

export default class Note extends React.Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);
		this.state = {
			default: false,
			text: this.props.text,
			title: this.props.title,
			onClickAdd: true,
			stateLen: this.props.stateLen,
			title: this.props.title,
			length: this.props.length,
			prefer: this.props.prefer
		}
	}

	handleClickIcon(prefer, index) {
		this.setState({
			prefer: !prefer
		});
		this.props.prepend(index, prefer);
	}

	save() {
		this.props.update(this.refs.text.value, this.refs.title.value, this.props.index);
		console.log(this.refs.title.value)
		this.setState({default: false})
	}

	delete() {
		this.props.delete(this.props.index);
	}

	edit() {
		this.setState({default: true, text: this.props.text, title: this.props.title});
		this.props.updateClickEdit()
	}

	rendNorm() {
		return <div className='flex'>
					<div className='note_style_edit'>
						<span>{this.props.title}</span>
						<FontAwesome onClick={() => this.handleClickIcon(this.state.prefer, this.props.index)} className={this.state.prefer === false ? 'starPosition inactive' : 'starPosition active'} name={this.state.prefer === false ? 'star-o' : 'star'} />
						<span className='Century_Gothic edit_text'>{this.props.text}</span>
						<p className='LithosPro_Regular'><strong>Date created: {this.props.dataTime}</strong></p>
						<div className='buttons LithosPro_Regular'>
							<button onClick={this.edit}>Edit</button>
							<button onClick={this.delete}>Delete</button>
						</div>
					</div>
				</div>
	}

	rendEdit() {
		return <div className='flex'>
					<div className='note_style'>
						<input ref="title" type="text" defaultValue={this.state.title} />
						<textarea  rows='1' ref="text" className='Century_Gothic' defaultValue={this.state.text}></textarea>
						<p className='LithosPro_Regular'><strong>Date created: {this.props.dataTime}</strong></p>
						<div className='buttons LithosPro_Regular'>
							<button onClick={this.save}>Save</button>
						</div>
					</div>
				</div>
	}

	createNoteName() {
		return <div className='flex'>
					<div className='note_name'>
						<span>Enter name note</span>
						<input type="text" className='Century_Gothic'></input>
						<div className='buttons LithosPro_Regular'>
							<button>Create</button>
						</div>
					</div>
				</div>
	}

	render() {
		return <div className='image-element-class'>
			{ 
				this.state.default === false ? this.rendNorm(this.state.default) : this.rendEdit()
			}
		</div>
	}
}