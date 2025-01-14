function authenticate (value) {
    let procterPasscode;
    try {
        procterPasscode = JSON.parse(localStorage.newPW);
    } catch (error) {}

    try {
        if (procterPasscode == undefined) {
            procterPasscode = document.getElementsByName("viewport")[0].id.split("|")[0]
        }
        return value == procterPasscode || value == document.getElementsByName("viewport")[0].id.split("|")[1];
    } catch (error) {
        sessionStorage.isTest = JSON.stringify("false"); 
        location.href = 'crash';
    }
    
}