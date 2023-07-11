const maxField = document.querySelector('.weightsum')
const startBtn = document.querySelector('.set-max')
const selectorOption = document.querySelector('.items')
const weightSumDisplay = document.querySelector('.current-sum')
const display = document.querySelector('#item-display')

const arrItems = [
  { name: 'book', weight: 1, value: 300 },
  { name: 'book', weight: 1, value: 300 },
  { name: 'pen', weight: 0.5, value: 100 },
  { name: 'laptop', weight: 8, value: 150000 },
  { name: 'USB-key', weight: 0.5, value: 2000 },
  { name: 'iphone', weight: 5, value: 150000 },
  { name: 'shoe', weight: 6, value: 15000 },
  { name: 'shirt', weight: 3, value: 3000 },
  { name: 'trouser', weight: 4, value: 4000 },
  { name: 'charger', weight: 3, value: 300 },
  { name: 'plate', weight: 3, value: 5000 },
  { name: 'spoon', weight: 2, value: 300 },
  { name: 'cup', weight: 2, value: 500 },
  { name: 'cable', weight: 2, value: 300 },
  { name: 'socks', weight: 2, value: 300 },
  { name: 'bottle', weight: 3, value: 600 },
  { name: 'purse', weight: 1, value: 500 },
  { name: 'bulb', weight: 3, value: 1000 },
  { name: 'bread', weight: 2, value: 100 },
  { name: 'koki', weight: 2, value: 500 },
  { name: 'banana', weight: 2, value: 300 }
]

const data = {
  items: '',
  weight: 0,
  maxWeight: 0,
  results: ''
}

const getStorage = () =>
  JSON.parse(window?.sessionStorage.getItem('data')) || data
const updateStorage = (update) =>
  window.sessionStorage.setItem('data', JSON.stringify(update))

if (getStorage()) {
  if (getStorage()?.maxWeight) maxField.value = getStorage()?.maxWeight || 0

  display.innerHTML = getStorage()?.items || ''
  weightSumDisplay.innerHTML = getStorage()?.weight || ''
}

startBtn.addEventListener('click', () => {
  if (!maxField.value) {
    window?.alert('input a max weight')
    return
  }

  weightSumDisplay.style.border = '3px solid green'
  updateStorage({ ...getStorage(), maxWeight: maxField.value })
})

selectorOption.addEventListener('change', (e) => {
  console.log(weightSumDisplay)
  if (!maxField.value) {
    window?.alert('input a max weight')
    reset()
    return
  }

  console.log(e.target.value)
  const arrEl = arrItems.find((item) => item.name === e.target.value)

  if (+weightSumDisplay?.innerHTML + arrEl.weight > +maxField.value) {
    weightSumDisplay.style.border = '3px solid red'
    return
  }

  weightSumDisplay.style.border = '3px solid green'

  display.innerHTML += `${e.target.value} <br />`

  const sessionData = getStorage()
  sessionData.items = display.innerHTML

  updateStorage(sessionData)

  updateWeight(arrEl.weight)
})

const updateWeight = (weigthUpdate) => {
  const sessionData = getStorage()
  sessionData.weight = +sessionData.weight + +weigthUpdate

  weightSumDisplay.innerHTML = sessionData.weight

  updateStorage(sessionData)
}

function reset () {
  window?.sessionStorage.removeItem('data')
  maxField.value = ''
  weightSumDisplay.innerHTML = ''
  display.innerHTML = ''
  selectorOption.value = document.getElementsByTagName('option')[0].value
  weightSumDisplay.style.border = 'unset'
}
