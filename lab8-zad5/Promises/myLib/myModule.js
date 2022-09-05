const myFunctions = {};

/* PART 0 */
/* Nothing to be done here. Only understand the function f0 and get familiar with promises. */
function f0() {
  // We omit the reject parameter in the promise. We do not use it
  const promise0 = new Promise((resolve) => {
    setTimeout(() => {
      resolve('A message delivered after few seconds');
    }, 5000);
  });
  console.log('Getting a message... (please wait)');
  promise0.then((resultMessage) => {
    console.log(`Here is the message: ${resultMessage}`);
  });
  console.log('Some other stuff');
}
f0();

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* PART 1 */
/* Nothing to change here in promise1 */
// We omit the reject parameter in the promise. We do not use it
myFunctions.promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('You have finished part 1!');
  }, 2000);
});

/* PART 2 */
/* Nothing to change here in promise2a */
// We omit the reject parameter in the promise. We do not use it
const promise2a = new Promise((resolve) => {
  setTimeout(() => {
    resolve('You have ');
  }, 2000);
});
/* Nothing to change here in promise2b */
// We omit the reject parameter in the promise. We do not use it
const promise2b = new Promise((resolve) => {
  setTimeout(() => {
    resolve('finished part 2!');
  }, 1000);
});
/* TODO: Fix functionPart2 so that it returns the concatenation
of the values returned by promise2a and promise2b */
myFunctions.functionPart2 = async () => {
  await timeout(2000); 
  var value1 = await promise2a;
  var value2 = await promise2b;
  return value1 + value2
};

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


/* PART 3 */
myFunctions.functionPart3 = async (word) => {
  console.log(`Call to functionPart3 with word: ${word}`);
  /* TODO: Return a promise that, after 2 seconds, resolves with returned value
     "Good word" if word ends with "123" and that rejects with returned value
     "Bad word" if the word does not end with "123" */
  await timeout(2000); 
  if (endsWith(word, "123"))
    return "Good word"; 
  else
    return "Bad word"; 
  // return 'Not implemented yet'; // <-- The required promise should be here instead of a string
};

module.exports = myFunctions;
