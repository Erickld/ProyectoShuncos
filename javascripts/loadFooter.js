const containerFooter = document.querySelector('#footer-container');
const fuenteFooter = document.currentScript.getAttribute('fuente');
const urlFooter = (fuenteFooter == "root") ? ('./html/footerTemplate.html') : ('./footerTemplate.html');

fetch(urlFooter).then(res => res.text()).then(data => {
    containerFooter.innerHTML = data;
})