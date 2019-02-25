document.getElementById("toggle-menu").addEventListener("click", function() {
	document.getElementById("header").classList.toggle("open");
});

document.body.addEventListener("click", function(event) {
	if (!event.target.closest("header")) {
		document.getElementById("header").classList.remove("open");
	}
});
