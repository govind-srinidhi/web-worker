# web-worker

- Implemented insertion sort, which sorts a 100K array of random numbers.
- The sorting happens in the web worker
- Created a UI which triggers the computation by pressing a button.
- When the button is pressed, an array of 100K random numbers are created and sorting is started in the Web Worker.
- While sorting continues, the UI thread sends an extra random number to the Web Worker every x ms, where x can be specified in the UI beforehand.
- When the Web Worker receives a new number, it stops sorting, adds the number to the array, and sends an acknowledgement back. After that, it continues sorting.
- When the sorting is finished, the UI visualizes:
    - How much time the sorting took.
    - How much time adding every extra random number took. 
    - The time between the UI thread sending the number and getting the acknowledgement back is measured and rendered.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
