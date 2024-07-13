import mongoose from 'mongoose';

let cachedDb = null;

export async function conn() {
  const url = 'mongodb+srv://mayurparmarkachhua:YEmCYzhsTYdh6VIJ@fotonvr.aaczty9.mongodb.net/training?retryWrites=true&w=majority&appName=fotonvr';

  try {
    if (cachedDb) {
      return cachedDb;
    }

    const client = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedDb = client;
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Could not connect to MongoDB');
  }
}
