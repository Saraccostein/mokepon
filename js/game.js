/* 🕹️ Game start */
window.addEventListener('load', start);

let logText = document.getElementById('result');

function start()
{
    let atackSection = document.getElementById('chooseAtack');
    let messagesSection = document.getElementById('log');
    let rebootSection = document.getElementById('reboot');

    atackSection.style.display = 'none';
    messagesSection.style.display = 'none';
    rebootSection.style.display = 'none'

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
    messagesSection.style.display = 'flex';
}

function waterAtack()
{
    playerAtack = 'agua 💧';
    enemyAtackChoice();

    let messagesSection = document.getElementById('log');
    messagesSection.style.display = 'flex';
}

function earthAtack()
{
    playerAtack = 'tierra 🌱';
    enemyAtackChoice();

    let messagesSection = document.getElementById('log');
    messagesSection.style.display = 'flex';    
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

function battle()
{

    let gameLog = document.getElementById('log');
    
    gameLog.appendChild(logText);

    if (playerAtack == 'fuego 🔥' && enemyAtack == 'tierra 🌱') {
        winnerMessage = '🏆 Haz ganado';
        enemyLife--;
        hurt(enemyLife, enemyhearts, 'Ganaste la batalla 🎺🎊');
    
    } else if (playerAtack == 'agua 💧' && enemyAtack == 'fuego 🔥') {
        winnerMessage = '🏆 Haz ganado';
        enemyLife--;
        hurt(enemyLife, enemyhearts, 'Ganaste la batalla 🎺🎊');
    
    } else if (playerAtack == 'tierra 🌱' && enemyAtack == 'agua 💧') {
        winnerMessage = '🏆 Haz ganado';
        enemyLife--;
        hurt(enemyLife, enemyhearts, 'Ganaste la batalla 🎺🎊');
    
    } else if (playerAtack == enemyAtack) {
        winnerMessage = '🎌 Ha sido un empate';
    
    } else {
        winnerMessage = '😞 Ganó tu oponente';
        playerLife--;
        hurt(playerLife, playerhearts, 'Perdiste la batalla 😓🏳️');
    }

    logText.innerHTML = '👩🏻 Has atacado con ' + playerAtack + '<br>' + '👤 El oponente atacó con ' + enemyAtack + '<br>' + winnerMessage;
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

        let gameoverMessage = document.getElementById('gameover');
        gameoverMessage.innerHTML = message;
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
    elementsImput.style.display = 'none';

    let rebootSection = document.getElementById('reboot');
    rebootSection.style.display = 'flex';
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

    /* Player Mokepon Choice */
    let playerPonName = document.getElementById('playerPon');

    if (hipodogeInput.checked == true) {
        playerPonName.innerHTML = 'Hipodoge'
        selectionConfirmation = true;
        enemyPonChoice();
        displayAtackSection();

    } else if (capipepoInput.checked == true) {
        playerPonName.innerHTML = 'Capipepo'
        selectionConfirmation = true;
        enemyPonChoice();
        displayAtackSection();

    } else if (ratigueyaInput.checked == true) {
        playerPonName.innerHTML = 'Ratigueya'
        selectionConfirmation = true;
        enemyPonChoice();
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
    atackSection.style.display = 'flex';

    let chooseSection = document.getElementById('choosePon');
    chooseSection.style.display = 'none';
}

function enemyPonChoice()  // 👤 Enemy Choice
{
    let enemyPonName = document.getElementById('enemyPon');
    let randomPon = random(3,1);

    if (randomPon == 1) {
        enemyPonName.innerHTML = 'Hipodoge';

    } else if (randomPon == 2) {
        enemyPonName.innerHTML = 'Capipepo';

    } else if (randomPon == 3) {
        enemyPonName.innerHTML = 'Ratigueya';
    }
}

function reboot() 
{
    location.reload()
}