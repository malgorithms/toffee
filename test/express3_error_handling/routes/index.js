
/*
 * GET home page.
 */

exports.index = function(req, res){
	var vars = { }
  res.render('index.toffee', vars);
};

/*
 * individual test cases
*/

exports.path = function(req, res){
  var vars = { };
  vars.path = req.params.path
  res.render("./" + vars.path + ".toffee", vars);
};
