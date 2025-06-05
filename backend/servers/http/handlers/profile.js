import express from "express";
import asyncHandler from "express-async-handler";
import { useJwt } from "#app/servers/http/middlewares/jwt";

export default ({ profileService }, config) => {
  function router() {
    const router = express.Router();

    router.get("/", asyncHandler(getProfile));
    router.patch("/", useJwt(config.jwt), asyncHandler(updateProfile));

    return router;
  }

  async function getProfile(_, res) {
    const profile = await profileService.getProfile();

    res.status(200).json({ data: profile });

    // res.status(200).json({
    //   data: {
    //     overallSkills: ["string"],
    //     experiences: [
    //       {
    //         logo: "string",
    //         title: "string",
    //         company: "string",
    //         type: "string",
    //         start: "string",
    //         end: "string",
    //         skills: ["string"],
    //         detail: "string",
    //       },
    //     ],
    //   },
    // });
  }

  async function updateProfile(req, res) {
    const profile = await profileService.updateProfile(req.body);

    res.status(200).json({ status: true, id: profile.id });

    // res.status(200).json({
    //   status: true,
    //   id: "1234",
    // });
  }

  return { router };
};
