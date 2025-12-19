# Control flow

## When

```typescript
import { When } from "monojs/client"

export function App() {
  When(true)
   .then(Text("The condition is true"))
   .else(Text("The condition is false"))
}
```
