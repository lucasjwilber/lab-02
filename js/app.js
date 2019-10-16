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


$.get('data/page-1.json', painting => {

  painting.forEach(painting => {
    new AnimalPainting(painting.image_url, painting.title, painting.description, painting.keyword, painting.horns).render();
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
  const $newSection = $('<section></section>');
  $($newSection).html($thisPaintingTemplate);
  $($newSection).find('h2').text(this.title);
  $($newSection).find('img').attr('src', this.image_url);
  $($newSection).find('p').text(this.description);
  $('main').append($newSection);
};


$().ready(
);


$('select').change(function (event) {

  event.preventDefault();
  console.log($('select').val());
  let selectedKey = $('select').val();
  allPaintings = [];
  console.log(typeof (selectedKey));

  $('section').remove();

  $.get('data/page-1.json', painting => {
    painting.forEach(painting => {
      if (painting.keyword === selectedKey) {
        console.log(typeof (painting.keyword));
        console.log(typeof (selectedKey));
        new AnimalPainting(painting.image_url, painting.title, painting.description, painting.keyword, painting.horns).render();
      }
    });

    let uniqueOptions = new Set(allOptions);

  });
});

$($thisPaintingTemplate).remove();