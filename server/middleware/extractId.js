//extract the 'intermediary' :id from a controller route
//to be used as req.params.id

exports.extractId = (req, res, next) => {
  (req.id = req.params.id), next();
};
