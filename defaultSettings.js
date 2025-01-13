const defaultSettings = {
    selectedFigure: "1",
    timerLengthMinutes: "5",
    displayGrid: "true",
    maxBrushSize: "5",
    minBrushSize: "1",
    defaultBrushPercentage: "100",
    practiceDrawMode: "finger"
}

//ALSO ADD FIGURE IN SETTINGS PAGE
function getFigure (selectedFigure, theta) {
    switch(selectedFigure) {
    case "1":
        return figure1(theta);
    case "2":
        return figure2(theta);
    }
}

function figure1 (t) {
    return (1-1/6*(Math.sin(4*t+PI/2))-1/200*Math.pow(Math.cos(30*t), 2)*Math.sin(t)*Math.tan(t/2))/ROOT_PI
}

function figure2 (t) {
    return 0.5;
}