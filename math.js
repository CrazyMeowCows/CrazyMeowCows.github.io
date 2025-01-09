//Given a theta value, return the radius of the selected function--------------
function calcRad(t) {
    return (1-1/6*(Math.sin(4*t+PI/2))-1/200*Math.pow(Math.cos(30*t), 2)*Math.sin(t)*Math.tan(t/2))/ROOT_PI;
}

//Clamp number between minimum and maximum values------------------------------
function clamp(x, min, max) {
    return Math.max(Math.min(x, max), min);
}

//Given value from 0-1 (alpha) interpolate between a and b
function lerp(a, b, alpha) {
    return a + clamp(alpha, 0, 1)*(b-a);
}

//Return true if given number/string is a positive whole number
function isNumeric(value) {
    return /^\d+$/.test(value);
}