# List

```typescript
import { List } from "monojs/client"

export function App() {
  const items = ["Item 1", "Item 2", "Item 3"];

  Root(
    View(
      List(items).each(item => Text(item))
    )
  );
}
```

