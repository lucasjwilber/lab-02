'use strict';

let allPaintings = [];

function AnimalPainting(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allPaintings.push(this);
};


$.get('data/page-1.json', painting => {
  painting.forEach(painting => {
    new AnimalPainting(painting.image_url, painting.title, painting.description, painting.keyword, painting.horns).render();
  });
});

{/* <section id="photo-template">
        <h2></h2>
        <img src="" alt="">
        <p></p>
      </section> */}

AnimalPainting.prototype.render = function () {
  const $thisPaintingTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $($newSection).html($thisPaintingTemplate);
  $($newSection).find('h2').text(this.title);
  $($newSection).find('img').attr('src', this.image_url);
  $($newSection).find('p').text(this.description);
  $('main').append($newSection);
};


$().ready(

);