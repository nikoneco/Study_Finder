module.exports = {
  q_30_2fca2a9172b4: {
    evidence_page_codes: ['D1-02', 'D1-03', 'D1-04', 'D1-05', 'D1-07'],
    answer_lines: [
      'Wing Thermal Anti-Ice System の主な構成と Location は次の通り。',
      '- Engine and Wing Anti-Ice Control Panel: P5 Forward Overhead Panel。',
      '- WTAI Solenoid Valve: Engine Compressor Case top、Precooler Control Valve 直前。',
      '- WTAI Shutoff Valve: 各 Engine Strut 外側寄りの Wing Leading Edge。',
      '- WTAI Ground Overheat Thermal Switch: WTAI Shutoff Valve 下流の WTAI Supply Duct 上。',
      '- Telescoping Duct / Spray Tube: Wing Leading Edge 内。各 Wing 3 つの Slat へ Hot Air を導く。'
    ]
  },
  q_30_4bda34e84f20: {
    evidence_page_codes: ['D1-03', 'D1-08'],
    answer_lines: [
      'Wing Anti-Ice Switch は Circuit Breaker Type の Switch。',
      '- ON で K1 Relay を Energize し、WTAI Shutoff Valve を Open 側へ作動させる。',
      '- Takeoff 中、Ground Logic により Low Resistance Connection が与えられて Over Current となり、Switch は OFF Position へ Trip する。',
      '- 必要なら Takeoff 後に Pilot が再度 ON にする。',
      '- Blue VALVE OPEN Light は Off / Dim / Bright で Switch と Valve Position の一致、不一致、Transit を示す。'
    ]
  },
  q_30_e392ffa4b4e8: {
    evidence_page_codes: ['D1-01', 'D1-05', 'D1-07', 'D1-08'],
    answer_lines: [
      'Wing Thermal Anti-Ice Area は 3 つの Inboard Leading Edge Slat。',
      '- Pneumatic System からの Hot Air が WTAI Shutoff Valve、Telescoping Duct、Spray Tube を通って Slat Cavity に入り、Slat を暖める。',
      '- Ground Operation では Wing を通過する Airflow が少ないため、WTAI Solenoid Valve が作動して Precooler Control Valve を Full Open にし、Engine Bleed Air に Maximum Cooling を与える。',
      '- Ground Overheat Thermal Switch は Overheat Damage から Wing Leading Edge を保護する。'
    ]
  },
  q_30_320b2026f246: {
    evidence_page_codes: ['D1-03', 'D1-06', 'D1-08'],
    answer_lines: [
      'Ground で SW ON から離陸までの作動は次の流れ。',
      '- WING ANTI-ICE Switch ON、Ground Overheat なし、Thrust Lever が約 60 deg TRA 未満なら K1 Relay が Energize し、WTAI Shutoff Valve は Open。',
      '- Blue VALVE OPEN Light は、Switch ON かつ Valve Open で Dim、Transit/Disagree で Bright。',
      '- Takeoff で Thrust Lever が約 60 deg TRA を越えると Control Stand WTAI Switch が働き、両方の WTAI Shutoff Valve を Close する。',
      '- Takeoff 中の Logic により WING ANTI-ICE Switch は OFF Position へ Trip する。'
    ]
  },
  q_30_f934b6093d1f: {
    evidence_page_codes: ['D1-01', 'D1-06', 'D1-07', 'D1-08'],
    answer_lines: [
      '離陸後、Ground 専用保護に関係する Component は System 作動と無関係になる。',
      '- Control Stand Wing Anti-Ice Switch: On Ground Only の Thrust Conservation Protection 用。',
      '- WTAI Ground Overheat Thermal Switch: Ground の Overheat Protection 用。',
      '- WTAI Solenoid Valve / Precooler Control Valve の Maximum Cooling Operation: Ground Operation 中の Overheat Damage 防止用。',
      '- Air Mode では WTAI Switch を ON にすれば K1 Relay が Energize し、WTAI Shutoff Valve が Open する。'
    ]
  },
  q_30_55e49f8d495c: {
    evidence_page_codes: ['D2-01', 'D2-02', 'D2-03'],
    answer_lines: [
      'Inlet Cowl Anti-Ice System の主な構成は次の 3 つ。',
      '- Engine and Wing Anti-Ice Panel / ENG ANTI-ICE Switch: P5 Forward Overhead Panel から Control と Indication を行う。',
      '- Inlet Cowl TAI Valve: Engine Fan Case right side。Engine Inlet Cowl への Air Flow を Control する。',
      '- Inlet Cowl TAI Pressure Switch: TAI Valve 下流の Inlet Cowl TAI Duct pressure を Monitor する。',
      '作動概要: ENG ANTI-ICE Switch ON で TAI Valve Control Solenoid に 28v DC を送り、Engine Bleed Interstage Duct Air が Inlet Cowl に流れて防氷する。Warm Air は Inlet Cowl bottom の Overboard Exhaust から排出される。'
    ]
  },
  q_30_128047b6aa2e: {
    evidence_page_codes: ['D2-02', 'D2-03'],
    answer_lines: [
      'Inlet Cowl TAI Pressure Switch は、Inlet Thermal Anti-Ice Valve 下流の Duct Pressure を Monitor する。',
      '- Sense Port pressure が 65 psi 以上になると Switch が Close する。',
      '- Switch 作動時は MASTER CAUTION、ANTI-ICE Annunciator、Amber COWL ANTI-ICE Light が点灯する。',
      '- つまり過大な downstream pressure を Flight Crew に知らせるための Switch。'
    ]
  },
  q_30_d89827d6aba5: {
    evidence_page_codes: ['D2-02', 'D2-03'],
    answer_lines: [
      'ENG ANTI-ICE Switch と Valve Position が不一致、または Valve が Transit 中の場合、Blue COWL VALVE OPEN Light は Bright になる。',
      '- Light Off: Switch OFF かつ Valve Close。',
      '- Light Dim: Switch ON かつ Valve Open。',
      '- Light Bright: Switch Position と Valve Position が Disagree、または Valve In Transit。',
      '- Open/Closed Position Switch が Valve Position Data を Panel へ与える。'
    ]
  },
  q_30_04953461f86e: {
    evidence_page_codes: ['D2-01', 'D2-02'],
    answer_lines: [
      'Inlet Cowl Anti-Ice の Air 供給元は Engine Bleed Air Interstage Duct。',
      '- Upstream: Engine Bleed Interstage Duct Air。これは PRSOV upstream air。',
      '- Control Component: Inlet Cowl TAI Valve。Engine Fan Case right side にあり、Electrically Controlled / Pneumatically Operated Butterfly Valve。',
      '- Downstream: TAI Valve 下流の Inlet Cowl TAI Duct、Inlet Cowl 内部、Bottom の Overboard Exhaust。',
      '- Downstream Pressure は Valve Regulator が約 50 psi に抑える。'
    ]
  },
  q_30_96899f650d20: {
    evidence_page_codes: ['D3-01', 'D3-02', 'D3-03', 'D3-05', 'D3-07'],
    answer_lines: [
      'Probe Anti-Ice System で Heat する Component / Location は次の通り。',
      '- Captain Pitot: Left Forward Fuselage。',
      '- First Officer Pitot / Auxiliary Pitot: Right Forward Fuselage。',
      '- Elevator Pitot 2 個: Vertical Stabilizer。',
      '- AOA Sensor 2 個: Forward Fuselage の左右。',
      '- Total Air Temperature Probe: Forward Fuselage。Probe System A 側で Control される。'
    ]
  },
  q_30_08804d420269: {
    evidence_page_codes: ['D3-02', 'D3-09'],
    answer_lines: [
      '333J 以降の Probe Anti-Ice Auto Position は、Crew が手動で Activate していなくても Engine Start 開始で Probe Heat System を自動作動させる。',
      '- PROBE HEAT A/B は P5 Forward Overhead Panel の Window and Probe Heat Panel にある。',
      '- System A は Captain Pitot、Left Elevator Pitot、Left Alpha Vane、TAT Probe を Control する。',
      '- System B は F/O Pitot、Aux Pitot、Right Alpha Vane、Right Elevator Pitot を Control する。'
    ]
  },
  q_30_1a4efffce775: {
    evidence_page_codes: ['D3-05', 'D3-06'],
    answer_lines: [
      'AOA Sensor Anti-Ice System は Electric Power と Resistance-Type Heater を使い、AOA Vane の Ice Formation を防ぐ。',
      '- 115v AC と 28v DC Power を使用する。',
      '- 各 AOA Sensor は Heater を持ち、Heater は Sensor の一部。',
      '- Heater Failure 時は AOA Sensor を交換する。'
    ]
  },
  q_30_6888bc8093ce: {
    evidence_page_codes: ['D3-07', 'D3-08'],
    answer_lines: [
      'TAT Probe Anti-Ice System は Electric Power と Resistance-Type Heating Element を使い、TAT Probe 上の Ice Formation を防ぐ。',
      '- 115v AC と 28v DC Power を使用する。',
      '- TAT Probe は Probe System A で Control される。',
      '- Heater Failure 時は TAT Probe を交換する。'
    ]
  },
  q_30_6a633363e6e9: {
    evidence_page_codes: ['D3-07'],
    answer_lines: [
      'TAT Probe への Bleed Air の目的は、Probe 内部の空気流を作り、Temperature Sensing を正しく行うため。',
      '- TAT Probe は Air Intake、Ejector、Sensing Element、Integrated Heater Element などを持つ。',
      '- Bleed Air は Ejector に使われ、Probe 内に Airflow を作る。',
      '- Anti-Ice の Heat は Electric Heater が担当する。'
    ],
    problem_reason: 'TAT Probe の Bleed Air 目的は抽出本文上の部品説明から整理。必要なら原図 F3-07 も目視確認。'
  },
  q_30_c8e066e9c3a1: {
    evidence_page_codes: ['D3-02', 'D3-08', 'D3-09'],
    answer_lines: [
      'TAT TEST Switch の目的は、Ground で TAT Probe Electric Heater を Test すること。',
      '- Window and Probe Heat Panel 上にある。',
      '- Ground で Electric Heater の作動確認に使う。',
      '- Probe System A 側の TAT Probe Heat を確認する。'
    ]
  },
  q_30_31170bf885a0: {
    evidence_page_codes: ['D3-01', 'D3-02'],
    answer_lines: [
      '737 で Probe Anti-Ice として Heating している Component は次の通り。',
      '- Angle of Attack Sensor: 2 個。',
      '- Total Air Temperature Probe: 1 個。',
      '- Pitot Probe: 5 個。',
      '内訳: System A は Captain Pitot、Left Elevator Pitot、Left Alpha Vane、TAT Probe。System B は F/O Pitot、Aux Pitot、Right Alpha Vane、Right Elevator Pitot。'
    ]
  },
  q_30_d38f04fc96b4: {
    evidence_page_codes: ['D4-01', 'D4-02', 'D4-03', 'D4-05', 'D4-07'],
    answer_lines: [
      'Cockpit Window Anti-Ice System は No.1 / No.2 Flight Compartment Window を Electric Heat する System。',
      '- 主構成: Window conductive coating、temperature sensor、Window Heat Control Unit (WHCU)、Window Heat terminal connection、P5 Window and Pitot Heat Panel。',
      '- 各 WHCU は 1 つの Window Heat を Control し、Window Temperature を Monitor する。',
      '- WINDOW HEAT Switch ON で System Energize。Window が 100 F 未満なら Current を流して Heat する。',
      '- Target Temperature 約 110 F に近づくと WHCU が Current を Ramp Down し、Thermal Shock と Overshoot を防ぐ。'
    ]
  },
  q_30_db4f21c43ce5: {
    evidence_page_codes: ['D4-05'],
    answer_lines: [
      'Power Test Switch の目的は、Window が暖かく Heat が不要な状態でも Window Heat System の Confidence Test を行うこと。',
      '- PWR TEST Position に Hold すると、WHCU が Window に Current を流し Green ON Light を点灯させる。',
      '- Green ON Light を確認したらすぐに Switch を離す。',
      '- Hold し続けると Window を Overheat させるため注意が必要。'
    ]
  },
  q_30_1f06cfe23750: {
    evidence_page_codes: ['D4-06', 'D4-07'],
    answer_lines: [
      'WHCU が Window Overheat Trip とする条件は、次の 2 条件を同時に検知した場合。',
      '- Window Temperature が 145 F (62 C) 以上。',
      '- Window Heat Circuit へ電流が流れている。',
      '- Overheat Protection Circuit は Window に Power が加えられている間だけ作動する。'
    ]
  },
  q_30_7194c669ff9c: {
    evidence_page_codes: ['D4-06', 'D4-07'],
    answer_lines: [
      'Window Overheat Trip 時の作動は次の通り。',
      '- Window への Electric Current を Remove / Stop する。',
      '- Green ON Light が消灯する。',
      '- Amber OVERHEAT Light が点灯する。',
      '- MASTER CAUTION と ANTI-ICE Annunciator Light が点灯する。',
      'Reset 方法: WINDOW HEAT Switch を OFF Position にした後、ON Position に戻す。ただし Window が冷えるまで Overheat は Reset できない。'
    ]
  },
  q_30_abaab3dee36b: {
    evidence_page_codes: ['D6-01'],
    answer_lines: [
      'Hydrophobic Windshield Coating の目的は、Heavy Rain 中の Visibility を改善すること。',
      '- Left and Right No.1 Flight Compartment Window の Outside Surface 上にある。',
      '- Water をはじき、水滴を玉状にして Windshield から落とす。',
      '- Windshield の強度や Optical Clarity には影響しない。',
      '注意事項: 定期的に清掃し、50% isopropyl alcohol と柔らかい布を使う。研磨 Pad / abrasive cleaner / fluoride 系 cleaner は使用しない。Wiper force と worn wiper に注意する。'
    ]
  },
  q_30_14ca48393a07: {
    evidence_page_codes: ['D7-01'],
    answer_lines: [
      'Water and Toilet Drain Anti-Ice System の目的は、次の Ice Formation を防ぐこと。',
      '- Potable Water System service and supply component。',
      '- Gray Water System drain component。',
      '- Vacuum Waste System drain and service component。',
      'Ice Formation は Damage、Line Blockage、Service Operation の阻害、Forward Drain Mast 着氷による Structure Damage を起こすため、Electric Heat で防止する。'
    ]
  },
  q_30_89009583f578: {
    evidence_page_codes: ['D7-01', 'D7-02', 'D7-03', 'D7-04'],
    answer_lines: [
      'Integral Heater Type の Component は次の通り。',
      '- Service Panel Fitting。',
      '- Drain Mast。',
      '- Hose with Integral Heating Element。',
      'Integral Heater 以外で Heat する Component は、Heater Tape (Ribbon Heater) と Heater Blanket を使用する。例: Gray Water Drain Line は Tape Heater、Waste Tank Drain Valve は Blanket Heater、Waste Tank Rinse Line は Tape Heater。'
    ]
  },
  q_30_4d6c86d373f9: {
    evidence_page_codes: ['D7-03'],
    answer_lines: [
      'Drain Mast は Integral Electric Heater Element を持つ。',
      '- Airplane に Power があると、Heating は Constant and Automatic に行われる。',
      '- Drain Mast Heating Element は 2 種類の Voltage で作動する。',
      '- In Flight: 115v AC。',
      '- On Ground: 28v AC。',
      '- Ground では人体への火傷防止のため Reduced Voltage を使用し、Drain Mast の service life も延ばす。'
    ]
  }
};
