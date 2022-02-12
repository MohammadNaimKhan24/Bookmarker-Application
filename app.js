// Select Items
const form = document.getElementById("myForm");

// Event Listener
form.addEventListener("submit", saveBookmark);

// FUNCTIONS

// Save Bookmark
function saveBookmark(e) {
  // Get form values
  const siteName = document.getElementById("siteName").value;
  const siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  // Create Bookmark
  const bookmark = {
    name: siteName,
    url: siteUrl,
  };

  // Local Storage Test

  /* localStorage.setItem('test', 'Hello World!');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test')); 
  */

  // Test if bookmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    // Init Array
    let bookmarks = [];
    // Add To Array
    bookmarks.push(bookmark);
    // Set To LocalStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get Bookmarks From LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to LocalStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    bookmarks = null;
  }
  
  // Clear Form
  form.reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form submitting
  e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
  // Get bookmark from LocalStorage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Loop through bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }

  // Re-set back to LocalStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from LocalStorage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Get output id
  const bookmarksResults = document.getElementById("bookmarksResults");
  // Build Output
  bookmarksResults.innerHTML = " ";
  for (let i = 0; i < bookmarks.length; i++) {
    const name = bookmarks[i].name;
    const url = bookmarks[i].url;

    bookmarksResults.innerHTML += `
      <div class="format">
        <h2 class="h2 text-white">${name}
          <a class="btn btn-info visit" target="_blank" href="${url}">Visit</a>
          <a class="btn btn-danger delete" onclick="deleteBookmark('${url}')"  href="#">Delete</a>
        </h2>
      </div>
      <br>
    `;
  }
}

// Validate Bookmark
function validateForm(siteName, siteUrl) {
  // checking if submit this without value or null value
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  // Validate URL with regex
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
