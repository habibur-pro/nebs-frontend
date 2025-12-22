export const TAG_TYPES = {
  NOTICE: "Notice",
  USER: "User",
} as const;

export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];
