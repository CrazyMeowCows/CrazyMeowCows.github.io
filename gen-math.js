//Clamp number between minimum and maximum values------------------------------
function clamp(x, min, max) {
    return Math.max(Math.min(x, max), min);
}

//Given value from 0-1 (alpha) interpolate between a and b
function lerp(a, b, alpha) {
    return a + clamp(alpha, 0, 1)*(b-a);
}