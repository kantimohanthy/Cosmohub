const ecosystemData = {
  "entities": [
    {
      "id": "org_esa",
      "type": "Organization",
      "name": "European Space Agency (ESA)",
      "orgType": "Government",
      "hq_location": "Europe"
    },
    {
      "id": "org_isar",
      "type": "Organization",
      "name": "Isar Aerospace",
      "orgType": "Commercial",
      "hq_location": "Germany"
    },
    {
      "id": "org_tum",
      "type": "Organization",
      "name": "Technical University of Munich",
      "orgType": "Academic",
      "hq_location": "Germany"
    },
    {
      "id": "person_metzger",
      "type": "Person",
      "name": "Josef Fleischmann"
    },
    {
      "id": "person_dani",
      "type": "Person",
      "name": "Daniel Metzler"
    },
    {
      "id": "asset_spectrum",
      "type": "Asset",
      "name": "Spectrum",
      "assetClass": "LaunchVehicle",
      "status": "InDevelopment"
    },
    {
      "id": "asset_aquila",
      "type": "Asset",
      "name": "Aquila Engine",
      "assetClass": "Payload",
      "status": "InDevelopment"
    },
    {
      "id": "tech_prop",
      "type": "Technology",
      "name": "LOX/Propane Propulsion",
      "domain": "Propulsion"
    },
    {
      "id": "pub_isar_esa",
      "type": "Publication",
      "title": "ESA awards Isar Aerospace with \u20ac1.5M for Spectrum launch vehicle",
      "pubType": "PressRelease",
      "date": "2020-11-03",
      "url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Isar_Aerospace_Spectrum_launch_vehicle"
    },
    {
      "id": "fin_esa_boost",
      "type": "FinancialEvent",
      "eventType": "Contract",
      "value": "1500000 EUR",
      "date": "2020-11-03"
    }
  ],
  "relationships": [
    {
      "source": "person_dani",
      "target": "org_isar",
      "type": "AFFILIATED_WITH",
      "properties": {
        "role": "CEO",
        "confidence": "VERIFIED"
      }
    },
    {
      "source": "person_metzger",
      "target": "org_isar",
      "type": "AFFILIATED_WITH",
      "properties": {
        "role": "COO",
        "confidence": "VERIFIED"
      }
    },
    {
      "source": "person_dani",
      "target": "org_tum",
      "type": "AFFILIATED_WITH",
      "properties": {
        "role": "Alumni",
        "confidence": "VERIFIED"
      }
    },
    {
      "source": "org_isar",
      "target": "asset_spectrum",
      "type": "MANUFACTURES",
      "properties": {
        "confidence": "VERIFIED"
      }
    },
    {
      "source": "org_isar",
      "target": "asset_aquila",
      "type": "MANUFACTURES",
      "properties": {
        "confidence": "VERIFIED"
      }
    },
    {
      "source": "asset_aquila",
      "target": "tech_prop",
      "type": "INVOLVES_TECH",
      "properties": {
        "confidence": "VERIFIED"
      }
    },
    {
      "source": "org_esa",
      "target": "fin_esa_boost",
      "type": "FUNDS",
      "properties": {
        "source_id": "pub_isar_esa",
        "confidence": "SOURCE-BACKED"
      }
    },
    {
      "source": "fin_esa_boost",
      "target": "org_isar",
      "type": "FUNDS",
      "properties": {
        "source_id": "pub_isar_esa",
        "confidence": "SOURCE-BACKED"
      }
    }
  ]
};