import { Schema } from "mongoose";

export default (connection) => {
  const ProfileModel = connection.model(
    "Profile",
    new Schema({
      overallSkills: [String],
      experiences: [
        {
          title: String,
          logo: String,
          company: String,
          type: {
            type: String,
          },
          start: Date,
          end: Date,
          skills: [String],
          detail: String,
        },
      ],
    })
  );

  function toProfile(profile) {
    if (!profile) return null;
    return {
      id: (profile._id ?? profile.id)?.toString(),
      overallSkills: profile.overallSkills ?? [],
      experiences: (profile.experiences ?? []).map((exp) => ({
        ...exp,
        id: (exp._id ?? exp.id)?.toString(),
      })),
    };
  }

  async function getProfile() {
    let profile;

    try {
      profile = await ProfileModel.findOne({}).lean();

      if (!profile) {
        return profile;
      }
    } catch (error) {
      throw new Error(error);
    }

    return toProfile(profile);
  }

  async function updatedProfile(newProfile) {
    let profile;

    try {
      const update = {
        $set: newProfile,
      };

      profile = await ProfileModel.findOneAndUpdate({}, update, {
        new: true,
        upsert: true,
      });
    } catch (error) {
      throw new Error(error);
    }

    return toProfile(profile);
  }

  return {
    getProfile,
    updatedProfile,
  };
};
