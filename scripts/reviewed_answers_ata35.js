const reviewedByQuestion = [
  ['q_35_46c81b40a8b7', ['D1-01', 'D1-03', 'D2-04'], ['OXYGEN', 'WARNING', 'OIL', 'GREASE', 'CLEAN'], [
    'Oxygen System の整備では、System と Component を清潔かつ乾燥した状態に保つ。',
    'Oil、Grease、汚れ、その他の可燃性物質を Oxygen System Component に触れさせてはならない。高圧Oxygenと油脂類が接触すると発火・爆発の危険がある。',
    '承認されたCleaning剤、Installation/Test機材、AMM 12章に指定された材料と手順を使用する。',
    'CylinderのConnectionを外す時は、Crew Mask側Supply LineのPressureを抜き、加圧状態のFittingにTorqueをかけない。'
  ]],
  ['q_35_45b3ec852915', ['D0-01', 'D1-01', 'D1-02', 'D1-03', 'D1-04', 'D1-08'], ['CREW OXYGEN', 'CYLINDER', 'MASK', 'LOCATION'], [
    'Crew Oxygen System は、E/E Compartment右側のTransverse Rack下にあるHigh Pressure Oxygen Cylinderから始まる。',
    'Cylinder Head AssemblyにはSlow Opening Shutoff Valve、Mechanical Pressure Gage、Frangible Disk、Pressure Reducing Regulator、Pressure Transducer、Overboard Discharge Line、Flight CompartmentへのSupply Lineがある。',
    'Shutoff Valveを開くとCylinderからSystemへOxygenが供給され、Pressure Reducing RegulatorでBottle Pressureを60から85 psigへ調圧する。',
    'Oxygen Supply LineはSeamless Stainless Steel Tubeで、Manifold/Supply Tubingを通り、各Crew Seat外側のFlight Crew Oxygen Maskへ供給される。',
    'Flight Crew Oxygen MaskはStowage Box内に収納され、Diluter-Demand Regulator、Control機能、Inflatable Harness、Supply Hoseを持つ。'
  ]],
  ['q_35_d769ba25d4c0', ['D1-02', 'D1-03', 'D1-05', 'D1-06'], ['PRESSURE', 'INDICATOR', 'TRANSDUCER'], [
    'Crew Oxygen Bottle Pressureは、Cylinder Head Assembly上のMechanical Pressure Indicatorで直接確認できる。このIndicatorはShutoff Valveの位置に関係なくCylinder内Pressureを示す。',
    'Flight Compartmentでは、P5 Aft Overhead PanelのOxygen PanelにあるPressure Indicatorで確認できる。',
    'Pressure TransducerがCylinder PressureをElectrical Signalに変換し、Flight Crew Oxygen Pressure Indicatorへ送る。',
    '通常Pressureは70 Fで1,850 psi。Panel Indicatorを見るにはBattery SwitchがONである必要がある。'
  ]],
  ['q_35_26eb9fbb020e', ['D1-02', 'D1-03', 'D1-04', 'D1-07'], ['PROTECTION', 'FRANGIBLE DISK', 'RELIEF', 'DISCHARGE'], [
    'Crew Oxygen CylinderのProtectionは、Frangible DiskによるOverpressure Safety Relief。',
    'Cylinder Pressureが約2,600 psiになるとFrangible Diskが破れ、OxygenはHigh Pressure Lineを通って機外へ放出される。',
    '放出時はFuselage SkinのGreen Discharge Indication Diskが吹き飛び、Overpressure Dischargeを示す。',
    'Pressure Reducing Regulatorは下流ComponentをHigh Pressureから保護し、下流Line Pressureが100 psig以上になるとRelief Valveが開いてCylinder周囲へVentする。',
    'Cylinder HeadにはHigh Temperature保護用のThermal Compensatorもある。'
  ]],
  ['q_35_8e9e428497b7', ['D1-08', 'D1-09'], ['MASK', 'DONNING', 'DEMAND', '100%', 'EMERGENCY'], [
    'Maskは赤色のDonning/Inflation Plateを掴んで引くとStowage Boxから取り出せる。Plateを押している間Harnessが膨張し、片手で装着できる。',
    'MaskをStowage Boxから取り出すとBox Shutoff ValveがOpenし、MaskへOxygenが供給される。Flow Indication BlinkerのYellow CrossがOxygen Flowを示す。',
    'Demand ModeではCrewが吸入する時だけRegulatorがOxygenを供給する。',
    'EMERGENCY KnobをEMERGENCYにするとContinuous Flowになる。N/100% Dilution Controlを100%にするとCabin Airを混合せず純Oxygenを供給する。'
  ]],
  ['q_35_ae0eaf4daff6', ['D0-01', 'D2-01', 'D2-04', 'D2-05'], ['PASSENGER OXYGEN', 'CHEMICAL GENERATOR', 'MASK'], [
    'Passenger Oxygen SystemはChemical Oxygen GeneratorでOxygenを作る。',
    'GeneratorはPSU、LSU、ASU内にあり、各Generatorは独立して対応するMaskにのみOxygenを供給する。',
    'Mask Doorが開いてMaskを引くと、Mask LanyardがRelease Cableを引き、Firing PinがPercussion Capを打ってGeneratorが作動する。',
    'Generatorで発生したOxygenはFilter、Output Manifold、Flexible Supply Tubeを通ってReservoir BagとPassenger Oxygen Maskへ流れる。'
  ]],
  ['q_35_ee21721f368e', ['D2-04'], ['OXYGEN GENERATOR', 'SAFETY PIN', '450', 'FIRING'], [
    'Chemical Generatorは、塩素酸ナトリウムと鉄が反応し、塩とOxygenを作る。反応が始まると止められず、塩素酸ナトリウムが使い切られるまで継続する。',
    '作動中は高熱を発生し、Generator表面は約450 F、232 Cになるため取扱いに注意する。',
    '整備後はFiring PinのSafety Pinを必ず取り外す。Safety Pinが残るとEmergency時にGeneratorが作動しない。',
    'Generatorを落としたり損傷させない。損傷すると作動しない可能性がある。',
    'Firing MechanismをGeneratorから取り外してはならない。再組立てできない。'
  ]],
  ['q_35_a3a4fcbe45e8', ['D2-01', 'D2-06', 'D2-07'], ['MANUAL', 'AUTOMATIC', '14,000', 'PASS OXYGEN'], [
    '手動作動は、P5 Aft Overhead PanelのGuarded PASS OXYGEN SwitchをONにすることで行う。Manual Oxygen Deployment Relay R323が作動し、Door Latch ActuatorをEnergizeしてMask Doorを開く。',
    '自動作動は、Cabin Altitudeが14,000 ft以上になるとE/E Compartment J23 Box内のAltitude Pressure Switch S813が作動し、Automatic Oxygen Deployment Relay R322を作動させる。',
    'どちらの場合もDoor Latch Actuator SolenoidがSpring Loaded Latch ActuatorをReleaseし、StrikerがOxygen Mask Doorを押し開ける。'
  ]],
  ['q_35_859772b4109f', ['D2-01', 'D2-07'], ['PASS OXY ON', 'MASTER CAUTION', 'OVERHEAD'], [
    'Passenger Oxygenが作動しMaskがDeployすると、P5 Aft Overhead PanelのPASS OXY ON Amber Lightが点灯する。',
    'Oxygen Indication Relay R324がEnergizeし、PASS OXY ON Amber Light、MASTER CAUTION、OVERHEAD Annunciator Lightを点灯させる。',
    'R324はHolding回路を作り、28V DC Battery Bus PowerがなくなるまでIndication RelayをHoldする。',
    'Decompression時のCabin AnnouncementはAMM 23、Cabin Light制御はAMM 33に関連する。'
  ]],
  ['q_35_0f911e66e6ec', ['D2-01', 'D2-02', 'D2-04', 'D2-05', 'D2-06', 'D2-07'], ['PASSENGER COMPONENT', 'PSU', 'LSU', 'ASU', 'J23'], [
    '主要Componentは Passenger Oxygen Generator、Passenger Oxygen Mask、Firing Pin Mechanism、Door Latch Actuator、Test/Reset Button、Altitude Pressure Switch、Deployment/Indication Relay、PASS OXYGEN Switch、PASS OXY ON Light。',
    'Generator、Mask、Firing Pin Mechanism、Door Latch ActuatorはPSU、LSU、ASU内にある。',
    'Manual Release用のGuarded PASS OXYGEN SwitchとPASS OXY ON Amber LightはP5 Aft Overhead Panelにある。',
    'Automatic Release用のAltitude Pressure Switch S813、Manual Deployment Relay R323、Automatic Deployment Relay R322、Oxygen Indication Relay R324はE/E CompartmentのJ23 Boxにある。'
  ]],
  ['q_35_756432b0e996', ['D3-01', 'D3-02', 'D3-03'], ['PORTABLE', 'OXYGEN CYLINDER', 'PBE'], [
    'Portable Oxygenとして機体に装備されているものは、Portable Oxygen Cylinder と Protective Breathing Equipment(PBE) の2つ。',
    'Portable Oxygen Cylinderは応急処置およびEmergency時にOxygenを供給する。',
    'PBEは火災時にSmokeや毒性の煙からCrewを守るため、Smoke HoodとAir/Oxygen供給を行う。'
  ]]
];

module.exports = Object.fromEntries(
  reviewedByQuestion.map(([questionId, evidence_page_codes, evidence_terms, answer_lines]) => [
    questionId,
    { evidence_page_codes, evidence_terms, answer_lines }
  ])
);
