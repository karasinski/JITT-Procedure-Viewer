var proc = {
  "PROCEDURE": [{
      "text": "1.  OUTER COVER REMOVAL",
      "subtasks": [{
        "caption": "1.1.    Confirm that the initial orientation of the Inspection Box is correct (Audible Call Out)",
        "text": "/img/figures/Orientation.png",
        "type": "image_and_text"
      }, {
        "text": "1.2.    Remove the four 10mm Flange Nuts fastening the Top Cover to the Base Plate using the Ratcheting Socket Wrench and Socket Set. The 10mm Hex Socket attaches directly to the Ratchet."
      }, {
        "caption": "1.3.    Remove the Top Cover and set aside",
        "text": "/img/figures/TopCover.png",
        "type": "image_and_text"
      }, {
        "caption": "1.4.    Remove the Rubber Gasket and set aside.",
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
          "text": "2.2.1.  Disconnect Orange Wire, A → 2."
        }, {
          "text": "2.2.2.  Disconnect Blue Wire, B → 4."
        }, {
          "text": "2.2.3.  Disconnect White/Blue Wire, C → 3."
        }, {
          "text": "2.2.4.  Disconnect Black/White Wire, D → 1."
        }]
      }, {
        "text": "CAUTION: Pry the Fuel Tube off gently to avoid damaging it.",
        "type": "caution"
      }, {
        "text": "2.3.    Clamp the Fuel Tube in the middle of the tube uing the Hose Pinching Pliers."
      }, {
        "text": "2.4.    Remove the Fuel Tube tension clamps using Pliers from the left side of the Fuel Tube indicated by the red spacer."
      }, {
        "text": "2.5.    Detach the left side of the Fuel Tube using a Flat Head scredriver and place open end into the Gasoline Container."
      }, {
        "text": "2.6.    Remove the Brass Flat Head Screws using a Flat Head Scredriver."
      }, {
        "text": "2.7.    Remove the Cover Hatch and set aside."
      }, {
        "text": "2.8.    Remove the O-ring Seals from under the Cover Hatch."
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
          "text": "4.7.1.  Connect Black/White Wire, 1 → D."
        }, {
          "text": "4.7.2.  Connect Orange Wire, 2 → A."
        }, {
          "text": "4.7.3.  Connect White/Blue Wire, 3 → C."
        }, {
          "text": "4.7.4.  Connect Blue Wire, 4 → B."
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
    } else if (step.type == 'video') {
      $('<li id="' + procID + '"><div class="info">' + step.text + '</div></li>' + '</li>').appendTo('ul#' + parent)
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
