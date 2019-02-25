document.getElementById("toggle-menu").addEventListener("click", function() {
	document.getElementById("header").classList.toggle("open");
});

document.body.addEventListener("click", function(event) {
	if (!event.target.closest("header")) {
		document.getElementById("header").classList.remove("open");
	}
});

document
	.getElementById("form-modal")
	.addEventListener("click", function(event) {
		if (!event.target.closest(".edit-box")) {
			closeModal();
		}
	});

document
	.getElementById("add-new-content")
	.addEventListener("click", function() {
		openModal();
	});

document.getElementById("cancel-btn").addEventListener("click", function() {
	closeModal();
});

document
	.getElementById("checkbox-image")
	.addEventListener("change", function(e) {
		if (e.target.checked) {
			document.querySelector("input[name='image']").disabled = false;
			document.getElementById("checkbox-cta").checked = false;
			let event = new Event("change");
			document.getElementById("checkbox-cta").dispatchEvent(event);
		} else {
			document.querySelector("input[name='image']").disabled = true;
		}
	});
document.getElementById("checkbox-cta").addEventListener("change", function(e) {
	if (e.target.checked) {
		document.querySelector("input[name='cta']").disabled = false;
		document.getElementById("checkbox-image").checked = false;

		let event = new Event("change");
		document.getElementById("checkbox-image").dispatchEvent(event);
	} else {
		document.querySelector("input[name='cta']").disabled = true;
	}
});

function closeModal() {
	document.body.classList.remove("modal-open");
}

function openModal() {
	document.body.classList.add("modal-open");
}
