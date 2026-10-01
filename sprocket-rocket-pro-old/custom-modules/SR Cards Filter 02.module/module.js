document.addEventListener("DOMContentLoaded", function () {
    const moduleInstances = document.querySelectorAll('.sr-cards-filter-02');

    function getQueryParam() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('filter02');
    }

    function updateURL(filter) {
        const cleanFilter = filter === '*' ? '' : filter.replace('.tag-', '');
        const urlParams = new URLSearchParams(window.location.search);
        if (cleanFilter) {
            urlParams.set('filter02', cleanFilter);
        } else {
            urlParams.delete('filter02');
        }
        const newURL = `${window.location.pathname}?${urlParams.toString()}`;
        history.pushState({}, '', newURL);
    }

    moduleInstances.forEach(function (instance) {
        const grid = instance.querySelector('.sr-cards-filter-02-items');
        const buttons = instance.querySelectorAll('.filter-button-group button');
        const loadMoreBtn = instance.querySelector('.load-more');
        

        let filterValue = getQueryParam();
        filterValue = filterValue ? `.tag-${filterValue}` : '*';

        const images = grid.getElementsByTagName('img');
        const loadedImages = [];

        function initIsotope() {
            const iso = new Isotope(grid, {
                itemSelector: '.sr-cards-filter-02-item',
                layoutMode: 'fitRows'
            });

            // Add initial filter application if tag parameter exists
            if (filterValue !== '*') {
                const activeButton = Array.from(buttons).find(button => 
                    button.getAttribute('data-filter') === filterValue
                );
                if (activeButton) {
                    buttons.forEach(btn => btn.classList.remove('active', 'text-primary'));
                    activeButton.classList.add('active', 'text-primary');
                }
                iso.arrange({ filter: filterValue });
                
                if (loadMoreBtn) {
                    loadMoreBtn.classList.add('d-none');
                }
                Array.from(instance.querySelectorAll('.sr-cards-filter-02-items')).forEach(item => {
                    item.classList.remove('hideitems');
                });
            }

            // Update button click handler to include URL
            buttons.forEach(button => {
                button.addEventListener('click', function () {
                    this.classList.add('active', 'text-primary');
                    Array.from(this.parentNode.children).forEach(sibling => {
                        if (sibling !== this)
                            sibling.classList.remove('active', 'text-primary');
                    });
                    filterValue = this.getAttribute('data-filter');
                    updateURL(filterValue);
                    Array.from(instance.querySelectorAll('.sr-cards-filter-02-items')).forEach(item => {
                        item.classList.remove('hideitems');
                    });
                    Array.from(instance.querySelectorAll('.load-more')).forEach(item => {
                        item.classList.add('d-none');
                    });
                    iso.arrange({ filter: filterValue });
                });
            });

            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', function (e) {
                    Array.from(instance.querySelectorAll('.sr-cards-filter-02-items')).forEach(card => {
                        card.classList.remove('hideitems');
                    });
                    iso.arrange({ filter: filterValue });
                    if (this.classList.contains('d-none')) {
                        this.classList.remove('d-none');
                    } else {
                        this.classList.add('d-none');
                    }
                });
            }
        }

        // If no images, initialize immediately
        if (images.length === 0) {
            initIsotope();
        } else {
            // Wait for all images to load
            Array.from(images).forEach(img => {
                if (img.complete) {
                    loadedImages.push(img);
                    if (loadedImages.length === images.length) {
                        initIsotope();
                    }
                } else {
                    img.addEventListener('load', function() {
                        loadedImages.push(img);
                        if (loadedImages.length === images.length) {
                            initIsotope();
                        }
                    });
                }
            });
        }
    });
});