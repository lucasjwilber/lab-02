'use strict';

let allPaintings = [];
let allOptions = [];
let uniqueOptions = [];

function AnimalPainting(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allPaintings.push(this);
  allOptions.push(this.keyword);
}


$.get('data/page-2.json', painting => {

  painting.forEach(painting => {
    $('#paintingsArea').append(new AnimalPainting(painting.image_url, painting.title, painting.description, painting.keyword, painting.horns).render());
  });

  uniqueOptions = new Set(allOptions);

  uniqueOptions.forEach(option => {
    let $optionTag = $('<option></option>');
    $($optionTag).text(option);
    $('select').append($optionTag);
  });

});


const $thisPaintingTemplate = $('#photo-template').html();


AnimalPainting.prototype.render = function () {

  var source   = $("#photo-template").html();
  var template = Handlebars.compile(source);

  return template(this);
};


$().ready(
);


$('select').change(function (event) {

  event.preventDefault();
  console.log($('select').val());
  let selectedKey = $('select').val();
  allPaintings = [];
  console.log(typeof (selectedKey));

  $('section').fadeOut(750);

  $.get('data/page-2.json', painting => {
    painting.forEach(painting => {
      if (painting.keyword === selectedKey) {
        console.log(typeof (painting.keyword));
        console.log(typeof (selectedKey));
        $('#paintingsArea').append(new AnimalPainting(painting.image_url, painting.title, painting.description, painting.keyword, painting.horns).render());
      }
    });

    let uniqueOptions = new Set(allOptions);

  });
});

$($thisPaintingTemplate).remove();

