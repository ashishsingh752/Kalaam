import vine from "@vinejs/vine";

const registerSchema = vine.object({
  username: vine.string().minLength(3).maxLength(30),
  email: vine.string().email().minLength(5).maxLength(50),
  password: vine.string().minLength(6).maxLength(16).confirmed(),
});

export {registerSchema};
