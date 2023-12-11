async function fetchAllPuns() {
  try {
      const response = await fetch('https://blog-api-assignment.up.railway.app/posts/6574230831b9d5002a636c4d');
      const puns = await response.json();
      console.log(puns);

      let punsListHTML = "";
      for (let pun of puns) 
      {
          let punDate = new Date(pun.date);

          punsListHTML += `
              <tr data-id="${pun._id}">
                  <h2 class="editable" contenteditable="true">${pun.title}</h2>
                  <p>${pun.author}</p>
                  <p>${punDate.toLocaleDateString()}<p>
                  <p>${pun.tags}</p>
                  <p>${pun.content}</p>
              </tr>
          `;
      }

     
      document.getElementById('pun-list-body').innerHTML = punsListHTML;
  } catch (error) {
      console.log(error);
  }
}