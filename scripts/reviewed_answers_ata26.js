module.exports = {
  q_26_74a0137debba: {
    evidence_page_codes: ['D0-02', 'D1-01', 'D3-01', 'D5-01', 'D7-01', 'D9-01', 'D10-01'],
    answer_lines: [
      '737-800のFire/OVHT Detectionは、次の各Detection Systemで構成される。',
      '- Engine Overheat / Fire Detection System.',
      '- APU Fire Detection System.',
      '- Forward / Aft Cargo Compartment Smoke Detection System.',
      '- Lavatory Smoke Detection System.',
      '- Main Wheel Well Fire / Overheat Detection System.',
      '- Wing & Body Duct Overheat Detection System.',
      'これらの火災/過熱信号は、P7 FIRE WARN、Aural Warning、P8/P5などの該当Panel表示へ送られる。'
    ]
  },
  q_26_d446862fbd37: {
    evidence_page_codes: ['D2-01', 'D4-01', 'D6-01', 'D8-01', 'D11-01'],
    answer_lines: [
      '737-800のFire Extinguishing Systemは、次の各消火Systemで構成される。',
      '- Engine Fire Extinguishing System.',
      '- APU Fire Extinguishing System.',
      '- Cargo Compartment Fire Extinguishing System.',
      '- Lavatory Fire Extinguishing System.',
      '- Portable Fire Extinguisher.'
    ]
  },
  q_26_1eebe0c95f41: {
    evidence_page_codes: ['D1-02', 'D1-03'],
    answer_lines: [
      '主要Componentは、Engine Overheat/Fire Detector Loop A/B、Engine & APU Fire Detection Module、P7 Glareshield Panel、P8 Engine/APU Fire Control Panel、Aural Warning Unit。',
      'Engine Detectorは各Engineに8個あり、Upper Fan Case 2個、Lower Fan Case 2個、Left Core 2個、Right Core 2個に配置される。',
      '各Detector AssemblyにはLoop AとLoop BのDetectorが入り、Detector信号はEngine & APU Fire Detection Moduleへ送られる。'
    ]
  },
  q_26_8302fad1cbf4: {
    evidence_page_codes: ['D1-02', 'D1-05', 'D2-05'],
    answer_lines: [
      'P8 PanelのOVHT/FIRE Testは、Engine Overheat/Fire Detection CircuitとFlight Deck Indicationが正常に作動するかを確認するTest。',
      '正常なら、Master Caution / OVHT DET、2つのFIRE WARN、ENG 1/ENG 2/APU Fire Handle Light、ENG 1/ENG 2 OVERHEAT、WHEEL WELL Light、Bell、APU Remote Horn/Light、Handle Unlockを確認できる。',
      'Engine/APU/Wheel Well系統のFire/Overheat Warning経路をまとめて確認するTestで、Fault Isolationが必要な場合はDetection ModuleやCODC表示を使用する。'
    ]
  },
  q_26_d2d80ce76204: {
    evidence_page_codes: ['D1-02', 'D1-05', 'D2-05'],
    answer_lines: [
      'P8 PanelのFAULT/INOP Testは、Fire ProtectionのFault Detection CircuitとFlight Deck Indicationを確認するTest。',
      '正常なら、Master Caution / OVHT DET、P8のFAULT Light、APU DET INOP Light、Engine & APU Fire Detection ModuleのFault Area LightとFault Display Lightが点灯する。',
      'Engine Loop Fault回路に加えて、APU Detector Fault CircuitもTest対象になる。'
    ]
  },
  q_26_c02d136df386: {
    evidence_page_codes: ['D1-05'],
    answer_lines: [
      'Engine Fire発生時のCockpit Indicationは次の通り。',
      '- P7の2つの赤いFIRE WARN Lightが点灯する。',
      '- Aural Warning UnitによりFire Bellが鳴る。',
      '- 該当Engine Fire Handle Switch Lightが点灯し、Fire HandleがUnlockされる。',
      '- Overheat Indicationも継続し、Master Caution / OVHT DETと該当ENG OVERHEAT Lightが点灯する。'
    ]
  },
  q_26_54229a6aec92: {
    evidence_page_codes: ['D1-03'],
    answer_lines: [
      'ENG Fire/OVHT Sensorは、Gas-Charged TubeとPressure Switchを使うType。',
      'Detector内部にはOverheat Pressure Switch、Fire Pressure Switch、Fault Pressure Switch、Resistor、Terminal Stud、Stainless Steel Gas-Charged Tubeがある。',
      '温度上昇でTube内のGas Pressureが上がるとOverheat/Fire SwitchがCloseし、抵抗変化としてModuleへ伝わる。',
      'Gas Pressureが失われるとFault SwitchがOpenし、Loop Faultとして検出される。'
    ]
  },
  q_26_fa73809a024b: {
    evidence_page_codes: ['D1-04'],
    answer_lines: [
      'Engine & APU Fire Detection ModuleのLocationは、E/E CompartmentのE2-2 Shelf。',
      '機能は、Engine DetectorからのOverheat/Fire信号とAPU Fire信号を監視し、Flight DeckのFire/Overheat IndicationとAural Warningへ信号を送ること。',
      'また、Engine Loop A/BおよびAPU DetectorのFaultを監視し、Module前面のFault Area Light / Fault Display LightでFault Isolationを行う。'
    ]
  },
  q_26_ee9cebbdf0a2: {
    evidence_page_codes: ['D2-01', 'D2-03', 'D2-05'],
    answer_lines: [
      '主要Componentは、P8 Engine/APU Fire Control Panel、Engine Fire Extinguisher Bottle 2本、Engine Fire Extinguishing Port / Discharge Tubing。',
      'Fire Extinguisher Bottle 2本はMain Wheel WellのLeft Upper Areaにある。',
      'P8 PanelはFlight Compartmentにあり、Fire Handle操作、Bottle Discharge、Squib Test、Fire/Fault Test、Bell Cutoutなどを行う。',
      '各BottleからのDischarge TubingとCheck Valveにより、選択されたEngine CompartmentへHalonを送る。'
    ]
  },
  q_26_8d5b09de6c82: {
    evidence_page_codes: ['D2-01', 'D2-03'],
    answer_lines: [
      'ENG Fire Extinguishing Bottleから噴射されたHalonは、選択されたEngine Compartment内へ放出される。',
      'Discharge TubingとCheck Valveを通って、Engine Fire Extinguishing Portから該当Engine Compartmentへ入る。'
    ]
  },
  q_26_0622a375459c: {
    evidence_page_codes: ['D2-02', 'D2-06'],
    answer_lines: [
      'P8 PanelのENG Fire Handleを引くと、そのEngineをShutdown / Isolationするための各Systemが作動する。',
      '- HMU High Pressure Shutoff ValveがCloseする。',
      '- Fuel Spar ValveがCloseする。',
      '- Thrust Reverser Control PowerがOFFになる。',
      '- EDP Supply Shutoff ValveがCloseする。',
      '- Hydraulic Low Pressure IndicationがDisableされる。',
      '- Pneumatic PRSOVがCloseする。',
      '- GeneratorがTrip Offする。',
      'その後、Fire Handleを回すと選択したBottle Squibが作動し、Halonが該当Engine Compartmentへ放出される。'
    ]
  },
  q_26_7695b9b85947: {
    evidence_page_codes: ['D2-03', 'D2-04'],
    answer_lines: [
      'ENG Fire Extinguishing Bottleの取扱いでは、Squibを触る/取り外す前に必ずSquib CapまたはShunt Plugを取り付ける。',
      'Squibは電気作動式のExplosive Deviceであり、不用意な通電や静電気で作動する危険がある。',
      'BottleはHalon/Nitrogenが約800 psi at 70Fで加圧されており、過熱時はSafety Relief PortからMain Wheel Wellへ放出される。'
    ]
  },
  q_26_34b656c1f253: {
    evidence_page_codes: ['D3-02', 'D3-03'],
    answer_lines: [
      '主要Componentは、APU Fire Detector、Engine & APU Fire Detection Module、P7 Glareshield Panel、P8 Engine/APU Fire Control Panel、P28 APU Remote Control Panel、Aural Warning Unit、APU ECU。',
      'APU Fire Detectorは1 Loopで3個あり、APU Compartment Upper、APU Compartment Door / Lower Area、Tailpipe / Tail Compartmentを監視する。',
      'Detector信号はEngine & APU Fire Detection Moduleへ入り、Flight Deck表示、Aural Warning、APU ECUへのAuto Shutdown信号、P28外部警報へ送られる。'
    ]
  },
  q_26_45527326be1b: {
    evidence_page_codes: ['D3-04'],
    answer_lines: [
      'APU Fire発生時のCockpit Indicationは次の通り。',
      '- APU Fire Handle Lightが点灯する。',
      '- APU Fire HandleがUnlockされる。',
      '- P7の2つの赤いFIRE WARN Lightが点灯する。',
      '- Fire Bellが鳴る。',
      '- APUはAutomatic Shutdownする。',
      '地上ではP28 APU Remote Control PanelのHornとRed Lightも作動する。'
    ]
  },
  q_26_3016099809d2: {
    evidence_page_codes: ['D3-03'],
    answer_lines: [
      'APU Fire DetectorはGas-Charged TubeとPressure Switchを使うType。',
      'Detector内部にはFire Pressure Switch、Fault Pressure Switch、Resistor、Terminal Stud、Stainless Steel Gas-Charged Tubeがある。',
      '温度上昇でTube内Gas Pressureが上がるとFire Pressure SwitchがCloseし、Fire信号としてModuleへ伝わる。',
      'Gas Pressureが失われるとFault SwitchがOpenし、APU Detector Faultとして検出される。'
    ]
  },
  q_26_dbaea704bbe3: {
    evidence_page_codes: ['D4-01', 'D4-03', 'D4-05'],
    answer_lines: [
      '主要Componentは、P8 Engine/APU Fire Control Panel、APU Fire Extinguishing Bottle、P28 APU Remote Control Panel。',
      'APU Fire Extinguishing BottleはHorizontal Stabilizer Accessory Compartmentにある。',
      'P8 PanelはFlight Compartment、P28 APU Remote Control PanelはRight Main Wheel Well Aft Bulkheadにある。',
      'BottleのSquibが作動すると、HalonがAPU Compartmentへ放出される。'
    ]
  },
  q_26_57068b577893: {
    evidence_page_codes: ['D4-02', 'D4-06'],
    answer_lines: [
      'P8 PanelのAPU Fire Handleを引くと、APUをShutdown / Isolationする状態になる。',
      '- ATA24 Electrical: AGCUがAPU Generator BreakerをOpenし、APU GeneratorをElectrical Systemから切り離す。',
      '- ATA49 APU: APU ECUがAPUをShutdownする。',
      '- ATA26 Fire Protection: APU Fire Extinguishing BottleのDischarge CircuitがArmされる。',
      'Fire Handleを回すと28V DCがAPU Bottle Squibへ送られ、Squibが作動してHalonがAPU Compartmentへ放出される。'
    ]
  },
  q_26_e3883f965b52: {
    evidence_page_codes: ['D4-03', 'D4-04', 'D4-06'],
    answer_lines: [
      'APU Fire Extinguishing Bottleの取扱いでは、Squibを触る/取り外す前に必ずSquib CapまたはShunt Plugを取り付ける。',
      'SquibはExplosive Deviceであり、誤作動防止が重要。',
      'APU消火回路は28V DC Hot Battery Busで作動できるため、Fire Handle操作時は電源状態に関係なくDischarge可能である点にも注意する。',
      'Bottle過熱または高圧時はSafety ReliefがOpenし、HalonはHorizontal Stabilizer Accessory Compartmentへ放出される。'
    ]
  },
  q_26_6a1a6d19746b: {
    evidence_page_codes: ['D4-05', 'D4-06'],
    answer_lines: [
      'APU Remote Control Panelの機能は次の通り。',
      '- 地上でAPU FireをRed LightとHornで知らせる。',
      '- Horn Cutout SwitchでHornを停止し、Fire継続中はRed LightをSteadyにする。',
      '- APU Fire Control HandleをPullしてAPUをShutdown / Isolationする。',
      '- HandleをPull DownしてBottle Discharge SwitchをArmする。',
      '- Bottle Discharge SwitchでAPU Fire Extinguishing BottleをDischargeし、APU CompartmentへHalonを放出する。',
      'なお、APU Fire Control Handleを引くだけではBottleはDischargeしない。'
    ]
  },
  q_26_02cea47c3073: {
    evidence_page_codes: ['D5-01', 'D5-02', 'D5-03'],
    answer_lines: [
      '主要Componentは、Smoke Detector、Cargo Electronic Unit (CEU)、Cargo Fire Control Panel、Aural Warning Unit、P7 FIRE WARN Light。',
      'Forward Lower Cargo CompartmentにはSmoke Detectorが4個あり、Ceilingに取り付けられる。',
      'Aft Lower Cargo CompartmentにはSmoke Detectorが6個あり、Ceilingに取り付けられる。',
      'CEUは各Cargo Compartment内のLeft Ceiling付近、Cargo Door近くに1個ずつ配置される。',
      'SystemはDual Loopで、Detector信号をCEUが受け、Cargo Fire Control PanelとFlight Deck Warningへ送る。'
    ]
  },
  q_26_5a6f52295abc: {
    evidence_page_codes: ['D5-01', 'D5-03', 'D5-05'],
    answer_lines: [
      'Cargo Electronic Unit (CEU)の機能は次の通り。',
      '- FWD/AFT Cargo Smoke Detectorを監視する。',
      '- SmokeまたはDetector過熱信号を受け、Cargo Fire Control PanelへAlarm信号を送る。',
      '- P7 FIRE WARNとFire BellにつながるCargo Fire Warningを発生させる。',
      '- Detector Faultを監視し、Cargo Fire Control PanelのDETECTOR FAULT Lightへ信号を送る。',
      '- CEU前面LEDとTest Switchにより、Detector LoopやFaultの確認を行う。'
    ]
  },
  q_26_d38b89bc4e4e: {
    evidence_page_codes: ['D4-01', 'D4-02', 'D4-03'],
    answer_lines: [
      'APU Fire Extinguishing Bottleから噴射されたHalonは、APU Compartmentへ放出される。',
      'P8 Fire Handleを回す、またはP28 Discharge Switchを操作するとSquibが作動し、Bottle内のHalonがAPU Compartmentを満たす。'
    ]
  },
  q_26_736cf5ad268b: {
    evidence_page_codes: ['D5-01', 'D5-03'],
    answer_lines: [
      'Cargo Smoke DetectorはPhotoelectric Cellを使い、Cargo Compartment内のSmokeを検知する。',
      'DetectorはSmoke Detection Chamber内でSmokeを検出し、またAir Temperatureが230F / 110C以上になった場合もAlarmを出す。'
    ]
  },
  q_26_6283ab9da354: {
    evidence_page_codes: ['D5-04', 'D5-06'],
    answer_lines: [
      'Cargo Fire Control Panelの機能は次の通り。',
      '- Lower Cargo Smoke / Overheatを監視し、FWD/AFT Cargo Fireを表示する。',
      '- Detector Faultを表示する。',
      '- DET SELECT SwitchでNORM / A / B Loop Operationを選択する。',
      '- FWD/AFT Cargo Fire Arm Switchで対象Compartmentの消火をArmする。',
      '- DISCH SwitchでCargo Fire Extinguishing BottleをDischargeする。',
      '- Squib ContinuityをEXT Lightで確認する。',
      '- TEST PushbuttonでSmoke Detection、Extinguishing、Panel IndicationをTestする。',
      '- Bottle Pressure低下時にDISCH Lightを表示する。'
    ]
  },
  q_26_635214f154ac: {
    evidence_page_codes: ['D5-01', 'D5-04', 'D5-05'],
    answer_lines: [
      'Cargo Fire / Smoke検知時のIndicationは次の通り。',
      '- Cargo Fire Control Panelの該当FWDまたはAFT Cargo Fire Lightが点灯する。',
      '- P7の2つのFIRE WARN Lightが点灯する。',
      '- Fire Bellが鳴る。',
      '- Cargo Fire Control Panelの該当Arm Switch Lightで対象Compartmentを確認できる。',
      'Cargo Smoke信号はCabin Pressure Control Systemにも送られ、Flight中はLower LobeからCabinへのSmoke流入を抑えるためDescent Rate制御に使われる。'
    ]
  },
  q_26_02b05956d429: {
    evidence_page_codes: ['D6-01', 'D6-02'],
    answer_lines: [
      '主要Componentは、Cargo Fire Extinguisher Bottle、Discharge Nozzle 5個、Discharge Tubing、Cargo Fire Control Panel。',
      'BottleはAir Conditioning Distribution Bayにある。',
      'Domestic仕様はBottle 1本で、Mix Chamber左側のAft Bulkhead Bracketに取り付けられる。',
      'International仕様はBottle 2本で、Bottle 1はMix Chamber左側、Bottle 2は右側のAft Bulkheadに取り付けられる。',
      'Discharge NozzleはCargo Ceilingにあり、TubingでBottleと接続される。'
    ]
  },
  q_26_ed487a725c49: {
    evidence_page_codes: ['D6-02', 'D6-04', 'D6-05'],
    answer_lines: [
      'Domestic機はCargo Fire Extinguisher Bottleが1本で、選択したFWDまたはAFT Cargo CompartmentへHalonを放出し、約60分のSuppressionを行う。',
      'International機はBottleが2本あり、1本目で約60分Suppressした後、Flight中に60分経過すると2本目が同じCompartmentへ自動Dischargeしてさらに約60分Suppressする。',
      'International機で1本目Discharge後60分以内にLandingした場合、2本目はDischargeしないがTimer Resetなどの処置が必要になる。'
    ]
  },
  q_26_dfcda412500d: {
    evidence_page_codes: ['D6-03', 'D6-05'],
    answer_lines: [
      'Cargo Fire Extinguishing BottleのProtectionは、Pressure Switch、Safety Relief / Fill Port、Squib Cap Stowageなどで行われる。',
      'Pressure SwitchはBottle Pressureを監視し、約250 psi以下になるとCargo Fire Control PanelのDISCH Lightを点灯させる。',
      'Safety Reliefは過圧時にOpenしてBottleを保護する。',
      'SquibにはCapを取り付けて、不用意な作動や取扱い時の危険を防ぐ。',
      'International機では2本目Discharge Timerがあるため、1本目Discharge後60分以内にLandingした場合は、電源と関連CB処置に注意が必要。'
    ]
  },
  q_26_2e10152a6191: {
    evidence_page_codes: ['D6-03'],
    answer_lines: [
      'Filter DrierはInternational仕様のBottle 2 Discharge Lineに装備される。',
      '個数は2個で、FWD Line用とAFT Line用。',
      '機能は、HalonからMoisture / Foreign Matterを除去し、Metering OrificeでBottle 2からのHalon流量を調整すること。',
      'これによりCargo Compartment内のHalon濃度を3%以上で約195分維持する。'
    ]
  },
  q_26_c379903baaf1: {
    evidence_page_codes: ['D7-02', 'D7-03', 'D7-04'],
    answer_lines: [
      'Ionization式は、2つのIonization Chamberを持つSensorでSmoke濃度を監視する方式。',
      'Smoke濃度がLimitを超えた状態が約8秒続くとAlarmとなり、Red Alarm LEDとInternal Hornが作動する。Power / Interrupt Switchで一時停止できる。',
      'Photoelectric式は、Photoelectric SensorでSmokeによる光の変化を検知する方式。',
      '通常はStatus LEDがGreen、Smoke Alarm時はRedとHorn、Fail時はRed Flashingとなる。Horn Cancel SwitchでHornなどを停止できるが、Red LEDは残る。'
    ]
  },
  q_26_e5dc4ada18bb: {
    evidence_page_codes: ['D8-01'],
    answer_lines: [
      'Lavatory Fire Extinguishing BottleはLavatoryのWash Basin下、Trash Bin付近を消火するために装備される。',
      'LocationはLavatoryのUnder Wash Basin。',
      '作動は自動式で、Bottleの2つのDischarge PortにあるEutectic Plugが高温で溶けるとHalonが放出される。',
      '放出後はTemperature IndicatorがWhiteからBlackへ変化する。'
    ]
  },
  q_26_94117fc1a69d: {
    evidence_page_codes: ['D9-01', 'D9-02', 'D9-03'],
    answer_lines: [
      '主要Componentは、Main Wheel Well Fire/Overheat Sensing Element、CODC、P7 Glareshield Panel、P8 Engine/APU Fire Control Panel、Aural Warning Unit。',
      'Sensing ElementはMain Wheel Well CeilingのLeft / Rightに取り付けられる。',
      'CODCはE/E CompartmentのE1-4 Rackにあり、Wheel WellおよびWing/Body Sensing Elementを監視する。',
      'Fire/Overheat時はP7 FIRE WARN、Bell、P8 WHEEL WELL Lightなどへ信号を送る。'
    ]
  },
  q_26_0dd0bbb58fad: {
    evidence_page_codes: ['D9-02'],
    answer_lines: [
      'W/WELL DET SYSのSensorはThermistor TypeのSensing Element。',
      'Nickel WireがChloride Insulation入りのTube内にあり、温度上昇により抵抗が下がる。',
      '約400F / 205CのAlarm Temperatureで抵抗が急低下し、CoreからGrounded TubeへCurrentが流れることでFire/Overheatを検知する。'
    ]
  },
  q_26_5344b84ba0ac: {
    evidence_page_codes: ['D9-01', 'D9-03', 'D9-04'],
    answer_lines: [
      'W/WELL Fire DET SYSがFireを検知した際のIndicationは次の通り。',
      '- P7の2つのFIRE WARN Lightが点灯する。',
      '- Fire Bellが鳴る。',
      '- P8 Engine/APU Fire Control Panelの赤いWHEEL WELL Lightが点灯する。',
      '- CODCのMAINT ADV Lightが点灯する。',
      '実FireとShort Circuitは同様にAlarmとしてStoredされるため、CODCのBITE表示で確認する。'
    ]
  },
  q_26_9b41c57c22f4: {
    evidence_page_codes: ['D10-01', 'D10-02'],
    answer_lines: [
      '主要Componentは、Wing & Body Overheat Sensing Element、CODC、P5 Air Conditioning Panel。',
      'Sensing ElementはPneumatic Distribution Duct付近に配置され、Left / Right Wing & Body LoopとしてOverheatを監視する。',
      'CODCはE/E CompartmentのE1-4 Rackにあり、Sensing ElementのOverheat/Faultを監視する。',
      'Overheat時はP5 Air Conditioning PanelのWING-BODY OVERHEAT、Master Caution / AIR COND、CODC MAINT ADVへ表示される。'
    ]
  },
  q_26_dab1797175de: {
    evidence_page_codes: ['D9-02', 'D10-01', 'D10-02'],
    answer_lines: [
      'Wing & Body Duct OVHT DET Sensorは、Wheel Wellと同じThermistor TypeのSensing Element。',
      'Nickel WireとChloride Insulation入りTubeで構成され、温度上昇により抵抗が下がる。',
      '抵抗低下をCODCが監視し、Pneumatic Duct周辺のOverheatとして検知する。'
    ]
  },
  q_26_6eb8a789fca6: {
    evidence_page_codes: ['D9-02', 'D10-02'],
    answer_lines: [
      'Wing & Body Duct OVHT DET Sensorの取扱い注意事項は次の通り。',
      '- Sensing Elementを1 inch未満の半径で曲げてはいけない。',
      '- 可能な限り3 inch未満の半径で曲げない。',
      '- Dent、Kink、Crushなどの損傷を与えない。',
      '- Mounting Clip部を除き、Elementと周囲構造物のClearanceを0.50 inch以上確保する。',
      '曲げや損傷はSensorの抵抗特性や検知性能に影響する。'
    ]
  },
  q_26_5ac2057af80b: {
    evidence_page_codes: ['D10-02', 'D10-03', 'D9-03'],
    answer_lines: [
      'Wing & Body Duct OVHT DET Sensorに不具合がある場合は、CODCで分かる。',
      'CODCのMAINT ADV LightとBITE / LED DisplayによりFaultを確認し、Codeで該当ElementのOpen / Shortなどを切り分ける。',
      'Flight DeckではP5 OVHT TESTで正常なContinuityがなければOverheat Indicationが出ないため、Fault IsolationはCODCで行う。'
    ]
  },
  q_26_6ea304fdfab7: {
    evidence_page_codes: ['D11-01'],
    answer_lines: [
      '737-800の機内Portable Fire ExtinguisherのTypeは次の2種類。',
      '- Water-Type Fire Extinguisher: ordinary fires by solid combustible用。',
      '- Halon Type Fire Extinguisher: electrical / oil / grease fires用。',
      'LocationはFlight Compartment、Galley、Passenger Compartmentなどで、Placardにより装備位置を確認する。',
      'Study Guide本文ではこの項目のFWD/AFT別の正確な装備個数までは示されていないため、個数は機体Configuration / Placard / Equipment Listで確認する。'
    ],
    problem_reason: 'Study Guide source lists type and general location, but not exact FWD/AFT installed quantity.'
  },
  q_26_ebd0db77c988: {
    evidence_page_codes: ['D8-01'],
    answer_lines: [
      'Lavatory Temperature IndicatorのLocationは、LavatoryのUnder Wash BasinにあるFire Extinguishing Bottle付近。',
      'BottleがDischargeするような高温状態になると、Temperature IndicatorはWhiteからBlackへ変化する。'
    ]
  }
};
