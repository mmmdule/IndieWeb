let params = new URLSearchParams(document.location.search);
let postIndex = parseInt(params.get("i"));

let blogObj = {};

const blogDataUrl = 'https://raw.githubusercontent.com/mmmdule/IndieWeb/blog/data/blog.json';

// HTML DOM elements
const blogTitle = document.querySelector("#blogPostWindow > .windowTitle");
const blogLead = document.querySelector(".windowContent > .windowBlogLead");
const blogContent = document.querySelector("#blogPostWindow > .windowContent");

try {
    const response = await fetch(blogDataUrl);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const blogPost = (await response.json())[postIndex];
    blogTitle.textContent = blogPost.title;
    blogLead.textContent = blogPost.lead;
    blogContent.innerHTML = blogLead.outerHTML + blogPost.content;
} catch (error) {
    blogTitle.textContent = "Something went wrong!";
    blogLead.textContent = "It really didn't go right.";
    blogContent.innerHTML = blogLead.outerHTML + "<p>Check the url, your Internet connection etc.<p>";
}