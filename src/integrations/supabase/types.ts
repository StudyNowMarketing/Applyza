export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      consultation_requests: {
        Row: {
          consultation_type: string
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          preferred_date: string | null
          service_interest: string
          status: string | null
        }
        Insert: {
          consultation_type: string
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          preferred_date?: string | null
          service_interest: string
          status?: string | null
        }
        Update: {
          consultation_type?: string
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          preferred_date?: string | null
          service_interest?: string
          status?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          user_type: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          user_type?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          application_deadline: string | null
          career_prospects: string | null
          city: string
          country: string
          created_at: string | null
          description: string | null
          duration: string | null
          english_requirements: string | null
          entry_requirements: string | null
          featured: boolean | null
          id: string
          intake_dates: string | null
          modules: string | null
          scholarship_available: boolean | null
          scholarship_details: string | null
          slug: string
          source_url: string | null
          status: string | null
          study_level: string
          subject_area: string
          title: string
          tuition_fee: number | null
          university_name: string
          updated_at: string | null
        }
        Insert: {
          application_deadline?: string | null
          career_prospects?: string | null
          city: string
          country: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          english_requirements?: string | null
          entry_requirements?: string | null
          featured?: boolean | null
          id?: string
          intake_dates?: string | null
          modules?: string | null
          scholarship_available?: boolean | null
          scholarship_details?: string | null
          slug: string
          source_url?: string | null
          status?: string | null
          study_level: string
          subject_area: string
          title: string
          tuition_fee?: number | null
          university_name: string
          updated_at?: string | null
        }
        Update: {
          application_deadline?: string | null
          career_prospects?: string | null
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          english_requirements?: string | null
          entry_requirements?: string | null
          featured?: boolean | null
          id?: string
          intake_dates?: string | null
          modules?: string | null
          scholarship_available?: boolean | null
          scholarship_details?: string | null
          slug?: string
          source_url?: string | null
          status?: string | null
          study_level?: string
          subject_area?: string
          title?: string
          tuition_fee?: number | null
          university_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      event_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          location: string | null
          registration_url: string | null
          slug: string
          status: string | null
          title: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          location?: string | null
          registration_url?: string | null
          slug: string
          status?: string | null
          title: string
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          registration_url?: string | null
          slug?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      institution_enquiries: {
        Row: {
          contact_name: string
          country: string | null
          created_at: string | null
          email: string
          id: string
          institution_name: string
          job_title: string | null
          message: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          contact_name: string
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          institution_name: string
          job_title?: string | null
          message?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          contact_name?: string
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          institution_name?: string
          job_title?: string | null
          message?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      partner_enquiries: {
        Row: {
          company_name: string | null
          country: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          status: string | null
          students_per_year: string | null
        }
        Insert: {
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string | null
          students_per_year?: string | null
        }
        Update: {
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string | null
          students_per_year?: string | null
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          amount: string | null
          country: string | null
          created_at: string | null
          deadline: string | null
          description: string | null
          eligibility: string | null
          id: string
          status: string | null
          study_level: string | null
          title: string
          university_name: string
        }
        Insert: {
          amount?: string | null
          country?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string
          status?: string | null
          study_level?: string | null
          title: string
          university_name: string
        }
        Update: {
          amount?: string | null
          country?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string
          status?: string | null
          study_level?: string | null
          title?: string
          university_name?: string
        }
        Relationships: []
      }
      study_destinations: {
        Row: {
          cost_city_1: string | null
          cost_city_2: string | null
          cost_city_3: string | null
          country: string
          created_at: string | null
          degree_duration: string | null
          id: string
          language: string | null
          overview: string | null
          partner_count: number | null
          post_study_visa: string | null
          slug: string
          status: string | null
          top_cities: string | null
          tuition_range: string | null
          visa_fee: string | null
          visa_requirements: string | null
          visa_work_rights: string | null
          why_study_here_1_desc: string | null
          why_study_here_1_title: string | null
          why_study_here_2_desc: string | null
          why_study_here_2_title: string | null
          why_study_here_3_desc: string | null
          why_study_here_3_title: string | null
          why_study_here_4_desc: string | null
          why_study_here_4_title: string | null
        }
        Insert: {
          cost_city_1?: string | null
          cost_city_2?: string | null
          cost_city_3?: string | null
          country: string
          created_at?: string | null
          degree_duration?: string | null
          id?: string
          language?: string | null
          overview?: string | null
          partner_count?: number | null
          post_study_visa?: string | null
          slug: string
          status?: string | null
          top_cities?: string | null
          tuition_range?: string | null
          visa_fee?: string | null
          visa_requirements?: string | null
          visa_work_rights?: string | null
          why_study_here_1_desc?: string | null
          why_study_here_1_title?: string | null
          why_study_here_2_desc?: string | null
          why_study_here_2_title?: string | null
          why_study_here_3_desc?: string | null
          why_study_here_3_title?: string | null
          why_study_here_4_desc?: string | null
          why_study_here_4_title?: string | null
        }
        Update: {
          cost_city_1?: string | null
          cost_city_2?: string | null
          cost_city_3?: string | null
          country?: string
          created_at?: string | null
          degree_duration?: string | null
          id?: string
          language?: string | null
          overview?: string | null
          partner_count?: number | null
          post_study_visa?: string | null
          slug?: string
          status?: string | null
          top_cities?: string | null
          tuition_range?: string | null
          visa_fee?: string | null
          visa_requirements?: string | null
          visa_work_rights?: string | null
          why_study_here_1_desc?: string | null
          why_study_here_1_title?: string | null
          why_study_here_2_desc?: string | null
          why_study_here_2_title?: string | null
          why_study_here_3_desc?: string | null
          why_study_here_3_title?: string | null
          why_study_here_4_desc?: string | null
          why_study_here_4_title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
