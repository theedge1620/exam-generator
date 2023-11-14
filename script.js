const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
const siteController = require('./sites.js');

const examController = require('./exams.js');


app.listen(PORT, () => console.log(`Serving up delicious fruits on port ${PORT} 🍒`));


app.get('/', (req, res) => {
  res.send("welcome!")
});


app.get('/sites/', siteController.getSites);


app.get('/sites/:id', siteController.getSite);

app.get('/topics/', examController.getTopics);

app.get('/topics/:id', examController.getTopic);

app.get('/topics/:system/kas/:kaNum/roles/:role', examController.getRandomTopic);

app.get('/pwr/:design/icecondflag/:iceCondFlag/multi/:multiUnitFLag', examController.getExamTopics);

//app.get('/bwr/:design/isocondenser/:isoCondFlag/multi/:multiUnitFLag', examController.getBWRExam);
app.get('/bwr/:design/isocondenser/:isoCondFlag/multi/:multiUnitFLag/containment/:containment', examController.getBWRExam);










