import slugify from 'slugify';

export const createSlug = (param: string) => {
  return slugify(param, {
    replacement: '-',
    remove: /[^\w\s\d]+/g,
    lower: false,
    strict: false,
    locale: 'vi',
    trim: true
  });
};
