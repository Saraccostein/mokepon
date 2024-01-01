/* 🕹️ Game start */
window.addEventListener('load', start);

const playerPonButton = document.getElementById('choosePonButton');
const cardsContainer = document.getElementById('ponButtons');

const elementsContainer = document.getElementById('elementsToAttack');

const choosePonInteractiveMessage = document.getElementById('choosePonMessages');
const enemyPonName = document.getElementById('enemyPon');
const playerPonName = document.getElementById('playerPon');

/* For Attack Section */
const playerPonAttackCard = document.getElementById('playerPonAttackMode');
const enemyPonAttackCard = document.getElementById('enemyPonAttackMode');

const chooseSection = document.getElementById("choosePon");
const attackSection = document.getElementById('chooseAttack');

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
const attacksLog = document.getElementById('attacks_log');
const logText = document.getElementById('result');

/* 🐾 Pon Choice */
let mokeponesAvailable;
let playerAttacksButtons;
let selectionConfirmation = false;

/* 🥊 Attacks */
let playerAttacks = 0;
let enemyAttacks = [];
let playerSequence = [];
let enemySequence = [];
let indexPlayerAttack;
let indexEnemyAttack;

let playerLife = 3;
let enemyLife = 3;
let gamesWon = 0;
let gamesLoose = 0;
let gamesTie = 0;

let chosenAttackLog;
let logCounter = 0;
let attackButtons = [];
let playerPon;
let enemyPon;
let hipodogeInput;
let capipepoInput;
let ratigueyaInput;
let hipodogeLabel;
let capipepoLabel;
let ratigueyaLabel;

const waterColor = 'hsla(211, 20%, 30%, 1)';
const earthColor = 'hsla(177, 18%, 28%, 1)';
const fireColor = 'hsla(316, 14%, 26%, 1)';
const normalColor = 'hsla(231, 6%, 75%, 1)';

    // Reboot Game 🔄️
const reload = document.getElementById('reboot_button');

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
    {name: '💥', id: 'hit', img: 'assets/hit.svg', class: 'normal', type: 'fuego 🔥'},
    {name: '🛡️', id: 'shield', img: 'assets/shield.svg', class: 'normal', type: 'tierra 🌱'},
    {name: '💧', id: 'water', img: 'assets/water.svg', class: 'water', type: 'agua 💧'},
    {name: '🌊', id: 'tsunami', img: 'assets/tsunami.svg', class: 'water', type: 'agua 💧'},
    {name: '❄️', id: 'snow', img: 'assets/snow.svg', class: 'water', type: 'agua 💧'}
);

capipepo.attacks.push(
    {name: '💥', id: 'hit', img: 'assets/hit.svg', class: 'normal', type: 'agua 💧'},
    {name: '🛡️', id: 'shield', img: 'assets/shield.svg', class: 'normal', type: 'fuego 🔥'},
    {name: '🌱', id: 'earth', img: 'assets/earth.svg', class: 'earth', type: 'tierra 🌱'},
    {name: '🍃', id: 'blades', img: 'assets/blades.svg', class: 'earth', type: 'tierra 🌱'},
    {name: '☘️', id: 'fortune', img: 'assets/fortune.svg', class: 'earth', type: 'tierra 🌱'}
);

ratigueya.attacks.push(
    {name: '💥', id: 'hit', img: 'assets/hit.svg', class: 'normal', type: 'tierra 🌱'},
    {name: '🛡️', id: 'shield', img: 'assets/shield.svg', class: 'normal', type: 'agua 💧'},
    {name: '🔥', id: 'fire', img: 'assets/fire_dracula.svg', class: 'fire', type: 'fuego 🔥'},
    {name: '🌋', id: 'volcano', img: 'assets/volcano.svg', class: 'fire', type: 'fuego 🔥'},
    {name: '❤️‍🔥', id: 'self-esteem', img: 'assets/self_estreem.svg', class: 'fire', type: 'fuego 🔥'}
);

function start()
{
    attackSection.style.display = 'none';
    messagesSection.style.visibility = 'hidden';
    rebootSection.style.visibility = 'hidden';

    mokepones.forEach((mokepon) => {
        mokeponesAvailable = `
        <input type="radio" name="myPon" id=${mokepon.name} />
    
        <label for=${mokepon.name} id=${mokepon.name + '_label'} class="ponLabel">
            <img src=${mokepon.photo} alt=${mokepon.name}>
            <p>${mokepon.name}</p>
        </label>
        `;

        cardsContainer.innerHTML += mokeponesAvailable;

        hipodogeInput = document.getElementById('Hipodoge');
        capipepoInput = document.getElementById('Capipepo');
        ratigueyaInput = document.getElementById('Ratigueya');

        hipodogeLabel = document.getElementById('Hipodoge_label');
        capipepoLabel = document.getElementById('Capipepo_label');
        ratigueyaLabel = document.getElementById('Ratigueya_label');
    });

    playerPonButton.addEventListener('click', playerPonChoice);

    hipodogeLabel.addEventListener('click', hipodogeFocus);
    capipepoLabel.addEventListener('click', capipepoFocus);
    ratigueyaLabel.addEventListener('click', ratigueyaFocus);

    reload.addEventListener('click', reboot);
}
function random(max, min)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function battleInit()
{
    if (playerAttacks.length === playerSequence.length) {
        battle();
    }
}
function saveResults(playerIndex, enemyIndex) 
{
    indexPlayerAttack = enemyAttacks[playerIndex].type;
    indexEnemyAttack = enemyAttacks[enemyIndex].type;
}
function battle()
{
    for (let index = 0; index < playerSequence.length; index++) {

        const divLog = document.getElementById('log_' + index);
        const enemyAttackImgId = document.getElementById('enemyAttackLog_' + index);
        enemyAttackImgId.src = enemyAttacksImg[index];

        let enemyLogColor;
        let enemyBorderLogColor;

        if (enemyAttacksClass[index] === 'water') {
            enemyLogColor = waterColor;
            enemyBorderLogColor = waterBorderColor;
        
        } else if (enemyAttacksClass[index] === 'earth') {
            enemyLogColor = earthColor;
            enemyBorderLogColor = earthBorderColor;
        
        } else if (enemyAttacksClass[index] === 'fire') {
            enemyLogColor = fireColor;
            enemyBorderLogColor = fireBorderColor;
        
        } else {
            enemyLogColor = normalColor;
            enemyBorderLogColor = normalBorderColor;
        }

        enemyAttackImgId.style.backgroundColor = enemyLogColor;
        enemyAttackImgId.style.borderColor = enemyBorderLogColor;

        if (playerSequence[index] === enemySequence[index]) {
            saveResults(index, index);
            gamesTie ++;

        } else if (playerSequence[index] === 'agua 💧' && enemySequence[index] === 'fuego 🔥') {
            divLog.style.border = '2px solid hsla(135,  94%, 65%, 0.8)';
            saveResults(index, index);
            gamesWon++;
        
        } else if (playerSequence[index] === 'tierra 🌱' && enemySequence[index] === 'agua 💧') {
            divLog.style.border = '2px solid hsla(135,  94%, 65%, 0.8)';
            saveResults(index, index);
            gamesWon++;
        
        } else if (playerSequence[index] === 'fuego 🔥' && enemySequence[index] === 'tierra 🌱') {
            divLog.style.border = '2px solid hsla(135,  94%, 65%, 0.8)';
            saveResults(index, index);
            gamesWon++;
        
        } else {
            divLog.style.border = '2px solid hsla(0,   100%, 67%,   0.8)';
            gamesLoose++;
        }
    }

    if (gamesWon === gamesLoose) {
        message(logText, '¡Empate!', 'tie');

    } else if (gamesWon > gamesLoose) {
        message(logText, '¡Ganaste la batalla!', 'win');
    
    } else { 
        message(logText, '¡Perdiste la batalla!', 'loose');
    }

    /*
        message(logText, 'Ha sido un empate.', 'tie');
        message(logText, 'Acertaste el ataque.', 'win');
        message(logText, 'El oponente acertó.', 'loose');

        hurt(enemyLife, enemyhearts, 'Ganaste la batalla 🎊');
        hurt(playerLife, playerhearts, 'Perdiste la batalla 😓');
    */

    rebootSection.style.visibility = 'visible';
}
function message(id, message, activeClass)
{
    messagesSection.style.visibility = 'visible';

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
    let you = ' (tú)'

    if (hipodogeInput.checked == true) {
        playerPonName.innerHTML = hipodogeInput.id + you;
        playerPon = hipodogeInput.id;
        selectionConfirmation = true;

        playerPonAttackCard.src = hipodoge.photo;
        playerPonAttackCard.style.transform = "scaleX(-1)";

    } else if (capipepoInput.checked == true) {
        playerPonName.innerHTML = capipepoInput.id + you;
        playerPon = capipepoInput.id;
        selectionConfirmation = true;

        playerPonAttackCard.src = capipepo.photo;

    } else if (ratigueyaInput.checked == true) {
        playerPonName.innerHTML = ratigueyaInput.id + you;
        playerPon = ratigueyaInput.id;
        selectionConfirmation = true;

        playerPonAttackCard.src = ratigueya.photo;

    } else {
        choosePonInteractiveMessage.style.color = 'var(--red)';
        choosePonInteractiveMessage.innerHTML = 'Selecciona tu mokepon';

        issueStyle(playerPonButton);
    }

    if (selectionConfirmation === true) {
        enemyPonChoice();
        playerAttacks = extractAttacks(playerPon);
        showAttacks(playerAttacks);
        displayAttackSection();
        attackButtons = document.querySelectorAll('.elementButton');
        attackSequence();
    }
}
function extractAttacks(pon)
{
    let attacks;
    for (let index = 0; index < mokepones.length; index++) {
        if (pon === mokepones[index].name) {
            attacks = mokepones[index].attacks;
        }
    }
    return attacks;
}
function showAttacks(attacks) {
    attacks.forEach((attack) => {
        playerAttacksButtons = `
        <button class="elementButton ${attack.class}" id=${attack.id}>  <img draggable="false" src=${attack.img} type="img/svg"> </button>
        `;

        elementsContainer.innerHTML += playerAttacksButtons;
    });
}
function attackSequence()
{
    attackButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            let target = event.target.id;
            playerSequence.push(playerAttacks.find(keyValue => keyValue['id'] === target)['type'])
            button.disabled = true;
            button.classList.add('disable');
            attackLogging(target);
            battleInit();
        })
    });
}
function queryInAttack(attacksArray, query, id, output) {
    attacksArray.find(keyValue => keyValue[query] === id)[output]
}
const waterBorderColor = 'hsla(211, 25%, 23%, 1)';
const earthBorderColor = 'hsla(187, 25%, 20%, 1)';
const fireBorderColor = 'hsla(316, 19%, 21%, 1)';
const normalBorderColor = 'hsla(230, 3%, 55%, 1)';
function attackLogging(element)
{
    const div = document.createElement("div");
    const playerLogImg = document.createElement("img");   
    const enemyLogImg = document.createElement("img");

    div.id = "log_" + logCounter;

    playerLogImg.id = "playerAttackLog_" + logCounter;
    playerLogImg.src = playerAttacks.find(keyValue => keyValue['id'] === element)['img'];

    enemyLogImg.id = "enemyAttackLog_" + logCounter;
    enemyLogImg.src = "assets/question_mark.svg";

    // enemyLogImg.style.backgroundImage = `linear-gradient(var(--gray), var(--low_opacity_deep))`
    enemyLogImg.style.backgroundColor = 'var(--gray)'
    enemyLogImg.style.borderBottom = '3px solid var(--black)';
    enemyLogImg.style.borderRight = '2.5px solid var(--black)';


    div.appendChild(playerLogImg);
    div.appendChild(enemyLogImg);
    attacksLog.appendChild(div);

    div.classList.add("log");

    let playerBorderColor;
    let playerLogColor;

    if (playerAttacks.find(keyValue => keyValue['id'] === element)['class'] === 'water') {
        playerLogColor = waterColor;
        playerBorderColor = waterBorderColor;

    } else if (playerAttacks.find(keyValue => keyValue['id'] === element)['class'] === 'earth') {
        playerLogColor = earthColor;
        playerBorderColor = earthBorderColor;

    } else if (playerAttacks.find(keyValue => keyValue['id'] === element)['class'] === 'fire') {
        playerLogColor = fireColor;
        playerBorderColor = fireBorderColor;
    
    } else {
        playerLogColor = normalColor;
        playerBorderColor = normalBorderColor;
    }

    playerLogImg.style.backgroundColor = playerLogColor;
    playerLogImg.style.borderBottom = `3px solid ${playerBorderColor}`;
    playerLogImg.style.borderRight = `2.5px solid ${playerBorderColor}`;
    logCounter ++;


}
function issueStyle(element)
{
    element.className = 'issue';
}
function cleanMessages(messageId, buttonId) {
    
    /* Clean messages */
    messageId.innerHTML = '';
    buttonId.classList.remove('issue')
}
function displayAttackSection()
{
    attackSection.style.display = 'grid';
    chooseSection.style.display = 'none';
}
let enemyAttacksImg = [];
let enemyAttacksClass = []
function enemyPonChoice()  // 👤 Enemy Choice
{
    let randomNum = random(mokepones.length -1, 0)
    enemyPon = mokepones[randomNum].name;
    enemyPonName.innerHTML = enemyPon;
    enemyPonAttackCard.src = mokepones[randomNum].photo;

    if (enemyPon === 'Ratigueya') {
        enemyPonAttackCard.style.transform = "scaleX(-1)";
    }

    enemyAttacks = extractAttacks(enemyPon);

    let array = [];
    for (let index = 0; index < enemyAttacks.length; index++) {

        array.push(enemyAttacks[index].id);
    }
    let ids = array.sort(()=>Math.random()-0.5);
    for (let index = 0; index < enemyAttacks.length; index++) {
        enemyAttacksImg.push(enemyAttacks.find(keyValue => keyValue['id'] === ids[index])['img'])
        enemySequence.push(enemyAttacks.find(keyValue => keyValue['id'] === ids[index])['type'])
        enemyAttacksClass.push(enemyAttacks.find(keyValue => keyValue['id'] === ids[index])['class'])
    }
}
function reboot() 
{
    location.reload();
}