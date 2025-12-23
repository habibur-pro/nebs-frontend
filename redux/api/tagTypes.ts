export const TAG_TYPES = {
  NOTICE: "Notice",
  USER: "User",
  SINGLE_USER: "Single-User",
} as const;

export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];
