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
    let minAngle = PI;
    let maxAngle = -PI;
    if (offsetX > 0 && (offsetX-W)*zoom < 0 && offsetY > 0 && (offsetY-H)*zoom < 0) { //If center of figure is visible set visible angle to -PI->PI
        minAngle = -PI;
        maxAngle = PI;
        resolution = THETA_RESOLUTION_HIGH_LOD
    } else {
        let cornerAngles = [ //Otherwise find the theta values that point to each corner of the screen
            Math.atan2(-offsetY*zoom, -offsetX*zoom),
            Math.atan2((-offsetY+H)*zoom, -offsetX*zoom),
            Math.atan2((-offsetY+H)*zoom, (-offsetX+W)*zoom),
            Math.atan2(-offsetY*zoom, (-offsetX+W)*zoom)
        ];
        for (let i = 0; i < 4; i++) { //Find the corners with the min and max theta values
            minAngle = Math.min(minAngle, -cornerAngles[i]);
            maxAngle = Math.max(maxAngle, -cornerAngles[i]);
        }
        if (offsetX > 0 && Math.sign(minAngle) != Math.sign(maxAngle)) { //Handle the -180->180 discontinuity
            maxAngle = -cornerAngles[2]+TAU;
            minAngle = -cornerAngles[3]; 
        }
    }
    
    //Drawing the visible part of the figure outline
    figureCtx.beginPath();
    let scale = FIGURE_SCALE*SELECTED_FIGURE.scaleFactor*zoom;

    for (let i = 0; i < SELECTED_FIGURE.calcRad.length; i++) {
        let calcRad = SELECTED_FIGURE.calcRad[i];
        let r = calcRad(minAngle)*scale;
        figureCtx.moveTo(offsetX+r*Math.cos(minAngle), offsetY-r*Math.sin(minAngle));

        for (let theta = minAngle; theta <= maxAngle; theta += (maxAngle-minAngle)/resolution) {
            r = calcRad(theta)*scale;

            figureCtx.lineTo(offsetX+r*Math.cos(theta), offsetY-r*Math.sin(theta));
        }
        figureCtx.stroke();
    }
}


//Drawing the content of the UI canvas-------------------------------------------------------------
function uiRedraw () {
    //Clear the canvas every redraw
    uiCtx.clearRect(0, 0, W, H);

    // Draw Timer
    if (ENABLE_TIMER) {
        uiCtx.fillStyle = "white";
        uiCtx.strokeStyle = "black";
        uiCtx.lineWidth = 2;
        uiCtx.beginPath();
        uiCtx.roundRect(W/2-85, -2, 170, 57, [0, 0, 10, 10]);
        uiCtx.fill();
        uiCtx.stroke();

        let mins = TIME_FORMAT.format(""+Math.floor(timerSeconds/60));
        let secs = TIME_FORMAT.format(""+timerSeconds%60);

        uiCtx.fillStyle = "black";
        uiCtx.font = "normal 500 60px Times New Roman";
        uiCtx.fillText(mins+":"+secs, W/2, 27);
    }

    //Draw Eraser/Pencil Toggle
    uiCtx.fillStyle = "white";
    uiCtx.beginPath();
    uiCtx.roundRect(pencil.x, pencil.y, pencil.w, pencil.h*2, [10]);
    uiCtx.fill();

    uiCtx.fillStyle = 'rgba(0,0,0,0.1)';
    uiCtx.beginPath();
    uiCtx.roundRect(pencil.x, pencil.y, pencil.w, pencil.h, [10, 10, 0, 0]);
    if (brushColor == DRAW_COLOR) {
        uiCtx.lineWidth = 3;
        uiCtx.fill();
    } else {
        uiCtx.lineWidth = 1.5;
    }
    uiCtx.stroke();

    uiCtx.beginPath();
    uiCtx.roundRect(eraser.x, eraser.y, eraser.w, eraser.h, [0, 0, 10, 10]);
    if (brushColor == ERASE_COLOR) {
        uiCtx.lineWidth = 3;
        uiCtx.fill();
    } else {
        uiCtx.lineWidth = 1.5;
    }
    uiCtx.stroke();

    //Draw icon buttons
    uiCtx.lineWidth = 1.5;
    uiCtx.fillStyle = "black";
    let recurse = false;
    buttons.forEach(button => {
        drawIconButton(button, uiCtx);
        if (button.trans-- > 0) {
            recurse = true;
        }
    });
    if (recurse) {
        requestAnimationFrame(uiRedraw);
    }
}