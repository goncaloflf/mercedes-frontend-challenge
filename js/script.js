var nextElement = 1;

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

var object;

document.getElementById("add-btn").addEventListener("click", function() {
	let form = document.getElementById("newarticle-form");
	let formData = new FormData(form);

	/* Parse FormData object to JavaScript Object */
	object = {};
	formData.forEach(function(value, key) {
		object[key] = value;
	});

	/* Validates form (and adds the corresponding error messages) */
	let valid = validateForm(object);

	if (valid) {
		appendNewObject(object, closeModal);
		createIndexForRecentArticle(object);
		createIndexForRecentArticleSM(object);

		nextElement++;
	}
});

function createIndexForRecentArticleSM(object) {
	let entry = document
		.querySelector("#template-holder .menu-entry")
		.cloneNode(true);

	entry.innerHTML = object["title"];
	entry.href = "#sec" + nextElement;

	document.querySelector("#pages").prepend(entry);
}

function createIndexForRecentArticle() {
	let entry = document
		.querySelector("#template-holder .element")
		.cloneNode(true);
	entry.querySelector(".text").innerHTML = object["title"];
	entry.href = "#sec" + nextElement;
	document.getElementById("sidebar").prepend(entry);
}

/*
 *  Object received:
 *   - headline
 *   - subheadline
 *   - title
 *   - textarea-text
 *   -
 *   - (on/off) checkbox-image (optional)
 *   - image (optional)
 * 	 - (on/off) checkbox-right (optional)
 *   -
 *   - (on/off) checkbox-cta (optional)
 *   - cta (optional)
 */
function appendNewObject(object, callback) {
	let article;

	if ("checkbox-image" in object && object["checkbox-image"] == "on") {
		article = document
			.querySelector("#template-holder .image")
			.cloneNode(true);
		article.querySelector(".image-holder").style.backgroundImage = `url(${
			object["image"]
		})`;
		article.querySelector("span").innerHTML = object["textarea-text"];

		if (!("checkbox-right" in object && object["checkbox-right"] == "on")) {
			article.classList.add("left");
		}
	} else {
		if ("checkbox-cta" in object && object["checkbox-cta"] == "on") {
			article = document
				.querySelector("#template-holder .cta")
				.cloneNode(true);
			article.querySelector(".cta-button").innerHTML = object["cta"];
		} else {
			article = document
				.querySelector("#template-holder .simple")
				.cloneNode(true);
		}
		article.querySelector("p").innerHTML = object["textarea-text"];
	}
	article.querySelector("h5").innerHTML = object["title"];
	article.querySelector("h2").innerHTML = object["headline"];
	article.querySelector("h3").innerHTML = object["subheadline"];

	article.id = "sec" + nextElement;

	clearInputFields();
	document.querySelector(".articles").prepend(article);
	setTimeout(callback(), 1000);
}

function validateForm(object) {
	clearErrorMessages();

	let valid = true;

	/* Assumption: if CTA is checked, the CTA text is mandatory */
	if ("checkbox-cta" in object && object["checkbox-cta"] == "on") {
		if (!("cta" in object) || object["cta"] == "") {
			valid = false;
			document.querySelector(".error-holder .cta").classList.add("show");
		}
	}

	/* Assumption: if Image Element is checked, the Image URL is mandatory */
	if ("checkbox-image" in object && object["checkbox-image"] == "on") {
		if (!("image" in object) || object["image"] == "") {
			valid = false;
			document
				.querySelector(".error-holder .image")
				.classList.add("show");
		}
	}

	/* Assumption: title and text are mandatory*/
	if (
		!("title" in object) ||
		object["title"] == "" ||
		(!("textarea-text" in object) || object["textarea-text"] == "")
	) {
		valid = false;
		document.querySelector(".error-holder .other").classList.add("show");
	}

	return valid;
}

function clearErrorMessages() {
	document
		.querySelectorAll(".error-holder .show")
		.forEach(function(key, value) {
			key.classList.remove("show");
		});
}

function closeModal() {
	document.body.classList.remove("modal-open");
	clearErrorMessages();
}

function openModal() {
	document.body.classList.add("modal-open");
}

function clearInputFields() {
	document
		.querySelectorAll("input[type='text'], textarea")
		.forEach((key, value) => {
			key.value = "";
		});

	document
		.querySelectorAll("input[type='checkbox']")
		.forEach((key, value) => {
			key.checked = false;
		});
}
