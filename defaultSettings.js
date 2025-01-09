const selectedFigure = "1";
const timerLengthMinutes = "5";
const displayGrid = "true";
const maxBrushSize = "5";
const minBrushSize = "1";
const defaultBrushPercentage = "100";

function getFigure (selectedFigure, theta) {
    switch(selectedFigure) {
    case "1":
        return figure1(theta);
    case "2":
        return figure2(theta);
    }
}

//ALSO ADD FIGURE IN SETTINGS PAGE
function figure1 (t) {
    return (1-1/6*(Math.sin(4*t+PI/2))-1/200*Math.pow(Math.cos(30*t), 2)*Math.sin(t)*Math.tan(t/2))/ROOT_PI
}

function figure2 (t) {
    return 0.5;
}