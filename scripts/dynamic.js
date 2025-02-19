/* Jeremy Calhoun
WEB215-N801 Spring 25 */

function components(component, elementTag) {
    return fetch(component)
        .then((content) => content.text())
        .then((text) => {
        const element = document.querySelector(elementTag);
        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(text, 'text/html');
        const fragment = document.createDocumentFragment();
        Array.from(parsedDoc.body.childNodes).forEach((child) => {
            fragment.appendChild(child);
        });
        element.appendChild(fragment);
        })
        .catch((error) => console.error(`Error loading ${component}:`, error));
}

document.addEventListener('DOMContentLoaded', () => {
Promise.all([
    components('components/header.html', 'header'),
    components('components/footer.html', 'footer')
]);
});