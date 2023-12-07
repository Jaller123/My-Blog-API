fetchAllPosts();

async function fetchAllPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();
        console.log(posts)

        let postsListHTML = "";
        for (let post of posts) {
            let postDate = new Date(post.date)

            postsListHTML += `
                <li class="list-group-item">
                    <p>${post.content} <br> <span class="date">- ${postsDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()} ${postDate.toLocaleTimeString()}</span> </p>
                    
                    <div>
                        <a href="update-pun.html?id=${post._id}">Update</a> |
                        <a href="#" data-id="${post._id}" class="delete-links">Delete</a> 
                    </div>
                </li>
            `
        }

        document.getElementById('post-list').innerHTML = postsListHTML;
    } catch(error) {
        console.log(error)
    }   
    const deleteLinks = document.getElementsByClassName('delete-links');
    console.log(deleteLinks)

    for (let link of deleteLinks) {
        link.addEventListener('click', async function(e) {
            if (e.target.classname === 'delete-link') {

            }
            e.preventDefault();
            let postId = e.target.dataset.id;
            let response = await fetch(' https://blog-api-assignment.up.railway.app/posts/' + postId, {
                method: `DELETE`
            });
            
            if(response.ok) {
                e.target.parentNode.parentNode.remove();
            }
        })
    }
}