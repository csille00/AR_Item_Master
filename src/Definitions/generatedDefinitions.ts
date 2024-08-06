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
      ar_jewelry_master: {
        Row: {
          adjustable: boolean | null
          age: string | null
          ar_style: number | null
          band_style: number | null
          band_width: number | null
          bundle: boolean | null
          chain_type: number | null
          charm_type: number | null
          configurator: boolean | null
          cost: unknown | null
          date: string | null
          earring_type: number | null
          engravable: boolean | null
          gender: string | null
          id: number | null
          length: number | null
          made_to_order: boolean | null
          material_type_id: number | null
          metal_finish: number | null
          metal_texture: number | null
          msrp: unknown | null
          multi_finish: boolean | null
          multi_texture: boolean | null
          pendant_type: number | null
          prod_code: string | null
          prod_name: string | null
          repair_upgrade: string | null
          returnable: boolean | null
          serial_number: number
          setting: number | null
          side_stones: number | null
          sku_number: string | null
          st_cert_clarity: number | null
          st_cert_color: number | null
          st_cert_cut: number | null
          st_cert_type: number | null
          st_color: number | null
          st_cost: unknown | null
          st_ctw: number | null
          st_ctw_range: string | null
          st_cut: number | null
          st_height: number | null
          st_orientation: number | null
          st_origin: number | null
          st_shape: number | null
          st_source: number | null
          st_table: string | null
          st_type: string | null
          st_width: number | null
          status: string | null
          style_number: number | null
          variant_id: number | null
          weight: number | null
        }
        Insert: {
          adjustable?: boolean | null
          age?: string | null
          ar_style?: number | null
          band_style?: number | null
          band_width?: number | null
          bundle?: boolean | null
          chain_type?: number | null
          charm_type?: number | null
          configurator?: boolean | null
          cost?: unknown | null
          date?: string | null
          earring_type?: number | null
          engravable?: boolean | null
          gender?: string | null
          id?: number | null
          length?: number | null
          made_to_order?: boolean | null
          material_type_id?: number | null
          metal_finish?: number | null
          metal_texture?: number | null
          msrp?: unknown | null
          multi_finish?: boolean | null
          multi_texture?: boolean | null
          pendant_type?: number | null
          prod_code?: string | null
          prod_name?: string | null
          repair_upgrade?: string | null
          returnable?: boolean | null
          serial_number?: number
          setting?: number | null
          side_stones?: number | null
          sku_number?: string | null
          st_cert_clarity?: number | null
          st_cert_color?: number | null
          st_cert_cut?: number | null
          st_cert_type?: number | null
          st_color?: number | null
          st_cost?: unknown | null
          st_ctw?: number | null
          st_ctw_range?: string | null
          st_cut?: number | null
          st_height?: number | null
          st_orientation?: number | null
          st_origin?: number | null
          st_shape?: number | null
          st_source?: number | null
          st_table?: string | null
          st_type?: string | null
          st_width?: number | null
          status?: string | null
          style_number?: number | null
          variant_id?: number | null
          weight?: number | null
        }
        Update: {
          adjustable?: boolean | null
          age?: string | null
          ar_style?: number | null
          band_style?: number | null
          band_width?: number | null
          bundle?: boolean | null
          chain_type?: number | null
          charm_type?: number | null
          configurator?: boolean | null
          cost?: unknown | null
          date?: string | null
          earring_type?: number | null
          engravable?: boolean | null
          gender?: string | null
          id?: number | null
          length?: number | null
          made_to_order?: boolean | null
          material_type_id?: number | null
          metal_finish?: number | null
          metal_texture?: number | null
          msrp?: unknown | null
          multi_finish?: boolean | null
          multi_texture?: boolean | null
          pendant_type?: number | null
          prod_code?: string | null
          prod_name?: string | null
          repair_upgrade?: string | null
          returnable?: boolean | null
          serial_number?: number
          setting?: number | null
          side_stones?: number | null
          sku_number?: string | null
          st_cert_clarity?: number | null
          st_cert_color?: number | null
          st_cert_cut?: number | null
          st_cert_type?: number | null
          st_color?: number | null
          st_cost?: unknown | null
          st_ctw?: number | null
          st_ctw_range?: string | null
          st_cut?: number | null
          st_height?: number | null
          st_orientation?: number | null
          st_origin?: number | null
          st_shape?: number | null
          st_source?: number | null
          st_table?: string | null
          st_type?: string | null
          st_width?: number | null
          status?: string | null
          style_number?: number | null
          variant_id?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ar_jewelry_master_ar_style_fkey"
            columns: ["ar_style"]
            isOneToOne: false
            referencedRelation: "ar_style"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_band_style_fkey"
            columns: ["band_style"]
            isOneToOne: false
            referencedRelation: "band_style"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_band_width_fkey"
            columns: ["band_width"]
            isOneToOne: false
            referencedRelation: "band_width"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_chain_type_fkey"
            columns: ["chain_type"]
            isOneToOne: false
            referencedRelation: "chain_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_charm_type_fkey"
            columns: ["charm_type"]
            isOneToOne: false
            referencedRelation: "charm_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_earring_type_fkey"
            columns: ["earring_type"]
            isOneToOne: false
            referencedRelation: "earring_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_length_fkey"
            columns: ["length"]
            isOneToOne: false
            referencedRelation: "length"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_material_type_id_fkey"
            columns: ["material_type_id"]
            isOneToOne: false
            referencedRelation: "material_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_metal_finish_fkey"
            columns: ["metal_finish"]
            isOneToOne: false
            referencedRelation: "metal_finish"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_metal_texture_fkey"
            columns: ["metal_texture"]
            isOneToOne: false
            referencedRelation: "metal_texture"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_pendant_type_fkey"
            columns: ["pendant_type"]
            isOneToOne: false
            referencedRelation: "pendant_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_prod_code_fkey"
            columns: ["prod_code"]
            isOneToOne: false
            referencedRelation: "product_type"
            referencedColumns: ["prod_code"]
          },
          {
            foreignKeyName: "ar_jewelry_master_setting_fkey"
            columns: ["setting"]
            isOneToOne: false
            referencedRelation: "jewelry_setting"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_side_stones_fkey"
            columns: ["side_stones"]
            isOneToOne: false
            referencedRelation: "side_stones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_cert_clarity_fkey"
            columns: ["st_cert_clarity"]
            isOneToOne: false
            referencedRelation: "st_clarity_grade"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_cert_color_fkey"
            columns: ["st_cert_color"]
            isOneToOne: false
            referencedRelation: "st_color_grade"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_cert_cut_fkey"
            columns: ["st_cert_cut"]
            isOneToOne: false
            referencedRelation: "st_cert_cut"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_cert_type_fkey"
            columns: ["st_cert_type"]
            isOneToOne: false
            referencedRelation: "st_cert_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_color_fkey"
            columns: ["st_color"]
            isOneToOne: false
            referencedRelation: "stone_color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_cut_fkey"
            columns: ["st_cut"]
            isOneToOne: false
            referencedRelation: "stone_cut"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_orientation_fkey"
            columns: ["st_orientation"]
            isOneToOne: false
            referencedRelation: "stone_orientation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_origin_fkey"
            columns: ["st_origin"]
            isOneToOne: false
            referencedRelation: "stone_origin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_shape_fkey"
            columns: ["st_shape"]
            isOneToOne: false
            referencedRelation: "stone_shape"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_source_fkey"
            columns: ["st_source"]
            isOneToOne: false
            referencedRelation: "st_source"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_jewelry_master_st_type_fkey"
            columns: ["st_type"]
            isOneToOne: false
            referencedRelation: "stone_type"
            referencedColumns: ["stone_type"]
          },
        ]
      }
      ar_stone_master: {
        Row: {
          cat_status: boolean | null
          cost: unknown | null
          date: string | null
          date_quantity_added: string | null
          material_type_id: number | null
          memo: string | null
          msrp: unknown | null
          prod_code: string | null
          prod_name: string | null
          quantity: number | null
          refined_status: string | null
          serial_number: number
          sku_number: string | null
          st_cert_clarity: number | null
          st_cert_color: number | null
          st_cert_cut: number | null
          st_cert_num: string | null
          st_cert_type: number | null
          st_color: number | null
          st_cost: unknown | null
          st_ctw: number | null
          st_ctw_range: string | null
          st_cut: number | null
          st_height: number | null
          st_orientation: number | null
          st_origin: number | null
          st_shape: number | null
          st_source: number | null
          st_table: string | null
          st_type: string | null
          st_width: number | null
          stone_number: string | null
          stone_sku: string | null
          style_number: string | null
        }
        Insert: {
          cat_status?: boolean | null
          cost?: unknown | null
          date?: string | null
          date_quantity_added?: string | null
          material_type_id?: number | null
          memo?: string | null
          msrp?: unknown | null
          prod_code?: string | null
          prod_name?: string | null
          quantity?: number | null
          refined_status?: string | null
          serial_number?: number
          sku_number?: string | null
          st_cert_clarity?: number | null
          st_cert_color?: number | null
          st_cert_cut?: number | null
          st_cert_num?: string | null
          st_cert_type?: number | null
          st_color?: number | null
          st_cost?: unknown | null
          st_ctw?: number | null
          st_ctw_range?: string | null
          st_cut?: number | null
          st_height?: number | null
          st_orientation?: number | null
          st_origin?: number | null
          st_shape?: number | null
          st_source?: number | null
          st_table?: string | null
          st_type?: string | null
          st_width?: number | null
          stone_number?: string | null
          stone_sku?: string | null
          style_number?: string | null
        }
        Update: {
          cat_status?: boolean | null
          cost?: unknown | null
          date?: string | null
          date_quantity_added?: string | null
          material_type_id?: number | null
          memo?: string | null
          msrp?: unknown | null
          prod_code?: string | null
          prod_name?: string | null
          quantity?: number | null
          refined_status?: string | null
          serial_number?: number
          sku_number?: string | null
          st_cert_clarity?: number | null
          st_cert_color?: number | null
          st_cert_cut?: number | null
          st_cert_num?: string | null
          st_cert_type?: number | null
          st_color?: number | null
          st_cost?: unknown | null
          st_ctw?: number | null
          st_ctw_range?: string | null
          st_cut?: number | null
          st_height?: number | null
          st_orientation?: number | null
          st_origin?: number | null
          st_shape?: number | null
          st_source?: number | null
          st_table?: string | null
          st_type?: string | null
          st_width?: number | null
          stone_number?: string | null
          stone_sku?: string | null
          style_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ar_stone_master_material_type_id_fkey"
            columns: ["material_type_id"]
            isOneToOne: false
            referencedRelation: "material_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_prod_code_fkey"
            columns: ["prod_code"]
            isOneToOne: false
            referencedRelation: "stone_product_type"
            referencedColumns: ["prod_code"]
          },
          {
            foreignKeyName: "ar_stone_master_st_cert_clarity_fkey"
            columns: ["st_cert_clarity"]
            isOneToOne: false
            referencedRelation: "st_clarity_grade"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_cert_color_fkey"
            columns: ["st_cert_color"]
            isOneToOne: false
            referencedRelation: "st_color_grade"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_cert_cut_fkey"
            columns: ["st_cert_cut"]
            isOneToOne: false
            referencedRelation: "st_cert_cut"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_cert_type_fkey"
            columns: ["st_cert_type"]
            isOneToOne: false
            referencedRelation: "st_cert_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_color_fkey"
            columns: ["st_color"]
            isOneToOne: false
            referencedRelation: "stone_color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_cut_fkey"
            columns: ["st_cut"]
            isOneToOne: false
            referencedRelation: "stone_cut"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_orientation_fkey"
            columns: ["st_orientation"]
            isOneToOne: false
            referencedRelation: "stone_orientation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_origin_fkey"
            columns: ["st_origin"]
            isOneToOne: false
            referencedRelation: "stone_origin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_shape_fkey"
            columns: ["st_shape"]
            isOneToOne: false
            referencedRelation: "stone_shape"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_source_fkey"
            columns: ["st_source"]
            isOneToOne: false
            referencedRelation: "st_source"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ar_stone_master_st_type_fkey"
            columns: ["st_type"]
            isOneToOne: false
            referencedRelation: "stone_type"
            referencedColumns: ["stone_type"]
          },
        ]
      }
      ar_style: {
        Row: {
          id: number
          style: string
        }
        Insert: {
          id?: number
          style: string
        }
        Update: {
          id?: number
          style?: string
        }
        Relationships: []
      }
      band_style: {
        Row: {
          id: number
          style: string
        }
        Insert: {
          id?: number
          style: string
        }
        Update: {
          id?: number
          style?: string
        }
        Relationships: []
      }
      band_width: {
        Row: {
          id: number
          width: number
        }
        Insert: {
          id?: number
          width: number
        }
        Update: {
          id?: number
          width?: number
        }
        Relationships: []
      }
      chain_type: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      charm_type: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      ctw_range: {
        Row: {
          ctw: number
          id: number
          range: unknown
        }
        Insert: {
          ctw: number
          id?: number
          range: unknown
        }
        Update: {
          ctw?: number
          id?: number
          range?: unknown
        }
        Relationships: []
      }
      earring_type: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      jewelry_setting: {
        Row: {
          id: number
          setting: string
        }
        Insert: {
          id?: number
          setting: string
        }
        Update: {
          id?: number
          setting?: string
        }
        Relationships: []
      }
      length: {
        Row: {
          id: number
          length: unknown | null
        }
        Insert: {
          id?: number
          length?: unknown | null
        }
        Update: {
          id?: number
          length?: unknown | null
        }
        Relationships: []
      }
      material_type: {
        Row: {
          id: number
          mat_code: string
          mat_color: number
          metal_type: string
        }
        Insert: {
          id?: number
          mat_code: string
          mat_color: number
          metal_type: string
        }
        Update: {
          id?: number
          mat_code?: string
          mat_color?: number
          metal_type?: string
        }
        Relationships: []
      }
      metal_finish: {
        Row: {
          finish: string
          id: number
        }
        Insert: {
          finish: string
          id?: number
        }
        Update: {
          finish?: string
          id?: number
        }
        Relationships: []
      }
      metal_texture: {
        Row: {
          id: number
          texture: string
        }
        Insert: {
          id?: number
          texture: string
        }
        Update: {
          id?: number
          texture?: string
        }
        Relationships: []
      }
      pendant_type: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      product_type: {
        Row: {
          code: string
          prod_code: string
          product_type: string
        }
        Insert: {
          code: string
          prod_code: string
          product_type: string
        }
        Update: {
          code?: string
          prod_code?: string
          product_type?: string
        }
        Relationships: []
      }
      side_stones: {
        Row: {
          id: number
          stone: string
        }
        Insert: {
          id?: number
          stone: string
        }
        Update: {
          id?: number
          stone?: string
        }
        Relationships: []
      }
      st_cert_cut: {
        Row: {
          cut: string
          id: number
        }
        Insert: {
          cut: string
          id?: number
        }
        Update: {
          cut?: string
          id?: number
        }
        Relationships: []
      }
      st_cert_type: {
        Row: {
          cert_type: string
          id: number
        }
        Insert: {
          cert_type: string
          id?: number
        }
        Update: {
          cert_type?: string
          id?: number
        }
        Relationships: []
      }
      st_clarity_grade: {
        Row: {
          grade: string
          id: number
        }
        Insert: {
          grade: string
          id?: number
        }
        Update: {
          grade?: string
          id?: number
        }
        Relationships: []
      }
      st_color_grade: {
        Row: {
          grade: string
          id: number
        }
        Insert: {
          grade: string
          id?: number
        }
        Update: {
          grade?: string
          id?: number
        }
        Relationships: []
      }
      st_price_range: {
        Row: {
          id: number
          price: unknown
          range: unknown
        }
        Insert: {
          id?: number
          price: unknown
          range: unknown
        }
        Update: {
          id?: number
          price?: unknown
          range?: unknown
        }
        Relationships: []
      }
      st_source: {
        Row: {
          id: number
          source: string
        }
        Insert: {
          id?: number
          source: string
        }
        Update: {
          id?: number
          source?: string
        }
        Relationships: []
      }
      stone_color: {
        Row: {
          color: string
          id: number
        }
        Insert: {
          color: string
          id?: number
        }
        Update: {
          color?: string
          id?: number
        }
        Relationships: []
      }
      stone_cut: {
        Row: {
          cut: string
          id: number
          st_table: string
        }
        Insert: {
          cut: string
          id?: number
          st_table: string
        }
        Update: {
          cut?: string
          id?: number
          st_table?: string
        }
        Relationships: []
      }
      stone_orientation: {
        Row: {
          id: number
          orientation: string
        }
        Insert: {
          id?: number
          orientation: string
        }
        Update: {
          id?: number
          orientation?: string
        }
        Relationships: []
      }
      stone_origin: {
        Row: {
          id: number
          origin: string
        }
        Insert: {
          id?: number
          origin: string
        }
        Update: {
          id?: number
          origin?: string
        }
        Relationships: []
      }
      stone_product_type: {
        Row: {
          prod_code: string
          type: string
        }
        Insert: {
          prod_code: string
          type: string
        }
        Update: {
          prod_code?: string
          type?: string
        }
        Relationships: []
      }
      stone_shape: {
        Row: {
          id: number
          shape: string
        }
        Insert: {
          id?: number
          shape: string
        }
        Update: {
          id?: number
          shape?: string
        }
        Relationships: []
      }
      stone_type: {
        Row: {
          mat_code: string | null
          mat_color: string | null
          mat_color_name: string | null
          price_10_to_20: number | null
          price_100_to_125: number | null
          price_1000_to_1200: number | null
          price_1200_to_1400: number | null
          price_125_to_150: number | null
          price_1400_to_1600: number | null
          price_150_to_175: number | null
          price_1600_to_1800: number | null
          price_175_to_200: number | null
          price_1800_to_2000: number | null
          price_20_to_30: number | null
          price_200_to_225: number | null
          price_2000_to_2400: number | null
          price_225_to_250: number | null
          price_2400_to_2800: number | null
          price_250_to_300: number | null
          price_2800_to_3200: number | null
          price_30_to_40: number | null
          price_300_to_350: number | null
          price_3200_to_3600: number | null
          price_350_to_400: number | null
          price_3600_to_4000: number | null
          price_40_to_50: number | null
          price_400_to_450: number | null
          price_4000_to_4500: number | null
          price_450_to_500: number | null
          price_4500_to_5000: number | null
          price_5_to_10: number | null
          price_50_to_75: number | null
          price_500_to_600: number | null
          price_5000_to_5500: number | null
          price_600_to_700: number | null
          price_700_to_800: number | null
          price_75_to_100: number | null
          price_800_to_900: number | null
          price_900_to_1000: number | null
          price_gt_5500: number | null
          price_lt_5: number | null
          stone_type: string
        }
        Insert: {
          mat_code?: string | null
          mat_color?: string | null
          mat_color_name?: string | null
          price_10_to_20?: number | null
          price_100_to_125?: number | null
          price_1000_to_1200?: number | null
          price_1200_to_1400?: number | null
          price_125_to_150?: number | null
          price_1400_to_1600?: number | null
          price_150_to_175?: number | null
          price_1600_to_1800?: number | null
          price_175_to_200?: number | null
          price_1800_to_2000?: number | null
          price_20_to_30?: number | null
          price_200_to_225?: number | null
          price_2000_to_2400?: number | null
          price_225_to_250?: number | null
          price_2400_to_2800?: number | null
          price_250_to_300?: number | null
          price_2800_to_3200?: number | null
          price_30_to_40?: number | null
          price_300_to_350?: number | null
          price_3200_to_3600?: number | null
          price_350_to_400?: number | null
          price_3600_to_4000?: number | null
          price_40_to_50?: number | null
          price_400_to_450?: number | null
          price_4000_to_4500?: number | null
          price_450_to_500?: number | null
          price_4500_to_5000?: number | null
          price_5_to_10?: number | null
          price_50_to_75?: number | null
          price_500_to_600?: number | null
          price_5000_to_5500?: number | null
          price_600_to_700?: number | null
          price_700_to_800?: number | null
          price_75_to_100?: number | null
          price_800_to_900?: number | null
          price_900_to_1000?: number | null
          price_gt_5500?: number | null
          price_lt_5?: number | null
          stone_type: string
        }
        Update: {
          mat_code?: string | null
          mat_color?: string | null
          mat_color_name?: string | null
          price_10_to_20?: number | null
          price_100_to_125?: number | null
          price_1000_to_1200?: number | null
          price_1200_to_1400?: number | null
          price_125_to_150?: number | null
          price_1400_to_1600?: number | null
          price_150_to_175?: number | null
          price_1600_to_1800?: number | null
          price_175_to_200?: number | null
          price_1800_to_2000?: number | null
          price_20_to_30?: number | null
          price_200_to_225?: number | null
          price_2000_to_2400?: number | null
          price_225_to_250?: number | null
          price_2400_to_2800?: number | null
          price_250_to_300?: number | null
          price_2800_to_3200?: number | null
          price_30_to_40?: number | null
          price_300_to_350?: number | null
          price_3200_to_3600?: number | null
          price_350_to_400?: number | null
          price_3600_to_4000?: number | null
          price_40_to_50?: number | null
          price_400_to_450?: number | null
          price_4000_to_4500?: number | null
          price_450_to_500?: number | null
          price_4500_to_5000?: number | null
          price_5_to_10?: number | null
          price_50_to_75?: number | null
          price_500_to_600?: number | null
          price_5000_to_5500?: number | null
          price_600_to_700?: number | null
          price_700_to_800?: number | null
          price_75_to_100?: number | null
          price_800_to_900?: number | null
          price_900_to_1000?: number | null
          price_gt_5500?: number | null
          price_lt_5?: number | null
          stone_type?: string
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
