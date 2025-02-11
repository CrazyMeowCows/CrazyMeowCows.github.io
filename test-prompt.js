var prompts = [];
function Prompt (id, text, backgroundColor, promptButtons) {
    this.id = id;
    this.text = text;
    this.backgroundColor = backgroundColor;
    this.promptButtons = promptButtons;
    this.htmlElement;

    prompts.push(this);
}

function PromptButton (icon, iconColor, action) {
    this.icon = icon;
    this.iconColor = iconColor;
    this.action = action;
}

function activatePrompt(prompt) {
    activePrompt = prompt;
    prompt.htmlElement.style.display = "inline";
}

function cancelPrompt() {
    activePrompt.htmlElement.style.display = "none";
    activePrompt = null;
}

function initializePrompts() {
    prompts.forEach(prompt => {
        let modal = document.createElement("div");
        let modalContent = document.createElement("div");
        let text = document.createElement("p");
        let buttons = document.createElement("div");

        modal.id = prompt.id;
        modal.className = "modal";
        modal.setAttribute("style", "background-color: " + prompt.backgroundColor + ";");

        modalContent.className = "modal-content";

        buttons.className = "modal-buttonDiv";

        text.innerHTML = prompt.text;

        prompt.promptButtons.forEach(promptButton => {
            let button = document.createElement("button");
            button.className = "iconButton";
            button.setAttribute("style", "color: " + promptButton.iconColor);
            button.setAttribute("onclick", "" + promptButton.action);

            let icon = document.createElement("i");
            icon.className = promptButton.icon;
            button.appendChild(icon)

            buttons.appendChild(button);
        });

        modalContent.appendChild(text);
        modalContent.appendChild(buttons);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
        prompt.htmlElement = modal;
    });
}