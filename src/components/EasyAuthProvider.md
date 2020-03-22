## Example

```jsx static

import React from 'react'
import {EasyAuthProvider} from '@unicef/react-easyauth'

ReactDOM.render(
<EasyAuthProvider authContext={authContext}>
   <App />
</EasyAuthProvider>
, document.getElementById('root'));
