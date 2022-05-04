import { monthEvents } from "./getMonth.js"

let titleEvent = document.getElementById("title-event");
let startDate = document.getElementById("start-date");
let timeRemindEvent = document.getElementById("time");
let description = document.getElementById("textarea-description");
let typeEvent = document.getElementById("Meeting");
let asideEvents = document.getElementById("aside-events");
const asidePempty = document.getElementById('aside-p-empty')
const form = document.getElementById("mainSectionModal");
const overlay = document.getElementById("blurModal");
const year = document.getElementById("currentYear");
let months;
let arrayHours = [];

let arrData = [];
// console.log(monthEvents);
if (localStorage.length !== 0) {
  arrData = JSON.parse(localStorage.getItem("calendar_events"));


}

function saveData() {

  let timeSplit = startDate.value.split("T");
  let objData = {
    title: titleEvent.value,
    startDate: {
      time: timeSplit[1],
      date: timeSplit[0],
    },
    timeRemindEvent: timeRemindEvent.value,
    description: description.value,
    typeEvent: typeEvent.value,
  };


  arrData.push(objData);
  orderLocal(arrData)
  localStorage.setItem("calendar_events", JSON.stringify(arrData));

  getEventData();
  addEventDay(months, arrayHours);
  overlay.classList.add('hide');

  form.classList.add('hide');

  // location.reload()
}

function addEventDay(monthEvents, array) {
  months = monthEvents;
  arrayHours = array;
  console.log("horas "+ arrayHours);
  const date = new Date();

  //we get localStorage item
  const events = JSON.parse(localStorage.getItem("calendar_events"));
  console.log(events);
  //loop localStorage
  if (events != null) { //if localStorage is not empty

    events.forEach(eventsLocal => { //recorremos el localStorage con este bucle

      console.log(parseInt(eventsLocal.startDate.date.split('-')[1]));
      console.log(parseInt(months+1));
      console.log(year.textContent);
      console.log(year.textContent == eventsLocal.startDate.date.split('-')[0]);

      if ((parseInt(eventsLocal.startDate.date.split('-')[1]) == months + 1) && (year.textContent == eventsLocal.startDate.date.split('-')[0])) { //comprobamos si el mes del evento que está en el local es igual al mes actual
        const daySection = document.getElementById(`${parseInt(eventsLocal.startDate.date.split('-')[2])}`);  //obtenemos el dia del evento
        console.log("horas "+ arrayHours);


        if (daySection.hasChildNodes()) {  //si el daySection tiene hijos hacemos una comprobacion de daySection

          if (daySection.querySelector('.section__div--span') == null) {  //comprobamos si daySection tiene hijos con la clase section__div--span
            //creamos el hijo en caso de que de null
            const divEvents = document.createElement('div');
            divEvents.setAttribute('class', 'section__div--span');
            // daySection.appendChild(divEvents);
            console.log("creando div para span");
            

            if(divEvents.querySelectorAll('.section__span--span').length == 0){
              console.log("creando span para evento");
              const span = document.createElement('span');
              span.setAttribute('class', 'section__span--span');
              span.textContent = `${eventsLocal.title} - ${eventsLocal.startDate.time}`;
              divEvents.appendChild(span);
              daySection.appendChild(divEvents);
              arrayHours.push(eventsLocal.startDate.time);
            }
          }else{
            console.log("ya tiene eventos");
            for(let i = 0; i < events.length; i++){
              if(!arrayHours.includes(events[i].startDate.time) && (daySection.getAttribute("id") == parseInt(events[i].startDate.date.split("-")[2]))){
                let divEvents = daySection.querySelector(".section__div--span");
                const span = document.createElement('span');
                span.setAttribute('class', 'section__span--span');
                span.textContent = `${events[i].title} - ${events[i].startDate.time}`;
                divEvents.appendChild(span);
                arrayHours.push(events[i].startDate.time);
              }
            }
          }
        }
      }
    })
  }
  //we get day's div

}

function orderLocal(arrData) {
  arrData.sort((a, b) => new Date(a.startDate.date).getTime() - new Date(b.startDate.date).getTime());
}


function getEventData() {
  let events = JSON.parse(localStorage.getItem("calendar_events"));

  const date = new Date();

  if (localStorage.getItem("calendar_events") != null) {



    if (asideEvents.hasChildNodes) {


      const articles = document.querySelectorAll('.aside__article--Event');

      articles.forEach(children => {
        asideEvents.removeChild(children)
      })


    }

    events.forEach((element) => {

      if (element.startDate.date.split('-')[2] == date.getDate()) {


        let eventArticle = document.createElement("article");
        eventArticle.className = "aside__article--Event"
        let eventTitle = element.title;
        let eventDate = element.startDate.date;
        let eventTime = element.startDate.time;
        let eventDescription = element.description;
        let typeEvent = element.typeEvent;

        let i = 0;

        while (i < 5) {
          let eventInfo = document.createElement("p");
          switch (i) {
            case 0:
              eventInfo.setAttribute("id", "title-aside");
              eventInfo.textContent = eventTitle;
              eventArticle.appendChild(eventInfo);
              break;
            case 1:
              eventInfo.setAttribute("id", "start-date-aside");
              eventInfo.textContent = eventDate;
              eventArticle.appendChild(eventInfo);
              break;
            case 2:
              eventInfo.setAttribute("id", "start-time-aside");
              eventInfo.textContent = eventTime;
              eventArticle.appendChild(eventInfo);
              break;
            case 3:
              eventInfo.setAttribute("id", "description-aside");
              eventInfo.textContent = eventDescription;
              eventArticle.appendChild(eventInfo);
              break;
            case 4:
              eventInfo.setAttribute("id", "type-event-aside");
              eventInfo.textContent = typeEvent;
              eventArticle.appendChild(eventInfo);
              break;
          }
          i++;
        }
        asideEvents.appendChild(eventArticle);
      }


    });

    if (asideEvents.hasChildNodes) {

      const articles = document.querySelectorAll('.aside__article--Event');


      if (articles.length != 0) {
        asidePempty.classList.add('hide')
      } else {
        asidePempty.classList.remove('hide')
      }

    }

  }
}

function clearData() {
  titleEvent.value = "";
  startDate.value = "";
  timeRemindEvent.value = "5";
  description.value = "";
  typeEvent.value = "meeting";
}

export { saveData, clearData, getEventData, addEventDay };
