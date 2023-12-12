async function fetchPostDetails(id) {
    const urlParams = new URLSearchParams(window.location.search);
    const punId = urlParams.get('id');

    console.log('punId:', punId);

    if (punId) {
        try {
            const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${id}`);
            const pun = await response.json();

            console.log('Fetched post details:', pun);

            // Fyll innehållet i HTML
            document.getElementById('post-content').innerHTML = `
                <h2>${pun.title}</h2>
                <p>${pun.author} ${new Date(pun.date).toLocaleDateString()}</p>
                <p>${pun.tags}</p>
                <p>${pun.content}</p>
            `;
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    } else {
        console.error('Pun ID is missing in the URL.');
    }
}