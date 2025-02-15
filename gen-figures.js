//Define Figure object 
var figures = [];
function Figure (displayName, maxScore, minY, maxY, width, minTheta, maxTheta, calcRad) {
    this.displayName = displayName;
    this.maxScore = maxScore;
    this.minY = minY;
    this.maxY = maxY;
    this.width = width;
    this.minTheta = minTheta;
    this.maxTheta = maxTheta;
    this.calcRad = calcRad;

    figures.push(this);
}
function EquationPair (inner, outer) {
    this.inner = inner;
    this.outer = outer;
}

//NOTE: This is the only place new figures need be added, figures take form: inner equation, outer equation
new Figure("The Ring", 423406, -0.67, 0.67, 0.67*2, 0, Math.PI*2, (t) => {
    return new EquationPair(
        (1/sqrt(1.1*PI)),
        (1-1/6*sin(t+PI)-1/300*sqr(cos(7*(t+PI/2-0.07)))*sin(22*(t+PI/2-0.07))*tan((t+PI/2-0.07)/2)-1/300*sqr(cos(7*(t+PI/2+0.07)))*sin(22*(t+PI/2+0.07))*tan((t+PI/2+0.07)/2)+sin(t+PI)/7.2)/sqrt(PI),
    );
});
new Figure("The Shubi", 919087, 0, 1.4, 2.4, 0, Math.PI, (t) => {
    let a = 3/900*sqr(cos(7*(t+PI/2)))*sin(22*(t+PI/2))*tan((t+PI/2)/2);
    let b = 1/500*sqr(cos(7*(t+PI/2-.16)))*sin(22*(t+PI/2-0.16))*tan((t+PI/2-.16)/2);
    let c = 1/500*sqr(cos(7*(t+PI/2+.16)))*sin(22*(t+PI/2+0.16))*tan((t+PI/2+.16)/2);
    
    let p = (1+t/abs(t))/2+(1-ceil(t/(t+1))-floor(t/(t+1))/ceil(t/(t+1)));
    let s = ceil((PI+.1)/abs(t+.1))-floor((PI+.1)/abs(t+.1)+floor((t+.1)/(PI+.1))/(floor((t+.1)/(PI+.1))+1))+1-ceil(abs(t-PI)/(abs(t-PI)+.1))-floor(abs(t-PI)/(abs(t-PI)+.1));

    let u = ceil(floor(p*s/ceil(p*s))-(p*s)/3);

    return new EquationPair(
        u*(2/(sqrt(PI)*(1.000096616+0.05*sqr(sin(t))))),
        u*(2-2/6*sin(t+PI)+3/60*sqr(sin(10*t+PI))-a-b-c)/sqrt(PI),
    );
});
new Figure("The Ring", 423406, -0.67, 0.67, 0, Math.PI*2, (t) => {
    return new EquationPair(
        (1/sqrt(1.1*PI)),
        (1-1/6*sin(t+PI)-1/300*sqr(cos(7*(t+PI/2-0.07)))*sin(22*(t+PI/2-0.07))*tan((t+PI/2-0.07)/2)-1/300*sqr(cos(7*(t+PI/2+0.07)))*sin(22*(t+PI/2+0.07))*tan((t+PI/2+0.07)/2)+sin(t+PI)/7.2)/sqrt(PI),
    );
});

//Shorthand for easier writing of new figures
let sin = Math.sin;
let cos = Math.cos;
let tan = Math.tan;
let sqrt = Math.sqrt;
let abs = Math.abs;
let ceil = Math.ceil;
let floor = Math.floor;
function sqr(x) {return Math.pow(x, 2);}