fetchAllPuns();

async function fetchAllPuns() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const puns = await response.json();

        let punsListHTML = "";
        for (let pun of puns) {
            let punDate = new Date(pun.date);


            punsListHTML += `
                <tr data-id="${pun._id}">
                    <h2 class="editable" contenteditable="true">${pun.title}</h2>

                    <p>${pun.author} ${punDate.toLocaleDateString()}<p>
                    
                     <p>${pun.tags}</p>
                     <p>${pun.content.slice(0, 100)}</p> 
                    <a href="post.html">Read more</a>

                </tr>
            `;
        }
        document.getElementById('pun-list-body').innerHTML = punsListHTML;

       /* This fetches the delete button and then adds an event listener to the 
         delete button to make it functional */
   {
            {
         
            };
        }

        /* This fetches the update button and then adds an event listener to the 
         update button to make it functional */
        {
         {
                
         };
        }
    } catch (error) {
        console.log(error);
    }
}

async function deletePun(punId) {
    try {
        await fetch(`https://blog-api-assignment.up.railway.app/posts/${punId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // Remove the pun from the DOM
        document.querySelector(`[data-id="${punId}"]`).remove();
    } catch (error) {
        console.error(error);
    }
}

async function updatePun(punId, newData) {
    try {
        await fetch(`https://blog-api-assignment.up.railway.app/posts/${punId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
        // Reload the page or update the data in the DOM as needed
        // For simplicity, reloading the page here
        location.reload();
    } catch (error) {
        console.error(error);
    }
}