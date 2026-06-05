export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      checkins: {
        Row: {
          created_at: string | null
          event_stop_id: string | null
          id: string
          visitor_code: string | null
        }
        Insert: {
          created_at?: string | null
          event_stop_id?: string | null
          id?: string
          visitor_code?: string | null
        }
        Update: {
          created_at?: string | null
          event_stop_id?: string | null
          id?: string
          visitor_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checkins_event_stop_id_fkey"
            columns: ["event_stop_id"]
            isOneToOne: false
            referencedRelation: "event_stops"
            referencedColumns: ["id"]
          },
        ]
      }
      dispensaries: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          google_review_url: string | null
          id: string
          lat: number | null
          lng: number | null
          name: string
          state: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          google_review_url?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name: string
          state?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          google_review_url?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string
          state?: string | null
        }
        Relationships: []
      }
      event_stops: {
        Row: {
          created_at: string | null
          dispensary_id: string | null
          event_id: string | null
          id: string
          offer_description: string | null
          offer_title: string | null
          stop_order: number | null
        }
        Insert: {
          created_at?: string | null
          dispensary_id?: string | null
          event_id?: string | null
          id?: string
          offer_description?: string | null
          offer_title?: string | null
          stop_order?: number | null
        }
        Update: {
          created_at?: string | null
          dispensary_id?: string | null
          event_id?: string | null
          id?: string
          offer_description?: string | null
          offer_title?: string | null
          stop_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_stops_dispensary_id_fkey"
            columns: ["dispensary_id"]
            isOneToOne: false
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_stops_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          city: string | null
          created_at: string | null
          description: string | null
          ends_at: string | null
          id: string
          is_active: boolean | null
          map_center_lat: number | null
          map_center_lng: number | null
          map_zoom: number | null
          meta_description: string | null
          name: string
          slug: string
          starts_at: string | null
          theme: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          map_center_lat?: number | null
          map_center_lng?: number | null
          map_zoom?: number | null
          meta_description?: string | null
          name: string
          slug: string
          starts_at?: string | null
          theme?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          map_center_lat?: number | null
          map_center_lng?: number | null
          map_zoom?: number | null
          meta_description?: string | null
          name?: string
          slug?: string
          starts_at?: string | null
          theme?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      redemptions: {
        Row: {
          created_at: string | null
          event_stop_id: string | null
          id: string
          visitor_code: string | null
        }
        Insert: {
          created_at?: string | null
          event_stop_id?: string | null
          id?: string
          visitor_code?: string | null
        }
        Update: {
          created_at?: string | null
          event_stop_id?: string | null
          id?: string
          visitor_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "redemptions_event_stop_id_fkey"
            columns: ["event_stop_id"]
            isOneToOne: false
            referencedRelation: "event_stops"
            referencedColumns: ["id"]
          },
        ]
      }
      review_clicks: {
        Row: {
          created_at: string | null
          event_stop_id: string | null
          id: string
          visitor_code: string | null
        }
        Insert: {
          created_at?: string | null
          event_stop_id?: string | null
          id?: string
          visitor_code?: string | null
        }
        Update: {
          created_at?: string | null
          event_stop_id?: string | null
          id?: string
          visitor_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_clicks_event_stop_id_fkey"
            columns: ["event_stop_id"]
            isOneToOne: false
            referencedRelation: "event_stops"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
