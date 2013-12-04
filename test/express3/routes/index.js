
/*
 * GET home page.
 */

exports.index = function(req, res){
	var circular_obj = [1,2,3];
	circular_obj.push(circular_obj);
	var vars = {
		title: 'Express',
		a_bad_test_function: function() {return JSON.stringify(circular_obj);}
	}
  	res.render('index.toffee', vars);
};