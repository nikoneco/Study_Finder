module.exports = {
  q_21_0c9d94994c36: {
    evidence_page_codes: ['D0-01', 'D0-05'],
    answer_lines: [
      '目的: Flight Compartment と Cabin の温度・換気を快適に保ち、機内与圧と Electronic Equipment Cooling を行う。',
      '主要機能: Pack Flow Control、Pack Cooling、Zone Temperature Control、Recirculation、Air Distribution。'
    ]
  },
  q_21_da264bdf97db: {
    evidence_page_codes: ['D0-01'],
    answer_lines: [
      'Air Conditioning System の Sub System は6つ。',
      'Distribution System',
      'Pressurization System',
      'Equipment Cooling System',
      'Heating System',
      'Cooling System',
      'Temperature Control System'
    ]
  },
  q_21_634f82c25847: {
    evidence_page_codes: ['D0-02', 'D0-03'],
    answer_lines: [
      'Flight Deck/P5 にある関係Panelは4つ。',
      'Air Conditioning/Bleed Air Controls Panel (P5-10)',
      'Cabin Temperature Panel (P5-17)',
      'Equipment Cooling Panel (P5)',
      'Cabin Pressure Control Panel (P5-6)'
    ]
  },
  q_21_82923bd67512: {
    evidence_page_codes: ['D1-14', 'D3-19'],
    answer_lines: [
      'Right Side Air Conditioning Bay Door を開けた状態では、Ram Air Inlet Door/Actuator まわりの作動に注意する。',
      'Pack/Zone Temperature Controller の BITE/VERIFY などで Ram Air Door が動くため、人や工具を作動範囲に入れない。',
      '点検・作動確認時は Ram Air Door 周辺をクリアにしてから実施する。'
    ]
  },
  q_21_640892cd5ebc: {
    evidence_page_codes: ['D1-03', 'D1-23', 'D1-24'],
    answer_lines: [
      '流れは、Pneumatic Manifold から FCSOV に入り、Primary Heat Exchanger、ACM Compressor、Secondary Heat Exchanger、Water Extractor Duct、Reheater、Condenser、Water Extractor を通る。',
      'その後、Reheater を再度通って ACM Turbine で冷却され、Condenser cold side、Mix Muff/High Pressure Water Separator、Conditioned Air Check Valve を経由して Mix Manifold/Main Distribution へ供給される。',
      '途中で冷却・除湿され、Pack outlet air として Mixing Manifold に送られる。'
    ]
  },
  q_21_98316eb059b8: {
    evidence_page_codes: ['D1-06', 'D1-08'],
    answer_lines: [
      'Control Solenoid は3個。',
      'Solenoid A: APU/High Flow 用。Ground、Pack Switch HIGH、APU Bleed ON、APU 95%以上で Energize し、APU High Flow Mode にする。',
      'Solenoid B: Auto Flow 用。Energize で Low/Normal Flow、De-energize で High Flow Mode にする。',
      'Solenoid C: Open-Close 用。Close Coil Energize で FCSOV Close、Open Coil Energize で FCSOV Open。'
    ]
  },
  q_21_99baca0f8674: {
    evidence_page_codes: ['D1-30', 'D1-31'],
    answer_lines: [
      'Pack Temp Auto Control: P/Z Controller が3つのZone要求のうち最も低い要求を Pack Demand とし、実Pack outlet温度と比較して TCV を動かす。Pack Demand と Mix Manifold 温度は下限35F/2Cに制限される。',
      'Auto Control Failure 時は TCV をCloseし、反対側Controllerが Standby Control に入る。',
      'Standby Control: 反対側 P/Z Controller が、故障側Packの Standby TCV を制御してPack outlet温度を調整する。',
      '両方のAuto Pack ControlがFailした場合、StandbyはPassenger Cabin 2 Zoneの平均要求を使い、Flight Compartment要求は使わない。Auto/Standby両方Failでは自動Shutdownはせず表示のみ。'
    ]
  },
  q_21_11640cbed93e: {
    evidence_page_codes: ['D1-32', 'D1-33'],
    answer_lines: [
      'PackをAuto ShutdownさせるSwitchは3つのOverheat Switch。',
      'Compressor Discharge Overheat Switch: ACM Compressor と Secondary Heat Exchanger の間のDuct、390F/199C。',
      'Turbine Inlet Overheat Switch: Reheater と ACM Turbine の間のDuct、210F/99C。',
      'Pack Discharge Overheat Switch: Mix Manifold へのInput Duct、250F/121C。',
      'OverheatでSwitchがCloseするとPack Overheat RelayがEnergizeし、FCSOV Close SolenoidへPowerが入りPackをShutdownする。'
    ]
  },
  q_21_e7595dcb8a48: {
    evidence_page_codes: ['D1-03', 'D1-12', 'D1-14'],
    answer_lines: [
      'Ram Air System の構成Component 7つ: Ram Air Control Temperature Sensor、Pack/Zone Temperature Controller、Ram Air Inlet Actuator、Ram Air Inlet Deflector Door、Ram Air Inlet Modulation Panel、Impeller Fan、Fan Bypass Check Valve。',
      'Ground Mode: ActuatorはFull Retract、Modulation PanelはFull Open、Deflector DoorはExtendし、RAM DOOR FULL OPEN Lightが点灯する。',
      'Flight/Flap Not Up: Deflector DoorはRetractし、Ram Air DoorはFull Open側でRAM DOOR FULL OPEN Lightは点灯する。',
      'Flight Cruise/Flap Up: P/Z ControllerがRam Air Inlet Actuatorを制御し、ACM Compressor outletを約230F/110Cに保つ。通常はModulation Panelが閉じ気味になり、FULL OPEN Lightは消灯する。'
    ]
  },
  q_21_f3c9da4c54ed: {
    evidence_page_codes: ['D1-13', 'D1-14'],
    answer_lines: [
      '機能: ACM Compressor downstream air temperature をP/Z Controllerへ送る。Controllerはこの温度を使ってRam Air Inlet Modulation Panelを制御する。',
      'System Location: ACM Compressor と Secondary Heat Exchanger の間のDuct。',
      'SensorはThermistorで、約230F/110Cを基準にRam Air Door制御に使われる。'
    ]
  },
  q_21_01e4db6d9ca4: {
    evidence_page_codes: ['D1-15'],
    answer_lines: [
      '構造: Turbine、Compressor、Impeller Fan が共通Shaft上にあり、Air Bearingで支持される。',
      '機能: Turbineで空気を断熱膨張させ、Pack air temperatureを下げる。CompressorとHeat Exchangerで冷却効率を上げ、Impeller FanはRam Air flowを助ける。',
      'LocationはAir Conditioning Compartment。'
    ]
  },
  q_21_f4958e7f3ccb: {
    evidence_page_codes: ['D1-19', 'D1-20', 'D1-22', 'D1-27', 'D1-30'],
    answer_lines: [
      'Cooling AirのTemp Controlは、P/Z ControllerがPack demandと実温度を比較し、TCVを動かしてPack discharge temperatureを制御する。',
      '通常はZone要求のうち最も低い要求がPack demandになり、Mix Manifold freezing防止のため下限35F/2Cがかかる。',
      '除湿は、Condenserで空気を露点以下にして水滴化し、Water Extractorで水分を分離する。',
      '分離した水はWater Collection ManifoldからWater Spray Nozzleへ送られ、Ram Air側へ噴霧されてHeat Exchanger効率を上げる。'
    ]
  },
  q_21_e23cae455c44: {
    evidence_page_codes: ['D2-01', 'D2-02', 'D2-04'],
    answer_lines: [
      '供給先: Flight Compartment、Forward Passenger Compartment、Aft Passenger Compartment。',
      'Passenger Cabin、Lavatory、Galley へもPassenger distributionとして供給される。',
      '供給源: Ground Supplied Conditioned Air、Air Conditioning Pack、Recirculation System。'
    ]
  },
  q_21_40342103692b: {
    evidence_page_codes: ['D2-01', 'D2-10', 'D2-12', 'D2-14', 'D2-15'],
    answer_lines: [
      '目的: Passenger Cabin airを再使用して換気し、Engine bleed air量を減らして燃料消費を抑える。',
      'Right Recirculation Fan: Passenger Cabin airをFloor grille経由でForward Cargo Compartment collector shroudから吸い、Main distributionへ戻す。',
      'Left Recirculation Fan: Main Distribution Compartment側のairを吸い、Passenger Cabin供給へ戻す。',
      '左右で吸い込みArea/経路が異なり、運用条件により片側Fanが停止する。'
    ]
  },
  q_21_22e623124715: {
    evidence_page_codes: ['D2-12', 'D2-14', 'D2-15'],
    answer_lines: [
      'Right Recirculation Fanは、Forward Cargo Compartment collector shroudに集まるPassenger Cabin airを循環させる。',
      'Left Recirculation Fanは、Main Distribution Compartment側のairを循環させる。',
      'Right FanはFlight中にBoth Packs HIGHで停止し、Left FanはGroundでBoth Packs HIGH、またはFlightでOne Pack HIGHの条件で停止する。'
    ]
  },
  q_21_7f4d76b75c03: {
    evidence_page_codes: ['D3-01', 'D3-02', 'D3-06', 'D3-14'],
    answer_lines: [
      '構成8つ: Cabin Temperature Panel、Pack/Zone Temperature Controller、Cabin Temperature Sensor、Duct Temperature Sensor、Pack Temperature Sensor、Mix Manifold Temperature Sensor、Temperature Control Valve/Standby TCV、Trim Air System (Trim Air PRSOV/Modulating Valve/Muffler)。',
      '作動概要: Flight Compartment、Forward Cabin、Aft Cabin の3 Zoneを制御する。',
      'P/Z Controllerは各Zoneの温度要求とSensor入力を比較し、Pack temperature controlとTrim Air Modulating Valve controlで各Zone温度を調整する。',
      'Right P/ZTCはForward Passenger CabinとFlight Compartment primary、Left P/ZTCはAft Passenger CabinとFlight Compartment backupを担当する。'
    ]
  },
  q_21_331ee27a3d43: {
    evidence_page_codes: ['D3-16', 'D3-17'],
    answer_lines: [
      'ZONE TEMP Light条件4つ: Power interruption、Zone supply duct overheat (190F/88C)、Flight Compartment temperature control failure、Passenger Compartment temperature control failure。',
      'PACK Light条件4つ: Power interruption、Pack overheat (Compressor Discharge/Turbine Inlet/Pack Discharge Overheat)、Pack autoまたはstandby temperature control failure (Recall時)、AutoとStandbyの両Pack temperature control failure (immediate)。'
    ]
  },
  q_21_ff2b3363677a: {
    evidence_page_codes: ['D3-15'],
    answer_lines: [
      'Zone Temperature Control のBack Up Modeは2つ。',
      'Unbalanced Mode',
      'Unbalanced Average Mode'
    ]
  },
  q_21_2955b965b6e8: {
    evidence_page_codes: ['D3-14'],
    answer_lines: [
      'Right Pack/Zone Temperature Controller: Forward Passenger Cabin temperature control と Flight Compartment zone primary temperature control。',
      'Left Pack/Zone Temperature Controller: Aft Passenger Cabin temperature control と Flight Compartment zone backup temperature control。'
    ]
  },
  q_21_38895b1e06f4: {
    evidence_page_codes: ['D1-28', 'D1-29'],
    answer_lines: [
      '作動Type: Electrically/Pneumatically controlled、Pneumatically operated のSpring-loaded closed butterfly valve。',
      '機能1: Condenser icing防止。Condenser differential pressureが高い時に開き、暖かいairを増やしてdeiceし、turbine discharge temperatureを上げる。',
      '機能2: Standby modeでPack temperatureを制御する。Pack auto control fail時に反対側P/Z ControllerがStandby TCVを制御する。'
    ]
  },
  q_21_4bf2e7d0cf6e: {
    evidence_page_codes: ['D3-04', 'D3-05', 'D3-18'],
    answer_lines: [
      'Flight Deck: Flight Compartment ceilingのCabin Temperature Sensor Assemblyで室温をSenseし、Flight Compartment supply ductのDuct Temperature Sensor (Primary/Backup) とTemperature Bulbでduct temperatureをSense/表示する。',
      'Cabin Compartment: Passenger Compartment right PSU bullnose areaのCabin Temperature Sensor Assembly 2個でForward/Aft Cabin airをSenseする。',
      'Passenger duct temperatureはForward/Aft passenger cabin duct temperature sensorでSenseし、Temperature Bulbは表示用として使われる。'
    ]
  },
  q_21_0c093737e496: {
    evidence_page_codes: ['D3-05', 'D3-13', 'D3-18'],
    answer_lines: [
      'Flight Deck Supply Ductに取り付くSensor/Switchは4点。',
      'Flight Compartment Duct Temperature Sensor (Primary Control): 1個。',
      'Flight Compartment Duct Temperature Sensor (Backup Control): 1個。',
      'Flight Compartment Duct Overheat Switch: 1個。',
      'Flight Compartment Air Conditioning Supply Duct Temperature Bulb: 1個。'
    ]
  },
  q_21_c087e2c738bf: {
    evidence_page_codes: ['D3-08', 'D3-09'],
    answer_lines: [
      'Location: Right Air Conditioning Compartment。',
      '作動: Trim Air PRSOVはTrim Air Modulating Valveへ送るHot bleed airのOn-OffとPressure regulationを行う。',
      'Spring-loaded closedで、Electrical control/Pneumatic actuation。Control SolenoidがEnergizeするとOpenし、De-energizeするとCloseする。',
      '下流圧力はCabin pressure + 約4 psiにRegulateされる。'
    ]
  },
  q_21_fbb5ebf8744c: {
    evidence_page_codes: ['D7-16', 'D7-17'],
    answer_lines: [
      'Cabin Pressureの変化をSenseして作動するValveは2つ。',
      'Positive Pressure Relief Valve: Cabin differential pressureが約8.95 +/-0.15 psiに達するとOpenし、Cabin pressureをOverboardへ逃がす。',
      'Negative Pressure Relief Valve: 機内圧が機外圧より1.0 psi以上低くなると機内側へOpenし、Negative differential pressureによる構造Damageを防ぐ。'
    ]
  },
  q_21_86fd877c6e61: {
    evidence_page_codes: ['D4-01', 'D4-02', 'D4-04'],
    answer_lines: [
      '目的: Flight Compartment と E/E/Forward equipment area のElectronic equipmentにCabin airを循環させ、Heatを取り除く。',
      'SystemはSupply system、Exhaust system、SATCOM cooling systemで構成される。',
      'Supply FanがCabin airをElectronic equipmentへ送り、Exhaust FanがWarm airを引き抜く。',
      'GroundではOverboard Exhaust ValveがOpenして排気し、Pressurized flightでは通常Closeしてairを再循環させる。High Flow/Smoke Removal条件ではOEVが開く。'
    ]
  },
  q_21_d184edb97745: {
    evidence_page_codes: ['D4-07', 'D4-10'],
    answer_lines: [
      'Low Flow Detectorは2個。',
      'Location: Forward Equipment Compartment内のSupply ductとExhaust ductに各1個。',
      '作動: Hot wire anemometerでCooling air flowを監視し、Low flowを検出するとEquipment Cooling PanelのOFF Light、Master Caution/OVERHEAD annunciationなどへ信号を送る。',
      'Detectorは内部BITを持ち、Power-up BIT failureでもFault indicationを出す。'
    ]
  },
  q_21_a7fef14531ab: {
    evidence_page_codes: ['D4-04', 'D4-10'],
    answer_lines: [
      'Equipment Cooling PanelのOFF Lightは、SupplyまたはExhaust側でLow Flowを検出した時に点灯する。',
      'Low Flow DetectorのPower-up BIT failureでもOFF Light/Master Caution/OVERHEAD annunciationが出る。',
      'GroundでCoolingが不十分なHigh alarm/low flow状態では、Flight Deck indicationに加えてGround crew hornも作動する。'
    ]
  },
  q_21_5569ea90998b: {
    evidence_page_codes: ['D4-11', 'D4-12', 'D4-13'],
    answer_lines: [
      'Position: GroundではOpen、Pressurized flight normalではClose。必要によりHigh FlowやSmoke RemovalでOpenする。',
      'ModeはNormal Mode、High Flow Mode、Smoke Removal Mode。',
      'Normal Modeではvalve diskがFull OpenからFull Closeまで動く。Smoke ModeではFull Openから54度位置までの範囲で動く。',
      'High FlowはPack HIGH/Right Recirc AUTOなどの条件で、Smoke RemovalはPack HIGH/Right Recirc OFFなどの条件で作動する。Cargo fire条件では動作が変わる。'
    ]
  },
  q_21_659f822d565f: {
    evidence_page_codes: ['D5-01'],
    answer_lines: [
      '目的: Cargo compartmentのicingを防ぎ、Door areaをFlight中にWarmに保つ。',
      'Heating AreaはForward Cargo Compartment、Aft Cargo Compartment、Supplemental Heating area。',
      'Supplemental HeatingはMain Entry Door area heaterとEmergency Escape Door heater blanketを含む。'
    ]
  },
  q_21_9c80ebc684af: {
    evidence_page_codes: ['D5-02', 'D5-03', 'D5-04'],
    answer_lines: [
      'Forward Door Area Heater: Nose wheel well left outboard、aft left access panelからAccess。',
      'Aft Door Area Heater: Aft passenger compartment center ceiling。',
      'Emergency Escape Door Heater Blanket: Emergency escape door内。Close-out panel blanket 10Wが1枚、door lining/trim用50W blanketが4枚。',
      '作動条件: Door area heatingはGroundでは作動せず、Air Modeで少なくとも1つのPack FCSOVがOpenしている時に作動する。Both FCSOV closeではheater power off。',
      '各heaterはthermostat/overtemperature switch/thermal fuseで温度保護される。'
    ]
  },
  q_21_e7db629df8e7: {
    evidence_page_codes: ['D6-01'],
    answer_lines: [
      '目的: Differential pressureを使ってForward/Aft Galley area airをOverboardへ排気する。',
      '場所: Galley vent inlet/mufflerはGalley ceiling上方、exhaust nozzleはGalley上方のairplane skin。',
      '方法: Galley airがvent inletへ入り、flexible duct/mufflerを通ってexhaust nozzleから機外へ出る。Mufflerは排気noiseを低減する。'
    ]
  },
  q_21_83abfe5c7c87: {
    evidence_page_codes: ['D7-01', 'D7-02', 'D7-03', 'D7-04', 'D7-06'],
    answer_lines: [
      'Pressurization Control Systemは、Cabin Pressure Control System、Cabin Pressure Relief System、Cabin Pressure Indication and Warning Systemに分けて考える。',
      '主な構成Component: Cabin Pressure Control Module、Digital Cabin Pressure Controller 2台、Aft Outflow Valve Assembly、Overboard Exhaust Valve、Positive Pressure Relief Valve、Negative Pressure Relief Valve、Cabin Altitude Warning/Indication系。',
      '作動概要: AUTO/ALTNではCPCがFlight altitude、Landing altitude、ADIRU/SMYDC/PSEU入力、Cabin pressure、Valve feedbackを使ってOutflow Valveを制御する。',
      'GroundではOutflow Valve full open、Takeoffでpre-pressurization、Climb/Cruise/Descent/Landingの各phaseに応じてCabin pressure scheduleを制御する。',
      '問題文は「構成7つ」だが、Study Guide本文はSubsystem別に複数Componentを列挙しているため、上記の主要Componentとして整理する。'
    ]
  },
  q_21_a983b661c89e: {
    evidence_page_codes: ['D7-07', 'D7-11', 'D7-12', 'D7-13', 'D7-15'],
    answer_lines: [
      'AUTO FAIL Light: Auto channel/system failure。原因例はPower loss、excessive cabin altitude rate、cabin altitude high、differential pressure high、wiring/Outflow valve/CPC failureなど。',
      'OFF SCHED DESCENT Light: CPCが、設定したFLT ALTに達する前にDescentを検出し、takeoff field return scheduleへ入った時。',
      'ALTN Light: Alternate/backup CPCがCabin pressure controlを行っている時。',
      'MANUAL Light: Mode SelectorをMANにし、Manual ModeでOutflow Valveをcrewが直接controlする時。'
    ]
  },
  q_21_8b409af23e76: {
    evidence_page_codes: ['D7-03', 'D7-06', 'D7-10'],
    answer_lines: [
      '作動条件: Mode Selector AUTO、FLT ALT set、LAND ALT set。通常はAUTO ModeでCPCがOutflow Valveを制御し、AUTO fail時はALTNへ移行する。',
      'Control Signal Source: CPCはCabin Pressure Sensor、ADIRU air data、SMYDC engine speed data、PSEU air/ground dataを入力に使う。',
      'CPCはLeft/Right Pack Valve、Outflow Valve、Overboard Exhaust Valveのposition feedbackも受け取り、Electronic Actuator/Auto MotorへOutflow Valve commandを出す。'
    ]
  },
  q_21_e08ad172aaf3: {
    evidence_page_codes: ['D7-09', 'D7-06'],
    answer_lines: [
      'Type: Thrust recovery double gate typeのAft Outflow Valve。',
      '構成Component: 2枚のvalve gate、actuator assembly/linkage、position transducer、Electronic Actuator 2個、Auto Motor 2個、Manual Motor 1個。',
      '機能: Cabin airをoverboardへ逃がす量を調整してCabin pressureを制御する。',
      'Position transducerはValve positionをCPCとP5 indicatorへfeedbackし、Auto modeではCPC/Electronic ActuatorがAuto motorを駆動する。Manual modeではcrew switchがManual motorを直接駆動する。'
    ]
  },
  q_21_e04e6ef636af: {
    evidence_page_codes: ['D7-16', 'D7-17'],
    answer_lines: [
      'Positive Pressure Relief Valve: 2個。Aft Outflow Valveの両側、lower fuselageに取り付く。Cabin differential pressureが約8.95 +/-0.15 psiに達するとOpenし、overpressureによる構造Damageを防ぐ。',
      'Negative Pressure Relief Valve: Aft Service Door近く、胴体下面右寄りに取り付く。Negative differential pressureが約-1.0 psidになると機内側へOpenし、負圧による構造Damageを防ぐ。'
    ]
  },
  q_21_2ae7649a2dde: {
    evidence_page_codes: ['D7-18', 'D7-19'],
    answer_lines: [
      '主Component: Cargo Compartment Blowout Panel。',
      'Location: Cargo Compartment Ceiling と Cargo Compartment Bulkhead。',
      '機能: Decompression時にPassenger CompartmentとCargo Compartment間のDifferential Pressureが約1.0 psidになるとPanelがFrameから外れ、両CompartmentのPressureをすばやく等しくして構造Damageを防ぐ。',
      '関連Component: Pressure Equalization Valve。Forward Cargo Compartment aft bulkhead と Aft Cargo Compartment vacuum waste bulkhead forwardにあり、Cargo/Passenger Compartment間のpressure equalizationを補助する。'
    ]
  },
  q_21_ce61be566255: {
    evidence_page_codes: ['D7-20', 'D7-21', 'F7-20'],
    answer_lines: [
      'Component Location: Cabin Altitude Warning Switch S-128はForward E/E Compartment天井。JA315J以降はS128とS1153の2個がForward E/E Compartment天井にある。',
      '作動概要: Cabin Altitudeが10,000 ftに達するとAneroid typeのPressure Warning SwitchがCloseする。',
      'Switch closeによりHorn circuitがGroundし、Aural Warning Moduleがintermittent beepを鳴らし、Captain/First Officer panelのCABIN ALTITUDE indicationがONになる。',
      'ALT HORN CUTOUTを押すとhornは停止し、Cabin Altitudeが10,000 ft以下に下がるとwarning circuitはresetされる。'
    ]
  },
  q_21_838f4b3a3583: {
    evidence_page_codes: ['D0-04', 'D1-04', 'D4-03', 'D7-05'],
    status: 'needs_manual_figure_mapping',
    problem_reason: 'The question depends on figure numbers, but the extracted question text does not include those numbers. Manual figure-number mapping is required before a definitive answer can be produced.',
    answer_lines: [
      'この問題は「下記図面番号」に対応するComponent名・Location・機能を答える形式だが、抽出されたCSVには図面番号が含まれていない。',
      'そのため、現時点で特定Componentを断定する回答は作れない。',
      '対応作業: 問題集PDFの図面番号を確認し、ATA21のComponent Location図(D0-04/D1-04/D4-03/D7-05など)と照合して、Component名・Location・Functionを手入力する必要がある。'
    ]
  }
};
