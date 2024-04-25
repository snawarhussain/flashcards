document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded. Starting to fetch cards.");
    loadCards();
});

async function loadCards() {
    try {
        const response = await fetch('../data/data.json'); // Check this path
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const cardsData = await response.json();
        const carousel = document.querySelector('.carousel');
        console.log("Cards data loaded:", cardsData);

        cardsData.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card-wrapper';
            cardElement.innerHTML = `
                <div class="card-body">
                    <div class="card-front">
                        <p>${card.word}</p>
                    </div>
                    <div class="card-back">
                        <p>${card.article} ${card.word}</p>
                        <p>${card.plural}</p>
                    </div>
                </div>
            `;
            carousel.appendChild(cardElement);
        });
    } catch (error) {
        console.error("Failed to load cards:", error);
    }
}
