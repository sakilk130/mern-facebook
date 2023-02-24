import * as Yup from 'yup';

export const CreatePostRequest = Yup.object().shape({
  text: Yup.string().trim(),
  user: Yup.string().required('User is required').trim(),
  images: Yup.array().of(Yup.string().trim()),
  background: Yup.string().trim(),
  comments: Yup.array().of(
    Yup.object().shape({
      comment: Yup.string().trim(),
      image: Yup.string().trim(),
      commentBy: Yup.string().trim(),
      commentAt: Yup.date(),
    })
  ),
});
