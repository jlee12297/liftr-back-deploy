const router = require('express').Router();
const { Client, Exercise } = require('../../models');

router.get("/", (req, res) => {
  Client.findAll({
    include: [Exercise,]
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "womp womp", err })
  })
});

//TODO: get client by id

router.get("/:id", async (req, res) => {
  try {
    const clientData = await Client.findByPk(req.params.id, {
      include: { model: Exercise },
    });

    if (!clientData) {
      res.status(404).json({ message: 'No Client found with that id!' });
      return;
    }

    res.status(200).json(clientData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//CREATES Client
router.post('/', async (req, res) => {
  try {
    const newClient = await Client.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).json(newClient);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.post('/login', async (req, res) => {
  try {
    const existingUserData = await Client.findOne({ where: { email: req.body.email } });
    if (!existingUserData) {
      res
        .status(400)
        .json({ message: 'No client was found with that email.' });
      return;
    }
    const validPassword = await existingUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.clientId = existingUserData.id;
      req.session.username = existingUserData.username;
      req.session.logged_in = true;
      console.log(existingUserData.id);
      console.log(req.session.logged_in);
      res.json({ coach: existingUserData, message: 'Client successfully logged in.' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});






// // TODO: DELETE Client
router.delete('/:id', async (req, res) => {
  try {
    const deleteClient = await Client.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteClient) {
      res.status(404).json({ message: 'No client found with this id!' });
      return;
    }

    res.status(200).json(deleteClient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // TODO: EDIT Client

router.put('/:id', async (req, res) => {
  try {
    const updateClient = await Client.update(
      req.body,
      {
        where: {
          id: req.params.id,
        },
      });

    if (!updateClient) {
      res.status(404).json({ message: 'No client found with this id!' });
      return;
    }

    res.status(200).json(updateClient);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;