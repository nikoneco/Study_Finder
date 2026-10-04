const reviewedAnswers = {
  q_38_d1cbf6e5aa80: {
    evidence_page_codes: ['D0-02', 'F0-02', 'D1-01', 'F1-04', 'D1-06', 'D3-01'],
    answer_lines: [
      'Potable Water Systemは、1個のWater Tankに飲料水を搭載し、Water Service PanelからFill / Drainを行うSystem。',
      'Water Tankの水は、Galley Faucet、Lavatory Faucet、Lavatory Toiletへ供給される。',
      '各LavatoryにはWater Supply Shutoff Valveがあり、SinkまたはToiletへの供給を切り分けできる。',
      '各LavatoryのWater HeaterはLavatory FaucetへHot Waterを供給する。',
      'Water Level Sensor / Water Quantity TransmitterはWater Quantity Dataを作り、Attendant PanelのWater Quantity Indicator、国内線仕様ではWater Service PanelのIndicatorにも表示する。',
      '排水時はWater Tank Drain Valve、Forward Lavatory Drain Valve、各Lavatory Water Supply Shutoff Valveを適切に開け、Water Service PanelとForward Lavatory側からDrainする。'
    ]
  },
  q_38_a0429924c283: {
    evidence_page_codes: ['F0-02', 'D0-02'],
    answer_lines: [
      'F0-02 Potable Water Functional Description図の主な空欄名称は次の通り。',
      'Water Quantity Indicator、Fill Fitting、Fill/Overflow Valve、Water Tank、Water Tank Drain Valve、Water Quantity Transmitter、Water Tank Level Sensor、Water Supply Shutoff Valve、Water Heater、Toilet Rinse Valve。',
      '図には関連して、Air Supply(ref)、Service Panel、Potable Water Drain Port、FWD/AFT Drain Mast(ref)、FWD/AFT Galley、FWD/AFT Lavatory、Gray Water Drain Valveも示される。'
    ]
  },
  q_38_63a666c28b68: {
    evidence_page_codes: ['F1-02', 'D3-01', 'F3-01', 'D3-02'],
    answer_lines: [
      'Water Tank自体の容量は62.1 gal(235.0 L)。StandpipeによりMaximum Capacityは60 gal(227.1 L)に制限される。',
      'Training Information上、Standpipeは40 gal(151.4 L)、50 gal(189.2 L)、60 gal(227.1 L)のRoute Requirementに対応できる。',
      'Water Tank Level SensorはCopper Mesh Capacitance Type Sensor。',
      'SensorはWater Tank inner lining内側に取り付けられ、tankのpermanent partとして扱われる。'
    ]
  },
  q_38_ec910cec9fef: {
    evidence_page_codes: ['D3-01', 'D3-04', 'F3-03', 'F3-04'],
    answer_lines: [
      'Water Quantity Indicatorは、Aft Attendant Panel内のPotable Water Moduleにある。',
      'Water Service Panel Water Quantity Indicatorは国内線仕様機のみで、Water Service Panelにある。',
      'Water Service Panel自体はFuselage bottom right sideのaft sectionにある。'
    ]
  },
  q_38_9d1fcc63d100: {
    evidence_page_codes: ['D0-02', 'D1-01', 'F1-02', 'F1-03', 'F1-04', 'F1-05', 'D1-06', 'F2-01', 'D3-02'],
    answer_lines: [
      '主要Component / Location / 概要は次の通り。',
      'Water Service Panel: Fuselage bottom right side aft section。Fill/Overflow Valve Handle、Water Tank Drain Valve Handle、Water Quantity Indicator(国内線仕様)、Compressor Cut-Out Switch、Potable Water Fill Fittingを持ち、給水と排水に使う。',
      'Water Tank: Aft Cargo Compartment aft bulkhead側。Potable Waterを貯め、pressurization fitting、overflow/fill/drain fitting、level sensorなどを持つ。',
      'Fill/Overflow Valve: Aft Cargo Compartment right side / Water Tank right side ceiling付近。Service Panel handleからcontrol cableでopen/closeし、fill line / overflow line / drain lineを切り替える。',
      'Water Tank Drain Valve: Water Tank lower forward側。Service Panel handleからcontrol cableでopen/closeし、tankとaft distribution lineをdrainする。',
      'Lavatory Water Supply Shutoff Valve: 各Lavatory cabinet lower side。OFF / TOILET ONLY / SUPPLY ON / FAUCET ONLYを選択するfour-way valve。',
      'Forward Lavatory Drain Valve: Forward Lavatory Aのsink cabinet内。Forward lavatory/galley supply lineをforward potable water drain portへdrainする。',
      'Water Heater: 各Lavatory cabinet内。Lavatory faucetへhot waterを供給する。',
      'Lavatory Faucet: 各Lavatory sink上。Hot / cold waterをsinkへ供給し、hydraulic timerで流量時間を調整する。',
      'Water Quantity Transmitter: Aft Cargo lining behind、Water Tank right hand outboard lower side。Level sensor capacitanceを0-10V DC系のquantity indicationへ変換する。'
    ]
  },
  q_38_47b5f050dc19: {
    evidence_page_codes: ['F4-01', 'F4-02', 'F4-03', 'F4-04', 'F4-05', 'F4-06', 'F4-07', 'F4-08'],
    answer_lines: [
      'Water Tank Pressurization Systemは、Potable Water Tankを加圧するSystemで、pressurized air sourceはPneumatic SystemまたはAir Compressor。',
      '構成Componentは、Pneumatic Equipment(in-line air filter、pressure regulator、check valve 2個、pressure relief valve)、Air Compressor / inlet air filter、Pressure Limit Switch、Compressor Cut-Out Switch、Water Tank pressurization line。',
      'Pneumatic System使用時は、APU Check Valve前方のtapからairを取り、in-line air filterでcontaminationを除去し、pressure regulatorでmaximum 35 psigに制御してWater Tankへ送る。',
      'Air CompressorはPneumatic Systemが使用できない時、またはtank pressureが低い時にWater Tankを加圧する。',
      'Pressure Limit Switchはtank pressure 30 psig以下でclose、40 psig以上でopenし、compressor control relayを制御する。',
      'Compressor Cut-Out SwitchはWater Service Panel door open時にopenし、service中にcompressorが作動しないようにする。',
      'Protectionとして、pneumatic supply側pressure relief valveは60 psig超でreliefし55 psigでreset、air compressor側にもoverpressure reliefがある。'
    ]
  },
  q_38_5035c3e1a895: {
    evidence_page_codes: ['F4-06', 'F4-07', 'F4-08'],
    answer_lines: [
      'Water Compressor(Air Compressor)の作動条件は、Compressor Control Relayがenergizeすること。',
      '必要条件は、Water Service Door Closed、つまりCompressor Cut-Out Switch Closed。',
      'Water Tank Pressureが30 psig以下、つまりPressure Limit Switch Closed。',
      '115V AC Main Bus 1がON。',
      'Pressure Limit Switchは40 psig以上でopenし、compressorを止める。'
    ]
  },
  q_38_ea004e770ad1: {
    evidence_page_codes: ['F4-02', 'F4-03', 'F4-04', 'F4-05', 'F4-06'],
    answer_lines: [
      'Water Tank Pressurization Systemの主要Component Locationは次の通り。',
      'Pneumatic Equipment: Aft Cargo Compartment内、ceiling area / aft bulkhead forward側。In-line air filter、pressure regulator、check valves、pressure relief valveを含む。',
      'Air Compressor: Aft Cargo Compartment left side、Waste Tank access用forward access panelを外してaccess。Vacuum Blower support shelfの下側に取り付く。',
      'Inlet Air Filter: Air Compressor inlet side。',
      'Pressure Limit Switch: Water Tank topに取り付く。',
      'Compressor Cut-Out Switch: Aft fuselage bottom right sideのWater Service Panelにある。',
      'Water Tank: Aft Cargo Compartment aft bulkhead側。'
    ]
  },
  q_38_508730e5e139: {
    evidence_page_codes: ['F5-01', 'F5-02', 'F5-03', 'F5-04'],
    answer_lines: [
      'FWD Gray Water Drain Valveの目的は、Airplane on ground時にforward側の水平部に残るwaste waterをdrainし、drain hose内にwaterがtrapされるのを防ぐこと。',
      'LocationはE/E Compartment left side、E1 Rack outboard。',
      'Valveは28V DCで作動するspring loaded close type valve。',
      'On Groundではopenし、forward waste waterをForward Door Sill Drain Fitting側へdrainする。',
      'In Airではcloseし、forward waste waterはForward Drain Mastからdrainされる。これによりForward Door Sill Drain Fitting周辺での凍結を防ぐ。'
    ]
  },
  q_38_03bb8c0d786f: {
    evidence_page_codes: ['F5-01', 'F5-02', 'F5-03', 'F5-04'],
    answer_lines: [
      'Waste Water Systemは、Lavatory / Galley Sinkからのwaste waterを集め、heated drain mastからoverboardへdrainするSystem。',
      '主要Componentは、Lavatory/Galley Sink Drain、Lavatory/Galley Sink Drain Vent、Forward Gray Water Drain Valve、Drain Hose and Line、Drain Mast。',
      'Forward Gray Water Drain ValveはE/E Compartment left side E1 rack outboardにあり、groundでopen、flightでcloseする。',
      'Drain MastはLower Fuselageに2つあり、Forward Drain MastはRight Air Conditioning Compartment前方、Aft Drain MastはAft Cargo Compartment bottomにある。',
      'Drain Mastはelectrically heatedでicingを防ぐ。'
    ]
  },
  q_38_58652b1c63a7: {
    evidence_page_codes: ['F7-01', 'F7-03', 'F7-04', 'F7-05', 'F7-07'],
    answer_lines: [
      'Continuous Level Sensorは、Waste Tank quantityを連続的に測定するためのcapacitance-type pressure sensor。',
      'Sensor ModuleはWaste Tank bottom側でliquid(head) pressureを測定する。',
      'Remote DiaphragmはWaste Tank上部のair pressureを測定し、その圧力をoil-filled capillary tubeでSensor Moduleへ送る。',
      'Sensor Moduleはliquid pressureとtank air pressureの差からwaste quantityを求め、その値をLCMへ送る。',
      'LCMはこの値をWaste Quantity Indicatorへ送り、EからFまで1/8刻みのquantity indicationを表示する。'
    ]
  },
  q_38_8682de305e25: {
    evidence_page_codes: ['F7-01', 'F7-02', 'F7-04', 'F7-07'],
    answer_lines: [
      'Point Level Sensorは、Waste TankがFullになったことをLogic Control Module(LCM)へ知らせるsensor。',
      'Aft Cargo Compartmentに2個あり、Waste Tank inboard sideに取り付く。',
      'LCMから15V DC powerを受け、Tank Not Fullは0V DC、Tank Fullは15V DC、Sensor Fouledは1.83 Hz signal、BIT結果もLCMへ送る。',
      'Waste levelがsensor faceの50%に達するとTank Full signalを送る。',
      'Sensor face上のwaste build-upが1/8 inch以上になるとFoul signal、3/8 inchに達するとTank Full signalとなる。',
      'Sensor Fouled時はLCMのSENSOR J1/J2 light flashing、およびAttendant PanelのCLEAN/CHECK SENSOR light onで示される。'
    ]
  },
  q_38_3ece238ca9a6: {
    evidence_page_codes: ['F7-03', 'F7-04', 'F7-07'],
    answer_lines: [
      'LCM(Logic Control Module)はWaste Tank levelを監視し、Waste Tank quantity indicationとlavatory operation可否を制御するmodule。',
      'LocationはAft Cargo Compartment内、Waste Tank access panelを開けてaccessでき、Waste Tank forward upper sideにある。',
      'LCMは2個のPoint Level SensorとContinuous Level Sensorからdataを受ける。',
      'Continuous Level Sensor信号を使ってWaste Quantity Indicatorへquantity表示を送る。',
      'Point Level SensorからTank Full信号を受けると、FCUへdisable signalを送り、toilet operationを停止させる。',
      'LCMにはTEST switch、SENSOR J1/J2/J3、TANK FULL、POWER ONのLEDがあり、lamp test、sensor BIT、auto zero adjustmentなどを行う。'
    ]
  },
  q_38_9e103154a641: {
    evidence_page_codes: ['D6-01', 'F6-01', 'D6-04', 'D6-05', 'D6-08', 'D6-19', 'F7-04'],
    answer_lines: [
      'Vacuum Waste Systemは、Toiletからのwasteを取り除き、Waste Tankに貯めるSystem。',
      '主要Componentは、Toilet Assembly、Waste Tank、Liquid Separator、Waste Tank Rinse Nozzle、Waste Tank Rinse Filter、Waste Tank Rinse Fitting Assembly、Waste Drain Valve Assembly、Waste Drain Ball Valve、Drain Line Blockage Removal Valve/Fitting、Vacuum Check Valve、Vacuum Blower、Vacuum Blower Barometric Switch、LCM、FCU。',
      'Low pressure sourceは、Vacuum BlowerとCabin-to-Ambient Pressure Differentialの2つ。',
      'Flush Switchを押すとFCUがLCMからenableを受けている場合にFlush Cycleを開始する。',
      'FCUはRinse Valve、Flush Valve、Vacuum Blowerを制御し、cabin pressureの力でtoilet wasteをVacuum Waste Tube経由でWaste Tankへ送る。',
      'Waste Tank Full時はLCMがFCUへdisable signalを送り、toilet operationを止める。',
      'Waste Tank servicingはWaste Service Panelから行い、drain後にrinse nozzleでtank内とpoint level sensorをcleanする。'
    ]
  },
  q_38_255f9537525b: {
    evidence_page_codes: ['D6-04', 'D6-08', 'F6-09', 'F6-10', 'D6-12', 'D6-19'],
    answer_lines: [
      'Vacuum Blowerの作動条件は、Lavatory Flush Switchが押され、LCMがTank Not FullとしてFCUへenable signalを送っていること。',
      'Waste Drain Ball ValveがCloseで、proximity switchがcloseしていること。',
      'Airplane Altitudeが16,000 ft以下で、Vacuum Blower Barometric Switchがcloseしていること。',
      'これらの条件が揃うと、FCUからsignalが送られVacuum Blowerは15 sec作動する。',
      'Waste Drain Ball Valveがnot closeの場合、または16,000 ft以上ではVacuum Blowerは作動しない。'
    ]
  },
  q_38_7d6117debfe8: {
    evidence_page_codes: ['F6-09', 'F6-10', 'D6-19'],
    answer_lines: [
      '設問のPressure Sensorは、Vacuum Blower Barometric Switchを指すものとして整理する。',
      'LocationはJackscrew Compartment内で、Section 48のBlowout Doorからaccessできる。',
      'SwitchはLeft Side Fuselageに取り付けられている。',
      'Ambient pressureをsenseし、altitudeが16,000 ft以上になるとswitchがopenしてVacuum Blower operationを止める。'
    ]
  },
  q_38_00bc43210ec5: {
    evidence_page_codes: ['F6-17', 'F6-18', 'D6-18', 'D6-19'],
    answer_lines: [
      'Vacuum Waste Line Clean-Out FittingのLocationはForward Cargo Compartment。',
      'Cargo Compartment Ceiling Panelをremoveすることでaccessできる。',
      'Forward LavatoryからWaste Tankまでのvacuum waste line blockageをcleanするために使用する。',
      'Clean-out時はPlumber Snakeまたはcompressed air equipmentを使用する。作業中は各Toilet Flush HandleにDo-Not Operate Tagを取り付ける。'
    ]
  },
  q_38_dae9d0d6acde: {
    evidence_page_codes: ['F6-15', 'D6-16', 'D6-17', 'D6-19'],
    answer_lines: [
      'Drain Line Blockage Removal Valveの目的は、rinse waterを使ってWaste Tank Drain Lineの詰まりをcleanにすること。',
      'JAL 301-349では、Normal positionでrinse waterはRinse Nozzleへ流れ、Blockage Removal positionでrinse waterはDrain Line Elbowへ流れる。',
      'Drain Line ElbowはWaste Drain Ball ValveとWaste Service PanelのWaste Drain Valve Assemblyの間にある。',
      'JAL 350-999ではDrain Line Blockage Removal Fittingにair pressure toolを取り付け、air pressureで詰まりを移動させる。'
    ]
  },
  q_38_43c56e4522de: {
    evidence_page_codes: ['D6-01', 'F6-01', 'D6-04', 'D6-05', 'D6-08', 'D6-12', 'D6-16', 'D6-18', 'D6-19', 'F7-04'],
    answer_lines: [
      'Vacuum Waste Systemの主要Component / Location / 概要は次の通り。',
      'Toilet Assembly / Flush Switch: 各Lavatory。Flush Switch signalをFCUへ送り、Rinse Valve、Flush Valve、Vacuum Blowerを作動させる。',
      'FCU: Toilet Assembly側。LCMからenableを受け、Flush Cycle中にVacuum Blower、Rinse Valve、Flush Valveを制御する。',
      'Waste Tank: Aft Cargo Compartment left side、cargo side lining behind。Toilet wasteを貯める。使用可能容量は60 gal(227 L)。',
      'Liquid Separator: Waste Tank top。Vacuum lineへ液体が行くのを防ぐ。',
      'Vacuum Blower: Aft Cargo Compartment left side、Waste Tank前方のshelf上。Waste Tankからairを抜いてnegative pressureを作る。',
      'Vacuum Check Valve: Aft Cargo Compartment left side、Waste Tank vent port exhaust duct upstream。Vacuum Blower作動中のambient air吸込みを防ぐ。',
      'Waste Drain Ball Valve / Linkage: Aft Cargo Compartment left side、drain lineとservice panel間。Waste Tank drain時にmanualでopen/closeし、not close時はblowerをinhibitする。',
      'Waste Service Panel: Aft lower-left fuselage。Waste Drain Valve Assembly、Drain Ball Valve Control Handle、Waste Tank Rinse Fitting Assemblyを持つ。',
      'Waste Tank Rinse Filter / Nozzle: Aft Cargo Compartment / Waste Tank上部。Rinse waterでtank内とPoint Level Sensorをcleanする。',
      'Drain Line Blockage Removal Valve/Fitting: Aft Cargo Compartment。Waste drain line blockage removalに使用する。',
      'Vacuum Waste Line Clean-Out Fitting: Forward Cargo Compartment ceiling panel behind。Forward lavatoryからwaste tank間の詰まりをcleanする。',
      'LCM / Point Level Sensor / Continuous Level Sensor: Aft Cargo Compartment waste tank周辺。Tank full判定、quantity indication、toilet disableを行う。'
    ]
  },
  q_38_dcb486b2f785: {
    evidence_page_codes: ['D6-04', 'D6-19', 'F6-03', 'F6-04'],
    answer_lines: [
      'FCU(Flush Control Unit)は、LCMからenable signalを受けている時にToilet Assembly componentsを作動させるcontrol unit。',
      'Flush Cycle中、Vacuum Blower、Rinse Valve、Flush Valveを制御する。',
      'Flush Switchが押されると、FCUはそのLavatoryの次のFlush Switch signalを15 sec間inhibitする。',
      'FCUはRinse Valveを0.7 sec openして8 ozのpotable waterをtoilet bowlへ供給し、Flush Valveを4 sec openしてwasteをdrainする。',
      'Maintenance switchによりFlush Valveをopen保持する機能もある。'
    ]
  },
  q_38_530d8ea66ba6: {
    evidence_page_codes: ['D6-04', 'D6-19', 'F6-03', 'F6-04'],
    answer_lines: [
      'Flush Switchを押すとsignalはFCUへ送られ、LCMからenableを受けていればFlush Cycleがstartする。',
      'FCUは直ちに15 secのDuty Cycle Inhibitを行い、そのLavatoryのFlush Switch signalを一時的に受け付けない。',
      '同時にVacuum Blowerへsignalを送り、airplane altitude 16,000 ft以下かつDrain Ball Valve closeであればVacuum Blowerは15 sec作動する。',
      'Flush Cycle開始1 sec後、FCUはRinse Valveを0.7 sec openし、8 ozのpotable waterをToilet Bowlへ供給してからcloseする。',
      'Flush Cycle開始2 sec後、FCUはFlush Valveを4 sec openし、toilet wasteをdrainする。その後Flush Valveをcloseする。',
      'Vacuum Blowerはさらに9 sec作動して停止し、FCUは次のFlush Cycleに備える。'
    ]
  },
  q_38_487cfd21b424: {
    evidence_page_codes: ['F7-01', 'F7-02', 'F7-03', 'F7-04', 'F7-05', 'F7-06', 'F7-07'],
    answer_lines: [
      'Waste Tank Quantity Indication Systemの構成は、Waste Tank Point Level Sensor 2個、Waste Tank Continuous Level Sensor、Logic Control Module(LCM)、Waste Quantity Indicator。',
      'Systemは28V DC Ground Service Busからpowerを受ける。',
      'Continuous Level Sensorはwaste level dataをLCMへ送り、LCMはWaste System Moduleへlevel signalを送ってWaste Quantity IndicatorにEからFまで1/8刻みで表示する。',
      '2個のPoint Level SensorはTank Full判定に使われ、両方がFull Tank signalを出すとLCMはFCU powerをoff/disableし、Waste System ModuleへFull Tank signalを送りLAVS INOP Lightを点灯させる。',
      'CLEAN/CHECK SENSOR Lightはpoint level sensor fouled、sensor disagreement、sensor/BIT faultなどのsensor問題を示す。',
      'System BITはPower-Up BIT、LAVS INOP Test Switch、またはLCM Test Switchで実行でき、Point Level Sensor、Continuous Level Sensor、LCMを確認する。'
    ]
  },
  q_38_c90a546a4f06: {
    evidence_page_codes: ['F7-02', 'F7-04', 'F7-05', 'F7-06', 'F7-07'],
    answer_lines: [
      'CLEAN/CHECK SENSOR Lightは、Waste Tank quantity indication系のsensor問題を示す。',
      '点灯条件は、いずれかのPoint Level Sensorがfouled(dirty)になった時。',
      'いずれかのPoint Level SensorがPower-Up BITでfailした時。',
      'Sensor Disagreementがある時。Sensor Disagreementは、片方のPoint Level SensorがTank Fullを出し、もう片方がTank Fullを出していない状態。',
      'Point Level Sensorのfouled状態は、sensor face上のmaterial build-upが1/8 inch以上で発生し、LCMのSENSOR J1/J2 light flashingとしても示される。'
    ]
  },
  q_38_099b82a6c30b: {
    evidence_page_codes: ['F7-04', 'F7-05', 'F7-06', 'F7-07'],
    answer_lines: [
      'LAVS INOP Lightは、両方のPoint Level SensorがTank Full signalを出した時に点灯する。',
      'この時LCMはFull Tank conditionとしてFCU powerをoff/disableし、Lavatory Toilet operationを停止させる。',
      'LAVS INOP Test Switchをpushすると、Waste Tank Quantity Indication SystemのBIT testを実行できる。',
      'BITではPoint Level Sensor、Continuous Level Sensor、LCMの作動を確認する。',
      'LCM側のTEST switchをTEST SENSOR positionにしてもPower-Up BITを開始できる。TEST LAMPS positionではLCM LEDのlamp testを行う。'
    ]
  },
  q_38_a5964f08005a: {
    evidence_page_codes: ['F5-01', 'F5-02', 'F5-03', 'F5-04'],
    answer_lines: [
      'FWD LAV Gray Water Drain Valveの目的は、on groundでforward waste waterの水平配管部をdrainし、water trapを防ぐこと。',
      'LocationはE/E Compartment left side、E1 Rack outboard。',
      'Valveは28V DCで作動し、spring loaded close type。',
      'On Groundではopenしてforward waste waterをForward Door Sill Drain Fitting側へdrainする。',
      'In Flightではcloseし、forward waste waterをForward Drain Mastからdrainさせる。これによりForward Door Sill Drain Fitting付近のicingを防ぐ。'
    ]
  }
};

module.exports = reviewedAnswers;
