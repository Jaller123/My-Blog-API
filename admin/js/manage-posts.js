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
                    <td class="editable" contenteditable="true">${pun.title}</td>

                    <td>${pun.author}</td>
                    <td>${pun.content}</td>
                    <td>${pun.tags}</td>
                    <td>${punDate.toLocaleDateString()}</td>
                    <td>
                        <button class="update-btn">Update</button> |
                        <button class="delete-btn" data-id="${pun._id}">Delete</button>
                    </td>
                </tr>
            `;
        }
        document.getElementById('pun-list-body').innerHTML = punsListHTML;

       /* This fetches the delete button and then adds an event listener to the 
         delete button to make it functional */
        let deleteBtns = document.querySelectorAll('.delete-btn');
        for (let btn of deleteBtns) {
            btn.addEventListener('click', async function (e) {
                e.preventDefault();
                const punIdToDelete = e.target.dataset.id;
                await deletePun(punIdToDelete);
            });
        }

        /* This fetches the update button and then adds an event listener to the 
         update button to make it functional */
        let updateBtns = document.querySelectorAll('.update-btn');
        for (let btn of updateBtns) {
            btn.addEventListener('click', async function (e) {
                e.preventDefault();
                const punIdToUpdate = e.target.closest('tr').dataset.id;
                const newFirstName = e.target.closest('tr').querySelector('.editable').textContent;
                await updatePun(punIdToUpdate, { title: newFirstName });
            });
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