const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    link:{
        type: String,
        required: true,
    },
    user:{
        type:String,
        required: true,
    }
}, {
    timestamps: true,
});

const Project = mongoose.model("Project",projectSchema);

module.exports = Project;