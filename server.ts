/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: /server.ts
-------------------------------------------- */

import express from 'express';
const app = express();

// @ts-expect-error - temporary override during development
app.get('/', (req, res) =>
    res.send('Welcome to Elynors Server!') )

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
