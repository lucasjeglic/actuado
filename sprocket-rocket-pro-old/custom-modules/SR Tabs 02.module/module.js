document.querySelectorAll('.sr-tabs-02').forEach(module => {
    const tabs = module.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            if (window.innerWidth < 993) {
                tab.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'center'});
            }
            const tabChildren = Array.from(tab.parentNode.children);
            const index = tabChildren.indexOf(tab);
            tabChildren.forEach(tab => tab.classList.remove('tab-item--active'));
            tab.classList.add('tab-item--active');


            const tabContents = module.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.add('d-none'));
            tabContents[index].classList.remove('d-none');
        });
    });
});