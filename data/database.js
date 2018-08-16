export class Post {}
export class User {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
const usersById = {
  [VIEWER_ID]: viewer,
};

// Mock posts data
const postsById = {};
const postIdsByUser = {
  [VIEWER_ID]: [],
};
let nextPostId = 0;
addPost('Item', 0);

export function addPost(text, likes) {
  const post = new Post();
  post.id = `${nextPostId++}`;
  post.text = text;
  post.likes = likes;
  postsById[post.id] = post;
  postIdsByUser[VIEWER_ID].push(post.id);
  return post.id;
}

export function getPost(id) {
  return postsById[id];
}

export function getPosts() {
  return postIdsByUser[VIEWER_ID].map(id => postsById[id]);
}

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}

export function updateLikes(id) {
  const post = getPost(id);
  post.likes = post.likes + 1;
}
