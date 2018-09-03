$('#searchInput').keyup(function(event) {
  if (event.keyCode === 13) {
    handleSearchRequest()
  }
})

function handleSearchRequest() {
  let searchString = $('#searchInput').val()
  listViewLayout()
  getSearchResults(searchString)
}

function listViewLayout() {
  $('.menu').addClass('menu-list')
  $('.wrapper').css('height', 'auto')
  $('#resultsContainer').addClass('resultsContainer')
}

function getSearchResults(str) {
  let apiUrl =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&formatversion=2&srsearch=' +
    encodeURI(str) +
    '&prop=info|extracts&inprop=url&callback=?'
  $.getJSON(apiUrl, function(data) {
    let results = data.query.search
    displayResults(results)
    $('#searchInput').val('')
  })
}

function displayResults(resultsArr) {
  let resultsUl = document.querySelector('ul')
  resultsUl.innerHTML = ''
  resultsArr.forEach(function(entry) {
    let html = ''
    html +=
      '<li><a class="entry-link" target="_blank" href="https://en.wikipedia.org/?curid=' +
      entry.pageid +
      '">'
    html += '<h5>' + entry.title + '</h5><p>' + entry.snippet + '</p></a></li'
    $(html).appendTo(resultsUl)
  })
}
