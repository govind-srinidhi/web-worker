/**
 * @file It contains the script for home page.
 */
import Worker from 'worker-loader!../../workers/sort'

export default {
  name: "Home",
  data() {
    return {
      randomValues: Array(),
      numberOfElements: 100000,
      timeOffset: 100,
      sortingCompleted: false,
      addedItems: Array(),
      isWorkerStarted: false,
      rules: {
        required: value => !!value || 'Required',
        numeric: value => !isNaN(value) || 'Accepts only numeric values'
      },
      dateIntervals: Array()
    }
  },
  computed: {
    resultsForTable() {
      return this.addedItems.map(item => {
        return {
          value         : item.value,
          sentTime      : item.sentTime,
          processingTime: item.processingTime
        }
      })
    },
    headersForTable() {   
      return this.$TABLES.RESULTS.headers.map(header => {
        return {
          ...header, ...{
            text: header.text
          }
        }
      })
    },
    footersForTable() {
      return {
        ...this.$TABLES.RESULTS.footer, ...{
          itemsPerPageText: this.$TABLES.RESULTS.footer.itemsPerPageText
        }
      }
    },
    timeToSort() {
      if (this.dateIntervals.length === 3)
        return `${((this.dateIntervals[2] - this.dateIntervals[0])/(1000*60)).toFixed(2)} minutes`
    },
    timeToGenerateRandomValues() {
      if (this.dateIntervals.length > 1) 
        return `${((this.dateIntervals[2] - this.dateIntervals[0])/1000).toFixed(2)} seconds`
    },
    averageProcessingTimeToAddRandomValue() {
      if (this.sortingCompleted) {
        var totalTimeTaken = 0
        this.addedItems.forEach(item => totalTimeTaken += parseFloat(item.value))
        return `${(totalTimeTaken/this.addedItems.length).toFixed(2)} milliseconds`
      }
    }
  },
  methods: {
    startWorker() {
      if (window.Worker) {
        this.isWorkerStarted = true
        this.dateIntervals.push(new Date().getTime())
        for (var i = 0; i < this.numberOfElements; i++) {
          this.randomValues.push(Math.random()*100)
        }
        this.dateIntervals.push(new Date().getTime())
        let worker = new Worker()
        worker.postMessage([this.randomValues])

        const interval = setInterval(() => {
          if (!this.sortingCompleted) {
            worker.postMessage([this.randomValues, Math.random()*100, new Date().getTime()])
          }
        }, this.timeOffset)

        worker.onmessage = (e) => {
          if (e.data[1].status == "completed") {
            this.sortingCompleted = true
            this.dateIntervals.push(new Date().getTime())
            clearInterval(interval)
          } else {
            this.addedItems.push(e.data[1])
          }
        }
      }
    }
  }
}