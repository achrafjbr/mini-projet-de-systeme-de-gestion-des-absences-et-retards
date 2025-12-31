
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

