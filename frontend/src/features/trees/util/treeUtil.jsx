import { editTree } from '../services/treeService';

export const tagOptions = [
  { value: 'thought', label: 'thought' },
  { value: 'idea', label: 'idea' },
  { value: 'study', label: 'study' },
  { value: 'remind', label: 'remind' },
  { value: 'junk', label: 'junk' },
  { value: 'project', label: 'project' },
  { value: 'comm', label: 'comm' },
];

export const getTagOption = (value) =>
  tagOptions.find((option) => option.value === value);

export async function editTreeHeader(tree, treeChanges) {
  let payload = {};
  const titleChange = tree.title !== treeChanges.title;
  const catChange =
    JSON.stringify(tree.categories) !==
    JSON.stringify(treeChanges.categories.map((cat) => cat.value));

  const isFavoriteChange = tree.isFavorite !== treeChanges.isFavorite;

  if (!titleChange && !catChange && !isFavoriteChange) {
    return false;
  }

  if (titleChange) {
    payload.title = treeChanges.title;
  }

  if (catChange) {
    payload.categories = treeChanges.categories.map((cat) => cat.value);
  }

  if (isFavoriteChange) {
    payload.isFavorite = treeChanges.isFavorite;
  }

  const newTree = await editTree(tree._id, payload);

  return newTree;
}
