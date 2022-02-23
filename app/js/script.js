const adviceId=document.querySelector('#A-ID');
const advice = document.querySelector('#advice-text');
const btn = document.querySelector('.dice-container');
let message;


async function getAdvice(){
    const random= Math.floor(Math.random()*200);
    const API_URL= `https://api.adviceslip.com/advice/${random}`;

    try {
         message = await fetch(API_URL).then(response =>{return response.json();})
        adviceId.textContent= message.slip.id;
    if (message.slip.advice.length > 50) {
        advice.classList.add('long');
        advice.classList.remove('advice-text');
    }
    else{
        advice.classList.remove('long');
        advice.classList.add('advice-text');
    }
        advice.textContent = `"${message.slip.advice}"`;
    }
    catch (err) {
    }
}

btn.addEventListener("click",() => {
    
    getAdvice();
});
// on load
    getAdvice();
