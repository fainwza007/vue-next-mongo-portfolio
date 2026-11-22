import { Schema } from "mongoose";

export default (connection) => {
  const PortfolioSchema = new Schema({
    cover: String,
    images: [String],
    title: String,
    content: String,
    skills: [String],
    publishedAt: { type: Date, index: -1 },
  });

  const PortfolioModel = connection.model("Portfolio", PortfolioSchema);

  function toPortfolio(portfolio) {
    if (!portfolio) return null;
    const content = portfolio.content ?? "";
    return {
      id: (portfolio._id ?? portfolio.id)?.toString(),
      cover: portfolio.cover,
      images: portfolio.images ?? [],
      title: portfolio.title,
      content,
      excerpt: content.substring(0, 120),
      skills: portfolio.skills ?? [],
      publishedAt: portfolio.publishedAt,
    };
  }

  async function getPortfolios(offset, limit) {
    try {
      const [portfolios, total] = await Promise.all([
        PortfolioModel.find({})
          .sort({ publishedAt: -1, _id: -1 })
          .skip(offset)
          .limit(limit)
          .lean(),
        PortfolioModel.countDocuments(),
      ]);

      return {
        data: portfolios.map((p) => toPortfolio(p)),
        total,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getPortfolio(id) {
    let portfolio;

    try {
      portfolio = await PortfolioModel.findOne({ _id: id }).lean();
    } catch (error) {
      throw new Error(error);
    }

    return toPortfolio(portfolio);
  }

  async function createPortfolio(draftedPortfolio) {
    let portfolio;

    try {
      portfolio = new PortfolioModel(draftedPortfolio);
      portfolio = await portfolio.save();
    } catch (error) {
      throw new Error(error);
    }

    return toPortfolio(portfolio);
  }

  async function updatedPortfolio(id, draftedPortfolio) {
    let portfolio;

    try {
      portfolio = await PortfolioModel.findOneAndUpdate(
        { _id: id },
        {
          $set: draftedPortfolio,
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw new Error(error);
    }

    return toPortfolio(portfolio);
  }

  async function deletePortfolio(id) {
    let result;

    try {
      result = await PortfolioModel.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }

    return result.deletedCount > 0;
  }

  return {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatedPortfolio,
    deletePortfolio,
  };
};
