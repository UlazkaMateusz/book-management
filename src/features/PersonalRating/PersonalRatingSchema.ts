import * as Yup from "yup";

export const PersonalRatingSchema = Yup.object().shape({
  notes: Yup.string()
    .optional()
    .test(
      "length",
      "Must be at least 3 characters",
      (val) => !val || val?.length > 3
    ),
  readingProgress: Yup.string()
    .optional()
    .oneOf(["Unread", "Reading", "Finished"]),
  rating: Yup.string().optional().oneOf(["", "1", "2", "3", "4", "5"]),
});
