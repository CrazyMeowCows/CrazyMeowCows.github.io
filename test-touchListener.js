//TouchStart Listener------------------------------------------------------------------------------
document.addEventListener("touchstart", e => {
    touches = e.touches;
    touch = touches[0];
    let touchX = touch.pageX; 
    let touchY = touch.pageY;

    if (activePrompt == "timerExpired") { //End Test Promt is Active
        if (!isScoring) {
            handleButtonTouch(expiredOk, touch);
        }
        return;
    } else if (activePrompt == "endEarly") {
        if (!isScoring) {
            handleButtonTouch(yesEndTest, touch);
            handleButtonTouch(noEndTest, touch);
        }
        return;
    } else if (activePrompt == "start") {
        handleButtonTouch(startTest, touch);
        return;
    }
    if (touchX <= 80 && touchY >= H-80) { //Check for EndTest Button
        endTestPrompt();
        return;
    }
    if (touchX > W) { //Touch is on UI Bar
        handleSliderTouch(touch);
        buttons.forEach(button => {
            handleButtonTouch(button, touch)
        });
        uiRedraw();
        return;
    }
    if (!drawWithFinger) {
        if (touch.touchType == "stylus") { //Stylus
            currentStroke = new PenStroke(touch.pageX, touch.pageY, brushColor);
            strokes.push(currentStroke);

            drawCtx.fillStyle = brushColor;
            drawCtx.strokeStyle = brushColor;
            if (brushColor == ERASE_COLOR) {
                drawCtx.globalCompositeOperation = "destination-out";
                gridCtx.lineWidth = 1.5;
                circle(touchX, touchY, brushSize, false, gridCtx);
            } else {
                drawCtx.globalCompositeOperation = "source-over";
            }

            circle(touch.pageX, touch.pageY, brushSize, true, drawCtx);
        } 
        else if (touches.length <= 1) { //Single Finger Pan
            panX = touch.pageX;
            panY = touch.pageY;
        } 
        else { //Multi finger zoom
            zoomGestureDist = Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);
            zoomX = (touches[0].pageX + touches[1].pageX)/2;
            zoomY = (touches[0].pageY + touches[1].pageY)/2;
        }
    } else {
        if (touches.length == 1) { //Stylus or 1 Finger Touch
            touchType = 1;

            currentStroke = new PenStroke(touchX, touchY, brushColor);
            strokes.push(currentStroke);

            drawCtx.fillStyle = brushColor;
            drawCtx.strokeStyle = brushColor;
            if (brushColor == ERASE_COLOR) {
                drawCtx.globalCompositeOperation = "destination-out";
                gridCtx.lineWidth = 1.5;
                circle(touchX, touchY, brushSize, false, gridCtx);
            } else {
                drawCtx.globalCompositeOperation = "source-over";
            }

            circle(touchX, touchY, brushSize, true, drawCtx);
        } 
        else if (touches.length >= 2) { //2 Finger Pan/Zoom
            touchType = 2;

            let centerX = (touches[0].pageX + touches[1].pageX)/2;
            let centerY = (touches[0].pageY + touches[1].pageY)/2;

            panX = centerX;
            panY = centerY;

            zoomGestureDist = Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);
            zoomX = centerX;
            zoomY = centerY;
        }
    }
})

//TouchMove Listener-------------------------------------------------------------------------------
document.addEventListener("touchmove", e => {
    let touches = e.touches;
    let touch = touches[0];
    let touchX = touch.pageX; 
    let touchY = touch.pageY;

    if (activePrompt != "none") { //Any Promt is Active
        return;
    }
    if (touch.pageX > W) { //Touch is on UI Bar
        handleSliderTouch(touch);
        return;
    }
    if (drawWithFinger) {
        if (touches.length <= 1 && currentStroke == undefined) {
            return;
        }
        if (touches.length == 1 && currentStroke != undefined && touchType == 1) { //Stylus
            gridCtxRedraw();
            
            line(lastStrokeX, lastStrokeY, touchX, touchY, brushSize*2, drawCtx);
            extendCurrentStroke(touchX, touchY);
            
            if (brushColor == ERASE_COLOR) {
                gridCtx.lineWidth = 1.5;
                circle(touchX, touchY, brushSize, false, gridCtx);
            }
            return;
        }
        if (touches.length >= 2 && touchType == 2) { //2 Finger Pan/Zoom
            let centerX = (touches[0].pageX + touches[1].pageX)/2;
            let centerY = (touches[0].pageY + touches[1].pageY)/2;

            if (lastZoomed) {
                panX = centerX;
                panY = centerY;
                lastZoomed = false
            }

            offsetX += centerX-panX;
            offsetY += centerY-panY;

            panX = centerX;
            panY = centerY;

            let newZoomDistance = Math.hypot(touches[0].pageX-touches[1].pageX, touches[0].pageY-touches[1].pageY);
            zoom = clamp(zoom - (zoomGestureDist-newZoomDistance)*ZOOM_SENS*Math.abs(zoom), 1, MAX_ZOOM);
            zoomGestureDist = newZoomDistance;

            // lastZoomed = true;
            mainRedraw();
        }
    } else {
        if (touch.touchType == "stylus" && currentStroke == undefined) {
            return;
        }
        if (touch.touchType == "stylus" && currentStroke != undefined) { //Stylus
            gridCtxRedraw();
            
            line(lastStrokeX, lastStrokeY, touchX, touchY, brushSize*2, drawCtx);
            extendCurrentStroke(touchX, touchY);
            
            if (brushColor == ERASE_COLOR) {
                gridCtx.lineWidth = 1.5;
                circle(touchX, touchY, brushSize, false, gridCtx);
            }
            return;
        }
        if (touches.length <= 1) { //Single Finger Pan
            if (lastZoomed) {
                panX = touchX;
                panY = touchY;
                lastZoomed = false
            }

            offsetX += touchX-panX;
            offsetY += touchY-panY;

            panX = touchX;
            panY = touchY;

            mainRedraw();
        } 
        else if (touches.length > 1) { //Multi finger zoom
            let newZoomDistance = Math.hypot(touches[0].pageX-touches[1].pageX, touches[0].pageY-touches[1].pageY);
            zoom = clamp(zoom - (zoomGestureDist-newZoomDistance)*ZOOM_SENS*Math.abs(zoom), 1, MAX_ZOOM);
            zoomGestureDist = newZoomDistance;

            lastZoomed = true;
            mainRedraw();
        }
    }
})

//TouchEnd Listener--------------------------------------------------------------------------------
document.addEventListener("touchend", e => { //Clear the Eraser Outline
    gridCtxRedraw();
    touchType = 0;
});