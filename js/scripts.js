

var inputZip = document.getElementById("inputZip");

inputZip.addEventListener("blur", function(){

    function clearFields(){
        document.querySelector('#inputAddress').value = ''
        document.querySelector('#inputNeighborhood').value = ''
        document.querySelector('#inputComplement').value = ''
        document.querySelector('#inputCity').value = ''
        document.querySelector('#inputState').value = ''
    }

    function fillFields(json){
        if(json.erro){
            clearFields();
            return;
        }

        document.querySelector('#inputZip').value = json.cep;
        document.querySelector('#inputAddress').value = json.logradouro;
        document.querySelector('#inputNeighborhood').value = json.bairro;
        document.querySelector('#inputComplement').value = json.complemento;
        document.querySelector('#inputCity').value = json.localidade;
        document.querySelector('#inputState').value = json.uf;
    }

    let cep = inputZip.value.replace('-', '');

    if(cep.length != 8){
        clearFields();
        return;
    }

    let url = 'http://viacep.com.br/ws/' + cep + '/json';

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if(xhr.status == 200){
                fillFields(JSON.parse(xhr.responseText));
            }
        }
    }
    xhr.send();

});