import {GET_BATCH} from '../actions/batches'
import {ADD_STUDENT} from '../actions/student'

export default (state = [], action ) => {
    switch (action.type) {
        


        case ADD_STUDENT:
            return {
                ...state,
                [action.payload]: action.payload
              }

        default:
            return state
    }
  }