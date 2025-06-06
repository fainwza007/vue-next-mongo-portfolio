import * as yup from "yup";

export const useLoginValidationSchema = () =>
  yup.object({
    username: yup.string().min(3).required().label("Username"),
    password: yup.string().required().label("Password"),
  });

export const useSkillsValidationSchema = () =>
  yup.object({
    skills: yup.array().min(1).of(yup.string().min(1)).label("Skills"),
  });

export const useExperienceValidationSchema = () =>
  yup.object({
    title: yup.string().required().label("Title"),
    logo: yup.string().required().label("Logo"),
    company: yup.string().required().label("Company name"),
    type: yup.string().required().label("Type of employment"),
    start: yup
      .date()
      .typeError("Invalid Date")
      .required()
      .when("end", {
        is: (end) => end !== null,
        then: () => yup.date().max(yup.ref("end")),
      }),
    end: yup.date().nullable().typeError("Invalid Date").label("End date"),
    skills: yup.array().min(1).of(yup.string().min(1)).label("Skills"),
    detail: yup.string().required().label("Detail of archievements"),
  });

export const useExperiencesValidationSchema = () =>
  yup.object({
    experiences: yup
      .array()
      .min(1)
      .of(useExperienceValidationSchema())
      .label("Experiences"),
  });

export const usePortfolioValidationSchema = () =>
  yup.object({
    cover: yup.string().nullable().url().label("Logo"),
    images: yup.array().min(1).of(yup.string().url().label("Image")),
    title: yup.string().required().label("Title"),
    content: yup.string().required().label("Content"),
    skills: yup.array().min(1).of(yup.string().min(1)).label("Skills"),
    publishedAt: yup
      .date()
      .typeError("Invalid Date")
      .required()
      .label("Published At"),
  });
