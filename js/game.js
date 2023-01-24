/* 🕹️ Game start */
window.addEventListener('load', start);

function start()
{
    let playerPonButton = document.getElementById('choosePonButton');
    playerPonButton.addEventListener('click', playerPonChoice);

    /* 👩🏻 Player Atack */
    
    // 🔥 Fire
    let fireInput = document.getElementById('fire');
    fireInput.addEventListener('click', fireAtack);

    // 💧 Water
    let waterInput = document.getElementById('water');
    waterInput.addEventListener('click', waterAtack);

    // 🌰 Earth
    let earthInput = document.getElementById('earth');
    earthInput.addEventListener('click', earthAtack);
}

function makeMessage() 
{
    let gameLog = document.getElementById('messages');

    let logText = document.createElement('p');
    logText.innerHTML = '___' + '<br>' + 'Has atacado con ' + playerAtack + '<br>' + 'El enemigo atacó con ' + enemyAtack;

    gameLog.appendChild(logText);
}

function random(max, min)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* 🥊 Atacks */
let playerAtack;
let enemyAtack;

function atackMessage() // 🗨️ Menssage
{
    if(selectionConfirmation == true) 
    {
        console.log('---');
        console.log('👩🏻 Has lanzado un ataque ' + playerAtack);
        console.log('👤 El enemigo ha lanzado un ataque ' + enemyAtack);
    
    } else if (selectionConfirmation == false) {
        console.log('Selecciona por favor')
    }
}

function fireAtack()
{
    playerAtack = 'fuego 🔥';
    enemyAtackChoice();
    atackMessage();
}

function waterAtack()
{
    playerAtack = 'agua 💧';
    enemyAtackChoice();
    atackMessage();
}

function earthAtack()
{
    playerAtack = 'tierra 🌰';
    enemyAtackChoice();
    atackMessage();
}

function enemyAtackChoice()
{

    let randomAtack = random(3,1);

    if (randomAtack == 1) {
        enemyAtack = 'fuego 🔥';

    } else if (randomAtack == 2) {
        enemyAtack = 'agua 💧';

    } else if (randomAtack = 3) {
        enemyAtack = 'tierra 🌰';
    }

    makeMessage();
}

/* 🐾 Pon Choice */
var selectionConfirmation = false;

function playerPonChoice() // 👩🏻 Player choice
{
    selectionConfirmation = true;

    /* Monsters */
    let hipodogeInput = document.getElementById('hipodoge');
    let capipepoInput = document.getElementById('capipepo');
    let ratigueyaInput = document.getElementById('ratigueya');

    /* Player Mokepon Choice */
    let playerPonName = document.getElementById('playerPon');

    if (hipodogeInput.checked == true) {
        console.log('---');
        console.log('👩🏻 Elegiste a Hipodoge');
        playerPonName.innerHTML = 'Hipodoge:'

    } else if (capipepoInput.checked == true) {
        console.log('---');
        console.log('👩🏻 Elegisre a Capipepo');
        playerPonName.innerHTML = 'Capipepo:'

    } else if (ratigueyaInput.checked == true) {
        console.log('---');
        console.log('👩🏻 Elegiste a Ratigueya');
        playerPonName.innerHTML = 'Ratigueya:'

    } else {
        console.log('No has seleccionado aún ❌');
    }

    enemyPonChoice();
}

function enemyPonChoice()  // 👤 Enemy Choice
{
    let enemyPonName = document.getElementById('enemyPon');
    let randomPon = random(3,1);

    if (randomPon == 1) {
        console.log('👤 Enemigo eligio a Hipodoge');
        enemyPonName.innerHTML = 'Hipodoge:';

    } else if (randomPon == 2) {
        console.log('👤 Enemigo eligio a Capipepo');
        enemyPonName.innerHTML = 'Capipepo:';

    } else if (randomPon == 3) {
        console.log('👤 Enemigo eligio a Ratigueya');
        enemyPonName.innerHTML = 'Ratigueya:';
    }
}

if (playerAtack == 'fuego 🔥' && enemyAtack == 'tierra')
{
    
}