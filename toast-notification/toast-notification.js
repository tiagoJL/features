export default class ToastNotification {
    constructor(message, type){
        this.message = message
        this.type = type
        this.timeout = 5000
        this.messageTypes = ["error", "success", "attention", "info"]
    }

    showMessage(){
        if (!this.isAvailableToContinue()){return}
        const message = document.createTextNode(`${this.message}`)
        this.createToastNotificationWrapperIfDoesntExist()
        this.toastNotificationMessage = document.createElement("span")
        this.toastNotificationMessage.classList.add("toast-notification-message", this.type)
        this.toastNotificationMessage.appendChild(message)
        this.createCloseButton()
        this.toastNotificationMessage.appendChild(this.closeButton)
        this.toastNotificationWrapper.appendChild(this.toastNotificationMessage)
        this.initMotionEndTimeout = this.initMotionEnd(this.timeout - 600)
        this.scheduleCloseTimeout = this.scheduleClose(this.timeout)
    }

    createCloseButton(){
        this.closeButton = document.createElement("button")
        this.closeButton.innerText = "x"
        this.closeButton.classList.add("toast-notification-close-button")
        this.closeButton.setAttribute("title", "fechar notificação")
        this.closeButton.addEventListener("click", () => {
            clearTimeout(this.scheduleCloseTimeout)
            this.toastNotificationMessage.classList.add("deactivate")
            this.scheduleClose(500)
        })
    }

    scheduleClose(time){
        return setTimeout(this.closeMessage.bind(this), time)
    }

    initMotionEnd(time){
        return setTimeout(
            () => {
                this.toastNotificationMessage.classList.add("deactivate")},
                time
        )
    }

    createToastNotificationWrapperIfDoesntExist(){
        const cssClass = "toast-notification-wrapper"
        const cssSelector = `div.${cssClass}`
        const toastNotificationWrapper = document.querySelector(cssSelector)

        if(!toastNotificationWrapper){
            this.toastNotificationWrapper = document.createElement("div")
            this.toastNotificationWrapper.classList.add(cssClass)
            document.body.appendChild(this.toastNotificationWrapper)
            return
        }
        this.toastNotificationWrapper = toastNotificationWrapper
    }

    isAvailableToContinue(){
        const typeInMessageTypes = this.messageTypes.includes(this.type)
        const invalidMessage = `
        Classe ToastNotificaiton Interrompida.
        Motivo: Opção de tipo de mensagem inválida.
        Tipos Válidos: ${this.messageTypes}
        Tipo inválido escolhido: ${this.type}
        `
        if (!typeInMessageTypes){
            console.log(invalidMessage)
            return false
        }
        return true
    }

    closeMessage(){
        this.toastNotificationMessage.remove()
    }
}