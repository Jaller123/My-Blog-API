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

                    <p>${pun.author} ${punDate.toLocaleDateString()}</p>
                    
                    <td><p>${pun.tags}</p></td>
                    <p>${pun.content.slice(0, 100)}</p>
                    <a href="post.html">Read more</a>
                </tr>
            `;
        }
        document.getElementById('pun-list-body').innerHTML = punsListHTML;
    } catch (error) {
        console.error('Error fetching puns:', error);
    }
}