# @feedbackfarm/react

Feedback Farm widget

Require a [Feedback Farm](https://feedback.farm) account

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

<FeedbackFarm projectId="replace_with_your_project_id" identifier="your_user_identifier">
  <span>
    Give Feedback
  </span>
</FeedbackFarm>
```

### Parameters

| Parameters              |      Type      | Description                                                             | Required |
| ----------------------- | :------------: | :---------------------------------------------------------------------- | :------: |
| `projectId`             |     string     | Project identifier available on [feedback.farm](feedback.farm) platform |    ✅    |
| `identifier`            |     string     | User identifier (email, id, ...)                                        |          |
| `onClose`               |    function    | Called when widget is closed                                            |          |
| `onFeedbackAdded`       |    function    | Called when a feedback has been added                                   |          |
| `onOpen`                |    function    | Called when widget modal is open                                        |          |
| `colors`                |     Colors     | Change widget colors (see below)                                        |          |
| `identifierMode`        | IdentifierMode | See below                                                               |          |
| `identifierPlaceholder` |     string     | The input placeholder (require `identifierMode`)                        |          |

### Colors

```
{
  feature?: { text: string; background: string };
  bug?: { text: string; background: string };
  other?: { text: string; background: string };
  send?: { text: string; background: string };
  background?: string;
  disabledColor?: string;
  borderColor?: string;
}
```

### IdentifierMode

```
required = user is required to provide an identifier (email, id, ...)
optional = user is not force to provide an identifier
```

Full [documentation](https://www.notion.so/Embed-Widget-In-Your-React-Website-6feaf05619c4461d832c7c685c664c33)
