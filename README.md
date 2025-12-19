# MonoJS

MonoJS is a framework for building web application UI.

- Composable reactive state primitives
- Built-in HTTP client, router and styling api
- Higher level UI elements
- Components render once
- Pure TypeScript (no JSX)

MonoJS goes hardcore in simplicity. Every API is designed to demand the least amount of cognitive attention.

## Hello world

``` typescript
import { Root, State } from 'monojs'

function Timer(interval: number) {
  const count = State.number(0);
  const eventOrOdd = count.transform(n => n % 2 === 0 ? 'even' : 'odd');

  Text(count, ' is ', evenOrOdd)

  const timer = setInterval(() => {
    count.increment()
  }, interval)

  return () => {
    clearInterval(timer)
  }
}

Root.render(() => Timer(1000));
```

The shocking difference compared to popular frameworks like React, Vue, Solid etc. that the UI is written as a statement inside a component (the idea is borrowed from [ripplejs](https://www.ripplejs.com)) and a component returns an **optional** function to be called right before the component unmounts from the component tree.


## State

Mono has built-in composable reactive primitives to manage state inside of a component. Composability and reactivity is essential since the components only render once. Built-in UI primitives track reactive values and update automatically.

Mono has following built-in state primitives. `number`, `string`, `boolean`, `list` (for arrays), `record` (for objects) and `async`. And each state primitive has their own set of methods to update or transform. e.g `State.number` has `increment` method to increment the state value by given value (defaults to 1), `State.list` has `map` method to transform the list to another kind.

State is the most mentally demanding feature of MonoJS especially if you are coming from React because state values can't be just read or mutated in a component body. 

For example;
``` typescript
function Name() {
  const name = State.string('John')
  console.log(name)// Doesn't log `John`
  
  // Instead you can log the value using built-in `log` method
  // It will console.log the state value once and then whenever it changes
  name.log()

  // Or you can't just concatenate it like this:
  const greeting = 'Hello, ' + name

  // Instead, you have to transform the `name` to greeting like this:
  const greeting = name.transfrom(n => 'Hello, ' + n)

  // Or use built-in prepend method
  const greeting = name.prepend('Hello, ')
  
  Text(greeting)
}
```

For static values you can just use a variable.


Visit the [docs](https://github.com/nstfkc/monojs/docs/state.md) to learn more

