function endTest() {
    isScoring = true; //Set isScoring
    try {
        clearInterval(timerInterval);
    } catch (error) {}
    zoomOut(false)

    uiCtx.fillStyle = "white";
    uiCtx.fillRect(0, 0, W+UI_WIDTH, H);
    uiCtx.fillStyle = "black";
    uiCtx.font = 'normal 500 60px Times New Roman';
    uiCtx.fillText("Loading...", (W+UI_WIDTH)/2, H/2-30);   

    if (ENABLE_SCORING) {
        setTimeout(scoreFigure, 40);
    } else {
        location.href = "index.html";
    }
}

function scoreFigure() {
    drawCanvas.width = SCORE_AREA_SIZE; 
    drawCanvas.height = SCORE_AREA_SIZE;
    let scale = SCORE_AREA_SIZE*0.5;
    let drawToScoreScale = scale/FIGURE_SCALE/SELECTED_FIGURE.scaleFactor; //Sets size of outline relative to the score area

    drawCanvas.style.display = "none";

    //Drawing strokes using one continuous line
    drawCtx.strokeStyle = "red";
    drawCtx.lineCap = "round";
    drawCtx.lineJoin = "round";

    // let minAngle = 0;
    // let maxAngle = TAU;
    // drawCtx.lineWidth = 5;
    // drawCtx.strokeStyle = "black";

    // for (let i = 0; i < SELECTED_FIGURE.calcRad.length; i++) {
    //     let calcRad = SELECTED_FIGURE.calcRad[i];
    //     let r = calcRad(minAngle)*scale;
    //     drawCtx.moveTo(SCORE_AREA_SIZE/2+r*Math.cos(minAngle), SCORE_AREA_SIZE/2-r*Math.sin(minAngle));

    //     for (let theta = minAngle; theta <= maxAngle; theta += (maxAngle-minAngle)/THETA_RESOLUTION_HIGH_LOD) {
    //         r = calcRad(theta)*scale;

    //         drawCtx.lineTo(SCORE_AREA_SIZE/2+r*Math.cos(theta), SCORE_AREA_SIZE/2-r*Math.sin(theta));
    //     }
    //     drawCtx.stroke();
    // }

    drawCtx.strokeStyle = "red";
    strokes.forEach(stroke => {
        if (stroke.strokeColor == DRAW_COLOR) {
            drawCtx.globalCompositeOperation = "source-over";
        } else {
            drawCtx.globalCompositeOperation = "destination-out";
        }
        drawCtx.lineWidth = stroke.brushSize*2*drawToScoreScale;
        drawCtx.beginPath();
        drawCtx.moveTo(stroke.x[0]*drawToScoreScale+SCORE_AREA_SIZE/2, stroke.y[0]*drawToScoreScale+SCORE_AREA_SIZE/2)
        for (let i = 0; i < stroke.x.length; i++) {
            drawCtx.lineTo(stroke.x[i]*drawToScoreScale+SCORE_AREA_SIZE/2, stroke.y[i]*drawToScoreScale+SCORE_AREA_SIZE/2);
        }
        drawCtx.stroke();
    });

    let scoreInc = 0;
    imgData = drawCtx.getImageData(0, 0, SCORE_AREA_SIZE, SCORE_AREA_SIZE);
    for (let i = 0; i < imgData.data.length; i += 4) {
        if (imgData.data[i] != 0) {
            let x = (i / 4) % SCORE_AREA_SIZE - SCORE_AREA_SIZE/2;
            let y = Math.floor((i / 4) / SCORE_AREA_SIZE) - SCORE_AREA_SIZE/2;
            let theta = -Math.atan2(y, x);
            let r = Math.hypot(x, y);
            let innerR = SELECTED_FIGURE.calcRad[1](theta)*scale;
            let outerR = SELECTED_FIGURE.calcRad[0](theta)*scale;
            if (r >= innerR && r <= outerR) {
                scoreInc++;
            } else {
                scoreInc--;
            }
        }
    }

    let scoreStr = Math.round(scoreInc/SELECTED_FIGURE.maxScore*100*10000)/10000
    sessionStorage.scoreObject = JSON.stringify(scoreStr+"%"); //Stores drawing score in the session storages

    if (IS_TEST) {
        location.href = "password-end.html";
    } else {
        location.href = "test-practiceEnd.html";
    }
}