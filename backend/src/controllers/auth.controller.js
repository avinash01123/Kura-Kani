const signup = (req, res) => {
  res.send('signup route')
}

const login = (req, res) => {
  res.send('login route')
}

const logout = (req, res) => {
  res.send('logout route')
}

module.exports = {
  signup,
  login,
  logout
}