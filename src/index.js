import 'emoji-picker-element';
import { Picker } from 'emoji-picker-element';

let currentEmoji = '😋';

let emojiPickerContainer = document.getElementById('emoji-picker-container');
const picker = new Picker({
    dataSource: './data.json',
});
picker.classList.add('dark');
emojiPickerContainer.appendChild(picker);

let emojiPickerElement = document.querySelector('emoji-picker');
let currentEmojiElement = document.getElementById('current-emoji');
let resultInputElement = document.getElementById('result-input');
let gridItemElements = document.querySelectorAll('.grid-item');
let gridContainerElement = document.querySelector('.grid-container');

currentEmojiElement.innerHTML = currentEmoji;

emojiPickerElement.addEventListener('emoji-click', function (event) {
    currentEmoji = event.detail.unicode;
    currentEmojiElement.innerHTML = currentEmoji;
});

let isMouseDown = false;

function refreshResult() {
    let textHolder = '';

    gridItemElements.forEach(function (element) {
        textHolder += element.innerHTML;
    });

    resultInputElement.value = textHolder;
}

gridContainerElement.addEventListener('mouseleave', function (e) {
    isMouseDown = false;
});

gridItemElements.forEach(function (element) {
    element.addEventListener('mousedown', function (event) {
        isMouseDown = true;
        element.innerHTML = currentEmoji;
        refreshResult();
    });

    element.addEventListener('mouseup', function (event) {
        isMouseDown = false;
        refreshResult();
    });

    element.addEventListener('mouseover', function (event) {
        if (isMouseDown) {
            element.innerHTML = currentEmoji;
            refreshResult();
        }
    });

    element.addEventListener('click', function (event) {
        element.innerHTML = currentEmoji;
        isMouseDown = false;
        refreshResult();
    });
});

//dark mode
let toggleElement = document.getElementById('toggle');
let bodyElement = document.querySelector('body');
let h2Elements = document.querySelectorAll('h2');
let githubElement = document.querySelector('.fa-github-square');

function replaceElementClassName(oldClassName, newClassName, ...elements) {
    elements.forEach(function (element) {
        element.classList.remove(oldClassName);
        element.classList.add(newClassName);
    });
}

let theme = localStorage.getItem('theme');
let darkMode = true;

if (theme === 'light') {
    darkMode = false;
    replaceElementClassName(
        'dark',
        'light',
        toggleElement,
        bodyElement,
        emojiPickerElement,
        githubElement,
        ...h2Elements
    );
}

toggleElement.addEventListener('click', function () {
    if (darkMode) {
        replaceElementClassName(
            'dark',
            'light',
            toggleElement,
            bodyElement,
            emojiPickerElement,
            githubElement,
            ...h2Elements
        );
        localStorage.setItem('theme', 'light');
    } else {
        replaceElementClassName(
            'light',
            'dark',
            toggleElement,
            bodyElement,
            emojiPickerElement,
            githubElement,
            ...h2Elements
        );
        localStorage.setItem('theme', 'dark');
    }
    darkMode = !darkMode;
});
