module.exports = {
  q_7X_ca444a6084ab: {
    evidence_page_codes: ['71-F0-02'],
    answer_lines: [
      '- Location: Engine Name PlateはEngine側面のName Plate位置に取り付けられる。抽出本文では図のOCRが弱いため、実機/原図で最終確認する。',
      '- 記載事項: Engine Model/Configuration、Engine Version、Serial/Production/Order No.、Certification/Ratingに関する情報、N1/N2/EGT Limit、Thrust RatingなどEngine識別と諸元確認に必要な項目が記載される。',
      '- 7B26/7B27系ではFan Diameter 61 inch、Bypass Ratio 5.1:1、Engine Weight約5,205 lbなどの諸元も同ページで確認する。'
    ],
    problem_reason: 'Reviewed against extracted ATA71 text, but the name plate figure OCR is incomplete; verify exact plate item wording on the original figure.'
  },
  q_7X_3f912ff53a20: {
    evidence_page_codes: ['71-D0-03'],
    answer_lines: [
      '- Hazard Areaは Inlet Suction、Exhaust Heat、Exhaust Velocity、Engine Noise の4種類。',
      '- Inlet Suction Hazard AreaはIdleでInlet前方10 ft radius。Windが25 ktを超える場合は20%増やす。',
      '- Exhaust Hazard AreaはEngine後方側のExhaust Heat/Velocity領域で、Engine出力が上がるほど広がる。',
      '- Entry/Exit CorridorはInlet Hazard AreaとExhaust Hazard Areaの間の通路。Idle Operation中、かつFlight Compartment側とCommunicationが取れる場合に使用する。',
      '- Operating Engine付近ではBeacon Light点灯、Ear Protection着用が必要。'
    ]
  },
  q_7X_805a52ccd678: {
    evidence_page_codes: ['71-D0-04'],
    answer_lines: [
      '- Engine MountはForward Engine MountとAft Engine MountでEngineをStrutへ取り付ける。',
      '- Forward Engine MountはFan Frameに取り付く。',
      '- Aft Engine MountはTurbine Frameに取り付く。'
    ]
  },
  q_7X_5857eae077c0: {
    evidence_page_codes: ['71-D1-01'],
    answer_lines: [
      '- Inlet Cowl: T12 Access/Pressure Relief Door。T12 SensorへAccessするDoorで、Pressure Relief Doorも兼ねる。',
      '- Fan Cowl: IDG Access Door、Chip Detector/Pressure Relief Door、Oil Tank Access Door。',
      '- Fan Cowl上にはVortex Control Deviceもあるが、これはAccess DoorではなくAirflowを整える装置。'
    ]
  },
  q_7X_6db526720609: {
    evidence_page_codes: ['71-D1-01'],
    answer_lines: [
      '- T12 Access/Pressure Relief Door。',
      '- Chip Detector/Pressure Relief Door。',
      '- どちらもAccess Doorであり、Pressure Relief Doorも兼ねている。'
    ]
  },
  q_7X_834b0d6e9baf: {
    evidence_page_codes: ['71-D0-06'],
    answer_lines: [
      '- Engine Drain Systemの目的は、Fuel/Oil/Hydraulic Fluid/Water/VaporをHot Areaへ触れさせないこと、およびComponent Failureの発見を助けること。',
      '- Direct Drainの種類はOil、Fuel、Hydraulic Fluid、Water、Vapor。',
      '- Right Fan Cowl側のStarter Air Discharge DuctはStrut、Main Oil/Fuel Heat Exchanger、HMU、HPTACC/LPTACC Valve、VSV/VBV Actuator、TBVなどのDrainを受ける。',
      '- Left Fan Cowl側のDrain HoleはFuel Pump、IDG、Hydraulic PumpなどのDrainを受ける。',
      '- Oil Tank Drain FluidはRight Fan Cowl Panel Holeから排出される。'
    ]
  },
  q_7X_0cc188f3a669: {
    evidence_page_codes: ['71-D1-01', '71-D1-02'],
    answer_lines: [
      '- Engine Cowlingは Inlet Cowl、Fan Cowl、Thrust Reverser で構成される。',
      '- Inlet CowlはEngineへAirを導入する。',
      '- Fan CowlはFan Case外側のSmooth Surfaceを作り、Maintenance時にOpenできる。',
      '- Thrust ReverserはFan Air Exhaustの方向を変え、Landing/RTO時の減速に使う。'
    ]
  },
  q_7X_45c74e0aebbd: {
    evidence_page_codes: ['71-D1-01'],
    answer_lines: [
      '- Vortex Control DeviceはInboard Fan Cowl上にある。',
      '- 目的はWingまわりのAirflowを滑らかにし、Engine/Fan Cowl周辺の流れを整えること。'
    ]
  },
  q_7X_29f8376db360: {
    evidence_page_codes: ['72-D0-03', '72-D0-06', '72-D0-08', '71-F0-02'],
    answer_lines: [
      '- CFM56-7BはFan、LPC、HPC、Combustor、HPT、LPT、Accessory Driveで構成されるTurbofan Engine。',
      '- N1系はFan/LPC/LPT側、N2系はHPC/HPT側で、N2 ShaftからAccessory DriveへPowerを伝える。',
      '- LPTは4 stage。Fan Bladeは24枚のWide Chord Titanium Blade。',
      '- 主なAerodynamic Stationは0 Ambient Air、12 Fan Inlet、25 HPC Inlet、30 HPC Discharge、49.5 Stage 2 LPT Stator。',
      '- 7B系の代表諸元としてFan Diameter 61 inch、Engine Weight約5,205 lb、Bypass Ratio 5.1:1などが示される。'
    ]
  },
  q_7X_c0d053c84bd2: {
    evidence_page_codes: ['72-D0-04'],
    answer_lines: [
      '- Main BearingはNo.1からNo.5までの5個。',
      '- Ball BearingはAxial LoadとRadial Loadを受ける。Roller BearingはRadial Loadのみを受ける。',
      '- No.1/No.2 BearingはN1 Shaft前方を支持する。',
      '- No.3 Bearing AssemblyはBall BearingとRoller Bearingで構成され、N2 Shaft前方を支持する。',
      '- No.4 BearingはN2 Shaft後方を支持する。',
      '- No.5 BearingはN1 Shaft後方を支持する。',
      '- No.1/2/3はForward Sump、No.4/5はRear Sumpにある。'
    ]
  },
  q_7X_b3ff2b9f3204: {
    evidence_page_codes: ['72-D0-03'],
    answer_lines: [
      '- N2 ShaftからAccessory Gearboxまでの伝達Componentは次の4つ。',
      '- IGB: Inlet Gearbox',
      '- RDS: Radial Drive Shaft',
      '- TGB: Transfer Gearbox',
      '- HDS: Horizontal Drive Shaft'
    ]
  },
  q_7X_560126a9a605: {
    evidence_page_codes: ['72-D0-06'],
    answer_lines: [
      '- Station 0: Ambient Air。',
      '- Station 12: Fan Inlet。',
      '- Station 25: HPC Inlet。',
      '- Station 30: HPC Discharge。',
      '- Station 49.5: Stage 2 LPT Stator。'
    ]
  },
  q_7X_d869f8664375: {
    evidence_page_codes: ['72-D0-07'],
    answer_lines: [
      '- AGBはFan Inlet CaseのEngine Left Sideにある。',
      '- Front Face: EEC Alternator、N2 Sensor、Hand Cranking Pad、Engine Air Starter、IDG、Hydraulic Pump。',
      '- Rear Face: Fuel Pump Package(Fuel Pump、HMU、Main Oil/Fuel Heat Exchanger)、Lubrication Unit、Scavenge Oil Filter。',
      '- Hand Cranking PadはBorescope Inspection時にN2 Rotorを回すために使う。'
    ]
  },
  q_7X_4b6f866dafb3: {
    evidence_page_codes: ['72-D0-08'],
    answer_lines: [
      '- Fan Bladeは24枚のWide Chord Titanium Bladeで構成される。',
      '- Front Spinner ConeとRear Spinner ConeはInlet Airflowを整える。',
      '- Spacer Shimは各Blade下に入り、Radial Positionを保持しBlade Removalを可能にする。',
      '- PlatformはBlade間のAirflowを滑らかにする。',
      '- Fan Retaining Flange/RingはSpacer ShimとPlatformを保持する。',
      '- Blade RootにはPart Number、Serial Number、Momentum Weightが記載される。',
      '- Balance Weight ScrewはRear Spinnerに取り付けられる。'
    ]
  },
  q_7X_767edf119a3e: {
    evidence_page_codes: ['73-D1-03', '73-D2-01', '73-D2-02', '73-D2-03'],
    answer_lines: [
      '- Engine Fuel & Control SystemはFuel Distribution SystemとEngine Control Systemで構成される。',
      '- Fuel Distribution側はFuel Nozzle Filter、Fuel Pump Assembly、Fuel Filter、IDG Oil Cooler、Servo Fuel Heater、Fuel Manifold、Fuel NozzleなどでFuelを供給/分配する。',
      '- Engine Control側はAirplane Data Interface、Sensor、EEC、HMUを中心にFuel FlowとEngine Variable Systemを制御する。',
      '- EECはDEUや各SensorからDataを受け、Engine Thrust/Start/Ignition/Reverse/Core/ACC等を制御する。',
      '- HMUはEEC CommandをServo Fuel Pressureへ変換し、Fuel Meteringや各Actuatorを作動させる。'
    ]
  },
  q_7X_071e7e752e95: {
    evidence_page_codes: ['73-D1-03', '73-D1-08', '73-D1-09'],
    answer_lines: [
      '- Fuel Spar Valve通過後のFuelはEngine Fuel Pump Packageへ入り、Fuel Pumpで加圧される。',
      '- FuelはFuel Filter、IDG Oil Cooler、Servo Fuel Heaterなどを通ってHMU/Fuel Metering側へ送られる。',
      '- Metered FuelはFuel Flow Transmitter/Inline Filterを通り、Fuel Manifoldへ送られる。',
      '- Fuel Manifoldは20個のFuel NozzleへFuelを分配する。',
      '- Fuel NozzleはPrimary Flowが約15 psig、Secondary Flowが約125 psigで開く。'
    ]
  },
  q_7X_fefc40bbc708: {
    evidence_page_codes: ['73-D1-03', '73-D1-08', '73-D1-09'],
    answer_lines: [
      '- Fuel Nozzle Filter: Fuel Nozzleへ行く前のContaminationを除去する。Fan Case上部10:00付近。',
      '- Fuel Pump Assembly: Fuelを加圧して下流へ送る。AGB Aft FaceのLeft Side。',
      '- Fuel Filter: Fuel中の異物を除去する。Clog時はBypass Indicationにつながる。',
      '- IDG Oil Cooler: FuelでIDG Oilを冷却する。',
      '- Servo Fuel Heater: Oilの熱でServo Fuelを加熱し、HMU Servo系のIceを防ぐ。',
      '- Fuel Manifold: Metered Fuelを20個のFuel Nozzleへ分配する。',
      '- Fuel Nozzle: CombustorへFuelを噴射する。Primary/Secondary Flowで作動する。'
    ]
  },
  q_7X_3949954c383f: {
    evidence_page_codes: ['73-D2-08', '73-D2-09', '73-D2-15', '73-D2-22'],
    answer_lines: [
      '- EEC: Right Sideにあり、各Inputを処理してEngine Control出力を作る主Component。',
      '- HMU: Left Sideにあり、EEC CommandをHydraulic Fuel Pressureに変換しFMV、TBV、HPTACC、LPTACC、VSV/VBV Actuatorなどを動かす。',
      '- EEC Alternator: AGB Top Forward Sideにあり、EEC Channel A/BへPrimary Electrical Powerを供給する。',
      '- ID Plug: EEC下側P11 Connector付近にあり、Engine Type、N1 Trim、Thrust Rating等のConfiguration DataをEECへ与える。',
      '- Sensors: T3、PS3、PT25、T12、EGT Harness等がEngine Condition DataをEECへ送る。'
    ]
  },
  q_7X_e69dd2801188: {
    evidence_page_codes: ['73-D2-18'],
    answer_lines: [
      '- EEC Alternatorは通常時のEEC Primary Electrical Power Source。',
      '- AGB Top Forward Sideにあり、Left Fan CowlをOpenするとAccessできる。',
      '- Statorには2系統のWindingがあり、Channel AとChannel BへPowerを供給する。',
      '- Alternatorが供給できない場合、Engine 1はAC Transfer Bus 1、Engine 2はAC Transfer Bus 2からEECへPowerが供給される。',
      '- N2 15%以上でChannelのGood Powerが失われるとBITE MemoryにMessageがStoreされ、Single Channel Operationになる。'
    ]
  },
  q_7X_99df9758688a: {
    evidence_page_codes: ['73-D2-15', '73-D2-16'],
    answer_lines: [
      '- Input Signal Validation and Processing。',
      '- Starting、Shutdown and Ignition Control。',
      '- Engine Power Management。',
      '- Reverse Thrust Control。',
      '- Engine Core Control。',
      '- HPTACC/LPTACC Control。',
      '- BITE。',
      '- Flight Compartment Indication。'
    ]
  },
  q_7X_a2d0ec8e0ed9: {
    evidence_page_codes: ['73-D2-22', '73-D2-23', '73-D2-24'],
    answer_lines: [
      '- HMUはEECからのElectrical CommandをEHSVでHydraulic Fuel Pressureに変換する。',
      '- Fuel Metering Valveを制御し、EngineへのFuel Flowを調整する。',
      '- Servo FuelでTBV、HPTACC、LPTACC、VSV/VBV Actuatorを作動させる。',
      '- VSV/VBV ActuatorのLVDT Position FeedbackはEECへ送られる。',
      '- Overspeed Governor/Alternate N2 Overspeed Protectionを持ち、EECはStartごとにGovernorをMonitorする。'
    ]
  },
  q_7X_ae504cb52a9f: {
    evidence_page_codes: ['73-D2-36', '73-D2-37', '73-D2-38'],
    answer_lines: [
      '- EEC Modeは Normal Mode、Soft Alternate Mode、Hard Alternate Mode の3つ。',
      '- Normal Mode: PTがValidで、P5のEEC SwitchがONの時。ADIRU/P0などからMachを計算しN1 Referenceを決める。',
      '- Soft Alternate Mode: PTがNot Validになった時。15秒以内にPTがValidへ戻ればNormalへ戻り、ALTN Lightは点灯しない。',
      '- Soft Alternateが15秒継続するとALTN Lightが点灯する。',
      '- Hard Alternate Mode: EEC Switch OFF、またはSoft Alternate継続後に条件が整った時に入る。P0からAssumed Machを使い、十分なThrustを確保する。',
      '- Hard AlternateからはPT ValidかつEEC Switch ON、またはShutdown/Restart後にNormalへ戻る。'
    ]
  },
  q_7X_6e9ae03ee01b: {
    evidence_page_codes: ['73-D2-34'],
    answer_lines: [
      '- Ground Idle: GroundでStart後に使われるIdle。OAT、Electrical Power、Bleed Demand、Minimum Fuel Flowなどを考慮してEECが制御する。',
      '- Flight Idle: Flight中の基本Idle。Flight Conditionに応じて必要なIdle Thrustを確保する。',
      '- Approach Idle: Approach/Go-Aroundに備えてFlight Idleより高めに設定されるIdle。Anti-Ice、Flap、Gear、Altitudeなどの条件で選択される。'
    ]
  },
  q_7X_a32676fa6086: {
    evidence_page_codes: ['73-D2-17'],
    answer_lines: [
      '- Engine Type: 7B。',
      '- N1 Trim。',
      '- Thrust Rating。',
      '- Engine Condition Monitoring Option。',
      '- Engine Combustor Configuration: SAC/DAC。'
    ]
  },
  q_7X_b12dae63f943: {
    evidence_page_codes: ['73-D2-05', '73-D2-40'],
    answer_lines: [
      '- Airplane Model Signal。',
      '- Engine Position Signal。',
      '- EECはAirplane ModelをMaximum Certified ThrustとN1 Reference Speed計算に使い、Engine PositionをMaintenance Message表示に使う。'
    ]
  },
  q_7X_e2aad164bd36: {
    evidence_page_codes: ['74-D0-03', '74-D0-04', '74-D0-05'],
    answer_lines: [
      '- 各EngineにはLeft Ignition SystemとRight Ignition Systemがある。',
      '- 各SystemはIgnition Exciter、Ignition Lead、Air Manifold、Spark Igniterで構成される。',
      '- Ignition Exciterは115v ACを約20,000v DCに変換し、Spark Igniterを作動させる。',
      '- 通常は1つのIgniterを使用し、必要時はBothを使用する。',
      '- CockpitではEngine Start Switch、Ignition Selector Switch、Start LeverでOperationする。'
    ]
  },
  q_7X_b5bffec22c96: {
    evidence_page_codes: ['74-D0-09'],
    answer_lines: [
      '- GND: Ground Start用。Starterが回り、Start LeverをIDLEにするとFuelとIgnitionがCombustorへ送られる。',
      '- AUTO: 通常Igniterは作動しない。ただしEngine Cowl Anti-Ice ON、Flap Not Up、またはEECがFlameout Conditionの可能性を判断した時にAutomatic Ignitionを作動させる。',
      '- CONT: Takeoff、Approach、Landing、Bad Weather等で使用。Ignition Selectorで選んだSpark Igniterが連続作動する。',
      '- FLT: Both Spark Igniterが連続作動する。Ignition SelectorのPositionは使わない。'
    ]
  },
  q_7X_7d1421f51c6d: {
    evidence_page_codes: ['74-D0-03', '74-D0-05'],
    answer_lines: [
      '- Ignition Systemは各EngineにLeft SystemとRight Systemがあり、各SystemにIgnition Exciter、Ignition Lead、Air Manifold、Spark Igniterがある。',
      '- Ignition Exciter: 各System 1個、Engine Fan Case Lower Right Side。',
      '- Ignition Lead: 各System 1本、ExciterからSpark Igniterへ接続。',
      '- Air Manifold: Lead周囲をCoolingする。Fan Case Aft End 6:00付近から各IgniterへAirを送る。',
      '- Spark Igniter: 2個、4:00と8:00位置、Fuel ManifoldよりややForward側。'
    ]
  },
  q_7X_28f713a4beac: {
    evidence_page_codes: ['74-D0-06'],
    answer_lines: [
      '- Hi Tension LeadはAir ManifoldからのCooling Airで冷却される。',
      '- Cooling AirはFan Case Aft Endの6:00 Position付近からAir Manifoldへ入り、Leadの周囲を流れる。'
    ]
  },
  q_7X_665fe5edccb8: {
    evidence_page_codes: ['74-D0-05', '74-D0-09'],
    answer_lines: [
      '- Start LeverがIDLE Positionの時、EECはIgnition用115v AC Powerを受け取る。',
      '- Ignition Exciterはこの115v ACを約20,000v DCへ変換してSpark Igniterへ供給する。',
      '- L SystemはLeft Spark Igniter、R SystemはRight Spark Igniterを作動させる。'
    ]
  },
  q_7X_8c27fc8a7dc3: {
    evidence_page_codes: ['74-D0-09'],
    answer_lines: [
      '- Start SwitchがAUTOの時、通常Igniterは作動しない。',
      '- Engine Cowl Anti-IceがON、またはFlapがNot Upの時、EECはIgnitionを自動的にONにする。',
      '- EECがEngine Flameout Conditionの可能性を判断した場合も、Ignition Systemを自動的に作動させる。'
    ]
  },
  q_7X_fed5ec974169: {
    evidence_page_codes: ['75-D0-03', '75-D2-01', '75-D3-01', '75-D4-01', '75-D5-01', '75-D6-01'],
    answer_lines: [
      '- HPTACC: HPC 4th/9th Stage Bleed Airを使いHPT Shroud Supportの熱膨張を制御し、HPT Blade Tip Clearanceを最小に保つ。',
      '- LPTACC: Fan Discharge AirでLPT CaseをCoolingし、LPT Blade Tip Clearanceを制御する。',
      '- VSV: HPC IGVおよび1st/2nd/3rd Stage Stator Vane角度を変え、Compressor AirflowとStall Marginを制御する。',
      '- VBV: LPC Discharge Airの一部をSecondary Airflowへ逃がし、低速/急減速/TR時のStallや異物/水の影響を抑える。',
      '- TBV: HPC 9th Stage Bleed Airを1st Stage LPT Nozzleへ流し、Start/Acceleration時のHPC Stall Marginを増やす。'
    ]
  },
  q_7X_194d6ec5cc36: {
    evidence_page_codes: ['75-D2-01', '75-D2-02'],
    answer_lines: [
      '- 目的: HPT Shroud Supportの熱膨張を制御し、HPT Blade Tip Clearanceを最小に保ってFuel Efficiencyを改善する。',
      '- 使用Air: HPC 9th Stage Bleed Airと4th Stage Bleed Air。',
      '- Component: HPTACC Valve、9th Stage Bleed Air Duct、4th Stage Bleed Air Duct、HPTACC Manifold。',
      '- Location: HPTACC ValveはHPT Case右側3:00、9th Stage Ductは2:00、4th Stage Ductは3:00、ManifoldはHPT Case/Shroud Support周辺。'
    ]
  },
  q_7X_1d48b0931138: {
    evidence_page_codes: ['75-D2-03'],
    answer_lines: [
      '- EEC CommandによりHMUがServo FuelをHPTACC Valve Actuatorへ送る。',
      '- HPTACC Valveは4th Stage Bleed Airと9th Stage Bleed AirのQuantity/Ratioを制御する。',
      '- 混合されたBleed AirはHPTACC Manifoldを通りHPT Shroud Supportへ送られ、Shroud Supportの熱膨張を制御する。',
      '- これによりHPT Blade Tip Clearanceを適正に保つ。'
    ]
  },
  q_7X_300d913ae5c0: {
    evidence_page_codes: ['75-D3-01', '75-D3-02'],
    answer_lines: [
      '- 目的: LPT Blade Tip Clearanceを制御し、Fuel Efficiencyを改善する。',
      '- 使用Air: Fan Discharge Air。',
      '- Component: LPTACC Valve、LPTACC Air Duct、LPTACC Manifold。',
      '- Location: LPTACC ValveはHPC Case右側4:00、Air Ductも4:00付近、ManifoldはLPT Case上。'
    ]
  },
  q_7X_0033913a6313: {
    evidence_page_codes: ['75-D3-02', '75-D3-03'],
    answer_lines: [
      '- Fan Duct Inner Wall 4:00付近のIntake PortからFan Discharge Airを取り入れる。',
      '- EEC/HMU Servo FuelによりLPTACC Valveを作動させ、LPT Caseへ送るCooling Air量を制御する。',
      '- Cooling AirはLPTACC Manifoldを通ってLPT Caseを冷却し、Caseの熱膨張を制御する。',
      '- 結果としてLPT Blade Tip Clearanceを適正に保つ。'
    ]
  },
  q_7X_0d9a5a9e6492: {
    evidence_page_codes: ['75-D4-01', '75-D4-02'],
    answer_lines: [
      '- 目的: HPC IGVおよびStator Vane角度を変え、HPC Airflowを調整してCompressor EfficiencyとStall Marginを改善する。',
      '- Component: 2個のVSV Actuator、Bellcrank Assembly、4個のActuation Ring、IGV、1st/2nd/3rd Stage Stator Vane。',
      '- Location: Right Actuator/BellcrankはHPC Case 2:00、Left Actuator/Bellcrankは8:00。Ring/VaneはHPC Case周囲/内部。'
    ]
  },
  q_7X_6b882ba8dc89: {
    evidence_page_codes: ['75-D4-03'],
    answer_lines: [
      '- HMUがServo FuelをVSV ActuatorのHead SideまたはRod Sideへ送る。',
      '- Actuator Pistonが動き、BellcrankとActuation Ringを介してIGVおよびStator Vane角度を変える。',
      '- Left ActuatorのLVDTがVSV Position FeedbackをEECへ送る。',
      '- EECはEngine Conditionに応じてVSV位置を制御する。'
    ]
  },
  q_7X_f2b1f97df61f: {
    evidence_page_codes: ['75-D5-01', '75-D5-02'],
    answer_lines: [
      '- 目的: LPC Discharge Airの一部をSecondary Airflowへ逃がし、Fast Deceleration時などのLPC Stallを防止する。',
      '- Low Engine SpeedやThrust Reverser Operation時には不要なMaterial/Water/SandをHPC外へ逃がし、Stabilityを改善しDamageを防ぐ。',
      '- Component: 12個のVBV Door、Actuation Ring、12個のBellcrank、Left/Right VBV Actuator。',
      '- Location: Right ActuatorはFan Frame Rear Face 4:00、Left Actuatorは10:00。Door/Ring/BellcrankはFan Frame上。'
    ]
  },
  q_7X_170e4e92673c: {
    evidence_page_codes: ['75-D5-03'],
    answer_lines: [
      '- HMUがServo FuelをVBV ActuatorのHead SideまたはRod Sideへ送る。',
      '- Actuator PistonがActuation RingとBellcrankを動かし、12個のVBV DoorをOpen/Closeする。',
      '- Left Actuator LVDTはEEC Channel Bへ、Right Actuator LVDTはChannel AへPosition Feedbackを送る。',
      '- EECはEngine SpeedやOperation Conditionに応じてVBV Openingを制御する。'
    ]
  },
  q_7X_631c64a0c4e9: {
    evidence_page_codes: ['75-D6-01', '75-D6-02'],
    answer_lines: [
      '- 目的: HPC 9th Stage Bleed Airを1st Stage LPT Nozzleへ送って、Engine StartやAcceleration時のHPC Stall Marginを増やす。',
      '- Component: TBV Valve、TBV Manifold。',
      '- Location: TBV ValveはHPT Case 6:00、TBV ManifoldはHPT Case 5:00付近。'
    ]
  },
  q_7X_576276987aca: {
    evidence_page_codes: ['75-D6-03'],
    answer_lines: [
      '- TBVはOpen/Close Positionを持つ。',
      '- EEC CommandによりHMUがServo FuelをTBV Actuatorへ送り、Pistonを動かす。',
      '- TBVがOpenするとHPC 9th Stage Bleed AirがTBV Manifoldを通り、LPT Case内のHoleから1st Stage LPT Nozzleへ流れる。',
      '- そのAirはExhaustと混合し、Start/Acceleration時のHPC Stall Marginを増やす。'
    ]
  },
  q_7X_175ba18265c0: {
    evidence_page_codes: ['76-D0-03', '76-D0-04', '76-D0-05', '76-D0-06'],
    answer_lines: [
      '- Engine Control SystemはThrust Lever/Resolver、Autothrottle Assembly、Start Lever、Reverse Thrust Interlockなどで構成される。',
      '- Thrust LeverとResolverはEECへThrust Command(TRA/TLA)を送る。',
      '- Autothrottle AssemblyはASM/GearboxとClutch Packを介してThrust Lever/Resolverを動かし、自動Thrust Commandを作る。',
      '- Start LeverはIDLE/CUTOFF位置でEEC、Ignition、Engine Fuel Feed ValveなどへSignalを送る。',
      '- Reverse Thrust InterlockはT/R Sleeve位置に応じてReverse Thrust Leverの追加移動を許可する。'
    ]
  },
  q_7X_7c437167328a: {
    evidence_page_codes: ['76-D0-04'],
    answer_lines: [
      '- Resolver。',
      '- Clutch Pack。',
      '- Autothrottle Switch Pack。',
      '- Autothrottle Servomotor(ASM) and Gearbox Assembly。',
      '- Take Off/Go Around(TO/GA) Switch and Autothrottle Disengage Switch。'
    ]
  },
  q_7X_7e2e9871c077: {
    evidence_page_codes: ['76-D0-04'],
    answer_lines: [
      '- Autothrottle Switch Packは各Thrust Lever Assemblyに1個あり、Mechanical Linkageで動く。',
      '- 9個のSwitchを持ち、Discrete Thrust Lever Position Signalを各Systemへ送る。',
      '- S1: Auto Ground Speedbrake Control / Landing Gear Warning。',
      '- S2/S3: Autobrake System。',
      '- S4: T/R Synchronous Shaft Lock。',
      '- S5/S6: T/R Control。',
      '- S7: Wing Thermal Anti-Ice。',
      '- S8: Aural Warning、Takeoff Warning、Weather Radar。',
      '- S9: Landing Gear Warning。'
    ]
  },
  q_7X_e4c63a38094f: {
    evidence_page_codes: ['76-D0-06', '76-D0-07'],
    answer_lines: [
      '- Start Leverは6つのSwitchを操作する。',
      '- EECへStart Lever Position Signalを送る。',
      '- Ignition Systemへ115v AC Ignition PowerをControlする。',
      '- Engine Fuel Feed SystemのEngine Fuel Spar ValveをOpen/Closeする。',
      '- CUTOFFではHMU内のHPSOVをCloseさせる。',
      '- IDG Manual Disconnect CircuitのArm、FDAU/CDS/DEUへのEngine Run/Cutoff判断にも使われる。'
    ]
  },
  q_7X_184b916b5cc5: {
    evidence_page_codes: ['76-D0-08'],
    answer_lines: [
      '- 目的: T/R Deploy Operation中、Reverse Thrust LeverをDeploy Positionよりさらに動かしてReverse Thrustを増加できるようにする。',
      '- SolenoidがEnergizeしない場合、Reverse Thrust Leverはそれ以上動かせずReverse Thrustを増やせない。',
      '- EECはT/R LVDTからSleeve Positionを受け取り、両SleeveがDeploy Travel 60%以上になるとSolenoidをEnergizeする。',
      '- SolenoidはInterlock LatchをRetractし、Reverse Thrust LeverのFull Reverse側への移動を許可する。'
    ]
  },
  q_7X_792bda6c7bfe: {
    evidence_page_codes: ['77-D1-02', '77-D1-03'],
    answer_lines: [
      '- N1 Speed SensorはLow Pressure Rotor SpeedをEEC、DEU、AVM Signal Conditionerへ送る。',
      '- N1 Sensor Location: Engine右側、Oil Tankのすぐ後方。Right Fan CowlをOpenしてAccessする。',
      '- N2 Speed SensorはHigh Pressure Rotor SpeedをEEC、DEU、AVMへ送る。',
      '- N2 Sensor Location: AGB Front Face、Engine Starter上方。Left Fan CowlをOpenしてAccessする。',
      '- 各Sensorは独立した3つのSensing Elementを持ち、各SystemへSpeed Signalを供給する。'
    ]
  },
  q_7X_3ca351b4a59d: {
    evidence_page_codes: ['77-D2-02'],
    answer_lines: [
      '- EGTはT49.5、Stage 2 LPT Stator付近のGas Temperatureを測定する。',
      '- 各Engineに8個のThermocoupleと4個のT49.5 Thermocouple Harnessがある。',
      '- 各Harnessは2個のThermocouple、2本のTube、Junction Boxで構成される。',
      '- ThermocoupleはTemperatureに比例したAnalog Signalを作り、Harness経由でEECへ送る。',
      '- EECはこのDataをEngine ControlとFlight Compartment Indicationに使用する。'
    ]
  },
  q_7X_7965844ff68f: {
    evidence_page_codes: ['77-D4-01', '77-D4-02', '77-D4-05'],
    answer_lines: [
      '- AVM SystemはEngine Vibration Levelを連続的に計算し、CDSへ表示する。',
      '- ComponentはAVM Signal Conditioner、No.1 Bearing Vibration Sensor、FFCCV Vibration Sensor、N1/N2 Speed Signal。',
      '- Vibration SensorはEngineに2個、Signal ConditionerはEE Compartmentにある。',
      '- Signal ConditionerはN1/N2 Speedと2つのVibration Sensor Signalを使い、最も高いVibration Levelを表示する。',
      '- Fault DataとHistorical Vibration DataはNonvolatile Memoryに保存される。'
    ]
  },
  q_7X_478f6f54be70: {
    evidence_page_codes: ['77-D4-01', '77-D4-02'],
    answer_lines: [
      '- No.1 Bearing Vibration Sensor: Engine前方内部にあり、Overhaul時以外は直接Access不可。ConnectorはFan CaseのOil Tank/Name Plate付近。',
      '- FFCCV Vibration Sensor: Fan Frame/Fan Case側に取り付く。',
      '- AVM Signal Conditioner: EE Compartmentにある。',
      '- AVMはこれらに加え、N1 Speed SensorとN2 Speed SensorのSignalも使用する。'
    ]
  },
  q_7X_bf57f99d54f6: {
    evidence_page_codes: ['78-D2-01', '78-D2-02', '78-D2-03'],
    answer_lines: [
      '- Thrust Reverser SystemはThrust Reverser、T/R Control System、T/R Indicating Systemで構成される。',
      '- T/RはLanding後またはRTO中にFan Air ExhaustのDirectionを変え、Airplaneを減速させる。',
      '- No.1 T/RはLeft Engine、No.2 T/RはRight Engineにある。',
      '- 各T/RはLeft HalfとRight Halfからなり、各HalfにTranslating Sleeveがある。',
      '- Control SystemはDeploy/StowのElectrical/Hydraulic Powerを制御し、Indicating SystemはCDS REV MessageやREVERSER Lightを表示する。'
    ]
  },
  q_7X_55b41a55ea7a: {
    evidence_page_codes: ['78-D3-03'],
    answer_lines: [
      '- Translating Sleeve。',
      '- Hydraulic Actuator。',
      '- Sync Shaft / Rotary Flex Shaft。',
      '- Cascade Segment。',
      '- Blocker Door。',
      '- Blocker Door Drag Link。',
      '- Opening Actuator。',
      '- Krueger Flap Deflector(Inboard Half only)。',
      '- Tension Latch、Fire Seal、Insulation Blanket、Torque Boxなど。'
    ]
  },
  q_7X_26ed7aa7fc1b: {
    evidence_page_codes: ['78-D3-12', '78-D3-13'],
    answer_lines: [
      '- T/R HalfはOpening ActuatorでClosed Positionから約45度までOpenできる。',
      '- Opening Actuatorは各Engineに2個あり、Forward Face of T/R Cowlに取り付く。',
      '- Manual Open/Close時はAMM手順に従い、Actuator Lock PositionまでCowlを持ち上げてLock CollarがLockしたことを確認する。',
      '- Lock Collarの移動、Yellow/Red Bandなどの表示でLock状態を確認する。',
      '- Cowl重量と周辺Flap/Structureへの干渉に注意し、Support/Lockが確実でない状態で作業しない。'
    ]
  },
  q_7X_466f5b637abd: {
    evidence_page_codes: ['78-D2-02', '78-D4-05', '78-D4-06'],
    answer_lines: [
      '- Reverse Thrust Lever: Control Stand上。Deploy/Stow CommandをSwitchへ伝える。',
      '- T/R Control Valve Module: Hydraulic ActuatorへのPressureを制御し、T/RをDeploy/Stowさせる。',
      '- EAU(Engine Accessory Unit): 主にT/R Stow Operationを制御し、BITE/Troubleshootingを行う。',
      '- Sync Lock: Deploy Signalがない時、Hydraulic Actuator Operationを防止する。',
      '- Arm/Stow/Sync Lock/Control SwitchはA/T Switch PackまたはThrust Lever側にあり、Solenoid/EAU/Sync Lock回路へPowerやCommandを送る。'
    ]
  },
  q_7X_5fb98f3e5e63: {
    evidence_page_codes: ['78-D4-05', '78-D4-06'],
    answer_lines: [
      '- Arm Switch: T/R Control Valve ModuleのArm SolenoidへPowerを供給。A/T Switch Pack側。',
      '- Stow Switch: EAU Stow Logic Powerを供給。A/T Switch Pack側。',
      '- Sync Lock Switch: T/R Sync Lock Circuit Powerを供給。A/T Switch Pack側。',
      '- Control Switch: T/R Control Valve ModuleのDeploy SolenoidへPowerを供給。Thrust Lever内にありSide Coverを外してAccessする。'
    ]
  },
  q_7X_2e2d0186294a: {
    evidence_page_codes: ['78-D5-02', '78-D5-03', '78-D5-05', '78-D5-08'],
    answer_lines: [
      '- T/R Indicating SystemはT/R Sleeve PositionとFaultをFlight Compartmentへ表示する。',
      '- 各T/RのLVDTがTranslating Sleeve Position DataをEECへ送る。',
      '- EECはLVDT Signalを処理し、DEUへARINC 429で送る。',
      '- DEU/CDSはN1 Indicator上部へREV Messageを表示する。',
      '- FaultやControl System/Mechanical Failure時はP5 Aft Overhead PanelのREVERSER LightやENGINE CONTROL Light表示につながる。'
    ]
  },
  q_7X_f90ade7e1bd3: {
    evidence_page_codes: ['78-D2-03', '78-D5-06', '78-D5-07'],
    answer_lines: [
      '- REVERSER LightはT/R Control System Failure、またはControl Systemに影響するMechanical Failureで点灯する。',
      '- T/R Stow Operation中は10秒間点灯する。',
      '- Stowに10秒以上かかる場合はLightがStay Onとなる。',
      '- Stow Command後10.5秒、T/R Stow Control System Component Fault、Deploy中のT/R Deploy Control System Component Faultなどで点灯する。',
      '- Deploy Faultが13秒を超えるとMASTER CAUTION/ENG Annunciationにつながる。'
    ]
  },
  q_7X_5b1478ca7183: {
    evidence_page_codes: ['78-D5-08'],
    answer_lines: [
      '- Amber REV Messageは、T/Rの片方または両方のTranslating SleeveがDeploy Positionの10%から90%の間にある時に表示される。'
    ]
  },
  q_7X_24be20ffca4e: {
    evidence_page_codes: ['78-D5-08'],
    answer_lines: [
      '- Green REV Messageは、両方のTranslating SleeveがDeploy Positionの90%以上になった時に表示される。'
    ]
  },
  q_7X_a7abf57e421a: {
    evidence_page_codes: ['79-D2-01', '79-D2-09'],
    answer_lines: [
      '- Oil SystemはStorage、Distribution、Indicatingで構成される。',
      '- DistributionはSupply、Scavenge、Vent Circuitで構成される。',
      '- Supply Flow: Oil Tank -> Anti-Leakage Valve -> Lubrication Unit -> Oil Supply Pump -> Supply Oil Filter -> Rear Sump / AGB / TGB and Forward Sump。',
      '- Scavenge Flow: Forward Sump、Rear Sump、AGB/TGB -> Chip Detector -> Scavenge Pump -> Scavenge Oil Filter -> Servo Fuel Heater -> Main Oil/Fuel Heat Exchanger -> Servo Fuel Heater -> Oil Tank。',
      '- Vent CircuitはOil Tank、Forward Sump、AGB/TGB、Rear SumpのPressure Balanceを保ち、Engine RearのTurbine Exhaust Plug側へVentする。'
    ]
  },
  q_7X_9c891d0f5509: {
    evidence_page_codes: ['79-D1-01', '79-D1-02'],
    answer_lines: [
      '- Oil ServicingはRight Fan Cowl側のOil Tank Access Doorから行う。',
      '- Oil LevelはOil Tank Sight Glass、またはFlight CompartmentのOil Quantity Indicationで確認できる。',
      '- Gravity FillではOil Tank Gravity Fill Portから補給し、Sight GlassのFull Indicationに達したらFull。',
      '- Oil Level Check/FillはNormal Servicing、Oil System Component Replacement後、Engine Oil Change時に行う。',
      '- 注意: Shutdown後5分以内にOil Tank Filler Capを外さない。Hot/Pressurized Oilで人身傷害の危険がある。',
      '- 注意: Shutdown後30分以内、Oil Tankが冷える前にReplenish Procedureを行う。冷えるとOver Serviceや誤ったOil Consumption Rateにつながる。',
      '- 承認されていないOil Brandを使わない。Oilが皮膚やPaintへ付着した場合は速やかに処置する。'
    ]
  },
  q_7X_b4cf96f37399: {
    evidence_page_codes: ['79-D1-01', '79-D2-02', '79-D2-03', '79-D2-04', '79-D2-05', '79-D2-08', '79-D3-02'],
    answer_lines: [
      '- Oil Tank: Fan Case 3:00。Oilを保持し、Scavenge OilからAirを除去し、Level Check/Fillingを行う。',
      '- Lubrication Unit: AGB Rear Face 6:00/Left-Bottom側。OilをPressurize/Filterし、Scavenge Pumpも含む。',
      '- Oil Supply Filter: Lubrication Unit上。Supply OilのContaminationを除去する。',
      '- Chip Detector: Lubrication Unit Housing/Scavenge Pump Inlet。Forward Sump、Rear Sump、AGB/TGBのMetal Particleを捕捉する。',
      '- Main Oil/Fuel Heat Exchanger: Fan Case Left Side 9:00。FuelでOilを冷却しFuelを加熱する。',
      '- Oil Scavenge Filter Assembly: 8:00。Scavenge OilをFilterする。',
      '- Anti-Leakage Valve: Fan Frame 6:00、Oil TankとLubrication Unit間。Shutdown時のOil Leakage/Drain Downを防ぐ。',
      '- T/P Sensor Assembly: Fan Case Left Side 10:00。Oil Pressure TransmitterとOil Temperature Sensorを含む。',
      '- Oil Quantity Transmitter: Oil Tank 2:00 Right Side。Oil QuantityをDEUへ送る。'
    ]
  },
  q_7X_994812c08bf9: {
    evidence_page_codes: ['79-D3-03', '79-D3-04', '79-D3-05', '79-D3-06'],
    answer_lines: [
      '- Oil Quantity: Secondary Engine Displayに0-100%で表示。Fullから18.8%以下が35秒続くとLO Message、表示はReverse Videoになる。',
      '- Oil Pressure: Vertical IndicatorとDigital Displayにpsidで表示。Amber LimitからRedline Limit間はDigital DisplayとBoxがAmber、Redline以下はRed。Redline未満ではAmber LOW OIL PRESSURE Messageが10秒Flash後に点灯する。',
      '- Oil Temperature: Vertical IndicatorとDigital Displayに摂氏で表示。Amber LimitからRedline Limit間はAmber、Redline超過はRed。',
      '- Oil Filter Bypass: Scavenge Oil Filter Clogging TransmitterがCloseするとOIL FILTER BYPASS Messageを表示。10秒Flashing後に点灯する。',
      '- Crew Alert Boxは該当Messageで10秒Flashing後、該当Alertのみ点灯継続となる。'
    ]
  },
  q_7X_ea62f8d0b6ee: {
    evidence_page_codes: ['80-D0-01', '80-D0-02', '80-D0-05', '80-D0-06', '80-D0-07', '80-D0-10'],
    answer_lines: [
      '- Starting SystemはPneumatic PowerでN2 Rotorを回すSystem。',
      '- Pneumatic SourceはAPU、Pneumatic Ground Equipment、Opposite Engine。',
      '- 主ComponentはEngine Start Switch、DEU/EEC、Start Valve、Pneumatic Starter、Start Lever、Ignition Select Switch、CDS Indication。',
      '- Start ValveはStarterへのPneumatic Powerを制御するButterfly Shutoff Valveで、Electrical Control/Pneumatic Operation、Spring Closed。',
      '- StarterはSingle-Stage Axial-Flow Turbine Air Motorで、Reduction GearとSprag Clutchを介してAGB/N2 Rotorを回す。',
      '- GRD選択時、EECがStart Signalを受け、Start Valve SolenoidがEnergizeしValve Open、Starter ClutchがEngageしてN2を回す。',
      '- 25% N2以上でStart LeverをIDLEへ動かしFuel/Ignitionを入れる。55% N2でDEUがStart Switch SolenoidをDe-Energizeし、SwitchはAUTOへ戻りStart ValveはCloseする。'
    ]
  },
  q_7X_da0e1615522b: {
    evidence_page_codes: ['80-D0-05'],
    answer_lines: [
      '- Start Valveは3/8 inch Square Drive ToolでManual Openできる。',
      '- Manual OverrideはLeft Fan CowlのSmall HoleからAccessし、Valve BodyのVisual IndicatorでValve Positionを確認する。',
      '- 注意: Start ValveをRemoveする前にAirplaneからPneumatic PowerをRemoveする。',
      '- Pneumatic Starter Duct内のAir Pressureにより人身傷害の危険があるため、Manual Override/Removal時はDuct PressureとValve Positionを必ず確認する。'
    ]
  },
  q_7X_b83446755148: {
    evidence_page_codes: ['80-D0-06'],
    answer_lines: [
      '- StarterのClutch TypeはSprag Clutch。',
      '- StarterはReduction GearとSprag ClutchでAGB Output Shaftを回す。',
      '- LubricationはEngine運転中にAGBから継続的にOil Flowを受け、Clutch、Gear、BearingをCooling/Lubricationする方式。',
      '- Installation後は通常StarterへOil Supply不要で、AGBがStarter Oil Levelを維持する。ただしNew Starterには事前に少量のOil Supplyが必要。'
    ]
  },
  q_7X_eb309b0ce227: {
    evidence_page_codes: ['80-D0-07'],
    answer_lines: [
      '- START VALVE OPEN MessageのOperation Modeは Steady と Flash(Crew Alert) の2つ。',
      '- Steady: Start ValveがOpenで、Start SwitchがGRD Positionにある時。Messageは点灯のまま。',
      '- Flash(Crew Alert): Start ValveがOpenで、Start SwitchがGRD Positionにない時。START VALVE OPEN Messageが10秒間Flashingし、その後点灯のままになる。',
      '- Flash時は全3つのCrew Alert Boxも10秒間Flashingし、その後は該当Alert Messageのみ点灯継続となる。'
    ]
  }
};
