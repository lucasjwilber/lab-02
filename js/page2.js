'use strict';

let allPaintings = [];
let allOptions = [];
let uniqueOptions = [];
// let sortarr = [];

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
    new AnimalPainting(painting.image_url, painting.title, painting.description, painting.keyword, painting.horns);
  });
  // console.log(allPaintings);


  sortfunction();
  // console.log(allPaintings);

  allPaintings.forEach(painting => {
    $('#paintingsArea').append(painting.render());

  });
  uniqueOptions = new Set(allOptions);

  uniqueOptions.forEach(option => {
    let $optionTag = $('<option></option>');
    $($optionTag).text(option);
    $('#filter').append($optionTag);
  });

});


const $thisPaintingTemplate = $('#photo-template').html();


AnimalPainting.prototype.render = function () {
  var source = $("#photo-template").html();
  var template = Handlebars.compile(source);
  // $('main').append(template);
  return template(this);
};


$().ready(
);


$('#filter').change(function (event) {

  event.preventDefault();
  console.log($('#filter').val());
  let selectedKey = $('#filter').val();
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


// this is for the sort images

function sortfunction() {
  allPaintings.sort((a, b) => {
    if ($('#sort').val() === 'horns') {
      if (a.horns > b.horns) {
        return 1;
      } else if (a.horns < b.horns) {
        return -1;
      } else {
        return 0;
      }
    } else if ($('#sort').val() === 'alphabetical') {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }

    } else {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    }
  });
}

$('#sort').change(function (event) {

  event.preventDefault();
  console.log($('#sort').val());
  let selectedKey = $('#sort').val();

  $('section').fadeOut(750);

  sortfunction();


  allPaintings.forEach(painting => {
    $('#paintingsArea').append(painting.render());
  });
});

$($thisPaintingTemplate).remove();
