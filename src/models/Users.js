import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
mongoose.Promise = global.Promise;

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase:true
    },
    email: {
        type: String,
        required: true,
        lowercase:true,
        trim:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default:false
    }
}, { timestamps: true }
);
// Encriptar la contraseña
UsersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

// comprobar la contraseña
UsersSchema.methods = {
    comparePassword: function (password) {
        return bcryptjs.compareSync(password, this.password);
    }
};

export default mongoose.model("Users", UsersSchema);