const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "shivansh_sharma";
const DOB = "06032005";
const EMAIL = "shivansh832.be22@chitkara.edu.in";
const ROLL_NUMBER = "2210990832";

function newStr(alphabets) {
  const allChars = alphabets.join('').split('').reverse();
  return allChars.map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()).join('');
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    data.forEach(item => {
        const num = Number(item);

        if (!isNaN(num)) {
            if (num % 2 === 0) {
            evenNumbers.push(item);
            } else {
            oddNumbers.push(item);
            }
            sum += num;

        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());

        } else {
            specialChars.push(item);
        }
    });


    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: newStr(alphabets)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ is_success: false, message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));