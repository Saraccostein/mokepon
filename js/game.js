/* 🕹️ Game start */
const hipodogePng = 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png'
const capipepoPng = "assets/capipepo.png"
const ratigueyaPng = 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png'

window.addEventListener('load', start);

const playerPonButton = document.getElementById('choosePonButton');

const cardsContainer = document.getElementById('ponButtons');

// Elements
const elementsImput = document.getElementById('elementsToAtack');
const fireInput = document.getElementById('fire');
const waterInput = document.getElementById('water');
const earthInput = document.getElementById('earth');

/* Monsters */
const choosePonInteractiveMessage = document.getElementById('choosePonMessages');

const enemyPonName = document.getElementById('enemyPon');
const playerPonName = document.getElementById('playerPon');

/* For Atack Section */
const playerPonAtackCard = document.getElementById('playerPonAtackMode');
const enemyPonAtackCard = document.getElementById('enemyPonAtackMode');

const chooseSection = document.getElementById("choosePon");
const atackSection = document.getElementById('chooseAtack');

const playerhearts = [
    document.getElementById('playerPonHeart-0'),
    document.getElementById('playerPonHeart-1'),
    document.getElementById('playerPonHeart-2')
];
const enemyhearts = [
    document.getElementById('enemyPonHeart-0'),
    document.getElementById('enemyPonHeart-1'),
    document.getElementById('enemyPonHeart-2')
];

const victories = document.getElementById('victories');
const defeats = document.getElementById('defeats');
const messagesSection = document.getElementById('log');
const rebootSection = document.getElementById('reboot');
const logText = document.getElementById('result');

/* 🐾 Pon Choice */
let mokeponesAvailable
let selectionConfirmation = false;

/* 🥊 Atacks */
let playerAtack;
let enemyAtack;
let playerLife = 3;
let enemyLife = 3;
let gamesWon = 0;
let gamesLoose = 0;
let gamesTie = 0;

let hipodogeInput;
let capipepoInput;
let ratigueyaInput;
let hipodogeLabel;
let capipepoLabel;
let ratigueyaLabel;

class Mokepon {
    constructor(name, photo, life) {
        this.name = name
        this.photo = photo
        this.life = life
        this.attacks = []
    }
}

let mokepones = []
let hipodoge = new  Mokepon('Hipodoge', 'assets/hipodoge.png', 3);
let capipepo = new  Mokepon('Capipepo', 'assets/capipepo.png', 3);
let ratigueya = new  Mokepon('Ratigueya', 'assets/ratigueya.png', 3);
mokepones.push(hipodoge, capipepo, ratigueya)

hipodoge.attacks.push(
    {name: '💥', id: 'hit'},
    {name: '🛡️', id: 'shield'},
    {name: '💧', id: 'water'},
    {name: '🌊', id: 'tsunami'},
    {name: '❄️', id: 'snow'}
);

capipepo.attacks.push(
    {name: '💥', id: 'hit'},
    {name: '🛡️', id: 'shield'},
    {name: '🌱', id: 'earth'},
    {name: '🍃', id: 'blades'},
    {name: '☘️', id: 'fortune'}
);

ratigueya.attacks.push(
    {name: '💥', id: 'hit'},
    {name: '🛡️', id: 'shield'},
    {name: '🔥', id: 'earth'},
    {name: '🌋', id: 'volcano'},
    {name: '❤️‍🔥', id: 'self-esteem'}
);

mokepones.push();

function start()
{
    atackSection.style.display = 'none';
    messagesSection.style.visibility = 'hidden';
    rebootSection.style.visibility = 'hidden';

    mokepones.forEach((mokepon) => {
        mokeponesAvailable = `
        <input type="radio" name="myPon" id=${mokepon.name} />
    
        <label for=${mokepon.name} id=${mokepon.name + '_label'} class="ponLabel">
            <img src=${mokepon.photo} alt=${mokepon.name}>
            <p>Hipodoge</p>
        </label>
        `
        cardsContainer.innerHTML += mokeponesAvailable;

        hipodogeInput = document.getElementById('Hipodoge');
        capipepoInput = document.getElementById('Capipepo');
        ratigueyaInput = document.getElementById('Ratigueya');

        hipodogeLabel = document.getElementById('Hipodoge_label');
        capipepoLabel = document.getElementById('Capipepo_label');
        ratigueyaLabel = document.getElementById('Ratigueya_label');
    });

    playerPonButton.addEventListener('click', playerPonChoice);

    /* 👩🏻 Player Atack */
    
    // 🔥 Fire
    fireInput.addEventListener('click', fireAtack);

    // 💧 Water
    waterInput.addEventListener('click', waterAtack);

    // 🌱 Earth
    earthInput.addEventListener('click', earthAtack);

    // Reboot Game 🔄️
    const reload = document.getElementById('reboot_button');
    reload.addEventListener('click', reboot);

    hipodogeLabel.addEventListener('click', hipodogeFocus);
    capipepoLabel.addEventListener('click', capipepoFocus);
    ratigueyaLabel.addEventListener('click', ratigueyaFocus);
}
function random(max, min)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function fireAtack()
{
    playerAtack = 'fuego 🔥';
    enemyAtackChoice();
    messagesSection.style.visibility = 'visible';
}
function waterAtack()
{
    playerAtack = 'agua 💧';
    enemyAtackChoice();
    messagesSection.style.visibility = 'visible';
}
function earthAtack()
{
    playerAtack = 'tierra 🌱';
    enemyAtackChoice();
    messagesSection.style.visibility = 'visible';    
}
function enemyAtackChoice()
{
    let randomAtack = random(3,1);

    if (randomAtack == 1) {
        enemyAtack = 'fuego 🔥';

    } else if (randomAtack == 2) {
        enemyAtack = 'agua 💧';

    } else if (randomAtack = 3) {
        enemyAtack = 'tierra 🌱';
    }
    battle();
}
function battle()
{
    if (playerAtack == 'fuego 🔥' && enemyAtack == 'tierra 🌱') {
        message(logText, 'Acertaste el ataque.', 'win');
        enemyLife--;
        gamesWon++;
        hurt(enemyLife, enemyhearts, 'Ganaste la batalla 🎊');
    
    } else if (playerAtack == 'agua 💧' && enemyAtack == 'fuego 🔥') {
        message(logText, 'Acertaste el ataque.', 'win');
        enemyLife--;
        gamesWon++;
        hurt(enemyLife, enemyhearts, 'Ganaste la batalla 🎊');
    
    } else if (playerAtack == 'tierra 🌱' && enemyAtack == 'agua 💧') {
        message(logText, 'Acertaste el ataque.', 'win');
        enemyLife--;
        gamesWon++;
        hurt(enemyLife, enemyhearts, 'Ganaste la batalla 🎊');
    
    } else if (playerAtack == enemyAtack) {
        message(logText, 'Ha sido un empate.', 'tie');
        gamesTie ++;
    
    } else {
        message(logText, 'El oponente acertó.', 'loose');
        playerLife--;
        gamesLoose++;
        hurt(playerLife, playerhearts, 'Perdiste la batalla 😓');
    }
    victories.innerHTML = gamesWon;
    defeats.innerHTML = gamesLoose;
}
function message(id, message, activeClass) {
    id.innerHTML = message;
    if (activeClass == 'win') {
        id.classList.add('win');
        id.classList.remove('loose');
        id.classList.remove('tie');

    } else if (activeClass == 'loose') {
        id.classList.add('loose');
        id.classList.remove('win');
        id.classList.remove('tie');

    } else {
        id.classList.add('tie');
        id.classList.remove('loose');
        id.classList.remove('win');
    }
}
function hurt(fighterLife, fighterHearts, message) {

    if (fighterLife == 2) {
        fighterHearts[0].src = 'assets/heart.svg';
        fighterHearts[1].src = 'assets/heart.svg';
        fighterHearts[2].src = 'assets/heart_gray.svg';
    
    } else if (fighterLife == 1) {
        fighterHearts[0].src = 'assets/heart.svg';
        fighterHearts[1].src = 'assets/heart_gray.svg';
        fighterHearts[2].src = 'assets/heart_gray.svg'; 

    } else {
        fighterHearts[0].src = 'assets/heart_gray.svg';
        fighterHearts[1].src = 'assets/heart_gray.svg';
        fighterHearts[2].src = 'assets/heart_gray.svg';

        logText.innerHTML = message;
        disableButtons();
    }
}
function disableButtons() {

    fireInput.disabled = true;
    waterInput.disabled = true;
    earthInput.disabled = true;
    elementsImput.style.visibility = 'hidden';
    rebootSection.style.visibility = 'visible';
}
function hipodogeFocus()
{
    hipodogeLabel.classList.add('hipodoge_focused');
    capipepoLabel.classList.remove('capipepo_focused');
    ratigueyaLabel.classList.remove('ratigueya_focused');
    cleanMessages(choosePonInteractiveMessage, playerPonButton);
}
function capipepoFocus()
{
    hipodogeLabel.classList.remove('hipodoge_focused');
    capipepoLabel.classList.add('capipepo_focused');
    ratigueyaLabel.classList.remove('ratigueya_focused');
    cleanMessages(choosePonInteractiveMessage, playerPonButton);
}
function ratigueyaFocus()
{
    hipodogeLabel.classList.remove('hipodoge_focused');
    capipepoLabel.classList.remove('capipepo_focused');
    ratigueyaLabel.classList.add('ratigueya_focused');
    cleanMessages(choosePonInteractiveMessage, playerPonButton);
}
function playerPonChoice() // 👩🏻 Player choice
{
    if (hipodogeInput.checked == true) {
        playerPonName.innerHTML = 'Hipodoge (tú)'
        
        selectionConfirmation = true;
        enemyPonChoice();

        playerPonAtackCard.src = hipodogePng;
        playerPonAtackCard.style.transform = "scaleX(-1)";
        displayAtackSection();

    } else if (capipepoInput.checked == true) {
        playerPonName.innerHTML = 'Capipepo (tú)'
        selectionConfirmation = true;
        enemyPonChoice();

        playerPonAtackCard.src = capipepoPng;
        displayAtackSection();

    } else if (ratigueyaInput.checked == true) {
        playerPonName.innerHTML = 'Ratigueya (tú)'
        selectionConfirmation = true;
        enemyPonChoice();

        playerPonAtackCard.src = ratigueyaPng;
        displayAtackSection();

    } else {
        choosePonInteractiveMessage.style.color = 'var(--red)';
        choosePonInteractiveMessage.innerHTML = 'Selecciona tu mokepon.';

        issueStyle(playerPonButton);
    }
}
function issueStyle(element) {
    element.className = 'issue';
}
function cleanMessages(messageId, buttonId) {
    
    /* Clean messages */
    messageId.innerHTML = '';
    buttonId.classList.remove('issue')
}
function displayAtackSection()
{
    atackSection.style.display = 'grid';
    chooseSection.style.display = 'none';
}
function enemyPonChoice()  // 👤 Enemy Choice
{
    let randomPon = random(3,1);

    if (randomPon == 1) {
        enemyPonName.innerHTML = 'Hipodoge';
        enemyPonAtackCard.src = hipodogePng;

    } else if (randomPon == 2) {
        enemyPonName.innerHTML = 'Capipepo';
        enemyPonAtackCard.src = capipepoPng;

    } else {
        enemyPonName.innerHTML = 'Ratigueya';
        enemyPonAtackCard.src = ratigueyaPng;
        enemyPonAtackCard.style.transform = "scaleX(-1)";
    }
}
function reboot() 
{
    location.reload()
}