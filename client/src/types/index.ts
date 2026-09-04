export interface Profile {
  id: string;
  full_name: string;
  tagline: string;
  bio: string;
  avatar_url: string;
  resume_url: string;
  resume_filename: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  youtube_url: string;
  instagram_url: string;
  location: string;
  available_for_work: boolean | number;
  created_at?: string;
  updated_at?: string;
}

export interface WorkExperience {
  id: string;
  company_name: string;
  company_url: string;
  company_logo: string;
  role_title: string;
  employment_type: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  order_index: number;
  description_points: string[];
  created_at?: string;
  updated_at?: string;
}

export interface OrgInvolvement {
  name: string;
  role?: string;
  link?: string;
  description?: string;
}

export interface ResearchExp {
  title: string;
  supervisor?: string;
  supervisor_link?: string;
  description?: string;
}

export interface KeyProjectItem {
  title: string;
  url?: string;
  description?: string;
}

export interface KeyProjectCategory {
  category: string;
  items: KeyProjectItem[];
}

export interface SkillGainedItem {
  title: string;
  items: string[];
}

export interface UniversityAchievement {
  id: string;
  institution_name: string;
  institution_logo: string;
  degree: string;
  period: string;
  order_index: number;
  organizational_involvement: OrgInvolvement[];
  research_experience: ResearchExp[];
  key_projects: KeyProjectCategory[];
  skills_gained: SkillGainedItem[];
  created_at?: string;
  updated_at?: string;
}

export interface TechSkill {
  id: string;
  category_id: string;
  name: string;
  icon_url: string;
  order_index: number;
}

export interface TechCategory {
  id: string;
  name: string;
  order_index: number;
  skills: TechSkill[];
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  credential_url: string;
  file_url: string;
  logo_url: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number | string;
  user_id?: string;
  category_id?: string;
  tag_id?: string;
  thumbnail?: string;
  thumbnail_url?: string;
  date?: string;
  title: string;
  slug: string;
  price?: string;
  short_desc?: string;
  description?: string;
  status_publish?: string;
  version?: string;
  link_demo?: string;
  link_github?: string;
  category_name?: string;
  category_desc?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ProjectCategory {
  id: number | string;
  category_name: string;
  category_desc?: string;
}

export interface ProjectTag {
  id: number | string;
  tag_name: string;
}

export interface Article {
  id: number | string;
  user_id?: string;
  category_id?: string;
  sub_category_id?: string;
  thumbnail?: string;
  thumbnail_url?: string;
  date?: string;
  title: string;
  slug: string;
  description?: string;
  fill_content?: string;
  status_publish?: string;
  category_name?: string;
  sub_category_name?: string;
  read_time_minutes?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleCategory {
  id: number | string;
  category_name: string;
}

export interface ArticleSubCategory {
  id: number | string;
  category_id: number | string;
  sub_category_name: string;
  description?: string;
  image?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean | number;
  created_at?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
}
