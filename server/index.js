import app from './app.js'

import seed from '../seed.js'
//to seed out database on startup
seed()
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));
