import React, {PureComponent} from 'react'
// import './newBatch.css'

export default class AddEvaluationForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="signup">
					<div>
						<input 
						type="remark" 
						name="remark" 
						className="signupInfo"
						placeholder="Remark" 
						id="remark" 
						value={this.state.remark || ''} 
						onChange={ this.handleChange } />
					</div>

          <div>
						<input 
						type="colour" 
						name="colour" 
						className="signupInfo"
						placeholder="Colour" 
						id="colour" 
						value={this.state.colour || ''} 
						onChange={ this.handleChange } />
					</div>

					{/* <span>
            <input 
            style={{background: 'red'}} 
						type="radio"
						name="red" 
						className="evalButton"
						id="red" 
						value={"red"} 
						onChange={ this.handleChange } />
					</span>

					<span>
            <input 
            style={{background: 'yellow'}} 
						type="radio"
						name="yellow" 
						className="evalButton"
						id="yellow" 
						value={"yellow"} 
						onChange={ this.handleChange } />
					</span>

          <span>
            <input
            style={{background: 'green'}} 
						type="radio"
						name="green" 
						className="evalButton"
						id="green" 
            value={"green"}
						onChange={ this.handleChange } />
					</span> */}

                    {/* <div>
						<input 
						type="batch" 
						name="batch" 
						className="signupInfo"
						placeholder="Batch Number" 
						id="batch" 
						value={this.state.batch || ''} 
						onChange={ this.handleChange } />
					</div> */}

					<button 
						type="submit"
						className="newBatchButton"
					>
						Create Evaluation!
					</button>
				</div>
			</form>
		)
	}
}