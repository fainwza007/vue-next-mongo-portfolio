import portfolio from "#app/servers/http/handlers/portfolio";
import {
  usePortfolioValidationSchema,
  useIdValidationSchema,
} from "#app/utils/validation";

export default ({ portfolioRepo }) => {
  const validationSchema = usePortfolioValidationSchema();
  const idValidationSchema = useIdValidationSchema();

  function sanitizePortfolio(portfolio) {
    return {
      cover: portfolio.cover,
      images: portfolio.images,
      title: portfolio.title,
      content: portfolio.content,
      skills: portfolio.skills,
      publishedAt: portfolio.publishedAt,
    };
  }

  async function getPortfolios(page, limit) {
    let portfolios = [];

    const sanitizedPage = Math.max(page, 1);
    const sanitizedLimit = Math.min(limit, 10);
    const offset = (sanitizedPage - 1) * sanitizedLimit;

    portfolios = await portfolioRepo.getPortfolios(offset, sanitizedLimit);

    return portfolios;
  }

  async function getPortfolio(id) {
    const validateId = await idValidationSchema.validate(id);

    const portfolio = await portfolioRepo.getPortfolio(validateId);

    return portfolio;
  }

  async function createPortfolio(draftedPortfolio) {
    const validationPortfolio = await validationSchema.validate(
      draftedPortfolio
    );

    const sanitizedPortfolio = sanitizePortfolio(validationPortfolio);

    const portfolio = await portfolioRepo.createPortfolio(sanitizedPortfolio);

    return portfolio;
  }

  async function updatePortfolio(id, draftedPortfolio) {
    const validationPortfolio = await validationSchema.validate(
      draftedPortfolio
    );
    const validateId = await idValidationSchema.validate(id);

    const sanitizedPortfolio = sanitizePortfolio(validationPortfolio);

    const portfolio = await portfolioRepo.updatedPortfolio(
      validateId,
      sanitizedPortfolio
    );

    return portfolio;
  }

  async function deletePortfolio(id) {
    const validateId = await idValidationSchema.validate(id);

    const result = await portfolioRepo.deletePortfolio(validateId);

    return result;
  }

  return {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
  };
};
