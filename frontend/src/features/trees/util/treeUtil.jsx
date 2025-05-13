export const tagOptions = [
  { value: 'idea', label: '/Idea' },
  { value: 'inspiration', label: '/Inspiration' },
  { value: 'learning', label: '/Learning' },
];

export const getTagOption = (value) =>
  tagOptions.find((option) => option.value === value);
