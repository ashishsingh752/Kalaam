import vine from "@vinejs/vine";

const postSchema = vine.object({
  content: vine.string().trim().minLength(5),
  heading: vine.string().trim().maxLength(100),
  image: vine.string(),
});

export { postSchema };
