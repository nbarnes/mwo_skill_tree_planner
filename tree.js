// First element of the nodes array MUST be the root node of the skll graph

let treeSource = [
  {
  /*
  ==========================================
                   WEAPONS
  ==========================================
  */
    name: "Weapons",
    nodes: [
      { name: "Range 1",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        leftChildId: "laser-duration-1",
        rightChildId: "velocity-1"
      },
      { name: "Laser Duration 1",
        attribute: "Laser Duration",
        value: "1.5",
        leftChildId: "laser-duration-2",
        rightChildId: "range-2"
      },
      { name: "Velocity 1",
        attribute: "Shot Velocity",
        value: "4",
        leftChildId: "range-2",
        rightChildId: "velocity-2"
      },
      { name: "Laser Duration 2",
        attribute: "Laser Duration",
        value: "1.5",
        leftChildId: "range-3",
        centerChildId: "laser-duration-3"
      },
      { name: "Range 2",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        centerChildId: "high-explosive-1"
      },
      { name: "Velocity 2",
        attribute: "Shot Velocity",
        value: "4",
        centerChildId: "velocity-3",
        rightChildId: "cooldown-1"
      },
      { name: "Range 3",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        leftChildId: "cooldown-2"
      },
      { name: "Cooldown 1",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "velocity-3",
        rightChildId: "gauss-charge-1"
      },
      { name: "Cooldown 2",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "heat-gen-1"
      },
      { name: "Laser Duration 3",
        attribute: "Laser Duration",
        value: "1.5",
        leftChildId: "cooldown-3",
        centerChildId: "laser-duration-4",
        rightChildId: "cooldown-4"
      },
      { name: "High Explosive 1",
        attribute: "High Explosive",
        value: "3",
        leftChildId: "cooldown-4",
        rightChildId: "velocity-4"
      },
      { name: "Velocity 3",
        attribute: "Shot Velocity",
        value: "4",
        leftChildId: "velocity-4",
        rightChildId: "cooldown-5"
      },
      { name: "Gauss Charge 1",
        attribute: "Gauss Charge",
        value: "0.25",
        rightChildId: "gauss-charge-2"
      },
      { name: "Heat Gen 1",
        attribute: "Heat Generation",
        value: "1"
      },
      { name: "Cooldown 3",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "heat-gen-2"
      },
      { name: "Cooldown 4",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "laser-duration-4",
        rightChildId: "missile-rack-1"
      },
      { name: "Velocity 4",
        attribute: "Shot Velocity",
        value: "4",
        leftChildId: "missile-rack-1",
        rightChildId: "heat-gen-3"
      },
      { name: "Cooldown 5",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "heat-gen-3",
        rightChildId: "magazine-capacity-1"
      },
      { name: "Gauss Charge 2",
        attribute: "Gauss Charge",
        value: "0.25",
        leftChildId: "magazine-capacity-1",
        rightChildId: "gauss-charge-3"
      },
      { name: "Heat Gen 2",
        attribute: "Heat Generation",
        value: "1",
        rightChildId: "laser-duration-5"
      },
      { name: "Laser Duration 4",
        attribute: "Laser Duration",
        value: "1.5",
        leftChildId: "laser-duration-5"
      },
      { name: "Missile Rack 1",
        attribute: "Missile Rack",
        value: "1",
        leftChildId: "missile-spread-1",
        rightChildId: "missile-spread-2"
      },
      { name: "Heat Gen 3",
        attribute: "Heat Generation",
        value: "1",
        rightChildId: "range-4"
      },
      { name: "Magazine Capacity 1",
        attribute: "Magazine Capacity",
        value: "8",
        leftChildId: "range-4",
        rightChildId: "range-5"
      },
      { name: "Gauss Charge 3",
        attribute: "Gauss Charge",
        value: "0.25",
        rightChildId: "gauss-charge-4"
      },
      { name: "Laser Duration 5",
        attribute: "Laser Duration",
        value: "1.5",
        leftChildId: "cooldown-6",
        rightChildId: "cooldown-9"
      },
      { name: "Missile Spread 1",
        attribute: "Missile Spread",
        value: "1.5",
        leftChildId: "cooldown-9",
        centerChildId: "heat-gen-5",
        rightChildId: "cooldown-7"
      },
      { name: "Missile Spread 2",
        attribute: "Missile Spread",
        value: "1.5",
        leftChildId: "cooldown-7",
        centerChildId: "heat-gen-6",
        rightChildId: "velocity-5"
      },
      { name: "Range 4",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        leftChildId: "velocity-5",
        centerChildId: "gauss-charge-5",
        rightChildId: "heat-gen-4"
      },
      { name: "Range 5",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        leftChildId: "heat-gen-4",
        rightChildId: "cooldown-8"
      },
      { name: "Gauss Charge 4",
        attribute: "Gauss Charge",
        value: "0.25",
        leftChildId: "cooldown-8"
      },
      { name: "Cooldown 6",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "laser-duration-6"
      },
      { name: "Cooldown 9",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "heat-gen-7",
        rightChildId: "heat-gen-5"
      },
      { name: "Cooldown 7",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "heat-gen-5",
        rightChildId: "heat-gen-6"
      },
      { name: "Velocity 5",
        attribute: "Shot Velocity",
        value: "4",
        leftChildId: "heat-gen-6",
        rightChildId: "gauss-charge-5"
      },
      { name: "Heat Gen 4",
        attribute: "Heat Generation",
        value: "1",
        leftChildId: "gauss-charge-5",
        rightChildId: "range-7"
      },
      { name: "Cooldown 8",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "range-7",
        rightChildId: "lbx-spread-1"
      },
      { name: "Laser Duration 6",
        attribute: "Laser Duration",
        value: "1.5",
        rightChildId: "laser-duration-7"
      },
      { name: "Heat Gen 7",
        attribute: "Heat Generation",
        value: "1",
        leftChildId: "laser-duration-7",
        rightChildId: "high-explosive-2"
      },
      { name: "Heat Gen 5",
        attribute: "Heat Generation",
        value: "1",
        leftChildId: "high-explosive-2",
        centerChildId: "range-8",
        rightChildId: "missile-spread-3"
      },
      { name: "Heat Gen 6",
        attribute: "Heat Generation",
        value: "1",
        leftChildId: "missile-spread-3",
        centerChildId: "range-9",
        rightChildId: "high-explosive-3"
      },
      { name: "Gauss Charge 5",
        attribute: "Gauss Charge",
        value: "0.25",
        leftChildId: "high-explosive-3",
        centerChildId: "lbx-spread-3",
        rightChildId: "lbx-spread-2"
      },
      { name: "Range 7",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        leftChildId: "lbx-spread-2",
        rightChildId: "magazine-capacity-2"
      },
      { name: "LBX Spread 1",
        attribute: "LBX Spread",
        value: "2",
        leftChildId: "magazine-capacity-2"
      },
      { name: "Laser Duration 7",
        attribute: "Laser Duration",
        value: "1.5",
        leftChildId: "laser-duration-9",
        rightChildId: "laser-duration-8"
      },
      { name: "High Explosive 2",
        attribute: "High Explosive",
        value: "3",
        leftChildId: "laser-duration-8",
        rightChildId: "range-8"
      },
      { name: "Missile Spread 3",
        attribute: "Missile Spread",
        value: "1.5",
        leftChildId: "range-8",
        rightChildId: "range-9"
      },
      { name: "High Explosive 3",
        attribute: "High Explosive",
        value: "3",
        leftChildId: "range-9",
        rightChildId: "lbx-spread-3"
      },
      { name: "LBX Spread 2",
        attribute: "LBX Spread",
        value: "2",
        leftChildId: "lbx-spread-3",
        rightChildId: "range-10"
      },
      { name: "Magazine Capacity 2",
        attribute: "Magazine Capacity",
        value: "8",
        leftChildId: "range-10",
        rightChildId: "uac-jam-chance-1"
      },
      { name: "Laser Duration 9",
        attribute: "Laser Duration",
        value: "1.5",
        rightChildId: "range-6"
      },
      { name: "Laser Duration 8",
        attribute: "Laser Duration",
        value: "1.5",
        leftChildId: "range-6",
        rightChildId: "missile-spread-4"
      },
      { name: "Range 8",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        leftChildId: "missile-spread-4",
        centerChildId: "high-explosive-4"
      },
      { name: "Range 9",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        centerChildId: "high-explosive-5",
        rightChildId: "missile-spread-5"
      },
      { name: "LBX Spread 3",
        attribute: "LBX Spread",
        value: "2",
        leftChildId: "missile-spread-5",
        centerChildId: "lbx-spread-4",
        rightChildId: "cooldown-10"
      },
      { name: "Range 10",
        attribute: "Weapon Optimal Range",
        value: "1,5",
        leftChildId: "cooldown-10",
        rightChildId: "cooldown-11"
      },
      { name: "UAC Jam Chance 1",
        attribute: "UAC Jam Chance",
        value: "1",
        leftChildId: "cooldown-11"
      },
      { name: "Range 6",
        attribute: "Weapon Optimal Range",
        value: "1.5",
        leftChildId: "heat-gen-8",
        rightChildId: "laser-duration-10"
      },
      { name: "Missile Spread 4",
        attribute: "Missile Spread",
        value: "1.5",
        leftChildId: "laser-duration-10",
        rightChildId: "high-explosive-4"
      },
      { name: "Missile Spread 5",
        attribute: "Missile Spread",
        value: "1.5",
        leftChildId: "high-explosive-5",
        rightChildId: "lbx-spread-4"
      },
      { name: "Cooldown 10",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "lbx-spread-4",
        rightChildId: "uac-jam-chance-2"
      },
      { name: "Cooldown 11",
        attribute: "Weapons Cooldown",
        value: "0.8",
        leftChildId: "uac-jam-chance-2",
        rightChildId: "uac-jam-chance-3"
      },
      { name: "Heat Gen 8",
        attribute: "Heat Generation",
        value: "1"
      },
      { name: "Laser Duration 10",
        attribute: "Laser Duration",
        value: "1.5"
      },
      { name: "High Explosive 4",
        attribute: "High Explosive",
        value: "3",
        rightChildId: "missile-rack-2"
      },
      { name: "High Explosive 5",
        attribute: "High Explosive",
        value: "3",
        leftChildId: "missile-rack-2"
      },
      { name: "LBX Spread 4",
        attribute: "LBX Spread",
        value: "2",
        leftChildId: "lbx-spread-5",
        rightChildId: "uac-jam-chance-4"
      },
      { name: "UAC Jam Chance 2",
        attribute: "UAC Jam Chance",
        value: "1",
        leftChildId: "uac-jam-chance-4",
        rightChildId: "uac-jam-chance-5"
      },
      { name: "UAC Jam Chance 3",
        attribute: "UAC Jam Chance",
        value: "1",
        leftChildId: "uac-jam-chance-5"
      },
      { name: "Missile Rack 2",
        attribute: "Missile Rack",
        value: "1"
      },
      { name: "LBX Spread 5",
        attribute: "LBX Spread",
        value: "2"
      },
      { name: "UAC Jam Chance 4",
        attribute: "UAC Jam Chance",
        value: "1"
      },
      { name: "UAC Jam Chance 5",
        attribute: "UAC Jam Chance",
        value: "1"
      }
    ]
  },
  /*
  ==========================================
                  SURVIVAL
  ==========================================
  */
  {
    name: 'Survival',
    nodes: [
      { name: "Reinforced Casing 1",
        attribute: "Reinforced Casing",
        value: "1",
        leftChildId: "ams-overload-1",
        rightChildId: "shock-absorbance-1"
      },
      { name: "AMS Overload 1",
        attribute: "AMS Effectiveness",
        value: "1.25",
        centerChildId: "shock-absorbance-2",
        rightChildId: "skeletal-density-1"
      },
      { name: "Shock Absorbance 1",
        attribute: "Impact Reduction",
        value: "10",
        leftChildId: "skeletal-density-1",
        centerChildId: "reinforced-casing-2"
      },
      { name: "Skeletal Density 1",
        attribute: "Internal Structure",
        value: "5.2",
        centerChildId: "shock-absorbance-2",
        rightChildId: "reinforced-casing-2"
      },
      { name: "Shock Absorbance 2",
        attribute: "Impact Reduction",
        value: "10",
        leftChildId: "shock-absorbance-3",
        centerChildId: "reinforced-casing-3"
      },
      { name: "Reinforced Casing 2",
        attribute: "Reinforced Casing",
        value: "1",
        centerChildId: "ams-overload-2",
        rightChildId: "skeletal-density-2"
      },
      { name: "Shock Absorbance 3",
        attribute: "Impact Reduction",
        value: "10",
        leftChildId: "armor-hardening-1",
        centerChildId: "skeletal-density-3",
        rightChildId: "reinforced-casing-3"
      },
      { name: "Skeletal Density 2",
        attribute: "Recoil Reduction",
        value: "5.2",
        leftChildId: "ams-overload-2",
        centerChildId: "reinforced-casing-4",
        rightChildId: "armor-hardening-2"
      },
      { name: "Armor Hardening 1",
        attribute: "Armor",
        value: "3.2",
        rightChildId: "skeletal-density-3"
      },
      { name: "Reinforced Casing 3",
        attribute: "Reinforced Casing",
        value: "1",
        leftChildId: "skeletal-density-3",
        centerChildId: "shock-absorbance-4",
        rightChildId: "armor-hardening-3"
      },
      { name: "AMS Overload 2",
        attribute: "AMS Effectiveness",
        value: "1.25",
        leftChildId: "armor-hardening-3",
        centerChildId: "shock-absorbance-5",
        rightChildId: "reinforced-casing-4"
      },
      { name: "Armor Hardening 2",
        attribute: "Armor",
        value: "3.2",
        leftChildId: "reinforced-casing-4"
      },
      { name: "Skeletal Density 3",
        attribute: "Internal Structure",
        value: "5.2",
        rightChildId: "shock-absorbance-4"
      },
      { name: "Armor Hardening 3",
        attribute: "Armor",
        value: "3.2",
        leftChildId: "shock-absorbance-4",
        rightChildId: "shock-absorbance-5"
      },
      { name: "Reinforced Casing 4",
        attribute: "Armor",
        value: "1",
        leftChildId: "shock-absorbance-5"
      },
      { name: "Shock Absorbance 4",
        attribute: "Impact Reduction",
        value: "10",
        leftChildId: "skeletal-density-4",
        rightChildId: "reinforced-casing-5"
      },
      { name: "Shock Absorbance 5",
        attribute: "Impact Reduction",
        value: "10",
        leftChildId: "reinforced-casing-5",
        rightChildId: "skeletal-density-5"
      },
      { name: "Skeletal Density 4",
        attribute: "Internal Structure",
        value: "5.2"
      },
      { name: "Reinforced Casing 5",
        attribute: "Reinforced Casing",
        value: "1",
        leftChildId: "armor-hardening-4",
        rightChildId: "armor-hardening-5"
      },
      { name: "Skeletal Density 5",
        attribute: "Internal Structure",
        value: "5.2"
      },
      { name: "Armor Hardening 4",
        attribute: "Armor",
        value: "3.2"
      },
      { name: "Armor Hardening 5",
        attribute: "Armor",
        value: "3.2"
      }
    ]
  },
  /*
  ==========================================
                    MOBiLITY
  ==========================================
  */
  {
    name: 'Mobility',
    nodes: [
      { name: "Kinetic Burst 1",
        attribute: "Acceleration",
        value: "10",
        leftChildId: "torso-pitch-1",
        rightChildId: "torso-pitch-2"
      },
      { name: "Torso Pitch 1",
        attribute: "Max Torso Inclination",
        value: "2",
        leftChildId: "arm-pitch-1",
        rightChildId: "hard-brake-1"
      },
      { name: "Torso Pitch 2",
        attribute: "Max Torso Inclination",
        value: "2",
        leftChildId: "hard-brake-1",
        rightChildId: "arm-pitch-2"
      },
      { name: "Arm Pitch 1",
        attribute: "Max Arm Inclination",
        value: "6",
        leftChildId: "torso-speed-1",
        rightChildId: "torso-yaw-1"
      },
      { name: "Hard Brake 1",
        attribute: "Deceleration",
        value: "10",
        leftChildId: "torso-yaw-1",
        rightChildId: "kinetic-burst-2"
      },
      { name: "Arm Pitch 2",
        attribute: "Max Arm Inclination",
        value: "6",
        leftChildId: "kinetic-burst-2",
        rightChildId: "anchor-turn-1"
      },
      { name: "Torso Speed 1",
        attribute: "Torso Twist Speed",
        value: "4",
        rightChildId: "kinetic-burst-3"
      },
      { name: "Torso Yaw 1",
        attribute: "Max Torso Twist",
        value: "2",
        leftChildId: "kinetic-burst-3"
      },
      { name: "Kinetic Burst 2",
        attribute: "Acceleration",
        value: "10",
        rightChildId: "torso-yaw-2"
      },
      { name: "Anchor Turn 1",
        attribute: "Turn Speed",
        value: "6",
        leftChildId: "torso-yaw-2"
      },
      { name: "Kinetic Burst 3",
        attribute: "Acceleration",
        value: "10",
        leftChildId: "torso-yaw-3",
        rightChildId: "hard-brake-2"
      },
      { name: "Torso Yaw 2",
        attribute: "Max Torso Twist",
        value: "2",
        leftChildId: "hard-brake-3",
        rightChildId: "hard-brake-4"
      },
      { name: "Torso Yaw 3",
        attribute: "Max Torso Twist",
        value: "2",
        leftChildId: "torso-speed-2",
        rightChildId: "torso-speed-3"
      },
      { name: "Hard Brake 2",
        attribute: "Deceleration",
        value: "10",
        leftChildId: "torso-speed-3",
        rightChildId: "arm-pitch-3"
      },
      { name: "Hard Brake 3",
        attribute: "Deceleration",
        value: "10",
        leftChildId: "arm-pitch-3",
        rightChildId: "kinetic-burst-4"
      },
      { name: "Hard Brake 4",
        attribute: "Deceleration",
        value: "10",
        leftChildId: "kinetic-burst-4",
        rightChildId: "anchor-turn-2"
      }
    ]
  }
]

let attributeTemplateMap = [
  { attribute: "Weapon Optimal Range",
    template: "+{}%"
  },
  { attribute: "Laser Duration",
    template: "-{}%"
  },
  { attribute: "Shot Velocity",
    template: "+{}%"
  },
  { attribute: "Weapons Cooldown",
    template: "-{}%"
  },
  { attribute: "High Explosive",
    template: "+{}%"
  },
  { attribute: "Gauss Charge",
    template: "+{}"
  },
  { attribute: "Armor",
    template: "+{}%"
  },
  { attribute: "AMS Effectiveness",
    template: "+{}%"
  },
  { attribute: "Recoil Reduction",
    template: "-{}%"
  },
  { attribute: "Heat Generation",
    template: "-{}%"
  },
  { attribute: "Magazine Capacity",
    template: "+{}"
  },
  { attribute: "Missile Rack",
    template: "+{}"
  },
  { attribute: "Missile Spread",
    template: "+{}%"
  },
  { attribute: "LBX Spread",
    template: "-{}%"
  },
  { attribute: "UAC Jam Chance",
    template: "-{}%"
  },
  { attribute: "Reinforced Casing",
    template: "-{}%"
  },
  { attribute: "Impact Reduction",
    template: "-{}%"
  },
  { attribute: "Internal Structure",
    template: "+{}%"
  },
  { attribute: "Acceleration",
    template: "+{}%"
  },
  { attribute: "Deceleration",
    template: "+{}%"
  },
  { attribute: "Max Torso Inclination",
    template: "+{}%"
  },
  { attribute: "Max Arm Inclination",
    template: "+{}%"
  },
  { attribute: "Torso Twist Speed",
    template: "+{}%"
  },
  { attribute: "Max Torso Twist",
    template: "+{}%"
  },
  { attribute: "Turn Speed",
    template: "+{}%"
  }
]
