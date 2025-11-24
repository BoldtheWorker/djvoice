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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          attendance: number | null
          budget_range: string | null
          client_email: string
          client_name: string
          client_phone: string | null
          created_at: string | null
          event_date: string
          event_time: string | null
          event_type: string
          id: string
          location: string
          message: string | null
          status: string | null
        }
        Insert: {
          attendance?: number | null
          budget_range?: string | null
          client_email: string
          client_name: string
          client_phone?: string | null
          created_at?: string | null
          event_date: string
          event_time?: string | null
          event_type: string
          id?: string
          location: string
          message?: string | null
          status?: string | null
        }
        Update: {
          attendance?: number | null
          budget_range?: string | null
          client_email?: string
          client_name?: string
          client_phone?: string | null
          created_at?: string | null
          event_date?: string
          event_time?: string | null
          event_type?: string
          id?: string
          location?: string
          message?: string | null
          status?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          event_date: string
          event_link: string | null
          event_time: string | null
          id: string
          image_url: string | null
          title: string
          venue: string
        }
        Insert: {
          created_at?: string | null
          event_date: string
          event_link?: string | null
          event_time?: string | null
          id?: string
          image_url?: string | null
          title: string
          venue: string
        }
        Update: {
          created_at?: string | null
          event_date?: string
          event_link?: string | null
          event_time?: string | null
          id?: string
          image_url?: string | null
          title?: string
          venue?: string
        }
        Relationships: []
      }
      listen_events: {
        Row: {
          created_at: string | null
          event_type: string | null
          geo_city: string | null
          geo_country: string | null
          id: string
          mixtape_id: string | null
          position: number | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          event_type?: string | null
          geo_city?: string | null
          geo_country?: string | null
          id?: string
          mixtape_id?: string | null
          position?: number | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string | null
          geo_city?: string | null
          geo_country?: string | null
          id?: string
          mixtape_id?: string | null
          position?: number | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listen_events_mixtape_id_fkey"
            columns: ["mixtape_id"]
            isOneToOne: false
            referencedRelation: "mixtapes"
            referencedColumns: ["id"]
          },
        ]
      }
      listening_progress: {
        Row: {
          id: string
          mixtape_id: string | null
          position: number
          session_id: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          mixtape_id?: string | null
          position: number
          session_id: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          mixtape_id?: string | null
          position?: number
          session_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listening_progress_mixtape_id_fkey"
            columns: ["mixtape_id"]
            isOneToOne: false
            referencedRelation: "mixtapes"
            referencedColumns: ["id"]
          },
        ]
      }
      media_library: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          height: number | null
          id: string
          mime_type: string | null
          title: string
          updated_at: string | null
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          category: string
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          height?: number | null
          id?: string
          mime_type?: string | null
          title: string
          updated_at?: string | null
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          height?: number | null
          id?: string
          mime_type?: string | null
          title?: string
          updated_at?: string | null
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: []
      }
      mixtapes: {
        Row: {
          audio_url: string | null
          cover_url: string | null
          created_at: string | null
          download_count: number | null
          duration: number | null
          featured: boolean | null
          genre: string | null
          id: string
          play_count: number | null
          release_date: string | null
          slug: string
          title: string
          tracklist: Json | null
          vibe: string | null
        }
        Insert: {
          audio_url?: string | null
          cover_url?: string | null
          created_at?: string | null
          download_count?: number | null
          duration?: number | null
          featured?: boolean | null
          genre?: string | null
          id?: string
          play_count?: number | null
          release_date?: string | null
          slug: string
          title: string
          tracklist?: Json | null
          vibe?: string | null
        }
        Update: {
          audio_url?: string | null
          cover_url?: string | null
          created_at?: string | null
          download_count?: number | null
          duration?: number | null
          featured?: boolean | null
          genre?: string | null
          id?: string
          play_count?: number | null
          release_date?: string | null
          slug?: string
          title?: string
          tracklist?: Json | null
          vibe?: string | null
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          created_at: string | null
          event_date: string | null
          event_name: string | null
          id: string
          media_url: string
          thumbnail_url: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          event_date?: string | null
          event_name?: string | null
          id?: string
          media_url: string
          thumbnail_url?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          event_date?: string | null
          event_name?: string | null
          id?: string
          media_url?: string
          thumbnail_url?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          converted_to_booking: boolean | null
          created_at: string | null
          date_type: string | null
          distance_km: number | null
          duration_hours: number | null
          equipment_included: boolean | null
          estimated_max: number | null
          estimated_min: number | null
          event_type: string | null
          id: string
        }
        Insert: {
          converted_to_booking?: boolean | null
          created_at?: string | null
          date_type?: string | null
          distance_km?: number | null
          duration_hours?: number | null
          equipment_included?: boolean | null
          estimated_max?: number | null
          estimated_min?: number | null
          event_type?: string | null
          id?: string
        }
        Update: {
          converted_to_booking?: boolean | null
          created_at?: string | null
          date_type?: string | null
          distance_km?: number | null
          duration_hours?: number | null
          equipment_included?: boolean | null
          estimated_max?: number | null
          estimated_min?: number | null
          event_type?: string | null
          id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          id: string
          preferences: Json | null
          source: string | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          preferences?: Json | null
          source?: string | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          preferences?: Json | null
          source?: string | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
