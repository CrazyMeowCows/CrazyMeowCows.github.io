function authenticate (value) {
    let procterPasscode;
    try {
        procterPasscode = JSON.parse(localStorage.newPW); //Check if a alternate procter passcode is set
    } catch (error) {}

    try {
        if (procterPasscode == undefined) {
            procterPasscode = document.getElementsByName("viewport")[0].id.split("|")[0] //If no alternate is set, pull from passcode location
        }
        return value == procterPasscode || value == document.getElementsByName("viewport")[0].id.split("|")[1]; //Return authentication
    } catch (error) {
        sessionStorage.isTest = JSON.stringify("false"); 
        location.href = 'crash'; //Crash website it passcodes are not present
    }
    
}