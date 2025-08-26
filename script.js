$(() => {
  const suits = ['C', 'D', 'H', 'S'];
  const ranks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const $content = $('.content');
  const totalPairs = ranks.length;

  // --- Generate cards ---
  const getRandom = max => Math.floor(Math.random() * max);

  ranks.forEach(rank => {
    for (let i = 0; i < 2; i++) {
      const imgName = `${rank}${suits[getRandom(4)]}`;
      const order = getRandom(totalPairs * 2);

      const cardHtml = `
        <div class="cards" data-match="${rank}" style="order: ${order}">
          <img class="front-face" src="img/${imgName}.png" alt="${imgName}"/>
          <img class="back-face" src="img/flipped.png" alt="Card Back"/>
        </div>`;

      $content.append(cardHtml);
    }
  });

  // --- Game logic ---
  let flippedCard = false;
  let lockCard = false;
  let firstCard, secondCard;
  let foundPairs = 0;
  let steps = 0;

  const reset = () => {
    flippedCard = false;
    lockCard = false;
    firstCard = null;
    secondCard = null;
  };

  const endGame = () => {
    $('body').append(`<h1 id="won">You won after ${steps} steps</h1>`);
    $content.css('filter', 'blur(7px)');
  };

  const disableCards = () => {
    $(firstCard).off('click', flip);
    $(secondCard).off('click', flip);

    foundPairs++;
    if (foundPairs === totalPairs) endGame();

    setTimeout(() => {
      $(firstCard).css('opacity', 0);
      $(secondCard).css('opacity', 0);
      reset()
    }, 1000);
  };

  const unflipCards = () => {
    lockCard = true;
    setTimeout(() => {
      $(firstCard).removeClass('flip');
      $(secondCard).removeClass('flip');
      reset();
    }, 1000);
  }

  function flip() {
    if (lockCard || this === firstCard) return;

    $(this).addClass('flip');

    if (!flippedCard) {
      flippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    steps++;

    const isMatch = firstCard.dataset.match === secondCard.dataset.match;
    isMatch ? disableCards() : unflipCards();
  }

  $('.cards').on('click', flip);
});
