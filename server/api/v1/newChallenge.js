const { Challenge } = require('../../models');

const { Router } = require('express');
const axios = require('axios');
const fs = require('fs');

const router = Router();

// router Post - new challenge
router.post(`/`,async(req,res) => {
  try {
    const newRepo = req.body.repositoryName;
    const check = await Challenge.findOne({
      where:{
        repositoryName: newRepo
      }
    })
    if(check) {
      return res.status(500).send('Repo is already in the system');
    }
    const newChallenge = await Challenge.create(req.body);
    res.status(200).send(newChallenge);
  } catch(err) {
    res.send("Bad request");
  }
})

// router Get - github/workflows
router.get('/type', async (req,res) => {
  const files = fs.readdirSync('../.github/workflows');
  const types = files.map(file =>
    file.slice(0,-4)
  )
  res.send(types)
})

/*
//router Get - challenge by link
router.get('/:repoLink', async (req, res) => {
  try {
    const repo = await Challenge.findOne({
      where: {
        repositoryName: req.params.repoLink
      }
    });
    if(repo) {
      return res.status(200).send(repo.id);
    }
  } catch (err) {
  res.send("Bad request")
  }
})
*/

module.exports = router;
