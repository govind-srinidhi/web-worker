var randomValues = new Array()
var index = 1
var isPaused = false
var isCompleted = false

onmessage = (e) => {
  if (e.data.length === 1) {
    randomValues = e.data[0]
    sort()
  } else {
    isPaused = true
    addNewValue(e.data[1], e.data[2])
  }
}

function addNewValue(randomValue, sentTime) {
  if (!isCompleted) {
    randomValues.push(randomValue)
    postMessage([randomValues.length, {status: "added", sentTime, processingTime: new Date().getTime() - sentTime, value: randomValue}])
    isPaused = false
  }
}

function sort() {
  while (index % 1000 !== 0 && index < randomValues.length) {
    if (!isPaused) {
      if (randomValues[index] < randomValues[index - 1]) {
        var j = index
        while (j > 0 && randomValues[j] < randomValues[j - 1]) {
          var temp = randomValues[j]
          randomValues[j] = randomValues[j-1]
          randomValues[j-1] = temp
          j--
        }
      }
      index++
    }
  }
  
  if (index < randomValues.length) {
    index++
    setTimeout(sort, 0)
  } else {
    isCompleted = true
    postMessage([randomValues, {status: "completed", time: new Date()}])
  }
}