const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// }) 


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value
    if (!location){
       return messageOne.textContent = "You must enter an address";
    }
    messageOne.textContent = "Loading ..."; 
    messageTwo.textContent = ''; 
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if (data.error) {
           return messageOne.textContent = data.error;
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
    })
}) 
})
''