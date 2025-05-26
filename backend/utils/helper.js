import bcrypt from "bcryptjs";

const saltRounds = 10;

const hashPassword = (password)=>{

    const salted = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password,salted);

    return hashedPassword;

}

export default hashPassword;