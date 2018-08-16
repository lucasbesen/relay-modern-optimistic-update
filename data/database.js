export class Todo {}
export class User {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
const usersById = {
  [VIEWER_ID]: viewer,
};

// Mock todo data
const todosById = {};
const todoIdsByUser = {
  [VIEWER_ID]: [],
};
let nextTodoId = 0;
addTodo('Without Optimistic Update');
addTodo('With Optimistic Update');

export function addTodo(text) {
  const todo = new Todo();
  todo.id = `${nextTodoId++}`;
  todo.text = text;
  todosById[todo.id] = todo;
  todoIdsByUser[VIEWER_ID].push(todo.id);
  return todo.id;
}

export function getTodo(id) {
  return todosById[id];
}

export function getTodos(status = 'any') {
  return todoIdsByUser[VIEWER_ID].map(id => todosById[id]);
}

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}

export function renameTodo(id, text) {
  const todo = getTodo(id);
  todo.text = text;
}
