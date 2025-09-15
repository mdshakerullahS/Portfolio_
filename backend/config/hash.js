import bcrypt from "bcrypt";

const password = "@mdshakerullah";
const saltRound = 10;

bcrypt.hash(password, saltRound).then((hash) => {
  console.log(hash);
});
