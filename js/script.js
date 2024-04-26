document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Create carousel container
        const carousel = document.createElement('div');
        carousel.className = 'carousel';

        const url = 'https://raw.githubusercontent.com/snawarhussain/flashcards/main/data/data.json';
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Create and append the card elements to the carousel
        data.forEach(cardData => {
            const cellElem = document.createElement('div');
            cellElem.className = 'carousel-cell';
            cellElem.innerHTML = `
                <div class="card-body">
                    <div class="card-front">
                        <p>${cardData.word}</p>
                    </div>
                    <div class="card-back">
                        <p>${cardData.article} ${cardData.word}</p>
                        <p>${cardData.plural}</p>
                    </div>
                </div>
            `;
            carousel.appendChild(cellElem);
        });

        // Append the carousel to the body or a specific container
        document.body.appendChild(carousel);

        // Initialize Flickity on the carousel element
        new Flickity(carousel, {
            // cellAlign: 'center',
            // contain: true,
            wrapAround: false,
            prevNextButtons: true,
            // pageDots: true,
            // groupCells: 3, // Show three cells per group
            // freeScroll: true, // Allow free-scrolling
        });
        // flkty.on('change', function(index) {
        //     // Remove 'is-flipped' class and 'is-selected' class from all cells
        //     flkty.cells.forEach(function(cell) {
        //       cell.element.classList.remove('is-flipped');
        //       cell.element.classList.remove('is-selected');
        //     });
          
        //     // Add 'is-selected' class to the currently selected cell
        //     const selectedElem = flkty.selectedElement;
        //     selectedElem.classList.add('is-selected');
          
        //     // Optional: If you want to disable flipping for non-selected cells
        //     // you can manage that here by binding click events only to the selected cell
        //   });

        // Add event listeners for the card flip action
        document.querySelectorAll('.card-body').forEach(cardBody => {
            cardBody.addEventListener('click', () => {
                cardBody.classList.toggle('is-flipped');
            });
        });
        
    } catch (error) {
        console.error("Failed to load cards:", error);
    }
});
