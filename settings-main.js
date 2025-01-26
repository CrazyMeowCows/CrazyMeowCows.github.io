//On initialization set all settings to their previously saved values
for (const [key, value] of Object.entries(localStorage)) {
    try {
        document.getElementById(key).value = JSON.parse(value);
    } catch (error) {
        continue;
    }
};

//Return true if given number/string is a positive whole number
function isNumeric(value) {
    return /^\d+$/.test(value);
}

function checkValidEntry(element) {
    if (element.type == "number") {
        if (!isNumeric(element.value*10) || (element.id.includes("Percentage") && parseInt(element.value) > 100) || element.value == "") {
            document.getElementById(element.id + "Error").style.display = "inline-block";
            element.value = "";
            return true;
        } else {
            document.getElementById(element.id + "Error").style.display = "none";
        }
    }
}

function updateSettings(destination) {
    var errorFlag = false;

    //Verify all settings have valid inputs
    for (const [key, value] of Object.entries(localStorage)) {
        try {
            errorFlag = checkValidEntry(document.getElementById(key)) || errorFlag;
        } catch (error) {
            continue;
        }
    };

    if (!errorFlag) { //Save settings if no error is thrown
        for (const [key, value] of Object.entries(localStorage)) {
            try {
                localStorage[key] = JSON.stringify(document.getElementById(key).value);
            } catch (error) {
                continue;
            }
        };

        location.href = destination;
    }
}
