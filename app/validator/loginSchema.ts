import vine from "@vinejs/vine";

const loginSchema = vine.object({
//   email: vine.string().email(),
  password: vine.string(),
  identifier: vine.string(),
});

export {loginSchema};
