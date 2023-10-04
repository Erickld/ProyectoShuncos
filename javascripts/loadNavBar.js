const containerNavBar = document.querySelector('#nav-bar-container');
fetch('/html/navBarTemplate.html').then(res => res.text()).then(data => {
    containerNavBar.innerHTML = data;
})