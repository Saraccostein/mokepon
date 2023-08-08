/* 🕹️ Game start */
window.addEventListener('load', start);

let fin = false;
let logText = document.getElementById('result');
let gameover = document.getElementById('gameover');

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

    // 🌱 Earth
    let earthInput = document.getElementById('earth');
    earthInput.addEventListener('click', earthAtack);
}

let playerLife = 3;
let enemyLife = 3;
gameover.innerHTML = '';

function battle()
{

    let gameLog = document.getElementById('messages');
    
    gameLog.appendChild(logText);

    if (playerAtack == 'fuego 🔥' && enemyAtack == 'tierra 🌱') {
        winnerMessage = '🏆 Haz ganado';
        enemyLife--;
        hurtTheEnemy();
    
    } else if (playerAtack == 'agua 💧' && enemyAtack == 'fuego 🔥') {
        winnerMessage = '🏆 Haz ganado';
        enemyLife--;
        hurtTheEnemy();
    
    } else if (playerAtack == 'tierra 🌱' && enemyAtack == 'agua 💧') {
        winnerMessage = '🏆 Haz ganado';
        enemyLife--;
        hurtTheEnemy();
    
    } else if (playerAtack == enemyAtack) {
        winnerMessage = '🎌 Ha sido un empate';
    
    } else {
        winnerMessage = '😞 Ganó tu oponente';
        playerLife--;
        hurtThePlayer();
    }

    logText.innerHTML = '👩🏻 Has atacado con ' + playerAtack + '<br>' + '👤 El oponente atacó con ' + enemyAtack + '<br>' + winnerMessage;

}

function hurtTheEnemy()
{
    let enemyheart_1 = document.getElementById('enemyPonHeart-1');
    let enemyheart_2 = document.getElementById('enemyPonHeart-2');
    let enemyheart_3 = document.getElementById('enemyPonHeart-3');

    if (enemyLife == 2) {
        enemyheart_1.src = 'assets/heart.svg';
        enemyheart_2.src = 'assets/heart.svg';
        enemyheart_3.src = 'assets/heart_gray.svg';
    
    } else if (enemyLife == 1) {
        enemyheart_1.src = 'assets/heart.svg';
        enemyheart_2.src = 'assets/heart_gray.svg';
        enemyheart_3.src = 'assets/heart_gray.svg'; 

    } else if (enemyLife == 0) {
        enemyheart_1.src = 'assets/heart_gray.svg';
        enemyheart_2.src = 'assets/heart_gray.svg';
        enemyheart_3.src = 'assets/heart_gray.svg';

        gameover.innerHTML = '<br>Ganaste la batalla 🎺🎊';

        fin = true;
    }
}

function hurtThePlayer() {

    let playerheart_1 = document.getElementById('playerPonHeart-1');
    let playerheart_2 = document.getElementById('playerPonHeart-2');
    let playerheart_3 = document.getElementById('playerPonHeart-3');

    if (playerLife == 2) {
        playerheart_1.src = 'assets/heart.svg';
        playerheart_2.src = 'assets/heart.svg';
        playerheart_3.src = 'assets/heart_gray.svg';
    
    } else if (playerLife == 1) {
        playerheart_1.src = 'assets/heart.svg';
        playerheart_2.src = 'assets/heart_gray.svg';
        playerheart_3.src = 'assets/heart_gray.svg'; 

    } else if (playerLife == 0) {
        playerheart_1.src = 'assets/heart_gray.svg';
        playerheart_2.src = 'assets/heart_gray.svg';
        playerheart_3.src = 'assets/heart_gray.svg'; 

        gameover.innerHTML = '<br>Perdiste la batalla 😓🏳️';

        fin = true;

    }
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
    if (selectionConfirmation == true && fin == false) {
        playerAtack = 'fuego 🔥';
        enemyAtackChoice();
        atackMessage();
    } else if (fin == true) {
        logText.innerHTML = 'Fin del encuentro'

    } else {
        logText.innerHTML = 'Sino eliges Mokepon ¿Cómo piensas pelear?'
    }
}

function waterAtack()
{
    if (selectionConfirmation == true && fin == false) {
        playerAtack = 'agua 💧';
        enemyAtackChoice();
        atackMessage();
    } else if (fin == true) {
        logText.innerHTML = 'Fin del encuentro'

    } else {
        logText.innerHTML = 'Sino eliges Mokepon ¿Cómo piensas pelear?'
}
}

function earthAtack()
{
    if (selectionConfirmation == true && fin == false) {
        playerAtack = 'tierra 🌱';
        enemyAtackChoice();
        atackMessage();
    } else if (fin == true) {
        logText.innerHTML = 'Fin del encuentro'

    } else {
        logText.innerHTML = 'Sino eliges Mokepon ¿Cómo piensas pelear?'
    }
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
    /* Monsters */
    let hipodogeInput = document.getElementById('hipodoge');
    let capipepoInput = document.getElementById('capipepo');
    let ratigueyaInput = document.getElementById('ratigueya');

    /* Player Mokepon Choice */
    let playerPonName = document.getElementById('playerPon');

    if (hipodogeInput.checked == true) {
        playerPonName.innerHTML = 'Hipodoge:'
        selectionConfirmation = true;
        enemyPonChoice();

    } else if (capipepoInput.checked == true) {
        playerPonName.innerHTML = 'Capipepo:'
        selectionConfirmation = true;
        enemyPonChoice();

    } else if (ratigueyaInput.checked == true) {
        playerPonName.innerHTML = 'Ratigueya:'
        selectionConfirmation = true;
        enemyPonChoice();

    } else {    
        logText.innerHTML = 'Elige Mokepon'
    }
}

function enemyPonChoice()  // 👤 Enemy Choice
{
    let enemyPonName = document.getElementById('enemyPon');
    let randomPon = random(3,1);

    if (randomPon == 1) {
        enemyPonName.innerHTML = 'Hipodoge:';

    } else if (randomPon == 2) {
        enemyPonName.innerHTML = 'Capipepo:';

    } else if (randomPon == 3) {
        enemyPonName.innerHTML = 'Ratigueya:';
    }
}

let reload = document.getElementById('reboot');
reload.addEventListener('click', reboot);

function reboot() 
{
    window.location.reload()
}