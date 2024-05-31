import vine from "@vinejs/vine";

const postSchema = vine.object({
  content: vine.string().trim().minLength(50),
  heading: vine.string().trim().minLength(5).maxLength(100),
  image_url: vine.string(),
});

export { postSchema };
