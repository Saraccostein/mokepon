/* 🕹️ Game start */
const hipodogePng = 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png'
const capipepoPng = 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png'
const ratigueyaPng = 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png'

window.addEventListener('load', start);
let logText = document.getElementById('result');

function start()
{
    let atackSection = document.getElementById('chooseAtack');
    let messagesSection = document.getElementById('log');
    let rebootSection = document.getElementById('reboot');

    atackSection.style.display = 'none';
    messagesSection.style.visibility = 'hidden';
    rebootSection.style.visibility = 'hidden';

    let playerPonButton = document.getElementById('choosePonButton');
    playerPonButton.addEventListener('click', playerPonChoice);

    /* 👩🏻 Player Atack */
    
    // 🔥 Fire
    let fireInput = document.getElementById('fire');
    fireInput.addEventListener('click', fireAtack);

    // 💧 Water
    let waterInput = document.getElementById('water');
    waterInput.addEventListener('click', waterAtack);

    // 🌱 Earth
    let earthInput = document.getElementById('earth');
    earthInput.addEventListener('click', earthAtack);

    // Reboot Game 🔄️
    let reload = document.getElementById('reboot_button');
    reload.addEventListener('click', reboot);
}

function random(max, min)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* 🥊 Atacks */
let playerAtack;
let enemyAtack;

function fireAtack()
{
    playerAtack = 'fuego 🔥';
    enemyAtackChoice();

    let messagesSection = document.getElementById('log');
    messagesSection.style.visibility = 'visible';
}

function waterAtack()
{
    playerAtack = 'agua 💧';
    enemyAtackChoice();

    let messagesSection = document.getElementById('log');
    messagesSection.style.visibility = 'visible';
}

function earthAtack()
{
    playerAtack = 'tierra 🌱';
    enemyAtackChoice();

    let messagesSection = document.getElementById('log');
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

let playerLife = 3;
let enemyLife = 3;

let gamesWon = 0;
let gamesLoose = 0;
let gamesTie = 0;

function battle()
{
    let gameLog = document.getElementById('log');
    
    gameLog.appendChild(logText);

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

    let victories = document.getElementById('victories');
    let defeats = document.getElementById('defeats');
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

let playerhearts = [
    document.getElementById('playerPonHeart-0'),
    document.getElementById('playerPonHeart-1'),
    document.getElementById('playerPonHeart-2')
];

let enemyhearts = [
    document.getElementById('enemyPonHeart-0'),
    document.getElementById('enemyPonHeart-1'),
    document.getElementById('enemyPonHeart-2')
];

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

    // 🔥 Fire
    let fireInput = document.getElementById('fire');
    fireInput.disabled = true;

    // 💧 Water
    let waterInput = document.getElementById('water');
    waterInput.disabled = true;

    // 🌱 Earth
    let earthInput = document.getElementById('earth');
    earthInput.disabled = true;

    let elementsImput = document.getElementById('elementsToAtack');
    elementsImput.style.visibility = 'hidden';

    let rebootSection = document.getElementById('reboot');
    rebootSection.style.visibility = 'visible';
}
/* 🐾 Pon Choice */
var selectionConfirmation = false;

let playerPonButton = document.getElementById('choosePonButton');
let choosePonInteractiveMessage = document.getElementById('choosePonMessages');

let hipodogeLabel = document.getElementById('hipodoge_label');
let capipepoLabel = document.getElementById('capipepo_label');
let ratigueyaLabel = document.getElementById('ratigueya_label');

hipodogeLabel.addEventListener('click', hipodogeFocus);
capipepoLabel.addEventListener('click', capipepoFocus);
ratigueyaLabel.addEventListener('click', ratigueyaFocus);

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
    /* Monsters */
    let hipodogeInput = document.getElementById('hipodoge');
    let capipepoInput = document.getElementById('capipepo');
    let ratigueyaInput = document.getElementById('ratigueya');

    /* For Atack Section */
    let playerPonAtackCard = document.getElementById('playerPonAtackMode')

    /* Player Mokepon Choice */
    let playerPonName = document.getElementById('playerPon');

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
    let atackSection = document.getElementById('chooseAtack');
    atackSection.style.display = 'grid';

    let chooseSection = document.getElementById('choosePon');
    chooseSection.style.display = 'none';
}

function enemyPonChoice()  // 👤 Enemy Choice
{
    let enemyPonAtackCard = document.getElementById('enemyPonAtackMode')
    let enemyPonName = document.getElementById('enemyPon');
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