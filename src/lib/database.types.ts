export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          email: string | null
          age: string | null
          main_goal: string | null
          fitness_level: string | null
          number_of_kids: number | null
          pain_areas: string[] | null
          weight_kg: number | null
          waist_cm: number | null
          program_start_date: string | null
          onboarded_at: string | null
          consent_data_health: boolean
          consent_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
      daily_logs: {
        Row: {
          id: string
          user_id: string
          date: string
          steps: number | null
          energy_score: number | null
          weight_kg: number | null
          waist_cm: number | null
          slept_well: boolean | null
          joints: string | null
          water_l: number | null
          bedtime_ok: boolean | null
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['daily_logs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['daily_logs']['Insert']>
      }
      workout_sessions: {
        Row: {
          id: string
          user_id: string
          date: string
          type: string | null
          status: 'completed' | 'partial' | 'skipped'
          duration_min: number | null
          energy_after: number | null
          difficulty_felt: number | null
          pain_level: string | null
          exercises: Json | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['workout_sessions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['workout_sessions']['Insert']>
      }
      fitness_tests: {
        Row: {
          id: string
          user_id: string
          tested_at: string
          pushups: number | null
          squats: number | null
          plank_seconds: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['fitness_tests']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['fitness_tests']['Insert']>
      }
      weekly_checkins: {
        Row: {
          id: string
          user_id: string
          week_start: string
          score: number | null
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['weekly_checkins']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['weekly_checkins']['Insert']>
      }
      milestones: {
        Row: {
          id: string
          user_id: string
          milestone_key: string
          unlocked_at: string
        }
        Insert: Omit<Database['public']['Tables']['milestones']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['milestones']['Insert']>
      }
    }
  }
}
