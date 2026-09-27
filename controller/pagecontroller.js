import path from 'path';

export function home(req, res) {
  res.render('home');
}

export function about(req, res) {
  res.render('about');
}

export function contact(req, res) {
  res.render('contact');
}

export function notFound(req, res) {
  res.status(404).sendFile(path.resolve('view/404.html'));
}
