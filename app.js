const showInscriptionButton = document.querySelector(".add-apprenant");
const inscriptionApprenantInterface = document.querySelector(".rigth-side");





showInscriptionButton.addEventListener('click', event => showApprenantInscriptionInterface(event));


const showAndHideApprenantInscriptionInterface = (event) =>{

}

const showApprenantInscriptionInterface = (event) => {
    let element = event.target;
    element.classList.add('isClicked');
    console.log(event.target);
    // 
    let isEmbeded = inscriptionApprenantInterface.classList.contains("isEmbeded");
    if (isEmbeded) {
        
        
    }

}

const hideApprenantInscriptionInterface = (event) => { }