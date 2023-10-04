const containerNavBar = document.querySelector('#nav-bar-container');
const fuenteNavBar = document.currentScript.getAttribute('fuente');
const urlNavBar = (fuenteNavBar == "root") ? ('./html/navBarTemplate.html') : ('./navBarTemplate.html');

fetch(urlNavBar).then(res => res.text()).then(data => {
    containerNavBar.innerHTML = data;
    document.getElementById('logo-shuncos-navbar').src = (fuenteNavBar == "root") ? ('./assets/img/shuncos_logo_nav_bar.png') : ('../assets/img/shuncos_logo_nav_bar.png');
})