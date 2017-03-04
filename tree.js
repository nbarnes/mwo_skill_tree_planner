// First element of the nodes array MUST be the root node of the skll graph

let treeSource = [
  {
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
        attribute: "Weapons Heat Generation",
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
        leftChildId: "missile-rack-1",
        rightChildId: "gauss-charge-3"
      }
    ]
  }, {
    name: 'Survival',
    nodes: [
      { name: "Reinforced Casing 1",
        attribute: "Armor",
        value: "1",
        leftChildId: "ams-overload-1",
        rightChildId: "shock-absorbance-1"
      },
      { name: "AMS Overload 1",
        attribute: "AMS Effectiveness",
        value: "1.25",
        centerChildId: "shock-absorbance-1",
        leftChildId: "skeletal-density-1"
      },
      { name: "Shock Absorbance 1",
        attribute: "Recoil Reduction",
        value: "10",
        leftChildId: "skeletal-density-1",
        centerChildId: "reinforced-casing-2"
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
    template: "-{} sec."
  },
  { attribute: "Armor",
    template: "+{}%"
  },
  { attribute: "AMS Effectiveness",
    template: "+{}%"
  },
  { attribute: "Recoil Reduction",
    template: "-{}%"
  }

]
