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
addTodo('Item', 0);

export function addTodo(text, likes) {
  const todo = new Todo();
  todo.id = `${nextTodoId++}`;
  todo.text = text;
  todo.likes = likes;
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

export function updateLikes(id) {
  const todo = getTodo(id);
  todo.likes = todo.likes + 1;
}
