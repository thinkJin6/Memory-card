'use strict';
const cardsContainer = document.getElementById('cards--container');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const currentEl = document.getElementById('current');
const btnShow = document.getElementById('show');
const btnHide = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const btnAddCard = document.getElementById('add__card');
const btnClear = document.getElementById('clear');
const addContainer = document.getElementById('add--container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM card
const cardsEl = [];

// Get cards data from local Storage
const getCardsData = function () {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
};

// Add card to local storage
const setCardsData = function (cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
};

// Store card data
let cardsData = getCardsData();

// Create all cards
const createCards = function () {
  cardsData.forEach((data, index) => createCard(data, index));
};

// Remove card by id
const removeCard = function (id) {
  localStorage.clear();
  cardsContainer.innerHTML = '';

  cardsData = cardsData.filter((card) => card.id !== id);
  setCardsData(cardsData);
};

// Create a single card in the DOM
const createCard = function (data, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  console.log(data);

  if (index === 0) card.classList.add('active');

  card.innerHTML = `
        <div class="inner__card">
          <div class="inner__card__front">
            <p>${data.question}</p>
          </div> 
          <div class="inner__card__back">
            <p>${data.answer}</p>
          </div>
        </div>
        <button id="clear__card" class="clear btn" onclick="removeCard(${data.id}) ">
            <i class="fas fa-trash"></i>
        </button>
  `;
  card.addEventListener('click', function () {
    card.classList.toggle('show__answer');
  });

  // Add to DOM cards
  cardsEl.push(card);
  cardsContainer.appendChild(card);

  updateCurrentText();
};

// Show number of cards
const updateCurrentText = function () {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
};
createCards();

// Event Listener
// Next button
btnNext.addEventListener('click', function () {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Previous button
btnPrev.addEventListener('click', function () {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show button
btnShow.addEventListener('click', function () {
  addContainer.classList.add('show');
});

// Hide button
btnHide.addEventListener('click', function () {
  addContainer.classList.remove('show');
});

// Add new card
btnAddCard.addEventListener('click', function () {
  const question = questionEl.value;
  const answer = answerEl.value;
  const id = Math.trunc(Math.random() * 1000000);

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer, id };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards
btnClear.addEventListener('click', function () {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
