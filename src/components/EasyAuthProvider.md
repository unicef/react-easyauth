## Example

```jsx static

import React from 'react'
import {EasyAuthProvider} from '@unicef/react-easyauth'

ReactDOM.render(
<EasyAuthProvider url = 'appurl' graphUrl = 'graphUrl'>
<App />
</EasyAuthProvider>
, document.getElementById('root'));
