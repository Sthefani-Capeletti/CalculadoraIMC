(function(){

    /* Navbar */
    const btnNavbar = 
    document.querySelector('.navbar-button');
    const navbarItems =
    document.querySelector('.navbar-items');
    
    const sectionsList =
    document.querySelectorAll('.opacity-controller')


    btnNavbar.addEventListener('click',
    function(){
        btnNavbar.classList.toggle('open')
        navbarItems.classList.toggle('navbar-items-open')
    
        sectionsList.forEach(function(section,index){
            section.classList.toggle('ativar-opacidade')
        })
    
    })

    /* IMC */
    const pesoInput = 
    document.querySelector('#peso');
    const alturaInput = 
    document.querySelector('#altura');
    const divResultado = 
    document.querySelector('.calcular-resultado')
    const btnCalcular =
    document.querySelector('#form-btn')

    function limparForm(){
        pesoInput.value = '';
        alturaInput.value = '';
    }

    function criarParagrafo(){
        const p = document.createElement('p')
        return p;
    }

    function escreverResultado(resultado,ok){
        divResultado.innerHTML = '';

        const p = criarParagrafo();
        p.innerHTML = resultado;

        if(ok){
            p.classList.add('calcular-resultado-ok')
        }
        else{
            p.classList.add('calcular-resultado-erro')
        }

        divResultado.append(p)
    }

    function validaForm(peso,altura){
        const pesoConvertido  = Number(peso);
        const alturaConvertida = Number(altura)

        let mensagem;
        if(peso === '' && altura === ''){
            escreverResultado('Informe o peso e a altura',false)
            pesoInput.focus()
            
        }
        else if(peso === '') {
            escreverResultado('Informe o peso.',false)
            pesoInput.focus();
            return false;
        }
        else if(altura === '') {
            escreverResultado('Informe a altura.',false)
            alturaInput.focus()
            return false;
        }
        else if(Number.isNaN(pesoConvertido) 
        && Number.isNaN(alturaConvertida)){
            escreverResultado('Somente números são válidos',false)
            pesoInput.focus()
        }
        else if(Number.isNaN(pesoConvertido)){
            escreverResultado(`Peso inválido`,false)
            pesoInput.focus()
        }
        else if(Number.isNaN(alturaConvertida)){
            escreverResultado(`Altura inválida`)
            alturaInput.focus()
        }
        else{
            return true;
        }
    }

    function verificaSituacaoIMC(resultado){
        const situacoes = 
        [
            'Abaixo do peso',
            'Peso normal',
            'Pré-obesidade',
            'Obesidade Grau 1',
            'Obesidade Grau 2',
            'Obesidade Grau 3'
        ]

        if(resultado < 18.5){
            return situacoes[0]
        }
        else if(resultado >= 18.5 && resultado <= 24.9){
            return situacoes[1]
        }
        else if(resultado >= 25 && resultado <= 29.9){
            return situacoes[2]
        }
        else if(resultado >= 30 && resultado <= 34.9){
            return situacoes[3]
        }
        else if(resultado >= 35 && resultado <= 39.9){
            return situacoes[4]
        }
        else{
            return situacoes[5]
        }
    }

    function calcularIMC(peso,altura){
        let imc;
        let situacao;
        if(validaForm(peso,altura)){
            imc = (peso / (altura ** 2)).toFixed(2)
            situacao = verificaSituacaoIMC(imc)
            escreverResultado(`<strong> IMC: </strong> 
            ${imc}. <strong> Situação: </strong>
            ${situacao}`,true)

            limparForm()
            pesoInput.focus();
        }
    }

    btnCalcular.addEventListener('click',function(){
        calcularIMC(pesoInput.value,alturaInput.value)
    })

    document.body.addEventListener('keypress',
    function(event){
        if(event.keyCode === 13){
            calcularIMC(pesoInput.value,alturaInput.value)
        }
    })



    
})()