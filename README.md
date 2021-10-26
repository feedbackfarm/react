# @feedbackfarm/react

[Feedback.farm](https://feedback.farm) widget

Embed a small widget into your web application to start getting user feedback.

# Demos

- [Code Sandbox](https://codesandbox.io/s/feedbackfarm-react-bsklw)

# Usage

1. Create a project on the [feedback.farm](https://feedback.farm) platform and then grab the project id.

2. `npm install @feedbackfarm/react`

3. Insert the following snippet with your `projectId`

```
// index.jsx
import FeedbackFarm from "@feedbackfarm/react";

<FeedbackFarm projectId="...">
  <span>
    Give Feedback
  </span>
</FeedbackFarm>
```

### Parameters

| Parameters   |  Type  | Description                                                             | Required |
| ------------ | :----: | :---------------------------------------------------------------------- | :------: |
| `projectId`  | string | Project identifier available on [feedback.farm](feedback.farm) platform |    ✅    |
| `identifier` | string | User identifier (email, id, ...)                                        |          |

Full [documentation](https://www.notion.so/Embed-Widget-In-Your-React-Website-6feaf05619c4461d832c7c685c664c33)
