class AddressAutoComplete {
    constructor(upperCase=false){
        this.cep = document.getElementById("cep")
        this.city = document.getElementById("city")
        this.state = document.getElementById("state")
        this.street = document.getElementById("street")
        this.neighborhood = document.getElementById("neighborhood")
        this.cep?.addEventListener("blur", this.autocomplete.bind(this))
        this.upperCase = upperCase
    }

    async setAddress(cep){
        const api = `https://viacep.com.br/ws/${cep}/json`
        const request = await fetch(api)
        const {
            logradouro,
            bairro,
            uf,
            localidade,
            erro = false} = await request.json()

        if (erro) {
            this.cep.setCustomValidity("CEP NÃO LOCALIZADO")
            this.street.value = ""
            this.neighborhood.value = ""
            this.state.value = ""
            this.city.value = ""
            return
        }
        this.cep.setCustomValidity("")
        this.street.value = this.upperCase ? logradouro.toUpperCase(): logradouro
        this.neighborhood.value = this.upperCase ? bairro.toUpperCase(): bairro
        this.city.value = this.upperCase ?  localidade.toUpperCase(): localidade
        this.state.value = this.upperCase ?  uf.toUpperCase(): uf
    }

    autocomplete(){
        const value = this.cep.value
        const OnlyNumberValue = value.replace(/[^0-9]/g, "")
        const cepValid = OnlyNumberValue.length == 8
        if (!cepValid) {return}
        this.setAddress(OnlyNumberValue)
    }

}

new AddressAutoComplete(true)