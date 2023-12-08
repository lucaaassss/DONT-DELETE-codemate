import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a Question",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/crown.svg",
    route: "/premium",
    label: "Premium",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/support.svg",
    route: "/support",
    label: "Support",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 3,
    SILVER: 5,
    GOLD: 20,
  },
  ANSWER_COUNT: {
    BRONZE: 3,
    SILVER: 5,
    GOLD: 20,
  },
  QUESTION_UPVOTES: {
    BRONZE: 5,
    SILVER: 10,
    GOLD: 30,
  },
  ANSWER_UPVOTES: {
    BRONZE: 5,
    SILVER: 10,
    GOLD: 30,
  },
  TOTAL_VIEWS: {
    BRONZE: 100,
    SILVER: 200,
    GOLD: 300,
  },
};
