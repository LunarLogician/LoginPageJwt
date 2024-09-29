import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const LoginpageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true 
    }, 
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    tokens:[{
        token:{
            type :String,
            required : true
        }
    }]
});



LoginpageSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign(
            { id: this._id.toString(), username: this.username }, // Include username in token
            process.env.JWT_SECRET
        );

        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (e) {
        console.log(e);
    }
}



LoginpageSchema.pre("save",async function(next) {
    if (this.isModified("password")) {
         this.password = await bcrypt.hash(this.password,10)
        next(); 
    }
   
})




const Logincol = mongoose.model('Logincol', LoginpageSchema);

export default Logincol;
