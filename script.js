$(function () {
    let obj = {
        7: ['7C', '7D', '7H', '7S'],
        8: ['8C', '8D', '8H', '8S'],
        9: ['9C', '9D', '9H', '9S'],
        10: ['10C', '10D', '10H', '10S'],
        J: ['JC', 'JD', 'JH', 'JS'],
        Q: ['QC', 'QD', 'QH', 'QS'],
        K: ['KC', 'KD', 'KH', 'KS'],
        A: ['AC', 'AD', 'AH', 'AS']

    };


    for (const [match, names] of Object.entries(obj)) {
        for (let i = 0; i < 2; i++) {
            let name = Math.floor(Math.random() * 4);

            let elem = `
                    <div class="cards" data-match="${match}">
                        <img class="front-face" src="img/${names[name]}.png" alt="${names[name]}" />
                        <img class="back-face" src="img/flipped.png" alt="Card Back" />
                    </div>`;
            $('.content').append(elem);
            console.log(names[name])
        }
    }


    const cards = $.find('.cards');


    let flippedCard = false;
    let lockCard = false;
    let firstCard, secondCard;
    let find = 0, step = 0;


    function flip() {
        if (lockCard) return;
        if (this === firstCard) return;

        $(this).addClass('flip');

        if (!flippedCard) {
            flippedCard = true;
            firstCard = this;
            return;
        }
        secondCard = this;
        check();
    }


    function check() {
        step++;

        let isMatch = firstCard.dataset.match === secondCard.dataset.match;
        isMatch ? disable() : unflip();
    }


    function disable() {
        $(firstCard).off('click', flip);
        $(secondCard).off('click', flip);

        find++;
        if (find === 8) endGame();

        setTimeout(() => {
            $(firstCard).css('opacity', 0);
            $(secondCard).css('opacity', 0);
            reset();
        }, 1700);
    }


    function unflip() {
        lockCard = true;

        setTimeout(() => {
            $(firstCard).removeClass('flip');
            $(secondCard).removeClass('flip');
            reset();
        }, 1500);
    }


    function reset() {
        [flippedCard, lockCard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }


    (function shuffle() {
        $.each(cards, (i, card) => {
            $(card).css('order', Math.floor(Math.random() * 16).toString());
        });
    })();


    $.each(cards, (i, card) => $(card).on('click', flip));


    function endGame() {
        let win = `<h1 id="won">You Won in ${step} Step</h1>`;

        $('body').append(win);
        $('.content').css('filter', `blur(${7}px)`);
    };
})


