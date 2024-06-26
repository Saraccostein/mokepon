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

/* 🗺️ Map */
const mapviewSection = document.getElementById('mapview');
const map = document.getElementById('map');
let canva = map.getContext('2d');
let searchingHeight;
let mapWitdh = window.innerWidth - 30;
const maxMapWitdh = 650

if (mapWitdh > maxMapWitdh) {
    mapWitdh = maxMapWitdh
}
searchingHeight = mapWitdh * 600 / 800;

map.width = mapWitdh;
map.height = searchingHeight;

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

const waterBorderColor = 'hsla(211, 25%, 23%, 1)';
const earthBorderColor = 'hsla(187, 25%, 20%, 1)';
const fireBorderColor = 'hsla(316, 19%, 21%, 1)';
const normalBorderColor = 'hsla(230, 3%, 55%, 1)';

    // Reboot Game 🔄️
const reload = document.getElementById('reboot_button');

/* backEnd */   
let playerId = null;
let enemyId = null;

class Mokepon {
    constructor(name, photo, type, icon, originalX, originalY, id = null) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.type = type;
        this.attacks = [];
        this.originalX = originalX;
        this.originalY = originalY;
        this.x = (originalX / 800) * map.width;
        this.y = (originalY / 600) * map.height;
        this.width = 80;
        this.height = 80;
        this.mapPhoto = new Image();
        this.mapPhoto.src = icon;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
    printPon() {
        const scaleFactor = map.width / 550;
        canva.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.mapPhoto.width * scaleFactor * 0.35,
            this.mapPhoto.height * scaleFactor * 0.35
        );
    }
    updatePosition() {
        this.x = (this.originalX / 800) * map.width;
        this.y = (this.originalY / 600) * map.height;
    }
}

let mokepones = [];
let hipodoge = new  Mokepon('Hipodoge', 'assets/hipodoge.png', 'agua 💧', 'assets/hipodoge_face.png', 145, 420);
let capipepo = new  Mokepon('Capipepo', 'assets/capipepo.png', 'tierra 🌱', 'assets/capipepo_face.png', 497, 355);
let ratigueya = new  Mokepon('Ratigueya', 'assets/ratigueya.png', 'fuego 🔥', 'assets/ratigueya_face.png', 100, 90);
mokepones.push(hipodoge, capipepo, ratigueya)

let mokenemies = [];

hipodoge.attacks.push(
    {name: '💣', id: 'hit', img: 'assets/fire_dracula.svg', class: 'fire', type: 'fuego 🔥'},
    {name: '🛡️', id: 'shield', img: 'assets/blades.svg', class: 'earth', type: 'tierra 🌱'},
    {name: '💧', id: 'water', img: 'assets/tsunami.svg', class: 'water', type: 'agua 💧'},
    {name: '🌊', id: 'tsunami', img: 'assets/tsunami.svg', class: 'water', type: 'agua 💧'},
    {name: '❄️', id: 'snow', img: 'assets/tsunami.svg', class: 'water', type: 'agua 💧'}
);

capipepo.attacks.push(
    {name: '⚗️', id: 'hit', img: 'assets/tsunami.svg', class: 'water', type: 'agua 💧'},
    {name: '🛡️', id: 'shield', img: 'assets/fire_dracula.svg', class: 'fire', type: 'fuego 🔥'},
    {name: '🌱', id: 'earth', img: 'assets/blades.svg', class: 'earth', type: 'tierra 🌱'},
    {name: '🍃', id: 'blades', img: 'assets/blades.svg', class: 'earth', type: 'tierra 🌱'},
    {name: '☘️', id: 'fortune', img: 'assets/blades.svg', class: 'earth', type: 'tierra 🌱'}
);

ratigueya.attacks.push(
    {name: '💥', id: 'hit', img: 'assets/blades.svg', class: 'earth', type: 'tierra 🌱'},
    {name: '🛡️', id: 'shield', img: 'assets/tsunami.svg', class: 'water', type: 'agua 💧'},
    {name: '🔥', id: 'fire', img: 'assets/fire_dracula.svg', class: 'fire', type: 'fuego 🔥'},
    {name: '🌋', id: 'volcano', img: 'assets/fire_dracula.svg', class: 'fire', type: 'fuego 🔥'},
    {name: '❤️‍🔥', id: 'self-esteem', img: 'assets/fire_dracula.svg', class: 'fire', type: 'fuego 🔥'}
);
let mokeponChecked;
function start() {
    attackSection.style.display = 'none';

    mapviewSection.style.display = 'none';

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
    });

    const mokeponRadios = document.querySelectorAll("input[type=radio][name=myPon]");

    mokeponRadios.forEach((radio) => {
        radio.addEventListener('click', (event) => {
            mokeponChecked = event.target.id;
            playerPonChoice();
        })
    });

    joinTheGame()
}
function joinTheGame() {
    fetch('http://localhost:8080/join').then(function (res) {
        console.log(res);
        if (res.ok) {
            res.text().then(function (response) {
                playerId = response
            })
        }
    });
}
function random(max, min)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function battle() {
    clearInterval(interval)
    for (let index = 0; index < playerSequence.length; index++) {

        const divLog = document.getElementById('log_' + index);
        const enemyAttackImgId = document.getElementById('enemyAttackLog_' + index);
        enemyAttackImgId.src = enemyAttacksImg[index];

        let enemyLogColor;
        let enemyBorderLogColor;

        if (enemySequence[index] === 'agua 💧') {
            enemyLogColor = waterColor;
            enemyBorderLogColor = waterBorderColor;
        
        } else if (enemySequence[index] === 'tierra 🌱') {
            enemyLogColor = earthColor;
            enemyBorderLogColor = earthBorderColor;
        
        } else if (enemySequence[index] === 'fuego 🔥') {
            enemyLogColor = fireColor;
            enemyBorderLogColor = fireBorderColor;
        
        } else {
            enemyLogColor = normalColor;
            enemyBorderLogColor = normalBorderColor;
        }

        enemyAttackImgId.style.backgroundColor = enemyLogColor;
        enemyAttackImgId.style.borderColor = enemyBorderLogColor;

        if (playerSequence[index] === enemySequence[index]) {
            gamesTie ++;

        } else if (playerSequence[index] === 'agua 💧' && enemySequence[index] === 'fuego 🔥') {
            divLog.style.border = '2px solid hsla(135,  94%, 65%, 0.8)';
            gamesWon++;
        
        } else if (playerSequence[index] === 'tierra 🌱' && enemySequence[index] === 'agua 💧') {
            divLog.style.border = '2px solid hsla(135,  94%, 65%, 0.8)';
            gamesWon++;
        
        } else if (playerSequence[index] === 'fuego 🔥' && enemySequence[index] === 'tierra 🌱') {
            divLog.style.border = '2px solid hsla(135,  94%, 65%, 0.8)';
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
    reload.addEventListener('click', reboot);
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
function playerPonChoice() // 👩🏻 Player choice
{
    chooseSection.style.display = 'none';
    playerPon = mokepones.find(keyValue => keyValue['name'] === mokeponChecked)
    let you = 'Tu '

    if(playerPon.name === 'Hipodoge') {
        playerPonAttackCard.style.transform = "scaleX(-1)";
    }

    playerPonName.innerHTML = you + playerPon.name;
    playerPonAttackCard.src = playerPon.photo;

    selectingMokepon(playerPon);

    playerAttacks = extractAttacks(playerPon.name);
    showAttacks(playerAttacks);
    mapviewSection.style.display = 'flex';
    mapInit();

    attackButtons = document.querySelectorAll('.elementButton');
    attackSequence();
}
function selectingMokepon(pon) {
    fetch(`http://localhost:8080/mokepon/${playerId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mokepon: pon.name
        })
    })
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

            if (playerSequence.length === 5) {
                sendAttacks();
            }
        })
    });
}
function sendAttacks () {
    fetch(`http://localhost:8080/mokepon/${playerId}/attacks`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attacks: playerSequence
        })
    })
    interval = setInterval(getAttacks, 50);
}
function getAttacks () {
    fetch(`http://localhost:8080/mokepon/${enemyId}/attacks`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('No se pudo conectar con el servidor');
    })
    .then(({ attacks }) => {
        if (attacks.length === 5) {
            enemySequence = attacks;
            battle();
        }
    })
    .catch(error => {
        console.error('Error obteniendo ataques:', error);
        // Manejar el error aquí (por ejemplo, mostrar un mensaje al usuario)
    });
}
function queryInAttack(attacksArray, query, id, output)
{
    attacksArray.find(keyValue => keyValue[query] === id)[output]
}
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

    enemyLogImg.style.backgroundColor = 'var(--gray)';
    enemyLogImg.style.borderBottom = '3px solid hsla(230,  20%, 25%,   0.9)';

    div.appendChild(playerLogImg);
    div.appendChild(enemyLogImg);
    attacksLog.appendChild(div);

    div.classList.add("log");

    let playerBorderColor;
    let playerLogColor;

    if (playerAttacks.find(keyValue => keyValue['id'] === element)['type'] === 'agua 💧') {
        playerLogColor = waterColor;
        playerBorderColor = waterBorderColor;

    } else if (playerAttacks.find(keyValue => keyValue['id'] === element)['type'] === 'tierra 🌱') {
        playerLogColor = earthColor;
        playerBorderColor = earthBorderColor;

    } else if (playerAttacks.find(keyValue => keyValue['id'] === element)['type'] === 'fuego 🔥') {
        playerLogColor = fireColor;
        playerBorderColor = fireBorderColor;
    
    } else {
        playerLogColor = normalColor;
        playerBorderColor = normalBorderColor;
    }

    playerLogImg.style.backgroundColor = playerLogColor;
    playerLogImg.style.borderBottom = `3px solid ${playerBorderColor}`;
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
let enemyAttacksImg = [];
let enemyAttacksClass = []
function enemyPonChoice(pon)  // 👤 Enemy Choice
{
    enemyPon = pon.name;
    enemyPonName.innerHTML = enemyPon;
    enemyPonAttackCard.src = pon.photo;

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
let printedEnemies = [];
function printCanvas() {
    playerPon.x = playerPon.x + playerPon.xSpeed
    playerPon.y = playerPon.y + playerPon.ySpeed
    canva.clearRect(0, 0, map.width, map.height);
    canva.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.height
    );
    playerPon.printPon()
    sendPosition(playerPon.x, playerPon.y)
    mokenemies.forEach(function (mokepon) {
        mokepon.printPon();
        checkCollision(mokepon);
    })
}
function sendPosition(x, y) {
    fetch(`http://localhost:8080/mokepon/${playerId}/coordinates`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (response) {
        if (response.ok) {
            response.json()
            .then(function({ enemies }) {
                console.log(enemies);
                mokenemies = enemies.map(function (enemy) {
                    const mokename = enemy.mokepon.name || '';
                    if (mokename === 'Hipodoge') {
                        mokenemy = new  Mokepon('Hipodoge', 'assets/hipodoge.png', 'agua 💧', 'assets/hipodoge_face.png', 145, 420, enemy.id);
                    } else if (mokename === 'Capipepo') {
                        mokenemy = new  Mokepon('Capipepo', 'assets/capipepo.png', 'tierra 🌱', 'assets/capipepo_face.png', 497, 355, enemy.id);
                    } else if (mokename === 'Ratigueya') {
                        mokenemy = new  Mokepon('Ratigueya', 'assets/ratigueya.png', 'fuego 🔥', 'assets/ratigueya_face.png', 100, 90, enemy.id);
                    }
                    mokenemy.x = enemy.x;
                    mokenemy.y = enemy.y;
                    return mokenemy
                })
            })
        }   
    })
}
let mokenemy = null;
const speed = 7;
function moveLeft() {
    playerPon.xSpeed = -speed;
    printCanvas()
}
function moveDown() {
    playerPon.ySpeed = +speed;
    printCanvas()
}
function moveUp() {
    playerPon.ySpeed = -speed;
    printCanvas()
}
function moveRight() {
    playerPon.xSpeed = +speed;
    printCanvas()
}
function stopPon() {
    playerPon.xSpeed = 0;
    playerPon.ySpeed = 0;
    
arrowLeftButton.style.borderColor = 'hsla(225,  27%, 51%,   1)'
arrowLeft.style.backgroundImage = 'url("./assets/left_arrow.svg")'

arrowDownButton.style.borderColor = 'hsla(225,  27%, 51%,   1)'
arrowDown.style.backgroundImage = 'url("./assets/down_arrow.svg")'

arrowUpButton.style.borderColor = 'hsla(225,  27%, 51%,   1)'
arrowUp.style.backgroundImage = 'url("./assets/up_arrow.svg")'

arrowRightButton.style.borderColor = 'hsla(225,  27%, 51%,   1)'
arrowRight.style.backgroundImage = 'url("./assets/right_arrow.svg")'
}

function arrowLeftHover() {
    arrowLeftButton.style.borderColor = 'hsla(265,  89%, 78%,   1)'
    arrowLeft.style.backgroundImage = 'url("./assets/left_arrow_purple.svg")'
}
function arrowDownHover() {
    arrowDownButton.style.borderColor = 'hsla(265,  89%, 78%,   1)'
    arrowDown.style.backgroundImage = 'url("./assets/down_arrow_purple.svg")'
}
function arrowUpHover() {
    arrowUpButton.style.borderColor = 'hsla(265,  89%, 78%,   1)'
    arrowUp.style.backgroundImage = 'url("./assets/up_arrow_purple.svg")'
}
function arrowRightHover() {
    arrowRightButton.style.borderColor = 'hsla(265,  89%, 78%,   1)'
    arrowRight.style.backgroundImage = 'url("./assets/right_arrow_purple.svg")'
}

function keyDown(event) {

    switch (event.key) {
        case 'ArrowLeft':
        case "a":
        case "A":
            arrowLeftHover()
            moveLeft();
        break;

        case 'ArrowDown':
        case "s":
        case "S":
            arrowDownHover()
            moveDown();
        break;

        case 'ArrowUp':
        case "w":
        case "W":
            arrowUpHover()
            moveUp();
        break;

        case 'ArrowRight':
        case "d":
        case "D":
            arrowRightHover()
            moveRight();
        break;

    default:
        break;
    }
}

const arrowLeftButton = document.getElementById('left_arrow_button');
const arrowDownButton = document.getElementById('down_arrow_button');
const arrowUpButton = document.getElementById('up_arrow_button');
const arrowRightButton = document.getElementById('right_arrow_button');

const arrowLeft = document.getElementById('left_arrow');
const arrowDown = document.getElementById('down_arrow');
const arrowUp = document.getElementById('up_arrow');
const arrowRight = document.getElementById('right_arrow');

arrowLeftButton.addEventListener('mouseover', arrowLeftHover);
arrowLeftButton.addEventListener('mouseout', stopPon);
arrowLeftButton.addEventListener('mousedown', moveLeft);
arrowLeftButton.addEventListener('mouseup', stopPon);
arrowLeftButton.addEventListener('touchstart', function(event) {
    event.preventDefault();
    arrowLeftHover();
    moveLeft();
}, { passive: true });
arrowLeftButton.addEventListener('touchend', function(event) {
    event.preventDefault();
    stopPon();
});

arrowDownButton.addEventListener('mouseover', arrowDownHover);
arrowDownButton.addEventListener('mouseout', stopPon);
arrowDownButton.addEventListener('mousedown', moveDown);
arrowDownButton.addEventListener('mouseup', stopPon);
arrowDownButton.addEventListener('touchstart', function(event) {
    event.preventDefault();
    arrowDownHover();
    moveDown();
}, { passive: true });
arrowDownButton.addEventListener('touchend', function(event) {
    event.preventDefault();
    stopPon();
});

arrowUpButton.addEventListener('mouseover', arrowUpHover);
arrowUpButton.addEventListener('mouseout', stopPon);
arrowUpButton.addEventListener('mousedown', moveUp);
arrowUpButton.addEventListener('mouseup', stopPon);
arrowUpButton.addEventListener('touchstart', function(event) {
    event.preventDefault();
    arrowUpHover();
    moveUp();
}, { passive: true });
arrowUpButton.addEventListener('touchend', function(event) {
    event.preventDefault();
    stopPon();
});

arrowRightButton.addEventListener('mouseover', arrowRightHover);
arrowRightButton.addEventListener('mouseout', stopPon);
arrowRightButton.addEventListener('mousedown', moveRight);
arrowRightButton.addEventListener('mouseup', stopPon);
arrowRightButton.addEventListener('touchstart', function(event) {
    event.preventDefault();
    arrowRightHover();
    moveRight();
}, { passive: true });
arrowRightButton.addEventListener('touchend', function(event) {
    event.preventDefault();
    stopPon();
});

function mapInit() {
    mapInterval = setInterval(printCanvas, 50);

    window.addEventListener('keydown', keyDown, { passive: true }); 
    window.addEventListener('keyup', stopPon);
}
let backgroundMap = new Image();
backgroundMap.src = './assets/mokemap.png';

function checkCollision(enemy) {
    const margin = 10;

    const enemyPonTop = enemy.y + margin;
    const enemyPonBottom = enemy.y + enemy.height - margin;
    const enemyPonRight = enemy.x + enemy.width - margin;
    const enemyPonLeft = enemy.x + margin;

    const playerPonTop = playerPon.y + margin;
    const playerPonBottom = playerPon.y + playerPon.height - margin;
    const playerPonRight = playerPon.x + playerPon.width - margin;
    const playerPonLeft = playerPon.x + margin;

    if (playerPonBottom < enemyPonTop || 
        playerPonTop > enemyPonBottom || 
        playerPonRight < enemyPonLeft || 
        playerPonLeft > enemyPonRight
    ) {
        return
    }

    stopPon();
    clearInterval(mapInterval)

    enemyId = enemy.id;

    attackSection.style.display = 'grid';
    mapviewSection.style.display = 'none';
    enemyPonChoice(enemy)
}
let mapInterval;