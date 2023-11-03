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
    
    if (currentUser) {
        currentUser = JSON.parse(currentUser);
        document.getElementById("username-txt").textContent = currentUser.username;
        
        let dropdownsHTML = ``;
        let liElementsHTML = ``
        if (currentUser.isAdmin) {
            dropdownsHTML = 
            `<li><a class="dropdown-item font-14" href="#"><i class="bi bi-person-circle"></i> Mi cuenta</a></li>
            <li><a class="dropdown-item font-14" href="#"><i class="bi bi-list-task"></i> Productos</a></li>
            <li><hr class="dropdown-divider border-white"></li>
            <li><a class="dropdown-item font-14" href="#" onclick="cerrarSesion()"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>`;

            liElementsHTML = 
            `<li class="nav-item me-2 button-nav-3 show-in-login">
                <a class="nav-link" href="../login.html">
                    <button type="button" class="btn btn-nav font-14" >
                        <i class="bi bi-person-circle"></i> Mi cuenta
                    </button>
                </a>
            </li>
            <li class="nav-item me-2 button-nav-3 show-in-login">
                <a class="nav-link" href="../login.html">
                    <button type="button" class="btn btn-nav font-14" >
                        <i class="bi bi-list-task"></i> Productos
                    </button>
                </a>
            </li>
            <li class="nav-item me-2 button-nav-3 show-in-login">
                <a class="nav-link" href="../login.html" onclick="cerrarSesion()">
                    <button type="button" class="btn btn-nav font-14" >
                        <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                    </button>
                </a>
            </li>`
        
        } else {
            dropdownsHTML = 
            `<li><a class="dropdown-item font-14" href="#"><i class="bi bi-person-circle"></i> Mi cuenta</a></li>
            <li><hr class="dropdown-divider white-color"></li>
            <li><a class="dropdown-item font-14" href="#" onclick="cerrarSesion()"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>`;

            liElementsHTML = 
            `<li class="nav-item me-2 button-nav-3 show-in-login">
                <a class="nav-link" href="../login.html">
                    <button type="button" class="btn btn-nav font-14" >
                        <i class="bi bi-person-circle"></i> Mi cuenta
                    </button>
                </a>
            </li>
            <li class="nav-item me-2 button-nav-3 show-in-login">
                <a class="nav-link" href="../login.html" onclick="cerrarSesion()">
                    <button type="button" class="btn btn-nav font-14" >
                        <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                    </button>
                </a>
            </li>`
        }

        let dropdownsNavBar = document.querySelectorAll(".dropdown-nav-bar-menu");
        dropdownsNavBar.forEach(element => {
            element.innerHTML = dropdownsHTML;
        });

        let unorderedList = document.getElementById("navbar-unordered-list");        
        unorderedList.innerHTML += liElementsHTML;

        let showInLogin = document.querySelectorAll(".show-in-login");
        let hideInLogin = document.querySelectorAll(".hide-in-login");
        showInLogin.forEach(element => {
            element.setAttribute('style', 'display:initial');
        });
        hideInLogin.forEach(element => {
            element.setAttribute('style', 'display:none !important');
        });


    } else {

        let showInLogin = document.querySelectorAll(".show-in-login");
        let hideInLogin = document.querySelectorAll(".hide-in-login");
        showInLogin.forEach(element => {
            element.setAttribute('style', 'display:none !important');
        });
        hideInLogin.forEach(element => {
            element.setAttribute('style', 'display:initial');
        });

    }

});