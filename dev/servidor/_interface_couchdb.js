var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('categorias');

var data = { 
    name: 'categorias', 
    cat: [3,3],
    subcat: [[2,2],[3,3],[4,4],[4,4]] 
};

db.insert(data, 'unique_id', function(err, body){
  if(!err){
    //awesome
  }
});
