function authenticate (value) {
    try {
        let procterPasscode = document.getElementsByName("viewport")[0].id.split("|")[0]
        try {
            let newPW = JSON.parse(localStorage.newPW);
        } catch (error) {}
        return value == procterPasscode || value == document.getElementsByName("viewport")[0].id.split("|")[1];
    } catch (error) {
        sessionStorage.isTest = JSON.stringify("false"); 
        location.href = 'crash';
    }
    
}