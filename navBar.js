function changePage(destination) {
    if (destination == "encoder") destination = "index";
    console.log(destination);
    location.href = destination + ".html"
}
