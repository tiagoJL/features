class RegexMask {
    constructor(){
        this.setCpfMask()
        this.setCnpjMask()
        this.setCepMask()
        this.setPhoneMask()
    }

    addMask(fieldElementCss, functionName, attributes) {
        document.querySelectorAll(fieldElementCss).forEach(

            field => {
                Object.assign(field, attributes)
                if (attributes.maxlength) {
                    field.setAttribute("maxlength", attributes.maxlength)
                }
                field.addEventListener("keyup", () => {functionName(field)})
            }
        )
    }

    phoneMask(field){
        const firstFilter = field.value.replace(/\D/g, "")
        const secondFilter = firstFilter.replace(/([0-9]{2})([0-9])/, "($1) $2")
        const thirdFilter = secondFilter.replace(/(\s[0-9])([0-9])/, "$1.$2")
        const fourthFilter = thirdFilter.replace(/([0-9]{4})([0-9])/, "$1-$2")
        const finalFilter = fourthFilter.replace(/(-[0-9]{4})(.*)/, "$1")
        field.value = finalFilter
    }

    cepMask(field){
        const firstFilter = field.value.replace(/\D/g, "")
        const finalFilter = firstFilter.replace(/([0-9]{5})([0-9]{1,3})(.*)/, "$1-$2")
        field.value = finalFilter
    }

    cnpjMask(field){
        const firstFilter = field.value.replace(/\D/g, "")
        const secondFilter = firstFilter.replace(/([0-9]{2})([0-9])/, "$1.$2")
        const thirdFilter = secondFilter.replace(/([0-9]{3})([0-9])/, "$1.$2")
        const fourthFilter = thirdFilter.replace(/([0-9]{3}\.[0-9]{3})([0-9])/, "$1/$2")
        const finalFilter = fourthFilter.replace(/([0-9]{4})([0-9]{1,2})(.*)/, "$1-$2")
        field.value = finalFilter
    }

    cpfMask(field){
        const firstFilter = field.value.replace(/\D/g, "")
        const secondFilter = firstFilter.replace(/([0-9]{3})([0-9])/, "$1.$2")
        const thirdFilter = secondFilter.replace(/([0-9]{3})([0-9])/, "$1.$2")
        const finalFilter = thirdFilter.replace(/([0-9]{3})([0-9]{1,2})(.*)/, "$1-$2")
        field.value = finalFilter
    }

    setCnpjMask(){
        const attributes = {
            pattern: "[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}",
            placeholder: "00.000.000/0000-00",
            required: true,
            autocomplete: 'off',
            maxlength: 18
        }
        const cssSelector = ".regx-mask-cnpj"
        this.addMask(cssSelector, this.cnpjMask, attributes)
    }

    setCpfMask(){
        const attributes = {
            pattern: "[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}",
            placeholder: "000.000.000-00",
            required: true,
            autocomplete: 'off',
            maxlength: 14
        }
        const cssSelector = ".regx-mask-cpf"
        this.addMask(cssSelector, this.cpfMask, attributes)
    }

    setCepMask(){
        const attributes = {
            pattern: "[0-9]{5}-[0-9]{3}",
            placeholder: "00000-000",
            required: true,
            autocomplete: 'off',
            maxlength: 9
        }
        const cssSelector = ".regx-mask-cep"
        this.addMask(cssSelector, this.cepMask, attributes)
    }

    setPhoneMask(){
        const attributes = {
            pattern: "(\([0-9]{2}\))? [0-9]\.[0-9]{4}-[0-9]{4}",
            placeholder: "(00) 0.0000-0000",
            required: true,
            autocomplete: 'off',
            type: "tel",
            maxlength: 16
        }
        const cssSelector = ".regx-mask-phone"
        this.addMask(cssSelector, this.phoneMask, attributes)
    }
}