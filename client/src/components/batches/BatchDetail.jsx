import React, {PureComponent} from 'react'
import {showBatch} from '../../actions/batches'
import {showStudent, deleteStudent} from '../../actions/student'
import {showEvaluation} from '../../actions/evaluation'
import GetRandom from './randomStudentGenerator'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import './batch.css'



class BatchDetail extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.showBatch()
      // this.props.getUsers()
    }
  }

  showStudent(studentId) {
    this.props.showStudent(studentId)
}


  showEvaluation(studentId) {
  this.props.showEvaluation(studentId)
}

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId)
  }

  calculatePercent() {
    const { students } = this.props

    const getEvals = students.filter(student => student.lastEvaluation !== "white")
    console.log(getEvals, "evals?")
    const getRed = getEvals.filter(student => student.lastEvaluation === "red")
    console.log(getRed, "reds?")
    const getYellow = getEvals.filter(student => student.lastEvaluation === "yellow")
    console.log(getYellow, "yellows?")
    const getGreen = getEvals.filter(student => student.lastEvaluation === "green")
    console.log(getGreen, "greens?")

    // const bar = Array.prototype.concat.apply([], arrayOfArraysToConcat)
    let bar = Array.prototype.concat.apply([], [getRed, getYellow, getGreen])

    console.log(bar, "showmeabar")

    const redPercent = (getRed.length/getEvals.length * 100).toFixed()
    const yellowPercent = (getYellow.length/getEvals.length * 100).toFixed()
    const greenPercent = (getGreen.length/getEvals.length * 100).toFixed()

    // const bar = getRed.push(getYellow)

    // console.log(bar, "showmeabar")
    
  return (
    <div>
        <div className="percentageBar">
          Latest evaluation for current batch:<br />
              {bar.map(student => this.renderBoxes(student))}<br />
        </div>
        <p>Red Percentage: {redPercent}%</p>
        <p>Yellow Percentage: {yellowPercent}%</p>
        <p>Green Percentage: {greenPercent}%</p>
    </div>
  )

  }
  renderBoxes = (student) => {

    return (
      <button 
      key={student.id}
      className="progressionBar" 
      style={{background: `${student.lastEvaluation}`}}
      > </button>
    )
  }

  renderStudent = (student) => {
    const { batchId } = this.props

    return (
        <div 
        key={student.id} 
        className="students" style={{backgroundColor: `${student.lastEvaluation}`}}>
            <Link
                className="link"
                to={`/batches/${batchId}/students/${student.id}`}
                onClick={() => this.showStudent(student.id)}
                >
                <img className="studentPicture" src={student.profilePic} alt={student.firstName} />
            </Link>
            <p className="studentName">{student.firstName} {student.lastName}</p>
            <p className="studentInfo" >Last evaluation: {(student.lastEvaluation).toUpperCase()}</p>
            <button className="deleteStudent" onClick={() => this.deleteStudent(student.id)}>EXTERMINATE</button>
    </div>
    )}

  render() {
    const {students, bar, batchId, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (students === null) return null

    return (
      <div>
        {/* <div className="percentageBar">
            Latest evaluation for current batch:<br />
              {bar.map(student => this.renderBoxes(student))}<br />
        </div> */}
        <div className="percentages">
            Current stat:
              {this.calculatePercent()}
        </div>
        <div className="batchPage">
            <div className="batchPageButtons">
              <GetRandom />
              </div>
              <div className="batchPageButtons">
              <button>
                <Link
                  to={`/batches/${batchId}/students`}>
                  Create a new Student
                </Link>
              </button>
              </div>
          </div>
          <div>
            {students.map(student => this.renderStudent(student))} 
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(((window.location.href).split('/')[4]), 'halo')
  console.log(((window.location.href).split('/')), 'halo')
  return {
  authenticated: state.currentUser !== null,
  batchId : ((window.location.href).split('/')[4]),
  students: state.students

  }
}

export default connect(mapStateToProps, { showBatch, showStudent, showEvaluation, deleteStudent })(BatchDetail)



// console.log(redPercent, "whytho1")
// console.log(yellowPercent, "whytho2")
// console.log(greenPercent, "whytho3")