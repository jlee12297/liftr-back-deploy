const router = require('express').Router();
const { Client, Coach, } = require('../../models');


//TODO: WORKING
router.get("/", (req, res) => {
  Coach.findAll({
    include: [Client]
  }).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "womp womp", err })
  })
})

//TODO: get Coach by id
//TODO: WORKING
router.get("/:id", async (req, res) => {
  try {
    const coachData = await Coach.findOne(
      {
        include: { model: Client },
      });

    if (!coachData) {
      res.status(404).json({ message: 'No Coach found with that id!' });
      return;
    }

    res.status(200).json(coachData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: WORKING
//CREATES Coach
router.post('/', async (req, res) => {
  try {
    const newCoach = await Coach.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).json(newCoach);
  } catch (err) {
    res.status(400).json(err);
  }
});


//TODO: WORKING
//GMS LOGIN coach
router.post('/login', async (req, res) => {
  try {
    const existingUserData = await Coach.findOne({ where: { email: req.body.email } });
    if (!existingUserData) {
      res
        .status(400)
        .json({ message: 'No coach was found with that email.' });
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
      req.session.coachId = existingUserData.id;
      req.session.username = existingUserData.username;
      req.session.logged_in = true;
      console.log(existingUserData.id);
      console.log(req.session.logged_in);
      res.json({ coach: existingUserData, message: 'Coach successfully logged in.' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});




// TODO: DELETE COACH

router.delete('/:id', async (req, res) => {
  try {
    const deleteCoach = await Coach.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCoach) {
      res.status(404).json({ message: 'No coach found with this id!' });
      return;
    }

    res.status(200).json(deleteCoach);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updateCoach = await Coach.update(
      req.body,
      {

        where: {
          id: req.params.id,
        },
      });

    if (!updateCoach) {
      res.status(404).json({ message: 'No coach found with this id!' });
      return;
    }

    res.status(200).json(updateCoach);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;