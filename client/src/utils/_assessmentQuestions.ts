import { Question } from "./typings/_classes"

const general_block_features: Question[] = [
  new Question("gbf_length", "How long is the block?", "options", [
    "Less than 1/10 mile",
    "1/10 mile",
    "More than 1/10 mile",
    "More than twice 1/10 mile",
  ]),
  new Question("gbf_width", "How wide is the block?", "options", [
    "Less than 4 car widths",
    "4 car widths",
    "More than 4 car widths",
    "More than twice 4 car widths",
  ]),
  new Question("gbf_dead_end", "Is this a dead end block?", "options", [
    "Yes",
    "No",
  ]),
  new Question("gbf_median", "Is there a median present?", "options", [
    "Yes",
    "No",
  ]),
  new Question("gbf_sidewalks", "Are there sidewalks present?", "options", [
    "Yes",
    "No",
  ]),
  new Question(
    "gbf_residents_percent",
    "Estimate the percent of the block that is residential:",
    "options",
    ["0%", "1%-20%", "21%-40%", "41%-60%", "61%-80%", "81%-100%"]
  ),
  new Question(
    "gbf_non_resident_properties",
    "Count the number of non-residential properties:",
    "counter",
    null
  ),
  new Question(
    "gbf_non_resident_properties_list",
    "Briefly list the types of non-residential properties (separate by commmas, please):",
    "input",
    null
  ),
  new Question(
    "gbf_num_streetlights",
    "Count the number of streetlights:",
    "counter",
    null
  ),
  new Question(
    "gbf_num_utility_poles",
    "Count the number of utility poles:",
    "counter",
    null
  ),
  new Question(
    "gbf_num_trees",
    "Count the number of trees in public (exclude those on private property):",
    "counter",
    null
  ),
  new Question("gbf_num_murals", "Count the number of murals", "counter", null),
  new Question(
    "gbf_num_fire_hydrants",
    "Count the number of fire hydrants:",
    "counter",
    null
  ),
  new Question(
    "gbf_num_xwalk_signals",
    "Count the number of crosswalks with signals:",
    "counter",
    null
  ),
  new Question(
    "gbf_num_xwalks_no_signals",
    "Count the number of crosswalks without signals:",
    "counter",
    null
  ),
  new Question(
    "gbf_num_gov_cameras",
    "Count the number of public surveillance cameras (as opposed to those used by private establishments or residences):",
    "counter",
    null
  ),
  new Question(
    "gbf_num_priv_cameras",
    "Count the number of private surveillance cameras (as opposed to those used used by the government for public surveillance):",
    "counter",
    null
  ),
  new Question(
    "gbf_num_gov_ads_promos",
    "Count the number of government (publically) funded advertisements or promos with a positive or neutral message (exclude alcohol and tobacco advertising or promotion from this count):",
    "counter",
    null
  ),
  new Question(
    "gbf_num_priv_ads_promos",
    "Count the number of non-government advertisements or promos with a positive or neutral message (exclude alcohol and tobacco advertising or promotion from this count):",
    "counter",
    null
  ),
  new Question(
    "gbf_traffic_control_num_speed_bumps",
    "Count the number of speed bumps:",
    "counter",
    null
  ),
  new Question(
    "gbf_traffic_control_num_speed_humps",
    "Count the number of speed humps:",
    "counter",
    null
  ),
  new Question(
    "gbf_traffic_control_num_noise_strips",
    "Count the number of noise strips:",
    "counter",
    null
  ),
  new Question(
    "gbf_traffic_control_num_speed_limit_signs",
    "Count the number of speed limit signs:",
    "counter",
    null
  ),
  new Question(
    "gbf_traffic_control_num_speed_monitors",
    "Count the number of electronic speed monitors:",
    "counter",
    null
  ),
  new Question(
    "gbf_traffic_control_num_speed_cameras",
    "Count the number of speed cameras:",
    "counter",
    null
  ),
  new Question(
    "gbf_traffic_control_num_red_light_cameras",
    "Count the number of red light cameras:",
    "counter",
    null
  ),
  new Question(
    "gbf_traffic_control_num_traffic_circles",
    "Count the number of traffic circles:",
    "counter",
    null
  ),
];

const stores: Question[] = [
  new Question(
    "strs_liquor_count",
    "Count the number of liquor stores:",
    "counter",
    null
  ),
  new Question(
    "strs_liquor_convenience_count",
    "Count the number of convenience stores that sell liquor:",
    "counter",
    null
  ),
  new Question(
    "strs_liquor_bar_count",
    "Count the number of bars:",
    "counter",
    null
  ),
  new Question(
    "strs_liquor_nightclub_count",
    "Count the number of nightclubs:",
    "counter",
    null
  ),
  new Question(
    "strs_liquor_xxx_count",
    "Count the number of adult entertainment venues:",
    "counter",
    null
  ),
  new Question(
    "strs_daycare",
    "Count the number of daycares:",
    "counter",
    null
  ),
  new Question(
    "strs_restaurant_fast_food",
    "Count the number of fast food restaurants:",
    "counter",
    null
  ),
  new Question(
    "strs_restaurant_carryout",
    "Count the number of carry-out restaurants:",
    "counter",
    null
  ),
  new Question(
    "strs_restaurant_pizza",
    "Count the number of pizza parlors:",
    "counter",
    null
  ),
  new Question(
    "strs_restaurant_sit_down",
    "Count the number of sit-down restaurants",
    "counter",
    null
  ),
  new Question(
    "strs_restaurant_coffee_shop",
    "Count the number of coffee-shops:",
    "counter",
    null
  ),
  new Question(
    "strs_gas_station",
    "Count the number of gas stations:",
    "counter",
    null
  ),
  new Question(
    "strs_convenience",
    "Count the number of convenience stores:",
    "counter",
    null
  ),
  new Question(
    "strs_grocery",
    "Count the number of grocery stores:",
    "counter",
    null
  ),
  new Question(
    "strs_money_pawn",
    "Count the number of pawn shops:",
    "counter",
    null
  ),
  new Question(
    "strs_money_bank",
    "Count the number of banks:",
    "counter",
    null
  ),
  new Question(
    "strs_money_check",
    "Count the number of check-cashing stores:",
    "counter",
    null
  ),
  new Question(
    "strs_money_payday",
    "Count the number of payday lenders:",
    "counter",
    null
  ),
  new Question(
    "strs_cellphone",
    "Count the number of cell phone stores:",
    "counter",
    null
  ),
  new Question(
    "strs_laundry_laundromat",
    "Count the number of laundromats:",
    "counter",
    null
  ),
  new Question(
    "strs_laundry_drycleaner",
    "Count the number of dry-cleaners:",
    "counter",
    null
  ),
  new Question(
    "strs_car_bodyshop",
    "Count the number of auto-body repair shops:",
    "counter",
    null
  ),
  new Question(
    "strs_car_mechanic",
    "Count the number of auto-mechanics:",
    "counter",
    null
  ),
  new Question(
    "strs_car_parts",
    "Count the number of auto-parts stores:",
    "counter",
    null
  ),
  new Question(
    "strs_nail_salon",
    "Count the number of nail salons:",
    "counter",
    null
  ),
  new Question(
    "strs_barbershop",
    "Count the number of barbershops:",
    "counter",
    null
  ),
  new Question(
    "strs_stylist",
    "Count the number of hair stylists:",
    "counter",
    null
  ),
  new Question(
    "strs_tattoo",
    "Count the number of tattoo parlors:",
    "counter",
    null
  ),
  new Question(
    "strs_shoes",
    "Count the number of shoe stores:",
    "counter",
    null
  ),
  new Question(
    "strs_clothes",
    "Count the number of clothing stores:",
    "counter",
    null
  ),
  new Question(
    "strs_department",
    "Count the number of clothing department stores:",
    "counter",
    null
  ),
  new Question(
    "strs_garage",
    "Count the number of parking garage:",
    "counter",
    null
  ),
  new Question(
    "strs_thrift",
    "Count the number of thrift stores:",
    "counter",
    null
  ),
  new Question(
    "strs_dollar",
    "Count the number of dollar stores:",
    "counter",
    null
  ),
  new Question(
    "strs_used_car",
    "Count the number of used car lots:",
    "counter",
    null
  ),
  new Question(
    "strs_medical",
    "Count the number of medical supply stores:",
    "counter",
    null
  ),
  new Question(
    "strs_foodtruck",
    "Count the number of food trucks:",
    "counter",
    null
  ),
  new Question(
    "strs_pushcart",
    "Count the number of pushcart vendors:",
    "counter",
    null
  ),
  new Question(
    "strs_flower_cart",
    "Count the number of flower carts:",
    "counter",
    null
  ),
  new Question(
    "strs_other_store",
    "List any stores (and their quantity) not easily grouped in the prior sections in the following format: Store (#quantity)",
    "input",
    null
  ),
  new Question(
    "strs_other_vendor",
    "List any street vendors (and their quantity) not easily grouped in the prior sections in the following format: Store (#quantity)",
    "input",
    null
  ),
];

const industry: Question[] = [
  new Question(
    "ind_lulu_count",
    'Count the number locations that you would consider an example of "locally unwanted land usage" or LULU:',
    "counter",
    null
  ),
  new Question(
    "ind_freight_train",
    "Count the number of freight trains, excluding passenger/commuter trains:",
    "counter",
    null
  ),
  new Question(
    "ind_freight_train_station",
    "Count the number of freight train stations, excluding passenger/commuter train stations:",
    "counter",
    null
  ),
  new Question(
    "ind_landfill",
    "Count the number of landfills:",
    "counter",
    null
  ),
  new Question(
    "ind_hazardous_waste",
    "Count the number of hazardous waste sites:",
    "counter",
    null
  ),
  new Question(
    "ind_sewage",
    "Count the number of sewage treatment facilities:",
    "counter",
    null
  ),
  new Question(
    "ind_brownfields",
    "Count the number of formerly developed or industrially relevant, but now disused, sites (known as brownfields):",
    "counter",
    null
  ),
];

const physical_disorder: Question[] = [
  new Question(
    "pd_broken_window",
    "Count the structures with broken windows:",
    "counter",
    null
  ),
  new Question(
    "pd_eviction_notice",
    "Count the number of eviction notices:",
    "counter",
    null
  ),
  new Question(
    "pd_vacant_residence",
    "Count the number of vacant or boarded-up residences:",
    "counter",
    null
  ),
  new Question(
    "pd_vacant_store",
    "Count the number of vacant or boarded-up stores:",
    "counter",
    null
  ),
  new Question(
    "pd_vacant_lots",
    "Count the number of empty lots:",
    "counter",
    null
  ),
  new Question(
    "pd_construction",
    "Count the number of the construction or renovation sites:",
    "counter",
    null
  ),
  new Question(
    "pd_trash_functional_trashcan",
    "Count the number of functional trashcans (not overflowing):",
    "counter",
    null
  ),
  new Question(
    "pd_trash_overflowing_trashcan",
    "Count the number of non-functional (overflowing) trashcans:",
    "counter",
    null
  ),
  new Question(
    "pd_trash_loose_trash_street",
    "How much litter is on the public street?",
    "options",
    ["A Lot", "Some", "A Little", "None"]
  ),
  new Question(
    "pd_trash_loose_trash_sidewalk",
    "How much litter is on the public sidewalk?",
    "options",
    ["A Lot", "Some", "A Little", "None"]
  ),
  new Question(
    "pd_trash_vacant_lot",
    "If any vacant lots, how much trash is in them?",
    "options",
    ["A Lot", "Some", "A Little", "None", "N/A"]
  ),
  new Question(
    "pd_trash_bulk_amount_street",
    "Count the number of bulk trash items in the street:",
    "options",
    ["None", "1 to 3", "4 to 7", "8 or more"]
  ),
  new Question(
    "pd_trash_bulk_amount_sidewalk",
    "Count the number of bulk trash items on the sidewalk or next to the street:",
    "options",
    ["None", "1 to 3", "4 to 7", "8 or more"]
  ),
  new Question(
    "pd_trash_bulk_amount_other",
    "Count the number of bulk trash items in other locations (vacant lots, parks, etc.):",
    "options",
    ["None", "1 to 3", "4 to 7", "8 or more"]
  ),
  new Question(
    "pd_trash_bottles",
    "Count the number of broken or discarded bottles:",
    "counter",
    null
  ),
  new Question(
    "pd_trash_yard_waste",
    "Count the piles of yard waste:",
    "counter",
    null
  ),
  new Question("pd_trash_sewage", "Count the sewage spills:", "counter", null),
  new Question(
    "pd_animals_rodent",
    "Count the number of rats and mice, dead and alive:",
    "counter",
    null
  ),
  new Question(
    "pd_animals_stray_species",
    "What type of stray animals do you see, other than rats and mice?",
    "options",
    ["dog", "cat", "other"]
  ),
  new Question(
    "pd_animals_dead",
    "Count the number of dead animals other than rats and mice:",
    "counter",
    null
  ),
  new Question(
    "pd_qual_life_potholes",
    "Count the number of potholes:",
    "counter",
    null
  ),
  new Question(
    "pd_qual_life_graffiti",
    "Count instances of graffiti, excluding murals and other public and/or street art:",
    "counter",
    null
  ),
  new Question(
    "pd_qual_life_sidewalk_damage",
    "Count the areas of sidewalk damage, including large cracks, unpaved areas, and missing stones or segments:",
    "counter",
    null
  ),
  new Question(
    "pd_qual_life_private_warning_sign",
    'Count the number of warning signs on private property, such as "No Trespassing" signs, "Drug Free Zone", etc.:',
    "counter",
    null
  ),
  new Question(
    "pd_qual_life_police_cruising",
    "Are there police officers cruising in their vehicle?",
    "options",
    ["Yes", "No"]
  ),
  new Question(
    "pd_qual_life_police_parked",
    "Are there police officers parked in their vehicle?",
    "options",
    ["Yes", "No"]
  ),
  new Question(
    "pd_qual_life_police_interaction",
    "Are there instances of police officers interacting with civilians, including taking police reports and informal conversation?",
    "options",
    ["Yes", "No"]
  ),
  new Question(
    "pd_qual_life_police_activity",
    "Are there instances of other police activity, including making an arrest or writing a ticket?",
    "options",
    ["Yes", "No"]
  ),
  new Question(
    "pd_qual_life_tobacco",
    "Count the signs or print ads related to tobacco:",
    "counter",
    null
  ),
  new Question(
    "pd_qual_life_security_sign",
    "Count the number of security alarm company signs:",
    "counter",
    null
  ),
  new Question(
    "pd_qual_life_vandalism",
    "Count instances of vandalism, excluding graffiti:",
    "counter",
    null
  ),
  new Question(
    "pd_vehicle_car_operable",
    "Count the number of operable cars parked on the street or in driveways:",
    "counter",
    null
  ),
  new Question(
    "pd_vehicle_car_inoperable",
    "Count the number of inoperable cars parked on the street or in driveways:",
    "counter",
    null
  ),
  new Question(
    "pd_vehicle_front_yard",
    "Count the number of vehicles in front yards:",
    "counter",
    null
  ),
  new Question(
    "pd_vehicle_commercial",
    "Count the number of commercial vehicles parked in the street:",
    "counter",
    null
  ),
  new Question(
    "pd_vehicle_trailer",
    "Count the number of trailers parked in the street:",
    "counter",
    null
  ),
  new Question(
    "pd_vehicle_boat",
    "Count the number of boats parked in the street:",
    "counter",
    null
  ),
];

const housing: Question[] = [
  new Question(
    "housing_standing_structure",
    "Count the number of structures not burned down or otherwise semidemolished, including vacant and occupied structures:",
    "counter",
    null
  ),
  new Question(
    "housing_attached",
    "Count the number of attached or semi-detached houses, including rowhouses, townhouses, etc.:",
    "counter",
    null
  ),
  new Question(
    "housing_apartment",
    "Count the number of apartment buildings or complexes:",
    "counter",
    null
  ),
  new Question(
    "housing_single_family",
    "Count the number of single family, free standing homes:",
    "counter",
    null
  ),
  new Question(
    "housing_multiple_units",
    "Count the number of houses with evidence of multiple units:",
    "counter",
    null
  ),
  new Question(
    "housing_public_housing",
    "Count the number of buildings designated as public housing:",
    "counter",
    null
  ),
  new Question(
    "housing_senior_housing",
    "Count the number of buildings designated as senior housing:",
    "counter",
    null
  ),
  new Question(
    "housing_assisted_living",
    "Count the number of assisted living facilities:",
    "counter",
    null
  ),
  new Question(
    "housing_continuous_care",
    "Count the number of continuous care facilities:",
    "counter",
    null
  ),
  new Question(
    "housing_group_home",
    "Count the number of group homes, including halfway houses, intermediate care facilities, etc.:",
    "counter",
    null
  ),
];

const public_services: Question[] = [
  new Question(
    "ps_fire_station",
    "Count the number of fire stations:",
    "counter",
    null
  ),
  new Question(
    "ps_police_station",
    "Count the number of police stations:",
    "counter",
    null
  ),
  new Question(
    "ps_jail_or_prison",
    "Count the number of jails or prisons:",
    "counter",
    null
  ),
  new Question(
    "ps_public_library",
    "Count the number of public libraries:",
    "counter",
    null
  ),
  new Question(
    "ps_municipal_building",
    "Count the number of municipal buildings:",
    "counter",
    null
  ),
  new Question(
    "ps_public_park_sign",
    "Count the number of park signs:",
    "counter",
    null
  ),
  new Question(
    "ps_public_park_condition",
    "What is the condition of the parks?",
    "options",
    ["Great", "Good", "Bad"]
  ),
  new Question(
    "ps_bike_trails",
    "Count the number of off-road bike trails:",
    "counter",
    null
  ),
  new Question(
    "ps_centers",
    "Count the number of community, senior, and recreation centers:",
    "counter",
    null
  ),
  new Question(
    "ps_vfw_american_legion",
    "Count the number of VFW or American Legion Halls:",
    "counter",
    null
  ),
  new Question(
    "ps_soup_kitchen",
    "Count the number of soup kitchens:",
    "counter",
    null
  ),
  new Question(
    "ps_shelter",
    "Count the number of homeless or women's shelters:",
    "counter",
    null
  ),
  new Question(
    "ps_historic",
    "Count the number of historic sites or public monuments:",
    "counter",
    null
  ),
];

const public_transit: Question[] = [
  new Question(
    "pt_metro_station",
    "Count the number of metro stations:",
    "counter",
    null
  ),
  new Question(
    "pt_bike_lane",
    "Count the number of bike lanes:",
    "counter",
    null
  ),
  new Question(
    "pt_bike_rack",
    "Count the number of bike racks:",
    "counter",
    null
  ),
  new Question(
    "pt_bike_share",
    "Count the number of bike share stations",
    "counter",
    null
  ),
  new Question(
    "pt_rideshare",
    "Count the number of ride-share or park-and-ride lots:",
    "counter",
    null
  ),
  new Question(
    "pt_taxi",
    "Count the number of taxi (conventional or Uber/Lyft-type):",
    "counter",
    null
  ),
  new Question(
    "pt_bus_shelter_bench",
    "Count the number of bus stops with both a bench and a shelter:",
    "counter",
    null
  ),
  new Question(
    "pt_bus_bench",
    "Count the number of bus stops with a bench and no shelter:",
    "counter",
    null
  ),
  new Question(
    "pt_bus_shelter",
    "Count the number of bus stops with a shelter but no bench:",
    "counter",
    null
  ),
  new Question(
    "pt_bus_no_shelter_no_bench",
    "Count the number of bus stops with neither a shelter nor a bench:",
    "counter",
    null
  ),
  new Question(
    "pt_bus_bench_condition",
    "What is the condition of the bus stop benches (if none, select N/A):",
    "options",
    ["Excellent", "Fair", "Poor", "Very Poor", "N/A"]
  ),
  new Question(
    "pt_bus_shelter_condition",
    "What is the condition of the bus stop shelters (if none, select N/A):",
    "options",
    ["Excellent", "Fair", "Poor", "Very Poor", "N/A"]
  ),
  new Question(
    "pt_bus_stop_clarity",
    "How clearly are the bus stops marked:",
    "options",
    ["Very Clear", "Clear", "Unclear", "Very Unclear"]
  ),
];

const health: Question[] = [
  new Question(
    "hlth_dentist",
    "Count the number of dentists' offices:",
    "counter",
    null
  ),
  new Question(
    "hlth_doctor",
    "Count the number of medical clinics or doctors' offices:",
    "counter",
    null
  ),
  new Question(
    "hlth_pharmacy",
    "Count the number of pharmacies, including those in grocery and drug stores:",
    "counter",
    null
  ),
  new Question(
    "hlth_rehab",
    "Count the number of rehab/detox facilites:",
    "counter",
    null
  ),
  new Question(
    "hlth_dialysis",
    "Count the number of dialysis facilities:",
    "counter",
    null
  ),
  new Question(
    "hlth_hospital",
    "Count the number of hospitals:",
    "counter",
    null
  ),
];





export const AssessmentQuestions: Question[][] = [
  general_block_features,
  stores,
  industry,
  physical_disorder,
  housing,
  public_services,
  public_transit,
  health,
];

