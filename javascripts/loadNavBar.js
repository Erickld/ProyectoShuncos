const containerNavBar = document.querySelector('#nav-bar-container');
const fuenteNavBar = document.currentScript.getAttribute('fuente');
const urlNavBar = (fuenteNavBar == "root") ? ('./html/navBarTemplate.html') : ('./navBarTemplate.html');
let currentUser = localStorage.getItem('currentUser');

fetch(urlNavBar).then(res => res.text()).then(data => {
    containerNavBar.innerHTML = data;
    document.getElementById('logo-shuncos-navbar').src = (fuenteNavBar == "root") ? ('./assets/img/shuncos_logo_nav_bar.webp') : ('../assets/img/shuncos_logo_nav_bar.webp');

    let links = document.querySelectorAll(".link-home");
    links[0].href = (fuenteNavBar == "root") ? ('./index.html') : ('../index.html');
    links[1].href = (fuenteNavBar == "root") ? ('./index.html') : ('../index.html');
    document.querySelector(".link-store").href = (fuenteNavBar == "root") ? ('./html/storeProducts.html') : ('./storeProducts.html');
    document.querySelector(".link-about-us").href = (fuenteNavBar == "root") ? ('./html/About.html') : ('./About.html');
    document.querySelector(".link-contact-us").href = (fuenteNavBar == "root") ? ('./html/ContactUs.html') : ('./ContactUs.html');
    
    let showInLogin = document.querySelectorAll(".show-in-login");
    let hideInLogin = document.querySelectorAll(".hide-in-login");
    
    if (currentUser) {
        currentUser = JSON.parse(currentUser);
        showInLogin.forEach(element => {
            element.setAttribute('style', 'display:initial');
        });
        hideInLogin.forEach(element => {
            element.setAttribute('style', 'display:none !important');
        });

        document.getElementById("username-txt").textContent = currentUser.username;
        
        let dropdownsHTML = ``;
        if (currentUser.isAdmin) {
            dropdownsHTML = 
            `
            <li><a class="dropdown-item font-14" href="#"><i class="bi bi-person-circle"></i> Mi cuenta</a></li>
            <li><hr class="dropdown-divider white-color"></li>
            <li><a class="dropdown-item font-14" href="#"><i class="bi bi-person-circle"></i> Pedidos</a></li>
            <li><a class="dropdown-item font-14" href="#" onclick="cerrarSesion()"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>
            `
        } else {
            dropdownsHTML = 
            `
            <li><a class="dropdown-item font-14" href="#"><i class="bi bi-person-circle"></i> Mi cuenta</a></li>
            <li><hr class="dropdown-divider white-color"></li>
            <li><a class="dropdown-item font-14" href="#" onclick="cerrarSesion()"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>
            `
        }

        let dropdownsNavBar = document.querySelectorAll(".dropdown-nav-bar-menu");
        dropdownsNavBar.forEach(element => {
            element.innerHTML = dropdownsHTML;
        });


    } else {
        showInLogin.forEach(element => {
            element.setAttribute('style', 'display:none !important');
        });
        hideInLogin.forEach(element => {
            element.setAttribute('style', 'display:initial');
        });
    }

});