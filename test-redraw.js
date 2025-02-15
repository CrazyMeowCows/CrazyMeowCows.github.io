//Drawing the content of the grid canvas-----------------------------------------------------------
function gridCtxRedraw() {
    gridCtx.clearRect(0, 0, W, H);
    if (!RENDER_GRID) {
        return;
    }

    //Drawing only the gridlines that are visible on screen
    let subGridSize = dynamicGridSize/4;
    xStart = -offsetX/dynamicGridSize;
    yStart = -offsetY/dynamicGridSize;

    let i = 0;
    for (var x = Math.floor(xStart)*dynamicGridSize; x < W+Math.ceil(xStart)*dynamicGridSize; x += subGridSize) {
        if (i%4 == 0) {
            gridCtx.lineWidth = 1;
        } else {
            gridCtx.lineWidth = 0.5;
        }
        gridCtx.beginPath();
        gridCtx.moveTo(x+offsetX, 0);
        gridCtx.lineTo(x+offsetX, H);
        gridCtx.stroke();
        i++;
    }
    i = 0;
    for (var y = Math.floor(yStart)*dynamicGridSize; y < H+Math.ceil(yStart)*dynamicGridSize; y += subGridSize) {
        if (i%4 == 0) {
            gridCtx.lineWidth = 1;
        } else {
            gridCtx.lineWidth = 0.5;
        }
        gridCtx.beginPath();
        gridCtx.moveTo(0, y+offsetY);
        gridCtx.lineTo(W, y+offsetY);
        gridCtx.stroke();
        i++;
    }
}

//Drawing the content of the draw canvas-----------------------------------------------------------
function drawCtxRedraw() {
    drawCtx.clearRect(0, 0, W, H);

    //Drawing strokes using one continuous line
    strokes.forEach(stroke => {
        if (stroke.strokeColor == DRAW_COLOR) {
            drawCtx.globalCompositeOperation = "source-over";
        } else {
            drawCtx.globalCompositeOperation = "destination-out";
        }
        drawCtx.strokeStyle = stroke.strokeColor;
        drawCtx.lineWidth = stroke.brushSize*zoom*2;
        drawCtx.beginPath();
        drawCtx.moveTo(stroke.x[0]*zoom+offsetX, stroke.y[0]*zoom+offsetY)
        for (let i = 0; i < stroke.x.length; i++) {
            drawCtx.lineTo(stroke.x[i]*zoom+offsetX, stroke.y[i]*zoom+offsetY);
        }
        drawCtx.stroke();
    });
}

//Drawing the content of the figure canvas---------------------------------------------------------
function figureCtxRedraw () {
    figureCtx.clearRect(0, 0, W, H);
    let resolution = THETA_RESOLUTION_LOW_LOD;

    //Get the theta range of the part of the outline visible on screen
    let minAngle = TAU; //Set these to the opposite values to enable finding min and max later
    let maxAngle = 0;
    if (offsetX > 0 && (offsetX-W)*zoom < 0 && offsetY > 0 && (offsetY-H)*zoom < 0) { //If center of figure is visible set visible angle to 0->TAU
        minAngle = 0;
        maxAngle = SELECTED_FIGURE.isHemisphere ? PI : TAU;
        resolution = THETA_RESOLUTION_HIGH_LOD
    } else {
        let cornerAngles = [ //Otherwise find the theta values that point to each corner of the screen
            Math.atan2(offsetY, -offsetX+W),
            Math.atan2(offsetY, -offsetX),
            -Math.atan2(-offsetY+H, -offsetX),
            -Math.atan2(-offsetY+H, -offsetX+W)
        ];
        for (let i = 0; i < 4; i++) { //Find the corners with the min and max theta values
            if (cornerAngles[i] < 0) cornerAngles[i] = TAU+cornerAngles[i]; 

            minAngle = Math.min(minAngle, cornerAngles[i]);
            maxAngle = Math.max(maxAngle, cornerAngles[i]);
        }
        if (offsetX < 0 && minAngle < PI/4 && maxAngle > 3*PI/2) { //Handle the 360->0 discontinuity
            maxAngle = cornerAngles[1];
            minAngle = cornerAngles[2]-TAU; 
        }
    }

    if (SELECTED_FIGURE.isHemisphere) { //Avoid discontinuities at 0 and PI on hemispherical shapes
        if (minAngle >= PI) return; //Dont bother rendering if not on screen at all
        minAngle = Math.max(minAngle, 0.00001);
        maxAngle = Math.min(maxAngle, PI-0.00001);
    }
    
    //Drawing the visible part of the figure outline
    let scale = FIGURE_SCALE*SELECTED_FIGURE.scaleFactor*zoom;
    let thetaInc = (maxAngle-minAngle)/resolution;

    let innerPath = new Path2D();
    let outerPath = new Path2D();

    let rads = SELECTED_FIGURE.calcRad(minAngle, scale);
    innerPath.moveTo(offsetX+rads.innerX, offsetY-rads.innerY);
    outerPath.moveTo(offsetX+rads.outerX, offsetY-rads.outerY);

    for (let theta = minAngle+thetaInc; theta <= maxAngle+0.01; theta += thetaInc) {
        let rads = SELECTED_FIGURE.calcRad(theta, scale);
        innerPath.lineTo(offsetX+rads.innerX, offsetY-rads.innerY);
        outerPath.lineTo(offsetX+rads.outerX, offsetY-rads.outerY);
    }

    figureCtx.stroke(innerPath);
    figureCtx.stroke(outerPath);
}
