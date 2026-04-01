import { Schema, model } from "mongoose"
import type { IUser } from "@shared/sharedTypes.js"

const userSchema = new Schema<IUser>({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const User = model<IUser>("User", userSchema)

export default User