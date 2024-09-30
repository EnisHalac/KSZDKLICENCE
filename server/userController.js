const bcrypt = require('bcrypt');
const User = require('./user');

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      
      req.session.user = { id: user._id, name: user.name, email: user.email };
      
      res.redirect('/home');
    } catch (error) {
      if (error.code === 11000) {
        return res.render('login', { error: "Email adresa vec postoji." });
      } else {
        return res.render('login', { error: "Neocekivana greska. Molimo pokusajte ponovo." });
      }
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render('login', { error: "Netacna email adresa ili sifra." });
      }

      req.session.user = user;
      res.redirect('/home');
    } catch (error) {
      return res.render('login', { error: error});
    }
  },
  async logout(req, res) {
    try {
      req.session.destroy();

      res.redirect('/home');
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

module.exports = UserController;
