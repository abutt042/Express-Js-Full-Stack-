export function overview(req, res) {
  res.render('dashboard', {
    username: req.user.name,
    active: 'overview',
  });
}

export function sensors(req, res) {
  res.render('sensors', {
    username: req.user.name,
    active: 'sensors',
  });
}
