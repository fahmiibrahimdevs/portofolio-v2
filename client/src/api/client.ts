import {
  Profile,
  WorkExperience,
  UniversityAchievement,
  TechCategory,
  TechSkill,
  Credential,
  Project,
  ProjectCategory,
  ProjectTag,
  Article,
  ArticleCategory,
  ArticleSubCategory,
  ContactMessage,
  AdminUser,
} from "../types";

const TOKEN_KEY = "fahmi_portfolio_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Only set application/json if not sending FormData
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Request failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      errorMessage = `Error ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export const api = {
  // Auth
  async login(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await request<{ token: string; user: AdminUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setToken(res.token);
    return res;
  },

  async getMe(): Promise<{ user: AdminUser }> {
    return request<{ user: AdminUser }>("/api/auth/me");
  },

  logout() {
    removeToken();
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return request("/api/auth/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // Upload
  async uploadFile(file: File): Promise<{ url: string; filename: string; savedName: string; size: number }> {
    const formData = new FormData();
    formData.append("file", file);
    return request("/api/upload", {
      method: "POST",
      body: formData,
    });
  },

  // Profile
  async getProfile(): Promise<{ profile: Profile }> {
    return request<{ profile: Profile }>("/api/profile");
  },

  async updateProfile(data: Partial<Profile>): Promise<{ message: string; profile: Profile }> {
    return request("/api/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Work Experiences
  async getExperiences(): Promise<{ experiences: WorkExperience[] }> {
    return request<{ experiences: WorkExperience[] }>("/api/experiences");
  },

  async createExperience(data: Partial<WorkExperience>): Promise<{ message: string; experience: WorkExperience }> {
    return request("/api/experiences", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateExperience(id: string, data: Partial<WorkExperience>): Promise<{ message: string; experience: WorkExperience }> {
    return request(`/api/experiences/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteExperience(id: string): Promise<{ message: string }> {
    return request(`/api/experiences/${id}`, {
      method: "DELETE",
    });
  },

  // University Achievements
  async getUniversity(): Promise<{ achievements: UniversityAchievement[] }> {
    return request<{ achievements: UniversityAchievement[] }>("/api/university");
  },

  async createUniversity(data: Partial<UniversityAchievement>): Promise<{ message: string; achievement: UniversityAchievement }> {
    return request("/api/university", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateUniversity(id: string, data: Partial<UniversityAchievement>): Promise<{ message: string; achievement: UniversityAchievement }> {
    return request(`/api/university/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteUniversity(id: string): Promise<{ message: string }> {
    return request(`/api/university/${id}`, {
      method: "DELETE",
    });
  },

  // Technology Stack
  async getTechStack(): Promise<{ categories: TechCategory[] }> {
    return request<{ categories: TechCategory[] }>("/api/technology");
  },

  async getTechCategories(): Promise<{ categories: TechCategory[] }> {
    return request<{ categories: TechCategory[] }>("/api/technology/categories");
  },

  async createTechCategory(data: { name: string; order_index?: number }): Promise<{ message: string; category: TechCategory }> {
    return request("/api/technology/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateTechCategory(id: string, data: { name: string; order_index?: number }): Promise<{ message: string; category: TechCategory }> {
    return request(`/api/technology/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteTechCategory(id: string): Promise<{ message: string }> {
    return request(`/api/technology/categories/${id}`, {
      method: "DELETE",
    });
  },

  async createTechSkill(data: { category_id: string; name: string; icon_url?: string; order_index?: number }): Promise<{ message: string; skill: TechSkill }> {
    return request("/api/technology/skills", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateTechSkill(id: string, data: { category_id: string; name: string; icon_url?: string; order_index?: number }): Promise<{ message: string; skill: TechSkill }> {
    return request(`/api/technology/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteTechSkill(id: string): Promise<{ message: string }> {
    return request(`/api/technology/skills/${id}`, {
      method: "DELETE",
    });
  },

  // Credentials
  async getCredentials(): Promise<{ credentials: Credential[] }> {
    return request<{ credentials: Credential[] }>("/api/credentials");
  },

  async createCredential(data: Partial<Credential>): Promise<{ message: string; credential: Credential }> {
    return request("/api/credentials", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateCredential(id: string, data: Partial<Credential>): Promise<{ message: string; credential: Credential }> {
    return request(`/api/credentials/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteCredential(id: string): Promise<{ message: string }> {
    return request(`/api/credentials/${id}`, {
      method: "DELETE",
    });
  },

  // Projects
  async getProjects(params?: { all?: boolean; category?: string }): Promise<{ projects: Project[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.all) searchParams.append("all", "1");
    if (params?.category) searchParams.append("category", params.category);
    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : "";
    return request<{ projects: Project[]; total: number }>(`/api/projects${queryStr}`);
  },

  async getProject(idOrSlug: string | number): Promise<{ project: Project }> {
    return request<{ project: Project }>(`/api/projects/${idOrSlug}`);
  },

  async getProjectCategories(): Promise<{ categories: ProjectCategory[] }> {
    return request<{ categories: ProjectCategory[] }>("/api/projects/categories");
  },

  async getProjectTags(): Promise<{ tags: ProjectTag[] }> {
    return request<{ tags: ProjectTag[] }>("/api/projects/tags");
  },

  async createProject(data: Partial<Project>): Promise<{ message: string; project: Project }> {
    return request("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateProject(id: string | number, data: Partial<Project>): Promise<{ message: string; project: Project }> {
    return request(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteProject(id: string | number): Promise<{ message: string }> {
    return request(`/api/projects/${id}`, {
      method: "DELETE",
    });
  },

  // Articles
  async getArticles(params?: { all?: boolean; category?: string; sub_category?: string }): Promise<{ articles: Article[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.all) searchParams.append("all", "1");
    if (params?.category) searchParams.append("category", params.category);
    if (params?.sub_category) searchParams.append("sub_category", params.sub_category);
    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : "";
    return request<{ articles: Article[]; total: number }>(`/api/articles${queryStr}`);
  },

  async getArticle(idOrSlug: string | number): Promise<{ article: Article }> {
    return request<{ article: Article }>(`/api/articles/${idOrSlug}`);
  },

  async getArticleCategories(): Promise<{ categories: ArticleCategory[] }> {
    return request<{ categories: ArticleCategory[] }>("/api/articles/categories");
  },

  async getArticleSubCategories(categoryId?: string | number): Promise<{ subCategories: ArticleSubCategory[] }> {
    const searchParams = new URLSearchParams();
    if (categoryId && categoryId !== "all") searchParams.append("category_id", String(categoryId));
    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : "";
    return request<{ subCategories: ArticleSubCategory[] }>(`/api/articles/sub-categories${queryStr}`);
  },

  async createArticle(data: Partial<Article>): Promise<{ message: string; article: Article }> {
    return request("/api/articles", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateArticle(id: string | number, data: Partial<Article>): Promise<{ message: string; article: Article }> {
    return request(`/api/articles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteArticle(id: string | number): Promise<{ message: string }> {
    return request(`/api/articles/${id}`, {
      method: "DELETE",
    });
  },

  // Contacts
  async submitContact(data: { name: string; email: string; subject?: string; message: string }): Promise<{ message: string; id: string }> {
    return request("/api/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getContactMessages(): Promise<{ messages: ContactMessage[]; unreadCount: number }> {
    return request<{ messages: ContactMessage[]; unreadCount: number }>("/api/contacts");
  },

  async markContactRead(id: string, is_read: boolean): Promise<{ message: string }> {
    return request(`/api/contacts/${id}/read`, {
      method: "PUT",
      body: JSON.stringify({ is_read }),
    });
  },

  async deleteContactMessage(id: string): Promise<{ message: string }> {
    return request(`/api/contacts/${id}`, {
      method: "DELETE",
    });
  },
};
