module.exports = {
  q_49_15b0345f1f01: {
    evidence_page_codes: ['D0-01'],
    answer_lines: [
      '- Manufacturer: Honeywell.',
      '- Type/Model: 131-9(B) Auxiliary Power Unit.',
      '- APU Generator: 90 KVA up to 32,000 ft, then 66 KVA up to 41,000 ft.',
      '- Electric + Pneumatic operation: available up to 10,000 ft.',
      '- Pneumatic only operation: available up to 18,000 ft.',
      '- APU start: available up to 41,000 ft.'
    ]
  },
  q_49_08ee603dbe9f: {
    evidence_page_codes: ['D0-12'],
    answer_lines: [
      '- APU Compartment Cooling System は、APU Compartment と APU Engine Oil を Cooling する。',
      '- APU Exhaust の High Speed Flow により Eductor 内に Negative Pressure ができ、Outside Air を APU Compartment に引き込む。',
      '- Cooling Air は APU Compartment に入り、Oil Cooler を通って Oil を冷却する。',
      '- その後、Cooling Air は APU Exhaust Flow と一緒に Exhaust から機外へ排出される。'
    ]
  },
  q_49_65a00c32554e: {
    evidence_page_codes: ['D1-04'],
    answer_lines: [
      '- APU は 3 個の Primary Mount で支持され、各 Primary Mount は Vibration Isolator として働く。',
      '- Forward Left Mount には Redundant Vertical Strut、Forward Right 側には Redundant Side Strut がある。',
      '- Forward 2 個の Mount は 1 本の Crossbeam に取り付き、この Crossbeam は APU Compartment 上部構造へ取り付く。',
      '- Aft 2 個の Mount は 2 本の Crossbeam に取り付き、同じく APU Compartment 上部構造へ取り付く。',
      '- Right Forward Mount と Right Aft Mount は Side Wall にも接続される。',
      '- Mount が 1 箇所 Fail しても、Redundant Strut と残りの Primary Mount で APU を保持できる。'
    ]
  },
  q_49_31985aac794c: {
    evidence_page_codes: ['D1-08', 'D1-09'],
    answer_lines: [
      '- Forward Drain Collector Tube: 3 本。FCU Seal、SCV Seal、IGVA Seal からの Drain を集める。',
      '- Middle Drain Collector Tube: 1 本。APU Load Compressor Seal Drain を集める。',
      '- Aft Drain Collector Tube: 3 本。Combustor Case、Eductor、Muffler からの Drain を集める。',
      '- Drain Mast へ Fuel/Oil が出る場合は Leak Source の調査が必要。Water Leak は Normal とされる。'
    ]
  },
  q_49_8547726c387f: {
    evidence_page_codes: ['D1-08', 'D1-09'],
    answer_lines: [
      '- Individual Witness Port で個別に確認できる Component は、FCU Seal、SCV Seal、IGVA Seal。',
      '- これらの Witness Port から Fuel/Oil Leakage がある場合、APU Failure を示す。',
      '- Post SB configuration では Witness Port が無い場合があるため、実機構成で確認する。'
    ]
  },
  q_49_e356f740c43e: {
    evidence_page_codes: ['D3-02', 'D3-09', 'D3-10'],
    answer_lines: [
      '- APU Fuel は、APU Fuel Shutoff Valve を通って APU Fuel System へ供給される。Fuel Shutoff Valve は APU Switch ON/START で Open する。',
      '- 通常は AC Boost Pump から加圧 Fuel を受ける。AC Boost Pump が供給できない場合は Main Tank 1 から Suction Feed できる。',
      '- ECU は APU Speed、EGT、T2、P2、Fuel Temperature などから必要 Fuel Flow を計算し、FCU に Fuel Flow Command を送る。',
      '- FCU は Fuel を Pressurize/Clean/Pressure Control/Flow Control し、Metered Fuel を Flow Divider/Flow Divider Solenoid へ送る。',
      '- Flow Divider は Primary/Secondary Fuel Manifold へ Fuel を分配し、Fuel Manifold は 10 個の Dual Tipped Fuel Nozzle へ Fuel を供給する。',
      '- Fuel Nozzle は Metered Fuel を Combustor に噴射する。'
    ]
  },
  q_49_d32507a5960f: {
    evidence_page_codes: ['D3-02', 'D3-07'],
    answer_lines: [
      '- Fuel Nozzle は 10 本。',
      '- 各 Nozzle は Dual Tipped Fuel Nozzle で、Primary/Secondary Fuel を Combustor に噴射する。'
    ]
  },
  q_49_7f7f0b1f554b: {
    evidence_page_codes: ['D3-02', 'D3-03', 'D3-04', 'D3-05', 'D3-06', 'D3-07', 'D5-06'],
    answer_lines: [
      'FCU / Lube Module 前面:',
      '- FCU: Start、Acceleration、On Speed に必要な Metered Fuel を供給する。Fuel の Pressurize/Clean/Pressure Control/Flow Control を行い、IGVA/SCV 用の Servo Fuel も供給する。Location は Lube Module 前面。',
      '- Inlet Filter: High Pressure Gear Pump に入る前の Contamination を除去する。FCU 内。',
      '- High Pressure Fuel Pump: FCU で使用する High Pressure Fuel を作る。FCU 内。',
      '- Pump Relief Valve: Fuel Pressure を 950 psi 以下に制限する。FCU 内。',
      '- High Pressure Filter: Gear Pump からの Contamination を除去する。FCU 内。',
      '- Actuator Pressure Regulator: IGVA/SCV 用 Actuator Fuel Pressure を約 250 psid に維持する。FCU 内。',
      '- Differential Pressure Regulator: Metering Valve 上下流に 50 psid の Delta-P を作る。FCU 内。',
      '- Torque Motor Metering Valve: Combustor へ送る Fuel Flow を調整する。FCU 内。',
      '- Flow Meter Pressurizing Valve/Flow Meter: Downstream Pressure を保持し、Valve Position を ECU へ送って Fuel Flow Feedback とする。FCU 内。',
      '- Fuel Solenoid Valve: ECU Command で Fuel Flow を Open/Close する。7% Speed で Open、Shutdown で Close。FCU 内。',
      '- Fuel Temperature Sensor: Fuel Temperature を ECU へ送る。FCU 内。',
      '',
      'FCU 外部:',
      '- Flow Divider / Flow Divider Solenoid: Primary/Secondary Manifold への Fuel 分配を Control する。Location は Combustion Chamber 近く、APU Engine lower left side。',
      '- Primary/Secondary Fuel Manifold: Fuel Nozzle へ Fuel を供給する。Location は Combustion Chamber 周囲。',
      '- Fuel Nozzle: Metered Fuel を Combustor に噴射する。Location は Combustor 周囲、10 本。',
      '- P2/T2/Speed/EGT/Fuel Temperature などは ECU の Fuel Control Logic に使われる。'
    ]
  },
  q_49_826c12c7abe2: {
    evidence_page_codes: ['D3-06', 'D3-10'],
    answer_lines: [
      '- Flow Divider の目的は、FCU からの Metered Fuel を Primary Fuel Manifold と Secondary Fuel Manifold へ分配すること。',
      '- Start/Acceleration 初期は Primary Manifold のみに Fuel を供給し、Flameout や Underspeed/Shutdown を防止する。',
      '- Flow Divider Solenoid は Secondary Manifold への Fuel を Control する。Spring で Open、ECU が Energize すると Close する。',
      '- ECU は 7-30% Speed の間 Solenoid を Energize/Close し、Primary Manifold のみに Fuel を供給する。',
      '- APU 25-40% Speed または Fuel Pressure 約 120 psi で Check Valve が Open し、Secondary Manifold へも Fuel が供給される。',
      '- 25,000 ft 以上で Electrical Load を加えた Operation では、ECU が Solenoid を Close して Secondary Fuel を止め、Underspeed/Shutdown を防ぐ。',
      '- ECU は P2、T2、APU Speed を使って Flow Divider Solenoid を Control する。'
    ]
  },
  q_49_72c1ec1cae58: {
    evidence_page_codes: ['D4-01', 'D4-02', 'D4-03', 'D4-04'],
    answer_lines: [
      '- Ignition Unit: 28v DC を High Voltage Pulsed Current に変換し、Igniter Plug へ供給する。Location は APU Engine lower side。',
      '- Igniter Plug Lead: Ignition Unit と Igniter Plug を接続し、Radio Interference を防ぐ Insulation を持つ。Location は APU lower engine area。',
      '- Igniter Plug: Combustor に High Energy Spark を供給する。Location は APU lower engine area。',
      '- SPU (Start Power Unit): 115v AC または 28v DC を 270v DC に変換する。Location は EE Compartment E2-2 shelf。',
      '- SCU (Start Converter Unit): 270v DC を AC に変換して Starter Generator へ送る。Location は EE Compartment E2-2 shelf。',
      '- Starter Generator: APU Start 時に初期回転を与え、On Speed 後は AC Electrical Power を供給する。Location は APU Gearbox upper right side。',
      '- ECU: Start Sequence を Control する。Location は Aft Cargo Compartment right side。'
    ]
  },
  q_49_26a4d80ae6ec: {
    evidence_page_codes: ['D4-02'],
    answer_lines: [
      '- SPU (Start Power Unit) は、115v AC Transfer Bus 1 または 28v DC Battery Power を受け、270v DC に変換する。',
      '- 変換した 270v DC は SCU へ送られ、SCU が Starter Generator 用の AC Power に変換する。',
      '- SCU を経由して Fault Data を ECU へ送る。',
      '- Location は EE Compartment E2-2 shelf。'
    ]
  },
  q_49_d5f45f29bb59: {
    evidence_page_codes: ['D4-02'],
    answer_lines: [
      '- SCU (Start Converter Unit) は、SPU からの 270v DC を AC Power に変換し、Starter Generator へ送る。',
      '- ECU から Air Inlet Door Full Open かつ Speed < 7% の Start Signal を受けると、SCU は SPU に 270v DC Supply を Command する。',
      '- APU Speed 70% で ECU が Start Signal を Remove すると、SCU/SPU は Starter Generator への Power を止める。',
      '- SCU は Fault Data を ECU/CDU へ送る。',
      '- Location は EE Compartment E2-2 shelf。'
    ]
  },
  q_49_33571d4e13f0: {
    evidence_page_codes: ['D5-01', 'D5-02', 'D5-04', 'D5-06', 'D5-07', 'D5-08'],
    answer_lines: [
      '- Load Compressor: Main Engine Start、Air Conditioning、Pressurization 用の Pneumatic Air を供給する。APU Engine 内の Load Compressor Section。',
      '- IGV (Inlet Guide Vane): Load Compressor への Airflow を調整する。Load Compressor Inlet 周囲に 16 枚ある。',
      '- IGVA (Inlet Guide Vane Actuator): FCU からの Fuel Pressure と ECU Command で IGV Angle を 15-115 deg の範囲で動かす。Location は Compressor right side。',
      '- BAV (Bleed Air Valve): Airplane Pneumatic Manifold と APU Load Compressor を Isolation/Connection する Butterfly Valve。Location は APU forward right side。',
      '- Pressure Sensors P2/PT/DP: Load Compressor Pressure を Electrical Signal に変換して ECU へ送る。P2 は APU Inlet、PT/DP は APU Inlet の SCV 近く。',
      '- SCV (Surge Control Valve): Load Compressor Surge 防止のため、Bleed Air を Exhaust へ逃がす。Location は APU right side / Surge Bleed Duct。',
      '- ECU: IGVA、BAV、SCV を Control し、Load Compressor Airflow と Surge Margin を管理する。Location は Aft Cargo Compartment right side。'
    ]
  },
  q_49_39dc3ade462b: {
    evidence_page_codes: ['D5-05'],
    answer_lines: [
      '- No Bleed Mode.',
      '- Duct Pressurization Mode.',
      '- Main Engine Start Mode.',
      '- ACS Mode.',
      '- ACS Mode には One Pack In Flight、One Pack Ground、Two Pack Normal、Two Pack High の Submode がある。'
    ]
  },
  q_49_1287444ae8f5: {
    evidence_page_codes: ['D5-03'],
    answer_lines: [
      'ECU が BAV Solenoid を Energize し、Load Compressor Air が利用可能なとき BAV は Open する。条件は次の通り。',
      '- APU Bleed Switch ON.',
      '- APU が Cool Down Cycle 中でない。',
      '- APU Speed 95% 以上。',
      '- ADIRU Altitude Signal で 18,000 ft 未満。',
      '- Climb 中は P2 Altitude Signal で 21,000 ft 未満。',
      '- Descent 中は P2 Altitude Signal で 19,000 ft 未満。'
    ]
  },
  q_49_c7027b7306b6: {
    evidence_page_codes: ['D7-01', 'D7-02', 'D7-03', 'D7-05', 'D7-06', 'D7-07', 'D7-08'],
    answer_lines: [
      '- Lube Module: APU Gearbox 前面にあり、Lube Pump、Scavenge Pump、Pressure Regulating Relief Valve を含む。Oil を Pressurize/Clean/Pressure Regulate する。',
      '- Lube Pumps: Gearbox Reservoir から Oil を吸い上げ、Oil Cooler と Lube Module を経由して Starter Generator、Gearbox Bearing/Gears、Turbine Bearing Compartment へ供給する。',
      '- Scavenge Pumps: Turbine Bearing Compartment と Starter Generator から Oil を回収し、Gearbox Reservoir へ戻す。',
      '- Pressure Regulating Relief Valve: Oil Pressure を 60-74 psi に保ち、高すぎる場合は Oil を Pump Inlet 側へ戻す。Relief は 200-280 psi。',
      '- Oil Filter Element: Oil の Contamination を除去する。Lube Module 外側の LRU。',
      '- Generator Filter Element: Starter Generator Scavenge Oil をろ過する。Lube Module 外側の LRU。',
      '- Filter Indicator / Filter Bypass Switch: Filter Clog/Bypass 状態を表示または ECU へ送る。Lube Module 外側。',
      '- Oil Temperature Sensor: Oil Temperature を ECU へ送る。Lube Module 外側。',
      '- Low Oil Pressure Switch: Oil Pressure Low を ECU/Indication に送る。Location は Gearbox top left。',
      '- Oil Level Sensor / Sight Glass / Fill Port: Oil Quantity の確認と Servicing に使う。Gearbox 側。',
      '- Oil Cooler: APU Turbine Case upper left にあり、Eductor Cooling Air で Oil を冷却する。',
      '- Temperature Control Valve: Oil Cooler への流量と Bypass を制御する。Location は APU Gearbox rear。',
      '- Magnetic Drain Plug: Metal Particle を捕捉し、Oil Drain/Inspection に使う。'
    ]
  },
  q_49_8156bd62860a: {
    evidence_page_codes: ['D8-10'],
    answer_lines: [
      '- FULL.',
      '- ADD.',
      '- LOW.',
      '- WAIT.',
      '- UNKNOWN.'
    ]
  },
  q_49_c70a9a61ecff: {
    evidence_page_codes: ['D7-03'],
    answer_lines: [
      '- Pressure Regulating Relief Valve は、APU Oil Supply Pressure を 60-74 psi に維持する。',
      '- Oil Pressure が高くなりすぎた場合、Oil を Pump Inlet へ戻して Pressure を下げる。',
      '- Relief Valve は 200-280 psi で作動する。'
    ]
  },
  q_49_bfe557685a7c: {
    evidence_page_codes: ['D7-03', 'D7-08'],
    answer_lines: [
      '- Main Oil Filter が Clog すると、Oil Temperature 90 F 以上かつ Differential Pressure 26-40 psid で Filter Indicator Button が Pop Out する。',
      '- Main Oil Filter は Differential Pressure 50-70 psid で Bypass する。',
      '- Starter Generator Scavenge/Generator Filter が Clog すると、Filter Pressure Switch が Differential Pressure 30-40 psid を 5 秒検知して ECU へ Signal を送る。',
      '- Generator Filter も Differential Pressure 50-70 psid で Bypass する。',
      '- Starter Generator Filter Clog は、Oil Temperature > 100 F、Both Engines Off > 90 sec、Airplane on Ground、Clog 5 sec 以上の条件で ECU が Oil Filter Shutdown を行い、APU FAULT/Protective Shutdown につながる。'
    ]
  },
  q_49_459a782de317: {
    evidence_page_codes: ['D7-03'],
    answer_lines: [
      '- Supply Pump は 3 個。',
      '- Scavenge Pump は 4 個。',
      '- 内訳は Starter Generator Scavenge Pump 3 個、Turbine Bearing Scavenge Pump 1 個。'
    ]
  },
  q_49_ce769dc62dec: {
    evidence_page_codes: ['D0-04', 'D0-05', 'D0-09', 'D8-01', 'D8-06'],
    answer_lines: [
      'Cockpit Switch / Control:',
      '- APU Switch (P5): APU Start/Stop.',
      '- APU Bleed Air Switch (P5): APU Bleed Command.',
      '- APU Generator Switch (P5): APU Generator Control.',
      '- APU Fire Warning Switch (P8): Pull で APU Stop/Fire Shutdown。',
      '- Battery Switch (P5): OFF にすると APU Stop 可能。',
      '',
      'Cockpit Indication:',
      '- APU EGT Indicator.',
      '- MAINTENANCE Light (blue): No Automatic Shutdown.',
      '- LOW OIL PRESSURE Light (amber): Automatic Shutdown.',
      '- FAULT Light (amber): Automatic Shutdown.',
      '- OVERSPEED Light (amber): Automatic Shutdown.',
      '- APU Light / System Annunciator Light on P7.',
      '- MASTER CAUTION and APU Annunciator Light: Protective Shutdown 時に点灯。',
      '- CDU: Current Status、Fault History、Maintenance History、Ident/Config、Input Monitoring、Oil Quantity を表示できる。'
    ]
  },
  q_49_d09f98fa3a83: {
    evidence_page_codes: ['D0-05', 'D1-07', 'D8-01'],
    answer_lines: [
      '- P28 APU Remote Control Panel は Right Main Wheel Well の Aft Bulkhead にある。',
      '- P28 の Remote Fire Switch Handle を Pull すると APU を Stop できる。',
      '- P28 Remote Fire Switch が Close Position になると、APU Shutdown、APU Fuel Shutoff Valve Close、APU Air Inlet Door Close が行われる。'
    ]
  },
  q_49_298e2c9caf02: {
    evidence_page_codes: ['D0-02', 'D2-01'],
    answer_lines: [
      '- APU Engine は Load Compressor と APU Starter Generator を作動させる Power を供給する。',
      '- Main Section: Accessory Gear Box.',
      '- Main Section: Single Stage Load Compressor.',
      '- Main Section: Single Stage Engine Compressor.',
      '- Main Section: Combustion Chamber.',
      '- Main Section: Two Stage Axial Flow Turbine.',
      '- Engine で回転させられる Component は Common Shaft 上にあり、Shaft は Accessory Gearbox と Load Compressor を駆動する。',
      '- Power Section としては 1-stage centrifugal compressor、reverse-flow annular combustor、2-stage axial turbine で構成される。'
    ]
  },
  q_49_c537d346b817: {
    evidence_page_codes: ['D1-02', 'F1-02', 'D3-02', 'D4-03', 'D5-02', 'D5-06', 'D9-02'],
    answer_lines: [
      '図面番号の対応は抽出テキストから確定できないため、D1-02/F1-02 の APU Component Location 図に出る主要 Component として整理する。',
      '- Fuel Manifold: Combustion Chamber 周囲。Primary/Secondary Fuel を Fuel Nozzle へ供給する。',
      '- Fuel Nozzle: Combustor 周囲。Metered Fuel を APU Combustor に噴射する。10 本、Dual Tipped。',
      '- Starter Generator: APU Gearbox upper right side。Start 時に初期回転を与え、On Speed 後は AC Electrical Power を供給する。',
      '- Bleed Air Valve (BAV): APU forward right side。APU Load Compressor と Airplane Pneumatic Manifold を Isolation/Connection する。',
      '- Inlet Guide Vane Actuator (IGVA): Compressor right side。IGV Angle を Control し、Load Compressor Airflow を調整する。',
      '- Pressure Sensors: P2 は APU Inlet、PT/DP は APU Inlet の SCV 近く。Load Compressor Pressure を ECU へ送る。',
      '- Ignition Unit: APU lower engine area。28v DC を High Voltage Pulsed Current に変換して Igniter Plug へ送る。',
      '- Surge Control Valve (SCV): APU right side / Surge Bleed Duct。Load Compressor Surge 防止のため Bleed Air を Exhaust へ逃がす。',
      '- Data Memory Module (DMM): APU left side。APU Health Data、Operating Hour、Serial Number、Start/Shutdown Data などを Non Volatile Memory に保存する。',
      '- Lube Module: APU Gearbox front。Oil Pump/Scavenge Pump/Pressure Regulating Relief Valve を含み、Oil を供給・回収・圧力調整する。',
      '- Fuel Control Unit (FCU): Lube Module front。Metered Fuel と IGVA/SCV 用 Servo Fuel を供給する。',
      '- APU Engine: Aft fuselage APU Compartment。Load Compressor と Starter Generator を駆動する Power を供給する。'
    ],
    problem_reason: 'The standard problem references drawing numbers on page 51, but the drawing-number labels are not reliably extracted from the PDF text. Verify the exact number-to-component mapping on the original page image.'
  }
};
