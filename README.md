# @feedbackfarm/react

Feedback Farm widget

Require a [Feedback Farm](https://feedback.farm/?ref=readme) account

Embed a small widget into your web application to start getting user feedback.

# Usage

1. Create a project on the [feedback.farm](https://feedback.farm/?ref=readme) platform and then grab the project id.

2. `npm install @feedbackfarm/react`

3. Insert the following snippet with your `projectId`

```
// index.jsx
import FeedbackFarm from "@feedbackfarm/react";

<FeedbackFarm projectId="replace_with_your_project_id">
  <span>
    Give Feedback
  </span>
</FeedbackFarm>
```

### Parameters

| Parameters        |         Type         | Description                                                             | Required |
| ----------------- | :------------------: | :---------------------------------------------------------------------- | :------: |
| `projectId`       |        string        | Project identifier available on [feedback.farm](feedback.farm) platform |    ✅    |
| `colors`          |        Colors        | Customize widget colors (see below)                                     |
| `identifier`      |        string        | User identifier (email, id, ...)                                        |          |
| `onClose`         |       function       | Called when the widget is closed                                        |          |
| `onFeedbackAdded` |       function       | Called when a feedback has been added                                   |          |
| `onOpen`          |       function       | Called when the widget is being open                                    |
| `identifierMode`  |    IdentifierMode    | Ask user email (see below)                                              |          |
| `theme`           | `light` / `optional` | Use widget color for light or theme mode                                |          |

### Colors

You can overwrite any of the following colors:

```
{
  buttonColor: string,
  buttonColor: string;
  buttonDisabledColor: string;
  buttonTextColor: string;
  buttonTextDisabledColor: string;
  modalBackgroundColor: string;
  textAreaBackgroundColor: string;
  textAreaBorderColor: string;
  textAreaColor: string;
  textColor: string;
  typeBackgroundColor: string;
}
```

### IdentifierMode

```
required = user is required to provide an email
optional = user is not optionally ask to provide an email
```

Full [documentation](https://www.notion.so/Embed-Widget-In-Your-React-Website-6feaf05619c4461d832c7c685c664c33)
