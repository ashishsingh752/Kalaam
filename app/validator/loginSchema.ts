import vine from "@vinejs/vine";

const loginSchema = vine.object({
//   email: vine.string().email(),
  password: vine.string(),
  roll_number: vine.string(),
});

export {loginSchema};
