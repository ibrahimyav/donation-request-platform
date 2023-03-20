

const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const app = express();

const connection = mysql.createConnection({
  host: '3.96.110.246',
  port: 3306,
  user: 'admin_donation',
  password: 'admin2023*',
  database: 'donation_request'
});

// E-posta gönderme ayarları
const transporter = nodemailer.createTransport({
  host: 'box5530.bluehost.com',
  port: 465,
  secure: true,
auth: {
  user: 'info@carewithme.ca',
  pass: 'deneme123*'
}
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit', (req, res) => {
  const formData = req.body;
  console.log(formData);
  connection.query('INSERT INTO donations SET ?', formData, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Bir hata oluştu.Connection to MySQL');
      console.log('mysql error');
    } else {
      console.log('Form verileri başarıyla kaydedildi.CL');
      res.send('<div className="alert alert-success" role="alert"> Form verileri başarıyla kaydedildi.</div> ');

       // E-posta gönderme
       const mailOptions = {
        from: 'info@carewithme.ca',
        to: formData.email,
        subject: 'Bağışınız alındı.ES',
        text: `Sayın ${formData.name},\n\nBağışınız başarıyla alınmıştır. Ayrıntılar aşağıdaki gibidir:\n\nAd: ${formData.name}\nE-posta: ${formData.email}\nTelefon: ${formData.phone}\nAçıklama: ${formData.description}\n\nTeşekkür ederiz.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('E-posta başarıyla gönderildi: ' + info.response);
        }
      });
    }
  });
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to database successfully');
    app.listen(3029, () => {
      console.log('Sunucu 3029 numaralı portta çalışıyor.');
    });
  }
});
