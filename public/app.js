app.post('/donation', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO donations SET ?', formData, (err, result) => {
      if (err) {
        console.error(err);
        console.log('appjs hata');
        res.status(500).send('Bir hata oluştu.App.js');
      } else {
        console.log('Form verileri başarıyla kaydedildi.');
        res.send('Teşekkürler! Form verileri başarıyla kaydedildi.');
      }
    });
  });
z  