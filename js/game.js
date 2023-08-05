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

function battle() 
{
    let gameLog = document.getElementById('messages');

    let logText = document.getElementById('result');
    gameLog.appendChild(logText);

    if (playerAtack == 'fuego 🔥' && enemyAtack == 'agua 💧') {
        winnerMessage = '🏆 Haz ganado';
    
    } else if (playerAtack == 'agua 💧' && enemyAtack == 'tierra 🌰') {
        winnerMessage = '🏆 Haz ganado';
    
    } else if (playerAtack == 'tierra 🌰' && enemyAtack == 'fuego 🔥') {
        winnerMessage = '🏆 Haz ganado';
    
    } else if (playerAtack == enemyAtack) {
        winnerMessage = '🎌 Ha sido un empate';
    
    } else {
        winnerMessage = '😞 Ganó tu oponente';
    }

    logText.innerHTML = '👩🏻 Has atacado con ' + playerAtack + '<br>' + '👤 El oponente atacó con ' + enemyAtack + '<br>' + winnerMessage;
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

    battle();
}

/* 🐾 Pon Choice */
var selectionConfirmation = false;

let hipodogeLabel = document.getElementById('hipodoge_label');
let capipepoLabel = document.getElementById('capipepo_label');
let ratigueyaLabel = document.getElementById('ratigueya_label');

hipodogeLabel.addEventListener('click', hipodogeFocus);
capipepoLabel.addEventListener('click', capipepoFocus);
ratigueyaLabel.addEventListener('click', ratigueyaFocus);

function hipodogeFocus()
{
    hipodogeLabel.style.color = 'var(--yellow)';
    capipepoLabel.style.color = 'var(--white)';
    ratigueyaLabel.style.color = 'var(--white)';
}

function capipepoFocus()
{

    hipodogeLabel.style.color = 'var(--white)';
    capipepoLabel.style.color = 'var(--yellow)';
    ratigueyaLabel.style.color = 'var(--white)';
}

function ratigueyaFocus()
{

    hipodogeLabel.style.color = 'var(--white)';
    capipepoLabel.style.color = 'var(--white)';
    ratigueyaLabel.style.color = 'var(--yellow)';
}

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