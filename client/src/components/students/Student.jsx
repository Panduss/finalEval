import React, {PureComponent} from 'react'
import {showStudent} from '../../actions/student'
// import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {showEvaluation} from '../../actions/evaluation'
import NewEvaluationPage from './addEvaluationPage'
import './student.css'

class ShowOneStudent extends PureComponent {

  componentWillMount() {
    // this.props.showEvaluation()
    if (this.props.authenticated) {
      if (this.props.student === null) this.props.showStudent()
      // if (this.props.evalus === null) this.props.showEvaluation()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  // showEvaluation(studentId) {
  //   this.props.showEvaluation(studentId)
  // }


  // renderBoxes = (evalu) => {

  //   return (
  //     <button 
  //     key={evalu.id}
  //     className="progressionBar" 
  //     style={{background: `${evalu.colour}`}}
  //     > </button>
  //   )
  // }

  renderOneStudent = (student) => {

    return (

      <div>
        <div 
          className="studentInfo"
          key={student.id} 
          style={{backgroundColor: `${student.lastEvaluation}`}}
          >
            <p className="studentName">{student.firstName} {student.lastName}</p>
            <img className="studentPicture" src={student.profilePic} alt={student.firstName}/>
            <p className="studentInfo">Last evaluation: {(student.lastEvaluation).toUpperCase()}</p>
            <button className="newEvalButton" onClick={() => this.showEvaluation(student.id)}>Show Evaluation</button>
        </div>
      </div>
    )}



  render() {
    const { evalus, student, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
    )
    // if (student === null) return null

    return (
      <div className="studentPage">
        <div>
          {/* Student's progression:  {evalus.map(evalu => this.renderBoxes(evalu))} */}
      </div>
      <div className="evaluation">
        <div className="box" >
            {student.map(student => this.renderOneStudent(student))}
          </div>
          <div className="box">
            <NewEvaluationPage />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state.oneStudent.map(a => a.evalu), "hiii")

  return {
    authenticated: state.currentUser !== null,
    student: state.students,
    // evalus: state.oneEvaluation
  
  }
}

export default connect(mapStateToProps, {showStudent, showEvaluation})(ShowOneStudent)