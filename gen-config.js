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

const COMP_TESTING = true; //Use for development on non-iOS devices

//Define Figure object 
var figures = [];
function Figure (displayName, maxScore, drawScaleFactor, calcRad) {
    this.displayName = displayName;
    this.maxScore = maxScore;
    this.scaleFactor = drawScaleFactor;
    this.calcRad = calcRad;

    figures.push(this);
}
function EquationPair (inner, outer, t, scale) {
    this.inner = inner*scale;
    this.outer = outer*scale;
    this.innerX = this.inner*cos(t);
    this.innerY = this.inner*sin(t);
    this.outerX = this.outer*cos(t);
    this.outerY = this.outer*sin(t);
}

let sin = Math.sin;
let cos = Math.cos;
let tan = Math.tan;
let sqrt = Math.sqrt;
let abs = Math.abs;
let ceil = Math.ceil;
let floor = Math.floor;
function sqr(x) {return Math.pow(x, 2);}


//NOTE: This is the only place new figures need be added, figures take form: inner equation, outer equation
new Figure("The Ring", 423406, 0.85, (t, scale) => {
    return new EquationPair(
        (1/sqrt(1.1*PI)),
        (1-1/6*sin(t+PI)-1/300*sqr(cos(7*(t+PI/2-0.07)))*sin(22*(t+PI/2-0.07))*tan((t+PI/2-0.07)/2)-1/300*sqr(cos(7*(t+PI/2+0.07)))*sin(22*(t+PI/2+0.07))*tan((t+PI/2+0.07)/2)+sin(t+PI)/7.2)/sqrt(PI),
        t, scale
    );
});
new Figure("The Shubi", 0, 0.43, (t, scale) => {
    let a = 3/900*sqr(cos(7*(t+PI/2)))*sin(22*(t+PI/2))*tan((t+PI/2)/2);
    let b = 1/500*sqr(cos(7*(t+PI/2-.16)))*sin(22*(t+PI/2-0.16))*tan((t+PI/2-.16)/2);
    let c = 1/500*sqr(cos(7*(t+PI/2+.16)))*sin(22*(t+PI/2+0.16))*tan((t+PI/2+.16)/2);
    
    let p = (1+t/abs(t))/2+(1-ceil(t/(t+1))-floor(t/(t+1))/ceil(t/(t+1)));
    let s = ceil((PI+.1)/abs(t+.1))-floor((PI+.1)/abs(t+.1)+floor((t+.1)/(PI+.1))/(floor((t+.1)/(PI+.1))+1))+1-ceil(abs(t-PI)/(abs(t-PI)+.1))-floor(abs(t-PI)/(abs(t-PI)+.1));

    let u = ceil(floor(p*s/ceil(p*s))-(p*s)/3);

    return new EquationPair(
        u*(2/(sqrt(PI)*(1.000096616+0.05*sqr(sin(t))))),
        u*(2-2/6*sin(t+PI)+3/60*sqr(sin(10*t+PI))-a-b-c)/sqrt(PI),
        t, scale
    );
});