import { useProfileValidationSchema } from "#app/utils/validation";

export default ({ profileRepo }) => {
  const validationSchema = useProfileValidationSchema();

  function sanitizeProfile(profile) {
    const output = {};

    if (profile.overallSkills) {
      output.overallSkills = profile.overallSkills;
    }

    if (profile.experiences) {
      output.experiences = profile.experiences;
    }

    return output;
  }

  async function getProfile() {
    let profile;

    try {
      profile = await profileRepo.getProfile();

      if (!profile) {
        return {
          overallSkills: [],
          experiences: [],
        };
      }
    } catch (error) {
      throw new Error(error);
    }

    return {
      overallSkills: profile.overallSkills ?? [],
      experiences: profile.experiences ?? [],
    };
  }

  async function updateProfile(newProfile) {
    let id;

    const profile = await validationSchema.validate(newProfile);

    const sanitizedProfile = sanitizeProfile(profile);

    const updatedProfile = await profileRepo.updatedProfile(sanitizedProfile);

    id = updatedProfile.id;

    return {
      id,
    };

    // return {
    //   id: "1234",
    // };
  }

  return { getProfile, updateProfile };
};
