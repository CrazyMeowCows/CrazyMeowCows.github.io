try {
    let x = document.getElementsByName("viewport")[0].id
} catch (error) {
    location.href = 'crash';
}