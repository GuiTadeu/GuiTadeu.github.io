// Capturando o id Cardboard no HTML
const cardBoard = document.querySelector("#cardboard");

// Lista de cursos
const cursos = [
    'agile-scrum',
    'android',
    'angular',
    'aspnet-mvc-nhibernate',
    'certified-scrum-master',
    'csharp-orientacao-objetos',
    'design-arquitetura-de-aplicacoes-java',
    'design-sprint',
    'design-thinking',
    'gestao-de-pessoas',
    'html-css-javascript',
    'java-ee-soa-web-services-mensageria',
    'java-orientacao-objetos',
    'java-testes-spring-web-services-design-patterns',
    'java-web',
    'javascript-jquery',
    'javascript-moderno',
    'logica-de-programacao',
    'microservices-spring-cloud',
    'nodejs-express',
    'persistencia-java-jpa-hibernate',
    'php-mysql',
    'python-orientacao-objetos',
    'react-native',
    'react-redux',
    'seguranca-aplicacoes-web',
    'spring-framework',
    'ux-usabilidade-mobile-web'
]

// Definindo a quantidade de cartas na mesa
// O total de cartas na mesa serão 12 pois
// São 6 cartas de "pergunta" e 6 cartas
// de "resposta"
const qtdCartas = 6;

var mesa = [];

// Definindo os cards que serão utilizados
for(cont=0; cont<=5; cont++){
    mesa[cont] = cursos[Math.floor(Math.random() * cursos.length)];
}

// Trecho que receberá uma div com os cards
let cardSiglaCurso = "";
let cardNomeCurso = "";

// Definir a foto da carta virada ao contrario
// Inserindo os cards no cardHTML de acorod com o 
// vetor de imagens declarado acima
mesa.forEach(img => {
    cardSiglaCurso += `
        <div class="memory-card" data-card="${img}">
            <img class="front-face" src="img/nome-curso/${img}.png">
            <img class="back-face" src="img/badge.png">
        </div>
    `

    cardNomeCurso += `
        <div class="memory-card" data-card="${img}">
            <img class="front-face" src="img/logo-curso/${img}.svg">
            <img class="back-face" src="img/badge.png">
        </div>
    `
});

// Inserindo os cards na página
// A soma faz repetir a renderização
cardBoard.innerHTML = cardSiglaCurso + cardNomeCurso;

/** Fim de renderização HTML */

const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCard = false;

function flipCard(){
    
    if(lockCard) return false;

    this.classList.add("flip");

    // Ela está indefinida?
    if(!firstCard){
        firstCard = this;
    
        return false;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    !isMatch ? disableCards() : resetCards(isMatch);
}

function disableCards(){
    lockCard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetCards();
    }, 1500);
}

// Embaralhar cards na mesa
(function shuffle(){
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    })
});

function resetCards(isMatch = false){
    if(isMatch){
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
    }

    [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));
