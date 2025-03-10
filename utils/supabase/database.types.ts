export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      hardware: {
        Row: {
          floor: number | null
          id: string
          location_fullname: string | null
          location_nickname: string
          map_id: string | null
          route_id: string | null
          service_id: string | null
          status: Database["public"]["Enums"]["status_enum"] | null
          x_axis: number | null
          y_axis: number | null
        }
        Insert: {
          floor?: number | null
          id?: string
          location_fullname?: string | null
          location_nickname: string
          map_id?: string | null
          route_id?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["status_enum"] | null
          x_axis?: number | null
          y_axis?: number | null
        }
        Update: {
          floor?: number | null
          id?: string
          location_fullname?: string | null
          location_nickname?: string
          map_id?: string | null
          route_id?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["status_enum"] | null
          x_axis?: number | null
          y_axis?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "hardware_map_id_fkey"
            columns: ["map_id"]
            isOneToOne: false
            referencedRelation: "maps"
            referencedColumns: ["id"]
          },
        ]
      }
      manager: {
        Row: {
          email: string
          id: string
          last_online: string | null
          name: string | null
          password: string
          role: Database["public"]["Enums"]["role"] | null
          tel: string | null
          username: string
        }
        Insert: {
          email: string
          id?: string
          last_online?: string | null
          name?: string | null
          password: string
          role?: Database["public"]["Enums"]["role"] | null
          tel?: string | null
          username: string
        }
        Update: {
          email?: string
          id?: string
          last_online?: string | null
          name?: string | null
          password?: string
          role?: Database["public"]["Enums"]["role"] | null
          tel?: string | null
          username?: string
        }
        Relationships: []
      }
      maps: {
        Row: {
          created_at: string
          id: string
          name: string | null
          path: string
          route: Json[] | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          path: string
          route?: Json[] | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          path?: string
          route?: Json[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      routes: {
        Row: {
          end_id: string | null
          floor: number | null
          id: number
          path: string | null
          start_id: string
        }
        Insert: {
          end_id?: string | null
          floor?: number | null
          id?: number
          path?: string | null
          start_id?: string
        }
        Update: {
          end_id?: string | null
          floor?: number | null
          id?: number
          path?: string | null
          start_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routes_end_id_fkey"
            columns: ["end_id"]
            isOneToOne: false
            referencedRelation: "hardware"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_start_id_fkey"
            columns: ["start_id"]
            isOneToOne: false
            referencedRelation: "hardware"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "admin" | "officer" | "user"
      status_enum: "active" | "inactive" | "pedding"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
