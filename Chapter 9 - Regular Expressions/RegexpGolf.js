const log = (args) => {
    console.log(args);
}

// Car and cat
let re1 = /^ca(t|r)$/;
log(re1.test("cat")); // -> True
log(re1.test("car")); // -> True
log(re1.test("cas")); // -> False
log(re1.test("cam")); // -> False
log(re1.test("scat")); // -> False
log(re1.test("cats")); // -> False

// pop and prop
let re2 = /^pr?op$/;
log(re2.test("pop")); // -> True
log(re2.test("prop")); // -> True
log(re2.test("pops")); // -> False
log(re2.test("pnop")); // -> False

// ferret, ferry, and ferrari
let re3 = /^ferr(et|y|ari)$/
log(re3.test("ferret")); // -> True
log(re3.test("ferry")); // -> True
log(re3.test("ferrari")); // -> True
log(re3.test("fernet")); // -> False
log(re3.test("ferrart")); // -> False
log(re3.test("ferriri")); // -> False


// Any word ending in ious
let re4 = /^[a-z]*ious$/
log(re4.test("ingenious")); // -> True
log(re4.test("abcious")); // -> True
log(re4.test("ious")); // -> True
log(re4.test("ab1ious")); // -> False
log(re4.test("abcioust")); // -> False


// Any whitespace character followed by a period, comma, colon, or semicolon
let re5 = /\s[.|,|:|;]/
log(re5.test("Hello , how are you?")); // -> True
log(re5.test("Still : what do you think?")); // -> True
log(re5.test("Precious advice, thanks!")); // -> False


// A word longer than six letters
let re6 = /\w{7}/
log(re6.test("abcdefg")); // -> True
log(re6.test("There is abcdefg here")); // -> True
log(re6.test("abcdef")); // -> False
log(re6.test("There is abcdef here")); // -> False


// A word without the letter e (or E)
let re7 = /\b[^e\s]+\b/i
log(re7.test("This hasn't the l3tt3r...")); // -> True
log(re7.test("These have the letter")); // -> False