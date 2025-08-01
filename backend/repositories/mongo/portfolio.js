import { Schema } from "mongoose";

export default (connection) => {
  const PortfolioModel = connection.model(
    "Portfolio",
    new Schema({
      cover: String,
      images: [String],
      title: String,
      content: String,
      skills: [String],
      publishedAt: Date,
    })
  );

  function toPortfolio(portfolio) {
    return {
      id: portfolio.id,
      cover: portfolio.cover,
      images: portfolio.images,
      title: portfolio.title,
      content: portfolio.content,
      excerpt: portfolio.content.substring(0, 80),
      skills: portfolio.skills,
      publishedAt: portfolio.publishedAt,
    };
  }

  async function getPortfolios(offset, limit) {
    try {
      const [portfolios, total] = await Promise.all([
        PortfolioModel.where({}).skip(offset).limit(limit).find(),
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
      portfolio = await PortfolioModel.where({ _id: id }).findOne();
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
