import jwt from "jsonwebtoken";
import {
  useAuthValidationSchema,
  ValidationError,
} from "#app/utils/validation";

export default ({ userRepo }, config) => {
  const validationSchema = useAuthValidationSchema();

  async function login(username, password) {
    const auth = await validationSchema.validate({
      username,
      password,
    });

    const user = await userRepo.getUser(auth.username, auth.password);
    if (!user) {
      throw new ValidationError("unable to find the user");
    }

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
        },
      },
      config.secret,
      { algorithm: config.algorithms[0] }
    );

    // const token = jwt.sign(
    //   {
    //     user: {
    //       id: "1234",
    //       username: "john",
    //     },
    //   },
    //   config.secret,
    //   { algorithm: config.algorithms[0] }
    // );
    return { token, status: true };
  }

  async function register(username, password) {
    const auth = await validationSchema.validate({
      username,
      password,
    });

    const status = await userRepo.createUser(auth.username, auth.password);

    return true;
  }

  return { login, register };
};
