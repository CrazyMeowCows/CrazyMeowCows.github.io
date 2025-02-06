//Default settings for initialization
const defaultSettings = {
    selectedFigure: "0",
    timerLengthMinutes: "5",
    displayGrid: "true",
    maxBrushSize: "5",
    minBrushSize: "1",
    defaultBrushPercentage: "100",
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

//NOTE: Add any new figures to settings, figures take form: outer equation, inner equation
new Figure("The Ring", 449790, 0.9, [
    (t) => {return (1-1/6*Math.sin(t+PI)-1/300*Math.pow(Math.cos(7*(t+PI/2-0.07)), 2)*Math.sin(22*(t+PI/2-0.07))*Math.tan((t+PI/2-0.07)/2)-1/300*Math.pow(Math.cos(7*(t+PI/2+0.07)),2)*Math.sin(22*(t+PI/2+0.07))*Math.tan((t+PI/2+0.07)/2)+Math.sin(t+PI)/7.2)/Math.sqrt(PI)},
    (t) => {return 1/Math.sqrt(1.1*PI)}
]);

const COMP_TESTING = false; //Use for development on non-iOS devices