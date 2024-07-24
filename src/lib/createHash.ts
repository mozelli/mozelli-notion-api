import { hash } from 'bcryptjs';
import z from 'zod';

export const createHash = async (password: string): Promise<string> => {
    const password_hash = await hash(password, 8);
    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const password_hash = bcrypt.hashSync(password, salt);

    return password_hash
}