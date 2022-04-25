export type Timespan = {
  name: string;
  type: string;
  length: number;
  interval: number;
  offset: number;
  index?: number;
};

export type Moon = {
  name: string;
  cycle: string;
  cycle_rounding: string;
  shift: number;
  granularity: number;
  color: string;
  shadow_color: string;
  hidden: boolean;
  desciption: string;
  svg: string;
};

export type Season = {
  name: string;
  color: string[] | string;
  time: {
    sunrise: { hour: number; minute: number };
    sunset: { hour: number; minute: number };
  };
  timespan: number;
  day: number;
  gradient?: { start: number[]; end: number[] };
  season_name?: string;
  season_index?: number;
  season_perc?: number;
  season_precise_perc?: number;
  season_day?: number;
  high_solstice?: false;
  low_solstice?: false;
  falling_equinox?: false;
  rising_equinox?: false;
};

export type Era = {
  name: string;
  formatting: string;
  description: string;
  settings: {
    use_custom_format: boolean;
    show_as_event: boolean;
    starting_era: boolean;
    ends_year: boolean;
    restart: boolean;
  };
  date: { year: number; timespan: number; day: number; epoch: number };
  index?: number;
};

export type Event = {
  id: number;
  name: string;
  data: {
    has_duration: false;
    duration: number;
    show_first_last: false;
    limited_repeat: false;
    limited_repeat_num: number;
    connected_events: [];
    date: number[];
    search_distance: number;
    overrides: { moons: [] };
  };
  description: '';
  event_category_id: null;
  calendar_id: number;
  settings: {
    color: string;
    text: string;
    hide: false;
    print: false;
    hide_full: false;
  };
  created_at: string;
  updated_at: string;
  sort_by: number;
  creator_id: number;
};

export type Weather = {
  temperature: {
    imperial: {
      actual: number;
      value: number[];
      low: string;
      high: string;
    };
    metric: {
      actual: string;
      value: number[];
      low: string;
      high: string;
    };
    cinematic: string;
  };
  precipitation: {
    key: string;
    chance: string;
    actual: number;
    intensity: string;
  };
  clouds: string;
  feature: '';
  wind_speed: string;
  wind_speed_desc: string;
  wind_velocity: { imperial: string; knots: string };
  wind_direction: string;
  weather_icon_class: string;
};

export type Epoch = {
  static_data: {
    year_data: {
      first_day: number;
      overflow: boolean;
      global_week: string[];
      timespans: Timespan[];
    };
    moons: Moon[];
    clock: {
      enabled: boolean;
      render: boolean;
      hours: number;
      minutes: number;
      offset: number;
      crowding: number;
    };
    seasons: {
      data: Season[];
      locations: [];
      global_settings: {
        season_offset: number;
        weather_offset: number;
        seed: number;
        temp_sys: string;
        wind_sys: string;
        cinematic: boolean;
        enable_weather: boolean;
        periodic_seasons: boolean;
        color_enabled: boolean;
        preset_order: number[];
      };
    };
    eras: Era[];
    settings: {
      layout: string;
      comments: string;
      show_current_month: boolean;
      allow_view: boolean;
      only_backwards: boolean;
      only_reveal_today: boolean;
      hide_moons: boolean;
      hide_clock: boolean;
      hide_events: boolean;
      hide_eras: boolean;
      hide_all_weather: boolean;
      hide_future_weather: boolean;
      add_month_number: boolean;
      add_year_day_number: boolean;
      default_category: number;
    };
    cycles: { format: string; data: [] };
  };
  year: number;
  timespan: Timespan;
  day: number;
  epoch: number;
  custom_location: false;
  location: string;
  current_era: Era;
  hour: number;
  minute: number;
  era_year: number;
  timespan_index: number;
  timespan_number: number;
  timespan_count: number;
  num_timespans: number;
  timespan_name: string;
  inverse_day: number;
  year_day: number;
  week_day: number;
  week_day_name: string;
  inverse_month_week_num: number;
  inverse_year_week_num: number;
  month_week_num: number;
  year_week_num: number;
  total_week_num: number;
  moon_phase: number[];
  moon_phase_num_epoch: number[];
  moon_phase_num_month: number[];
  moon_phase_num_year: number[];
  intercalary: false;
  era: number;
  cycle: [];
  week_day_num: number;
  inverse_week_day_num: number;
  season: Season;
  weather: Weather;
  moons: Moon[];
  events: Event[];
};
