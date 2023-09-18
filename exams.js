const pwrTopics = require('./static/data/pwr-ka-catalog.js');

// return all Topics:
const getTopics = (req, res) => {
  const allTopics = pwrTopics.getAll();

  res.send({allTopics});
};


// return a single Topic:
const getTopic = (req, res) => {
  const topicData = pwrTopics.getOne(req.params.id);

  res.send({topicData});
};

// return a random Topic:
const getRandomTopic = (req, res) => {
  
  const randomTopic = pwrTopics.getKA(req.params.system,req.params.kaNum,req.params.role);

  console.log(req.params.system);

  res.send({randomTopic});
};

// return an exam:
const getExamTopics = (req, res) => {
  
  const examTopics = pwrTopics.getExam(req.params.design,req.params.iceCondFlag,req.params.multiUnitFLag);

  console.log(req.params.design);

  res.send({examTopics});
};



module.exports = {
  getTopics,
  getTopic,
  getRandomTopic,
  getExamTopics
};


