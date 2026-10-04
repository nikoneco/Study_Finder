const reviewedAnswers = {
  q_00_96f8ed7c2362: {
    evidence_page_codes: ['D0-01'],
    answer_lines: [
      '国内線仕様: Max Ramp Weight 156,200 lb、Max Takeoff Weight 155,500 lb、Max Landing Weight 144,000 lb、Max Zero Fuel Weight 136,000 lb。',
      '国際線仕様: Max Ramp Weight 174,700 lb、Max Takeoff Weight 174,200 lb、Max Landing Weight 146,300 lb、Max Zero Fuel Weight 138,300 lb。',
      'Max Airspeed Limitは340 kt IAS / Mach 0.82。Max Operating Altitudeは41,000 ft。',
      'Passenger Seatは国内線仕様165席(V30)、国際線仕様144席(V40)。'
    ]
  },
  q_00_6ee482ed421c: {
    evidence_page_codes: ['F0-02', 'D0-01'],
    answer_lines: [
      '737-800のDesign Rangeは、Tokyo基準の図でSapporo、Okinawa、Seoul、Beijing、Guangzhou、Manila、Saipan、Singapore、Jakarta方面までを含む範囲として示される。',
      '図の前提は174,200 lb MTOW、162 two-class passenger、optional winglet、85% annual wind、airway and traffic allowance included、typical mission rule。',
      'このStudy Guideは距離をnmの単一数値ではなく、上記条件の到達範囲図として示している。'
    ]
  },
  q_00_5ad3e375ef3a: {
    evidence_page_codes: ['F0-03'],
    answer_lines: [
      '737-800のShip Dimensionは、全長129 ft 6 in (39.5 m)、全幅117 ft 5 in (35.7 m)、全高41 ft 2 in (12.6 m)。',
      'F0-03のStructure Dimension図に示される値で答える。'
    ]
  },
  q_00_0715efcf121d: {
    evidence_page_codes: ['F0-04'],
    answer_lines: [
      'Fuselage Dimensionで使う基準は、Station Line(STA)、Body Buttock Line(BBL / LBL / RBL)、Water Line(WL)。',
      'STAは機体前後方向、Buttock Lineは機体中心線から左右方向、Water Lineは高さ方向の位置を示す。'
    ]
  },
  q_00_d136e0952160: {
    evidence_page_codes: ['F0-04'],
    answer_lines: [
      'STA 0はFuselage Stationの基準位置で、機首側の基準線として設定される。',
      'F0-04ではFWD側のStation Line 0から、機体各部のStationが後方へ増加する形で示されている。'
    ]
  },
  q_00_1aebdb53d617: {
    evidence_page_codes: ['F0-06'],
    answer_lines: [
      'Wing STA系の主な基準はWing Station(WS)とWing Buttock Line(WBL)。',
      'F0-06ではWS 228.25 / 253.00 / 485.00 / 667.50などのWSと、WBL 71.24 / 190.97 / 709.40などのWBLが示されている。'
    ]
  },
  q_00_c8ddf581c98d: {
    evidence_page_codes: ['F0-04', 'F0-06', 'F0-07', 'F0-08'],
    answer_lines: [
      'STAは機体または各構造物の前後方向の位置基準。',
      'BL / BBL / WBLは中心線から左右方向の位置基準。',
      'WLは高さ方向の位置基準。',
      'Wing / Vertical Stabilizer / Horizontal Stabilizerでは、それぞれの構造物用のStation基準が使われる。'
    ]
  },
  q_00_20017a35a61d: {
    evidence_page_codes: ['F0-09'],
    answer_lines: [
      'Zone Noは機体上の場所を大きなエリア番号で識別し、整備作業、アクセス、部位説明、記録で位置を明確にするために使う。',
      'F0-09のZone Diagramで各Major Zoneの範囲を確認する。'
    ]
  },
  q_00_69ddf246718d: {
    evidence_page_codes: ['F0-09'],
    answer_lines: [
      '100: Lower Fuselage。',
      '200: Upper Fuselage。',
      '300: Empennage。',
      '400: Power Plant / Strut。',
      '500 / 600: Wings。',
      '700: Landing Gear / Landing Gear Doors。',
      '800: Doors。'
    ]
  },
  q_00_de1bdf185b01: {
    evidence_page_codes: ['F0-11'],
    answer_lines: [
      'Engine Hazard Areaの種類は、Inlet Suction、Exhaust Heat、Exhaust Velocity、Engine Noise。',
      'Engine運転中はInlet areaとExhaust areaに入らず、必要時はEntry / Exit Corridorを使う。'
    ]
  },
  q_00_ff37b24a0023: {
    evidence_page_codes: ['F0-11'],
    answer_lines: [
      'Inlet Hazard AreaはIdleで10 ft (3.1 m)、Takeoff Powerで14 ft (4.2 m)。',
      'Exhaust Velocity / Heat Hazardは図示範囲で確認し、Idleで4 ft (1.2 m)、Takeoffで5 ft (1.5 m)の表示がある。',
      'Entry / Exit CorridorはEngine axisに対して45 deg方向に示される。'
    ]
  },
  q_00_08bcc631e468: {
    evidence_page_codes: ['F0-11'],
    answer_lines: [
      'Entry / Exit CorridorはInlet Hazard AreaとExhaust Hazard Areaを避けてEngine周辺へ出入りするための通路。',
      '使用条件はEngineがIdleであること、Flight Compartment側と連絡が取れること、Anti-Collision LightなどEngine運転中の表示を確認すること。',
      'Corridor外のInlet / Exhaust Hazard Areaには立ち入らない。'
    ]
  },
  q_00_a26c91d389fa: {
    evidence_page_codes: ['F0-13', 'F0-14', 'F0-15', 'F0-16', 'F0-17', 'F0-18', 'F0-19', 'F0-20', 'F0-21'],
    answer_lines: [
      'P1: Captain Instrument Panel、P2: Center Instrument Panel、P3: First Officer Instrument Panel。',
      'P5: Overhead Panel(Forward / Aft)、P7: Glareshield Panel、P8: Aft Electronic Panel、P9: Forward Electronic Panel。',
      'Control StandもFlight Compartment panel配置に含める。',
      'Aft Flight Compartment側にはP6、P18、P61がある。'
    ]
  },
  q_00_34b288454a44: {
    evidence_page_codes: ['F0-22', 'F0-23', 'F0-24', 'F0-25', 'F0-26', 'F0-27', 'F0-21'],
    answer_lines: [
      'Electronic Equipment RackはE1、E2、E3、E4、E5、E6。',
      'E1からE5はElectronic Equipment Compartment、E6はAft Cargo Compartment側に示される。',
      'CCB / circuit breaker panelとしてAft Flight CompartmentのP6、P18、P61も押さえる。'
    ]
  },
  q_00_6352bd22fdd7: {
    evidence_page_codes: ['F0-28'],
    answer_lines: [
      'Program Switch Moduleの目的は、LRUへ機体仕様・装備・オプション設定をProgram Pin / Switch設定として与えること。',
      'Switch Seal、Security Switch、Pin Contact、LRUへの配線で構成され、対象LRUが機体構成に合った動作をするために使う。'
    ]
  },
  q_00_c3b8dad76826: {
    evidence_page_codes: ['F0-29'],
    answer_lines: [
      'Data Load対象として図に示される主なLRU / Systemは、CAPT CDU、F/O CDU、DEU、SATCOM、FCCS、APU、FIDS、DFDAU、CMS、ACARS / CMU、FMC、HUD。',
      'P61 Airborne Data Loader / Data Loader Control Panelから、Selectorで対象Systemを選択してLoadする。'
    ]
  },
  q_00_0bef0d5f1f3c: {
    evidence_page_codes: ['F0-29', 'F0-21'],
    answer_lines: [
      'Airborne Data Loader / Data Loader Control PanelはAft Flight CompartmentのP61 Panelにある。',
      'P61 PanelにはAirborne Data Loader、Data Loader Control Panel、Data Load Selectorがあり、Load対象Systemを選択する。',
      'Data Load対象のLRUはE/E RackまたはFlight Compartment側の各装備位置にあり、例としてCDU、DEU、SATCOM、FCC、APU、FIDS、DFDAU、CMS、ACARS/CMU、FMC、HUDがある。'
    ]
  },
  q_00_9e235bce3bac: {
    evidence_page_codes: ['F0-35', 'F0-34'],
    answer_lines: [
      'Nose Gear TowingのMax Steering Angleは78 deg。',
      '78 degを超える角度でTowingする場合はNose Gear Torsion LinkをDisconnectする。',
      '90 degを超える角度でTowingする場合はTorsion Linkに加えてTaxi Light CableもDisconnectする。',
      'Main Gear TowingはMain Landing Gear Tow Fittingを使い、図では30 degの角度指示が示される。'
    ]
  },
  q_00_d37d66d97694: {
    evidence_page_codes: ['F0-34', 'F0-35', 'F0-32', 'F0-33'],
    answer_lines: [
      'Nose TowingではNose Gear Tow Fitting / Towing Leverを使い、Steering関連のHydraulic componentとTorsion Link状態を確認する。',
      '大角度Towingでは78 deg超でTorsion LinkをDisconnect、90 deg超でTorsion LinkとTaxi Light CableをDisconnectする。',
      'Main TowingではMain Landing Gear Tow Fittingを使う。',
      'Towing前後でParking Brake、Brake Pressure、周辺クリアランス、Gear / Door周辺状態を確認する。'
    ]
  },
  q_00_225c523087cf: {
    evidence_page_codes: ['F0-36'],
    answer_lines: [
      'Jacking Pointは、A: Main Gear Axle、B: Wing、C: Aft Body、D: Forward Body、E: Nose Gear Axleとして図示される。',
      'F0-36のJacking Point図で、機体下部の各Jack Point位置を確認する。'
    ]
  }
};

module.exports = reviewedAnswers;
