import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    userId: ObjectId,
    stocks: [
      {
        symbol: String,
        quantity: Number,
        purchasePrice: Number,
        purchaseDate: Date,
        currentPrice: Number,
        totalValue: Number,
        dailyChange: Number,
        riskLevel: String,
      },
    ],
    totalValue: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

export default Portfolio;