// A function to get the file list
function getFiles() {
	return $.ajax('/api/file')
		.then(res => {
			console.log("Results from getFiles()", res);
			return res;
		})
		.fail(err => {
			console.log("Error in getFiles()", err);
			throw err; 
		});
}


// A function to refresh the file list
function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {

      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}


// A function to refresh the file entry after it has been edited.
function refreshFileEntry() {
  getFiles()
    .then(files => {
      window.fileList = files;
    })

    .done(function() { 
      $('.entry-wrapper').load(' .art-entry');
    })
}



// Toggle Edit Form
function toggleAddFileForm() {
  setFormData({});
  toggleAddFileFormVisibility();
}

function toggleAddFileFormVisibility() {
  $('#edit-form-container').toggleClass('hidden');
}



// Submit data to DB
function submitFileForm() {
  console.log("Form submitted");

  const fileData = {
    title: $('#file-title').val(),
    artist: $('#file-artist').val(),
    imageLarge: $('#file-imageLarge').val(),
    imageSmall: $('#file-imageSmall').val(),
    year: $('#file-year').val(),
    media: $('#file-media').val(),
    category: $('#file-category').val(),
    museum: $('#file-museum').val(),
    _id: $('#file-id').val(),
  };

  let method, url, use;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/file/' + fileData._id;
    refreshFunction = refreshFileEntry();

  } else {
    method = 'POST';
    url = '/api/file';
    refreshFunction = refreshFileList();
  }

  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(fileData),
    dataType: 'json',
    contentType : 'application/json',

  })
    .done(function(response) {
      console.log("Data Posted");
      refreshFunction
      toggleAddFileForm();

      setTimeout( function thumbnailLoad(){ 
        var eachImageSmall = $(".imageSmall");

        for( var i = 0; i < eachImageSmall.length; i++) {
            var element = eachImageSmall.eq(i);

            if(element.prop('currentSrc') == 'http://localhost:3030/') {
                $(element).attr("src", "http://localhost:3030/img/placeholder.svg");

            }
        }
      }  , 500 );

    })
    
    .fail(function(error) {
      console.log("Posting failed", error);
    })

  console.log("Your file data", fileData);
}


// Closes the Edit Form in case the user changes their mind
function cancelFileForm() {
  toggleAddFileFormVisibility();
}


// Edit data in DB
function editFileClick(id) {
    const file = window.fileList.find(file => file._id === id);

  if (file) {
    setFormData(file);
    toggleAddFileFormVisibility();
  }
}


// Clear Data from Form
function setFormData(data) {
  data = data || {};

  const file = {
    title: data.title || '',
    artist: data.artist || '',
    year: data.year || '',
    media: data.media || '',
    category: data.category || '',
    museum: data.museum || '',
    _id: data._id || '',
  };

  $('#file-title').val(file.title);
  $('#file-artist').val(file.artist);
  $('#file-year').val(file.year);
  $('#file-media').val(file.media);
  $('#file-category').val(file.category);
  $('#file-museum').val(file.museum);
  $('#file-id').val(file._id);
}


// Delete Data from DB
function deleteFileClick(id) {
  if (confirm('Are you sure you want to remove "' + $('#file-title').val() + '" from the Inventory?')) {
    $.ajax({
      type: 'DELETE',
      url: '/api/file/' + id,
      dataType: 'json',
      contentType : 'application/json',
    })
      .done(function(response) {
        console.log("File", id, "has been removed");
        refreshFileEntry();
        window.location.href = "/";
      })
      .fail(function(error) {
        console.log("File was not removed", error);
      })

  }
}


// Sort Categories via Nav Menu

var getCategory = $(".list-group-item");

function scrollToResults() {
  $( '.header-button' ).toggleClass( "close-nav" );  // closes Nav
  $( ".header-nav").css('display', 'none');

  $('html, body').stop(true, false).animate({     // animation to results
      scrollTop: $("#list-container").offset().top
  }, 2000);
}

function categorySort(event) {
  var buttonCategory =$(event.target).attr('category');   // Gets category associated with the Nav button clicked
  var getCategory = $(".list-group-item");


  for( var i = 0; i < getCategory.length; i++) {
      var element = getCategory.eq(i);
      var categoryValue = $(element).attr('category');

    if(buttonCategory != categoryValue) {
        $(element).addClass('sort-hide');   // hides entries with different category values

        scrollToResults();
    }

    // If there are no entries in that category:
    if($(getCategory).siblings(':not(.sort-hide)').length == 0){
      $("#list-container").append( "<div class='no-results'><p>There are no works of art matching this criteria in the Inventory yet. <br>If you have information about artwork that is missing, please submit it in the form above!</p> </div>");
      
      scrollToResults();
    }      
  } 

  // Add clear sort button after results
  $("#list-container").append("<div class='clear-sort'><button type='button' onclick='clearSort()'>Clear Sort</button></div>");

}

function clearSort() {
  $(".list-group-item").removeClass('sort-hide');
  $( ".clear-sort").remove();
  $( ".no-results").remove();
}



