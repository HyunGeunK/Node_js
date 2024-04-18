const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// 미들웨어 설정
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// 게시물 데이터
let posts = [];

// 홈 페이지 라우트
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// 글쓰기 폼 라우트
app.get('/write', (req, res) => {
  res.render('write');
});

// 글쓰기 액션 라우트
app.post('/write', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: posts.length + 1, title, content });
  res.redirect('/');
});

// 글조회 라우트
app.get('/post/:id', (req, res) => {
  const id = req.params.id;
  const post = posts.find(post => post.id === parseInt(id));
  if (!post) {
    res.status(404).send('Post not found');
  } else {
    res.render('post', { post });
  }
});

// 글수정 폼 라우트
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const post = posts.find(post => post.id === parseInt(id));
  if (!post) {
    res.status(404).send('Post not found');
  } else {
    res.render('edit', { post });
  }
});

// 글수정 액션 라우트
app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const postIndex = posts.findIndex(post => post.id === parseInt(id));
  if (postIndex === -1) {
    res.status(404).send('Post not found');
  } else {
    posts[postIndex] = { id: parseInt(id), title, content };
    res.redirect('/');
  }
});

// 글삭제 액션 라우트
app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  posts = posts.filter(post => post.id !== parseInt(id));
  res.redirect('/');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});