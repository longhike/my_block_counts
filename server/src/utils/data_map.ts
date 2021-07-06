export type TColumnQuestionItem = {
  col: string;
  question: string;
}

export type TColumnQuestionMap = {
  general_features_dq: TColumnQuestionItem[]
  stores_dq: TColumnQuestionItem[]
  industry_dq: TColumnQuestionItem[]
  physical_disorder_dq: TColumnQuestionItem[]
  housing_dq: TColumnQuestionItem[]
  public_services_dq: TColumnQuestionItem[]
  public_transit_dq: TColumnQuestionItem[]
  health_dq: TColumnQuestionItem[]
}

export const COLUMN_QUESTION_MAP: TColumnQuestionMap = {
    general_features_dq: [
      { col: "gbf_length", question: "How long is the block?" },
      { col: "gbf_width", question: "How wide is the block?" },
      { col: "gbf_dead_end", question: "Is this a dead end block?" },
      { col: "gbf_median", question: "Is there a median present?" },
      { col: "gbf_sidewalks", question: "Are there sidewalks present?" },
      {
        col: "gbf_residents_percent",
        question: "Estimate the percent of the block that is residential:",
      },
      {
        col: "gbf_non_resident_properties",
        question: "Count the number of non-residential properties:",
      },
      {
        col: "gbf_non_resident_properties_list",
        question:
          "Briefly list the types of non-residential properties (separate by commmas, please):",
      },
      {
        col: "gbf_num_streetlights",
        question: "Count the number of streetlights:",
      },
      {
        col: "gbf_num_utility_poles",
        question: "Count the number of utility poles:",
      },
      {
        col: "gbf_num_trees",
        question:
          "Count the number of trees in public (exclude those on private property):",
      },
      { col: "gbf_num_murals", question: "Count the number of murals:" },
      {
        col: "gbf_num_fire_hydrants",
        question: "Count the number of fire hydrants:",
      },
      {
        col: "gbf_num_xwalk_signals",
        question: "Count the number of crosswalks with signals:",
      },
      {
        col: "gbf_num_xwalks_no_signals",
        question: "Count the number of crosswalks without signals:",
      },
      {
        col: "gbf_num_gov_cameras",
        question:
          "Count the number of public surveillance cameras (as opposed to those used by private establishments or residences):",
      },
      {
        col: "gbf_num_priv_cameras",
        question:
          "Count the number of private surveillance cameras (as opposed to those used used by the government for public surveillance):",
      },
      {
        col: "gbf_num_gov_ads_promos",
        question:
          "Count the number of government (publically) funded advertisements or promos with a positive or neutral message (exclude alcohol and tobacco advertising or promotion from this count):",
      },
      {
        col: "gbf_num_priv_ads_promos",
        question:
          "Count the number of non-government advertisements or promos with a positive or neutral message (exclude alcohol and tobacco advertising or promotion from this count):",
      },
      {
        col: "gbf_traffic_control_num_speed_bumps",
        question: "Count the number of speed bumps:",
      },
      {
        col: "gbf_traffic_control_num_speed_humps",
        question: "Count the number of speed humps:",
      },
      {
        col: "gbf_traffic_control_num_noise_strips",
        question: "Count the number of noise strips:",
      },
      {
        col: "gbf_traffic_control_num_speed_limit_signs",
        question: "Count the number of speed limit signs:",
      },
      {
        col: "gbf_traffic_control_num_speed_monitors",
        question: "Count the number of electronic speed monitors:",
      },
      {
        col: "gbf_traffic_control_num_speed_cameras",
        question: "Count the number of speed cameras:",
      },
      {
        col: "gbf_traffic_control_num_red_light_cameras",
        question: "Count the number of red light cameras:",
      },
      {
        col: "gbf_traffic_control_num_traffic_circles",
        question: "Count the number of traffic circles:",
      },
    ],
    stores_dq: [
      {
        col: "strs_liquor_count",
        question: "Count the number of liquor stores:",
      },
      {
        col: "strs_liquor_convenience_count",
        question: "Count the number of convenience stores that sell liquor:",
      },
      { col: "strs_liquor_bar_count", question: "Count the number of bars:" },
      {
        col: "strs_liquor_nightclub_count",
        question: "Count the number of nightclubs:",
      },
      {
        col: "strs_liquor_xxx_count",
        question: "Count the number of adult entertainment venues:",
      },
      { col: "strs_daycare", question: "Count the number of daycares:" },
      {
        col: "strs_restaurant_fast_food",
        question: "Count the number of fast food restaurants:",
      },
      {
        col: "strs_restaurant_carryout",
        question: "Count the number of carry-out restaurants:",
      },
      {
        col: "strs_restaurant_pizza",
        question: "Count the number of pizza parlors:",
      },
      {
        col: "strs_restaurant_sit_down",
        question: "Count the number of sit-down restaurants",
      },
      {
        col: "strs_restaurant_coffee_shop",
        question: "Count the number of coffee-shops:",
      },
      {
        col: "strs_gas_station",
        question: "Count the number of gas stations:",
      },
      {
        col: "strs_convenience",
        question: "Count the number of convenience stores:",
      },
      {
        col: "strs_grocery",
        question: "Count the number of grocery stores:",
      },
      { col: "strs_money_pawn", question: "Count the number of pawn shops:" },
      { col: "strs_money_bank", question: "Count the number of banks:" },
      {
        col: "strs_money_check",
        question: "Count the number of check-cashing stores:",
      },
      {
        col: "strs_money_payday",
        question: "Count the number of payday lenders:",
      },
      {
        col: "strs_cellphone",
        question: "Count the number of cell phone stores:",
      },
      {
        col: "strs_laundry_laundromat",
        question: "Count the number of laundromats:",
      },
      {
        col: "strs_laundry_drycleaner",
        question: "Count the number of dry-cleaners:",
      },
      {
        col: "strs_car_bodyshop",
        question: "Count the number of auto-body repair shops:",
      },
      {
        col: "strs_car_mechanic",
        question: "Count the number of auto-mechanics:",
      },
      {
        col: "strs_car_parts",
        question: "Count the number of auto-parts stores:",
      },
      {
        col: "strs_nail_salon",
        question: "Count the number of nail salons:",
      },
      {
        col: "strs_barbershop",
        question: "Count the number of barbershops:",
      },
      { col: "strs_stylist", question: "Count the number of hair stylists:" },
      { col: "strs_tattoo", question: "Count the number of tattoo parlors:" },
      { col: "strs_shoes", question: "Count the number of shoe stores:" },
      {
        col: "strs_clothes",
        question: "Count the number of clothing stores:",
      },
      {
        col: "strs_department",
        question: "Count the number of clothing department stores:",
      },
      { col: "strs_garage", question: "Count the number of parking garage:" },
      { col: "strs_thrift", question: "Count the number of thrift stores:" },
      { col: "strs_dollar", question: "Count the number of dollar stores:" },
      {
        col: "strs_used_car",
        question: "Count the number of used car lots:",
      },
      {
        col: "strs_medical",
        question: "Count the number of medical supply stores:",
      },
      { col: "strs_foodtruck", question: "Count the number of food trucks:" },
      {
        col: "strs_pushcart",
        question: "Count the number of pushcart vendors:",
      },
      {
        col: "strs_flower_cart",
        question: "Count the number of flower carts:",
      },
      {
        col: "strs_other_store",
        question:
          "List any stores (and their quantity) not easily grouped in the prior sections in the following format: Store (#quantity)",
      },
      {
        col: "strs_other_vendor",
        question:
          "List any street vendors (and their quantity) not easily grouped in the prior sections in the following format: Store (#quantity)",
      },
    ],
    industry_dq: [
      {
        col: "ind_lulu_count",
        question:
          'Count the number locations that you would consider an example of "locally unwanted land usage" or LULU:',
      },
      {
        col: "ind_freight_train",
        question:
          "Count the number of freight trains, excluding passenger/commuter trains:",
      },
      {
        col: "ind_freight_train_station",
        question:
          "Count the number of freight train stations, excluding passenger/commuter train stations:",
      },
      { col: "ind_landfill", question: "Count the number of landfills:" },
      {
        col: "ind_hazardous_waste",
        question: "Count the number of hazardous waste sites:",
      },
      {
        col: "ind_sewage",
        question: "Count the number of sewage treatment facilities:",
      },
      {
        col: "ind_brownfields",
        question:
          "Count the number of formerly developed or industrially relevant, but now disused, sites (known as brownfields):",
      },
    ],
    physical_disorder_dq: [
      {
        col: "pd_broken_window",
        question: "Count the structures with broken windows:",
      },
      {
        col: "pd_eviction_notice",
        question: "Count the number of eviction notices:",
      },
      {
        col: "pd_vacant_residence",
        question: "Count the number of vacant or boarded-up residences:",
      },
      {
        col: "pd_vacant_store",
        question: "Count the number of vacant or boarded-up stores:",
      },
      { col: "pd_vacant_lots", question: "Count the number of empty lots:" },
      {
        col: "pd_construction",
        question: "Count the number of the construction or renovation sites:",
      },
      {
        col: "pd_trash_functional_trashcan",
        question: "Count the number of functional trashcans (not overflowing):",
      },
      {
        col: "pd_trash_overflowing_trashcan",
        question: "Count the number of non-functional (overflowing) trashcans:",
      },
      {
        col: "pd_trash_loose_trash_street",
        question: "How much litter is on the public street?",
      },
      {
        col: "pd_trash_loose_trash_sidewalk",
        question: "How much litter is on the public sidewalk?",
      },
      {
        col: "pd_trash_vacant_lot",
        question: "If any vacant lots, how much trash is in them?",
      },
      {
        col: "pd_trash_bulk_amount_street",
        question: "Count the number of bulk trash items in the street:",
      },
      {
        col: "pd_trash_bulk_amount_sidewalk",
        question:
          "Count the number of bulk trash items on the sidewalk or next to the street:",
      },
      {
        col: "pd_trash_bulk_amount_other",
        question:
          "Count the number of bulk trash items in other locations (vacant lots, parks, etc.):",
      },
      {
        col: "pd_trash_bottles",
        question: "Count the number of broken or discarded bottles:",
      },
      {
        col: "pd_trash_yard_waste",
        question: "Count the piles of yard waste:",
      },
      { col: "pd_trash_sewage", question: "Count the sewage spills:" },
      {
        col: "pd_animals_rodent",
        question: "Count the number of rats and mice, dead and alive:",
      },
      {
        col: "pd_animals_stray_species",
        question:
          "What type of stray animals do you see, other than rats and mice?",
      },
      {
        col: "pd_animals_dead",
        question: "Count the number of dead animals other than rats and mice:",
      },
      {
        col: "pd_qual_life_potholes",
        question: "Count the number of potholes:",
      },
      {
        col: "pd_qual_life_graffiti",
        question:
          "Count instances of graffiti, excluding murals and other public and/or street art:",
      },
      {
        col: "pd_qual_life_sidewalk_damage",
        question:
          "Count the areas of sidewalk damage, including large cracks, unpaved areas, and missing stones or segments:",
      },
      {
        col: "pd_qual_life_private_warning_sign",
        question:
          'Count the number of warning signs on private property, such as "No Trespassing" signs, "Drug Free Zone", etc.:',
      },
      {
        col: "pd_qual_life_police_cruising",
        question: "Are there police officers cruising in their vehicle?",
      },
      {
        col: "pd_qual_life_police_parked",
        question: "Are there police officers parked in their vehicle?",
      },
      {
        col: "pd_qual_life_police_interaction",
        question:
          "Are there instances of police officers interacting with civilians, including taking police reports and informal conversation?",
      },
      {
        col: "pd_qual_life_police_activity",
        question:
          "Are there instances of other police activity, including making an arrest or writing a ticket?",
      },
      {
        col: "pd_qual_life_tobacco",
        question: "Count the signs or print ads related to tobacco:",
      },
      {
        col: "pd_qual_life_security_sign",
        question: "Count the number of security alarm company signs:",
      },
      {
        col: "pd_qual_life_vandalism",
        question: "Count instances of vandalism, excluding graffiti:",
      },
      {
        col: "pd_vehicle_car_operable",
        question:
          "Count the number of operable cars parked on the street or in driveways:",
      },
      {
        col: "pd_vehicle_car_inoperable",
        question:
          "Count the number of inoperable cars parked on the street or in driveways:",
      },
      {
        col: "pd_vehicle_front_yard",
        question: "Count the number of vehicles in front yards:",
      },
      {
        col: "pd_vehicle_commercial",
        question: "Count the number of commercial vehicles parked in the street:",
      },
      {
        col: "pd_vehicle_trailer",
        question: "Count the number of trailers parked in the street:",
      },
      {
        col: "pd_vehicle_boat",
        question: "Count the number of boats parked in the street:",
      },
    ],
    housing_dq: [
      {
        col: "housing_standing_structure",
        question:
          "Count the number of structures not burned down or otherwise semidemolished, including vacant and occupied structures:",
      },
      {
        col: "housing_attached",
        question:
          "Count the number of attached or semi-detached houses, including rowhouses, townhouses, etc.:",
      },
      {
        col: "housing_apartment",
        question: "Count the number of apartment buildings or complexes:",
      },
      {
        col: "housing_single_family",
        question: "Count the number of single family, free standing homes:",
      },
      {
        col: "housing_multiple_units",
        question: "Count the number of houses with evidence of multiple units:",
      },
      {
        col: "housing_public_housing",
        question: "Count the number of buildings designated as public housing:",
      },
      {
        col: "housing_senior_housing",
        question: "Count the number of buildings designated as senior housing:",
      },
      {
        col: "housing_assisted_living",
        question: "Count the number of assisted living facilities:",
      },
      {
        col: "housing_continuous_care",
        question: "Count the number of continuous care facilities:",
      },
      {
        col: "housing_group_home",
        question:
          "Count the number of group homes, including halfway houses, intermediate care facilities, etc.:",
      },
    ],
    public_services_dq: [
      {
        col: "ps_fire_station",
        question: "Count the number of fire stations:",
      },
      {
        col: "ps_police_station",
        question: "Count the number of police stations:",
      },
      {
        col: "ps_jail_or_prison",
        question: "Count the number of jails or prisons:",
      },
      {
        col: "ps_public_library",
        question: "Count the number of public libraries:",
      },
      {
        col: "ps_municipal_building",
        question: "Count the number of municipal buildings:",
      },
      {
        col: "ps_public_park_sign",
        question: "Count the number of park signs:",
      },
      {
        col: "ps_public_park_condition",
        question: "What is the condition of the parks?",
      },
      {
        col: "ps_bike_trails",
        question: "Count the number of off-road bike trails:",
      },
      {
        col: "ps_centers",
        question:
          "Count the number of community, senior, and recreation centers:",
      },
      {
        col: "ps_vfw_american_legion",
        question: "Count the number of VFW or American Legion Halls:",
      },
      {
        col: "ps_soup_kitchen",
        question: "Count the number of soup kitchens:",
      },
      {
        col: "ps_shelter",
        question: "Count the number of homeless or women's shelters:",
      },
      {
        col: "ps_historic",
        question: "Count the number of historic sites or public monuments:",
      },
    ],
    public_transit_dq: [
      {
        col: "pt_metro_station",
        question: "Count the number of metro stations:",
      },
      { col: "pt_bike_lane", question: "Count the number of bike lanes:" },
      { col: "pt_bike_rack", question: "Count the number of bike racks:" },
      {
        col: "pt_bike_share",
        question: "Count the number of bike share stations",
      },
      {
        col: "pt_rideshare",
        question: "Count the number of ride-share or park-and-ride lots:",
      },
      {
        col: "pt_taxi",
        question: "Count the number of taxi (conventional or Uber/Lyft-type):",
      },
      {
        col: "pt_bus_shelter_bench",
        question:
          "Count the number of bus stops with both a bench and a shelter:",
      },
      {
        col: "pt_bus_bench",
        question: "Count the number of bus stops with a bench and no shelter:",
      },
      {
        col: "pt_bus_shelter",
        question: "Count the number of bus stops with a shelter but no bench:",
      },
      {
        col: "pt_bus_no_shelter_no_bench",
        question:
          "Count the number of bus stops with neither a shelter nor a bench:",
      },
      {
        col: "pt_bus_bench_condition",
        question:
          "What is the condition of the bus stop benches (if none, select N/A):",
      },
      {
        col: "pt_bus_shelter_condition",
        question:
          "What is the condition of the bus stop shelters (if none, select N/A):",
      },
      {
        col: "pt_bus_stop_clarity",
        question: "How clearly are the bus stops marked:",
      },
    ],
    health_dq: [
      {
        col: "hlth_dentist",
        question: "Count the number of dentists' offices:",
      },
      {
        col: "hlth_doctor",
        question: "Count the number of medical clinics or doctors' offices:",
      },
      {
        col: "hlth_pharmacy",
        question:
          "Count the number of pharmacies, including those in grocery and drug stores:",
      },
      {
        col: "hlth_rehab",
        question: "Count the number of rehab/detox facilites:",
      },
      {
        col: "hlth_dialysis",
        question: "Count the number of dialysis facilities:",
      },
      { col: "hlth_hospital", question: "Count the number of hospitals:" },
    ],
};