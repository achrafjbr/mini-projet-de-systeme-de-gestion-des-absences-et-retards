const showInscriptionButton = document.querySelector(".add-apprenant");
const inscriptionApprenantInterface = document.querySelector(".rigth-side");
const content = document.querySelector(".content");
const cardsOfLeftSide = document.querySelector(".left-side .apprenant-cards");
const headerInscription = document.querySelector('.header-inscription');

// Toggling between cards of navbar and screens
const navBarcards = document.querySelector(".cards");
const firstScreen = document.querySelector(".screens");

// Apprenant Elements.
const deletebtn = document.querySelector(".delete-btn");
const editBtn = document.querySelector(".edit-btn");

const addAndDeleteButton = document.querySelectorAll(".apprenant-buttons");

// These Elements for toggling between NavBarCards & Screens.
let trackTheActiveScreen = firstScreen.firstElementChild;
let trackTheActiveCard = navBarcards.firstElementChild;

navBarcards.addEventListener("click", ScreenToggling);

// Toggling between NavBarCards & Screens.
function ScreenToggling(event) {
    const card = event.target.closest('.card');;
    let cibledCardId = card.id;
    let screen = document.getElementById("screen" + cibledCardId);

    if (!card) return;
    else {
        // Handling active card.
        toggleNavBarCard(card);
        // Handling active screen.
        toggleScreenDependOnNavBar(screen);
    }
}

// Handling active card.
const toggleNavBarCard = (card) => {
    trackTheActiveCard.classList.remove('active-card')
    trackTheActiveCard = card;
    trackTheActiveCard.classList.add("active-card");
}
// Handling active card.
const toggleScreenDependOnNavBar = (screen) => {
    trackTheActiveScreen.classList.remove("active-screen");
    trackTheActiveScreen = screen;
    trackTheActiveScreen.classList.add("active-screen");
}
// Show Inscription Interface Logic.
showInscriptionButton.addEventListener('click', event => showAndHideApprenantInscriptionInterface(event));

const showAndHideApprenantInscriptionInterface = (event) => {
    //let element = event.target;
    // element.classList.toggle('isClicked');

    let isEmbeded = inscriptionApprenantInterface.classList.toggle("isEmbeded");
    if (isEmbeded) {
        content.classList.add("animatedContent");
        showApprenantInscriptionInterface();
    } else {
        content.classList.remove("animatedContent");
        hideApprenantInscriptionInterface();
    }
}

const hideApprenantInscriptionInterface = () => {
    content.style.gridTemplateColumns = '2fr';
    cardsOfLeftSide.style.gridTemplateColumns = "repeat(4, 1fr)"
}

const showApprenantInscriptionInterface = () => {
    content.style.gridTemplateColumns = '1fr 1fr';
    cardsOfLeftSide.style.gridTemplateColumns = "repeat(2, 1fr)"

}


let apprenantImageList = [
    'images/characters/Alucard.jpg',
    'images/characters/bat-man.jpg',
    'images/characters/dead-pool.jpg',
    'images/characters/hulk.jpg',
    'images/characters/iron-man.jpg',
    'images/characters/jocker.jpg',
    'images/characters/luther-strode.jpg',
    'images/characters/spider-man.jpg',
    'images/characters/super-man.jpg',
    'images/characters/thor.jpg',
];


const generatingRandomApprenantImage = () => {
    let randomAprrenantImage = Math.floor(Math.random() * apprenantImageList.length);
    console.log(apprenantImageList[randomAprrenantImage]);
    return apprenantImageList[randomAprrenantImage];
}

const STORAGE_KEY = 'apprenants'



//Rest UI of apprenant-cards div
const resetApprenantCards = () => {
    cardsOfLeftSide.innerHTML = "";
}
const notApprenantFound = () => {
    cardsOfLeftSide.style.width = '50%';
    cardsOfLeftSide.style.grid = 'none';
    cardsOfLeftSide.style.backgroundColor = 'transparent';
    cardsOfLeftSide.style.width = 'fit-content';
    cardsOfLeftSide.style.padding = '2rem';
    const h2Tag = document.createElement("h2");
    h2Tag.style.textAlign = 'left';
    h2Tag.innerHTML = 'No Apprenant found yet!';
    cardsOfLeftSide.appendChild(h2Tag)
}
// Adding Apprenant data in the card;
const buildingApprenantCard = (apprenants) => {

    cardsOfLeftSide.innerHTML = ""; // clear first

    apprenants.forEach(apprenant => {
        const apprenantCard = document.createElement("div");
        apprenantCard.classList.add("apprenant-card");
        apprenantCard.dataset.id = apprenant.id;

        apprenantCard.innerHTML = `
    <div class="apprenant-buttons">
      <img src="images/edit.png" class="edit-btn">
      <img src="images/delete.png" class="delete-btn">
    </div>

    <div class="apprenant-image">
      <img src="${apprenant.image}" alt="character-image">
    </div>

    <div class="apprenant-fullname">
    <h2>${apprenant.prenom} ${apprenant.nom}</h2>
    </div>

    <div class="apprenant-group">
    <h4>${apprenant.group}</h4>
    </div>

    <div class="apprenant-status">
      <label>
        <input type="radio" name="status-${apprenant.id}" value="present"
          ${apprenant.status.present ? "checked" : ""}>
        Present
      </label>

      <label>
        <input type="radio" name="status-${apprenant.id}" value="absent"
          ${apprenant.status.absent ? "checked" : ""}>
        Absent
      </label>

      <label>
        <input type="radio" name="status-${apprenant.id}" value="retard"
          ${apprenant.status.retard.enretard ? "checked" : ""}>
        Retard
      </label>
    </div>`;

        cardsOfLeftSide.appendChild(apprenantCard);
    });

}

window.onload = () => {
    resetApprenantCards();
    let apprenants = getApprenants();
    console.log(apprenants[0].image);
    if (apprenants.length > 0) {
        buildingApprenantCard(apprenants);
    }
}

let retardPopup = document.querySelector('.retard-popup-container');

//Show popo up container.
const showPopUp = () => { retardPopup.classList.add('isPopedup'); }
//Hide popo up container.
retardPopup.addEventListener('click', _ => { retardPopup.classList.remove('isPopedup'); });
const hidePopUp = () => { retardPopup.classList.remove('isPopedup'); }

cardsOfLeftSide.addEventListener("change", (e) => {
    if (!e.target.matches('input[type="radio"]')) return;

    const card = e.target.closest(".apprenant-card");
    const id = Number(card.dataset.id);
    const value = e.target.value;
    let apprenants = getApprenants();
    const apprenant = apprenants.find(a => a.id === id);
    //console.log(card.children[4].lastElementChild);

    if (!apprenant) return;
    // Catch  entred data ( motif, temp ).
    document.querySelector(".retard-btn").addEventListener('click', _ => {
        let motif = document.querySelector('input[name=motif]').value;
        let temp = document.querySelector('input[name=temp]').value;
        if (value === "retard") {
            // Show retard popup.
            showPopUp();
            apprenant.status = {
                present: value === "present",
                absent: value === "absent",
                retard: {
                    enretard: value === "retard",
                    motif: apprenant.status.retard.motif = motif ?? motif,
                    temp: apprenant.status.retard.temp = temp ?? temp,
                }
            };
        }

        buildingApprenantCard(apprenants);
        saveApprenants(apprenants);
    });





});

// GET : local storage .
const getApprenants = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// SAVE : local storage .
const saveApprenants = (apprenants) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apprenants));
};

const getStatusFromRadio = (apprenantId) => {
    // let checkedRadio = document.querySelector(` input[name="status-${apprenantId}"]:checked `).value;
    const checkedRadio = document.querySelector('input[name="status"]:checked');

    const selected = checkedRadio ? checkedRadio.value : "present";

    return {
        present: selected === "present",
        absent: selected === "absent",
        retard: {
            enretard: selected === "retard",
            motif: selected === "retard" ? apprenantMotif : "",
            temp: selected === "retard" ? apprenantTempDarrive : ""
        }
    };

};

// Adding apprenant section.
document.querySelector(".inscription-btn button").addEventListener('click', event => {
    let formFilds = document.querySelectorAll('.inscription-form');
    let prenom = formFilds.item(0)[0].value;
    let nom = formFilds.item(0)[1].value;
    let group = formFilds.item(0)[2].value;

    let apprenant = {
        prenom: prenom,
        nom: nom,
        group: group
    };

    addApprenant(apprenant);
});

const createApprenant = (apprenant, imageApprenant, status) => ({
    id: Date.now(), // unique id
    prenom: apprenant.prenom,
    nom: apprenant.nom,
    group: apprenant.group,
    image: imageApprenant,
    status: status
});

const addApprenant = (apprenant) => {
    const apprenants = getApprenants();
    const status = getStatusFromRadio();
    const imageApprenant = generatingRandomApprenantImage();
    const newApprenant = createApprenant(
        apprenant,
        imageApprenant,
        status
    );

    apprenants.push(newApprenant);
    buildingApprenantCard(apprenants);
    saveApprenants(apprenants);
};


// Deleting apprenant section.
const deleteApprenant = (id) => {
    let apprenants = getApprenants();
    apprenants = apprenants.filter(a => a.id !== id);
    buildingApprenantCard(apprenants);
    saveApprenants(apprenants);
};

cardsOfLeftSide.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const apprenantID = +event.target.closest('.apprenant-card').dataset.id
        deleteApprenant(apprenantID);
    }
    return;
});

// Updating apprenant section.
const updateApprenant = (id, updatedData) => {
    const apprenants = getApprenants();
    const index = apprenants.findIndex(a => a.id === id);
    const status = apprenants[index].status;
    updatedData['status'] = status;
    if (index === -1) return;
    apprenants[index] = {
        ...apprenants[index],
        ...updatedData
    };
    buildingApprenantCard(apprenants);
    saveApprenants(apprenants);
    alert('La mise à jour passé avec succée!');
};

let modifyBarIsOpen = false;
cardsOfLeftSide.addEventListener("click", event => {
    if (event.target.classList.contains('edit-btn')) {
        const closestTag = event.target.closest('.apprenant-card');
        const apprenantID = +closestTag.dataset.id;
        const fullname = closestTag.children[2].firstElementChild.textContent.split(' ');
        // Prenom.
        const prenom = fullname[0];
        // Nom.
        const nom = fullname[1];
        // Group.
        const group = closestTag.children[3].firstElementChild.textContent;

        let formFilds = document.querySelectorAll('.inscription-form');
        formFilds.item(0)[0].value = prenom;
        formFilds.item(0)[1].value = nom;
        formFilds.item(0)[2].value = group;


        if (modifyBarIsOpen == false) {
            headerInscription.firstElementChild.textContent = "Modification";
            headerInscription.lastElementChild.textContent = "Modifier un apprenant(e)";
            modifyBarIsOpen = true;
        } else {
            headerInscription.firstElementChild.textContent = "Inscription";
            headerInscription.lastElementChild.textContent = "Enregistrer un apprenant(e)";
            modifyBarIsOpen = false;
        }

        showAndHideApprenantInscriptionInterface(event);
    }
    updateApprenant(apprenantID, {
        prenom: prenom,
        nom: nom,
        group: group
    });

});




