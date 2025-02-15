function promptSessionEnd() {
    if (IS_TEST) {
        activatePrompt(endTestEarly);
    } else {
        activatePrompt(endPracticeEarly);
    }
}

function endTest() {
    zoomOut(false)

    if (!SCORE_DEBUG) activatePrompt(loading);

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

    if (!SCORE_DEBUG) {drawCanvas.style.display = "none";}
    else {
        drawCtx.strokeStyle = "black";
        let minAngle = 0;
        let maxAngle = TAU;
        let thetaInc = (maxAngle-minAngle)/THETA_RESOLUTION_HIGH_LOD;

        let innerPath = new Path2D();
        let outerPath = new Path2D();

        let rads = SELECTED_FIGURE.calcRad(minAngle, scale);
        innerPath.moveTo(SCORE_AREA_SIZE/2+rads.innerX, SCORE_AREA_SIZE/2-rads.innerY);
        outerPath.moveTo(SCORE_AREA_SIZE/2+rads.outerX, SCORE_AREA_SIZE/2-rads.outerY);

        for (let theta = minAngle+thetaInc; theta <= maxAngle+0.01; theta += thetaInc) {
            let rads = SELECTED_FIGURE.calcRad(theta, scale);
            innerPath.lineTo(SCORE_AREA_SIZE/2+rads.innerX, SCORE_AREA_SIZE/2-rads.innerY);
            outerPath.lineTo(SCORE_AREA_SIZE/2+rads.outerX, SCORE_AREA_SIZE/2-rads.outerY);
        }

        drawCtx.stroke(innerPath);
        drawCtx.stroke(outerPath);
    }

    //Drawing strokes using one continuous line
    drawCtx.strokeStyle = "red";
    drawCtx.lineCap = "round";
    drawCtx.lineJoin = "round";

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

    //Score strokes against figure
    let scoreInc = 0;
    imgData = drawCtx.getImageData(0, 0, SCORE_AREA_SIZE, SCORE_AREA_SIZE);
    for (let i = 0; i < imgData.data.length; i += 4) {
        if (imgData.data[i] == 0 && !FIND_MAX_SCORE) { //Skip blank pixels
            continue;
        }
        let x = (i / 4) % SCORE_AREA_SIZE - SCORE_AREA_SIZE/2;
        let y = Math.floor((i / 4) / SCORE_AREA_SIZE) - SCORE_AREA_SIZE/2;
        let theta = -Math.atan2(y, x);
        let pixelR = Math.hypot(x, y);
        let figureRads = SELECTED_FIGURE.calcRad(theta, scale);

        if (theta < 0 && SELECTED_FIGURE.isHemisphere && !FIND_MAX_SCORE) {
            scoreInc--;
            continue;
        }
        if (pixelR >= figureRads.inner && pixelR <= figureRads.outer) { //TODO: FIX SHUBI SCORING
            scoreInc++;
        } else if (!FIND_MAX_SCORE){
            scoreInc--;
        }
    }

    if (FIND_MAX_SCORE) { //Alert the max score
        alert(scoreInc);
    }
    
    //Publish score to sessionStorage
    let score = Math.round(scoreInc/SELECTED_FIGURE.maxScore*100*10000)/10000 //Round to 4 decimal places
    if (score < 0) {
        score = "NEGATIVE VALUE";
    } else {
        let scoreFormat = new Intl.NumberFormat('en-US', { 
            minimumIntegerDigits: 1, 
            minimumFractionDigits: 4 //Guaruntees 4 decimal places
        });
        score = scoreFormat.format(score)+"%";
    }
    sessionStorage.scoreObject = JSON.stringify(score); //Stores drawing score in the session storages

    if (SCORE_DEBUG) return;

    if (IS_TEST) {
        location.href = "testEnd_auth.html";
    } else {
        location.href = "testPracticeEnd.html";
    }
}