let B7Validator = {
    handleSubmit:(event) => {
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        B7Validator.clearError();

        for(let i=0; i < inputs.length; i++) {
            let input = inputs[i]

            let check = B7Validator.checkInput(input);
            if(check !==true) {
                send = false;
                //Exibir o Erro;
                B7Validator.showError(input,check)
            }
        }


        if(send) {
            form.submit()
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) { 
            rules = rules.split('|');

            for(let k in rules) {
                let rDetails = rules[k].split('=');

                switch(rDetails[0]) {
                    case 'required':
                    if(input.value == '') {
                        return 'Campo Não pode ser vazio'
                    }
                    break;
                    case 'min':
                    if(input.value.length < rDetails[1]) {
                        return 'Campo precisa ter pelomentos '+rDetails[1]+' caractéres'
                    }
                    break;
                }
            }
        } 

        return true
    },
    showError:(input, error) => {
        input.style.borderColor = "#FF0000";

        let errorElemnt = document.createElement('div');
        errorElemnt.classList.add('error');
        errorElemnt.innerHTML = error;

        input.parentElement.insertBefore(errorElemnt, input.elementSimbling)
    },
    clearError:() => {
        let inputs = form.querySelectorAll('input');
        for(let i =0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElemnts = document.querySelectorAll('.error');
        for(let i=0; i < errorElemnts.length; i++) {
            errorElemnts[i].remove("error")
        }
    }
};


let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);