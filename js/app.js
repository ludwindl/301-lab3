'use strict';

//this arrays will store object instances for both pages
let newArr = [];
let secondArr = [];
let options = [];
let options2 = [];
//requesting Json using XMLHttpRequest()
function renderPic(filePath) {
  let request = new XMLHttpRequest();
  request.open('GET', filePath, false);
  request.send(null);
  return JSON.parse(request.responseText);
}
//envoking jsonParse function for both files
let firstPagePics= renderPic('data/page-1.json');
let secondPagePics = renderPic('data/page-2.json');


//constructor function for object instances
function Section(value) {
  for (let key in value) {
    this[key] = value[key];
  }

  newArr.push(this);
  secondArr.push(this);
}

//prototype to connect our data with handlebars template
Section.prototype.toHtml = function () {
  let template = $('#template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
};

//making two new json objects
firstPagePics.forEach(jsonObject => {
  new Section(jsonObject);
  console.log(1);

});

secondPagePics.forEach(jsonObject => {
  new Section(jsonObject);
  console.log(2);

});

//rendering all objects to the arrays
for (let i = 0; i < newArr.length / 2; i++) {
  $('#page1').append(newArr[i].toHtml());
}
for (let i = newArr.length / 2; i < newArr.length; i++) {
  $('#page2').append(newArr[i].toHtml());
  $('#page2').hide();
}

firstPagePics.forEach(function (item) {
  if (options.includes(item.keyword) === false) {
    options.push(item.keyword);
  }
});

options.forEach(function (element) {
  $('#keywordForm').append(`<option class ="one" value = ${element}>${element}</option>`);
});

//pushing unique keywords to options2 array
secondPagePics.forEach(function (item) {
  if (options2.includes(item.keyword) === false) {
    options2.push(item.keyword);
  }
});
//append options2.array to the dropdown list
options2.forEach(function (element) {
  $('#keywordForm').append(`<option class ="two" value = ${element}>${element}</option>`);
  $('option[class = two]').hide();
});

//event handlers for the click on page 1 and 2
$('button[value = page2Button]').on('click', function () {
  $('#page2').show();
  $('#page1').hide();
  $('option[class = one]').hide();
  $('option[class = two]').show();
  $('button[value = page1Button]').css('background', '#fff1b8');
  $('button[value = page2Button]').css('background', 'rgb(255, 255,255)');
});

$('button[value = page1Button]').on('click', function () {
  $('#page1').show();
  $('#page2').hide();
  $('option[class = two]').hide();
  $('option[class = one]').show();
  $('button[value = page2Button]').css('background', '#fff1b8');
  $('button[value = page1Button]').css('background', 'rgb(255, 255,255)');
});

//event handler to filter images by keyword
$('#keywordForm').on('change', function () {
  let selection = $(this).val();

  if (selection === 'default') {
    $('section').show();
  } else {
    $('section').hide();
    $(`section[class="${selection}"]`).show();
  }
});

//event handler for sorting all images
$('#sortByForm').on('change', function () {
  let selection = $(this).val();
  if (selection === 'default') {
    if ($('button[value="page1Button"]').css('background-color') === 'rgb(255, 255, 255)') {

      $('section').remove();
      for (let i = 0; i < secondArr.length / 2; i++) {
        $('#page1').append(secondArr[i].toHtml());
      }
      for (let i = secondArr.length / 2; i < secondArr.length; i++) {
        $('#page2').append(secondArr[i].toHtml());
        $('#page2').hide();
      }
    } else {
      $('section').remove();
      for (let i = 0; i < secondArr.length / 2; i++) {
        $('#page1').append(secondArr[i].toHtml());
        $('#page1').hide();
      }
      for (let i = secondArr.length / 2; i < secondArr.length; i++) {
        $('#page2').append(secondArr[i].toHtml());

      }
    }
  }

  //sorting by title
  if (selection === 'byTitle') {
    newArr.sort(function (a, b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });

    if ($('button[value="page1Button"]').css('background-color') === 'rgb(255, 255, 255)') {
      $('section').remove();
      for (let i = 0; i < newArr.length / 2; i++) {
        $('#page1').append(newArr[i].toHtml());
      }
      for (let i = newArr.length / 2; i < newArr.length; i++) {
        $('#page2').append(newArr[i].toHtml());
        $('#page2').hide();
      }
    } else {
      $('section').remove();
      for (let i = 0; i < newArr.length / 2; i++) {
        $('#page1').append(newArr[i].toHtml());
        $('#page1').hide();
      }
      for (let i = newArr.length / 2; i < newArr.length; i++) {
        $('#page2').append(newArr[i].toHtml());
      }
    }
  }

  //sorting by horns
  if (selection === 'byHorns') {
    newArr.sort(function (a, b) {
      var x = a.horns;
      var y = b.horns;
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });

    if ($('button[value="page1Button"]').css('background-color') === 'rgb(255, 255, 255)') {
      $('section').remove();
      for (let i = 0; i < newArr.length / 2; i++) {
        $('#page1').append(newArr[i].toHtml());
      }
      for (let i = newArr.length / 2; i < newArr.length; i++) {
        $('#page2').append(newArr[i].toHtml());
        $('#page2').hide();
      }
    } else {
      $('section').remove();
      for (let i = 0; i < newArr.length / 2; i++) {
        $('#page1').append(newArr[i].toHtml());
        $('#page1').hide();
      }

      for (let i = newArr.length / 2; i < newArr.length; i++) {
        $('#page2').append(newArr[i].toHtml());
      }
    }
  }

});

