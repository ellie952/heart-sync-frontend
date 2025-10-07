import type { PostType } from "./PostType";

export interface PostPropsType extends PostType {
  updatePosts: (updatedPost: PostType) => void;
}