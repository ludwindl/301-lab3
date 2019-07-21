'use strict';

function Horns(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horns.allHorns = [];
Horns.secondHornsArray = [];

Horns.prototype.render = function () {
  $('main').append('<div class = "horns1"></div>');
  
  let moreHorns = $('div[class = horns1]');
  let hornHtml = $('#photo-template').html();
  
  moreHorns.html(hornHtml);
  moreHorns.find('h2').text(this.title);
  moreHorns.find('img').attr('src', this.image_url).attr('width', '250px').attr('height', '250px');
  moreHorns.find('p').text(this.description);
  moreHorns.find('option').text(this.keyword);
  moreHorns.removeClass('horns1');
  moreHorns.attr('class', this.keyword);
  
}
 
Horns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then (data => {
      data.forEach(item =>{
        Horns.allHorns.push(new Horns(item));
      })
      Horns.useFilters();
      
    })
    .then(Horns.loadHorns);
}


Horns.useFilters = () => {
  let hornFilter = [];

  Horns.allHorns.forEach(img => {
    if (!hornFilter.includes(img.keyword)){
      hornFilter.push(img.keyword);
      $('select').append(`<option>${img.keyword}</option>`);
    }
  })
  
}


Horns.loadHorns = () => {
  Horns.allHorns.forEach(horn => horn.render());
};

$(() => Horns.readJson());

$('select').on('change', function() {
  let selection = $(this).val();
  if(selection === 'Filter by keyword'){
    $('div').show();
  } else{
    $('div').hide();
    $(`div[class="${selection}"]`).show();
  }
});



let hornArrayTheSecond = [];

// REVIEW: This is another way to use a constructor to duplicate an array of raw data objects
function SecondHorns (horntwo) {
  for (let key in horntwo) {
    this[key] = [horntwo];
  }
}

SecondHorns.prototype.toHtml = function() {
  // 1. Get the template from the HTML document
  let template = $('#neighborhood-template').html();
  // 2. Use Handlebars to "compile" the HTML
  let templateRender = Handlebars.compile(template);
  // 3. Do not forget to return the HTML from this method
  return templateRender(this);
};

neighborhoodDataSet.forEach(neighborhoodObject => {
  neighborhoods.push(new Neighborhood(neighborhoodObject));
});

neighborhoods.forEach(ourNewNeighborhoodObject => {
  $('#neighborhoods').append(ourNewNeighborhoodObject.toHtml());
});