const modalShow = document.getElementById('modal') //dot notation
// declaring a variable that is always equal to where the element on the document that is equal to "modal"
const modalClose = document.getElementById('modal-close')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')
const modalShow = document.getElementById('showModal')

// each of these lines get the elements from the html
// file and make them variables in javascript so they 
// can be manipulated and moved

let bookmarks = [] // empty array

function modalShow(){
    // Adds a new bookmark to a class within the modal
    modal.classList.add("show-modal")
    // When you hover your cursor over the website bookmark it will change
    websiteNameEl.focus()
}

// Sets a method that waits for the showModal button to be clicked on
modalShow.addEventListener("click", showModal)
// Sets a method that waits for the modalClose icon to be clicked on
modalClose.addEventListener("click", () => {
    // Removes the modal element from the class within the modal
    modalClose.classList.remove("show-modal")
})

// Sets a method that watches for if the user clicks anywhere within the window
window.addEventListener("click", (e) => {
    // Checks if the object that the event occured on is not the modal window for add bookmark, so if the user clicks anywhere but 
    e.target === modal ? modal.classList.remove("show-modal") : false
})

// Waits for the button to be clicked
modalClose.addEventListener("click", () => {
    // Removes it from a class within the modal
    modal.classList.remove("show-modal")
})

// Declares a function with the arguments of the website's name and URL
function validate(nameValue, urlValue) {
    /* Make sure that the text starts exactly with 'https',
    a back slash indicates a character that needs to escape, which declares that the text must follow with '//', 
    followed by 'www',
    then it declares letters from a-z (lowercase and uppercase). alongside numbers and a series of allowed
    special characters can appear in the domain name of the URL.
    then it declares letters from a-z (lowercase and uppercase). alongside numbers and a series of allowed
    special characters can appear in the domain of the URL.
     */
    const expression =
        /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-azA-z0-9():%_+.~#?&//=]*)/g //g at the end stansd for global
    //url validation
    // Sets the immutable variable of regex as a RegularExpression of the expression variable
    const regex = new RegExp(expression)
    // If the name or URL value is not present
    if(!nameValue || !urlValue){
        // Shows error message to user
        alert("Please submit values for both fields")
        return false
    }
    // If the URL does not meet the RegEx requirements    
    if(!urlValue.match(regex)){
        // Show error message to user
        alert("Please provide a val id web address")
        return false
    }
    // If values provided are valid, return true
    return true
}

// Declares a function with no arguments
function buildBookmarkDOM() {
    // Clears bookmark DOM contents
    bookmarksContainer.textContent = ""

    // Iterates over each element in the bookmarks list
    bookmarks.forEach((bookmark) => {
        // Sets an immutable variable for bookmark that has the name and url properties
        const {name, url} = bookmark
        //console.log(name, url)

        // Sets an immutable variable to a new element within the DOM
        const item = document.createElement("div")
        // Adds the DOM div to the item's class list
        item.classList.add("item")
        
        // Sets an immutable variable to a new DOM icon element
        const closeIcon = document.createElement("i")
        // Adds a new close/delete icon to the new div element
        closeIcon.classList.add("fas", "fa-times")
        // Sets a title attribute property within the icon tag 
        closeIcon.setAttribute("title", "Delete Bookmark")
        // Sets an onclick attribute property within the icon tag that calls a method to delete that bookmark
        closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`)    
        
        // Sets an immutable variable to a new DOM div element
        const linkInfo = document.createElement("div")
        // Adds a name to the linkInfo's list
        linkInfo.classList.add("name")

        // Sets an immutable variable to a new DOM icon(image) element 
        const favicon = document.createElement("img")
        // Sets a src attribute to the favicon element that links to the website of the corresponding bookmark
        favicon.setAttribute(
            "src", url
        )
        // Sets an alternate text attribute for the favicon element 
        favicon.setAttribute("alt", "FavIcon")

        // Sets an immutable variable to a new DOM a/link element 
        const link = document.createElement("a")
        // Sets an href attribute to the a element to link it to the website of the corresponding bookmark
        link.setAttribute("href", `${url}`)
        // Sets a target attribute to the a element to do i have no idea
        link.setAttribute("target", "_blank")
        // Sets the text of the a element to the website name 
        link.textContent = name

        // Adds the link icon and element to the end of the linkInfo element
        linkInfo.append(favicon, link)
        // Adds the closing icon and link info to the end of the item element
        item.append(closeIcon, linkInfo)
        // Adds the item to the end of the bookmarksContainer box
        bookmarksContainer.appendChild(item)
        // 
        
    })
}

// Fetch bookmarks
function fetchbookmarks(){
    // JSON parse takes a string and converts it to an object
    // Get a bookmark from a local storage, if it exists
    if (localStorage.getItem("bookmarks")){
        // Turns the local storage bookmark string into an object and adds it to the bookmarks array
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
        
    }
    // If there are no pre-existing bookmarks in the user's local storage
    else{
        // Create bookmarks array and add a sample bookmark object into it
        bookmarks = [
            {
            name: "Google",
            url: "https://www.google.com"
        }
    ]
    // Turns the objects in the bookmarks array into JSON string 
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }
    buildBookmarkDOM()
}

// Delete bookmark
function deleteBookmark(url){
    //pass the url, loop through the bookmarks array
    // and if matched then delete bookmark
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url){
            bookmark.splice(i, 1) // delete bookmark from teh array at index i and remove 1 item
        }
    })
    // Update bookmarks array in local storage, repopulate the DOM.closeicon
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    fetchbookmarks()
}
// Handle data from form input
// Passes e/event as an argument
function storeBookmark(e){
    // Stop the normal events from occuring unless explicitly stated
    e.preventDefault()

// Sets an immutable variable to the value of the website name element
const nameValue = websiteNameEl.value 
// Sets a mutable variable to the value of the website URL element
let urlValue = websiteUrlEl.value 

// If the URL does not include an http or https prefix
if(!urlValue.includes("http://", "https://")){
    // Attaches an https:// prefix to the URL value variable
    urlValue = `https://${}`
}
// Outputs the name and URL of a bookmark for error c
console.log(nameValue, urlValue)

// If the bookmark cannot be validated, return false
if (!validate(nameValue, urlValue)){
    return false
}

// Creates a bookmark object with the nameValue and urlValue properties
const bookmark = {
    name: nameValue, 
    url: urlValue
}

// Adds the bookmark object just created to the end of the bookmarks array
bookmarks.push(bookmark)
// Converts the bookmarks array to a JSON string file in local storage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

fetchbookmarks() //updates list of bookmarks on the page

bookmarkForm.reset() 
websiteNameEl.focus()
}
// Adds an event listener to watch out for the submit button being clicked, saves bookmark
bookmarkForm.addEventListener("submit", storeBookmark)
// On load, fetch new bookmarks
fetchbookmarks()

