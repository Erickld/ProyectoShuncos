const containerFooter = document.querySelector('#footer-container');
fetch('./html/footerTemplate.html').then(res => res.text()).then(data => {
    containerFooter.innerHTML = data;
})