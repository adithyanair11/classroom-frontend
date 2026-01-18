import { Course } from "@/types";

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    description:
      "An introductory course covering fundamental programming concepts, algorithms, and problem-solving techniques.",
    department: "Computer Science",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Data Structures and Algorithms",
    code: "CS201",
    description:
      "Focuses on core data structures such as arrays, linked lists, trees, and graphs, along with algorithmic analysis.",
    department: "Computer Science",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Principles of Database Systems",
    code: "CS305",
    description:
      "Covers relational database design, SQL, normalization, indexing, and an introduction to distributed databases.",
    department: "Information Systems",
    createdAt: new Date().toISOString(),
  },
];
