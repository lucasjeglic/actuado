document.addEventListener('DOMContentLoaded', function () {
	const chapters = document.querySelectorAll('.pillar-chapter-title:not(.skip-toc)');
	const lists = document.querySelectorAll('.pillar-nav-toc-02-list');

	chapters.forEach(function (chapter, index) {
		const id = 'chapter-' + (index + 1);
		chapter.setAttribute('id', id);
		const text = chapter.querySelector('.heading').textContent;

		lists.forEach(function (list) {
			if (!list.hasAttribute("data-manual")) {
				const listItem = document.createElement('li');
				const link = document.createElement('a');
				const span = document.createElement('span');
				span.textContent = index + 1;
				link.href = '#' + id;
				link.className = 'sr-border sr-card ' + list.dataset.color;
				link.appendChild(document.createTextNode(text));
				link.appendChild(span);
				listItem.appendChild(link);
				list.appendChild(listItem);
			}
		});
	});
});