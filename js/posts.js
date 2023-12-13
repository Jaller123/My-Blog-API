async function fetchAllPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json(); 

        // Loops through all the data
        let postsListHTML = "";
        for (let post of posts) {
            let postDate = new Date(post.date);
            // Applies the data in the HTML
            postsListHTML += `
                <tr data-id="${post._id}">
                    <h2 class="editable" contenteditable="true">${post.title}</h2>
                    <p>${post.author} ${postDate.toLocaleDateString()}</p>
                    <p>${post.tags}</p>
                    <p>${post.content.slice(0, 100)}</p>
                    <a href="post.html?id=${post._id}">Read more</a>
                </tr>
            `;
            // Slice limits the characters to 100 only.
            /* The link href to ${post._id} refers to sending data from this
            page to the post.js */
        }
        document.getElementById('pun-list-body').innerHTML = postsListHTML;
    } catch (error) {
        console.error('Error fetching puns:', error);
    }
}

// Call the function
fetchAllPosts();