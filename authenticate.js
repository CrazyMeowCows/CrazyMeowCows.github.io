function authenticate (value) {
    try {
        let newPW = JSON.parse(localStorage.newPW);
        return value == newPW || value == document.getElementsByName("viewport")[0].id.split("|")[1];
    } catch (error) {
        return value == document.getElementsByName("viewport")[0].id.split("|")[0] || value == document.getElementsByName("viewport")[0].id.split("|")[1];
    }
}