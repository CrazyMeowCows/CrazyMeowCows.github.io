//Default settings for initialization
const defaultSettings = {
    selectedFigure: "0",
    timerLengthMinutes: "5",
    displayGrid: "true",
    brushSize: "5",
    practiceDrawMode: "finger",
    practiceTimer: "false",
    practiceTimerLengthMinutes: "5",
    practiceScore: "false"
}

//Define Figure object 
var figures = [];
function Figure (displayName, maxScore, drawScaleFactor, calcRad) {
    this.displayName = displayName;
    this.maxScore = maxScore;
    this.scaleFactor = drawScaleFactor;
    this.calcRad = calcRad;

    figures.push(this);
}

//NOTE: This is the only place new figures need be added, figures take form: outer equation, inner equation
new Figure("The Ring", 423406, 0.85, [
    (t) => {return (1-1/6*Math.sin(t+PI)-1/300*Math.pow(Math.cos(7*(t+PI/2-0.07)), 2)*Math.sin(22*(t+PI/2-0.07))*Math.tan((t+PI/2-0.07)/2)-1/300*Math.pow(Math.cos(7*(t+PI/2+0.07)),2)*Math.sin(22*(t+PI/2+0.07))*Math.tan((t+PI/2+0.07)/2)+Math.sin(t+PI)/7.2)/Math.sqrt(PI)},
    (t) => {return 1/Math.sqrt(1.1*PI)}
]);

const VERSION = "7.0.1";
const COMP_TESTING = true; //Use for development on non-iOS devices