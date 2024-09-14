import jwt  from "jsonwebtoken";
export const generateToken = (_id, name, email) => {
  const payload = {
    _id,
    name,
    email,
  };
  return jwt.sign(payload, process.env.SECRET);
};
