function isValidName(value) {
    var name;
    var index;
    var character;

    if (typeof value !== "string") {
        return false;
    }

    name = value.trim();

    if (name.length < 3) {
        return false;
    }

    for (index = 0; index < name.length; index = index + 1) {
        character = name.charAt(index);
        if (character >= "0" && character <= "9") {
            return false;
        }
    }

    return true;
}

function isValidEmail(value) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof value !== "string") {
        return false;
    }

    return emailPattern.test(value);
}

function isValidDescription(value) {
    var description;

    if (typeof value !== "string") {
        return false;
    }

    description = value.trim();
    
    return description.length >= 5;
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("lostItemForm");
        var reporterName = document.getElementById("reporterName");
        var reporterEmail = document.getElementById("reporterEmail");
        var itemDescription = document.getElementById("itemDescription");
        var lostLocation = document.getElementById("lostLocation");
        var confirmInfo = document.getElementById("confirmInfo");
        
        var submitBtn = document.getElementById("submitBtn");
        var clearBtn = document.getElementById("clearBtn");

        var reporterNameError = document.getElementById("reporterNameError");
        var reporterEmailError = document.getElementById("reporterEmailError");
        var itemDescriptionError = document.getElementById("itemDescriptionError");
        var lostLocationError = document.getElementById("lostLocationError");
        var confirmInfoError = document.getElementById("confirmInfoError");

        var resultSection = document.getElementById("resultSection");
        var resultHeading = document.getElementById("resultHeading");
        var resultDetails = document.getElementById("resultDetails");

        if (resultSection) {
            resultSection.style.display = "none";
        }

        if (form) {
            form.addEventListener("submit", function (event) {
                var nameOk;
                var emailOk;
                var descriptionOk;
                var locationOk;
                var confirmOk;
                var isValidForm;

                event.preventDefault();

                reporterNameError.textContent = "";
                reporterEmailError.textContent = "";
                itemDescriptionError.textContent = "";
                lostLocationError.textContent = "";
                confirmInfoError.textContent = "";

                isValidForm = true;

                nameOk = isValidName(reporterName.value);
                if (!nameOk) {
                    reporterNameError.textContent = "Enter a valid name.";
                    isValidForm = false;
                }

                emailOk = isValidEmail(reporterEmail.value);
                if (!emailOk) {
                    reporterEmailError.textContent = "Enter a valid email address.";
                    isValidForm = false;
                }

                descriptionOk = isValidDescription(itemDescription.value);
                if (!descriptionOk) {
                    itemDescriptionError.textContent = "Enter at least 5 characters.";
                    isValidForm = false;
                }

                var locationValue = lostLocation.value;
                if (locationValue !== "library" && locationValue !== "laboratory" && locationValue !== "cafeteria") {
                    lostLocationError.textContent = "Select where the item was lost.";
                    isValidForm = false;
                }

                confirmOk = confirmInfo.checked;
                if (!confirmOk) {
                    confirmInfoError.textContent = "Confirm that the information is correct.";
                    isValidForm = false;
                }

                if (!isValidForm) {
                    resultSection.style.display = "none";
                    return;
                }

                resultHeading.textContent = "Lost Item Report Submitted";
                resultDetails.textContent = "Name: " + reporterName.value.trim() + "\n" +
                                            "Email: " + reporterEmail.value.trim() + "\n" +
                                            "Description: " + itemDescription.value.trim() + "\n" +
                                            "Location: " + lostLocation.value;
                
                resultSection.style.display = "block";
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener("click", function () {
                reporterName.value = "";
                reporterEmail.value = "";
                itemDescription.value = "";
                lostLocation.selectedIndex = 0;
                confirmInfo.checked = false;

                reporterNameError.textContent = "";
                reporterEmailError.textContent = "";
                itemDescriptionError.textContent = "";
                lostLocationError.textContent = "";
                confirmInfoError.textContent = "";

                resultSection.style.display = "none";
            });
        }
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidName: isValidName,
        isValidEmail: isValidEmail,
        isValidDescription: isValidDescription
    };
}
