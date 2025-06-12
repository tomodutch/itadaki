/* eslint-disable */
export interface OpenFoodFactsApiResponse {
    code: string;
    product: Product;
    status: number;
    status_verbose: string;
}

export interface Product {
    _id: string;
    _keywords: string[];
    added_countries_tags: any[];
    additives_n: number;
    additives_original_tags: string[];
    additives_tags: string[];
    allergens: string;
    allergens_from_ingredients: string;
    allergens_from_user: string;
    allergens_hierarchy: any[];
    allergens_lc: string;
    allergens_tags: any[];
    amino_acids_prev_tags: any[];
    amino_acids_tags: any[];
    brands: string;
    brands_tags: string[];
    carbon_footprint_from_known_ingredients_debug?: string;
    carbon_footprint_percent_of_known_ingredients?: number;
    categories: string;
    categories_hierarchy: string[];
    categories_lc: string;
    categories_old: string;
    categories_properties: CategoriesProperties;
    categories_properties_tags: string[];
    categories_tags: string[];
    category_properties: CategoryProperties;
    checkers?: any[];
    checkers_tags: any[];
    ciqual_food_name_tags: string[];
    cities_tags: any[];
    code: string;
    codes_tags: string[];
    compared_to_category: string;
    complete: number;
    completeness: number;
    correctors?: string[];
    correctors_tags: string[];
    countries: string;
    countries_hierarchy: string[];
    countries_lc: string;
    countries_tags: string[];
    created_t: number;
    creator: string;
    data_quality_bugs_tags: any[];
    data_quality_errors_tags: any[];
    data_quality_info_tags: string[];
    data_quality_tags: string[];
    data_quality_warnings_tags: string[];
    data_sources: string;
    data_sources_tags: string[];
    debug_param_sorted_langs: string[];
    ecoscore_data: EcoscoreData;
    ecoscore_grade: string;
    ecoscore_score?: number;
    ecoscore_tags: string[];
    editors?: string[];
    editors_tags: string[];
    emb_codes: string;
    emb_codes_20141016: string;
    emb_codes_orig: string;
    emb_codes_tags: any[];
    entry_dates_tags: string[];
    expiration_date: string;
    food_groups: string;
    food_groups_tags: string[];
    "fruits-vegetables-nuts_100g_estimate": number;
    generic_name: string;
    generic_name_cs?: string;
    generic_name_de: string;
    generic_name_en: string;
    generic_name_es?: string;
    generic_name_fi?: string;
    generic_name_fr: string;
    generic_name_pt?: string;
    generic_name_ru?: string;
    generic_name_sv?: string;
    id: string;
    image_front_small_url: string;
    image_front_thumb_url: string;
    image_front_url: string;
    image_ingredients_small_url: string;
    image_ingredients_thumb_url: string;
    image_ingredients_url: string;
    image_nutrition_small_url: string;
    image_nutrition_thumb_url: string;
    image_nutrition_url: string;
    image_packaging_small_url: string;
    image_packaging_thumb_url: string;
    image_packaging_url: string;
    image_small_url: string;
    image_thumb_url: string;
    image_url: string;
    images: Images;
    informers?: string[];
    informers_tags: string[];
    ingredients: ProductIngredient[];
    ingredients_analysis: IngredientsAnalysis;
    ingredients_analysis_tags: string[];
    ingredients_debug: Array<null | string>;
    ingredients_from_or_that_may_be_from_palm_oil_n: number;
    ingredients_from_palm_oil_n: number;
    ingredients_from_palm_oil_tags: any[];
    ingredients_hierarchy: string[];
    ingredients_ids_debug: string[];
    ingredients_lc: string;
    ingredients_n: number;
    ingredients_n_tags: string[];
    ingredients_non_nutritive_sweeteners_n: number;
    ingredients_original_tags: string[];
    ingredients_percent_analysis: number;
    ingredients_sweeteners_n: number;
    ingredients_tags: string[];
    ingredients_text: string;
    ingredients_text_cs?: string;
    ingredients_text_de: string;
    ingredients_text_debug: string;
    ingredients_text_en: string;
    ingredients_text_es?: string;
    ingredients_text_fi?: string;
    ingredients_text_fr: string;
    ingredients_text_pt?: string;
    ingredients_text_ru?: string;
    ingredients_text_sv?: string;
    ingredients_text_with_allergens: string;
    ingredients_text_with_allergens_de: string;
    ingredients_text_with_allergens_en: string;
    ingredients_text_with_allergens_es?: string;
    ingredients_text_with_allergens_fi?: string;
    ingredients_text_with_allergens_fr?: string;
    ingredients_text_with_allergens_pt?: string;
    ingredients_text_with_allergens_ru?: string;
    ingredients_text_with_allergens_sv?: string;
    ingredients_that_may_be_from_palm_oil_n: number;
    ingredients_that_may_be_from_palm_oil_tags: any[];
    ingredients_with_specified_percent_n: number;
    ingredients_with_specified_percent_sum: number;
    ingredients_with_unspecified_percent_n: number;
    ingredients_with_unspecified_percent_sum: number;
    ingredients_without_ciqual_codes: string[];
    ingredients_without_ciqual_codes_n: number;
    ingredients_without_ecobalyse_ids: string[];
    ingredients_without_ecobalyse_ids_n: number;
    interface_version_modified: string;
    known_ingredients_n: number;
    labels: string;
    labels_hierarchy: string[];
    labels_lc: string;
    labels_old: string;
    labels_tags: string[];
    lang: string;
    languages: { [key: string]: number };
    languages_codes: LanguagesCodes;
    languages_hierarchy: string[];
    languages_tags: string[];
    last_edit_dates_tags: string[];
    last_editor: string;
    last_image_dates_tags: string[];
    last_image_t: number;
    last_modified_by: string;
    last_modified_t: number;
    last_updated_t: number;
    lc: string;
    link: string;
    main_countries_tags: any[];
    manufacturing_places: string;
    manufacturing_places_tags: string[];
    max_imgid: string;
    minerals_prev_tags: any[];
    minerals_tags: any[];
    misc_tags: string[];
    no_nutrition_data: string;
    nova_group: number;
    nova_group_debug: string;
    nova_groups: string;
    nova_groups_markers: { [key: string]: Array<string[]> };
    nova_groups_tags: string[];
    nucleotides_prev_tags: any[];
    nucleotides_tags: any[];
    nutrient_levels: NutrientLevels;
    nutrient_levels_tags: string[];
    nutriments: Nutriments;
    nutriscore: { [key: string]: Nutriscore };
    nutriscore_2021_tags: string[];
    nutriscore_2023_tags: string[];
    nutriscore_data: NutriscoreData;
    nutriscore_grade: string;
    nutriscore_score: number;
    nutriscore_score_opposite: number;
    nutriscore_tags: string[];
    nutriscore_version: string;
    nutrition_data: string;
    nutrition_data_per: string;
    nutrition_data_prepared: string;
    nutrition_data_prepared_per: string;
    nutrition_grade_fr: string;
    nutrition_grades: string;
    nutrition_grades_tags: string[];
    nutrition_score_beverage: number;
    nutrition_score_debug: string;
    nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients: number;
    nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients_value: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value: number;
    obsolete?: string;
    obsolete_since_date?: string;
    origin: string;
    origin_cs?: string;
    origin_de: string;
    origin_en: string;
    origin_es?: string;
    origin_fi?: string;
    origin_fr?: string;
    origin_pt?: string;
    origin_ru?: string;
    origin_sv?: string;
    origins: string;
    origins_hierarchy: string[];
    origins_lc: string;
    origins_old: string;
    origins_tags: string[];
    other_nutritional_substances_tags: any[];
    packaging: string;
    packaging_hierarchy: string[];
    packaging_lc: string;
    packaging_materials_tags: string[];
    packaging_old: string;
    packaging_old_before_taxonomization: string;
    packaging_recycling_tags: any[];
    packaging_shapes_tags: string[];
    packaging_tags: string[];
    packaging_text: string;
    packaging_text_cs?: string;
    packaging_text_de: string;
    packaging_text_en: string;
    packaging_text_es?: string;
    packaging_text_fi?: string;
    packaging_text_fr?: string;
    packaging_text_pt?: string;
    packaging_text_ru?: string;
    packaging_text_sv?: string;
    packagings: ProductPackaging[];
    packagings_complete?: number;
    packagings_materials: PackagingsMaterials;
    packagings_n: number;
    photographers?: string[];
    photographers_tags: string[];
    pnns_groups_1: string;
    pnns_groups_1_tags: string[];
    pnns_groups_2: string;
    pnns_groups_2_tags: string[];
    popularity_key: number;
    popularity_tags: string[];
    product_name: string;
    product_name_cs?: string;
    product_name_de: string;
    product_name_en: string;
    product_name_es?: string;
    product_name_fi?: string;
    product_name_fr: string;
    product_name_pt?: string;
    product_name_ru?: string;
    product_name_sv?: string;
    product_quantity: string;
    product_quantity_unit: string;
    product_type: string;
    purchase_places: string;
    purchase_places_tags: string[];
    quantity: string;
    removed_countries_tags: any[];
    rev: number;
    scans_n: number;
    schema_version: number;
    selected_images: SelectedImages;
    serving_quantity: number | string;
    serving_quantity_unit: string;
    serving_size: string;
    sortkey: number;
    states: string;
    states_hierarchy: string[];
    states_tags: string[];
    stores: string;
    stores_tags: string[];
    taxonomies_enhancer_tags: string[];
    teams?: string;
    teams_tags?: string[];
    traces: string;
    traces_from_ingredients: string;
    traces_from_user: string;
    traces_hierarchy: any[];
    traces_lc: string;
    traces_tags: any[];
    unique_scans_n: number;
    unknown_ingredients_n: number;
    unknown_nutrients_tags: any[];
    update_key: string;
    vitamins_prev_tags: any[];
    vitamins_tags: any[];
    weighers_tags: string[];
    brands_old?: string;
    completed_t?: number;
    countries_beforescanbot?: string;
    generic_name_ar?: string;
    generic_name_fr_debug_tags?: any[];
    generic_name_xx?: string;
    generic_name_xx_debug_tags?: any[];
    ingredients_text_ar?: string;
    ingredients_text_ar_ocr_1609612819?: string;
    ingredients_text_ar_ocr_1609612819_result?: string;
    ingredients_text_fr_debug_tags?: any[];
    ingredients_text_with_allergens_ar?: string;
    ingredients_text_xx?: string;
    ingredients_text_xx_debug_tags?: any[];
    interface_version_created?: string;
    origin_ar?: string;
    packaging_text_ar?: string;
    product_name_ar?: string;
    product_name_fr_debug_tags?: any[];
    product_name_xx?: string;
    product_name_xx_debug_tags?: any[];
}

export interface CategoriesProperties {
    "agribalyse_proxy_food_code:en": string;
    "ciqual_food_code:en"?: string;
}

export interface CategoryProperties {
    "ciqual_food_name:en"?: string;
    "ciqual_food_name:fr"?: string;
}

export interface EcoscoreData {
    adjustments: Adjustments;
    agribalyse?: Agribalyse;
    grade: string;
    grades?: { [key: string]: Grade };
    missing: Missing;
    missing_data_warning?: number;
    score?: number;
    scores: { [key: string]: number };
    status: string;
    environmental_score_not_applicable_for_category?: string;
}

export interface Adjustments {
    origins_of_ingredients: OriginsOfIngredients;
    packaging: AdjustmentsPackaging;
    production_system: ProductionSystem;
    threatened_species: All;
}

export interface OriginsOfIngredients {
    aggregated_origins: AggregatedOrigin[];
    epi_score: number;
    epi_value: number;
    origins_from_categories: string[];
    origins_from_origins_field: string[];
    transportation_score: number;
    transportation_scores: { [key: string]: number };
    transportation_value: number;
    transportation_values: { [key: string]: number };
    value: number;
    values: { [key: string]: number };
    warning?: string;
}

export interface AggregatedOrigin {
    epi_score: string;
    origin: string;
    percent: number;
    transportation_score: number;
}

export interface AdjustmentsPackaging {
    non_recyclable_and_non_biodegradable_materials: number;
    packagings: PackagingPackaging[];
    score: number;
    value: number;
    warning?: string;
}

export interface PackagingPackaging {
    environmental_score_material_score: number;
    environmental_score_shape_ratio: number;
    food_contact: number;
    material: string;
    number_of_units?: number;
    quantity_per_unit?: string;
    shape: string;
    non_recyclable_and_non_biodegradable?: string;
}

export interface ProductionSystem {
    labels: any[];
    value: number;
    warning: string;
}

export interface All {
}

export interface Agribalyse {
    agribalyse_proxy_food_code: string;
    co2_agriculture: number;
    co2_consumption: number;
    co2_distribution: number;
    co2_packaging: number;
    co2_processing: number;
    co2_total: number;
    co2_transportation: number;
    code: string;
    dqr: string;
    ef_agriculture: number;
    ef_consumption: number;
    ef_distribution: number;
    ef_packaging: number;
    ef_processing: number;
    ef_total: number;
    ef_transportation: number;
    is_beverage: number;
    name_en: string;
    name_fr: string;
    score: number;
    version: string;
}

export enum Grade {
    A = "a",
}

export interface Missing {
    labels: number;
    origins?: number;
    packagings?: number;
}

export interface Images {
    "1": The1;
    "2": The1;
    "3": The1;
    "4": The1;
    "5": The1;
    "6": The1;
    "7": The10;
    "8": The10;
    "10": The10;
    "11": The10;
    "12": The1;
    "13": The1;
    "14": The1;
    "15": The1;
    "16": The1;
    "17": The1;
    "18": The1;
    "19": The1;
    "20": The1;
    "21": The1;
    "22": The1;
    "23": The1;
    "24": The1;
    "25": The1;
    "26": The1;
    "27": The1;
    "28": The1;
    "29": The1;
    "30": The1;
    "31": The1;
    "32"?: The32;
    "33"?: The32;
    "34"?: The32;
    "35"?: The32;
    "36"?: The32;
    "37"?: The32;
    "38"?: The32;
    "39"?: The32;
    "40"?: The32;
    "41"?: The10;
    "42"?: The10;
    "43"?: The10;
    "44"?: The10;
    "45"?: The10;
    "46"?: The10;
    "47"?: The10;
    "48"?: The10;
    "49"?: The10;
    "50"?: The10;
    "51"?: The10;
    "52"?: The10;
    "53"?: The10;
    "54"?: The10;
    "55"?: The10;
    "56"?: The10;
    "57"?: The10;
    "58"?: The10;
    "59"?: The10;
    "60"?: The32;
    "61"?: The32;
    "62"?: The10;
    "63"?: The10;
    "64"?: The10;
    "65"?: The10;
    "66"?: The10;
    "67"?: The10;
    "68"?: The10;
    "69"?: The10;
    "70"?: The10;
    "71"?: The10;
    "72"?: The10;
    "73"?: The10;
    "74"?: The10;
    "75"?: The10;
    "76"?: The10;
    "77"?: The10;
    "78"?: The10;
    "79"?: The10;
    "80"?: The10;
    "81"?: The10;
    "82"?: The10;
    "83"?: The10;
    "84"?: The10;
    "85"?: The10;
    "86"?: The10;
    "87"?: The10;
    "88"?: The10;
    "89"?: The10;
    "90"?: The10;
    "91"?: The10;
    "92"?: The10;
    "93"?: The10;
    front?: ImagesFront;
    front_de: Front;
    front_en: FrontEn;
    front_es?: FrontEs;
    front_fi?: Front;
    front_fr?: FrontEs;
    front_pt?: FrontEs;
    front_ru?: FrontEs;
    front_sv?: FrontEs;
    ingredients?: ImagesFront;
    ingredients_de: FrontEs;
    ingredients_en?: FrontEs;
    ingredients_es?: FrontEs;
    ingredients_fi?: FrontEs;
    ingredients_fr?: FrontEs;
    ingredients_pt?: FrontEs;
    ingredients_ru?: FrontEs;
    ingredients_sv?: FrontEs;
    nutrition: ImagesFront;
    nutrition_de: FrontEs;
    nutrition_en?: FrontEs;
    nutrition_es?: FrontEs;
    nutrition_fr?: FrontEs;
    nutrition_pt?: FrontEs;
    nutrition_ru?: FrontEs;
    nutrition_sv?: FrontEs;
    packaging_de: FrontEs;
    packaging_en?: FrontEs;
    packaging_es?: FrontEs;
    packaging_fr?: FrontEs;
    packaging_ru?: FrontEs;
    "9"?: The10;
    front_ar?: Front;
}

export interface The1 {
    sizes: Sizes;
    uploaded_t: number | string;
    uploader: string;
}

export interface Sizes {
    "100": The100;
    "400": The100;
    full: The100;
    "200"?: The100;
}

export interface The100 {
    h: number;
    w: number;
}

export interface The10 {
    sizes: Sizes;
    uploaded_t: number;
    uploader: string;
}

export interface The32 {
    sizes: Sizes;
    uploaded_t: string;
    uploader: Uploader;
}

export enum Uploader {
    Kiliweb = "kiliweb",
    Neptuno = "neptuno",
}

export interface ImagesFront {
    geometry: string;
    imgid: string;
    normalize: string;
    rev: string;
    sizes: Sizes;
    white_magic: null | string;
    ocr?: number;
    orientation?: string;
}

export interface Front {
    angle: number;
    coordinates_image_size: string;
    geometry: string;
    imgid: string;
    normalize: null;
    rev: string;
    sizes: Sizes;
    white_magic: null;
    x1: string;
    x2: string;
    y1: string;
    y2: string;
}

export interface FrontEn {
    angle: number | string;
    coordinates_image_size?: string;
    geometry: string;
    imgid: string;
    normalize: null;
    rev: string;
    sizes: Sizes;
    white_magic: null;
    x1: string;
    x2: string;
    y1: string;
    y2: string;
}

export interface FrontEs {
    angle: number | null | string;
    coordinates_image_size?: string;
    geometry: string;
    imgid: string;
    normalize: null | string;
    rev: string;
    sizes: Sizes;
    white_magic: null | string;
    x1: null | string;
    x2: null | string;
    y1: null | string;
    y2: null | string;
    ocr?: number;
    orientation?: string;
}

export interface ProductIngredient {
    id: string;
    is_in_taxonomy: number;
    percent?: number;
    percent_estimate: number;
    percent_max: number;
    percent_min: number;
    text: string;
    vegan?: Veg;
    vegetarian?: Veg;
    ciqual_food_code?: string;
    ecobalyse_code?: string;
    ciqual_proxy_food_code?: string;
    ingredients?: IngredientIngredient[];
}

export interface IngredientIngredient {
    id: string;
    is_in_taxonomy: number;
    percent_estimate: number;
    percent_max: number;
    percent_min: number;
    text: string;
    vegan: Veg;
    vegetarian: Veg;
}

export enum Veg {
    Yes = "yes",
}

export interface IngredientsAnalysis {
    "en:palm-oil-content-unknown"?: string[];
    "en:vegan-status-unknown"?: string[];
    "en:vegetarian-status-unknown"?: string[];
}

export interface LanguagesCodes {
    de: number;
    en: number;
    es?: number;
    fi?: number;
    fr?: number;
    pt?: number;
    ru?: number;
    sv?: number;
    ar?: number;
}

export interface NutrientLevels {
    fat: string;
    salt: string;
    "saturated-fat": string;
    sugars: string;
}

export interface Nutriments {
    carbohydrates: number;
    carbohydrates_100g: number;
    carbohydrates_serving: number;
    carbohydrates_unit: Unit;
    carbohydrates_value: number;
    "carbon-footprint-from-known-ingredients_100g"?: number;
    "carbon-footprint-from-known-ingredients_product"?: number;
    "carbon-footprint-from-known-ingredients_serving"?: number;
    energy: number;
    "energy-kcal": number;
    "energy-kcal_100g": number;
    "energy-kcal_serving": number;
    "energy-kcal_unit": string;
    "energy-kcal_value": number;
    "energy-kcal_value_computed": number;
    energy_100g: number;
    energy_serving: number;
    energy_unit: string;
    energy_value: number;
    fat: number;
    fat_100g: number;
    fat_serving: number;
    fat_unit: Unit;
    fat_value: number;
    fiber?: number;
    fiber_100g?: number;
    fiber_serving?: number;
    fiber_unit?: Unit;
    fiber_value?: number;
    "fruits-vegetables-legumes-estimate-from-ingredients_100g": number;
    "fruits-vegetables-legumes-estimate-from-ingredients_serving": number;
    "fruits-vegetables-nuts-estimate-from-ingredients_100g": number;
    "fruits-vegetables-nuts-estimate-from-ingredients_serving": number;
    "nova-group": number;
    "nova-group_100g": number;
    "nova-group_serving": number;
    "nutrition-score-fr": number;
    "nutrition-score-fr_100g": number;
    "nutrition-score_unit"?: Unit;
    "nutrition-score_value"?: number;
    proteins: number;
    proteins_100g: number;
    proteins_serving: number;
    proteins_unit: Unit;
    proteins_value: number;
    salt: number;
    salt_100g: number;
    salt_serving: number;
    salt_unit: Unit;
    salt_value: number;
    "saturated-fat": number;
    "saturated-fat_100g": number;
    "saturated-fat_serving": number;
    "saturated-fat_unit": Unit;
    "saturated-fat_value": number;
    sodium: number;
    sodium_100g: number;
    sodium_serving: number;
    sodium_unit: Unit;
    sodium_value: number;
    sugars: number;
    sugars_100g: number;
    sugars_serving: number;
    sugars_unit: Unit;
    sugars_value: number;
    "energy-kj"?: number;
    "energy-kj_100g"?: number;
    "energy-kj_serving"?: number;
    "energy-kj_unit"?: Unit;
    "energy-kj_value"?: number;
    "energy-kj_value_computed"?: number;
}

export enum Unit {
    Empty = "%",
    G = "g",
    KJ = "kJ",
    Number = "number",
}

export interface Nutriscore {
    category_available: number;
    data: Data;
    grade: string;
    nutrients_available: number;
    nutriscore_applicable: number;
    nutriscore_computed: number;
    score: number;
}

export interface Data {
    energy?: number;
    energy_points?: number;
    energy_value?: number;
    fiber?: number;
    fiber_points?: number;
    fiber_value?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_points?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_value?: number;
    is_beverage: number;
    is_cheese: number;
    is_fat?: number;
    is_water: number;
    negative_points: number;
    positive_points: number;
    proteins?: number;
    proteins_points?: number;
    proteins_value?: number;
    saturated_fat?: number;
    saturated_fat_points?: number;
    saturated_fat_value?: number;
    sodium?: number;
    sodium_points?: number;
    sodium_value?: number;
    sugars?: number;
    sugars_points?: number;
    sugars_value?: number;
    components?: Components;
    count_proteins?: number;
    count_proteins_reason?: string;
    is_fat_oil_nuts_seeds?: number;
    is_red_meat_product?: number;
    negative_points_max?: number;
    positive_nutrients?: PositiveNutrient[];
    positive_points_max?: number;
    grade?: string;
    score?: number;
}

export interface Components {
    negative: Tive[];
    positive: Tive[];
}

export interface Tive {
    id: string;
    points: number;
    points_max: number;
    unit: Unit;
    value: number | null;
}

export enum PositiveNutrient {
    Fiber = "fiber",
    FruitsVegetablesLegumes = "fruits_vegetables_legumes",
    Proteins = "proteins",
}

export interface NutriscoreData {
    components: Components;
    count_proteins: number;
    count_proteins_reason: string;
    is_beverage: number;
    is_cheese: number;
    is_fat_oil_nuts_seeds: number;
    is_red_meat_product: number;
    is_water: number;
    negative_points: number;
    negative_points_max: number;
    positive_nutrients: PositiveNutrient[];
    positive_points: number;
    positive_points_max: number;
    grade?: string;
    score?: number;
}

export interface ProductPackaging {
    food_contact: number;
    material: string;
    number_of_units?: number;
    quantity_per_unit?: string;
    shape?: string;
}

export interface PackagingsMaterials {
    all: All;
    "en:metal"?: All;
    "en:plastic"?: All;
}

export interface SelectedImages {
    front: SelectedImagesFront;
    ingredients: SelectedImagesFront;
    nutrition: SelectedImagesFront;
    packaging: SelectedImagesPackaging;
}

export interface SelectedImagesFront {
    display: FrontDisplay;
    small: FrontDisplay;
    thumb: FrontDisplay;
}

export interface FrontDisplay {
    de: string;
    en?: string;
    es?: string;
    fi?: string;
    fr?: string;
    pt?: string;
    ru?: string;
    sv?: string;
    ar?: string;
}

export interface SelectedImagesPackaging {
    display: PackagingDisplay;
    small: PackagingDisplay;
    thumb: PackagingDisplay;
}

export interface PackagingDisplay {
    de: string;
    en?: string;
    es?: string;
    fr?: string;
    ru?: string;
}
