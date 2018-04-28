var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Genre.
exports.genre_list = function(req, res, next) {
  //res.send('NOT IMPLEMENTED: Genre list');
  Genre
    .find({})
    .sort([['name', 'ascending']])
    .exec(function(err,genre_list) {
      if(err) return next(err);
      res.render('genre_list',{title:'Genre List', genre_list:genre_list});
    })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
  //res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
  async.parallel({
    genre:function(callback) {
      Genre
        .findById(req.params.id)
        .exec(callback)
    },
    genre_books:function(callback) {
      Book
        .find({'genre':req.params.id})
        .exec(callback)
    }
  }, function(err,results){
      if(err) return next(err);
      if(results.genre == null) {
        var err = new Error('Genre not found');
        err.status = 404;
        return next(err);
      }
      res.render('genre_detail', {genre:results.genre, genre_books:results.genre_books});
  })
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
  //res.send('NOT IMPLEMENTED: Genre create GET');
  res.render('genre_form',{title:'Create Genre'});

};

// Handle Genre create on POST.
exports.genre_create_post = [
  //Validate the field is not empty
  body('name', 'Genre is required').isLength({min:1}).trim(),
  //Sanitize (trim and escape special characters)
  sanitizeBody('name').trim().escape(),
  (req, res, next)=>{
  //Extract validation errors from the request object
  const errors = validationResult(req);
  //Create a Genre object with escaped and trimmed data
  const genre = new Genre ({
    name:req.body.name
  });
  if(!errors.isEmpty()) {
    // There are errors. Render the form again with sanitized values/error messages.
    res.render('genre_form', {title:'Genre form', genre: genre, errors:errors.array()});
    return;
  }else {
    Genre
      .findOne({name:req.body.name})
      .exec((err, found_genre)=> {
        if(err) return next(err);
        if(found_genre) {
          res.redirect(found_genre.url)
        }else {
          genre.save(err => {
            if(err) return next(err);
            res.redirect(genre.url);
          });
        }
      })
  }
  }];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};