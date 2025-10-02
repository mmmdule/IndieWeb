let params = new URLSearchParams(document.location.search);
let postIndex = parseInt(params.get("i"));

let blogObj = {};
const blogPosts = [];

const blogDataUrl = 'https://raw.githubusercontent.com/mmmdule/IndieWeb/blog/data/blog.json?v=1';

async function loadPost() {
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
}


//TODO: look into only loading the whole JSON on the "blog.html" page, and then "cache" it in localStorage
//      if localstorage is empty or doesn't have the index you asked for, run the JSON fetch to check if the post exists
async function showPosts() {
    const blogPostDiv = document.querySelector("#blogPosts");
    const response = await fetch(blogDataUrl);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    blogPosts.push(...(await response.json()));
    let counter = 0;
    blogPosts.forEach(b => {
        blogPostDiv.innerHTML += `<div class="windowParent" id="blogPostWindow"
        style="width: 800px; height: fit-content; margin: 1.5em auto; font-size: 1em;">
        <h2 class="windowTitle left">${b.title}</h2>
        <div class="windowContent">
            <p class="windowBlogLead">${b.lead}</p>
            <a href="./blogPost.html?i=${counter++}">Read More >>></a>
        </div>
    </div>`
    });
}