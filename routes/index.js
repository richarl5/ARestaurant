var express = require('express');
var router = express.Router();
var PatternSchema = require('../pattern');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ARestaurant server' });
});

router.get('/pattern/:id', function (req, res) {
    PatternSchema.findOne({id: req.params.id}).exec(function (err, pattern) {
        if (err) return res.status(500).send({message: 'Error reading data base'});
        if (!pattern) return res.status(404).send({message: 'Pattern does not exist'});
        console.log(pattern);
        res.status(200).jsonp(pattern);
    });
});

router.put('/pattern/update/:id',function updateStudentSubject(req, res) {
    PatternSchema.findOne({id : req.params.id}, function (err,pattern) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!pattern) return res.status(404).send({message : 'Pattern does not exist'});
        pattern.update({$push: {restaurantID: req.body.restaurantID}}, {new : true}, function (err,patternUpdated) {
            if (err) return res.status(500).send({message: 'Error updating data base'});
            if (!patternUpdated) return res.status(404).send({message: 'Pattern does not exist'});
            res.status(200).send({message : 'Pattern has been updated'});
        });
    })
});

router.post('/pattern/add', function (req, res) {
    console.log(req.body);
    var newPattern = new PatternSchema({
        id: req.body.id,
        restaurantID: req.body.restaurantID
    });
    PatternSchema.findOne({name : req.body.id},function (err, pattern) {
        if(err) return res.status(500).send({message : 'Error on save in data base: ' + err});
        if(!pattern){
            newPattern.save(function (err,patternStored) {
                if(err) return res.status(500).send({message : 'Error on save in data base: ' + err});
                res.status(200).jsonp(patternStored);
            })
        } else return res.status(404).send({message : 'Pattern already exist'});
    });
});

module.exports = router;
