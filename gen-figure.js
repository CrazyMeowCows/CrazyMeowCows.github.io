//Define Figure object 
var figures = [];
function Figure (maxScore, drawScaleFactor, calcRad) {
    this.maxScore = maxScore;
    this.scaleFactor = drawScaleFactor;
    this.calcRad = calcRad;

    figures.push(this);
}

//NOTE: Add any new figures to settings, figures take form: outer equation, inner equation
let figure1 = new Figure(449790, 0.65, [
    (t) => {return (1-1/6*Math.sin(t+PI)-1/300*Math.pow(Math.cos(7*(t+PI/2-0.07)), 2)*Math.sin(22*(t+PI/2-0.07))*Math.tan((t+PI/2-0.07)/2)-1/300*Math.pow(Math.cos(7*(t+PI/2+0.07)),2)*Math.sin(22*(t+PI/2+0.07))*Math.tan((t+PI/2+0.07)/2))/Math.sqrt(PI)},
    (t) => {return (1-1/7.2*Math.sin(t+PI))/Math.sqrt(1.1*PI)}
]);

