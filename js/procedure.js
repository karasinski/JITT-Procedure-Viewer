var proc = {
  "PROCEDURE": [{
      "text": "1.  OUTER COVER REMOVAL",
      "subtasks": [{
        "caption": "1.1.    Confirm that the initial orientation of the Inspection Box is correct (Audible Call Out)",
        "text": "/img/figures/Orientation.png",
        "type": "image_and_text"
      }, {
      	"text": "1.2.    Loosen the 8mm Flange Nut near the orientation marker on the Base Plate and remove the Spade Terminal from the Bolt."
      }, {
        "text": "1.3.    Remove the four 10mm Flange Nuts fastening the Top Cover to the Base Plate using the Ratcheting Socket Wrench and Socket Set. The 10mm Hex Socket attaches directly to the Ratchet."
      }, {
        "caption": "1.4.    Remove the Top Cover and set aside",
        "text": "/img/figures/TopCover.png",
        "type": "image_and_text"
      }, {
        "caption": "1.5.    Remove the Rubber Gasket and set aside.",
        "text": "/img/figures/Gasket.png",
        "type": "image_and_text"
      }]
    },

    {
      "text": "2.  INNER COVER REMOVAL",
      "subtasks": [{
        "caption": "2.1.    Confirm that the initial configuration of the wires is correct (Audible Call Out)",
        "text": "/img/figures/WireOrientation.png",
        "type": "image_and_text"
      }, {
        "text": "CAUTION: Pull on the bullet connectors. Do not pull by the wire.",
        "type": "caution"
      }, {
        "text": "2.2.    Disconnect each wire one at a time starting from the letter side in alphabetical order using Needle Nose Pliers.",
        "subtasks": [{
          "text": "2.2.1.  Disconnect Orange Wire, A → 2.\n           Disconnect Blue Wire, B → 4.\n           Disconnect White/Blue Wire, C → 3.\n           Disconnect Black/White Wire, D → 1.",
          "subtasks": [{
            "text": "/vid/Wire_Removal.mp4",
            "type": "video"
          }]
        }]
      }, {
        "text": "2.3.    Clamp the Fuel Tube in the middle of the tube uing the Hose Pinching Pliers."
      }, {
        "text": "CAUTION: Pry the Fuel Tube off gently to avoid damaging it.",
        "type": "caution"
      }, {
        "text": "2.4.    Detach the Fuel Tube from the left side and place open end into the Gasoline Container.",
        "subtasks": [{
          "text": "2.4.1.  The left side of the Fuel Tube is indicated by the red spacer. Disengage the tension clamp and remove the Fuel Tube from the fitting.",
          "subtasks": [{
            "text": "2.4.1.1.  Remove the tension clamp by pushing both of the tabs on the clamp toward one another using Pliers. Hold the tabs with the Pliers while pulling the clamp off of the fitting and up the tube."
          }, {
            "text": "2.4.1.2.  Once the tension clamp is disengaged, pry the Fuel Tube from the fitting using a Flat Head Screwdriver."
          }]
        }, {
          "text": "2.4.2.  Let the removed end of the Fuel Tube rest in the Gasoline Container."
        }]
      }, {
        "text": "2.5.    Remove the Brass Flat Head Screws using a Flat Head Scredriver."
      }, {
        "text": "2.6.    Remove the Cover Hatch and set aside."
      }, {
        "text": "2.7.    Remove the O-ring Seals from under the Cover Hatch."
      }]
    },

    {
      "text": "3.  SPARK PLUG INSPECTION",
      "subtasks": [{
        "text": "3.1.    Remove the Wire Boot from the Spark Plug."
      }, {
        "text": "3.2.    Remove the Spark Plug."
      }, {
        "caption": "3.3.    Check that the Spark Plug is in good condition (Audible Call Out).",
        "text": "/img/figures/SparkInspect.png",
        "type": "image_and_text"
      }, {
        "text": "3.4.    Reinstall the Spark Plug."
      }, {
        "text": "3.5.    Reconnect the Wire Boot to the Spark Plug."
      }]
    },

    {
      "text": "4.  INNER COVER INSTALLATION",
      "subtasks": [{
        "text": "4.1.    Replace O-ring Seals onto the Cover Hatch screw holes."
      }, {
        "text": "4.2.    Replace the Cover Hatch making sure to align arrows."
      }, {
        "text": "4.3.    Fasten the Cover Hatch with Brass Flat Head screws using a Flat Head Screwdriver."
      }, {
        "text": "4.4.    Reattach left side of the Fuel Tube."
      }, {
        "text": "4.5.    Replace the Fuel Tube tension clamps using Pliers."
      }, {
        "text": "4.6.    Remove the Hose Pinching Pliers from the Fuel Tube."
      }, {
        "text": "4.7.    Reconnect each wire one at a time starting from the number side in numerical order.",
        "subtasks": [{
          "text": "4.7.1.  Connect Black/White Wire, 1 → D.\n           Connect Orange Wire, 2 → A.\n           Connect White/Blue Wire, 3 → C.\n           Connect Blue Wire, 4 → B."
        }]
      }, {
        "caption": "4.8.    Confirm that the configuration of the wires is correct (Audible Call Out).",
        "text": "/img/figures/WireOrientation.png",
        "type": "image_and_text"
      }]
    },

    {
      "text": "5.  OUTER COVER INSTALLATION",
      "subtasks": [{
        "text": "CAUTION: Handle the Gasket gently. Do not attempt to force it.",
        "type": "caution"
      }, {
        "text": "5.1.    Replace the rubber gasket and confirm alignment (Audible Call Out)."
      }, {
        "text": "5.2.    Replace the Outer Cover."
      }, {
        "text": "5.3.    Fasten the Outer Cover to the Base Plate with the 10mm Flange Nuts using the Ratcheting Socket Wrench and Socket Set. The 10mm Hex Socket attaches directly to the Ratchet."
      }, {
      	"text": "5.4.    Replace the Spade Terminal under the 8mm nut near the orientation marker on the Base Plate and tighten the 8mm nut."
      }]
    }
  ]
};

function buildProcedure(steps, parent, depth) {
  steps.forEach(function(step, index) {
    var procID = parent + '_' + index

    if (step.type == 'image') {
      $('<li id="' + procID + '">' + '<img class="proc_image info" src="' + step.text.substr(1) + '"></li>' + '</li>').appendTo('ul#' + parent)
    } else if (step.type == 'image_and_text') {
      $('<li id="' + procID + '"><div class="info">' + step.caption + '</div><img class="proc_image info" src="' + step.text.substr(1) + '"></li>' + '</li>').appendTo('ul#' + parent)
    } else if (step.type == 'image_and_text_and_caution') {
      $('<li id="' + procID + '"><div class="info">' + step.caption + '</div><div class="caution"><div class="info">' + step.caution + '</div></div><img class="proc_image info" src="' + step.text.substr(1) + '"></li>' + '</li>').appendTo('ul#' + parent)
    } else if (step.type == 'video') {
      $('<li id="' + procID + '"><video class="info" src="' + step.text.substr(1) + '"controls></video></li>' + '</li>').appendTo('ul#' + parent)
    } else if (step.type == 'caution') {
      $('<li id="' + procID + '" class="caution"><div class="info">' + step.text + '</div></li>').appendTo('ul#' + parent)
    } else {
      $('<li id="' + procID + '"><div class="info">' + step.text + '</div></li>').appendTo('ul#' + parent)
    }
    if (step.subtasks != undefined) {
      $('<ul id="' + procID + '"></ul').appendTo('li#' + procID);
      buildProcedure(step.subtasks, procID, depth + 1)
    }
  })
}

buildProcedure(proc['PROCEDURE'], 'expList', 0)