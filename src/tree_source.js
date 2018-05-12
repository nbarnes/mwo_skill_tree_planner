
// First element of the nodes array MUST be the root node of the skill graph
export let treeSource = [
  /*
  ==========================================
                   WEAPONS
  ==========================================
  */
  {
    treeName: "Weapons",
    nodes: [
      { name: "Range 1",
        attribute: "Weapon Range",
        leftChildId: "range-2",
        rightChildId: "range-3"
      },
      { name: "Range 2",
        attribute: "Weapon Range",
        leftChildId: "range-4",
        rightChildId: "range-5"
      },
      { name: "Range 3",
        attribute: "Weapon Range",
        leftChildId: "range-5",
        rightChildId: "range-6"
      },
      { name: "Range 4",
        attribute: "Weapon Range",
        leftChildId: "cooldown-1",
        centerChildId: "high-explosive-1",
        rightChildId: "velocity-1"
      },
      { name: "Range 5",
        attribute: "Weapon Range",
        centerChildId: "cooldown-4"
      },
      { name: "Range 6",
        attribute: "Weapon Range",
        leftChildId: "velocity-2",
        centerChildId: "gauss-charge-1",
        rightChildId: "cooldown-2"
      },
	  { name: "Cooldown 1",
        attribute: "Weapon Cooldown",
        leftChildId: "cooldown-3"
      },
	  { name: "Velocity 1",
        attribute: "Weapon Velocity",
        rightChildId: "cooldown-4"
      },
	  { name: "Velocity 2",
        attribute: "Weapon Velocity",
        leftChildId: "cooldown-4"
      },
      { name: "Cooldown 2",
        attribute: "Weapon Cooldown",
        rightChildId: "cooldown-5"
      },
      { name: "Cooldown 3",
        attribute: "Weapon Cooldown",
        leftChildId: "range-7",
        centerChildId: "missile-spread-1",
        rightChildId: "heat-gen-1"
      },
      { name: "High Explosive 1",
        attribute: "Missile Crit Damage",
        leftChildId: "heat-gen-1"
      },
      { name: "Cooldown 4",
        attribute: "Weapon Cooldown",
        centerChildId: "cooldown-6",
        rightChildId: "flamer-ventilation-1",
      },
      { name: "Gauss Charge 1",
        attribute: "Gauss Held Time",
        leftChildId: "flamer-ventilation-1",
        rightChildId: "heat-gen-2"
      },
      { name: "Cooldown 5",
        attribute: "Weapon Cooldown",
        leftChildId: "heat-gen-2",
        centerChildId: "lbx-spread-1",
        rightChildId: "range-8"
      },
      { name: "Range 7",
        attribute: "Weapon Range",
        leftChildId: "range-9"
      },
      { name: "Heat Gen 1",
        attribute: "Weapon Heat Gen",
        leftChildId: "missile-spread-1",
        rightChildId: "heat-gen-3"
      },
      { name: "Flamer Ventilation 1",
        attribute: "Flamer Ventilation"
      },
      { name: "Heat Gen 2",
        attribute: "Weapon Heat Gen",
        leftChildId: "heat-gen-4",
        rightChildId: "lbx-spread-1"
      },
      { name: "Range 8",
        attribute: "Weapon Range",
        rightChildId: "range-10"
      },
      { name: "Range 9",
        attribute: "Weapon Range",
        rightChildId: "cooldown-7"
      },
      { name: "Missile Spread 1",
        attribute: "Missile Spread",
        leftChildId: "cooldown-7"
      },
      { name: "Heat Gen 3",
        attribute: "Weapon Heat Gen",
        leftChildId: "velocity-3",
        rightChildId: "range-11"
      },
      { name: "Cooldown 6",
        attribute: "Weapon Cooldown",
        leftChildId: "range-11",
        centerChildId: "laser-duration-1",
        rightChildId: "range-12"
      },
      { name: "Heat Gen 4",
        attribute: "Weapon Heat Gen",
        leftChildId: "range-12",
        rightChildId: "velocity-4"
      },
      { name: "LBX Spread 1",
        attribute: "LBX Spread",
        rightChildId: "cooldown-8"
      },
	  { name: "Range 10",
        attribute: "Weapon Range",
        leftChildId: "cooldown-8",
        rightChildId: "enhanced-uac-rac-1"
      },
      { name: "Cooldown 7",
        attribute: "Weapon Cooldown",
        leftChildId: "heat-gen-5",
        rightChildId: "heat-gen-6"
      },
      { name: "Velocity 3",
        attribute: "Weapon Velocity",
        leftChildId: "heat-gen-6"
      },
      { name: "Range 11",
        attribute: "Weapon Range",
        leftChildId: "range-13",
        rightChildId: "laser-duration-1"
      },
      { name: "Range 12",
        attribute: "Weapon Range",
        leftChildId: "laser-duration-1",
        rightChildId: "range-14"
      },
      { name: "Velocity 4",
        attribute: "Weapon Velocity",
        rightChildId: "cooldown-9"
      },
      { name: "Cooldown 8",
        attribute: "Weapon Cooldown",
        leftChildId: "cooldown-9",
        centerChildId: "gauss-charge-2",
        rightChildId: "heat-gen-7"
      },
      { name: "Enhanced UAC / RAC 1",
        attribute: "Enhanced UAC / RAC",
      },
      { name: "Heat Gen 5",
        attribute: "Weapon Heat Gen",
        leftChildId: "cooldown-10"
      },
      { name: "Heat Gen 6",
        attribute: "Weapon Heat Gen",
        leftChildId: "high-explosive-2",
        centerChildId: "laser-duration-2",
        rightChildId: "heat-gen-8"
      },
      { name: "Range 13",
        attribute: "Weapon Range",
        leftChildId: "heat-gen-8",
        centerChildId: "flamer-ventilation-2",
        rightChildId: "missile-rack-1"
      },
      { name: "Laser Duration 1",
        attribute: "Laser Duration",
        centerChildId: "cooldown-12"
      },
      { name: "Range 14",
        attribute: "Weapon Range",
        leftChildId: "magazine-capacity-1",
        rightChildId: "heat-gen-9"
      },
      { name: "Cooldown 9",
        attribute: "Weapon Cooldown",
        leftChildId: "heat-gen-9",
        centerChildId: "laser-duration-3",
        rightChildId: "gauss-charge-2"
      },
	  { name: "Heat Gen 7",
        attribute: "Weapon Heat Gen",
        rightChildId: "cooldown-11"
      },
	  { name: "Cooldown 10",
        attribute: "Weapon Cooldown",
        rightChildId: "missile-rack-2"
      },
	  { name: "High Explosive 2",
        attribute: "Missile Crit Damage",
        rightChildId: "laser-duration-2"
      },
	  { name: "Heat Gen 8",
        attribute: "Weapon Heat Gen",
        leftChildId: "laser-duration-2",
        centerChildId: "cooldown-13"
      },
	  { name: "Missile Rack 1",
        attribute: "Missile Ammo",
        rightChildId: "cooldown-12"
      },
	  { name: "Magazine Capacity 1",
      attribute: "Ballistic Ammo",
      leftChildId: "cooldown-12"
    },
	  { name: "Heat Gen 9",
      attribute: "Weapon Heat Gen",
      centerChildId: "cooldown-14",
      rightChildId: "laser-duration-3"
    },
	  { name: "Gauss Charge 2",
      attribute: "Gauss Held Time",
      leftChildId: "laser-duration-3"
    },
	  { name: "Cooldown 11",
      attribute: "Weapon Cooldown",
      leftChildId: "magazine-capacity-2"
    },
	  { name: "Missile Rack 2",
      attribute: "Missile Ammo",
    },
	  { name: "Laser Duration 2",
      attribute: "Laser Duration",
      rightChildId: "cooldown-13"
    },
    { name: "Flamer Ventilation 2",
      attribute: "Flamer Ventilation"
    },
	  { name: "Cooldown 12",
        attribute: "Weapon Cooldown",
        leftChildId: "range-15",
        rightChildId: "velocity-5"
      },
	  { name: "Laser Duration 3",
        attribute: "Laser Duration",
        leftChildId: "cooldown-14"
      },
	  { name: "Magazine Capacity 2",
        attribute: "Ballistic Ammo",
      },
	  { name: "Cooldown 13",
        attribute: "Weapon Cooldown",
        leftChildId: "heat-gen-10",
        rightChildId: "heat-gen-11"
      },
	  { name: "Range 15",
        attribute: "Weapon Range",
        leftChildId: "heat-gen-11",
        rightChildId: "cooldown-15"
      },
	  { name: "Velocity 5",
        attribute: "Weapon Velocity",
        leftChildId: "cooldown-15",
        rightChildId: "heat-gen-12"
      },
	  { name: "Cooldown 14",
        attribute: "Weapon Cooldown",
        leftChildId: "heat-gen-12",
        rightChildId: "cooldown-16"
      },
	  { name: "Heat Gen 10",
        attribute: "Weapon Heat Gen",
      },
	  { name: "Heat Gen 11",
        attribute: "Weapon Heat Gen",
        centerChildId: "heat-gen-13"
      },
	  { name: "Cooldown 15",
        attribute: "Weapon Cooldown",
        leftChildId: "missile-spread-2",
        centerChildId: "laser-duration-4",
        rightChildId: "enhanced-uac-rac-2"
      },
	  { name: "Heat Gen 12",
        attribute: "Weapon Heat Gen",
        centerChildId: "heat-gen-14",
        rightChildId: "lbx-spread-2"
      },
      { name: "Cooldown 16",
        attribute: "Weapon Cooldown",
        leftChildId: "lbx-spread-2"
      },
      { name: "Missile Spread 2",
        attribute: "Missile Spread",
      },
      { name: "Enhanced UAC / RAC 2",
        attribute: "Enhanced UAC / RAC",
      },
      { name: "LBX Spread 2",
        attribute: "LBX Spread",
      },
      { name: "Heat Gen 13",
        attribute: "Weapon Heat Gen",
      },
      { name: "Laser Duration 4",
        attribute: "Laser Duration",
      },
      { name: "Heat Gen 14",
        attribute: "Weapon Heat Gen",
      }
    ]
  },
  /*
  ==========================================
                  SURVIVAL
  ==========================================
  */
  {
    treeName: "Survival",
    nodes: [
      { name: "Reinforced Casing 1",
        attribute: "Crit Chance Received",
        leftChildId: "shock-absorbance-1",
        rightChildId: "ams-overload-1"
      },
	    { name: "Shock Absorbance 1",
        attribute: "Fall Damage",
        centerChildId: "reinforced-casing-2",
        rightChildId: "skeletal-density-1"
      },
	    { name: "AMS Overload 1",
        attribute: "AMS Effectiveness",
        leftChildId: "skeletal-density-1",
        centerChildId: "reinforced-casing-3"
      },
	    { name: "Skeletal Density 1",
        attribute: "Internal Structure",
        leftChildId: "reinforced-casing-2",
        rightChildId: "reinforced-casing-3"
      },
	    { name: "Reinforced Casing 2",
        attribute: "Crit Chance Received",
        leftChildId: "armor-hardening-1",
        centerChildId: "ams-overload-2"
      },
	    { name: "Reinforced Casing 3",
        attribute: "Crit Chance Received",
        centerChildId: "shock-absorbance-3",
        rightChildId: "skeletal-density-2"
      },
	    { name: "Armor Hardening 1",
        attribute: "Armor",
        leftChildId: "shock-absorbance-2",
        centerChildId: "skeletal-density-3",
        rightChildId: "ams-overload-2"
      },
	    { name: "Skeletal Density 2",
        attribute: "Internal Structure",
        leftChildId: "shock-absorbance-3",
        centerChildId: "reinforced-casing-4",
        rightChildId: "shock-absorbance-4"
      },
	  { name: "Shock Absorbance 2",
        attribute: "Fall Damage",
        leftChildId: "armor-hardening-2",
        rightChildId: "skeletal-density-3"
      },
	    { name: "AMS Overload 2",
        attribute: "AMS Effectiveness",
        leftChildId: "skeletal-density-3",
        rightChildId: "skeletal-density-4"
      },
	    { name: "Shock Absorbance 3",
        attribute: "Fall Damage",
        leftChildId: "skeletal-density-4",
        rightChildId: "reinforced-casing-4"
      },
	    { name: "Shock Absorbance 4",
        attribute: "Fall Damage",
        leftChildId: "reinforced-casing-4",
        rightChildId: "armor-hardening-3"
      },
	    { name: "Armor Hardening 2",
        attribute: "Armor",
        rightChildId: "reinforced-casing-5"
      },
	    { name: "Skeletal Density 3",
        attribute: "Internal Structure",
        leftChildId: "reinforced-casing-5",
        centerChildId: "armor-hardening-5"
      },
	    { name: "Skeletal Density 4",
        attribute: "Internal Structure",
        centerChildId: "skeletal-density-5"
      },
	    { name: "Reinforced Casing 4",
        attribute: "Crit Chance Received",
        centerChildId: "skeletal-density-6",
        rightChildId: "reinforced-casing-7"
      },
	    { name: "Armor Hardening 3",
        attribute: "Armor",
        leftChildId: "reinforced-casing-7"
      },
	    { name: "Reinforced Casing 5",
        attribute: "Crit Chance Received",
        leftChildId: "armor-hardening-4",
        rightChildId: "armor-hardening-5"
      },
	    { name: "Reinforced Casing 7",
        attribute: "Crit Chance Received",
        leftChildId: "skeletal-density-6",
        rightChildId: "skeletal-density-7"
      },
	    { name: "Armor Hardening 4",
        attribute: "Armor",
      },
  	  { name: "Armor Hardening 5",
        attribute: "Armor",
        rightChildId: "reinforced-casing-6"
      },
	    { name: "Skeletal Density 5",
        attribute: "Internal Structure",
        leftChildId: "reinforced-casing-6",
        rightChildId: "reinforced-casing-8"
      },
	    { name: "Skeletal Density 6",
        attribute: "Internal Structure",
        leftChildId: "reinforced-casing-8"
      },
	    { name: "Skeletal Density 7",
        attribute: "Internal Structure",
      },
	    { name: "Reinforced Casing 6",
        attribute: "Crit Chance Received",
        leftChildId: "armor-hardening-6",
        centerChildId: "skeletal-density-9"
      },
	    { name: "Reinforced Casing 8",
        attribute: "Crit Chance Received",
        centerChildId: "skeletal-density-10",
        rightChildId: "skeletal-density-8"
      },
	    { name: "Armor Hardening 6",
        attribute: "Armor",
        rightChildId: "skeletal-density-9"
      },
	    { name: "Skeletal Density 8",
        attribute: "Internal Structure",
        leftChildId: "skeletal-density-10"
      },
	    { name: "Skeletal Density 9",
        attribute: "Internal Structure",
        leftChildId: "armor-hardening-7",
        rightChildId: "shock-absorbance-5"
      },
	    { name: "Skeletal Density 10",
        attribute: "Internal Structure",
        leftChildId: "shock-absorbance-5",
        rightChildId: "armor-hardening-8"
      },
	    { name: "Armor Hardening 7",
        attribute: "Armor",
      },
	    { name: "Shock Absorbance 5",
        attribute: "Fall Damage",
        leftChildId: "armor-hardening-9",
        rightChildId: "armor-hardening-10"
      },
	    { name: "Armor Hardening 8",
        attribute: "Armor",
      },
	    { name: "Armor Hardening 9",
        attribute: "Armor",
      },
	    { name: "Armor Hardening 10",
        attribute: "Armor",
      },
    ]
  },
  /*
  ==========================================
                    MOBiLITY
  ==========================================
  */
  {
    treeName: "Mobility",
    nodes: [
      { name: "Kinetic Burst 1",
        attribute: "Acceleration",
        leftChildId: "torso-yaw-1",
        rightChildId: "hard-brake-1"
      },
      { name: "Torso Yaw 1",
        attribute: "Max Torso Twist",
        leftChildId: "hard-brake-2",
        rightChildId: "kinetic-burst-2"
      },
      { name: "Hard Brake 1",
        attribute: "Deceleration",
        leftChildId: "kinetic-burst-2",
        rightChildId: "torso-yaw-2"
      },
      { name: "Hard Brake 2",
        attribute: "Deceleration",
        leftChildId: "torso-speed-1",
        rightChildId: "torso-yaw-3"
      },
      { name: "Kinetic Burst 2",
        attribute: "Acceleration",
        leftChildId: "torso-yaw-3",
        rightChildId: "hard-brake-3"
      },
      { name: "Torso Yaw 2",
        attribute: "Max Torso Twist",
        leftChildId: "hard-brake-3",
        rightChildId: "anchor-turn-1"
      },
      { name: "Torso Speed 1",
        attribute: "Torso Twist Speed",
      },
      { name: "Torso Yaw 3",
        attribute: "Max Torso Twist",
        leftChildId: "kinetic-burst-3",
        centerChildId: "torso-yaw-4"
      },
      { name: "Hard Brake 3",
        attribute: "Deceleration",
        centerChildId: "kinetic-burst-5",
        rightChildId: "kinetic-burst-4"
      },
      { name: "Anchor Turn 1",
        attribute: "Turn Speed",
      },
      { name: "Kinetic Burst 3",
        attribute: "Acceleration",
        leftChildId: "hard-brake-4",
        rightChildId: "torso-yaw-4"
      },
      { name: "Kinetic Burst 4",
        attribute: "Acceleration",
        leftChildId: "kinetic-burst-5",
        rightChildId: "kinetic-burst-6"
      },
      { name: "Hard Brake 4",
        attribute: "Deceleration",
        leftChildId: "torso-speed-2",
        rightChildId: "torso-speed-3"
      },
      { name: "Torso Yaw 4",
        attribute: "Max Torso Twist",
        leftChildId: "torso-speed-3",
        rightChildId: "torso-pitch-1"
      },
      { name: "Kinetic Burst 5",
        attribute: "Acceleration",
        leftChildId: "torso-pitch-1",
        rightChildId: "kinetic-burst-7"
      },
      { name: "Kinetic Burst 6",
        attribute: "Acceleration",
        leftChildId: "kinetic-burst-7",
        rightChildId: "hard-brake-5"
      },
      { name: "Torso Speed 2",
        attribute: "Torso Twist Speed",
        rightChildId: "torso-yaw-5"
      },
      { name: "Torso Speed 3",
        attribute: "Torso Twist Speed",
        rightChildId: "torso-pitch-2"
      },
      { name: "Torso Pitch 1",
        attribute: "Max Torso Inclination",
        leftChildId: "torso-pitch-2",
        rightChildId: "torso-pitch-3"
      },
      { name: "Kinetic Burst 7",
        attribute: "Acceleration",
        leftChildId: "torso-pitch-3"
      },
      { name: "Hard Brake 5",
        attribute: "Deceleration",
        leftChildId: "anchor-turn-2"
      },
      { name: "Torso Yaw 5",
        attribute: "Max Torso Twist",
        rightChildId: "hard-brake-6"
      },
      { name: "Torso Pitch 2",
        attribute: "Max Torso Inclination",
        leftChildId: "hard-brake-6"
      },
      { name: "Torso Pitch 3",
        attribute: "Max Torso Inclination",
        rightChildId: "hard-brake-7"
      },
      { name: "Anchor Turn 2",
        attribute: "Turn Speed",
        leftChildId: "hard-brake-7"
      },
      { name: "Hard Brake 6",
        attribute: "Deceleration",
        leftChildId: "anchor-turn-3",
        rightChildId: "torso-speed-4"
      },
      { name: "Hard Brake 7",
        attribute: "Deceleration",
        leftChildId: "torso-speed-5",
        rightChildId: "anchor-turn-4"
      },
      { name: "Anchor Turn 3",
        attribute: "Turn Speed",
        rightChildId: "torso-pitch-4"
      },
      { name: "Torso Speed 4",
        attribute: "Torso Twist Speed",
        leftChildId: "torso-pitch-4"
      },
      { name: "Torso Speed 5",
        attribute: "Torso Twist Speed",
        rightChildId: "torso-pitch-5"
      },
      { name: "Anchor Turn 4",
        attribute: "Turn Speed",
        leftChildId: "torso-pitch-5"
      },
      { name: "Torso Pitch 4",
        attribute: "Max Torso Inclination",
        leftChildId: "speed-tweak-1",
        centerChildId: "torso-speed-6"
      },
      { name: "Torso Pitch 5",
        attribute: "Max Torso Inclination",
        centerChildId: "anchor-turn-5",
        rightChildId: "speed-tweak-2"
      },
      { name: "Speed Tweak 1",
        attribute: "Max Speed",
        rightChildId: "torso-speed-6"
      },
      { name: "Speed Tweak 2",
        attribute: "Max Speed",
        leftChildId: "anchor-turn-5"
      },
      { name: "Torso Speed 6",
        attribute: "Torso Twist Speed",
        rightChildId: "speed-tweak-3"
      },
      { name: "Anchor Turn 5",
        attribute: "Turn Speed",
        leftChildId: "speed-tweak-4"
      },
      { name: "Speed Tweak 3",
        attribute: "Max Speed",
        rightChildId: "speed-tweak-5"
      },
      { name: "Speed Tweak 4",
        attribute: "Max Speed",
        leftChildId: "speed-tweak-5"
      },
      { name: "Speed Tweak 5",
        attribute: "Max Speed",
      }
    ]
  },
  /*
  ==========================================
                  JUMP JETS
  ==========================================
  */
  {
    treeName: "Jump Jets",
    nodes: [
      { name: "Heat Shielding 1",
        attribute: "Jump Jet Heat Reduction",
        leftChildId: "vent-calibration-1",
        rightChildId: "vectoring-1"
      },
      { name: "Vent Calibration 1",
        attribute: "Jump Jet Burn Time",
        centerChildId: "vent-calibration-2",
        rightChildId: "heat-shielding-2"
      },
      { name: "Vectoring 1",
        attribute: "Jump Jet Forward Thrust",
        leftChildId: "heat-shielding-2",
        centerChildId: "vectoring-2",
        rightChildId: "lift-speed-1"
      },
      { name: "Heat Shielding 2",
        attribute: "Jump Jet Heat Reduction",
        leftChildId: "vent-calibration-2",
        rightChildId: "vectoring-2"
      },
      { name: "Lift Speed 1",
        attribute: "Jump Jet Initial Boost",
        leftChildId: "vectoring-2"
      },
      { name: "Vent Calibration 2",
        attribute: "Jump Jet Burn Time",
        centerChildId: "vent-calibration-3",
        rightChildId: "heat-shielding-3"
      },
      { name: "Vectoring 2",
        attribute: "Jump Jet Forward Thrust",
        leftChildId: "heat-shielding-3",
        centerChildId: "vectoring-3",
        rightChildId: "lift-speed-2"
      },
      { name: "Heat Shielding 3",
        attribute: "Jump Jet Heat Reduction",
        leftChildId: "vent-calibration-3",
        rightChildId: "vectoring-3"
      },
      { name: "Lift Speed 2",
        attribute: "Jump Jet Initial Boost",
        leftChildId: "vectoring-3"
      },
      { name: "Vent Calibration 3",
        attribute: "Jump Jet Burn Time",
        leftChildId: "lift-speed-3",
        centerChildId: "vent-calibration-4",
        rightChildId: "heat-shielding-4"
      },
      { name: "Vectoring 3",
        attribute: "Jump Jet Forward Thrust",
        leftChildId: "heat-shielding-4",
        centerChildId: "vectoring-4"
      },
      { name: "Lift Speed 3",
        attribute: "Jump Jet Initial Boost",
        rightChildId: "vent-calibration-4"
      },
      { name: "Heat Shielding 4",
        attribute: "Jump Jet Heat Reduction",
        leftChildId: "vent-calibration-4",
        rightChildId: "vectoring-4"
      },
      { name: "Vent Calibration 4",
        attribute: "Jump Jet Burn Time",
        leftChildId: "lift-speed-4",
        centerChildId: "vent-calibration-5",
        rightChildId: "heat-shielding-5"
      },
      { name: "Vectoring 4",
        attribute: "Jump Jet Forward Thrust",
        leftChildId: "heat-shielding-5",
        centerChildId: "vectoring-5"
      },
      { name: "Lift Speed 4",
        attribute: "Jump Jet Initial Boost",
        rightChildId: "vent-calibration-5"
      },
      { name: "Heat Shielding 5",
        attribute: "Jump Jet Heat Reduction",
        leftChildId: "vent-calibration-5",
        rightChildId: "vectoring-5"
      },
      { name: "Vent Calibration 5",
        attribute: "Jump Jet Burn Time",
      },
      { name: "Vectoring 5",
        attribute: "Jump Jet Forward Thrust",
        leftChildId: "lift-speed-5"
      },
      { name: "Lift Speed 5",
        attribute: "Jump Jet Initial Boost",
      }
    ]
  },
  /*
  ==========================================
                 OPERATIONS
  ==========================================
  */
  {
    treeName: "Operations",
    nodes: [
      { name: "Quick Ignition 1",
        attribute: "Startup Speed",
        leftChildId: "speed-retention-1",
        rightChildId: "improved-gyros-1"
      },
      { name: "Speed Retention 1",
        attribute: "Legged Speed",
        centerChildId: "hill-climb-1",
        rightChildId: "heat-containment-1"
      },
      { name: "Improved Gyros 1",
        attribute: "Tastier Gyros",
        leftChildId: "heat-containment-1",
        centerChildId: "improved-gyros-2"
      },
      { name: "Heat Containment 1",
        attribute: "Heat Capacity",
        leftChildId: "hill-climb-1",
        rightChildId: "improved-gyros-2"
      },
      { name: "Hill Climb 1",
        attribute: "Hill Climb",
        leftChildId: "heat-containment-2",
        centerChildId: "hill-climb-2"
      },
      { name: "Improved Gyros 2",
        attribute: "Tastier Gyros",
        centerChildId: "speed-retention-2",
        rightChildId: "heat-containment-3"
      },
      { name: "Heat Containment 2",
        attribute: "Heat Capacity",
        leftChildId: "cool-run-1",
        centerChildId: "quick-ignition-2"
      },
      { name: "Heat Containment 3",
        attribute: "Heat Capacity",
        centerChildId: "quick-ignition-3",
        rightChildId: "cool-run-2"
      },
      { name: "Cool Run 1",
        attribute: "Heat Dissipation",
        rightChildId: "quick-ignition-2"
      },
      { name: "Hill Climb 2",
        attribute: "Hill Climb",
        centerChildId: "hill-climb-3",
        rightChildId: "cool-run-3"
      },
      { name: "Speed Retention 2",
        attribute: "Legged Speed",
        leftChildId: "cool-run-3",
        centerChildId: "improved-gyros-3"
      },
      { name: "Cool Run 2",
        attribute: "Heat Dissipation",
        leftChildId: "quick-ignition-3"
      },
      { name: "Quick Ignition 2",
        attribute: "Startup Speed",
        rightChildId: "hill-climb-3"
      },
      { name: "Cool Run 3",
        attribute: "Heat Dissipation",
        leftChildId: "hill-climb-3",
        rightChildId: "improved-gyros-3"
      },
      { name: "Quick Ignition 3",
        attribute: "Startup Speed",
        leftChildId: "improved-gyros-3"
      },
      { name: "Hill Climb 3",
        attribute: "Hill Climb",
        leftChildId: "heat-containment-4",
        rightChildId: "quick-ignition-4"
      },
      { name: "Improved Gyros 3",
        attribute: "Tastier Gyros",
        leftChildId: "quick-ignition-4",
        rightChildId: "heat-containment-5"
      },
      { name: "Heat Containment 4",
        attribute: "Heat Capacity",
      },
      { name: "Quick Ignition 4",
        attribute: "Startup Speed",
        leftChildId: "improved-gyros-4",
        rightChildId: "speed-retention-3"
      },
      { name: "Heat Containment 5",
        attribute: "Heat Capacity",
      },
      { name: "Improved Gyros 4",
        attribute: "Tastier Gyros",
        rightChildId: "quick-ignition-5"
      },
      { name: "Speed Retention 3",
        attribute: "Legged Speed",
        leftChildId: "quick-ignition-5"
      },
      { name: "Quick Ignition 5",
        attribute: "Startup Speed",
        leftChildId: "cool-run-4",
        rightChildId: "cool-run-5"
      },
      { name: "Cool Run 4",
        attribute: "Heat Dissipation",
      },
      { name: "Cool Run 5",
        attribute: "Heat Dissipation",
      }
    ]
  },
  /*
  ==========================================
                   SENSORS
  ==========================================
  */
  {
    treeName: "Sensors",
    nodes: [
      { name: "Target Info Gathering 1",
        attribute: "Target Info Speed",
        leftChildId: "target-decay-1",
        rightChildId: "sensor-range-1"
      },
      { name: "Target Decay 1",
        attribute: "Target Lock Decay",
        leftChildId: "target-retention-1",
        centerChildId: "target-info-gathering-3",
        rightChildId: "sensor-range-2"
      },
      { name: "Sensor Range 1",
        attribute: "Sensor Range",
        leftChildId: "sensor-range-2",
        centerChildId: "sensor-range-3",
        rightChildId: "target-info-gathering-2"
      },
      { name: "Target Retention 1",
        attribute: "Target Retention",
      },
      { name: "Sensor Range 2",
        attribute: "Sensor Range",
        leftChildId: "target-info-gathering-3",
        rightChildId: "sensor-range-3"
      },
      { name: "Target Info Gathering 2",
        attribute: "Target Info Speed",
        rightChildId: "advanced-zoom"
      },
      { name: "Target Info Gathering 3",
        attribute: "Target Info Speed",
        centerChildId: "target-info-gathering-4",
        rightChildId: "target-decay-2"
      },
      { name: "Sensor Range 3",
        attribute: "Sensor Range",
        leftChildId: "target-decay-2",
        centerChildId: "target-retention-2"
      },
      { name: "Advanced Zoom",
        attribute: "Zoom Magnifier",
      },
      { name: "Target Decay 2",
        attribute: "Target Lock Decay",
      },
      { name: "Target Info Gathering 4",
        attribute: "Target Info Speed",
        leftChildId: "radar-deprivation-1",
        centerChildId: "sensor-range-4"
      },
      { name: "Target Retention 2",
        attribute: "Target Retention",
        centerChildId: "sensor-range-5",
        rightChildId: "target-decay-3"
      },
      { name: "Radar Deprivation 1",
        attribute: "Radar Deprivation",
      },
      { name: "Target Decay 3",
        attribute: "Target Lock Decay",
        rightChildId: "seismic-sensor-1"
      },
      { name: "Sensor Range 4",
        attribute: "Sensor Range",
        leftChildId: "radar-deprivation-2",
        centerChildId: "target-info-gathering-5",
        rightChildId: "target-decay-4"
      },
      { name: "Sensor Range 5",
        attribute: "Sensor Range",
        leftChildId: "target-decay-4",
        centerChildId: "target-decay-5",
        rightChildId: "radar-deprivation-3"
      },
      { name: "Seismic Sensor 1",
        attribute: "Seismic Sensor",
      },
      { name: "Radar Deprivation 2",
        attribute: "Radar Deprivation",
        leftChildId: "enhanced-ecm-1",
      },
      { name: "Target Decay 4",
        attribute: "Target Lock Decay",
      },
      { name: "Radar Deprivation 3",
        attribute: "Radar Deprivation",
        rightChildId: "enhanced-ecm-2"
      },
      { name: "Enhanced ECM 1",
        attribute: "Enhanced ECM Systems",
      },
      { name: "Target Info Gathering 5",
        attribute: "Target Info Speed",
        leftChildId: "seismic-sensor-2",
        rightChildId: "radar-deprivation-4"
      },
      { name: "Target Decay 5",
        attribute: "Target Lock Decay",
        rightChildId: "radar-deprivation-5"
      },
      { name: "Enhanced ECM 2",
        attribute: "Enhanced ECM Systems",
      },
      { name: "Seismic Sensor 2",
        attribute: "Seismic Sensor",
      },
      { name: "Radar Deprivation 4",
        attribute: "Radar Deprivation",
      },
      { name: "Radar Deprivation 5",
        attribute: "Radar Deprivation",
      }
    ]
  },
  /*
  ==========================================
                  AUXILIARY
  ==========================================
  */
  {
    treeName: "Auxiliary",
    nodes: [
      { name: "Consumable Slot 1",
        attribute: "Additional Consumable Slot",
        leftChildId: "uav-duration",
        rightChildId: "advanced-salvos-1"
      },
      { name: "UAV Duration",
        attribute: "UAV Duration",
        leftChildId: "uav-range-1",
        centerChildId: "capture-assist-1",
        rightChildId: "enhanced-coolshot-1"
      },
      { name: "Advanced Salvos 1",
        attribute: "Artillery Strike Duration",
        leftChildId: "enhanced-coolshot-1",
        centerChildId: "capture-assist-2",
        rightChildId: "advanced-salvos-2"
      },
      { name: "UAV Range 1",
        attribute: "UAV Sight Range",
        leftChildId: "extra-uav",
        centerChildId: "enhanced-narc-1"
      },
      { name: "Enhanced Coolshot 1",
        attribute: "Coolshot Effectiveness",
        leftChildId: "capture-assist-1",
        centerChildId: "enhanced-coolshot-2",
        rightChildId: "capture-assist-2"
      },
      { name: "Advanced Salvos 2",
        attribute: "Artillery Strike Duration",
        centerChildId: "enhanced-narc-2",
        rightChildId: "expanded-reserves"
      },
      { name: "Extra UAV",
        attribute: "UAV Capacity",
        leftChildId: "uav-range-2",
        centerChildId: "consumable-slot-2"
      },
      { name: "Capture Assist 1",
        attribute: "Point Capture Speed",
        leftChildId: "enhanced-narc-1",
        centerChildId: "capture-assist-3",
        rightChildId: "enhanced-coolshot-2"
      },
      { name: "Capture Assist 2",
        attribute: "Point Capture Speed",
        leftChildId: "enhanced-coolshot-2",
        centerChildId: "capture-assist-4",
        rightChildId: "enhanced-narc-2"
      },
      { name: "Expanded Reserves",
        attribute: "Additional Air / Arty Strike",
        centerChildId: "consumable-slot-3",
        rightChildId: "enhanced-spotting"
      },
      { name: "UAV Range 2",
        attribute: "UAV Sight Range",
      },
      { name: "Enhanced NARC 1",
        attribute: "NARC Velocity and Duration",
        rightChildId: "capture-assist-3"
      },
      { name: "Enhanced Coolshot 2",
        attribute: "Coolshot Effectiveness",
        leftChildId: "capture-assist-3",
        centerChildId: "coolant-reserves",
        rightChildId: "capture-assist-4"
      },
      { name: "Enhanced NARC 2",
        attribute: "NARC Velocity and Duration",
        leftChildId: "capture-assist-4"
      },
      { name: "Enhanced Spotting",
        attribute: "Air / Arty Strike Accuracy",
      },
      { name: "Consumable Slot 2",
        attribute: "Additional Consumable Slot",
      },
      { name: "Capture Assist 3",
        attribute: "Point Capture Speed",
      },
      { name: "Capture Assist 4",
        attribute: "Point Capture Speed",
      },
      { name: "Consumable Slot 3",
        attribute: "Additional Consumable Slot",
      },
      { name: "Coolant Reserves",
        attribute: "Coolant Reserves",
        leftChildId: "coolshot-cooldown",
        rightChildId: "consumable-slot-4"
      },
      { name: "Coolshot Cooldown",
        attribute: "Coolshot Cooldown",
      },
      { name: "Consumable Slot 4",
        attribute: "Additional Consumable Slot",
      }
    ]
  }
]
