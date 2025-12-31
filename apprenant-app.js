
let dragingSidebarMenu = document.querySelector('.all-screens img');
let sidebarMenu = document.querySelector('.sidebar-menu');
let menu = document.querySelector('.menu');
let screens = document.querySelector('.screens');


// Show and hide sidebar menu.
dragingSidebarMenu.addEventListener("click", event => showHideSidebarMenu());
const showHideSidebarMenu = () => {
    sidebarMenu.classList.toggle('draged');
}


let currentClassIndex = 0;
menu.addEventListener('click', (event) => {
    // Tarcking the class current class.
    let target = event.target;
    const targetedClass = target.className.split(" ")[0];
    if (targetedClass === 'profil') {
        toggleBetweenScreens(currentClassIndex, 0);
        currentClassIndex = 0;
    } if (targetedClass === 'dashboard') {
        toggleBetweenScreens(currentClassIndex, 1);
        currentClassIndex = 1;
    } if (targetedClass === 'statistic') {
        toggleBetweenScreens(currentClassIndex, 2);
        currentClassIndex = 2;
    } if (targetedClass === 'historic') {
        toggleBetweenScreens(currentClassIndex, 3);
        currentClassIndex = 3;
    }

});

const toggleBetweenScreens = (currentClassIndex, targetedScreen) => {
    console.log('currentClassIndex :' + currentClassIndex, 'targetedScreen :' + targetedScreen)
    screens.children[currentClassIndex].classList.remove('activated');
    menu.children[currentClassIndex].classList.remove('activated');

    screens.children[targetedScreen].classList.add('activated');
    menu.children[targetedScreen].classList.add('activated');
}

// Local Storage functionalities:
const STORAGE_KEY = 'apprenants';
// - GET : local storage .
export const getApprenants = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Profile section.
// Apprenent DOM elements.
let apprenantName = document.querySelector('.name');
let apprenantLastName = document.querySelector('.last-name');
let apprenantGroup = document.querySelector('.group');
let apprenantId = document.querySelector('.user-id');
let apprenantImage = document.querySelector('.user-image img');
let totalPrecence = document.querySelector('.total-precence');
let totalAbsence = document.querySelector('.total-absence');
let totalRetard = document.querySelector('.total-retard');
let apprenantStatus = document.querySelector('.apprenant-status');

// Loading While browser load.
window.onload = () => {
    // find the apprenant id from url.
    let userId = +window.location.href.split("?")[1];
    getApprenant(userId);
}

const getApprenant = (userId) => {
    let apprenants = getApprenants();
    let apprenant = apprenants.filter((apprenent) => apprenent.id === userId);

    renderApprenantData(apprenant[0]);
}

const renderApprenantData = (apprenant) => {
    console.log(apprenant);
    let statistique = apprenant.statistique;
    renderApprenantDataStatus(statistique);
    apprenantInnerElement(apprenantName, apprenant.nom);
    apprenantInnerElement(apprenantLastName, apprenant.prenom);
    apprenantInnerElement(apprenantGroup, apprenant.group);
    apprenantInnerElement(apprenantId, apprenant.id);
    apprenantInnerElement(apprenantImage, apprenant.image);
    apprenantInnerElement(totalPrecence, statistique.tauxPresence);
    apprenantInnerElement(totalAbsence, statistique.numberAbsence);
    apprenantInnerElement(totalRetard, statistique.numberRetard);
}

const renderApprenantDataStatus = (statistique) => {
    if (statistique.numberAbsence > 3 || statistique.numberAbsence > 2) {
        apprenantStatus.innerText = 'Absent fréquent';
        apprenantStatus.style.color = "red";
    } else if (statistique.numberRetard == statistique.tauxPresence) {
        apprenantStatus.innerText = "À surveiller";
        apprenantStatus.style.color  = "green";
    } else {
        apprenantStatus.innerText = "Assidu";
    }
}

const apprenantInnerElement = (HTMLElement, data) => {
    if (HTMLElement.hasAttribute("src")) {
        HTMLElement.src = data;
    } else {
        HTMLElement.innerText = data
    }
}





// Dashboard section

// Statistic section

// Historic section