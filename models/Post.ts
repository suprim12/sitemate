import mongoose from 'mongoose';

const PostScheama = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxLength: [40, 'Title must be at least 40 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxLength: [200, 'Description must be less than 200 characters'],
  },
});

const Post = mongoose.models.Post || mongoose.model('Post', PostScheama);

export default Post;
