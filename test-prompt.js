var prompts = [];
function Prompt (text, backgroundColor, backgroundOpacity, promptButtons) {
    this.text = text;
    this.backgroundColor = backgroundColor;
    this.backgroundOpacity = backgroundOpacity;
    this.promptButtons = promptButtons;

    prompts.push(this);
}

function PromptButton (icon, iconColor, action) {
    this.icon = icon;
    this.iconColor = iconColor;
    this.action = action;
}

// prompts.forEach(prompt => {

// });


{/* <div id="home-modal" class="modal">
    <div class="modal-content">
        <p>Are you sure this session is complete and the data has been recorded? <br></br> Testing score will not be saved on this device.</p>
        <div class="modal-buttonDiv">
            <button class="iconButton" style="color: green;" onclick="location.href = 'index.html'"><i class="fa fa-check"></i></button>
            <button class="iconButton" style="color: #6b0000;" onclick="document.getElementById('home-modal').style.display = 'none'"><i class="fa fa-times"></i></button>
        </div>
    </div>
</div> */}

var modal = document.createElement("div");
modal.className = "modal";

var modalContent = document.createElement("div");
modalContent.className = "modal-content";

var text = document.createElement("p");
text.textContent = "This is new.";

var buttons = document.createElement("div");
buttons.className = "modal-buttonDiv";

var button1 = document.createElement("button");
button1.className = "iconButton";
button1.setAttribute("style", "color: green");

var button1Icon = document.createElement("i");
button1Icon.className = "fa fa-check";
button1.appendChild(button1Icon)

buttons.appendChild(button1);

modalContent.appendChild(text);
modalContent.appendChild(buttons);

modal.appendChild(modalContent);

modal.setAttribute("style", "display: inline");

document.body.appendChild(modal); 

function activatePrompt(prompt) {
    activePrompt = prompt;
}

function cancelPrompt() {
    activePrompt = null;
}