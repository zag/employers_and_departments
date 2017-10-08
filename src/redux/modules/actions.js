

const CREATE_EMPLOYER = '@@/CREATE_EMPLOYER';
const SET_EMPLOYERS = '@@/SET_EMPLOYERS';
const SET_DEPARTMENTS = '@@/SET_DEPARTMENTS';


const IS_VALID = 'redux-example/survey/IS_VALID';
const IS_VALID_SUCCESS = 'redux-example/survey/IS_VALID_SUCCESS';
const IS_VALID_FAIL = 'redux-example/survey/IS_VALID_FAIL';


const initialState = {
  saveError: null,
  data: [],
  employers: localStorage.getItem('employers') ? JSON.parse(localStorage.getItem('employers')) : [],
  departmens: localStorage.getItem('departmens') ? JSON.parse(localStorage.getItem('departmens')) : [],

};

export default function reducer(state = initialState, action = {}) {
  let {result } = action;
  switch (action.type) {
    case SET_EMPLOYERS:
      return {
        ...state,
        employers: result,
      };
      case SET_DEPARTMENTS:
      return {
        ...state,
        departmens: result,
      };
    default:
      return state;
  }
}

export function SetEmployers(data) {
  return {
    type: SET_EMPLOYERS,
    result : data
  };
}

export function SetDepartmens(data) {
  return {
    type: SET_DEPARTMENTS,
    result : data
  };
}

