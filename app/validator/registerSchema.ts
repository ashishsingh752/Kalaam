import vine from "@vinejs/vine";

const registerSchema = vine.object({
  name: vine.string().minLength(3).maxLength(30),
  email: vine.string().email().minLength(5).maxLength(50),
  password: vine.string().minLength(6).maxLength(16),
  roll_number: vine.string().fixedLength(9),
  image: vine.string().optional(),
  role: vine.string().optional(),
  yearOfStudy: vine.string().optional(),
});

export { registerSchema };
