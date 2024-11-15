import dotenv from 'dotenv'
import { sign, verify } from "jsonwebtoken";
dotenv.config()

const JWT_SECRE = process.env.JWT_SECRET || "toke.01010101"

export const generateToken = (id: string) =>{
	const jwt = sign({ id }, JWT_SECRE, {
		expiresIn: "2h"
	})
	return jwt
}

export const veryfyToken = (jwt:string)=>{
	const isOk = verify(jwt, JWT_SECRE)
	return isOk
}