# @feedbackfarm/react
[Feedback.farm](https://feedback.farm) widget

Embed a small widget into your web application to start getting user feedback. 

*Your most unhappy customers are your greatest source of learning.* - [Bill Gates](https://www.hubspot.com/customer-feedback)

# Demos

* [Code Sandbox](https://codesandbox.io)

# Usage
First create a project on the [feedback.farm](https://feedback.farm) platform and then grab the project id.

```
// index.tsx
import FeedbackFarm from "@feedbackfarm/react";

<FeedbackFarm projectId="...">
  <span>
    Give Feedback
  </span>
</FeedbackFarm>
```

### Parameters

| Parameters        | Type           | Description           | Required  |
| ------------- |:-------------:| :------------- | :-------------: |
| projectId      | string | Project identifier available on [feedback.farm](feedback.farm) platform | ✅ |
| identifier      | string      | User identifier (email, id, ...) |    |


Full [documentation](https://notion.so)
