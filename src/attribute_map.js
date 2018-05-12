
export let attributeMap = [

  /*
  ==========================================
                   WEAPONS
  ==========================================
  */
  {
    name: "Weapon Range",
    label: "Range",
    value: "1",
    template: "+{}%",
    color: "#a6cee3"
  }, {
    name: "Laser Duration",
    label: "Laser Duration",
    value: "3.75",
    template: "-{}%",
    color: "#1f78b4"
  }, {
    name: "Weapon Velocity",
    label: "Velocity",
    value: "3",
    template: "+{}%",
    color: "#e31a1c"
  }, {
    name: "Weapon Cooldown",
    label: "Cooldown",
    value: "0.75",
    template: "-{}%",
    color: "#33a02c"
  }, {
    name: "Missile Crit Damage",
    label: "High Explosive",
    value: "7.5",
    template: "+{}%",
    color: "#fb9a99"
  }, {
    name: "Gauss Held Time",
    label: "Gauss Charge",
    value: "0.75",
    template: "+{} sec.",
    color: "#cab2d6"
  }, {
    name: "Weapon Heat Gen",
    label: "Heat Gen",
    value: "0.75",
    template: "-{}%",
    color: "#fdbf6f",
    chassisValues: {
      light: {
        'I.S.': '0.75',
        Clan: '0.6'
      },
      medium: {
        'I.S.': '0.75',
        clan: '0.6'
      },
      heavy: {
        'I.S.': '0.75',
        clan: '0.6'
      },
      assault: {
        'I.S.': '0.75',
        clan: '0.6'
      },
    }
  }, {
    name: "Ballistic Ammo",
    label: "Magazine Capacity",
    value: "8",
    template: "+{}",
    color: "#ff7f00"
  }, {
    name: "Missile Ammo",
    label: "Missile Rack",
    value: "1",
    template: "+{}",
    color: "#b15928"
  }, {
    name: "Missile Spread",
    label: "Missile Spread",
    value: "2.5",
    template: "+{}%",
    color: "#6a3d9a"
  }, {
    name: "LBX Spread",
    label: "LBX Spread",
    value: "5",
    template: "-{}%",
    color: "#ffff99"
  }, {
    name: "Enhanced UAC / RAC",
    label: "Enhanced UAC",
    value: "2.5",
    template: "-{}%",
    color: "#b2df8a"
  }, {
    name: "Flamer Ventilation",
    label: "Flamer Ventilation",
    value: "7.5",
    template: "-{}%",
    color: "#ffff99"
  },
  /*
  ==========================================
                  SURVIVAL
  ==========================================
  */
  {
    name: "Armor",
    label: "Armor Hardening",
    value: "1.6",
    template: "+{}%",
    color: "#e41a1c",
  }, {
    name: "AMS Effectiveness",
    label: "AMS Overload",
    value: "0.75",
    template: "+{}%",
    color: "#377eb8"
  }, {
    name: "Crit Chance Received",
    label: "Reinforced Casing",
    value: "1",
    template: "-{}%",
    color: "#4daf4a"
  }, {
    name: "Internal Structure",
    label: "Skeletal Density",
    value: "3.1",
    template: "+{}%",
    color: "#984ea3"
  }, {
    name: "Fall Damage",
    label: "Shock Absorbtion",
    value: "10",
    template: "-{}%",
    color: "#ff7f00"
  },
  /*
  ==========================================
                    MOBiLITY
  ==========================================
  */
  {
    name: "Acceleration",
    label: "Kinetic Burst",
    value: "3.5",
    template: "+{}%",
    color: "#e41a1c"
  }, {
    name: "Deceleration",
    label: "Hard Brake",
    value: "3.5",
    template: "+{}%",
    color: "#377eb8"
  }, {
    name: "Max Torso Inclination",
    label: "Torso Pitch",
    value: "2",
    template: "+{}%",
    color: "#4daf4a"
  }, {
    name: "Max Arm Inclination",
    label: "",
    value: "",
    template: "+{}%",
    color: "#984ea3"
  }, {
    name: "Torso Twist Speed",
    label: "Torso Speed",
    value: "3.5",
    template: "+{}%",
    color: "#ff7f00"
  }, {
    name: "Max Torso Twist",
    label: "Torso Yaw",
    value: "2",
    template: "+{}%",
    color: "#ffff33"
  }, {
    name: "Turn Speed",
    label: "Anchor Turn",
    value: "5",
    template: "+{}%",
    color: "#a65628"
  }, {
    name: "Max Speed",
    label: "Speed Tweak",
    value: "1.5",
    template: "+{}%",
    color: "#f781bf"
  },
  /*
  ==========================================
                  JUMP JETS
  ==========================================
  */
  {
    name: "Jump Jet Heat Reduction",
    label: "Heat Shielding",
    value: "6",
    template: "-{}%",
    color: "#e41a1c"
  }, {
    name: "Jump Jet Initial Boost",
    label: "Lift Speed",
    value: "3",
    template: "+{}%",
    color: "#377eb8"
  }, {
    name: "Jump Jet Forward Thrust",
    label: "Vectoring",
    value: "25",
    template: "+{}%",
    color: "#4daf4a"
  }, {
    name: "Jump Jet Burn Time",
    label: "Vent Calibration",
    value: "3",
    template: "+{}%",
    color: "#984ea3"
  },
  /*
  ==========================================
                 OPERATIONS
  ==========================================
  */
  {
    name: "Startup Speed",
    label: "Quick Ignition",
    value: "7",
    template: "-{}%",
    color: "#e41a1c"
  }, {
    name: "Legged Speed",
    label: "Speed Retention",
    value: "10",
    template: "+{}%",
    color: "#377eb8"
  }, {
    name: "Heat Capacity",
    label: "Heat Containment",
    value: "3",
    template: "+{}%",
    color: "#4daf4a"
  }, {
    name: "Hill Climb",
    label: "Hill Climb",
    value: "5",
    template: "+{}%",
    color: "#984ea3"
  }, {
    name: "Heat Dissipation",
    label: "Cool Run",
    value: "2",
    template: "+{}%",
    color: "#ff7f00"
  }, {
    name: "Tastier Gyros",
    label: "Improved Gyros",
    value: "17.5",
    template: "-{}%",
    color: "#ffff33"
  },
  /*
  ==========================================
                   SENSORS
  ==========================================
  */
  {
    name: "Target Info Speed",
    label: "Target Info Gathering",
    value: "7",
    template: "+{}%",
    color: "#e41a1c"
  }, {
    name: "Target Retention",
    label: "Target Retention",
    value: "200",
    template: "+{} m.",
    color: "#377eb8"
  }, {
    name: "Sensor Range",
    label: "Sensor Range",
    value: "7",
    template: "+{}%",
    color: "#4daf4a"
  }, {
    name: "Target Lock Decay",
    label: "Target Decay",
    value: "0.7",
    template: "+{} sec.",
    color: "#984ea3"
  }, {
    name: "Zoom Magnifier",
    label: "Advanced Zoom",
    value: "1",
    template: "+{}",
    color: "#ff7f00"
  }, {
    name: "Radar Deprivation",
    label: "Radar Deprivation",
    value: "20",
    template: "+{}%",
    color: "#ffff33"
  }, {
    name: "Seismic Sensor",
    label: "Seismic Sensor",
    value: "100",
    template: "{} m.",
    color: "#a65628"
  }, {
    name: "Enhanced ECM Systems",
    label: "Enhanced ECM",
    value: "22.5",
    template: "+{}%",
    color: "#f781bf"
  },
  /*
  ==========================================
                  AUXILIARY
  ==========================================
  */
  {
    name: "UAV Duration",
    label: "UAV Duration",
    value: "10",
    template: "+{} sec.",
    color: "#1f78b4"
  }, {
    name: "UAV Sight Range",
    label: "UAV Range",
    value: "20",
    template: "+{}%",
    color: "#777777"
  }, {
    name: "Artillery Strike Duration",
    label: "Advanced Salvos",
    value: "15",
    template: "+{}%",
    color: "#33a02c"
  }, {
    name: "Coolshot Effectiveness",
    label: "Enhanced Coolshot",
    value: "15",
    template: "+{}%",
    color: "#fb9a99"
  }, {
    name: "UAV Capacity",
    label: "Extra UAV",
    value: "1",
    template: "+{}",
    color: "#e31a1c"
  }, {
    name: "Point Capture Speed",
    label: "Capture Assist",
    value: "5",
    template: "+{}%",
    color: "#b15928"
  }, {
    name: "NARC Velocity and Duration",
    label: "Enhanced NARC",
    value: "10",
    template: "+{}%",
    color: "#ff7f00"
  }, {
    name: "Additional Air / Arty Strike",
    label: "Expanded Reserves",
    value: "1",
    template: "+{}",
    color: "#cab2d6"
  }, {
    name: "Air / Arty Strike Accuracy",
    label: "Enhanced Spotting",
    value: "20",
    template: "-{}%",
    color: "#fdbf6f"
  }, {
    name: "Additional Consumable Slot",
    label: "Consumable Slot",
    value: "1",
    template: "+{}",
    color: "#ffff99"
  }, {
    name: "Coolant Reserves",
    label: "Coolant Reserves",
    value: "1",
    template: "+{}",
    color: "#6a3d9a"
  }, {
    name: "Coolshot Cooldown",
    label: "Coolant Cooldown",
    value: "25",
    template: "-{}%",
    color: "#b2df8a"
  }
]
