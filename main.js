class Calculator{

    constructor(dataPreviousOperand, dataCurrentOperand){
        this.dataPreviousOperand = dataPreviousOperand
        this.dataCurrentOperand = dataCurrentOperand
        this.limpiar()
    }
    // Habrá que pensar que operaciones principales realizará la calculadora y sus botones
    // limpiar datos borrará todos los datos introducidos en la calculadora reseteandola
    limpiar(){
        // dato actual será string vacio
        this.currentOperand = '' 
        // dato previo sera un string vacio
        this.previousOperand = ''
        // operación seleccionada será indefinida cada que se limpie la calculadora
        this.operation = undefined
    }
    // borrar un dato
    // convirtiendo a string el valor y usando la funcion slice() vamos a quitar el último valor puesto en la cadena
    // en slice el (0 indica que vamos a dejar desde el 1er número hasta -1 que sería un número antes del final)
    borrar(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    // agregar números cuando se den click a los botónes numéricos
    agregarNumero(numero){
        // para evitar que permita poner más de 1 punto en la cantidad sería checar que si numero es igual a "."
        // y la actual cadena ya incluye "." nos de un return donde corte la función y no permita poner otro "."
        if(numero === '.' && this.currentOperand.includes('.')) return
        // se convierte a String para que JS añada los números marcados en lugar de sumar sus valores a la cadena
        this.currentOperand = this.currentOperand.toString() + numero.toString()
    }

    // Seleccionar la operación que realizará cuando terminemos de agregar los datos
    operacionSeleccionada(operation){
        // debemos añadir un checador para asegurar que el valor previo no sea nulo
        if(this.currentOperand === '') return
        // otro checador para verificar si el dato previo no es nulo hará el cálculo correspondiente de la función calcular
        if(this.previousOperand !== ''){
            this.calcular()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // realizar el cálculo de la operación
    calcular(){
        let calculo 
        const previo =parseFloat(this.previousOperand)
        const actual =parseFloat(this.currentOperand)
        if(isNaN(previo) || isNaN(actual)) return
        switch (this.operation){
            case '+':
                calculo = previo + actual
                break
            case '-':
                calculo = previo - actual
                break            
            case '*':
                calculo = previo * actual
                break
            case '÷':
                calculo = previo / actual
                break    
            default:
                return
        }
        // Después de realizar el switch el valor actual cambiará a ser el resultado de "calculo" y la siguiente operacion a realizar sera
        // indefinida ya que aún no se selecciona
        this.currentOperand = calculo
        this.operation = undefined
        this.previousOperand =''

    }   

    // Actualizar el display al momento de ir clickeando
    updateDisplay(){
        // para visualizar el valor actual que se está utilizando
        this.dataCurrentOperand.innerText = this.currentOperand
        // para visualizar como el valor previo estéticamente con el simbolo de la operación
        if(this.operation != null){
            this.dataPreviousOperand.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.dataPreviousOperand.innerText = ''
        }      
    }

}


const botonNumero = document.querySelectorAll('[data-number]')
const botonOperacion = document.querySelectorAll('[data-operation]')
const dataClear = document.querySelector('[data-all-clear]')
const dataDel = document.querySelector('[data-del]')
const dataEqual = document.querySelector('[data-equals]')
const dataPreviousOperand = document.querySelector('[data-previous-operand]')
const dataCurrentOperand = document.querySelector('[data-current-operand]')


const calculator = new Calculator (dataPreviousOperand , dataCurrentOperand)

// Para configurar los botónes numéricos
// en la variante botonNumero por cada elemento button va a =>
botonNumero.forEach( button => {
    // A cada botton se le agregará el evento click con la función que tendrá
    button.addEventListener('click', ()=>{
        // en este caso agregará el contenido del texto que hay dentro del boton como valor con la función de nuestra clase "agregarNumero"
        calculator.agregarNumero(button.innerText)
        // ahora para que actualice el display de la calculadora usamos updateDisplay
        calculator.updateDisplay()
    })
})

// Para configurar los simbolos

botonOperacion.forEach( button => {
    // A cada botton se le agregará el evento click con la función que tendrá
    button.addEventListener('click', ()=>{
        // en este caso agregará el contenido del texto que hay dentro del boton como valor cn la función de nuestra clase "operaciónSeleccionada"
        calculator.operacionSeleccionada(button.innerText)
        // ahora para que actualice el display de la calculadora usamos updateDisplay
        calculator.updateDisplay()
    })
})

// Se asigna el evento al boton "="
dataEqual.addEventListener('click', button =>{
    calculator.calcular()
    calculator.updateDisplay()
})

// Asignamos el evento al boton AC o borrar todo
dataClear.addEventListener('click', button =>{
    calculator.limpiar()
    calculator.updateDisplay()
})

// Asignamos el evento al boton Del para borrar
dataDel.addEventListener('click', button =>{
    calculator.borrar()
    calculator.updateDisplay()
})