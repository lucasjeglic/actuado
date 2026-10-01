if (window.innerWidth > 767) {
    const sections = document.querySelectorAll('[data-section]');
    const options = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const intersecting = entry.isIntersecting;

        if (intersecting) {
        document.querySelector(`[data-image="${entry.target.dataset.section}"`).classList.add('active');
        document.querySelector(`[data-link="${entry.target.dataset.section}"]`).classList.add('active');
        document.querySelector('.sr-tabs-split-screen-01-image [data-title] .heading').textContent = document.querySelector(`[data-section="${entry.target.dataset.section}"]`).dataset.title;
        document.querySelector('.sr-tabs-split-screen-01-image [data-title] .heading').classList.forEach(classlist => {
            if (classlist.startsWith('text-')) {
            document.querySelector('.sr-tabs-split-screen-01-image [data-title] .heading').classList.remove(classlist);
            }
            document.querySelector('.sr-tabs-split-screen-01-image [data-title] .heading').classList.add(document.querySelector(`[data-section="${entry.target.dataset.section}"]`).dataset.textColor);
        })
        document.querySelector('.sr-tabs-split-screen-01-image__overlay').dataset.overlay = entry.target.dataset.section;
        } else {
        document.querySelector(`[data-image="${entry.target.dataset.section}"`).classList.remove('active');
        document.querySelector(`[data-link="${entry.target.dataset.section}"]`).classList.remove('active');
        }

        if (document.querySelectorAll('[data-image].active').length === 0) {
        const imageLength = document.querySelectorAll('[data-image]').length - 1;

        if (document.querySelector('.sr-tabs-split-screen-01').getBoundingClientRect().top > 0) {
            document.querySelectorAll('[data-image]')[0].classList.add('active');
        } else if (document.querySelector(`[data-section="${imageLength}"`).getBoundingClientRect().top < 0) {
            document.querySelectorAll('[data-image]')[imageLength].classList.add('active');
        }
        }
    });
    }, options)


    sections.forEach(section => {
    observer.observe(section);
    });

    Array.from(document.querySelectorAll('.menu li')).forEach(menu => menu.addEventListener('click', function() {
    const section = this.dataset.link;

    document.querySelector(`[data-section="${section}"`).scrollIntoView({ behavior: 'smooth' });
    }));
}