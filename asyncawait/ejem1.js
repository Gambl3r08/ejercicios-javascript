const doTask = async(iterations) =>{
    const numbers = []
    for(let i=0; i<iterations; i++){
        const number = 1 + Math.floor(Math.random() * 6)
        numbers.push(number)
        if (number ===6){
            return{
                error: true,
                message: "El valor fue 6"
            }
        }
    }

    return {
        error: false,
        value: numbers
    }
}

const resultado = await doTask(10)
console.log(resultado)