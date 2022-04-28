import mongoose from 'mongoose';

const connection = {
  isConnected: false,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    /* @ts-ignore */
    const db: any = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Connected');
  } catch (err) {
    console.log('!!! Failed DB Connected', err);
  }
}

export default dbConnect;
