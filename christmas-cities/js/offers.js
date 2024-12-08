let offers = [
  {
    cityOrigin: "Madrid", cityDestination: "Paris", transportMedium: "Avión", price: "150"
  },
  {
    cityOrigin: "Madrid", cityDestination: "Amsterdam", transportMedium: "Avión", price: "300"
  },
  {
    cityOrigin: "Paris", cityDestination: "Amsterdam", transportMedium: "Tren", price: "50"
  },
  {
    cityOrigin: "Paris", cityDestination: "Amsterdam", transportMedium: "Avión", price: "250"
  }
];

function loadTable() {
  document.getElementById("show-offers").addEventListener("click", showOffers, false);
  document.getElementById("new-offer").addEventListener("submit", newOffer, false);
}


function validateFormOffers(formOffer) {
  let valid = true;

  const ORIGIN = formOffer["city-origin"].value.trim();
  const DESTINATION = formOffer["city-destination"].value.trim();
  const TRANSPORT = formOffer["transport-medium"].value.trim();
  const PRICE = formOffer["price"].value.trim();

  if (!ORIGIN) {
    document.getElementById("error-cityo").style.visibility = "visible";
    valid = false;
  } else {
    document.getElementById("error-cityo").style.visibility = "hidden";
  }


  if (!DESTINATION) {
    document.getElementById("error-cityd").style.visibility = "visible";
    valid = false;
  } else {
    document.getElementById("error-cityd").style.visibility = "hidden";
  }


  if (!TRANSPORT) {
    document.getElementById("error-cityt").style.visibility = "visible";
    valid = false;
  } else {
    document.getElementById("error-cityt").style.visibility = "hidden";
  }

  
  if (!PRICE || isNaN(PRICE) || parseFloat(PRICE) <= 0) {
    document.getElementById("error-cityp").style.visibility = "visible";
    valid = false;
  } else {
    document.getElementById("error-cityp").style.visibility = "hidden";
  }

  return valid;
}


function newOffer(e) {
  e.preventDefault(); 

  let formOffer = e.target;

 
  if (!validateFormOffers(formOffer)) {
    console.log("Te faltan campos por rellenar o son incorrectos.");
    return; 
  }

 
  let newCityOriginByUser = document.getElementById("city-origin").value;
  let newCityDestinationByUser = document.getElementById("city-destination").value;
  let newTransportMediumByUser = document.getElementById("transport-medium").value;
  let newPriceByUser = document.getElementById("price").value;

  let newOffer = {
    cityOrigin: newCityOriginByUser,
    cityDestination: newCityDestinationByUser,
    transportMedium: newTransportMediumByUser,
    price: newPriceByUser
  };

  //add new offer to array
  offers.push(newOffer);
  localStorage.setItem("offers", JSON.stringify(offers));

  showOffers();
}


function showOffers() {
  const BODYTABLE = document.getElementById("offers-list");
  let FULLTABLE = "";

  // Llenar la tabla con las ofertas existentes
  for (let i = 0; i < offers.length; i++) {
    FULLTABLE += `
      <div id="offer-${i}">
        <p><span><strong>Origen: </strong>${offers[i].cityOrigin}</span></p>
        <p><span><strong>Destino: </strong>${offers[i].cityDestination}</span></p>
        <p><span><strong>Medio de Transporte: </strong>${offers[i].transportMedium}</span></p>
        <p><span><strong>Precio: </strong>${offers[i].price}</span></p>
        <button class="delete" data-index="${i}">Borrar</button>
        <button class="edit" data-index="${i}">Editar</button>
      </div>
    `;
  }

  BODYTABLE.innerHTML = FULLTABLE;

  // Agregar eventos a los botones de borrar y editar
  const DELETEBUTTONS = document.querySelectorAll(".delete");
  DELETEBUTTONS.forEach(button => {
    button.addEventListener("click", deleteItem);
  });

  const EDITBUTTONS = document.querySelectorAll(".edit");
  EDITBUTTONS.forEach(button => {
    button.addEventListener("click", editItem);
  });
}

// Eliminar una oferta
function deleteItem(e) {
  e.preventDefault();
  const offerIndex = e.target.getAttribute("data-index");
  offers.splice(offerIndex, 1);
  localStorage.setItem("offers", JSON.stringify(offers));
  showOffers();
}

// Editar una oferta
function editItem(e) {
  e.preventDefault();
  const offerIndex = e.target.getAttribute("data-index");
  const offerToEdit = offers[offerIndex];

  document.getElementById("edit-city-origin").value = offerToEdit.cityOrigin;
  document.getElementById("edit-city-destination").value = offerToEdit.cityDestination;
  document.getElementById("edit-transport-medium").value = offerToEdit.transportMedium;
  document.getElementById("edit-price").value = offerToEdit.price;

  document.getElementById("edit-form-container").style.display = "block";
  document.getElementById("offers-list").style.display = "none";

  document.getElementById("edit-offer-form").onsubmit = function(event) {
    saveEditChanges(event, offerIndex);
  };

  document.getElementById("cancel-edit").onclick = function() {
    cancelEdit();
  };
}

// Guardar los cambios de la oferta editada
function saveEditChanges(e, index) {
  e.preventDefault();
  const UPDATECITYORIGIN = document.getElementById("edit-city-origin").value;
  const UPDATECITYDESTINATION = document.getElementById("edit-city-destination").value;
  const UPDATETRANSPORTMEDIUM = document.getElementById("edit-transport-medium").value;
  const UPDATEPRICE = document.getElementById("edit-price").value;

  offers[index] = {
    cityOrigin: UPDATECITYORIGIN,
    cityDestination: UPDATECITYDESTINATION,
    transportMedium: UPDATETRANSPORTMEDIUM,
    price: UPDATEPRICE
  };

  localStorage.setItem("offers", JSON.stringify(offers));
  showOffers();
  cancelEdit();
}

// Cancelar la edición de la oferta
function cancelEdit() {
  document.getElementById("edit-form-container").style.display = "none";
  document.getElementById("offers-list").style.display = "block";

  document.getElementById("edit-city-origin").value = '';
  document.getElementById("edit-city-destination").value = '';
  document.getElementById("edit-transport-medium").value = '';
  document.getElementById("edit-price").value = '';
}

loadTable();  // Inicializa la carga de la tabla
