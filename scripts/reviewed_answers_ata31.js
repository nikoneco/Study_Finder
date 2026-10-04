module.exports = {
  q_31_366b0976a506: {
    evidence_page_codes: ['D0-01', 'D0-03'],
    answer_lines: [
      'Captain Clock は FMC 1、FDAU、Voice Recorder に Date/Time Data を送る。',
      'First Officer Clock は FMC 2 に Date/Time Data を送る。',
      'Captain Clock からの出力は ARINC 429 Data Bus を介して送られる。'
    ]
  },
  q_31_34f4eb7f6b91: {
    evidence_page_codes: ['D0-02', 'D0-03', 'F0-02'],
    answer_lines: [
      'Clock System の Component は Captain Clock と First Officer Clock。',
      'Location は Captain Clock が Captain Instrument Panel P1、First Officer Clock が F/O Instrument Panel P3。',
      'GPS Time/Date の入力元は Multi-Mode Receiver（MMR）で、MMR は Captain/First Officer 両方の Clock に GPS Time/Date を送る。'
    ]
  },
  q_31_a55f315efd14: {
    evidence_page_codes: ['D1-01', 'D1-02', 'D1-03', 'D1-04'],
    answer_lines: [
      'FDRS の目的は、Incident Investigation と Maintenance Analysis のために Flight Condition と System Operation Data を記録すること。',
      'FDR は最新 25 時間分の Flight Data を Solid State Nonvolatile Memory に保存する。',
      '主要 Component は FDR、FDAU、FDAU Status Relay、Flight Recorder Test Module、Accelerometer、Flight Control Sensor/Transducer、Flight Surface Position Transmitter、System Test Plug/Connector、Program Switch Module。',
      '主な Location は、FDR: aft cabin overhead、FDAU: E/E Compartment E3-2 Shelf、Flight Recorder/Mach Airspeed Warning Test Module: P5 Aft Overhead Panel、System Test Plug/Connector: P18 CB Panel aft、FDAU Status Relay: J24 Panel right side of Nose Wheel Well。'
    ]
  },
  q_31_1ba1a2f2aeb9: {
    evidence_page_codes: ['D1-01', 'D1-05'],
    answer_lines: [
      'FDR は Engine 1 または 2 が作動している時、または Airplane が Air Mode の時に自動的に作動する。',
      'Engine 作動条件は N2 が約 50% 以上。',
      'Ground では Flight Recorder Test Module の TEST/NORMAL Switch を TEST にすると、Maintenance 用に FDR へ 115v AC が供給され作動する。'
    ]
  },
  q_31_b1ac7a4725c4: {
    evidence_page_codes: ['D1-02', 'D1-05'],
    answer_lines: [
      'FLT REC/Mach Air SPD WARN Test Module の amber OFF Light は、次の条件で点灯する。',
      '- Airplane が Ground にあり、両 Engine が Off。',
      '- Fault により FDAU Status Relay が Energize されない。',
      '- FDR Status Flag Signal が Fault を示す。'
    ]
  },
  q_31_6d2a91f4c8e3: {
    evidence_page_codes: ['D1-02', 'D1-05'],
    answer_lines: [
      'FDAU の機能は大別して、Mandatory FDR Flight Data を収集・Format して FDR へ送る機能と、ACMS 用 Airline Data を処理・保存・出力する機能の 2 つ。'
    ]
  },
  q_31_7adfa83ae08a: {
    evidence_page_codes: ['D1-02'],
    answer_lines: [
      'FDR 前面の ULD は Underwater Locator Beacon。',
      '事故などで FDR が水中に入った場合に Beacon を発信し、FDR の位置特定を助けるためのもの。'
    ]
  },
  q_31_66ed1773ff3e: {
    evidence_page_codes: ['D1-09', 'D2-01'],
    answer_lines: [
      'Printer と Interface を持つ System は ACARS と FDRS/FDAU。',
      'FDAU は Report を作成して Printer に送り、Printer は Output Data Bus で Status を FDAU に返す。',
      'ACARS も Printer へ Report の Input Signal/Command を送る。'
    ]
  },
  q_31_4ef48424cf4b: {
    evidence_page_codes: ['D3-01', 'D3-02'],
    answer_lines: [
      'Aural Warning System の目的は、Abnormal Airplane System Condition を乗員へ音で知らせること。',
      'AWM は各 System から Discrete Input を受け取り、Fire Bell、Chime、Clacker、Wailer、Horn などの Aural Alert Sound を発生させる。'
    ]
  },
  q_31_4c484c182d44: {
    evidence_page_codes: ['D3-03', 'D3-04', 'D3-05'],
    answer_lines: [
      'AWM が関係する主な System と音は次のとおり。',
      '- Landing Warning（PSEU）: Continuous Horn。',
      '- Takeoff Warning（PSEU）/ Cabin Altitude Warning（Cabin Altitude Panel）: Intermittent Horn。',
      '- Engine/APU Fire、Cargo Smoke/Fire、Compartment Overheat: Bell。',
      '- Autopilot Disengage（DFCS MCP）: Wailer。',
      '- Overspeed（Left/Right ADIRU）: Clacker。',
      '- Crew Call: Hi Chime。',
      '- SELCAL / ACARS / SATCOM: Hi/Lo Chime。',
      'Priority は高い順に Intermittent Horn、Steady Horn、Wailer。Bell、Clacker、Chime は Priority を持たず、他の Sound と同時発生できる。'
    ]
  },
  q_31_8e4b17c2d6a9: {
    evidence_page_codes: ['D3-03', 'D3-04', 'D3-05'],
    answer_lines: [
      'AWM の Location は Flight Compartment、P9 Forward Electronic Panel の aft right face。'
    ]
  },
  q_31_4382fecd7b47: {
    evidence_page_codes: ['D4-01', 'D4-02'],
    answer_lines: [
      'Master Caution System の目的は、Improper Airplane Operation や System Failure を Visual Alert として乗員に知らせること。',
      'System からの Discrete Ground Signal により、両方の MASTER CAUTION Light と該当する System Annunciator Light を点灯させる。'
    ]
  },
  q_31_8879906eb0e0: {
    evidence_page_codes: ['D4-02', 'D4-03', 'D4-04', 'D4-05'],
    answer_lines: [
      'System Annunciator Light と対応 Panel は次のとおり。',
      '- FLT CONT: Flight Control Panel（Left System Annunciator）。',
      '- ELEC: Generator Drive / Standby Power Panel（Left）。',
      '- APU: APU Indicator Panel（Left）。',
      '- FUEL: Fuel Control Panel（Left）。',
      '- OVHT/DET: Overheat/Fire Protection Panel（Left）。',
      '- IRS: IRS Mode Select Unit の関連 Light（IRS Master Caution Unit 経由、Left）。',
      '- HYD: Hydraulic Panel（Right System Annunciator）。',
      '- AIR COND: Air Conditioning / Bleed Air Control Panel（Right）。',
      '- ANTI-ICE: Window Heat / Probe Heat Panel（Right）。',
      '- ENG: Engine Panel（Right）。',
      '- DOORS: Door Annunciator 関連（Right）。',
      '- OVERHEAD: Flight Recorder/Mach Airspeed Warning Panel とその他 Overhead Panel Light（Right）。'
    ]
  },
  q_31_d01f6b667f83: {
    evidence_page_codes: ['D4-04', 'D4-06'],
    answer_lines: [
      'IRS Master Caution Unit は IRS 関連 Fault Light の状態を受け、Master Caution System へ Discrete Input を送る。',
      'GPS、L/R FAULT、L/R ON DC、L/R DC FAIL などが対象で、該当時は両 MASTER CAUTION Light と Left System Annunciator Light を点灯させる。',
      'Location は P61 Panel。'
    ]
  },
  q_31_aa15094eaa9a: {
    evidence_page_codes: ['D5-01'],
    answer_lines: [
      'ACMS の目的は、Altitude、Speed、Attitude、Engine/APU Data など多くの Airplane System Data を収集・記録・解析し、Flight Performance や System Condition を Monitor すること。'
    ]
  },
  q_31_452df5f785de: {
    evidence_page_codes: ['D5-01', 'D1-03'],
    answer_lines: [
      'ACMS の主要 Component は FDAU、MCDU/CDU、Printer、Event/Print Switch Panel、ADL/Data Loader Control Panel。',
      '主な Location は、FDAU: E/E Compartment E3-2 Shelf、MCDU/CDU: P9 Forward Electronics Panel、Printer と Event/Print Switch Panel: P8 Aft Electronic Panel、Data Loader Control Panel: P61 Panel。'
    ]
  },
  q_31_f88519d29811: {
    evidence_page_codes: ['D5-01', 'D5-10', 'D5-12'],
    answer_lines: [
      'EVENT/PRINT Module は ACMS の Manual Event/Report 操作用 Panel。',
      'EVENT Switch は ACMS Memory と DFDR Data に Event Mark を付ける。',
      'ACMS PIC Switch は Pilot Flying が Captain か First Officer かを ACMS に入力する。',
      'PRINT Switch（Remote Print Button）は Aircraft Condition に応じた Manual Report を作成し、Printer へ出力すると同時に DMU に Memory する。Default は Ground で Engine Data Report、In Air で Flying Report。'
    ]
  },
  q_31_dc669a9d45ad: {
    evidence_page_codes: ['D5-10', 'D5-11'],
    answer_lines: [
      'T C\'K で ACMS を用いて実施する作業は、必要な Inspection 用 Data/Report の確認。',
      '具体的には DATA DISPLAY の SYSTEM DISP から、Hard Landing Inspection では VERT G の GMX/GMN を確認し、Turbulence Inspection では GFMX/GFMN を確認する。',
      'また必要に応じて ACMS Event/Print Switch Panel の PRINT Switch で Manual Report を作成し、Engine Data Report などを Printer/DMU に残す。'
    ]
  },
  q_31_bbb42ceb5f56: {
    evidence_page_codes: ['D5-02', 'D5-13'],
    answer_lines: [
      'ACMS に関する System 不具合は、MCDU から ACMS MAIN MENU に入り、STATUS を選択して確認する。',
      'ACMS STATUS Page には FDAU、ACARS、Printer など ACMS 構成 Component の Status が OK/FAIL で表示される。',
      'FDAU 内部 Fault は DFDAU FAULTS DISPLAY で Current（Active）Faults と History Faults に分けて確認できる。'
    ]
  },
  q_31_902d88ee91a7: {
    evidence_page_codes: ['D6-39', 'D6-40'],
    answer_lines: [
      'DEU の機能は大別して次の 2 つ。',
      '1. Airplane System Data を収集し、DU に表示する Video Signal へ変換する。',
      '2. Data を他 System へ送るとともに、Input の有無・Status・Validity を Monitor し、他方 DEU と比較する。'
    ]
  },
  q_31_0c043ecbb656: {
    evidence_page_codes: ['D6-02', 'D6-03', 'D6-04', 'D6-05'],
    answer_lines: [
      'CDS の主要 Component は、2 Display Select Panel、Engine Display Control Panel、2 EFIS Control Panel、2 Display Source Selector、2 DEU、4 Coax Coupler、6 DU、2 Brightness Control Panel、2 Remote Light Sensor。',
      '主な Location は、6 DU と EFIS/Display Select/Engine Display Control/Display Source Selector/RLS/Brightness Control が Flight Compartment、DEU が E/E Compartment E3-1 Shelf。',
      'Coax Coupler は 1/3 が Captain rudder pedal 右側、2/4 が First Officer rudder pedal 左側。'
    ]
  },
  q_31_dacf477ec58c: {
    evidence_page_codes: ['D6-06', 'D10-09'],
    answer_lines: [
      '通常 AUTO Position で Failure がない場合、DEU 1 は Captain 側と Upper Center Display Unit を Control する。',
      'DEU 2 は First Officer 側と Lower Center Display Unit を Control する。',
      '具体的には DEU 1 側が Left Outboard DU、Left Inboard DU、Upper Center DU、DEU 2 側が Right Outboard DU、Right Inboard DU、Lower Center DU。'
    ]
  },
  q_31_02dc9c833612: {
    evidence_page_codes: ['D6-35'],
    answer_lines: [
      'DU は E/E Cooling Air により Cooling される。',
      'Left Outboard、Left Inboard、Lower Center DU は Forced-Air/Supply Cooling。',
      'Right Outboard、Right Inboard、Upper Center DU は Suction/Exhaust Cooling。'
    ]
  },
  q_31_ce74a15a0ab9: {
    evidence_page_codes: ['D7-01'],
    answer_lines: [
      'PFD に表示される主な情報は、Airspeed、Attitude、Altitude、Heading、Vertical Speed、Autoflight Mode Annunciation、Flight Director Command、Landing Indication、Radio Altitude、Time Critical Annunciation。'
    ]
  },
  q_31_8c941c7ee08e: {
    evidence_page_codes: ['D8-01', 'D8-11', 'D8-19', 'D8-21', 'D8-27'],
    answer_lines: [
      'ND に表示される情報は大別して Navigation/Map/Approach/VOR/VSD/Plan 関連の情報。',
      'Mode は Plan、Expanded/Centered Map、Expanded/Centered VOR、Expanded/Centered APP、Vertical Situation Display。',
      '主な Indication は Heading、Track、Ground Speed、True Airspeed、Wind、Route、Weather Radar、TCAS Data、Enhanced GPWS Data、VOR/ADF Pointer、VOR Deviation、LOC/G/S Deviation。',
      'Map Mode では Navigation Aid、Off-route Waypoint、Airport、Waypoint Altitude Constraint/ETA、GPS Position、ADIRU Position などの Supplemental Data も表示できる。',
      'VSD では Airplane Altitude、Vertical Flight Path Vector、Selected VS/Altitude、Waypoint、Runway、Terrain Data などを表示する。'
    ]
  },
  q_31_056eeaf9bbe9: {
    evidence_page_codes: ['D9-01', 'D9-10', 'D10-01', 'D10-06', 'D10-07'],
    answer_lines: [
      'Normal では Upper Center DU に Engine Primary Display、Lower Center DU に Engine Secondary Display を表示する。',
      'Upper Center DU の主な表示は A/T Limit Message、Thrust Mode/TAT、N1、EGT、Crew Alert Message、Fuel Quantity、Limited COMM Message。',
      'Lower Center DU の主な表示は N2、Fuel Flow/Fuel Used、Oil Pressure/Temperature/Quantity、Engine Vibration。',
      'SYS Switch 使用時は Lower DU に Hydraulic Quantity/Pressure、Brake Temperature、Flight Control Surface Position などの System Display を表示する。',
      'Lower DU Selector では LOWER ENG により Lower Center DU に Primary Engine Display、LOWER ND により Lower Center DU に Navigation Display を表示できる。'
    ]
  },
  q_31_0a4254642d09: {
    evidence_page_codes: ['D10-05'],
    answer_lines: [
      'MFD は Main Panel DU Select Switch を MFD にして、Inboard DU を Multi Function Display として使う機能。',
      'この状態で Engine Display Control Panel の ENG Switch を押すと Inboard DU に Engine Secondary Display が表示される。',
      'SYS Switch を押すと Inboard DU に System Display が表示される。'
    ]
  }
};
