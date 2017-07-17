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

function categorySort(event) {
  var buttonCategory =$(event.target).attr('category');   // Gets category associated with the Nav button clicked
  var getCategory = $(".list-group-item");
  console.log(buttonCategory);

  for( var i = 0; i < getCategory.length; i++) {
      var element = getCategory.eq(i);
      var categoryValue = $(element).attr('category');
      console.log(categoryValue);

    if(buttonCategory != categoryValue) {
        $(element).addClass('sort-hide');
        $( '.header-button' ).toggleClass( "close-nav" );
        $( ".header-nav" ).css('display', 'none');
    }
          
  } 


}








