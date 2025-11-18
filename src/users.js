export const usersData = [
  {
    id: 1,
    username: "ivan_ivanov",
    email: "ivan.ivanov@example.com",
    user_tags: ["React", "JavaScript", "CSS"],
    user_roles: ["frontend-разработчик", "backend-разработчик"],
    authored_projects: [
      { name: "Веб-приложение для учета задач", status: "в разработке" },
      { name: "Сервис для управления заметками", status: "завершен" }
    ],
    participating_projects: [
      { name: "Мобильное приложение для фитнеса", status: "в разработке" },
      { name: "Аналитическая панель", status: "завершен" }
    ],
    stats: {
      projects_created: 2,
      project_responses: 5,
      projects_participated: 2,
      projects_completed: 1
    }
  },
  {
    id: 2,
    username: "petr_petrov",
    email: "petr.petrov@example.com",
    favorite_tags: ["React Native", "Firebase", "Health"],
    roles: ["frontend-разработчик", "аналитик"],
    authored_projects: [
      { name: "Мобильное приложение для фитнеса", status: "в разработке" }
    ],
    participating_projects: [
      { name: "Веб-приложение для учета задач", status: "в разработке" },
      { name: "Аналитическая панель", status: "завершен" }
    ],
    stats: {
      projects_created: 1,
      project_responses: 3,
      projects_participated: 2,
      projects_completed: 1
    }
  },
  {
    id: 3,
    username: "maria_sidorova",
    email: "maria.sidorova@example.com",
    favorite_tags: ["TypeScript", "D3.js", "Data Visualization", "UI/UX"],
    roles: ["backend-разработчик", "аналитик"],
    authored_projects: [
      { name: "Аналитическая панель", status: "завершен" }
    ],
    participating_projects: [
      { name: "Веб-приложение для учета задач", status: "в разработке" }
    ],
    stats: {
      projects_created: 1,
      project_responses: 2,
      projects_participated: 1,
      projects_completed: 1
    }
  },
  {
    id: 4,
    username: "aleksey_kozlov",
    email: "aleksey.kozlov@example.com",
    favorite_tags: ["Next.js", "Stripe", "E-commerce"],
    roles: ["frontend-разработчик", "backend-разработчик"],
    authored_projects: [
      { name: "Интернет-магазин", status: "в разработке" }
    ],
    participating_projects: [
      { name: "Веб-приложение для учета задач", status: "в разработке" },
      { name: "Мобильное приложение для фитнеса", status: "в разработке" }
    ],
    stats: {
      projects_created: 1,
      project_responses: 4,
      projects_participated: 2,
      projects_completed: 0
    }
  }
];
