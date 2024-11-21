const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());


app.use('/api', schoolRoutes);

app.get('/',(req,res)=>{
  res.json({message:"Welcome to School API"});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});