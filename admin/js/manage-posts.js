async function fetchAllPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        // Table header and styles
        let postsListHTML = `
            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
                <thead>
                    <tr>
                        <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2;">Title</th>
                        <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2;">Author</th>
                        <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2;">Tags</th>
                        <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2;">Date</th>
                        <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2;">Manage</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Loop through all the data
        for (let post of posts) {
            let postDate = new Date(post.date);
            // Apply the data in the HTML
            postsListHTML += `
                <tr data-id="${post._id}">
                    <td class="editable" style="border:1px solid #ddd;padding:8px;">${post.title}</td>
                    <td style="border:1px solid #ddd;padding:8px;">${post.author}</td>
                    <td style="border:1px solid #ddd;padding:8px;">${post.tags}</td>
                    <td style="border:1px solid #ddd;padding:8px;">${postDate.toLocaleDateString()}</td>
                    <td style="border:1px solid #ddd;padding:8px;">
                        <button style="padding:5px 10px;margin-right:5px;cursor:pointer;" onclick="updatePost('${post._id}')">Update</button>
                        <button style="padding:5px 10px;margin-right:5px;cursor:pointer;" onclick="deletePost('${post._id}')">Delete</button>
                    </td>
                </tr>
            `;
        }

      
        postsListHTML += `</tbody></table>`;

        // Set the generated HTML in the 'pun-list' element
        document.getElementById('pun-list').innerHTML = postsListHTML;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Function to update a post (replace with your actual update logic)
function updatePost(postId) {
    console.log('Update post with ID:', postId);
    // Implement your update logic here
}

// Function to delete a post (replace with your actual delete logic)
async function deletePost(postId) {
    try {
        // Fetch post details before deletion
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const post = await response.json();
        
        
        // Make a DELETE request to the API to delete the post
        const deleteResponse = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`,
        {
            method: 'DELETE',
        });

        console.log(`Post with ID: ${postId} deleted successfully`);

        // Use DOM Method .remove to completely remove the post off the list.
        const postElement = document.querySelector(`tr[data-id="${postId}"]`);
        postElement.remove();
      
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// Call the function with the post ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const postIdToDelete = urlParams.get('id');
deletePost(postIdToDelete);

// Call the function to fetch all posts
fetchAllPosts();