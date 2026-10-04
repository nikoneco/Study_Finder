const reviewedAnswers = {
  q_36_72e5e0db8d19: {
    evidence_page_codes: ['D0-01', 'F0-03', 'F0-06'],
    answer_lines: [
      'Pneumatic System の4つの供給元は、Engine 1 Bleed Air System、Engine 2 Bleed Air System、APU Bleed Air System、Pneumatic Ground Air Connection。',
      '供給先 User は、Engine Start System、Air Conditioning and Pressurization System、Engine Inlet Cowl Anti-Ice System、Wing Thermal Anti-Ice System、Water Tank Pressurization System、Total Air Temperature Probe Aspiration、Hydraulic Reservoir Pressurization System、Nitrogen Generation System。',
      'Pneumatic Manifold は各SourceからCompressed Airを集め、User Systemへ供給する。'
    ]
  },
  q_36_00878147f512: {
    evidence_page_codes: ['D1-02', 'D1-03', 'D1-05', 'D1-06', 'D1-08', 'D2-02', 'D2-03', 'D2-04', 'D2-05'],
    answer_lines: [
      'Engine Bleed Air System の主なComponent / Locationは次の10個。',
      '1. 5th Stage Bleed Air Check Valve: Engine High Pressure Compressor Case left side。9th stage airの5th stage portへのReverse Flowを防ぐ。',
      '2. High Stage Regulator: Engine Core Area 10:00 position。High Stage Valveを制御する。',
      '3. High Stage Valve: Engine Core Area 8:00 position。9th stage bleed airflowを制御する。',
      '4. Bleed Air Regulator(BAR): Fan Frame直後、Engine Core 11:00 position。PRSOVをpneumatic/electricalに制御する。',
      '5. PRSOV: Precooler下部、Engine Core 10:00 position。Engine Bleed Airのshutoff、42 psi nominal pressure regulation、450 F temperature limitingを行う。',
      '6. 450 F Thermostat: Precooler downstreamのEngine Bleed Air Duct内。450 F以上でPRSOV control pressureをventする。',
      '7. 490 F Overtemperature Switch: Precooler downstreamのEngine Air Strut Duct内。490 F超過でBleed Trip Offを作動させる。',
      '8. Precooler: Engine High Pressure Compressor Case top。Bleed airをfan airで冷却するair-to-air heat exchanger。',
      '9. Precooler Control Valve: Engine top、Precooler前方。Precoolerへのfan airflowを制御する。',
      '10. WTAI Solenoid Valve: Precooler Control Valve直前のCompressor Section上。Ground WTAI時にactuator pressureをbleedし、Precooler Control Valveをfull openにする。'
    ]
  },
  q_36_969d4a665d5c: {
    evidence_page_codes: ['D1-03', 'D1-04', 'D1-05', 'D1-07'],
    answer_lines: [
      'PRSOV は Engine Bleed Air Flowを制御するValveで、Engine Bleed AirのShutoff、Pressure Regulation(42 psi nominal)、Temperature Limiting(450 F / 232 C)を行う。',
      'BARからcontrol pressureを受けるとspring forceに抗して開き、control pressureがventされるとclose方向へ動く。',
      'High Stage Valve は 9th Stage Engine Bleed Air Manifoldからのbleed airflowを制御する。',
      'High Stage Regulatorからのcontrol pressureで開き、downstream pressureを32 psig nominalに制御する。Downstream pressureが9th stage pressureより高い時、または9th stage pressureが110 psiを超える時は閉じる。'
    ]
  },
  q_36_7e928503961a: {
    evidence_page_codes: ['D1-05', 'D1-09', 'D1-10'],
    answer_lines: [
      'Bleed Air Regulator Solenoidへの直接的な入力Signalは、Engine Fire SwitchからのClose signalと、ACAUからのOpen/Close control signalの2系統として整理できる。',
      '通常はEngine Bleed SwitchのON/OFF信号がACAUを通ってBAR SolenoidをOpen/Closeする。',
      'Engine Fire SwitchがUp(Fire condition)になると、Bleed Switch positionに関係なくBAR SolenoidへClose signalを送り、PRSOVを閉じる。',
      'ACAUはEngine Start Valve、220 psi Overpressure Switch、490 F Overheat Switchなどを入力として、保護時にBAR SolenoidへClose signalを送る。'
    ]
  },
  q_36_2d34deda3ae6: {
    evidence_page_codes: ['D0-05', 'D1-04', 'D1-07', 'D1-08', 'D1-09', 'D1-11', 'D2-06'],
    answer_lines: [
      'Pressure controlは、low engine speedでは9th stage airをHigh Stage Valveで32 psig nominalに制御し、engine speedが上がるとHigh Stage Valveが閉じて5th stage airを使う。PRSOVはmanifoldへ行くengine bleed pressureを42 psig nominalに制御する。',
      'Temperature controlは、Precoolerがengine fan airでbleed airを冷却し、Precooler Control Valve Sensorが390 Fで開き始め440 Fでfull openとなってfan airflowを増やす。',
      'WTAI ground operation中はWTAI Solenoid Valveが開き、Precooler Control Valve actuator pressureをventしてvalveをfull openにし、maximum coolingにする。',
      'Protectionとして、450 F ThermostatはPRSOV control pressureをventしてPRSOVをclose方向に動かし、bleed airflowとthermal loadを下げる。',
      'さらに490 F Overtemperature SwitchまたはBAR 220 psi Overpressure Switchが作動するとBleed Trip Off conditionとなり、ACAUがBAR Solenoidをcloseさせ、PRSOVを閉じ、BLEED TRIP OFF / MASTER CAUTION / AIR CONDを点灯させる。'
    ]
  },
  q_36_048c44b9395c: {
    evidence_page_codes: ['D1-06', 'D1-07'],
    answer_lines: [
      '450 F(232 C) ThermostatのLocationは、Precooler downstreamのEngine Bleed Air Duct内。AccessはStrut Access Panelから行う。',
      '構造は、Ball Valve Assembly with Sense Line Connection、Mounting Flange with Index Pin、Shielded Sensorで構成される。Sensor部にはOil Filled Sense Coilがある。',
      '機能は、Engine Bleed Air Temperatureが450 F以上になった時、PRSOVをOperateするcontrol pressureをventすること。',
      'Thermostatは450 Fで開き始め、490 Fでfull openになる。Control pressureが下がるとPRSOVはclose方向へ動き、bleed airflowを減らす。',
      'この結果、Precooler thermal load低下、490 F Bleed Trip Off conditionの遅延、duct pressure低下を行う。'
    ]
  },
  q_36_0b8f3d53f274: {
    evidence_page_codes: ['D0-04', 'D1-08', 'D1-09'],
    answer_lines: [
      'BLEED TRIP OFF Lightは、Pneumatic SystemのOverpressureまたはOvertemperature conditionで点灯する。',
      '具体的には、BAR 220 psi Overpressure Switch operation、または490 F(254 C) Overtemperature Switch operationでBleed Trip Off conditionとなる。',
      '同時に点灯するLightは、P7 MASTER CAUTION LightとAIR COND Annunciator Light。',
      'この時ACAU Overheat RelayがBAR Solenoid ValveをCloseさせ、PRSOVを閉じる。'
    ]
  },
  q_36_0751785ddd1c: {
    evidence_page_codes: ['D0-04', 'D1-09'],
    answer_lines: [
      'TRIP RESET Switchは、Bleed Trip Off conditionをResetするためのpush-button switch。',
      'Bleed Trip Off後、OverpressureまたはOvertemperature switchがNormal(Open)に戻った状態でTRIP RESETを押すと、holding circuitをopenしてtrip latchを解除する。',
      'Reset後、Engine Bleed Systemは通常のcontrolへ復帰できる。',
      '教材注記では、このswitchはPack & Zone Light Reset Functionも兼ねる。'
    ]
  },
  q_36_3b3e74527ff3: {
    evidence_page_codes: ['D2-03', 'D2-04', 'D2-05', 'D2-06'],
    answer_lines: [
      'Precooler Control Valveは、Precoolerへのfan airflowをcontrolするspring loaded open positionのbutterfly valve。Pneumatically control and operateされる。',
      '主な構造は、Manual Override and Position Indicator、Precooler Control Valve Sensorへのsense line、WTAI Solenoid Valveへのsense line、Interstage Manifoldからのsupply pressure line、Actuator。',
      'LocationはEngine topのPrecooler前方。',
      'Actuator chamber Aのcontrol pressureが増えるとclose方向、pressureが下がるとspring forceでopen方向へ動く。',
      'Precooler Control Valve Sensorが390 Fで開き始め440 Fでfull openになるとcontrol pressureがventされ、valveはopen方向へ動いてcoolingを増やす。',
      'GroundでWTAIがONの場合はWTAI Solenoid Valveが開き、control pressureをすべてventしてPrecooler Control Valveをfull openにする。'
    ]
  },
  q_36_f2b9df6c4542: {
    evidence_page_codes: ['D2-05', 'D2-06'],
    answer_lines: [
      'WTAI Solenoid ValveのLocationは、Precooler Control Valve直前のCompressor Section上。',
      'このValveは、Wing Thermal Anti-Ice ground operation中にAnti-Ice Panelからのsignalでenergizeされopenする。',
      'OpenするとPrecooler Control Valveからのactuation/control pressureをbleedする。',
      'その結果、Precooler Control Valveがfull openとなり、Engine Bleed Airにmaximum coolingを与え、groundでのWing Leading Edge overheat damageを防ぐ。'
    ]
  },
  q_36_863a55f69a75: {
    evidence_page_codes: ['D4-01', 'D4-02', 'D4-03'],
    answer_lines: [
      'APU Bleed Air Systemの構成4つは、APU Bleed Air Valve、APU Bleed Air Duct、APU Check Valve、Air Conditioning/Bleed Air Control Panel(APU BLEED switch / DUAL BLEED light)として整理できる。',
      'APU Bleed Air Systemは、On GroundおよびIn Air up to 17,000 ftでPneumatic Manifoldにbleed airを供給する。',
      'APUはEngine Start SystemとECS Systemへbleed airを供給できる。',
      'APU Bleed Air DuctはAPU Bleed Air ValveをPneumatic Manifoldへ接続し、APU Check Valveはengine bleed airがAPU load compressorへ逆流するのを防ぐ。',
      'APU Bleed Air Valveがopenでengine bleed側も同時に供給される条件では、DUAL BLEED Lightが点灯する。'
    ]
  },
  q_36_e17194f8cba9: {
    evidence_page_codes: ['D0-04', 'D4-03', 'D5-01'],
    answer_lines: [
      'DUAL BLEED Lightの目的は、Pneumatic ManifoldにEngineとAPUのSupply Pressureが同時にあることをCrewに知らせること。',
      'Dual bleed condition中は、Thrust LeverをIdle Positionに置くようCrewに注意させる意味もある。',
      '点灯条件は、APU Bleed Air ValveがOpenで、Engine 1 BLEED SwitchがONの時。',
      'もう一つの点灯条件は、APU Bleed Air ValveがOpenで、Engine 2 BLEED SwitchがON、かつIsolation ValveがOpenの時。',
      'DUAL BLEED Lightは、APU Bleed Air Valveがclosed positionにあるか確認する用途にも使える。'
    ]
  },
  q_36_9cbe47d73840: {
    evidence_page_codes: ['D4-01', 'D4-02'],
    answer_lines: [
      'APU Check ValveのLocationは、APU Bleed Air Ductの一部で、Forward Air Conditioning Bay間のKeel Beam内。',
      'AccessはLeft Air Conditioning Compartment内のKeel Beam重量軽減穴から行う。',
      '機能は、Engine Bleed Air FlowがAPU Load Compressor内へ流れ込むのを防止すること。',
      '構造はSplit Flapper Type Check Valveで、normal airflowではflapperがopenし、reverse airflowではflapperがcloseする。',
      'Install時はFlow Arrowを前方のCrossover Duct方向に向ける。'
    ]
  },
  q_36_07b24b6b4000: {
    evidence_page_codes: ['D3-02', 'D3-03'],
    answer_lines: [
      'Pneumatic Insulationは2種類ある。Soft InsulationとHard Shell Insulation。',
      'Soft Insulationは、soft / precut / fiberglass pad insulationをcoverで包み、tie strapで保持する。LocationはAft Cargo Compartment area内のAPU duct上。',
      'Hard Shell Insulationは、hard / preformed / fiberglass lay-up / air gap insulationで、duct contourに合わせて形成される。Two halves構造でband clampまたはwire laceでduct sectionに取り付く。LocationはKeel Beam内のPneumatic Duct上。',
      '目的は、coverしているductからのheat flowを減らし、近接するairplane structure、wiring、componentを保護すること。'
    ]
  },
  q_36_e41d10d2a0d8: {
    evidence_page_codes: ['D3-01', 'F0-06'],
    answer_lines: [
      'Right Side Pneumatic ManifoldのInterfaceは次の通り。',
      'Engine 2 Bleed Air System、Engine 2 Start System、Ground Pneumatic Connector Check Valve、Right Air Conditioning System、Right Wing Thermal Anti-Ice System、Hydraulic Reservoir Pressurization Tap、Isolation Valve。',
      'Right SideにはPneumatic Ground Air Connectorもあり、ground pneumatic cartからのairをmanifoldへ入れる。'
    ]
  },
  q_36_56a1370a7d49: {
    evidence_page_codes: ['D0-01', 'D0-06', 'D3-02', 'D3-04'],
    answer_lines: [
      'Pneumatic SystemはHot and High Pressureなので、作業前に必ずsystemをdepressurizeする。',
      'Pneumatic Systemに60 psiを超えるpressureを供給してはならない。過大pressureはequipment damageや人身災害につながる。',
      'Ground Pneumatic Connectorから供給するexternal sourceは、connector door placard limit内に制御する。Maximum Temperature 450 F(232 C)、Maximum Pressure 60 psi。',
      'External pneumatic source供給前に、Battery Power ON、115v AC Power ON、Air Conditioning Pack Switch OFF(Pack Valve closed確認)を確認する。',
      'Pneumatic operation中はWing Body Overheat Systemをmonitorする。Wing Body OverheatおよびAir Conditioning System operationには115v AC powerが必要。',
      'Pressurized ductのclampを外してはならない。また、ductをOil、Hydraulic Fluid、Fuel、その他Hydrocarbon Compoundからclean and freeに保つ。'
    ]
  },
  q_36_a85564320a57: {
    evidence_page_codes: ['D0-04', 'D3-05', 'D3-06'],
    answer_lines: [
      'Isolation ValveのLocationはCrossover Ductの一部で、Air Conditioning Bay forward areaのKeel Beam内。',
      '構造は115v AC single-phase motor operated butterfly valveで、Valve Body and Actuator Assemblyを持つ。ActuatorにはElectric Motor and Drive Assembly、Manual Override Handle / Position Indicatorがある。',
      '機能は、Right / Left Pneumatic Manifoldを分離すること、またCross Bleed Operationのため左右Manifoldを接続すること。',
      'Control switchはAir Conditioning/Bleed Air Control Panel上のCLOSE / AUTO / OPENの3-position toggle switch。',
      'AUTO Positionでは、R PACK switch、L PACK switch、ENG 1 BLEED switch、ENG 2 BLEED switchのposition logicで制御される。',
      'すべてのtoggle switchがAUTO/HIGH/ONの時はValve close。いずれかのPackまたはEngine Bleed SwitchがOFF positionになるとValve open。Trip Off conditionでもswitch position logicを使うため、valve position logicではない。'
    ]
  },
  q_36_1b9f14412458: {
    evidence_page_codes: ['D5-01', 'D5-02', 'D5-03'],
    answer_lines: [
      'Indication Systemの構成3つは、Left Duct Pressure Transmitter、Right Duct Pressure Transmitter、Dual Duct Pressure Indicator / DUAL BLEED Lightを持つAir Conditioning/Bleed Air Control Panelとして整理できる。',
      'Pressure Transmitterは2個あり、Left and Right Pneumatic Manifoldに各々取り付く。LocationはPneumatic Crossover Duct近く、Air Conditioning BayのForward Bulkhead。',
      'Pneumatic Duct Pressure IndicatorはAir Conditioning/Bleed Air Control Panel上にあり、Left / Right Pneumatic Duct Pressureをdual needleと0-80 psi scaleで表示する。',
      'DUAL BLEED LightもAir Conditioning/Bleed Air Control Panel上にあり、APUとEngine Bleed Systemから同時にmanifold pressureが供給される時に点灯する。',
      '注意事項: Pressure IndicatorはIntegrated Circuitを持ち、Electro Static Discharge Sensitive Deviceである。Transducerは28v DC、Pressure Indicatorは115v AC powerを使用する。'
    ]
  },
  q_36_bb45b8e2beba: {
    evidence_page_codes: ['F0-03', 'F1-01', 'F1-03', 'F1-05', 'F1-07', 'F1-09', 'F1-11', 'F3-01', 'F5-01'],
    answer_lines: [
      '問題文に「下記図面番号」とあるが、CSV化された設問には図面番号のリストが抽出されていないため、番号別の正式名称を一意に確定できない。',
      '参照すべき図は、Pneumatic Functional Description(F0-03/F0-04)、Engine Bleed Air図(F1-01/F1-03/F1-05/F1-07/F1-09/F1-11)、Manifold図(F3-01)、Indicating図(F5-01)。',
      '代表Componentとしては、5th Stage Check Valve、High Stage Regulator、High Stage Valve、Bleed Air Regulator、PRSOV、450 F Thermostat、490 F Overtemp Switch、Precooler、Precooler Control Valve、Precooler Control Valve Sensor、WTAI Solenoid Valve、APU Check Valve、Ground Pneumatic Connector Check Valve、Isolation Valve、Duct Pressure Transmitter、Dual Duct Pressure Indicatorなど。',
      '元問題集の図面番号が確認できたら、その番号ごとに Component Name / Location / Function を追記する。'
    ],
    status: 'reviewed_draft_needs_figure',
    problem_reason: 'Reviewed ATA36 reference text, but the extracted question does not include the original drawing numbers. Confirm the figure numbers in the source problem page before finalizing numbered component answers.'
  }
};

module.exports = reviewedAnswers;
