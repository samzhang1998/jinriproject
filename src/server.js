const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const mockOrders = [
  {
    id: '1598723',
    date: '09-04-2023',
    address: 'Unit654/311 high Street, Kingsford NSW 2037',
    status: 'Processing',
  },
  {
    id: '1598724',
    date: '09-04-2023',
    address: 'Unit654/311 high Street, Kingsford NSW 2037',
    status: 'Completed',
  },
  {
    id: '16124256',
    date: '09-04-2023',
    address: '45 Hills street, Marricville NSW 2301',
    status: 'Completed',
  },
  {
    id: '16124257',
    date: '09-04-2023',
    address: '45 Hills street, Marricville NSW 2301',
    status: 'Processing',
  },
];

app.get('/data', (req,res) => {
  res.json(mockOrders);
});

app.post('/data', (req,res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  res.status(200).json({ message: 'Message received successfully!' });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});