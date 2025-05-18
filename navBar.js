function changePage(destination) {
    if (destination == "encoder") destination = "index";
    alert(destination);
    location.href = destination + ".html"
}
