const ecosystemData = {
  "entities": [
    {
      "id": "org_esa",
      "type": "Organization",
      "name": "European Space Agency (ESA)"
    },
    {
      "id": "org_isar",
      "type": "Organization",
      "name": "Isar Aerospace",
      "hq": "Germany"
    },
    {
      "id": "org_rfa",
      "type": "Organization",
      "name": "Rocket Factory Augsburg",
      "hq": "Germany"
    },
    {
      "id": "lv_spectrum",
      "type": "LaunchVehicle",
      "name": "Spectrum"
    },
    {
      "id": "lv_rfa_one",
      "type": "LaunchVehicle",
      "name": "RFA One"
    },
    {
      "id": "fund_isar_esa",
      "type": "FundingEvent",
      "value": "1500000 EUR",
      "name": "ESA Boost! Isar"
    },
    {
      "id": "fund_rfa_esa",
      "type": "FundingEvent",
      "value": "500000 EUR",
      "name": "ESA Boost! RFA"
    },
    {
      "id": "person_synthetic",
      "type": "Person",
      "name": "John Doe (Demo)"
    },
    {
      "id": "lv_retired_demo",
      "type": "LaunchVehicle",
      "name": "Old Rocket"
    }
  ],
  "relationships": [
    {
      "source": "org_isar",
      "target": "lv_spectrum",
      "type": "MANUFACTURES",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "evidence": "ESA is supporting the development of Isar Aerospace's Spectrum launch vehicle",
        "source_id": "src_esa_isar_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Isar_Aerospace_Spectrum_launch_vehicle"
      }
    },
    {
      "source": "org_isar",
      "target": "fund_isar_esa",
      "type": "RECEIVED_FUNDING",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "evidence": "ESA is supporting... The contract is worth \u20ac1.5M.",
        "source_id": "src_esa_isar_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Isar_Aerospace_Spectrum_launch_vehicle"
      }
    },
    {
      "source": "org_esa",
      "target": "fund_isar_esa",
      "type": "PROVIDED_FUNDING",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "evidence": "ESA is supporting... The contract is worth \u20ac1.5M.",
        "source_id": "src_esa_isar_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Isar_Aerospace_Spectrum_launch_vehicle"
      }
    },
    {
      "source": "org_rfa",
      "target": "lv_rfa_one",
      "type": "MANUFACTURES",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "evidence": "Rocket Factory Augsburg's RFA One launch vehicle",
        "source_id": "src_esa_rfa_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Rocket_Factory_Augsburg_launch_vehicle"
      }
    },
    {
      "source": "org_rfa",
      "target": "fund_rfa_esa",
      "type": "RECEIVED_FUNDING",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "evidence": "ESA is co-funding Rocket Factory Augsburg... The support is \u20ac500K.",
        "source_id": "src_esa_rfa_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Rocket_Factory_Augsburg_launch_vehicle"
      }
    },
    {
      "source": "org_esa",
      "target": "fund_rfa_esa",
      "type": "PROVIDED_FUNDING",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "evidence": "ESA is co-funding Rocket Factory Augsburg... The support is \u20ac500K.",
        "source_id": "src_esa_rfa_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Rocket_Factory_Augsburg_launch_vehicle"
      }
    }
  ]
};