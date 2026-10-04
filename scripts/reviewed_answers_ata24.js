module.exports = {
  q_24_1575293d5b71: {
    evidence_page_codes: ['D0-04', 'D0-05', 'D6-06'],
    answer_lines: [
      'AC Bus:',
      '- AC Transfer Bus 1/2: External Power、APU Starter-Generator、IDG から受電する。1つのAC SourceがBTB経由で両Transfer Busへ供給することもできる。',
      '- Ground Service Bus 1/2: 該当側AC Transfer Bus、またはExternal Power接続時にForward Attendant PanelのGround Service Switch経由で受電する。',
      '- Main Bus / Galley Bus / IFE-PASS SEAT Bus: 各AC Transfer Busから受電し、Overload時はBPCUのLoad Shedで切り離される。',
      '',
      'DC Bus:',
      '- DC Bus 1: 通常TRU 1から受電し、Bus Tie Relay経由でTRU 2またはTRU 3からも受電できる。',
      '- DC Bus 2: 通常TRU 2から受電し、TRU 2 Fail時はTRU 3から受電する。',
      '- Battery Bus: 通常TRU 3から受電し、TRU 3出力がない場合はBatteryから受電する。',
      '- Hot Battery Bus: Main BatteryまたはMain Battery Chargerから受電する。',
      '- Switched Hot Battery Bus: Battery Switch ON時にHot Battery Busから受電する。',
      '',
      'Standby Bus:',
      '- AC Standby Bus: 通常AC Transfer Bus 1から受電し、AlternateではBattery/Hot Battery BusからのDCをStatic Inverterで115v AC 400Hzに変換して受電する。',
      '- DC Standby Bus: 通常DC Bus 1から受電し、AlternateではHot Battery BusからK3 Relay経由で受電する。'
    ]
  },
  q_24_a59763ae0357: {
    evidence_page_codes: ['D1-03', 'D1-05', 'D1-06'],
    answer_lines: [
      '- BPCU: EE CompartmentのE4 Rackにある。External Power DistributionをControlし、EPC/BTB/Ground Service/Load Shed/Indicationなどを制御する。',
      '- EPC: PDP 2にある。External Power 115v AC 400Hz 3 PhaseをTie Busへ接続する。',
      '- P5-4 AC Systems, Generator and APU Module: P5 Overhead Panelにあり、External PowerのManual ControlとIndicationを行う。',
      '- Ground Service Switch: Forward Attendant Panelにあり、External PowerからAC/DC Ground Service BusへPower Supplyする操作に使う。',
      '- External Power Panel/Receptacle: Nose Fuselage右側にあり、External Power Sourceを接続する。'
    ]
  },
  q_24_3d0f25774982: {
    evidence_page_codes: ['D1-06'],
    answer_lines: [
      '- Ground Power Switch Position',
      '- Bus Transfer Switch Position',
      '- External Power PanelとEPC間のLine Voltage',
      '- Feeder Wire Current Flowに比例するCurrent Transformer(CT) Signal',
      '- External Power Panel Pin E/F Continuity',
      '- BTB 1 / BTB 2 Position',
      '- GCB 1 / GCB 2 Position',
      '- APB Position',
      '- Air/Ground',
      '- CAB/UTIL Switch Position',
      '- IFE/PASS SEAT Switch Position',
      '- Ground Service Relay Position',
      '- Ground Service Switch Position',
      '- EPC Position',
      '- APU Generator Switch Position(AGCUから)',
      '- Autoland Signal(FCCから)'
    ]
  },
  q_24_848f7bc5dd7e: {
    evidence_page_codes: ['D1-06'],
    answer_lines: [
      '- External Power Contactor(EPC) Control',
      '- AC Distribution Bus Protection',
      '- External Power Monitoring and Protection',
      '- Flight Compartment Indication',
      '- Bus and Galley Load Shed',
      '- Ground Service Power Source Control',
      '- Refueling Station Power',
      '- Built-In Test Equipment for Fault Isolation'
    ]
  },
  q_24_41a00ffd0049: {
    evidence_page_codes: ['D1-08'],
    answer_lines: [
      'BPCUは次の全条件を満たす時にEPCをCloseする。',
      '- Ground Power SwitchがON Position',
      '- External Power QualityがGood(Voltage and Frequency)',
      '- Interlock Pin E-Fが接続されている',
      '- Protective Functionが発生していない',
      '- BTB間がNo Power'
    ]
  },
  q_24_f4d2d2274f49: {
    evidence_page_codes: ['D1-06'],
    answer_lines: [
      '- External Three-Phase AC Power',
      '- 28v DC from Battery',
      '- 28v DC from DC Bus 1'
    ]
  },
  q_24_186d5bad2f40: {
    evidence_page_codes: ['D1-04', 'D1-09'],
    answer_lines: [
      '- EXTERNAL POWER CONN Indicator(Amber): Ground Power Plugが接続され、Ground SourceからSupplyがある場合に点灯する。これはPower Quality Goodの表示ではない。',
      '- NOT IN USE Indicator(White): External Powerが接続され、EPCがOpenで、Ground Service系RelayがDe-energizeされTransfer Bus/Ground Service BusがExternal Powerから受電していない場合に点灯する。'
    ]
  },
  q_24_97d3f71cc615: {
    evidence_page_codes: ['D2-04'],
    answer_lines: [
      '- IDG: Engine Accessory GearboxのFront Face 7:00 Position、Engine Starter下方にある。EngineのVariable SpeedをConstant Speedに変換し、3 Phase 115/200v AC 400Hzを発生する。',
      '- IDG Air/Oil Cooler: Engine Fan Case後方6:30 PositionのLower Inside Sectionにある。Fan AirでIDG Oil Temperatureを下げる。',
      '- Generator Drive and Standby Power Module: Flight CompartmentのP5 Forward Overhead Panelにあり、IDG Disconnect、DRIVE LightによるGenerator Drive SystemのControlとIndicationを行う。'
    ]
  },
  q_24_deb0426f2ff3: {
    evidence_page_codes: ['D2-11', 'D2-06'],
    answer_lines: [
      '- Pressure Fill PortからIDG Oil Serviceを行う。',
      '- Oilを入れる前にVent Valveを押してIDG Case Air PressureをVentする。',
      '- OilはScavenge FilterとHeat Exchangerを通ってIDG Caseへ送られるため、Over Servicing防止とSight Glassの正確なLevel表示のため、ゆっくりSupplyする。',
      '- Oil LevelはSight Glassで確認する。Silver Band内ならNormal、Silver Band以下ならSupply、Cold時にSilver Bandより上またはHot時にDRAIN Lineより上ならDrainする。',
      '- Oil Quantity Check前は必ずIDG Ventを行い、Service前後にもIDG Ventを行う。',
      '- Engine Shutdown後、最低5分経過を確認する。DisconnectしたIDGのOil LevelはCheckしない。',
      '- 異なるTypeのOilを混合しない。正しいLevelにServiceする。'
    ]
  },
  q_24_a8d1206be97e: {
    evidence_page_codes: ['D2-02', 'D2-09', 'D2-10'],
    answer_lines: [
      '- 構造: IDGはHydromechanical Constant Speed Drive(CSD) SectionとOil Cooled Brushless AC Generator Sectionで構成され、Control/Excitation用にPMGを内蔵する。',
      '- 機能: Engine Accessory GearboxからのVariable Input Speedを、Generatorを回すためのConstant Speed(24,000 RPM)に変換し、3 Phase 115/200v AC 400Hz、90 KVAを供給する。',
      '- Oil System: IDG OilはHydromechanical(CSD)、Lubrication、Coolingに使われる。Charge PumpがCSD作動・潤滑・冷却用Oil Pressureを作り、Scavenge PumpがHot OilをAir/Oil CoolerとIDG Oil Coolerへ送り、Deaerator経由でIDGへ戻す。',
      '- Cooling: Air/Oil CoolerはEngine Fan Airで、IDG Oil CoolerはFuelでOil Temperatureを下げる。',
      '- Indication/Protection: Oil PressureがMinimum Operating Limit未満、またはUnderfrequency時にDRIVE Lightが点灯する。'
    ]
  },
  q_24_780205016b20: {
    evidence_page_codes: ['D3-04', 'D3-07', 'D3-08', 'D3-14', 'D3-20', 'D3-24'],
    answer_lines: [
      '- IDG 1/2: 各Engine Accessory Gearboxにある。3 Phase 115/200v AC 400Hzを発生し、各AC Transfer Busの通常Power Sourceとなる。',
      '- GCU 1: EE Compartment E2 Rack、GCU 2: E4 Rack。IDG Excitation、GCB/BTB Control、Electrical Protection、IndicationおよびBITEを行う。',
      '- APU Starter Generator: APU Gearbox右側にある。APU Start時はStarter、発電時はAC Power Sourceとして作動する。',
      '- AGCU / SCU: EE Compartment E2 Rack。AGCUはAPU GeneratorのControl/Protection、SCUはAPU Generator Output RegulationとAPU Startを行う。',
      '- PDP 1(P91): EE Compartment左側、PDP 2(P92): 右側。AC Bus、GCB、BTB、APB/EPCなどを収容しPowerをDistributionする。',
      '- P5-4 AC Systems, Generator and APU Module: Flight Compartment P5 Forward Overhead Panelにあり、Generator/APU/External PowerのManual ControlとIndicationを行う。'
    ]
  },
  q_24_f559e34f0867: {
    evidence_page_codes: ['D3-08', 'D3-15', 'D3-17', 'D3-18'],
    answer_lines: [
      'GCUの機能:',
      '- GCBとBTBのControl',
      '- IDG GeneratorへのExcitation Supply/Control',
      '- Limit外のElectrical ParameterからElectrical SystemとIDGをProtection',
      '- P5-5/P5-4 ModuleのElectrical System Indication Control',
      '- Fault Isolation用BITE',
      '',
      'AGCUの機能:',
      '- APB PositionをControlするためInput/Internal Logicを使用する。',
      '- SCUとともにStarter GeneratorとSystem LoadをProtectionする。',
      '- Starter GeneratorのVoltage/Current/FrequencyをMonitorし、VR Enable SignalやAPB Open/CloseをControlする。',
      '- APU Generator Switch Position、VR Enable、OV/UV Protection Flag、APU Power Available Signalを出力する。',
      '- Front Face BITEを持つ。'
    ]
  },
  q_24_047e69aed31b: {
    evidence_page_codes: ['D0-07', 'D0-08'],
    answer_lines: [
      'Electrical Meters, Battery and Galley Power Module(P5-13)の機能:',
      '- AC/DC ComponentまたはBusのElectrical Power Parameterを表示する。',
      '- Battery SwitchでBattery PowerをElectrical Busへ接続する。',
      '- CAB/UTIL SwitchでGalley及びMain Bus PowerをSupply/Removeする。',
      '- IFE/PASS SEAT SwitchでIFE BusへのPowerをSupply/Removeする。',
      '- DC/Standby Power SystemのFailure Indicationを行う。',
      '- DC/Standby PowerをMonitorし、Fault MessageをMemoryに保存する。',
      '- Fault MessageをLED Alphanumeric Displayに表示する。'
    ]
  },
  q_24_7e0cb961b9cf: {
    evidence_page_codes: ['D0-10', 'D0-11', 'D3-25', 'D3-26'],
    answer_lines: [
      '- GRD POWER AVAILABLE(Blue): External AC Powerが接続され、QualityがGoodの場合に点灯する。',
      '- TRANSFER BUS OFF(Amber): 該当AC Transfer BusにPowerがない場合に点灯する。',
      '- SOURCE OFF(Amber): AC Transfer Busが最後にSelectしたSourceからEnergizeされていない場合に点灯する。',
      '- GEN OFF BUS(Blue): Engine Generator Control Breaker(GCB)がOpenの場合に点灯する。GCB Closeで消灯する。',
      '- APU GEN OFF BUS(Blue): APUがRTL状態でAPBがOpenの場合に点灯する。APB CloseまたはAPU Shutdownで消灯する。'
    ]
  },
  q_24_7b0ef7ed19de: {
    evidence_page_codes: ['D3-08', 'D3-09'],
    answer_lines: [
      '- Generator Control Breaker(GCB)とBus Tie Breaker(BTB)のControl',
      '- IDG GeneratorへのExcitation Supply/Control',
      '- Limit外のElectrical ParameterからElectrical SystemとIDGをProtection',
      '- P5-5及びP5-4 ModuleのElectrical System Indication Control',
      '- Fault IsolationのためのBuilt-In Test(BITE)'
    ]
  },
  q_24_830919a0ac99: {
    evidence_page_codes: ['D3-10', 'D3-13', 'D3-28'],
    answer_lines: [
      'GCB Automatic Closeは、FlightでAPUだけがAircraft Powerを供給している状態からAir Modeへ移行した時に、IDG側へ自動的にPower Sourceを戻す機能。',
      'GCUは次の条件でGCBへClose Commandを出す。',
      '- Fire SwitchがNormal Position',
      '- 該当BTBがOpen',
      '- AirplaneがAir Mode',
      '- Air Modeへ移行した時にGCBがOpenで、Aircraft PowerがAPUのみ',
      '- APBがOpen',
      '- IDG Power QualityがGood',
      'このAutomatic CloseはFlight中1回だけ発生し、Ground Modeへの切替でResetされる。'
    ]
  },
  q_24_6e5a0e2c3564: {
    evidence_page_codes: ['D3-14'],
    answer_lines: [
      '- Ground OperationのためにAC Powerを作る。',
      '- Flight中、IDGのBackupとしてElectrical Powerを供給できる。',
      '- APU Start時、SCUからのAC Powerを使ってAPUを回すStarterとして機能する。',
      '- Generatorとしては3 Phase 115/200v AC 400Hzを供給し、32,000 ft未満で90 KVA、41,000 ftで66 KVAを供給する。'
    ]
  },
  q_24_57349513f042: {
    evidence_page_codes: ['D3-20', 'D3-21'],
    answer_lines: [
      '- Location: EE CompartmentのE2 Rack上にある。',
      '- Function 1: APU Starter GeneratorのElectrical Power OutputをRegulateする。',
      '- Function 2: APU Start時にAPUへ回転を与える。',
      '- Interface上は、APU Start時にSPUからの270v DCをAC Powerへ変換してStarter Generatorを回し、Fault DataをAPU ECUへ送る。'
    ]
  },
  q_24_0f5d132ad21e: {
    evidence_page_codes: ['D3-24'],
    answer_lines: [
      'PDP 1(P91)には次のComponentがある。',
      '- AC Transfer Bus 1',
      '- Ground Service Bus 1',
      '- DC Bus 1',
      '- Generator Control Breaker 1(GCB 1)',
      '- Auxiliary Power Breaker(APB)',
      '- Bus Tie Breaker 1(BTB 1)'
    ]
  },
  q_24_22f6e9cfbbd0: {
    evidence_page_codes: ['D4-06', 'D4-02', 'D4-05'],
    answer_lines: [
      '- P6/P18 Panel: DC Bus SectionやCircuit Breaker、R634 Ground Service Relayを含むRelay、SPCUを持つ。SPCUはDC Distributionの大部分をManual/Automatic Controlする。',
      '- P5-13 Electrical Meter, Battery and Galley Power Module: DC Generation Indication、DC Meter Selector/Alphanumeric Display、Battery SwitchによるBattery Power Controlを行う。',
      '- P5-5 Generator Drive and Standby Power Module: Standby Power SystemのManual ControlとIndicationを行う。',
      '- E2 Rack: TRU 1、Main Battery Charger、Static Inverterがある。',
      '- E3 Rack(INT): Auxiliary Battery Chargerがある。BatteryはE3 Rack Bottom Shelfにある。',
      '- E4 Rack: TRU 2、TRU 3がある。',
      '- PDP: DC Busの多くとTRU Circuit Breakerを持つ。'
    ]
  },
  q_24_5cd38347e09d: {
    evidence_page_codes: ['D5-02', 'D5-06'],
    answer_lines: [
      '- Main Battery: 48 Ah、24v DC、20 CellのNickel Cadmium Battery。',
      '- Auxiliary Battery(INT仕様機): Main Batteryと同じく48 Ah、24v DC、20 CellのNickel Cadmium Battery。',
      '- Main BatteryはFull Chargeで最低30分間Standby AC/DCへPower Supplyできる。',
      '- INT仕様機はAuxiliary Battery搭載により最低60分間Standby AC/DCへPower Supplyできる。'
    ]
  },
  q_24_2146d635a896: {
    evidence_page_codes: ['D6-04', 'D6-06'],
    answer_lines: [
      '- Static InverterはBattery/Hot Battery Busからの24v DCを変換し、Single Phase 115v AC、400 HzをAC Standby Bus/Standby Loadへ供給する。',
      '- AC Transfer Bus 1にPowerがない場合、またはStandby Power SwitchがBAT Positionの場合にAC Standby BusへPowerを供給する。'
    ]
  },
  q_24_354eb536bf4a: {
    evidence_page_codes: ['D4-02', 'D5-01'],
    answer_lines: [
      'DC Power SystemのPower Sourceは次の3つ。',
      '- 3 Transformer Rectifier Unit(TRU)',
      '- Battery Charger',
      '- Battery',
      '通常のDC Power SourceはTRUで、TRUは115v AC 3 Phaseを28v DCに変換する。AC Systemが使えない場合はBatteryからPower Supplyされる。'
    ]
  },
  q_24_69a2203b967a: {
    evidence_page_codes: ['D5-03'],
    answer_lines: [
      '- Main BatteryをMaximum Chargeに保つ。',
      '- Battery BusにDC PowerをSupplyする。'
    ]
  }
};
