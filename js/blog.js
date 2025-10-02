let params = new URLSearchParams(document.location.search);
let postIndex = parseInt(params.get("i"));

let blogObj = {};

const blogDataUrl = '../data/blog.json';

// HTML DOM elements
const blogTitle = document.querySelector("#blogPostWindow > .windowTitle");
const blogContent = document.querySelector("#blogPostWindow > .windowContent");

try {
    const response = await fetch(blogDataUrl);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const blogPost = (await response.json())[postIndex];
    blogTitle.innerHTML = blogPost.title;
    blogContent.innerHTML = blogPost.content;
} catch (error) {
    console.error(error.message);
}