class StaticPagination {
    constructor(itemDisplayRange, paginationControlsTag){
        this.paginationList = document.querySelector(".pagination-list")
        this.paginationWrapper = document.querySelector(".pagination-wrapper")
        this.paginationItems = document.querySelectorAll(".pagination-item")
        this.paginationControls = document.querySelector(".pagination-controls")
        this.paginationControlsActiveClass = "pagination-controls-item-active"
        this.paginationControlReplaceablesItemClass = "pagination-controls-item-replaceable"
        this.itemsLength = this.paginationItems.length
        this.paginationControlsTag = paginationControlsTag
        this.itemDisplayRange = itemDisplayRange
        this.currentPaginationControlSelected = 1
        this.init()
    }

    createReplaceableItemControls(){
        const replaceablesCssClass = this.paginationControlReplaceablesItemClass
        const tag = this.paginationControlsTag
        const openingTag = `<${tag} class="pagination-controls-item ${replaceablesCssClass}" data-controls=`
        const closingTag = `</${tag}>`

        for (let initial = 2; initial <= 4; initial++) {
            const dataControlValue = initial
            const contentText = initial
            const html = `${openingTag}"${dataControlValue}">${contentText}${closingTag}`
            this.addToEndOfPaginationControls(html)
        }
    }

    createPrevControlButton(){
        const html = "<button class='pagination-controls-item-prev' value='prev'>&#60;</button>"
        this.addToEndOfPaginationControls(html)
    }

    createNextControlButton(){
        const html = "<button class='pagination-controls-item-next' value='next'>&#62;</button>"
        this.addToEndOfPaginationControls(html)
    }

    addToEndOfPaginationControls(html){
        this.paginationControls.insertAdjacentHTML("beforeend", html)
    }

    addToBeginningOfPaginationControls(html){
        this.paginationControls.insertAdjacentHTML("afterbegin", html)
    }

    createControlsElements(){
        const controlsElementsLength = Math.ceil(this.itemsLength / this.itemDisplayRange)
        const tag = this.paginationControlsTag
        const openingTag = `<${tag} class="pagination-controls-item" data-controls=`
        const closingTag = `</${tag}>`

        if (controlsElementsLength == 5) {
            for (let initial = 1; initial <= controlsElementsLength; initial++) {
                const dataControlValue = initial
                const contentText = initial
                const html = `${openingTag}${dataControlValue}> ${contentText} ${closingTag}`
                this.addToEndOfPaginationControls(html)
            }
            return
        }

        const firstControlsElement = `${openingTag}"1">1${closingTag}`
        const lastControlsElement = `${openingTag}${controlsElementsLength}>
                                     ${controlsElementsLength}${closingTag}`
        
        this.addToBeginningOfPaginationControls(firstControlsElement)
        this.createPrevControlButton()
        this.createReplaceableItemControls()
        this.createNextControlButton()
        this.addToEndOfPaginationControls(lastControlsElement)

        document.querySelector(".pagination-controls-item-next").addEventListener("click", () => {
            this.moveReplaceablesPaginationControlsItems("next")
        })

        document.querySelector(".pagination-controls-item-prev").addEventListener("click", () => {
            this.moveReplaceablesPaginationControlsItems("prev")
        })
    }

    getPaginationControlItem(dataControlValue){
        const cssSelector = `.pagination-controls-item[data-controls="${dataControlValue}"]`
        return document.querySelector(cssSelector)
    }

    detectedReplaceableCurrentControl(replaceableItem){
        const newReplaceableControlValue = replaceableItem.dataset.controls
        const currentPaginationControlValue = this.currentPaginationControlSelected
        const isReplaceableItemCurrentPaginationControlSelected = (
              newReplaceableControlValue == currentPaginationControlValue)

        const config = isReplaceableItemCurrentPaginationControlSelected ? "add" : "remove"
        this.RemoveOrAddActiveClassOnControlItem(replaceableItem, config)
    }

    moveReplaceablesPaginationControlsItems(config){
        const replaceablesCssClass = this.paginationControlReplaceablesItemClass
        const replaceables = [...document.querySelectorAll(`.${replaceablesCssClass}`)]
        const replaceablesContent = replaceables.map(r => r.dataset.controls)
        const firstReplaceable = replaceablesContent[0]
        const firstReplaceableLessThree = +firstReplaceable - 3
        const firstReplaceableLessThreeIsTwoOrMore =  firstReplaceableLessThree >= 2
        const invalidNext = replaceablesContent.includes("...")
        const invalidPrev =  !firstReplaceableLessThreeIsTwoOrMore
        const lastPaginationControl = Math.ceil(this.itemsLength / this.itemDisplayRange)
        
        if (config == "prev" && !invalidPrev) {

            let initial = firstReplaceableLessThree

            replaceables.forEach(replaceableItem => {
                replaceableItem.dataset.controls = initial
                this.detectedReplaceableCurrentControl(replaceableItem)
                replaceableItem.innerText = initial
                ++initial
                })
        }

        if (config == "next" && !invalidNext) {
            replaceables.forEach(replaceableItem => {

                const currentDataControl = replaceableItem.dataset.controls
                const next = +currentDataControl + 3

                if (next >= lastPaginationControl){
                    replaceableItem.dataset.controls = "..."
                    replaceableItem.innerText = "..."
                    this.detectedReplaceableCurrentControl(replaceableItem)
                    return
                }

                replaceableItem.dataset.controls = next
                replaceableItem.innerText = next

                this.detectedReplaceableCurrentControl(replaceableItem)
            })
        }
    }

    RemoveOrAddActiveClassOnControlItem(controlItem, config){
        if (controlItem && config=="add"){
            controlItem.classList.add(this.paginationControlsActiveClass)
        } else if(controlItem && config == "remove") {
            controlItem.classList.remove(this.paginationControlsActiveClass)
        }
    }

    setClassOnAvailableItems(dataControlValueSelected, config){
        const interval = this.itemDisplayRange
        let initial = dataControlValueSelected * interval - interval + 1
        const last = initial + interval
        const classMsg = "pagination-item-active"
        const ControlSelected = document.querySelector(`.pagination-controls-item[data-controls="${dataControlValueSelected}"]`)

        this.RemoveOrAddActiveClassOnControlItem(ControlSelected, config)

        for (initial; initial < last; initial++) {
            const item = document.querySelector(`.pagination-item[data-index="${initial}"]`)

            if (item && config == "add") {
                item.classList.add(classMsg)
                
            }
            else if(item && config == "remove") {
                item.classList.remove(classMsg)
            }
        }
    }

    getAllControlsItems(){
        return document.querySelectorAll(".pagination-controls-item")
    }

    initPaginationControlsItemsConfig(){
        const allControlsItems = this.getAllControlsItems()

        allControlsItems.forEach(controlItem => {
            controlItem.addEventListener("click", () => {
                const targetInvalid = "..."
                const dataControlValueSelected = controlItem.dataset.controls
                const isTargetInvalid = dataControlValueSelected == targetInvalid

                if (isTargetInvalid) {return}

                const isSelectedControlItemIsNotCurrent = (
                    this.currentPaginationControlSelected != dataControlValueSelected
                )

                if (isSelectedControlItemIsNotCurrent) {
                    this.setClassOnAvailableItems(dataControlValueSelected, "add")
                    this.setClassOnAvailableItems(this.currentPaginationControlSelected, "remove")
                    this.currentPaginationControlSelected = dataControlValueSelected
                    return 
                }
            })
        })
    }

    init(){
        this.createControlsElements()
        this.setClassOnAvailableItems(1, "add")
        this.initPaginationControlsItemsConfig()
        
    }
}
