function beginTestPrompt() {
    uiCtx.fillStyle = 'rgba(0,0,0,0.3)';
    uiCtx.fillRect(0, 0, W+UI_WIDTH, H);

    uiCtx.fillStyle = 'white';
    uiCtx.strokeStyle = 'black';
    uiCtx.lineWidth = 3;
    uiCtx.beginPath();
    uiCtx.roundRect((W+UI_WIDTH)/2-180, H/2-190, 360, 170, [10]);
    uiCtx.fill();
    uiCtx.stroke();

    uiCtx.font = 'normal 500 30px Times New Roman';
    uiCtx.fillStyle = "black";
    uiCtx.fillText("Begin Test When Ready", (W+UI_WIDTH)/2, H/2-150);

    uiCtx.lineWidth = 2;
    uiCtx.fillStyle = "Green";
    drawIconButton(startTest, uiCtx);
}

function endTestPrompt() {
    activePrompt = "endEarly";

    uiCtx.fillStyle = 'rgba(0,0,0,0.3)';
    uiCtx.fillRect(0, 0, W+UI_WIDTH, H);

    uiCtx.fillStyle = 'white';
    uiCtx.strokeStyle = 'black';
    uiCtx.lineWidth = 3;
    uiCtx.beginPath();
    if (IS_TEST) {
        uiCtx.roundRect((W+UI_WIDTH)/2-220, H/2-190, 440, 170, [10]);
    } else {
        uiCtx.roundRect((W+UI_WIDTH)/2-180, H/2-190, 360, 170, [10]);
    }
    uiCtx.fill();
    uiCtx.stroke();

    uiCtx.font = 'normal 500 30px Times New Roman';
    uiCtx.fillStyle = "black";
    if (IS_TEST) {
        uiCtx.fillText("End Test Before Timer Expires?", (W+UI_WIDTH)/2, H/2-150);
    } else {
        uiCtx.fillText("End Practice Session?", (W+UI_WIDTH)/2, H/2-150);
    }

    uiCtx.lineWidth = 2;
    uiCtx.fillStyle = "Green";
    drawIconButton(yesEndTest, uiCtx);
    uiCtx.fillStyle = "#6b0000";
    drawIconButton(noEndTest, uiCtx);
}

function timerExpiredPrompt() {
    activePrompt = "timerExpired";

    uiCtx.fillStyle = 'rgba(0,0,0,0.3)';
    uiCtx.fillRect(0, 0, W+UI_WIDTH, H);

    uiCtx.fillStyle = 'white';
    uiCtx.strokeStyle = 'black';
    uiCtx.lineWidth = 3;
    uiCtx.beginPath();
    uiCtx.roundRect((W+UI_WIDTH)/2-140, H/2-190, 280, 170, [10]);
    uiCtx.fill();
    uiCtx.stroke();

    uiCtx.font = 'normal 500 30px Times New Roman';
    uiCtx.fillStyle = "black";
    uiCtx.fillText("Timer Expired", (W+UI_WIDTH)/2, H/2-150);

    uiCtx.lineWidth = 2;
    uiCtx.fillStyle = "Green";
    drawIconButton(expiredOk, uiCtx);
}