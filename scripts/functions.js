// COLLECTING ELEMENTS
const numBim = document.querySelector('#iBim')

const bim1 = document.querySelector('#iB1')
const bim2 = document.querySelector('#iB2')
const bim3 = document.querySelector('#iB3')
const bim4 = document.querySelector('#iB4')

const resetBtn = document.querySelector('#reset')
const calcBtn = document.querySelector('#btn-calc')

const lastGrade = document.querySelector('#iLG')
const finalAverage = document.querySelector('#iFG')
const statusAR = document.querySelector('#iSit')
const finalTest = document.querySelector('#iNPF')

// FUNCTIONS
function reset(status) {
    if (status) {
        bim1.value = ''
        bim2.value = ''
        bim3.value = ''
        bim4.value = ''
        lastGrade.value = ''
        finalAverage.value = ''
        statusAR.value = ''
        finalTest.value = ''
    } else {
        bim3.value = ''
        bim4.value = ''
    }
}

function disable(status) {
    if (status) {
        bim3.disabled = true
        bim4.disabled = true
    } else {
        bim3.disabled = false
        bim4.disabled = false
    }
}

function gradesNotation() {
    alert('As notas devem estar na notação de 0 e 100')
}

function invalidInput() {
    alert('Entrada inválida')
    reset(true)
}

function showResults(v1, v2, v3, v4) {
    lastGrade.value = (!isNaN(v1)) ? Math.round(v1) : v1
    finalAverage.value = (!isNaN(v2)) ? Math.round(v2) : v2
    statusAR.value = v3
    finalTest.value = (!isNaN(v4)) ? Math.round(v4) : v4
}

function lastGradeCalc(num1, num2, num3) {
    if (arguments.length == 1) {
        let result = ((300 - (num1 * 2)) / 3)
        showResults(result, '-', '-', '-')
    } else if (arguments.length == 3) {
        let result = (600 - (num1 * 2) - (num2 * 2) - (num3 * 3)) / 3
        showResults(result, '-', '-', '-')
    }
}

function averageCalc(num1, num2, num3, num4) {
    if (arguments.length == 2) {
        let result = Math.round(((num1 * 2 + num2 * 3) / 5))
        if (result >= 60) {
            situation = 'Aprovado'
        } else if (result < 20) {
            situation = 'Reprovado'
        } else {
            situation = 'Recuperação'
        }

        if (situation == 'Recuperação') {
            f1 = 120 - result
            f2 = ((300 - (num2 * 3)) / 2)
            f3 = ((300 - (num1 * 2)) / 3)
            finalTestGrade = Math.min(f1, f2, f3)
        } else {
            finalTestGrade = '-'
        }

        showResults('-', result, situation, finalTestGrade)
    } else if (arguments.length == 4) {
        let result = Math.round(((num1 * 2 + num2 * 2 + num3 * 3 + num4 * 3) / 10))
        if (result >= 60) {
            situation = 'Aprovado'
        } else if (result < 20) {
            situation = 'Reprovado'
        } else {
            situation = 'Recuperação'
        }

        if (situation == 'Recuperação') {
            f1 = 120 - result
            f2 = 300 - num2 - ((num3 * 3) / 2) - ((num4 * 3) / 2)
            f3 = 300 - num1 - ((num3 * 3) / 2) - ((num4 * 3) / 2)
            f4 = 200 - num4 - ((num1 * 2) / 3) - ((num2 * 2) / 3)
            f5 = 200 - num3 - ((num1 * 2) / 3) - ((num2 * 2) / 3)
            finalTestGrade = Math.min(f1, f2, f3, f4, f5)
        } else {
            finalTestGrade = '-'
        }

        showResults('-', result, situation, finalTestGrade)
    }
}

// CALLINGS
numBim.addEventListener('change', () => {
    if (numBim.value == 2) {
        disable(true)
        reset(false)
    } else {
        disable(false)
        reset(false)
    }
})

resetBtn.addEventListener('click', () => {
    reset(true)
})

bim1.addEventListener('input', () => {
    if (bim1.value < 0 || bim1.value > 100) {
        gradesNotation()
        bim1.value = ''
    }
})

bim2.addEventListener('input', () => {
    if (bim2.value < 0 || bim2.value > 100) {
        gradesNotation()
        bim2.value = ''
    }
})

bim3.addEventListener('input', () => {
    if (bim3.value < 0 || bim3.value > 100) {
        gradesNotation()
        bim3.value = ''
    }
})

bim4.addEventListener('input', () => {
    if (bim4.value < 0 || bim4.value > 100) {
        gradesNotation()
        bim4.value = ''
    }
})

calcBtn.addEventListener('click', () => {
    if (numBim.value == 2) {
        if (bim1.value.length == 0) {
            invalidInput()
        } else if (bim2.value.length == 0) {
            lastGradeCalc(bim1.value)
        } else {
            averageCalc(bim1.value, bim2.value)
        }
    } else {
        if (bim1.value.length == 0 || bim2.value.length == 0 || bim3.value.length == 0) {
            invalidInput()
        } else if (bim4.value.length == 0) {
            lastGradeCalc(bim1.value, bim2.value, bim3.value)
        } else {
            averageCalc(bim1.value, bim2.value, bim3.value, bim4.value)
        }
    }
})
