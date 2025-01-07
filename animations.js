var animInc = 0;

//Bump zoom out then back in
function zoomOutAnimation() {
    zoom -= 0.01*Math.sign(10-animInc);
    mainRedraw();

    if (animInc < 20) {
        animInc++;    
        requestAnimationFrame(zoomOutAnimation);
    }
}