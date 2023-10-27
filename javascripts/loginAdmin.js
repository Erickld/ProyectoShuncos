const username = document.querySelector("#userInput");
const password = document.querySelector("#passwordAdmin");
const btn = document.querySelector("#btn-login");

btn.addEventListener("click", function(event) {
	event.preventDefault()
	if (username.value == ""){
		username.classList.add("errorField")
	}
	if (password.value == ""){
		password.classList.add("errorField")
	}
});

username.addEventListener("keyup", function(){
	username.classList.remove("errorField")
})

password.addEventListener("keyup", function(){
	password.classList.remove("errorField")
})