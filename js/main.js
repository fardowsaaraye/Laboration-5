"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // rensa tidigare felmeddelande
    errors = [];

    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value.trim () === ""){
        errors.push("Du måste ange ditt fullstända namn");
        }
    if(emailInput.value.trim() ===""){
            errors.push("Du måste ange din e-postadress");
        }
    if (phoneInput.value.trim () === ""){
        errors.push("Du måste ange ditt telefonnummer");
       } 

    // Visa eventuella felmeddelanden
      displayErrors ();
    // Returnera resultatet (true eller false) av valideringen
      if (errors.length === 0) {
        return true;
         } else { 
          return false;
          }

}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";
    // Skriv ut aktuella felmeddelanden till DOM
     errors.forEach(function(error) {
     const listItem = document.createElement ("li");
     listItem.textContent = error;
     errorList.appendChild(listItem);
     } );

}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
     const studentCard = {
        name: fullnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        font: fontSelect.value,
        };
    // Uppdatera studentkortet
    previewFullname.textContent = studentCard.name;
    previewEmail.textContent = studentCard.email;
    previewPhone.textContent = studentCard.phone;

    // Uppdatera typsnittet på studentkortet 
    previewFullname.style.fontFamily = studentCard.font;
    previewEmail.style.fontFamily = studentCard.font;
    previewPhone.style.fontFamily = studentCard.font;

    // Lägg till studentkortet i historiken
    history.unshift(studentCard);
   // Spara och uppdatera historiken
   saveHistory();
   renderHistory();

}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    const savedHistory = JSON.stringify(history);
    localStorage.setItem("history", savedHistory);
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) { 
        history = JSON.parse(savedHistory);
        }
    // Uppdatera history
    renderHistory();
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
   historySection.innerHTML = "";
    // Skriv ut innehållet i history till DOM
    history.forEach(function(studentCard){
     const article = document.createElement("article");
     const name = document.createElement("p");
     const email = document.createElement("p");
     const phone = document.createElement("p");
     const font = document.createElement("p");

     name.textContent = studentCard.name;
     email.textContent = studentCard.email;
     phone.textContent = studentCard.phone;
     font.textContent = studentCard.font

     article.appendChild(name);
     article.appendChild(email);
     article.appendChild(phone);
     article.appendChild(font);
     historySection.appendChild(article);
    });


 }


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();

    previewFullname.textContent =""; 
    previewEmail.textContent ="";
    previewPhone.textContent ="";
    // Rensa eventuella felmeddelanden
    errorList.innerHTML ="";
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("history"); 
    // Uppdatera history och visningen på sidan
    history = [];
    renderHistory();
}


// Eventlyssnare

// När formuläret skickas:
  form.addEventListener ("submit", function(event) {
    event.preventDefault ();
    
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
     if (validateForm()) {
        createStudentCard();
        
     }
    });

// När användaren klickar på "Rensa"
clearButton.addEventListener("click",clearForm); 

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
window.addEventListener("load",loadHistory);