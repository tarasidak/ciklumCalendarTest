/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import './styles/main.scss';

const root = document.querySelector('#root');
const createButton = document.querySelector('.btn-create');

function addNewEvent() {
  const eventName = document.querySelector('.eventName');
  const eventDay = document.querySelector('.days');
  const eventTime = document.querySelector('.time');
  const day = [...document.querySelectorAll('th')];
  const tbody = document.querySelector('tbody');
  const eventMemberSelected = document.querySelectorAll('.members option:checked');
  const randomNumber = Math.floor(Math.random()*10000);

  for (let i = 0; i < day.length; i++) {
    if (eventDay.value === day[i].outerText) {
      for (let j = 0; j < tbody.rows.length; j++) {
        if (eventTime.value === tbody.rows[j].cells[0].outerText) {
          if (tbody.rows[j].cells[i].childNodes.length === 0) {
            const values = Array.from(eventMemberSelected).map((el) => el.value);
            tbody.rows[j].cells[i].insertAdjacentHTML('afterbegin',
              `<div class="personEvent ${values.join(' ')}" id="${randomNumber}" draggable="true"}>${eventName.value}
                <span data-bs-toggle="modal" data-bs-target="#exampleModalSec" class="deleteButton">X</span></div>`);
            tbody.rows[j].cells[i].style.setProperty('background-color', 'lightgreen', 'important');
            tbody.rows[j].cells[i].childNodes[0].addEventListener('dragstart', onDragStart);
          } else {
            alert('This slot is already busy!');
          }
        }
      }
    }
  }
}

root.onclick = function (event) {
  if (event.target.className !== 'deleteButton') {
    return;
  }
  const deleteEvent = document.querySelector('.deleteEventButton');
  deleteEvent.addEventListener('click', () => {
    const personEvent = event.target.closest('.personEvent');
    personEvent.parentElement.style.setProperty('background-color', 'white', 'important');
    personEvent.remove();
  });

  const notDeleteEvent = document.querySelector('.saveEventButton');
  notDeleteEvent.addEventListener('click', () => false);
};

const chooseMember = document.querySelector('.chooseMember');

function personalEvent() {
  const personEvent = [...document.querySelectorAll('.personEvent')];
  for (let i = 0; i < personEvent.length; i++) {
    personEvent[i].style.display = 'none';
    personEvent[i].parentElement.style.setProperty('background-color', 'white', 'important');

    if (chooseMember.value === 'All') {
      personEvent[i].style.display = 'block';
      personEvent[i].parentElement.style.setProperty('background-color', 'lightgreen', 'important');
    }

    if (personEvent[i].classList.contains(chooseMember.value)) {
      personEvent[i].style.display = 'block';
      personEvent[i].parentElement.style.setProperty('background-color', 'lightgreen', 'important');
    }
  }
}

chooseMember.addEventListener('change', personalEvent);
createButton.addEventListener('click', addNewEvent);

const tdElements = document.querySelectorAll('.td_item');

function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
    event.target.parentElement.style.setProperty('background-color', 'white', 'important');
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event
    .dataTransfer
    .getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  if(dropzone.hasChildNodes()){
    alert('This slot is busy');
  } else {
    dropzone.style.setProperty('background-color', 'lightgreen', 'important');
    dropzone.appendChild(draggableElement);
    event
    .dataTransfer
    .clearData();
  }
}

tdElements.forEach(element => element.addEventListener('dragover', onDragOver));
tdElements.forEach(element => element.addEventListener('drop', onDrop));
