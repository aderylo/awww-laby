const express = require('express');
const fs = require('fs');

const router = express.Router();
const fsPromise = require('fs/promises');
const myFunctions = require('../myLib/myModule');

function toCommaOrNewline(word) {
  let word2 = '';
  const n = word.length;
  for (let i = 0; i < n; i += 1) {
    if (word.charAt(i) === ',' || word.charAt(i) === '\n') {
      return word2;
    }
    word2 += word.charAt(i);
    console.log('word2 to ', word2);
  }
  return word2;
}

/* GET home page. */
router.get('/', (req, res) => {
  res.render('main');
});

router.get('/part1', async (req, res) => {
  /* TODO Part 1: Fix this so that it can access the returned value of promise1.
    Once you get that value, change the code so that the value is printed on the console and
    pass as result parameter below. Promise promise1 is in myLib/myModule.js but you do not
    have to do anything there. All changes for part 1 are to be done here in this get request. */
  console.log(await myFunctions.promise1);
  /* previous line does not print the value returned by promise1,
  it is packed as a promise (something has to be fixed) */
  res.render('solution', { result: await myFunctions.promise1 }); // same issue here
});

router.get('/part2', async (req, res) => {
  /* TODO Part 2: First fix functionPart2 in myLib/myModule.js so that we get the desired result.
    After that, change the code so that the value is printed on the console and
    pass as result parameter below. */
  console.log(await myFunctions.functionPart2());
  /* previous line does not print the value returned by function2
    (something has to be fixed) */
  res.render('solution', { result: await myFunctions.functionPart2() }); // same issue here
});

router.get('/part3/:word', async (req, res) => {
  const receivedWord = req.params.word;
  /* TODO Part 3: First provide definition of functionPart3 in /myLib/myModule.js file.
               After that, fix this part so that we return the result of the promise returned
               by functionPart3 when called with receivedWord as parameter. */
  res.render('solution', { result: await myFunctions.functionPart3(receivedWord) });
});

router.get('/part4/:file', async (req, res) => {
  const fileToOpen = req.params.file;
  console.log(`File to open = ${fileToOpen}`);
  console.log(`fsPromise = ${fsPromise}`);
  /* TODO Part 4 (chaining promises)
      Use fsPromise above to extract the first string found in fileToOpen
      located in /txtFiles that appears before a comma.
      If no comma is found then read the string before the first break line character \n.
      Store such string in a variable call firstFile. Then, using the same fsPromise above,
      open firstFile located in /txtFiles folder and return its contents as result parameter
      in the line of code below. If there is an error opening firstFile then the error
      should be returned as result parameter below. */
  fs.promises.readFile(`./txtFiles/${fileToOpen}`, 'utf8')
    .then((content) => {
      console.log('wypiszemy content');
      console.log(content);
      const firstFile = toCommaOrNewline(content);
      console.log('okrojony content to');
      console.log(firstFile);
      fs.promises.readFile(`./txtFiles/${firstFile}`, 'utf8')
        .then((resultContent) => {
          console.log(resultContent);
          res.render('solution', { result: resultContent });
        })
        .catch((error) => {
          console.log(error);
          res.render('solution', { result: error });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
