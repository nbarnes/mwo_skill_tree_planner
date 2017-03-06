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
        attribute: "Reinforced Casing",
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
      },
      { name: "Torso Speed 2",
        attribute: "Torso Twist Speed",
        value: "4",
        rightChildId: "torso-yaw-4"
      },
      { name: "Torso Speed 3",
        attribute: "Torso Twist Speed",
        value: "4",
        rightChildId: "torso-pitch-3"
      },
      { name: "Arm Pitch 3",
        attribute: "Max Arm Inclination",
        value: "6",
        leftChildId: "torso-pitch-3",
        rightChildId: "torso-pitch-4"
      },
      { name: "Kinetic Burst 4",
        attribute: "Acceleration",
        value: "10",
        leftChildId: "torso-pitch-4"
      },
      { name: "Anchor Turn 2",
        attribute: "Turn Speed",
        value: "6",
        leftChildId: "torso-speed-4"
      },
      { name: "Torso Yaw 4",
        attribute: "Max Torso Twist",
        value: "2",
        rightChildId: "torso-pitch-5"
      },
      { name: "Torso Pitch 3",
        attribute: "Max Torso Inclination",
        value: "2",
        leftChildId: "torso-pitch-5"
      },
      { name: "Torso Pitch 4",
        attribute: "Max Torso Inclination",
        value: "2",
        rightChildId: "hard-brake-5"
      },
      { name: "Torso Speed 4",
        attribute: "Torso Twist Speed",
        value: "4",
        leftChildId: "hard-brake-5"
      },
      { name: "Torso Pitch 5",
        attribute: "Max Torso Inclination",
        value: "2",
        leftChildId: "anchor-turn-3",
        rightChildId: "torso-yaw-5"
      },
      { name: "Hard Brake 5",
        attribute: "Deceleration",
        value: "10",
        leftChildId: "kinetic-burst-5",
        rightChildId: "anchor-turn-4"
      },
      { name: "Anchor Turn 3",
        attribute: "Turn Speed",
        value: "6",
        rightChildId: "arm-pitch-4"
      },
      { name: "Torso Yaw 5",
        attribute: "Max Torso Twist",
        value: "2",
        leftChildId: "arm-pitch-4"
      },
      { name: "Kinetic Burst 5",
        attribute: "Acceleration",
        value: "10",
        rightChildId: "arm-pitch-5"
      },
      { name: "Anchor Turn 4",
        attribute: "Turn Speed",
        value: "6",
        leftChildId: "arm-pitch-5"
      },
      { name: "Arm Pitch 4",
        attribute: "Max Arm Inclination",
        value: "6",
        leftChildId: "speed-tweak-1",
        centerChildId: "torso-speed-5"
      },
      { name: "Arm Pitch 5",
        attribute: "Max Arm Inclination",
        value: "6",
        centerChildId: "anchor-turn-5",
        rightChildId: "speed-tweak-2"
      },
      { name: "Speed Tweak 1",
        attribute: "Max Speed",
        value: "1.5",
        rightChildId: "torso-speed-5"
      },
      { name: "Speed Tweak 2",
        attribute: "Max Speed",
        value: "1.5",
        leftChildId: "anchor-turn-5"
      },
      { name: "Torso Speed 5",
        attribute: "Torso Twist Speed",
        value: "4",
        rightChildId: "speed-tweak-3"
      },
      { name: "Anchor Turn 5",
        attribute: "Turn Speed",
        value: "6",
        leftChildId: "speed-tweak-4"
      },
      { name: "Speed Tweak 3",
        attribute: "Max Speed",
        value: "1.5",
        rightChildId: "speed-tweak-5"
      },
      { name: "Speed Tweak 4",
        attribute: "Max Speed",
        value: "1.5",
        leftChildId: "speed-tweak-5"
      },
      { name: "Speed Tweak 5",
        attribute: "Max Speed",
        value: "1.5"
      }
    ]
  },
  /*
  ==========================================
                  JUMP JETS
  ==========================================
  */
  {
    name: "Jump Jets",
    nodes: [
      { name: "Heat Shielding 1",
        attribute: "Jump Jet Heat Reduction",
        value: "6",
        leftChildId: "vent-calibration-1",
        rightChildId: "vectoring-1"
      },
      { name: "Vent Calibration 1",
        attribute: "Jump Jet Energy",
        value: "3",
        centerChildId: "vent-calibration-2",
        rightChildId: "heat-shielding-2"
      },
      { name: "Vectoring 1",
        attribute: "Jump Jet Forward Thrust",
        value: "25",
        leftChildId: "heat-shielding-2",
        centerChildId: "vectoring-2",
        rightChildId: "lift-speed-1"
      },
      { name: "Heat Shielding 2",
        attribute: "Jump Jet Heat Reduction",
        value: "6",
        leftChildId: "vent-calibration-2",
        rightChildId: "vectoring-2"
      },
      { name: "Lift Speed 1",
        attribute: "Jump Jet Vertical Thrust",
        value: "3",
        leftChildId: "vectoring-2"
      },
      { name: "Vent Calibration 2",
        attribute: "Jump Jet Energy",
        value: "3",
        centerChildId: "vent-calibration-3",
        rightChildId: "heat-shielding-3"
      },
      { name: "Vectoring 2",
        attribute: "Jump Jet Forward Thrust",
        value: "25",
        leftChildId: "heat-shielding-3",
        centerChildId: "vectoring-3",
        rightChildId: "lift-speed-2"
      },
      { name: "Heat Shielding 3",
        attribute: "Jump Jet Heat Reduction",
        value: "6",
        leftChildId: "vent-calibration-3",
        rightChildId: "vectoring-3"
      },
      { name: "Lift Speed 2",
        attribute: "Jump Jet Vertical Thrust",
        value: "3",
        leftChildId: "vectoring-3"
      },
      { name: "Vent Calibration 3",
        attribute: "Jump Jet Energy",
        value: "3",
        leftChildId: "lift-speed-3",
        centerChildId: "vent-calibration-4",
        rightChildId: "heat-shielding-4"
      },
      { name: "Vectoring 3",
        attribute: "Jump Jet Forward Thrust",
        value: "25",
        leftChildId: "heat-shielding-4",
        centerChildId: "vectoring-4"
      },
      { name: "Lift Speed 3",
        attribute: "Jump Jet Vertical Thrust",
        value: "3",
        rightChildId: "vent-calibration-4"
      },
      { name: "Heat Shielding 4",
        attribute: "Jump Jet Heat Reduction",
        value: "6",
        leftChildId: "vent-calibration-4",
        rightChildId: "vectoring-4"
      },
      { name: "Vent Calibration 4",
        attribute: "Jump Jet Energy",
        value: "3",
        leftChildId: "lift-speed-4",
        centerChildId: "vent-calibration-5",
        rightChildId: "heat-shielding-5"
      },
      { name: "Vectoring 4",
        attribute: "Jump Jet Forward Thrust",
        value: "25",
        leftChildId: "heat-shielding-5",
        centerChildId: "vectoring-5"
      },
      { name: "Lift Speed 4",
        attribute: "Jump Jet Vertical Thrust",
        value: "3",
        rightChildId: "vent-calibration-5"
      },
      { name: "Heat Shielding 5",
        attribute: "Jump Jet Heat Reduction",
        value: "6",
        leftChildId: "vent-calibration-5",
        rightChildId: "vectoring-5"
      },
      { name: "Vent Calibration 5",
        attribute: "Jump Jet Energy",
        value: "3"
      },
      { name: "Vectoring 5",
        attribute: "Jump Jet Forward Thrust",
        value: "25",
        leftChildId: "lift-speed-5"
      },
      { name: "Lift Speed 5",
        attribute: "Jump Jet Vertical Thrust",
        value: "3"
      },
    ]
  },
  /*
  ==========================================
                 OPERATIONS
  ==========================================
  */
  {
    name: "Operations",
    nodes: [
      { name: "Quick Ignition 1",
        attribute: "Startup Speed",
        value: "7",
        leftChildId: "speed-retention-1",
        rightChildId: "improved-gyros-1"
      },
      { name: "Speed Retention 1",
        attribute: "Speed Retention",
        value: "10",
        centerChildId: "hill-climb-1",
        rightChildId: "heat-containment-1"
      },
      { name: "Improved Gyros 1",
        attribute: "Tastier Gyros",
        value: "12.5",
        leftChildId: "heat-containment-1",
        centerChildId: "quick-ignition-2"
      },
      { name: "Heat Containment 1",
        attribute: "Heat Capacity",
        value: "3",
        leftChildId: "hill-climb-1",
        rightChildId: "quick-ignition-2"
      },
      { name: "Hill Climb 1",
        attribute: "Hill Climb",
        value: "7.5",
        leftChildId: "improved-gyros-2",
        centerChildId: "quick-ignition-3"
      },
      { name: "Quick Ignition 2",
        attribute: "Startup Speed",
        value: "7",
        centerChildId: "improved-gyros-3",
        rightChildId: "heat-containment-2"
      },
      { name: "Improved Gyros 2",
        attribute: "Tastier Gyros",
        value: "12.5",
        leftChildId: "cool-run-1",
        centerChildId: "heat-containment-3"
      },
      { name: "Heat Containment 2",
        attribute: "Heat Capacity",
        value: "3",
        centerChildId: "hill-climb-2",
        rightChildId: "cool-run-2"
      },
      { name: "Cool Run 1",
        attribute: "Heat Dissipation",
        value: "2",
        rightChildId: "heat-containment-3"
      },
      { name: "Quick Ignition 3",
        attribute: "Startup Speed",
        value: "7",
        centerChildId: "speed-retention-2",
        rightChildId: "cool-run-3"
      },
      { name: "Improved Gyros 3",
        attribute: "Tastier Gyros",
        value: "12.5",
        leftChildId: "cool-run-3",
        centerChildId: "quick-ignition-4"
      },
      { name: "Cool Run 2",
        attribute: "Heat Dissipation",
        value: "2",
        leftChildId: "hill-climb-2"
      },
      { name: "Heat Containment 3",
        attribute: "Heat Capacity",
        value: "3"
      },
      { name: "Cool Run 3",
        attribute: "Heat Dissipation",
        value: "2",
        leftChildId: "hill-climb-2",
        rightChildId: "quick-ignition-4"
      },
      { name: "Hill Climb 2",
        attribute: "Hill Climb",
        value: "7.5",
        leftChildId: "quick-ignition-4"
      },
      { name: "Speed Retention 2",
        attribute: "Speed Retention",
        value: "10",
        leftChildId: "heat-containment-4",
        rightChildId: "hill-climb-3"
      },
      { name: "Quick Ignition 4",
        attribute: "Startup Speed",
        value: "7",
        leftChildId: "hill-climb-3",
        rightChildId: "heat-containment-5"
      },
      { name: "Heat Containment 4",
        attribute: "Heat Dissipation",
        value: "3"
      },
      { name: "Hill Climb 3",
        attribute: "Hill Climb",
        value: "7.5",
        leftChildId: "improved-gyros-4",
        rightChildId: "speed-retention-3"
      },
      { name: "Heat Containment 5",
        attribute: "Heat Dissipation",
        value: "3"
      },
      { name: "Improved Gyros 4",
        attribute: "Tastier Gyros",
        value: "12.5",
        rightChildId: "quick-ignition-5"
      },
      { name: "Speed Retention 3",
        attribute: "Speed Retention",
        value: "10",
        leftChildId: "quick-ignition-5"
      },
      { name: "Quick Ignition 5",
        attribute: "Startup Speed",
        value: "7",
        leftChildId: "cool-run-4",
        rightChildId: "cool-run-5"
      },
      { name: "Cool Run 4",
        attribute: "Heat Dissipation",
        value: "2"
      },
      { name: "Cool Run 5",
        attribute: "Heat Dissipation",
        value: "2"
      }
    ]
  },
  /*
  ==========================================
                   SENSORS
  ==========================================
  */
  {
    name: "Sensors",
    nodes: [
      { name: "Target Info Gathering 1",
        attribute: "Target Info Speed",
        value: "3",
        leftChildId: "target-decay-1",
        rightChildId: "sensor-range-1"
      },
      { name: "Target Decay 1",
        attribute: "Target Lock Decay",
        value: "0.7",
        leftChildId: "target-retention-1",
        centerChildId: "target-info-gathering-3",
        rightChildId: "sensor-range-2"
      },
      { name: "Sensor Range 1",
        attribute: "Sensor Range",
        value: "3",
        leftChildId: "sensor-range-2",
        centerChildId: "sensor-range-3",
        rightChildId: "target-info-gathering-2"
      },
      { name: "Target Retention 1",
        attribute: "Target Retention",
        value: "200",
        rightChildId: "target-info-gathering-3"
      },
      { name: "Sensor Range 2",
        attribute: "Sensor Range",
        value: "3",
        leftChildId: "target-info-gathering-3",
        rightChildId: "sensor-range-3"
      },
      { name: "Target Info Gathering 2",
        attribute: "Target Info Speed",
        value: "3",
        leftChildId: "sensor-range-3",
        rightChildId: "advanced-zoom"
      },
      { name: "Target Info Gathering 3",
        attribute: "Target Info Speed",
        value: "3",
        centerChildId: "target-info-gathering-4",
        rightChildId: "target-decay-2"
      },
      { name: "Sensor Range 3",
        attribute: "Sensor Range",
        value: "3",
        centerChildId: "target-retenton-2"
      },
      { name: "Advanced Zoom",
        attribute: "Zoom Magnifier",
        value: "1"
      },
      { name: "Target Decay 2",
        attribute: "Target Lock Decay",
        value: "0.7"
      },
      { name: "Target Info Gathering 4",
        attribute: "Target Info Speed",
        value: "3",
        leftChildId: "radar-deprivation-1",
        centerChildId: "sensor-range-4"
      },
      { name: "Target Retenton 2",
        attribute: "Target Retention",
        value: "200",
        centerChildId: "sensor-range-5",
        rightChildId: "target-decay-3"
      },
      { name: "Radar Deprivation 1",
        attribute: "Radar Deprivation",
        value: "20",
        rightChildId: "sensor-range-4"
      },
      { name: "Target Decay 3",
        attribute: "Target Lock Decay",
        value: "0.7",
        leftChildId: "sensor-range-5",
        rightChildId: "seismic-sensor-1"
      },
      { name: "Sensor Range 4",
        attribute: "Sensor Range",
        value: "3",
        leftChildId: "radar-deprivation-2",
        centerChildId: "target-info-gathering-5",
        rightChildId: "target-decay-4"
      },
      { name: "Sensor Range 5",
        attribute: "Sensor Range",
        value: "3",
        leftChildId: "target-decay-4",
        centerChildId: "target-decay-5",
        rightChildId: "radar-deprivation-3"
      },
      { name: "Seismic Sensor 1",
        attribute: "Seismic Sensor",
        value: "100"
      },
      { name: "Radar Deprivation 2",
        attribute: "Radar Deprivation",
        value: "20",
        leftChildId: "enhanced-ecm-1",
        rightChildId: "target-info-gathering-5"
      },
      { name: "Target Decay 4",
        attribute: "Target Lock Decay",
        value: "0.7"
      },
      { name: "Radar Deprivation 3",
        attribute: "Radar Deprivation",
        value: "20",
        leftChildId: "target-decay-5",
        rightChildId: "enhanced-ecm-2"
      },
      { name: "Enhanced ECM 1",
        attribute: "ECM Range",
        value: "22.5"
      },
      { name: "Target Info Gathering 5",
        attribute: "Target Info Speed",
        value: "3",
        leftChildId: "seismic-sensor-2",
        rightChildId: "radar-deprivation-4"
      },
      { name: "Target Decay 5",
        attribute: "Target Lock Decay",
        value: "0.7",
        rightChildId: "radar-deprivation-5"
      },
      { name: "Enhanced ECM 2",
        attribute: "ECM Range",
        value: "22.5"
      },
      { name: "Seismic Sensor 2",
        attribute: "Seismic Sensor",
        value: "100"
      },
      { name: "Radar Deprivation 4",
        attribute: "Radar Deprivation",
        value: "20"
      },
      { name: "Radar Deprivation 5",
        attribute: "Radar Deprivation",
        value: "20"
      }
    ]
  },
  /*
  ==========================================
                  AUXILIARY
  ==========================================
  */
  {
    name: "Auxiliary",
    nodes: [
      { name: "Consumable Slots 1",
        attribute: "Consumable Slots",
        value: "1",
        leftChildId: "uav-duration",
        rightChildId: "extended-bombardment-1"
      },
      { name: "UAV Duration",
        attribute: "UAV Duration",
        value: "10",
        leftChildId: "uav-range-1",
        centerChildId: "capture-assist-1",
        rightChildId: "enhanced-coolshot-1"
      },
      { name: "Extended Bombardment 1",
        attribute: "Artillery Strike Duration",
        value: "25",
        leftChildId: "enhanced-coolshot-1",
        centerChildId: "capture-assist-2",
        rightChildId: "extended-bombardment-2"
      },
      { name: "UAV Range 1",
        attribute: "UAV Sight Range",
        value: "20",
        leftChildId: "extra-uav",
        centerChildId: "enhanced-narc-1",
        rightChildId: "capture-assist-1"
      },
      { name: "Enhanced Coolshot 1",
        attribute: "Coolshot Effectiveness",
        value: "50",
        leftChildId: "capture-assist-1",
        centerChildId: "enhanced-coolshot-2",
        rightChildId: "capture-assist-2"
      },
      { name: "Extended Bombardment 2",
        attribute: "Artillery Strike Duration",
        value: "25",
        centerChildId: "enhanced-narc-2",
        rightChildId: "expanded-reserves"
      },
      { name: "Extra UAV",
        attribute: "UAV Capacity",
        value: "1",
        leftChildId: "uav-range-2",
        centerChildId: "consumable-slot-2",
        rightChildId: "enhanced-narc-1"
      },
      { name: "Capture Assist 1",
        attribute: "Point Capture Speed",
        value: "5",
        leftChildId: "enhanced-narc-1",
        centerChildId: "capture-assist-3",
        rightChildId: "enhanced-coolshot-2"
      },
      { name: "Capture Assist 2",
        attribute: "Point Capture Speed",
        value: "5",
        leftChildId: "enhanced-coolshot-2",
        centerChildId: "capture-assist-4",
        rightChildId: "enhanced-narc-2"
      },
      { name: "Expanded Reserves",
        attribute: "Expanded Reserves",
        value: "1",
        centerChildId: "consumable-slot-3",
        rightChildId: "enhanced-spotting"
      },
      { name: "UAV Range 2",
        attribute: "UAV Sight Range",
        value: "20",
        rightChildId: "consumable-slot-2"
      },
      { name: "Enhanced NARC 1",
        attribute: "NARC Duration",
        value: "1",
        rightChildId: "capture-assist-3"
      },
      { name: "Enhanced Coolshot 2",
        attribute: "Enhanced Coolshot",
        value: "50",
        leftChildId: "capture-assist-3",
        centerChildId: "coolant-reserves",
        rightChildId: "capture-assist-4"
      },
      { name: "Enhanced NARC 2",
        attribute: "NARC Duration",
        value: "10",
        leftChildId: "capture-assist-4"
      },
      { name: "Enhanced Spotting",
        attribute: "Enhanced Spotting",
        value: "20",
        leftChildId: "consumable-slot-3"
      },
      { name: "Consumable Slot 2",
        attribute: "Additional Consumable Slot",
        value: "1"
      },
      { name: "Capture Assist 3",
        attribute: "Capture Point Speed",
        value: "5"
      },
      { name: "Capture Assist 4",
        attribute: "Capture Point Speed",
        value: "5"
      },
      { name: "Consumable Slot 3",
        attribute: "Additional Consumable Slot",
        value: "1"
      },
      { name: "Coolant Reserves",
        attribute: "Coolant Reserves",
        value: "1",
        leftChildId: "coolshot-cooldown",
        rightChildId: "consumable-slot-4"
      },
      { name: "Coolshot Cooldown",
        attribute: "Coolshot Cooldown",
        value: "25"
      },
      { name: "Consumable Slot 4",
        attribute: "Additional Consumable Slot",
        value: "1"
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
  },
  { attribute: "Max Speed",
    template: "+{}%"
  },
  { attribute: "Jump Jet Heat Reduction",
    template: "-{}%"
  },
  { attribute: "Jump Jet Vertical Thrust",
    template: "+{}%"
  },
  { attribute: "Jump Jet Forward Thrust",
    template: "+{}%"
  },
  { attribute: "Jump Jet Energy",
    template: "+{}%"
  },
  { attribute: "Tastier Gyros",
    template: "+{}%"
  },
  { attribute: "Startup Speed",
    template: "-{}%"
  },
  { attribute: "Speed Retention",
    template: "+{}%"
  },
  { attribute: "Heat Capacity",
    template: "+{}%"
  },
  { attribute: "Hill Climb",
    template: "+{}%"
  },
  { attribute: "Heat Dissipation",
    template: "+{}%"
  },
  { attribute: "Target Info Speed",
    template: "+{}%"
  },
  { attribute: "Target Retention",
    template: "+{}"
  },
  { attribute: "Sensor Range",
    template: "+{}%"
  },
  { attribute: "Target Lock Decay",
    template: "+{} sec."
  },
  { attribute: "Zoom Magnifier",
    template: "+{}x"
  },
  { attribute: "Radar Deprivation",
    template: "-{}%"
  },
  { attribute: "Seismic Sensor",
    template: "{} m."
  },
  { attribute: "ECM Range",
    template: "+{}%"
  },
  { attribute: "Consumable Slots",
    template: "+{}"
  },
  { attribute: "UAV Duration",
    template: "+{} sec."
  },
  { attribute: "UAV Sight Range",
    template: "+{} m."
  },
  { attribute: "Artillery Strike Duration",
    template: "+{}%"
  },
  { attribute: "Coolshot Effectiveness",
    template: "+{}%"
  },
  { attribute: "UAV Capacity",
    template: "+{}"
  },
  { attribute: "Point Capture Speed",
    template: "+{}%"
  },
  { attribute: "NARC Duration",
    template: "+{}%"
  },
  { attribute: "Enhanced Coolshot",
    template: "+{}%"
  },
  { attribute: "Expanded Reserves",
    template: "+{}"
  },
  { attribute: "Enhanced Spotting",
    template: "-{}%"
  },
  { attribute: "Additional Consumable Slot",
    template: "+{}"
  },
  { attribute: "Capture Point Speed",
    template: "+{}%"
  },
  { attribute: "Coolant Reserves",
    template: "+{}"
  },
  { attribute: "Coolshot Cooldown",
    template: "+{}"
  }
]
