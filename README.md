# @feedbackfarm/react

[Feedback.farm](https://feedback.farm) widget

Embed a small widget into your web application to start getting user feedback.

# Demos

- [Code Sandbox](https://codesandbox.io/s/feedbackfarm-react-bsklw)

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

| Parameters |  Type  | Description                                                             | Required |
| ---------- | :----: | :---------------------------------------------------------------------- | :------: |
| projectId  | string | Project identifier available on [feedback.farm](feedback.farm) platform |    ✅    |
| identifier | string | User identifier (email, id, ...)                                        |          |

Full [documentation](https://www.notion.so/Embed-Widget-In-Your-React-Website-6feaf05619c4461d832c7c685c664c33)

# License

MIT License

Copyright (c) 2021 feedbackfarm

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
