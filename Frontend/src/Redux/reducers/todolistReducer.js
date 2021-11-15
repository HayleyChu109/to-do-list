import {
  GET_INFO,
  GET_LIST,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
} from "../action-creators/todolistAction";

const initialState = {
  username: "",
  todolist: [],
};

export function todolistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INFO:
      console.log("GET");
      return { username: action.payload, todolist: state.todolist };
    case GET_LIST:
      console.log("GET LIST");
      return {
        username: state.username,
        todolist: state.todolist.concat(action.payload),
      };
    case ADD_LIST:
      console.log("ADD LIST");
      return {
        username: state.username,
        todolist: state.todolist.concat([action.payload]),
      };
    case EDIT_LIST:
      console.log("EDIT LIST");
      let listIndex = state.todolist.findIndex(
        (element) => element.id === action.payload.id
      );
      let newList = action.payload;

      state.todolist.splice(listIndex, 1, newList);
      return {
        username: state.username,
        todolist: state.todolist,
      };
    case DELETE_LIST:
      console.log("DELETE LIST");
      return {
        username: state.username,
        todolist: state.todolist.filter((list) => list.id != action.payload),
      };
    default:
      return state;
  }
}
