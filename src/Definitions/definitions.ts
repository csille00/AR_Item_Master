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
      ar_can_select_for_styles: {
        Row: {
          color_id: number | null
          id: number
          mat_subcat: string | null
          style_id: string
        }
        Insert: {
          color_id?: number | null
          id?: number
          mat_subcat?: string | null
          style_id: string
        }
        Update: {
          color_id?: number | null
          id?: number
          mat_subcat?: string | null
          style_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ar_can_select_for_styles_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "ar_material_colors"
            referencedColumns: ["mat_color"]
          },
          {
            foreignKeyName: "ar_can_select_for_styles_mat_subcat_fkey"
            columns: ["mat_subcat"]
            isOneToOne: false
            referencedRelation: "ar_materials"
            referencedColumns: ["id_subcat"]
          },
          {
            foreignKeyName: "ar_can_select_for_styles_style_id_fkey"
            columns: ["style_id"]
            isOneToOne: false
            referencedRelation: "ar_styles"
            referencedColumns: ["style_id"]
          },
        ]
      }
      ar_jewelry_items: {
        Row: {
          adjustable: boolean | null
          age: string | null
          ar_style: string | null
          band_style: string | null
          band_width: number | null
          bundle: boolean | null
          chain_type: string | null
          charm_type: string | null
          configurator: boolean | null
          cost: number | null
          create_date: string | null
          earring_type: string | null
          engravable: boolean | null
          gender: string | null
          id: string | null
          length: string | null
          made_to_order: boolean | null
          mat_code: string | null
          mat_color: number | null
          metal_finish: string | null
          metal_texture: string | null
          metal_type: string | null
          msrp: number | null
          multi_finish: boolean | null
          multi_texture: boolean | null
          pendant_type: string | null
          primary_setting: string | null
          prod_code: string | null
          product_type: string | null
          repair_upgrade: string | null
          returnable: boolean | null
          serial_no: number
          setting_style: string | null
          shape: string | null
          sku_number: string
          status: string | null
          stone_carat_size: number | null
          stone_clarity: string | null
          stone_color: string | null
          stone_cut: string | null
          stone_height: number | null
          stone_orientation: string | null
          stone_origin: string | null
          stone_shape: string | null
          stone_type: string | null
          stone_width: number | null
          style_number: number | null
          title: string | null
          variant_id: string | null
          weight: number | null
        }
        Insert: {
          adjustable?: boolean | null
          age?: string | null
          ar_style?: string | null
          band_style?: string | null
          band_width?: number | null
          bundle?: boolean | null
          chain_type?: string | null
          charm_type?: string | null
          configurator?: boolean | null
          cost?: number | null
          create_date?: string | null
          earring_type?: string | null
          engravable?: boolean | null
          gender?: string | null
          id?: string | null
          length?: string | null
          made_to_order?: boolean | null
          mat_code?: string | null
          mat_color?: number | null
          metal_finish?: string | null
          metal_texture?: string | null
          metal_type?: string | null
          msrp?: number | null
          multi_finish?: boolean | null
          multi_texture?: boolean | null
          pendant_type?: string | null
          primary_setting?: string | null
          prod_code?: string | null
          product_type?: string | null
          repair_upgrade?: string | null
          returnable?: boolean | null
          serial_no?: number
          setting_style?: string | null
          shape?: string | null
          sku_number: string
          status?: string | null
          stone_carat_size?: number | null
          stone_clarity?: string | null
          stone_color?: string | null
          stone_cut?: string | null
          stone_height?: number | null
          stone_orientation?: string | null
          stone_origin?: string | null
          stone_shape?: string | null
          stone_type?: string | null
          stone_width?: number | null
          style_number?: number | null
          title?: string | null
          variant_id?: string | null
          weight?: number | null
        }
        Update: {
          adjustable?: boolean | null
          age?: string | null
          ar_style?: string | null
          band_style?: string | null
          band_width?: number | null
          bundle?: boolean | null
          chain_type?: string | null
          charm_type?: string | null
          configurator?: boolean | null
          cost?: number | null
          create_date?: string | null
          earring_type?: string | null
          engravable?: boolean | null
          gender?: string | null
          id?: string | null
          length?: string | null
          made_to_order?: boolean | null
          mat_code?: string | null
          mat_color?: number | null
          metal_finish?: string | null
          metal_texture?: string | null
          metal_type?: string | null
          msrp?: number | null
          multi_finish?: boolean | null
          multi_texture?: boolean | null
          pendant_type?: string | null
          primary_setting?: string | null
          prod_code?: string | null
          product_type?: string | null
          repair_upgrade?: string | null
          returnable?: boolean | null
          serial_no?: number
          setting_style?: string | null
          shape?: string | null
          sku_number?: string
          status?: string | null
          stone_carat_size?: number | null
          stone_clarity?: string | null
          stone_color?: string | null
          stone_cut?: string | null
          stone_height?: number | null
          stone_orientation?: string | null
          stone_origin?: string | null
          stone_shape?: string | null
          stone_type?: string | null
          stone_width?: number | null
          style_number?: number | null
          title?: string | null
          variant_id?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jewelry_items_mat_code_fkey"
            columns: ["mat_code"]
            isOneToOne: false
            referencedRelation: "ar_materials"
            referencedColumns: ["mat_code"]
          },
          {
            foreignKeyName: "jewelry_items_mat_color_fkey"
            columns: ["mat_color"]
            isOneToOne: false
            referencedRelation: "ar_material_colors"
            referencedColumns: ["mat_color"]
          },
          {
            foreignKeyName: "jewelry_items_prod_code_fkey"
            columns: ["prod_code"]
            isOneToOne: false
            referencedRelation: "ar_styles"
            referencedColumns: ["style_id"]
          },
        ]
      }
      ar_material_colors: {
        Row: {
          can_select_for: number | null
          color_name: string
          id: number
          mat_color: number
        }
        Insert: {
          can_select_for?: number | null
          color_name?: string
          id?: number
          mat_color: number
        }
        Update: {
          can_select_for?: number | null
          color_name?: string
          id?: number
          mat_color?: number
        }
        Relationships: []
      }
      ar_materials: {
        Row: {
          can_select_for: string | null
          id_subcat: string
          mat_code: string
          material: string | null
        }
        Insert: {
          can_select_for?: string | null
          id_subcat: string
          mat_code: string
          material?: string | null
        }
        Update: {
          can_select_for?: string | null
          id_subcat?: string
          mat_code?: string
          material?: string | null
        }
        Relationships: []
      }
      ar_stones: {
        Row: {
          carat_range: string | null
          carat_weight: number | null
          cat_status: string | null
          cert_clarity: string | null
          cert_color: string | null
          cert_cut: string | null
          cert_number: string | null
          cert_type: string | null
          color: string | null
          cost: number | null
          cut: string | null
          date: string | null
          dimensions: string | null
          mat_code: string | null
          mat_color: number | null
          msrp: number | null
          prod_code: string | null
          product_type: string | null
          refined_shape: string | null
          serial_no: number
          shape: string | null
          sku_number: string
          stone_number: string | null
          stone_sku: string | null
          stone_type: string | null
          style_number: number | null
        }
        Insert: {
          carat_range?: string | null
          carat_weight?: number | null
          cat_status?: string | null
          cert_clarity?: string | null
          cert_color?: string | null
          cert_cut?: string | null
          cert_number?: string | null
          cert_type?: string | null
          color?: string | null
          cost?: number | null
          cut?: string | null
          date?: string | null
          dimensions?: string | null
          mat_code?: string | null
          mat_color?: number | null
          msrp?: number | null
          prod_code?: string | null
          product_type?: string | null
          refined_shape?: string | null
          serial_no?: number
          shape?: string | null
          sku_number: string
          stone_number?: string | null
          stone_sku?: string | null
          stone_type?: string | null
          style_number?: number | null
        }
        Update: {
          carat_range?: string | null
          carat_weight?: number | null
          cat_status?: string | null
          cert_clarity?: string | null
          cert_color?: string | null
          cert_cut?: string | null
          cert_number?: string | null
          cert_type?: string | null
          color?: string | null
          cost?: number | null
          cut?: string | null
          date?: string | null
          dimensions?: string | null
          mat_code?: string | null
          mat_color?: number | null
          msrp?: number | null
          prod_code?: string | null
          product_type?: string | null
          refined_shape?: string | null
          serial_no?: number
          shape?: string | null
          sku_number?: string
          stone_number?: string | null
          stone_sku?: string | null
          stone_type?: string | null
          style_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stones_mat_code_fkey"
            columns: ["mat_code"]
            isOneToOne: false
            referencedRelation: "ar_materials"
            referencedColumns: ["mat_code"]
          },
          {
            foreignKeyName: "stones_mat_color_fkey"
            columns: ["mat_color"]
            isOneToOne: false
            referencedRelation: "ar_material_colors"
            referencedColumns: ["mat_color"]
          },
          {
            foreignKeyName: "stones_prod_code_fkey"
            columns: ["prod_code"]
            isOneToOne: false
            referencedRelation: "ar_styles"
            referencedColumns: ["style_id"]
          },
        ]
      }
      ar_styles: {
        Row: {
          style_id: string
          style_name: string
        }
        Insert: {
          style_id: string
          style_name: string
        }
        Update: {
          style_id?: string
          style_name?: string
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
