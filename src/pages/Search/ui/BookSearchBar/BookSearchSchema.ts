import * as Yup from "yup";

export const BookSearchSchema = Yup.object()
  .shape({
    title: Yup.string().optional(),
    author: Yup.string().optional(),
    year: Yup.number()
      .optional()
      .min(0, "Year of publication has to be greater than one"),
  })
  .test("at-least-one-required", function _(value) {
    const a = !!(value.title || value.author || value.year);
    if (!a) {
      return new Yup.ValidationError(
        "At least one field is required", //Message
        "null",
        "fieldsRequired",
        "required" //type
      );
    }
    return true;
  });
