const Sites = require('./static/data/site-flags.js');

// return all sites:
const getSites = (req, res) => {
  const allsiteData = Sites.getAll();
  
  res.send({allsiteData});
};


// return a single site:
const getSite = (req, res) => {
  const siteData = Sites.getOne(req.params.id);

  res.send({siteData});
};

module.exports = {
  getSites,
  getSite
};


