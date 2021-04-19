const fieldCep = document.querySelector('#cep');
const fieldAdress = document.querySelector('#endereco');
const fieldDistrict = document.querySelector('#bairro');
const fieldCity = document.querySelector('#cidade');
const fieldState = document.querySelector('#estado');
const clearForm = (address) => { //Limpar Campos do Formulário
    fieldAdress.value = '';
    fieldDistrict.value = '';
    fieldCity.value = '';
    fieldState.value = '';
}
const fillForm = (address) => { //Preencher Campos do Formulário
   fieldAdress.value = address.logradouro;
   fieldDistrict.value = address.bairro;
   fieldCity.value = address.localidade;
   fieldState.value = address.uf;
}

const isNumber = (number) => /^[0-9]+$/.test(number); //Expressão regular verifa se não tem letra digitada

const validZipCode = (cep) => cep.length === 8 && isNumber(cep); //Verifica se o CEP digitado é válido

const searchForZipCode = async () => { //Pesquisa por CEP;
    clearForm();
    const fieldCepValue = document.querySelector('#cep').value;
    console.log(fieldCepValue)
    const endPoint = `https://viacep.com.br/ws/${fieldCepValue}/json/`;
    if (validZipCode(fieldCepValue)) {
        const dadosCep = await fetch(endPoint);
        const address = await dadosCep.json();
        if (address.hasOwnProperty('erro')) { //hasOwnPropery(property) Elimina loopings desnecessários
            fieldAdress.value = 'CEP não encontrado!';
        } else {
            fillForm(address);
        }
    }else {
        fieldAdress.value = 'CEP Inválido!';
    }
}

document.querySelector('#cep').addEventListener('focusout', searchForZipCode);
document.querySelector('.clear').addEventListener('click', () => {
    clearForm();
    document.querySelector('#cep').value = '';
    document.querySelector('#nome').focus();
    alert('Todos os campos limpos');
});