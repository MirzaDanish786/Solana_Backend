import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
    accountActive: {
        type: Number,
        required: true,
        default: 0,
    },
    totalTransactions: {
        type: Number,
        required: true,
        default: 0,
    },
    averageTransactionCost: {
        type: Number,
        required: true,
        default: 0,
    }
});

const Stats = mongoose.model('Stats', statsSchema);

export default Stats;