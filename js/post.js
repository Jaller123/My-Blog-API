
    //Looks for the "id" parameter in the URL.
    const urlParams = new URLSearchParams(window.location.search);
    const punId = urlParams.get('id');

    //Returns if the "id" is found
    fetchPostDetails(punId);
    
    async function fetchPostDetails(id) 
    {
        try 
        {
            const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${id}`);
            const post = await response.json();
            console.log(post)
        

            // Fill up the content in the HTML
            document.getElementById('post-content').innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.author} ${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.tags}</p>
                <p>${post.content}</p>
            `;
        } 

        catch (error) 
            {
                console.error('Error fetching post details:', error);
            }
    }
