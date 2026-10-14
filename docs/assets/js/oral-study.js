window.STUDY_CONFIG = {"oralFigures":{"schemaVersion":1,"figures":[{"questionId":"oral_rev3_p44_s01_r01","promptIndexes":[0],"file":"oral-ata22-autoflight-functions.webp","alt":"AutoflightのGuidance、Stability Augmentation、Thrust Managementと各機能の対応図。","caption":"Autoflightの3つの役割と、F/D・A/P・Trim・A/Tの対応。DFCSの6 Sub Systemとは別の機能分類。"},{"questionId":"oral_rev3_p44_s01_r01","promptIndexes":[1],"file":"oral-ata22-speed-autopilot-trim.webp","alt":"FCC A/BからSpeed TrimまたはAutopilot TrimがStabilizer Actuatorを制御する入出力図。","caption":"A/P OFFではSpeed Trim、A/P ONではA/P Stabilizer Trim。Limit Switch・Cutout Switch・Stabilizer位置のFeedbackも確認する。"},{"questionId":"oral_rev3_p44_s01_r01","promptIndexes":[1],"file":"oral-ata22-trim-command-flow.webp","alt":"FCCのTrim Up/DownとClutch信号がMain Electric Trim、Column Switch、Cutout Switch、Limit Switchを通る回路図。","caption":"緑はBrake Release/Clutch、桃色はTrim Up、水色はTrim Downの経路。Main Electric TrimによるCrew Inputを優先する。","note":"Column CutoutはColumn操作と逆方向のStabilizer Trimを遮断する。ElevatorとStabilizerの動きが常に逆という意味ではない。"},{"questionId":"oral_rev3_p44_s01_r02","promptIndexes":[1],"file":"oral-ata22-mcp.webp","alt":"MCPのCourse、A/T、IAS/Mach、Roll、Pitch、CMD/CWS、F/Dの配置を色分けした図。","caption":"MCPの操作部の配置。橙はA/T、青はRoll、赤はPitch、緑はA/P Engage、紫はF/D。SPD INTV・ALT INTVの位置も確認する。"},{"questionId":"oral_rev3_p44_s01_r03","promptIndexes":[0],"file":"oral-ata22-mcp.webp","alt":"MCPのMode SelectorとSelected Parameter表示、CMD/CWSとF/D Switchの配置図。","caption":"Mode選択と設定値の位置を確認する。ALT INTVはFlight Phaseに応じて作動し、1回の操作で解除できるAltitude Constraintは1つ。"},{"questionId":"oral_rev3_p44_s01_r03","promptIndexes":[1],"file":"oral-ata22-ap-synchronization.webp","alt":"MCPとFCC、Actuator LVDT、Control Surface Position Sensor、Main/Detent Pistonを結ぶAutopilot Actuator図。","caption":"A/P Engage前にActuator側と実際のControl Surface位置を同期させ、Engage時の急な舵面の動きを防ぐ。Main PistonのLVDTとControl Surface Position Sensorは別のFeedback。"},{"questionId":"oral_rev3_p44_s01_r04","promptIndexes":[2,3],"file":"oral-ata22-trim-warning.webp","alt":"Speed Trim FailとStabilizer Out of Trimの入力、比較、Delayと警告灯の回路図。","caption":"SPEED TRIM FAILとSTAB OUT OF TRIMの検出経路。片側Trim機能の故障はRecall、両側故障は通常点灯。","note":"この図のSTAB OUT OF TRIM検出条件とASAのA/P赤色警告条件は別。高度・Dual Pitch等の条件は回答本文で確認する。"},{"questionId":"oral_rev3_p44_s01_r04","promptIndexes":[2,3],"file":"oral-ata22-mach-trim-feedback.webp","alt":"Mach Trim Actuator、Neutral Shift、Elevator位置のFeedbackとFCC/IFSAUを結ぶ図。","caption":"Mach Trim Actuator位置、Neutral Shift位置、Elevator位置の3つのFeedbackを区別する。A/P ONではInput Torque Tubeが拘束され、Neutral ShiftとElevator位置のFeedbackを使ってA/Pが応答する。","note":"Mach Trimを担当するFCCは初期A、Landingごとに交代し、故障時は他系へ移る。EngageしているA/P側だけで選択が決まるという追記は採用していない。"},{"questionId":"oral_rev3_p47_s01_r02","promptIndexes":[0],"file":"ata34-adirs-component-locations.webp","alt":"ADIRSのISDU、MSU、表示器およびP61 IRS Master Caution Unitの配置図。","caption":"ISDU/MSUはP5 Aft Overhead、IRS Master Caution UnitはP61にある。操縦室の表示器と操作部の配置を確認する。","note":"この図は操縦室/P61の配置。ADIRUとADMのRack位置は回答本文を参照する。"},{"questionId":"oral_rev3_p47_s01_r02","promptIndexes":[1],"file":"oral-ata34-adirs-adr-ir-signal-flow.webp","alt":"Pitot、Static、TAT、AOA、ADM、ISDU、MSU、FMCとADIRUのADR/IR入出力を結ぶ図。","caption":"Pitot/StaticからADMを通るADR入力と、Gyro/Accelerometerを使うIRの流れ。FMC/ISDUの初期位置入力、MSUのMode選択も示す。"},{"questionId":"oral_rev3_p47_s01_r04","promptIndexes":[2],"file":"oral-ata34-wxr-control-panel.webp","alt":"WXR Control Panelの左右のMode、Tilt、Gain、TFR、GCと共通AUTO/TESTの配置図。","caption":"左右のMode/Tilt/Gain/TFRと共通AUTO/TEST。AUTOはTiltとGround Clutterを自動制御し、GainはCalibrated位置を推奨する。"},{"questionId":"oral_rev3_p47_s01_r04","promptIndexes":[3],"file":"oral-ata34-pws-warning-caution-areas.webp","alt":"離陸と進入のPWS Warning/Caution領域と0.5、1.5、3 NMの距離を比較する図。","caption":"左はTakeoff、右はApproach。前方のWarningと周辺のCaution領域を比較する。自動作動条件は本文のFlight Phase別条件に従う。"},{"questionId":"oral_rev3_p47_s01_r05","promptIndexes":[0],"file":"oral-ata34-egpws-terrain-clearance-floor.webp","alt":"滑走路周囲のTCF Envelopeと滑走路中心からの距離に応じたFloorを示す立体図と断面図。","caption":"TCFはRadio Altitudeと位置/Runway Databaseを用い、滑走路周囲に距離に応じたFloorを作る。Floorを下回る侵入を警告する。"},{"questionId":"oral_rev3_p47_s01_r05","promptIndexes":[0],"file":"oral-ata34-egpws-runway-field-clearance-floor.webp","alt":"滑走路標高を基準とするRFCF Alert Area、300 ft Ceiling、1.5/5 NM、KRF、滑走路端を示す断面図。","caption":"RFCFはGeometric Altitudeから滑走路標高を引いたField ClearanceでTCFを補う。滑走路端から5 NM、滑走路上方最大300 ftのFloorを示す。"},{"questionId":"oral_rev3_p44_s01_r06","promptIndexes":[0],"file":"oral-ata22-yaw-damper-interfaces.webp","alt":"SMYD 1とSMYD 2のCross-Channel比較、ADIRU/AOA/FMC入力、Main Rudder PCUのSolenoid/EHSV/LVDTを結ぶPrimary Yaw Damper図。","caption":"Primary Yaw Damperの入出力とSMYD間のCross Talk。SMYD 1がMain Rudder PCUを制御し、両SMYDの計算を比較する。","note":"この図はPrimaryの経路。Standby Yaw DamperはSMYD 2とStandby Rudder PCUを使う別経路で、Engage条件も異なる。"},{"questionId":"oral_rev3_p44_s01_r05","promptIndexes":[2],"file":"oral-ata22-autothrottle-connections.webp","alt":"FCC AのAutothrottleとFMC、DEU、EEC、A/T Servo Motor、Thrust Resolver Pack、MCPを結ぶ接続図。","caption":"A/Tの接続図。N1 ModeのFMC Target N1、EECのTarget TRA、FCC AからASMへの指令とFeedbackを本文と合わせて追う。","note":"N1 ModeではTarget TRAに向けてLeverを動かし、実際のN1による補正も行う。N1 Feedbackを使わないという意味ではない。"},{"questionId":"oral_rev3_p44_s01_r05","promptIndexes":[1],"file":"oral-ata22-autothrottle-mode-selection.webp","alt":"ARM、N1、Speed、THR HLD、RETARD、Go-AroundのA/T Mode選択条件を並べたブロック図。","caption":"A/TのMode選択。THR HLDはServo Powerを切り、RETARDはIdleへLeverを戻す。Go-Aroundの1回目と2回目のTO/GAも区別する。","note":"図のFlare RETARDは24 ftと示すが、SG本文を優先し回答では27 ftとする。THR HLDの開始判定とFMA表示も区別し、詳細条件は回答本文を参照する。"},{"questionId":"oral_rev3_p45_s01_r01","promptIndexes":[2],"file":"oral-ata23-acp-controls.webp","alt":"ACPのTransmit選択、Receive音量、PTT、Filter、NORMAL/ALT Switchを示す図。","caption":"ACPの操作部とNORMAL/ALT。ALTではCAPT・OBSはVHF 1、F/OはVHF 2を使う。","note":"ALTはREU内のAudio処理をBypassする経路。使用できる通信系統と制限は回答本文で確認する。"},{"questionId":"oral_rev3_p45_s01_r02","promptIndexes":[1],"file":"oral-ata23-service-interphone-flow.webp","alt":"Service Interphone JackからAAUへのMic LineとP5 SVC INT Switchを示す接続図。","caption":"P5 SVC INT Switchは、外部Service JackからAAU MixerへのMic Lineを制御する。","note":"OFFで遮断するのはこのMic入力。外部Jackで聞くAudio経路とは分けて考える。"},{"questionId":"oral_rev3_p45_s01_r03","promptIndexes":[2],"file":"oral-ata23-pa-gain-muting.webp","alt":"Engine RunningとCabin DecompressionによるPA Gain、およびAttendant Station Mutingの接続図。","caption":"PAのGainとMuting。本文ではEngine Runningで＋6 dB、Cabin Decompressionでさらに＋3 dBとなる。","note":"図の追記は＋3 dB／＋6 dBを本文と逆に示すため、数値は回答本文を優先する。N2≧50％もEngine Running判定の一条件。Muting経路は色付きの線で確認する。"},{"questionId":"oral_rev3_p45_s01_r04","promptIndexes":[2],"file":"oral-ata23-hf-coupler-modes.webp","alt":"HF Antenna CouplerのHome、Receive Standby、Tune、Receive Operate、Transmitと周波数変更時の遷移図。","caption":"HF Couplerの状態遷移。PTTでTuneを開始し、整合完了後にReceive Operate／Transmitへ進む。","note":"図の15秒はHome／TuneのFault判定限界。通常のTune所要時間や記憶周波数の扱いは装置型式別に回答本文で区別する。"},{"questionId":"oral_rev3_p45_s01_r05","promptIndexes":[2],"file":"oral-ata23-acars-power-interface.webp","alt":"ACARS CMUの電源、P6-1のCMU-1/AC CCB、およびVHF 3・SATCOM接続を示す図。","caption":"ACARSの電源と接続。授業追記のYellow CCBは、整備中に意図しないOOOI Reportを送信させないための弊社運用として確認する。"},{"questionId":"oral_rev3_p45_s01_r06","promptIndexes":[0],"file":"oral-ata23-cvr-signal-flow.webp","alt":"OBS、F/O、CAPT、Area Micの4 ChannelがCVRのA/D変換とCrash Survivable Memoryへ入る信号経路図。","caption":"CVRの4 Channelと記録経路。REUからの3 ChannelとArea Micの1 Channelをデジタル化して記憶する。"},{"questionId":"oral_rev3_p45_s01_r07","promptIndexes":[0],"file":"oral-ata23-elt-controls.webp","alt":"ELT Control PanelのON、ARMED、RESET SwitchとELT Annunciator Lightを示す図。","caption":"ELT Control Panel。ONによる手動作動、ARMEDでの衝撃検知、RESETによる復帰を区別する。","note":"評価シートのJA303J以降という適用条件で読む。試験・整備の実施手順は適用手順書に従う。"},{"questionId":"oral_rev3_p41_s01_r01","promptIndexes":[0],"file":"oral-ata35-crew-oxygen-cylinder.webp","alt":"Crew Oxygen Cylinder、Cylinder Head、Pressure Reducing Regulator、Pressure Transducer、Relief Valve、Thermal Compensatorの位置を示す図。","caption":"Crew OxygenのCylinderとHead。Cylinder圧の表示、Regulatorでの減圧、過圧／高温保護の各経路を区別する。"},{"questionId":"oral_rev3_p41_s01_r02","promptIndexes":[4],"file":"oral-ata35-mask-controls.webp","alt":"Crew Oxygen MaskのDonning/Inflation Plate、N/100% Dilution Control、EMERGENCY/TEST Knobを示す図。","caption":"Mask側の操作部。Harnessの膨張、N/100%の希釈切替、EMERGENCY/TESTをそれぞれ区別する。","note":"Box側のRESET/TEST Leverとは別。図中の「通常100%」は授業追記で、Departure前の最終設定の現行適用は回答の不足点を参照する。"},{"questionId":"oral_rev3_p41_s01_r03","promptIndexes":[0],"file":"oral-ata35-passenger-oxygen-deployment.webp","alt":"客室高度のPressure SwitchまたはP5 SwitchからDoor Latch ActuatorとOXY Indication Relayを作動させる回路図。","caption":"Passenger Oxygenの電気的なMask展開と表示。Auto／Manualの経路と、Indication Relayの保持を確認する。","note":"Maskの展開とChemical Generatorの酸素発生は別。酸素発生はMaskを引く機械的な作動から始まる。"},{"questionId":"oral_rev3_p41_s01_r04","promptIndexes":[0],"file":"oral-ata35-portable-cylinder.webp","alt":"Portable Oxygen CylinderのShutoff Valve、Pressure Indicator、Mask接続とPBEの構成を比較する図。","caption":"Portable Oxygen BottleとPBEの構成。Bottleによる酸素供給と、煙の中で使うPBEの役割を区別する。","note":"図から搭載個数を推定せず、BottleとPBEそれぞれの個数は該当ConfigurationのEmergency Equipment Listで確認する。"},{"questionId":"oral_rev3_p39_s01_r01","promptIndexes":[0,1],"file":"oral-ata29-main-system-flow.webp","alt":"System AのReservoirからEDP/EMDP、Pressure Module、User、Return Filterへの流れとCase DrainのFuel Heat Exchangerを示す図。","caption":"Main Hydraulicの供給・Pressure・Return・Case Drainを色付きの線で追う。Case DrainはFuel Tank内のHeat Exchangerで冷却する。","note":"図はSystem Aの例。A/BのUserの違いと低Fuel時の運転条件は回答本文を参照する。"},{"questionId":"oral_rev3_p18_s01_r05","promptIndexes":[0],"file":"oral-ata29-edp-depressurization.webp","alt":"ENG Hydraulic Pump Switch ON/OFFによるEDP Depressurization Solenoid、Blocking Valve、Compensator、Yokeの動きを示す図。","caption":"EDP SW OFFの減圧作用。SolenoidがEnergizeしてSystemへのOutputを止めるが、Engineが回転している間はPumpの回転とCase Drainが続く。","note":"Fire Handle Pullは別のSupply Shutoff Valveを閉じる。Pump SWによる減圧と、Reservoirからの供給遮断を区別する。"},{"questionId":"oral_rev3_p39_s01_r02","promptIndexes":[0,1],"file":"oral-ata29-standby-hydraulic-flow.webp","alt":"Standby Reservoir、EMDP、Pressure Filter ModuleからStandby Rudder、左右Thrust Reverser、Leading Edge Deviceへの供給経路図。","caption":"Standby Hydraulicの供給経路。Rudder・左右T/R・LE DeviceのExtendに供給し、B ReservoirとはFill and Balance Lineでつながる。","note":"図のAuto条件は略記。ALTERNATE FLAPS ARM OFFを含む全条件とMAN操作の違いは項目2の本文で確認する。"},{"questionId":"oral_rev3_p39_s01_r05","promptIndexes":[0,1],"file":"oral-ata29-ptu-hydraulic-flow.webp","alt":"System AのHydraulic MotorがSystem BのPumpを駆動するPTUの別Fluid回路と流れを示す図。","caption":"PTUのHydraulic経路。Aの圧力でMotorを回し、BのPumpでLE Flap/Slat側に必要な流量を補う。A/BのFluidは混ざらない。"},{"questionId":"oral_rev3_p39_s01_r05","promptIndexes":[0,1],"file":"oral-ata29-ptu-control-conditions.webp","alt":"Air/Ground、TE Flaps、B EDP Low PressureとAlternate Flapsの条件からPTU Control Valveを制御する回路図。","caption":"PTUの電気制御。Air、TE Flap NOT UP、B EDP Low Pressureの条件と、Alternate Flapsによる停止経路を確認する。","note":"図中の2350 psi／0.5秒とRelay保持を、Pumpの流量定格と混同しない。"},{"questionId":"oral_rev3_p39_s01_r06","promptIndexes":[0],"file":"oral-ata29-pressure-indication.webp","alt":"A/B Pressure ModuleのSystem Pressure Transmitterから各側DEUを経てSYS画面へ圧力を表示する経路図。","caption":"Hydraulic Pressure表示の経路。A側はDEU 1、B側はDEU 2へ入力し、SYS画面へ表示する。Pump Low Pressure警告とは別の監視経路。"},{"questionId":"oral_rev3_p37_s01_r01","promptIndexes":[0],"file":"oral-ata27-aileron-control-path.webp","alt":"Captain／F/O Control WheelからBody Cable、PCU、Body／Wing QuadrantとAileronまでの経路図。","caption":"AILの機械的な操縦経路。桃色のAIL側と青色のSpoiler側のつながりを追い、Spring CartridgeとTransfer Mechanismの役割を区別する。"},{"questionId":"oral_rev3_p37_s01_r01","promptIndexes":[0],"file":"oral-ata27-aileron-pcu.webp","alt":"Main Wheel Wellの2個のAileron PCUと、Fixed Piston、Movable Housing、Bypass Valve、2段のControl Valve、Mechanical Stopを示す図。","caption":"AIL PCUの構造。Control Valveが油圧を配分してHousingを動かし、油圧喪失時にはBypassとMechanical Stopを介して操縦する。","note":"図中の「FEEDBACKがいらない」は授業での略記。Housingの動きによって油圧の流れを止める働きを指す。"},{"questionId":"oral_rev3_p37_s01_r01","promptIndexes":[1],"file":"oral-ata27-aileron-transfer-mechanism.webp","alt":"F/O Column底部にあるAileron Transfer MechanismのTorsion Spring、Lost Motion CrankとLug、左右Bus Drumを示す図。","caption":"Transfer Mechanismの構造。Torsion Springによる左右の結合と、Lost Motionを超えてSpoiler側へ伝わる経路を確認する。"},{"questionId":"oral_rev3_p37_s01_r01","promptIndexes":[3],"file":"oral-ata27-aileron-trim-actuator.webp","alt":"2個のAileron Trim SwitchからTrim Actuatorへ電源とGroundを供給し、Feel and Centering UnitのNeutral位置を変える回路図。","caption":"AIL Trimは2個のSwitchを同時に操作し、Feel and Centering UnitのNeutral位置を変えて持続的なWheel Forceを除く。"},{"questionId":"oral_rev3_p37_s01_r01","promptIndexes":[3],"file":"oral-ata27-aileron-balance-panel-tab.webp","alt":"Aileron Balance Panelの上下Chamber、Vent GapとSeal、逆方向に動くBalance Tabの断面図。","caption":"Balance Panelの差圧とBalance Tabの空気力が操舵を助ける。Manual Reversionで特に有効な仕組みを断面で確認する。","note":"図中の「境界層」の説明は授業追記で、印刷本文による裏付けは未確認。本文ではBalance Panel／Tabの差圧・空気力の働きを押さえる。"},{"questionId":"oral_rev3_p37_s01_r02","promptIndexes":[0],"file":"oral-ata27-spoiler-control-path.webp","alt":"Control WheelとSpeedbrake Leverから、Spring Cartridge、Spoiler Mixer／Ratio Changer、Wing Cable、Flight Spoiler Actuatorへ至る機械経路図。","caption":"Spoilerの機械的な作動経路。WheelからのRoll入力とLeverからのSpeedbrake入力を合成し、8枚のFlight Spoilerを操作する。"},{"questionId":"oral_rev3_p37_s01_r02","promptIndexes":[0],"file":"oral-ata27-spoiler-mixer-ratio-changer.webp","alt":"Main Wheel Well前方のSpoiler Mixer／Ratio Changerと、Control Wheel入力、Speedbrake入力、Rig Pin位置の図。","caption":"Mixerは2つの入力を合成し、Ratio ChangerはSpeedbrake使用中のRoll入力とSpoiler変位の関係を調整する。"},{"questionId":"oral_rev3_p37_s01_r02","promptIndexes":[0],"file":"oral-ata27-ground-spoiler-hydraulic.webp","alt":"System AからGround Spoiler Control Valveと右Main Gear連動のInterlock Valveを通り、6個のActuatorへ供給する油圧回路図。","caption":"Ground Spoilerの油圧経路。Lever指令と右MLGのGround確認を別のValveで成立させ、4枚のGround Spoilerを6個のActuatorで動かす。"},{"questionId":"oral_rev3_p37_s01_r02","promptIndexes":[1],"file":"oral-ata27-auto-speedbrake-logic.webp","alt":"Thrust、ARM／RTO、Wheel Speed、Air／Ground、R/A入力からModuleとRelayを介しAuto Speedbrake Actuatorを制御する論理図。","caption":"Auto Speedbrakeの作動条件。ThrustのAND、ARM／RTOのOR、左右のWheel／Ground信号を経てActuatorへ伝える。","note":"図の不等号と本文の「以上／以下」には表記差がある。境界値とGround信号の4秒間は回答本文の説明を参照する。"},{"questionId":"oral_rev3_p37_s01_r02","promptIndexes":[2],"file":"oral-ata27-speedbrakes-extended-light.webp","alt":"PSEUがAir／Ground、Speedbrake Lever、TE Flap／高度、Interlock圧からSPEEDBRAKES EXTENDEDを点灯させる論理図。","caption":"SPEEDBRAKES EXTENDEDの条件。空中ではLeverとFlap／高度、地上ではLever DOWNとGround Spoiler加圧の不一致を監視する。","note":"図の >／< と本文の「以上／以下」は表記差があるため、境界値は本文の記載を優先する。"},{"questionId":"oral_rev3_p05_s01_r02","promptIndexes":[0],"file":"oral-ata31-acms-menu.webp","alt":"MCDU MENUからACMS MAIN MENUへ進み、REPORTS、DATA DISPLAY、STATUS、PRINTを選ぶ画面図。","caption":"ACMSの入口と主要メニュー。Reportを確認する操作と、Landing GなどのData Displayを区別する。"},{"questionId":"oral_rev3_p05_s01_r03","promptIndexes":[0],"file":"oral-ata31-acms-maint-report.webp","alt":"Maintenance ReportのHeader、QAR情報、Limit Exceedance、Engine／Other Replay MemoryとMCDU Reportメニューの図。","caption":"Maintenance Reportの各欄。Limit ExceedanceとReplay Memoryを別々に読み、記録がある場合の処置判断につなげる。"},{"questionId":"oral_rev3_p46_s01_r05","promptIndexes":[2],"file":"oral-ata31-acms-maint-report.webp","alt":"Maintenance ReportのHeader、QAR情報、Limit Exceedance、Engine／Other Replay MemoryとMCDU Reportメニューの図。","caption":"Maintenance Reportの各欄。Limit ExceedanceとReplay Memoryを別々に読み、記録がある場合の処置判断につなげる。"},{"questionId":"oral_rev3_p05_s01_r05","promptIndexes":[2],"file":"oral-ata31-acms-landing-g.webp","alt":"ACMS DATA DISPLAYのVERTICAL ACCELERATIONで、GMX/GMN（最大・最小G）とGFMX/GFMN（In-Airの最大・最小G）を確認する画面図。","caption":"Landing GはVERTICAL ACCELERATIONで確認する。GMX/GMNとGFMX/GFMNの測定対象・期間、最大／最小を区別する。","note":"図の2.1Gの追記を、全着陸に共通する検査不要の基準として扱わない。検査要否は回答本文の適用条件を確認する。"},{"questionId":"oral_rev3_p05_s01_r05","promptIndexes":[0],"file":"oral-ata31-acms-status.webp","alt":"ACMS STATUSからQAR STATUS、DFDAU CURRENT FAULTSとHISTORY FAULTSを選ぶ画面図。","caption":"ACMS活用の一例。飛行データの確認と装置自身のFault確認を区別する。"},{"questionId":"oral_rev3_p05_s01_r04","promptIndexes":[0],"file":"oral-ata31-printer-interface.webp","alt":"ACARS MUとACMS DFDAUからPrinterへ送るデータ、PrinterのPaper DoorとTEST等の表示を示す図。","caption":"Printerとデータの接続。Paper Lowの判断と用紙交換の要領は回答本文で確認する。","note":"図のRESET＋TEST同時押しの追記は、用紙交換後の確認手順として裏付け未確認。収集AMMのSLEWによる確認を優先する。"},{"questionId":"oral_rev3_p46_s01_r04","promptIndexes":[0],"file":"oral-ata31-fdr-system.webp","alt":"FLT REC Panel、DFDAU、FDR、Data Loader Control Panel等で構成するFDR System図。","caption":"FDR Systemの構成と信号の流れ。DFDAUが取得したデータをFDRへ送り記録する。"},{"questionId":"oral_rev3_p46_s01_r04","promptIndexes":[2],"file":"oral-ata31-fdr-power.webp","alt":"Ground Sensing、Engine Running、FLT REC TEST、電源とOFF Lightの関係を示す回路図。","caption":"FDRの作動条件と電源経路を追う。OFF Lightの意味は回答本文で確認する。","note":"図中のENG OPE CK時のCCB操作は授業追記。適用範囲と復旧要領の確認が必要で、この図だけで実施手順を決めない。"},{"questionId":"oral_rev3_p46_s01_r01","promptIndexes":[0],"file":"oral-ata31-cds-system.webp","alt":"Display Select、EFIS、Engine Display Panel、2個のDEU、6個のDUとCoax接続のCDS構成図。","caption":"CDSの全体構成。航空機の情報をDEUで処理し、DUへ表示する。"},{"questionId":"oral_rev3_p46_s01_r01","promptIndexes":[1],"file":"oral-ata31-cds-deu-du.webp","alt":"DEU1／2のGraphics Generator、Coax Coupler1～4、6個のDUとARINC 429 Statusの接続図。","caption":"DEUからDUへの画像信号と、DUからDEUへのStatus信号を区別して追う。"},{"questionId":"oral_rev3_p46_s01_r01","promptIndexes":[4],"file":"oral-ata31-cds-efis-panel.webp","alt":"EFIS Control PanelのMINIMUMS、BARO、FPV、METERS、MODE、RANGEとMAP Switchesの図。","caption":"EFIS Control Panelの操作対象。PFDの設定とNDのMode、Range、重ね合わせ表示を区別する。"},{"questionId":"oral_rev3_p46_s01_r01","promptIndexes":[4],"file":"oral-ata31-cds-source-selection.webp","alt":"Display Source Selectorの位置と、各DUが選ぶDEU Graphics Generatorの対応表。","caption":"Display Sourceの選択と各DUの供給元。表のA／BはDEU内のGraphics Generatorを表す。"},{"questionId":"oral_rev3_p16_s02_r03","promptIndexes":[1],"file":"oral-ata31-cds-pfd.webp","alt":"PFDのFlight Mode、Speed、Attitude、Altitude、Vertical Speed、Heading等の表示位置。","caption":"PFDの一般表示。速度・姿勢・高度・昇降率・方位とFlight Modeを位置と結び付ける。","note":"図の左Speed Tape上の「Attitude」、右Altitude Tape上の「Air Speed」は授業追記の誤ラベル。印刷本文の左Airspeed、中央Attitude、右Altitudeを優先する。"},{"questionId":"oral_rev3_p16_s02_r03","promptIndexes":[1],"file":"oral-ata31-cds-nd.webp","alt":"NDのMap表示と、PLAN、MAP、VOR、APP等のModeの説明を示す図。","caption":"NDの一般表示とMode。Expanded／CenteredとMap情報を区別する。","note":"追記のVertical Simulationは印刷本文のVertical Situation Displayを優先する。"},{"questionId":"oral_rev3_p16_s02_r03","promptIndexes":[0],"file":"oral-ata31-cds-normal-layout.webp","alt":"通常時に左右OutboardへPFD、左右InboardへND、Center DUへEngine表示を出す配置図。","caption":"通常のDU表示配置。PFD、ND、Primary／Secondary Engine Displayの位置を確認する。"},{"questionId":"oral_rev3_p46_s01_r01","promptIndexes":[4],"file":"oral-ata31-cds-auto-switching.webp","alt":"DU故障時にPFDを隣のDUへ、Engine DisplayをLower Centerへ移すAutomatic Switchingの図。","caption":"Automatic Switchingの表示例。操作による選択と故障時の自動切替を区別する。"},{"questionId":"oral_rev3_p16_s02_r01","promptIndexes":[3],"file":"oral-ata31-cds-bite-pages.webp","alt":"CDS DEU MAINT/BITEのCURRENT STATUSとINFLIGHT FAULTSを示す授業追加写真。","caption":"CDS BITEの表示例。現在のFaultと、飛行中に記録されたFaultを区別する。","note":"写真のFault CodeやMessageは撮影時の例。交換後Testの実施手順と判定は該当AMMで確認する。"},{"questionId":"oral_rev3_p16_s02_r01","promptIndexes":[4],"file":"oral-ata31-cds-loop-test.webp","alt":"DU Loop Test画面のDU LOCATION、ARINC 429 LOOP、COAX OUTPUT、INPUT ACTIVITYと明るさ入力、および4系統のCoax経路写真。","caption":"Loop Testの表示内容とINPUT ACTIVITYの4系統。左の表示項目を、右のDEU／Coax Coupler経路と結び付ける。","note":"72、0、100、6等の値は写真の例。共通の合否基準・設定値として暗記しない。"},{"questionId":"oral_rev3_p46_s01_r02","promptIndexes":[1],"file":"oral-ata31-aural-functional.webp","alt":"各Warning入力、Bell／Clacker／Chime／Horn等の音、Moduleの並列Channel A／BとSpeakerの接続図。","caption":"Aural Warningの入力と音の対応。音の優先順位は回答本文の条件で確認する。","note":"図中の手書き「4」をChimeの一律4位としては採用しない。SG本文ではBell・Clacker・Chimeは優先順位を持たず、他のSoundと同時発生できる。"},{"questionId":"oral_rev3_p46_s01_r02","promptIndexes":[2],"file":"oral-ata31-takeoff-warning.webp","alt":"Takeoff Configurationの各不成立条件とGround／Thrust条件、Intermittent Hornへの経路図。","caption":"Takeoff Warningの作動条件。Configurationの各異常はOR、地上・Takeoff Thrustは作動の入口条件として読む。"},{"questionId":"oral_rev3_p40_s01_r05","promptIndexes":[0],"file":"oral-ata31-takeoff-warning.webp","alt":"Takeoff Configurationの各不成立条件とGround／Thrust条件、Intermittent Hornへの経路図。","caption":"Takeoff Warningの作動条件。Configurationの各異常はOR、地上・Takeoff Thrustは作動の入口条件として読む。"},{"questionId":"oral_rev3_p46_s01_r03","promptIndexes":[0],"file":"oral-ata31-master-caution.webp","alt":"各System Annunciator、左右Master CautionとSystem Annunciatorの配置・接続図。","caption":"Master CautionとSystem Annunciatorの対応。ResetとRecallの作用は回答本文で確認する。","note":"追記のRecall例のLightは故障条件によって通常の警告でも点灯する。Recall時だけの表示と決め付けない。"},{"questionId":"oral_rev3_p37_s01_r03","promptIndexes":[0],"file":"oral-ata27-rest-rudder-flow.webp","alt":"RudderのPedal・CableからMain／Standby PCUへ至る機械的な経路。","caption":"RudderのPedal・CableからMain／Standby PCUへ至る機械的な経路。"},{"questionId":"oral_rev3_p37_s01_r03","promptIndexes":[1,2],"file":"oral-ata27-rest-rudder-main-pcu.webp","alt":"Main Rudder PCUの外観と、System A／B、Yaw Damper、Load Limiterの配置。","caption":"Main Rudder PCUの外観と、System A／B、Yaw Damper、Load Limiterの配置。"},{"questionId":"oral_rev3_p37_s01_r03","promptIndexes":[3],"file":"oral-ata27-rest-rudder-main-hydraulic.webp","alt":"Main PCUの油圧回路。Control／Bypass ValveとLoad Limiterを区別する。","caption":"Main PCUの油圧回路。Control／Bypass ValveとLoad Limiterを区別する。"},{"questionId":"oral_rev3_p37_s01_r04","promptIndexes":[0],"file":"oral-ata27-rest-elevator-flow.webp","alt":"Column・Cable・PCUからOutput Torque Tubeへ至るElevatorの経路。","caption":"Column・Cable・PCUからOutput Torque Tubeへ至るElevatorの経路。"},{"questionId":"oral_rev3_p37_s01_r04","promptIndexes":[1],"file":"oral-ata27-rest-elevator-input.webp","alt":"Input Torque Tube周辺。Pilot、A/P、Stabilizer Neutral Shift、Mach Trimの入力を追う。","caption":"Input Torque Tube周辺。Pilot、A/P、Stabilizer Neutral Shift、Mach Trimの入力を追う。"},{"questionId":"oral_rev3_p37_s01_r04","promptIndexes":[2],"file":"oral-ata27-rest-elevator-feel.webp","alt":"Pitot／StaticとStabilizer位置からFeel圧を作る回路。FEEL DIFF PRESSの差圧・遅延も確認する。","caption":"Pitot／StaticとStabilizer位置からFeel圧を作る回路。FEEL DIFF PRESSの差圧・遅延も確認する。"},{"questionId":"oral_rev3_p37_s01_r04","promptIndexes":[3],"file":"oral-ata27-rest-elevator-tab.webp","alt":"Elevator TabのBalance／Anti-Balance切替と機械的な動き。","caption":"Elevator TabのBalance／Anti-Balance切替と機械的な動き。"},{"questionId":"oral_rev3_p37_s01_r04","promptIndexes":[3],"file":"oral-ata27-rest-elevator-tab-delay.webp","alt":"左Tabと右Tabの切替回路。右側は10秒のTime Delayを持つ。","caption":"左Tabと右Tabの切替回路。右側は10秒のTime Delayを持つ。"},{"questionId":"oral_rev3_p37_s01_r05","promptIndexes":[0],"file":"oral-ata27-rest-stabilizer-flow.webp","alt":"Manual、Main Electric、A/PのStabilizer Trim経路と、Cutout／Limitの位置。","caption":"Manual、Main Electric、A/PのStabilizer Trim経路と、Cutout／Limitの位置。"},{"questionId":"oral_rev3_p37_s01_r05","promptIndexes":[0],"file":"oral-ata27-rest-stabilizer-jackscrew.webp","alt":"StabilizerのJackscrew、Ball Nut、Gearboxと手動Cable Drum。","caption":"StabilizerのJackscrew、Ball Nut、Gearboxと手動Cable Drum。"},{"questionId":"oral_rev3_p37_s01_r05","promptIndexes":[1],"file":"oral-ata27-rest-stabilizer-switches.webp","alt":"Electric TrimのSwitch回路とRateの対応。Main ElectricとA/Pの速度選択を区別する。","caption":"Electric TrimのSwitch回路とRateの対応。Main ElectricとA/Pの速度選択を区別する。"},{"questionId":"oral_rev3_p37_s01_r07","promptIndexes":[0],"file":"oral-ata27-rest-te-follow-up.webp","alt":"TE FlapのPilot InputとFollow-Up。PDUの動きがControl ValveをNullへ戻す。","caption":"TE FlapのPilot InputとFollow-Up。PDUの動きがControl ValveをNullへ戻す。"},{"questionId":"oral_rev3_p37_s01_r07","promptIndexes":[1],"file":"oral-ata27-rest-te-priority-flow.webp","alt":"Priority ValveとFlow Limiterの位置。System BでLEへの供給を優先する。","caption":"Priority ValveとFlow Limiterの位置。System BでLEへの供給を優先する。"},{"questionId":"oral_rev3_p37_s01_r07","promptIndexes":[2],"file":"oral-ata27-rest-te-protection-types.webp","alt":"Asymmetry、UCM、Skew、Load Reliefの違いを示す授業の模式図。","caption":"Asymmetry、UCM、Skew、Load Reliefの違いを示す授業の模式図。"},{"questionId":"oral_rev3_p37_s01_r07","promptIndexes":[3],"file":"oral-ata27-rest-te-indication.webp","alt":"TE Position IndicationとFSEUの関係。指示位置と故障時のPointer Biasを区別する。","caption":"TE Position IndicationとFSEUの関係。指示位置と故障時のPointer Biasを区別する。"},{"questionId":"oral_rev3_p37_s01_r07","promptIndexes":[2],"file":"oral-ata27-rest-te-skew.webp","alt":"8個のSkew SensorとFSEU。左右の組合せ、Bypass、表示Bias、警報の関係。","caption":"8個のSkew SensorとFSEU。左右の組合せ、Bypass、表示Bias、警報の関係。","note":"ResetのGround条件には本文・図・参考表に表記差がある。本文の13°以下という閾値とLatch図を区別して読む。"},{"questionId":"oral_rev3_p37_s01_r06","promptIndexes":[0],"file":"oral-ata27-rest-le-flow.webp","alt":"Normal／AlternateのLE経路とTE Follow-Up、FSEU、Autoslatの関係。","caption":"Normal／AlternateのLE経路とTE Follow-Up、FSEU、Autoslatの関係。"},{"questionId":"oral_rev3_p37_s01_r06","promptIndexes":[1,2],"file":"oral-ata27-rest-le-cruise.webp","alt":"LE Cruise Depressurizationの作動・Inhibit条件。","caption":"LE Cruise Depressurizationの作動・Inhibit条件。"},{"questionId":"oral_rev3_p37_s01_r06","promptIndexes":[1,2],"file":"oral-ata27-rest-le-ucm.webp","alt":"LE UCMの検知、Shutoff Valve、Inhibit／Reset条件。","caption":"LE UCMの検知、Shutoff Valve、Inhibit／Reset条件。"},{"questionId":"oral_rev3_p37_s01_r06","promptIndexes":[3],"file":"oral-ata27-rest-le-actuator-positions.webp","alt":"Slat ActuatorのRetract、Extend、Full Extend。Inner／Outer Pistonの動きを区別する。","caption":"Slat ActuatorのRetract、Extend、Full Extend。Inner／Outer Pistonの動きを区別する。"},{"questionId":"oral_rev3_p37_s01_r06","promptIndexes":[0],"file":"oral-ata27-rest-le-hydraulic-autoslat.webp","alt":"LEとAutoslatをまとめた授業の油圧模式図。Standby供給はFull Extend側に入る。","caption":"LEとAutoslatをまとめた授業の油圧模式図。Standby供給はFull Extend側に入る。"},{"questionId":"oral_rev3_p37_s01_r06","promptIndexes":[4],"file":"oral-ata27-rest-le-panel.webp","alt":"P5 LE DEVICES Panelの各Flap／Slat TRANSIT、EXT、FULL EXT表示。","caption":"P5 LE DEVICES Panelの各Flap／Slat TRANSIT、EXT、FULL EXT表示。"},{"questionId":"oral_rev3_p37_s01_r08","promptIndexes":[0],"file":"oral-ata27-rest-stall-overview.webp","alt":"Stall Warningの入力・SMYD・Column Shaker・EFSMの構成。","caption":"Stall Warningの入力・SMYD・Column Shaker・EFSMの構成。"},{"questionId":"oral_rev3_p37_s01_r08","promptIndexes":[1],"file":"oral-ata27-rest-smyd-functions.webp","alt":"SMYDのStall Warning、Autoslat、CDS Performance、Yaw Damper、WTRISの役割。","caption":"SMYDのStall Warning、Autoslat、CDS Performance、Yaw Damper、WTRISの役割。"},{"questionId":"oral_rev3_p37_s01_r08","promptIndexes":[2],"file":"oral-ata27-rest-efsm.webp","alt":"EFSMのSolenoidとPressure Reducer。System Aの増圧FeelをDual Feel Actuatorへ送る。","caption":"EFSMのSolenoidとPressure Reducer。System Aの増圧FeelをDual Feel Actuatorへ送る。"},{"questionId":"oral_rev3_p37_s01_r08","promptIndexes":[0],"file":"oral-ata27-rest-stall-logic.webp","alt":"AOA側とCAS／Speed Floor側のStall Warning判定、およびAir Mode条件。","caption":"AOA側とCAS／Speed Floor側のStall Warning判定、およびAir Mode条件。"},{"questionId":"oral_rev3_p37_s01_r08","promptIndexes":[3],"file":"oral-ata27-rest-wtris-flow.webp","alt":"SMYD 2からStandby Rudder PCUへのWTRIS／Standby Yaw Dampingの経路。","caption":"SMYD 2からStandby Rudder PCUへのWTRIS／Standby Yaw Dampingの経路。"},{"questionId":"oral_rev3_p37_s01_r04","promptIndexes":[1],"file":"oral-ata27-rest-mach-trim-example.webp","alt":"授業のMach Trim挿入図。A/P OFF／ONの例とNeutral Shift Sensor・Surface Position Sensor差の補正。","caption":"授業図に示されたA/P OFF／ONの比較例。A/P ActuatorによるSensor差の補正を読む。","note":"「Input Torque Tubeが回らない」は図示された状態の説明。A/P作動中は常に動かないという意味にはしない。"},{"questionId":"oral_rev3_p51_s01_r01","promptIndexes":[0,1],"file":"oral-ata24-oct14-overview.webp","alt":"発電・変換・制御の全体構成。IDG／APU／ExternalからAC、TRUとBatteryからDCへ。","caption":"発電・変換・制御の全体構成。IDG／APU／ExternalからAC、TRUとBatteryからDCへ。"},{"questionId":"oral_rev3_p51_s01_r01","promptIndexes":[2],"file":"oral-ata24-oct14-distribution.webp","alt":"AC／DCのBUS構成と、TRU・Battery・Standbyの接続。INT仕様のAux Battery系は破線内。","caption":"AC／DCのBUS構成と、TRU・Battery・Standbyの接続。INT仕様のAux Battery系は破線内。"},{"questionId":"oral_rev3_p51_s01_r06","promptIndexes":[3],"file":"oral-ata24-oct14-external-panel.webp","alt":"現行取得AMM Figure202 Sheet1のP19灯火・Receptacle。図の適用はJAL301,302,304–309,311–319,340–999。PARK BRAKE SET灯も示され、旧SG配置図と混同しない。","caption":"現行取得AMM Figure202 Sheet1のP19灯火・Receptacle。図の適用はJAL301,302,304–309,311–319,340–999。PARK BRAKE SET灯も示され、旧SG配置図と混同しない。"},{"questionId":"oral_rev3_p51_s01_r06","promptIndexes":[2],"file":"oral-ata24-oct14-external-control.webp","alt":"E/F Interlock、Quality監視、EPC投入とP5／P19表示の回路。","caption":"E/F Interlock、Quality監視、EPC投入とP5／P19表示の回路。"},{"questionId":"oral_rev3_p51_s01_r06","promptIndexes":[4],"file":"oral-ata24-oct14-external-control.webp","alt":"E/F Interlock、Quality監視、EPC投入とP5／P19表示の回路。","caption":"E/F Interlock、Quality監視、EPC投入とP5／P19表示の回路。"},{"questionId":"oral_rev3_p51_s01_r03","promptIndexes":[2],"file":"oral-ata24-oct14-bpcu.webp","alt":"BPCUの入力・出力と、External Power／Ground Service／Load Shedの機能。","caption":"BPCUの入力・出力と、External Power／Ground Service／Load Shedの機能。"},{"questionId":"oral_rev3_p51_s01_r02","promptIndexes":[0,1],"file":"oral-ata24-oct14-idg-overview.webp","alt":"IDG、GCU、GCBと外部Coolingの構成。追記の9qt（IDG約7qt＋外部約2qt）は概数で、補給量はAMMとSight Glassの基準による。","caption":"IDG、GCU、GCBと外部Coolingの構成。追記の9qt（IDG約7qt＋外部約2qt）は概数で、補給量はAMMとSight Glassの基準による。"},{"questionId":"oral_rev3_p51_s01_r02","promptIndexes":[4],"file":"oral-ata24-oct14-idg-components.webp","alt":"IDGのReset Ring、DPI、Filter、Vent、Fill／Drainの位置。DPI処置は本回答の現行AMM条件を参照する。","caption":"IDGのReset Ring、DPI、Filter、Vent、Fill／Drainの位置。DPI処置は本回答の現行AMM条件を参照する。"},{"questionId":"oral_rev3_p25_s01_r05","promptIndexes":[0],"file":"oral-ata24-oct14-idg-components.webp","alt":"IDGのReset Ring、DPI、Filter、Vent、Fill／Drainの位置。DPI処置は本回答の現行AMM条件を参照する。","caption":"IDGのReset Ring、DPI、Filter、Vent、Fill／Drainの位置。DPI処置は本回答の現行AMM条件を参照する。"},{"questionId":"oral_rev3_p51_s01_r02","promptIndexes":[3],"file":"oral-ata24-oct14-idg-oil-flow.webp","alt":"IDGのCharge／Scavenge系と、外部Cooling回路・Bypass・Case Relief。","caption":"IDGのCharge／Scavenge系と、外部Cooling回路・Bypass・Case Relief。"},{"questionId":"oral_rev3_p25_s01_r03","promptIndexes":[1],"file":"oral-ata24-oct14-idg-oil-flow.webp","alt":"IDGのCharge／Scavenge系と、外部Cooling回路・Bypass・Case Relief。","caption":"IDGのCharge／Scavenge系と、外部Cooling回路・Bypass・Case Relief。"},{"questionId":"oral_rev3_p25_s01_r06","promptIndexes":[0],"file":"oral-ata24-oct14-idg-oil-flow.webp","alt":"IDGのCharge／Scavenge系と、外部Cooling回路・Bypass・Case Relief。","caption":"IDGのCharge／Scavenge系と、外部Cooling回路・Bypass・Case Relief。"},{"questionId":"oral_rev3_p51_s01_r02","promptIndexes":[2],"file":"oral-ata24-oct14-brushless-generator.webp","alt":"PMG・Exciter・Main Generatorの発電構成。図のGCU／GCRは略記で、AC→DC変換はGCU内部のVoltage Regulator、GCRは励磁DCの開閉を担う。","caption":"PMG・Exciter・Main Generatorの発電構成。図のGCU／GCRは略記で、AC→DC変換はGCU内部のVoltage Regulator、GCRは励磁DCの開閉を担う。"},{"questionId":"oral_rev3_p25_s01_r01","promptIndexes":[0],"file":"oral-ata24-oct14-idg-servicing.webp","alt":"Sight Glass、PUSH-TO-VENT、Pressure Fill PortとServicing Placard。温度・判定・補給条件は本回答のAMMを優先する。","caption":"Sight Glass、PUSH-TO-VENT、Pressure Fill PortとServicing Placard。温度・判定・補給条件は本回答のAMMを優先する。"},{"questionId":"oral_rev3_p25_s01_r02","promptIndexes":[2],"file":"oral-ata24-oct14-idg-servicing.webp","alt":"Sight Glass、PUSH-TO-VENT、Pressure Fill PortとServicing Placard。温度・判定・補給条件は本回答のAMMを優先する。","caption":"Sight Glass、PUSH-TO-VENT、Pressure Fill PortとServicing Placard。温度・判定・補給条件は本回答のAMMを優先する。"},{"questionId":"oral_rev3_p25_s01_r03","promptIndexes":[2],"file":"oral-ata24-oct14-idg-servicing.webp","alt":"Sight Glass、PUSH-TO-VENT、Pressure Fill PortとServicing Placard。温度・判定・補給条件は本回答のAMMを優先する。","caption":"Sight Glass、PUSH-TO-VENT、Pressure Fill PortとServicing Placard。温度・判定・補給条件は本回答のAMMを優先する。"},{"questionId":"oral_rev3_p51_s01_r03","promptIndexes":[2],"file":"oral-ata24-oct14-gcu.webp","alt":"GCUの発電制御、GCB／BTB制御、保護・表示とBITEの対応。","caption":"GCUの発電制御、GCB／BTB制御、保護・表示とBITEの対応。"},{"questionId":"oral_rev3_p51_s01_r03","promptIndexes":[3,4],"file":"oral-ata24-oct14-gcb-control.webp","alt":"GCBのManual／Automatic CloseとOpen条件。Automatic CloseはAir/Ground移行時の限定条件。","caption":"GCBのManual／Automatic CloseとOpen条件。Automatic CloseはAir/Ground移行時の限定条件。"},{"questionId":"oral_rev3_p51_s01_r03","promptIndexes":[3,4],"file":"oral-ata24-oct14-apb-control.webp","alt":"AGCUのAPB制御と、BPCUによるGCB／BTB／EPCの非並列制御。","caption":"AGCUのAPB制御と、BPCUによるGCB／BTB／EPCの非並列制御。"},{"questionId":"oral_rev3_p51_s01_r03","promptIndexes":[3,4],"file":"oral-ata24-oct14-breaker-summary.webp","alt":"授業で追加されたGCB／APBとGCRの役割整理。詳細なClose／Trip条件はSG本文の個別回路を優先する。","caption":"授業で追加されたGCB／APBとGCRの役割整理。詳細なClose／Trip条件はSG本文の個別回路を優先する。"},{"questionId":"oral_rev3_p51_s01_r03","promptIndexes":[5],"file":"oral-ata24-oct14-load-shed.webp","alt":"Configuration／Command／OvercurrentのLoad ShedとSource別の順序。矢印1は過電流が継続した場合の追加切離し。","caption":"Configuration／Command／OvercurrentのLoad ShedとSource別の順序。矢印1は過電流が継続した場合の追加切離し。"},{"questionId":"oral_rev3_p51_s01_r04","promptIndexes":[2],"file":"oral-ata24-oct14-dc-distribution.webp","alt":"TRU1／2／3の供給先と、DC Bus Tie・Battery・Standby系の接続。","caption":"TRU1／2／3の供給先と、DC Bus Tie・Battery・Standby系の接続。"},{"questionId":"oral_rev3_p51_s01_r04","promptIndexes":[3],"file":"oral-ata24-oct14-dc-tie.webp","alt":"R9によるDC Bus1／2の並列接続。Close／Isolationの条件は本文を参照する。","caption":"R9によるDC Bus1／2の並列接続。Close／Isolationの条件は本文を参照する。"},{"questionId":"oral_rev3_p51_s01_r04","promptIndexes":[4],"file":"oral-ata24-oct14-battery-charger.webp","alt":"Main／Aux Battery Chargerの位置・表示とP5 Meter。充電Modeの定格と抑制条件は本文で説明する。","caption":"Main／Aux Battery Chargerの位置・表示とP5 Meter。充電Modeの定格と抑制条件は本文で説明する。"},{"questionId":"oral_rev3_p51_s01_r04","promptIndexes":[4],"file":"oral-ata24-oct14-charger-control.webp","alt":"Battery ChargerのCharge／TR Mode、APU Start・Refuel・SPCUによる充電抑制回路。","caption":"Battery ChargerのCharge／TR Mode、APU Start・Refuel・SPCUによる充電抑制回路。"},{"questionId":"oral_rev3_p51_s01_r05","promptIndexes":[2],"file":"oral-ata24-oct14-dual-battery-rccb.webp","alt":"INT仕様のDual Battery RCCBはJ9内、通常Open。CloseはBAT ON＋Transfer1／DC1両方無電源、TRU3 Fail、またはSTBY BAT。図のMain使用という略記はこの条件で読む。","caption":"INT仕様のDual Battery RCCBはJ9内、通常Open。CloseはBAT ON＋Transfer1／DC1両方無電源、TRU3 Fail、またはSTBY BAT。図のMain使用という略記はこの条件で読む。"},{"questionId":"oral_rev3_p07_s02_r03","promptIndexes":[0],"file":"oral-ata24-oct14-dual-battery-rccb.webp","alt":"INT仕様のDual Battery RCCBはJ9内、通常Open。CloseはBAT ON＋Transfer1／DC1両方無電源、TRU3 Fail、またはSTBY BAT。図のMain使用という略記はこの条件で読む。","caption":"INT仕様のDual Battery RCCBはJ9内、通常Open。CloseはBAT ON＋Transfer1／DC1両方無電源、TRU3 Fail、またはSTBY BAT。図のMain使用という略記はこの条件で読む。"},{"questionId":"oral_rev3_p51_s01_r05","promptIndexes":[2],"file":"oral-ata24-oct14-inverter-rccb.webp","alt":"Static Inverter RCCBのJ9配置、SPCUとINVERTER REMOTEによる遠隔制御・Trip表示。","caption":"Static Inverter RCCBのJ9配置、SPCUとINVERTER REMOTEによる遠隔制御・Trip表示。"},{"questionId":"oral_rev3_p07_s02_r03","promptIndexes":[0],"file":"oral-ata24-oct14-inverter-rccb.webp","alt":"Static Inverter RCCBのJ9配置、SPCUとINVERTER REMOTEによる遠隔制御・Trip表示。","caption":"Static Inverter RCCBのJ9配置、SPCUとINVERTER REMOTEによる遠隔制御・Trip表示。"},{"questionId":"oral_rev3_p51_s01_r05","promptIndexes":[1],"file":"oral-ata24-oct14-standby-overview.webp","alt":"SPCUのNormal／Alternate Relay、Battery系BUSとAC／DC Standby BUSの構成。","caption":"SPCUのNormal／Alternate Relay、Battery系BUSとAC／DC Standby BUSの構成。"},{"questionId":"oral_rev3_p51_s01_r05","promptIndexes":[3,4],"file":"oral-ata24-oct14-standby-control.webp","alt":"BAT／OFF／AUTOとNormal／Alternate電源の切替回路。","caption":"BAT／OFF／AUTOとNormal／Alternate電源の切替回路。"},{"questionId":"oral_rev3_p07_s02_r01","promptIndexes":[3,4],"file":"oral-ata24-oct14-standby-control.webp","alt":"BAT／OFF／AUTOとNormal／Alternate電源の切替回路。","caption":"BAT／OFF／AUTOとNormal／Alternate電源の切替回路。"},{"questionId":"oral_rev3_p07_s02_r02","promptIndexes":[0],"file":"oral-ata24-oct14-static-inverter.webp","alt":"Static Inverterの配置と、P5のINV選択・ELEC表示。","caption":"Static Inverterの配置と、P5のINV選択・ELEC表示。"},{"questionId":"oral_rev3_p51_s01_r04","promptIndexes":[5],"file":"oral-ata24-oct14-battery-buses.webp","alt":"Battery SW、Hot／Switched Hot／Battery BusとSPCUの供給・切替回路。","caption":"Battery SW、Hot／Switched Hot／Battery BusとSPCUの供給・切替回路。"},{"questionId":"oral_rev3_p51_s01_r04","promptIndexes":[4],"file":"oral-ata24-oct14-charging-curve.webp","alt":"50Aの定電流Chargeから27.5Vの定電圧TRへ移る授業図。横軸の時間は図の例で、実際は温度に応じた充電制御。","caption":"50Aの定電流Chargeから27.5Vの定電圧TRへ移る授業図。横軸の時間は図の例で、実際は温度に応じた充電制御。"},{"questionId":"oral_rev3_p51_s01_r06","promptIndexes":[3],"file":"oral-ata24-oct14-external-panel-alt.webp","alt":"現行取得AMM Figure202 Sheet2のP19灯火・Receptacle。図の適用はJAL320–323,326–339。PARK BRAKE SET灯の位置と、Sheet1との差を機番で確認する。","caption":"現行取得AMM Figure202 Sheet2のP19灯火・Receptacle。図の適用はJAL320–323,326–339。PARK BRAKE SET灯の位置と、Sheet1との差を機番で確認する。"},{"questionId":"oral_rev3_p53_s01_r02","promptIndexes":[0],"file":"oral-ata33-oct14-cockpit-overview.webp","alt":"Flight CompartmentのInstrument／Miscellaneous／Crew Lightと操作部の配置。","caption":"Flight CompartmentのInstrument／Miscellaneous／Crew Lightと操作部の配置。"},{"questionId":"oral_rev3_p53_s01_r02","promptIndexes":[1],"file":"oral-ata33-oct14-instrument-standby.webp","alt":"通常系統とStandby系統の色分け。Normalは輝度調整、Standbyは固定輝度で、P41のRelayとP42のTransformerをたどる。","caption":"通常系統とStandby系統の色分け。Normalは輝度調整、Standbyは固定輝度で、P41のRelayとP42のTransformerをたどる。"},{"questionId":"oral_rev3_p53_s01_r02","promptIndexes":[1],"file":"oral-ata33-oct14-p8-standby.webp","alt":"P8のStandby照明。Transfer Bus2喪失でR425が切り替わり、Standby BusからT362を介して図示の選択機器を照明する。","caption":"P8のStandby照明。Transfer Bus2喪失でR425が切り替わり、Standby BusからT362を介して図示の選択機器を照明する。"},{"questionId":"oral_rev3_p53_s01_r02","promptIndexes":[0],"file":"oral-ata33-oct14-dome.webp","alt":"Domeの通常LampとEmergency Lampの配置・別電源。Battery Bus照明とEmergency Light Systemを区別する。","caption":"Domeの通常LampとEmergency Lampの配置・別電源。Battery Bus照明とEmergency Light Systemを区別する。"},{"questionId":"oral_rev3_p53_s01_r02","promptIndexes":[1],"file":"oral-ata33-oct14-flood.webp","alt":"Flood LightのNormal／Standby回路。Standby時はMain Panel Floodを固定輝度で点灯し、その他のFloodとの違いを確認する。","caption":"Flood LightのNormal／Standby回路。Standby時はMain Panel Floodを固定輝度で点灯し、その他のFloodとの違いを確認する。"},{"questionId":"oral_rev3_p06_s01_r01","promptIndexes":[0],"file":"oral-ata33-oct14-mdt-panel.webp","alt":"P1-3のTEST／BRT／DIM。TEST対象と未点灯例外は本回答の機体装備・AMM条件による。","caption":"P1-3のTEST／BRT／DIM。TEST対象と未点灯例外は本回答の機体装備・AMM条件による。"},{"questionId":"oral_rev3_p06_s01_r02","promptIndexes":[0],"file":"oral-ata33-oct14-mdt-panel.webp","alt":"P1-3のTEST／BRT／DIM。TEST対象と未点灯例外は本回答の機体装備・AMM条件による。","caption":"P1-3のTEST／BRT／DIM。TEST対象と未点灯例外は本回答の機体装備・AMM条件による。"},{"questionId":"oral_rev3_p53_s01_r01","promptIndexes":[0],"file":"oral-ata33-oct14-mdt-panel.webp","alt":"P1-3のTEST／BRT／DIM。TEST対象と未点灯例外は本回答の機体装備・AMM条件による。","caption":"P1-3のTEST／BRT／DIM。TEST対象と未点灯例外は本回答の機体装備・AMM条件による。"},{"questionId":"oral_rev3_p06_s01_r04","promptIndexes":[0],"file":"oral-ata33-oct14-mdt-circuit.webp","alt":"MD&TのR33／R34とZener Diode。上段はGround Seeking、下段はPower SeekingでSystemからPowerを与えて点灯する。","caption":"MD&TのR33／R34とZener Diode。上段はGround Seeking、下段はPower SeekingでSystemからPowerを与えて点灯する。"},{"questionId":"oral_rev3_p53_s01_r01","promptIndexes":[1],"file":"oral-ata33-oct14-mdt-circuit.webp","alt":"MD&TのR33／R34とZener Diode。上段はGround Seeking、下段はPower SeekingでSystemからPowerを与えて点灯する。","caption":"MD&TのR33／R34とZener Diode。上段はGround Seeking、下段はPower SeekingでSystemからPowerを与えて点灯する。"},{"questionId":"oral_rev3_p53_s01_r03","promptIndexes":[0],"file":"oral-ata33-oct14-cargo-layout.webp","alt":"Cargo Ceiling LightのLamp、Switch、LensとMicroswitch。Lensを外すとそのLampへの回路を切る。","caption":"Cargo Ceiling LightのLamp、Switch、LensとMicroswitch。Lensを外すとそのLampへの回路を切る。"},{"questionId":"oral_rev3_p53_s01_r03","promptIndexes":[0],"file":"oral-ata33-oct14-cargo-control.webp","alt":"Cargo Switch・PSEU・R623による制御と並列Lamp回路。Door信号に関する本文の例外条件も合わせて確認する。","caption":"Cargo Switch・PSEU・R623による制御と並列Lamp回路。Door信号に関する本文の例外条件も合わせて確認する。"},{"questionId":"oral_rev3_p53_s01_r04","promptIndexes":[0],"file":"oral-ata33-oct14-wheel-layout.webp","alt":"Nose1灯・Main4灯の配置。操作Switchと供給経路はWheel Well回路図で確認する。","caption":"Nose1灯・Main4灯の配置。操作Switchと供給経路はWheel Well回路図で確認する。"},{"questionId":"oral_rev3_p53_s01_r04","promptIndexes":[0],"file":"oral-ata33-oct14-wheel-control.webp","alt":"P5で全灯、機外Switchで関連Wheel Wellだけを点灯する回路。電源は28V AC Ground Service Bus。","caption":"P5で全灯、機外Switchで関連Wheel Wellだけを点灯する回路。電源は28V AC Ground Service Bus。"},{"questionId":"oral_rev3_p06_s02_r01","promptIndexes":[0],"file":"oral-ata33-oct14-emergency-overview.webp","alt":"緊急時のExit／避難経路照明。Exit Sign、Aisle、Floor Proximity、Slide LightとPower Supplyの関係。","caption":"緊急時のExit／避難経路照明。Exit Sign、Aisle、Floor Proximity、Slide LightとPower Supplyの関係。"},{"questionId":"oral_rev3_p06_s02_r01","promptIndexes":[1],"file":"oral-ata33-oct14-emergency-system.webp","alt":"P5／P14 Switch、分散Power Supplyと各Emergency Lightの構成。自動点灯はP5 ARMEDかつDC Bus1の電圧12V以下という本文の条件による。","caption":"P5／P14 Switch、分散Power Supplyと各Emergency Lightの構成。自動点灯はP5 ARMEDかつDC Bus1の電圧12V以下という本文の条件による。"},{"questionId":"oral_rev3_p53_s01_r05","promptIndexes":[0],"file":"oral-ata33-oct14-emergency-system.webp","alt":"P5／P14 Switch、分散Power Supplyと各Emergency Lightの構成。自動点灯はP5 ARMEDかつDC Bus1の電圧12V以下という本文の条件による。","caption":"P5／P14 Switch、分散Power Supplyと各Emergency Lightの構成。自動点灯はP5 ARMEDかつDC Bus1の電圧12V以下という本文の条件による。"},{"questionId":"oral_rev3_p06_s02_r03","promptIndexes":[0],"file":"oral-ata33-oct14-emergency-supply.webp","alt":"授業図のPower Supply10台の配置例（FWD天井2・AFT天井2・客室側6）。Battery PackとTEST Switchを示す。機番別LocationはACCD／適用技術資料との照合が必要。","caption":"授業図のPower Supply10台の配置例（FWD天井2・AFT天井2・客室側6）。Battery PackとTEST Switchを示す。機番別LocationはACCD／適用技術資料との照合が必要。"},{"questionId":"oral_rev3_p53_s01_r05","promptIndexes":[1],"file":"oral-ata33-oct14-emergency-supply.webp","alt":"授業図のPower Supply10台の配置例（FWD天井2・AFT天井2・客室側6）。Battery PackとTEST Switchを示す。機番別LocationはACCD／適用技術資料との照合が必要。","caption":"授業図のPower Supply10台の配置例（FWD天井2・AFT天井2・客室側6）。Battery PackとTEST Switchを示す。機番別LocationはACCD／適用技術資料との照合が必要。"},{"questionId":"oral_rev3_p53_s01_r05","promptIndexes":[3],"file":"oral-ata33-oct14-emergency-power.webp","alt":"DC Bus1からPower Supply／Battery Packへの充電・制御系統。実充電はP5 OFFまたはARM、DC Bus1給電、Attendant NORMALの3条件すべてが必要。","caption":"DC Bus1からPower Supply／Battery Packへの充電・制御系統。実充電はP5 OFFまたはARM、DC Bus1給電、Attendant NORMALの3条件すべてが必要。"},{"questionId":"oral_rev3_p06_s02_r02","promptIndexes":[1],"file":"oral-ata33-oct14-emergency-switches.webp","alt":"P5とP14のEmergency Light操作部・NOT ARMED表示。自動点灯の条件は本文のDC Bus1電圧12V以下を優先する。","caption":"P5とP14のEmergency Light操作部・NOT ARMED表示。自動点灯の条件は本文のDC Bus1電圧12V以下を優先する。"},{"questionId":"oral_rev3_p53_s01_r05","promptIndexes":[2],"file":"oral-ata33-oct14-emergency-switches.webp","alt":"P5とP14のEmergency Light操作部・NOT ARMED表示。自動点灯の条件は本文のDC Bus1電圧12V以下を優先する。","caption":"P5とP14のEmergency Light操作部・NOT ARMED表示。自動点灯の条件は本文のDC Bus1電圧12V以下を優先する。"}]}};
(() => {
  'use strict';
  const root = document.getElementById('oralStudy');
  if (!root) return;
  const ids = ['CatalogCount', 'Group', 'Search', 'Section', 'FilterCount', 'Status', 'Loading', 'StatusText', 'Retry', 'Workspace', 'ParentTitle', 'ParentMeta', 'Items', 'ItemPosition', 'ItemLevels', 'Subheading', 'QuestionHeading', 'Prompts', 'Reveal', 'Answer', 'AnswerStatus', 'AnswerPoints', 'AnswerGaps', 'GapList', 'ScopeNotes', 'ScopeNoteList', 'Previous', 'Next', 'NavigationPosition'];
  const ui = Object.fromEntries(ids.map(id => [id, document.getElementById('oral' + id)]));
  const coverageLabels = { supported: '根拠確認済み', partial: '一部の根拠が不足', insufficient: '根拠不足・要確認' };
  // Field labels are part of the REV-3 navigation, not copied learning content.
  // Keeping this tiny list local permits genuinely request-free startup.
  const groups = ['点検要領Ⅰ', '点検要領Ⅱ', '交換・調整', 'Servicing', 'Open / Close・Override・Deactivate', 'SYSTEM：機体', 'SYSTEM：通信・航法・計器', 'SYSTEM：装備', 'SYSTEM：発動機'];
  const state = { sections: [], groupRequest: 0, selectedId: '', revision: '', cache: new Map(), groups: new Map(), pending: new Map(), groupPositions: new Map(), positions: new Map(), retry: null };
  const figureConfig = window.STUDY_CONFIG && window.STUDY_CONFIG.oralFigures;
  const figures = figureConfig && figureConfig.schemaVersion === 1 && Array.isArray(figureConfig.figures) ? figureConfig.figures.filter(validFigure) : [];

  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value == null ? '' : String(value);
    return node;
  }
  function strings(value) { return Array.isArray(value) ? value.filter(v => typeof v === 'string' && v.trim()) : []; }
  function validFigure(figure) {
    return !!figure && typeof figure.questionId === 'string' && /^oral_rev3_p\d{2}_s\d{2}_r\d{2}$/.test(figure.questionId) &&
      typeof figure.file === 'string' && /^[a-z0-9][a-z0-9_-]*\.webp$/.test(figure.file) &&
      Array.isArray(figure.promptIndexes) && figure.promptIndexes.length > 0 &&
      figure.promptIndexes.every(index => Number.isInteger(index) && index >= 0) && new Set(figure.promptIndexes).size === figure.promptIndexes.length &&
      ['alt', 'caption'].every(key => typeof figure[key] === 'string' && figure[key].trim() && figure[key].length <= 1200) &&
      (figure.note === undefined || typeof figure.note === 'string' && figure.note.trim() && figure.note.length <= 1200);
  }
  function figuresForItem(item, prompt) {
    return figures.filter(figure => {
      const visibleIndexes = presentedPrompts(item.prompts, figure.promptIndexes).flatMap(owner => owner.indexes);
      return figure.questionId === item.itemId && visibleIndexes.length > 0 && visibleIndexes.every(index => prompt.indexes.includes(index)) &&
      prompt.points.some(entry => {
        if (!['supported', 'partial'].includes(entry.point.coverage) || strings(entry.point.summary).length === 0 ||
            !Array.isArray(entry.point.sources) || !entry.point.sources.some(source => source && typeof source.type === 'string' && source.type.trim())) return false;
        const indexes = Array.isArray(entry.point.promptIndexes) ? entry.point.promptIndexes : [];
        // Exact reviewed bindings only. A broader or unresolved point must not
        // lend its figure to a different item or to an unmatched answer.
        return indexes.length === figure.promptIndexes.length && figure.promptIndexes.every(index => indexes.includes(index));
      });
    });
  }
  function renderFigure(figure) {
    const wrapper = element('figure', 'oral-answer-figure');
    const link = element('a', 'oral-figure-link');
    const url = './assets/answer-figures/' + encodeURIComponent(figure.file);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', figure.caption + '：図を拡大（新しいタブ）');
    const image = element('img');
    image.src = url;
    image.alt = figure.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    link.appendChild(image);
    link.appendChild(element('span', 'oral-figure-expand', '図を拡大'));
    wrapper.appendChild(link);
    const caption = element('figcaption', 'oral-figure-caption', figure.caption);
    if (figure.note) caption.appendChild(element('span', 'oral-figure-note', figure.note));
    wrapper.appendChild(caption);
    return wrapper;
  }
  // Presentation only: keep the source array and its answer-binding indexes intact.
  function presentedPrompts(prompts, indexes = prompts.map((_prompt, index) => index)) {
    const result = [];
    indexes.forEach(index => {
      if (!Number.isInteger(index) || !prompts[index]) return;
      const prompt = prompts[index];
      const raw = typeof prompt.text === 'string' ? prompt.text.trim() : '';
      if (!raw || raw === '・') return;
      const text = raw.replace(/^・\s*/, '');
      const previous = result[result.length - 1];
      // REV-3 p.11 has a bullet before the verb-only continuation of
      // "Wing ... CK要領を". Keep the original indexes, but show one sentence.
      const verbContinuation = previous && /を$/.test(previous.text) && text === '述べられる。';
      if (previous && previous.lastIndex === index - 1 && previous.level === prompt.level &&
          (!raw.startsWith('・') || verbContinuation) && !/[。！？.!?]$/.test(previous.text)) {
        const separator = /[A-Za-z0-9]$/.test(previous.text) && /^[A-Za-z0-9]/.test(text) ? ' ' : '';
        previous.text += separator + text;
        previous.lastIndex = index;
        previous.indexes.push(index);
      } else result.push({ text, level: prompt.level, lastIndex: index, indexes: [index] });
    });
    return result;
  }
  function presentedAnswerItems(prompts, points) {
    const items = presentedPrompts(prompts).map((prompt, index) => ({ ...prompt, number: index + 1, points: [] }));
    const unassigned = [];
    points.forEach((point, pointIndex) => {
      const bindings = Array.isArray(point.promptIndexes) ? point.promptIndexes : [];
      // Item-specific content is authored in Sheets. A multi-item point does not
      // establish which of its clauses answers each item, so retain it separately.
      const owners = items.filter(item => item.indexes.some(index => bindings.includes(index)));
      const entry = { point, pointIndex, itemNumbers: owners.length === 1 ? [owners[0].number] : [] };
      if (owners.length === 1) owners[0].points.push(entry);
      else unassigned.push(entry);
    });
    return { items, unassigned };
  }
  function sorted(values) { return values.slice().sort((a, b) => Number(a.order || 0) - Number(b.order || 0)); }
  function provisionalPoint(point) {
    return !!point && point.coverage !== 'insufficient' && strings(point.summary).length > 0 &&
      Array.isArray(point.sources) && point.sources.some(source => source && source.type === 'PAST');
  }
  function provisionalAnswer(answer) {
    return Array.isArray(answer.points) && answer.points.some(provisionalPoint);
  }
  function coverage(node, value, provisional = false) {
    const key = Object.prototype.hasOwnProperty.call(coverageLabels, value) ? value : 'insufficient';
    node.dataset.coverage = key;
    node.dataset.provisional = String(provisional);
    node.textContent = provisional ? '裏付け中' : coverageLabels[key];
  }
  function setStatus(message, kind = 'info', retry = null) {
    ui.StatusText.textContent = message;
    ui.Status.dataset.kind = kind;
    ui.Loading.hidden = kind !== 'loading';
    ui.Retry.hidden = !retry;
    state.retry = retry;
    root.setAttribute('aria-busy', String(kind === 'loading'));
  }
  function callApi(method, args = []) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const timer = window.setTimeout(() => done(new Error('読み込みに時間がかかっています。接続を確認して、もう一度読み込んでください。')), 125000);
      function done(error, response) {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        if (error) reject(error);
        else if (!response || response.ok !== true || !response.data) reject(new Error(response && response.error && response.error.message || '口頭試験データを取得できませんでした。'));
        else resolve(response.data);
      }
      try {
        const runner = window.google.script.run.withSuccessHandler(response => done(null, response)).withFailureHandler(error => done(new Error(error && error.message || '通信に失敗しました。接続を確認してください。')));
        runner[method](...args);
      } catch (_error) { done(new Error('口頭試験の接続を開始できませんでした。ページを再読み込みしてください。')); }
    });
  }
  function options(select, values, placeholder) {
    select.replaceChildren(element('option', '', placeholder));
    select.firstChild.value = '';
    values.forEach(value => {
      const option = element('option', '', value);
      option.value = value;
      select.appendChild(option);
    });
  }
  function filteredSections() {
    const query = ui.Search.value.trim().toLocaleLowerCase().normalize('NFKC');
    return (state.sections || []).filter(section => {
      if (ui.Group.value && section.group !== ui.Group.value) return false;
      const searchable = [section.title, section.group, ...strings(section.atas).map(ata => 'ATA' + ata)].join(' ').toLocaleLowerCase().normalize('NFKC');
      return !query || searchable.includes(query);
    });
  }
  function renderSelection() {
    const sections = filteredSections();
    const previousId = state.selectedId;
    ui.Section.replaceChildren();
    sections.forEach(section => {
      const option = element('option', '', section.title + ' · ' + section.itemCount + '小問');
      option.value = section.sectionId;
      ui.Section.appendChild(option);
    });
    ui.FilterCount.textContent = sections.length + ' / ' + (state.sections || []).length + '大問を表示';
    ui.Section.disabled = sections.length === 0;
    if (!sections.length) {
      const option = element('option', '', '該当する大問はありません');
      option.value = '';
      ui.Section.appendChild(option);
      state.selectedId = '';
      ui.Workspace.hidden = true;
      setStatus('条件に合う大問がありません。分野・検索語を変更してください。');
      return;
    }
    const selected = sections.some(section => section.sectionId === previousId) ? previousId : sections[0].sectionId;
    ui.Section.value = selected;
    if (selected !== previousId || ui.Workspace.hidden) loadSection(selected);
  }
  function groupPending(group) {
    if (!state.pending.has(group)) {
      const promise = callApi('apiGetOralGroupBundle', [group]);
      state.pending.set(group, promise);
      const cleanup = () => { if (state.pending.get(group) === promise) state.pending.delete(group); };
      promise.then(cleanup, cleanup);
    }
    return state.pending.get(group);
  }
  function validateGroup(data, group) {
    if (data.schemaVersion !== 1 || data.group !== group || !Array.isArray(data.sections) || !Array.isArray(data.bundles) ||
        data.sections.length !== data.bundles.length || data.sections.some(section => !section.sectionId || typeof section.title !== 'string' || section.group !== group) ||
        new Set(data.sections.map(section => section.sectionId)).size !== data.sections.length) throw new Error('分野データの形式を確認できませんでした。');
    if (state.revision && data.revision !== state.revision) throw new Error('学習データが更新されました。ページを再読み込みしてください。');
    const sections = sorted(data.sections);
    const bundles = data.bundles.map(bundle => validateBundle(bundle || {}, bundle && bundle.section && bundle.section.sectionId));
    if (new Set(bundles.map(bundle => bundle.section.sectionId)).size !== bundles.length || sections.some(section => {
      const bundle = bundles.find(value => value.section.sectionId === section.sectionId);
      return !bundle || bundle.section.group !== group || bundle.revision !== data.revision || bundle.items.length !== section.itemCount;
    })) throw new Error('大問と小問の対応を確認できませんでした。');
    const itemIds = bundles.flatMap(bundle => bundle.items.map(item => item.itemId));
    if (new Set(itemIds).size !== itemIds.length) throw new Error('小問の重複を確認しました。再読み込みしてください。');
    return { ...data, sections, bundles };
  }
  async function loadGroup() {
    const group = ui.Group.value;
    const request = ++state.groupRequest;
    state.sections = [];
    state.selectedId = '';
    ui.Workspace.hidden = true;
    ui.Search.value = '';
    ui.Search.disabled = true;
    ui.Section.disabled = true;
    ui.FilterCount.textContent = '';
    ui.Section.replaceChildren(element('option', '', group ? 'この分野を読み込んでいます' : '先に学習分野を選んでください'));
    if (!group) {
      ui.CatalogCount.textContent = '分野を選ぶと、その分野をまとめて読み込みます。';
      setStatus('学習分野を選んでください。選択するまで問題は読み込みません。');
      return;
    }
    ui.CatalogCount.textContent = group + ' · 読み込み中';
    setStatus('「' + group + '」のすべての大問・小問・回答をまとめて読み込んでいます。', 'loading');
    try {
      if (!groups.includes(group)) throw new Error('学習分野を選び直してください。');
      let data = state.groups.get(group);
      if (!data) {
        data = await groupPending(group);
        if (request !== state.groupRequest || ui.Group.value !== group) return;
        data = validateGroup(data, group);
        // Validate the complete group first; a partial response must not poison caches.
        data.bundles.forEach(bundle => state.cache.set(bundle.section.sectionId, bundle));
        state.groups.set(group, data);
      }
      if (request !== state.groupRequest || ui.Group.value !== group) return;
      state.sections = data.sections;
      state.selectedId = state.groupPositions.get(group) || '';
      state.revision = data.revision || '';
      const total = state.sections.reduce((count, section) => count + Number(section.itemCount || 0), 0);
      ui.CatalogCount.textContent = group + ' · ' + state.sections.length + '大問 · ' + total + '小問 · 読み込み済み';
      ui.Search.disabled = !state.sections.length;
      if (!state.sections.length) {
        ui.Section.firstChild.textContent = '口頭試験データは未登録です';
        state.groups.delete(group);
        setStatus('この分野の口頭試験データがまだ登録されていません。', 'info', loadGroup);
      } else renderSelection();
    } catch (error) {
      if (request === state.groupRequest && ui.Group.value === group) {
        ui.CatalogCount.textContent = group + ' · 読み込み未完了';
        setStatus('分野を読み込めませんでした。' + error.message, 'error', loadGroup);
      }
    }
  }
  function loadSection(sectionId) {
    state.selectedId = sectionId;
    state.groupPositions.set(ui.Group.value, sectionId);
    ui.Workspace.hidden = true;
    try {
      const data = state.cache.get(sectionId);
      if (!data || !state.sections.some(section => section.sectionId === sectionId)) throw new Error('この分野をもう一度読み込んでください。');
      if (!data.items.length) { setStatus('この大問には小問が登録されていません。別の大問を選択してください。'); return; }
      renderBundle(data);
      setStatus('この大問の' + data.items.length + '小問を学習できます。この分野の大問は読み込み済みです。');
    } catch (error) {
      setStatus('小問を表示できませんでした。' + error.message, 'error', loadGroup);
    }
  }
  function validateBundle(data, sectionId) {
    if (data.schemaVersion !== 1 || !data.section || data.section.sectionId !== sectionId || !Array.isArray(data.items) || data.items.some(item => !item.itemId || typeof item.question !== 'string' || !Array.isArray(item.prompts) || !item.answer)) throw new Error('小問データの形式を確認できませんでした。');
    if (state.revision && data.revision && state.revision !== data.revision) throw new Error('学習データが更新されました。ページを再読み込みしてください。');
    return { ...data, items: sorted(data.items) };
  }
  function position() {
    if (!state.positions.has(state.selectedId)) state.positions.set(state.selectedId, { index: 0, revealed: false });
    return state.positions.get(state.selectedId);
  }
  function renderBundle(bundle) {
    ui.ParentTitle.textContent = bundle.section.title;
    const meta = [bundle.section.group, strings(bundle.section.atas).map(ata => 'ATA ' + ata).join(' / ')];
    if (bundle.section.assessmentPage) meta.push('評価シート PDF p.' + bundle.section.assessmentPage);
    ui.ParentMeta.textContent = meta.filter(Boolean).join(' · ');
    ui.Items.replaceChildren();
    bundle.items.forEach((item, index) => {
      const li = element('li');
      const button = element('button', 'oral-item-button');
      button.type = 'button';
      button.setAttribute('aria-label', '小問 ' + item.sourceItemNumber + '：' + item.question);
      button.appendChild(element('span', 'oral-item-number', item.sourceItemNumber));
      const description = element('span');
      description.appendChild(element('span', 'oral-item-label', item.question));
      const badge = element('span', 'oral-item-coverage');
      coverage(badge, item.answer.status, provisionalAnswer(item.answer));
      description.appendChild(badge);
      button.appendChild(description);
      button.addEventListener('click', () => selectItem(index, true));
      li.appendChild(button);
      ui.Items.appendChild(li);
    });
    position().index = Math.min(position().index, bundle.items.length - 1);
    renderItem();
    ui.Workspace.hidden = false;
  }
  function selectItem(index, focus) {
    const bundle = state.cache.get(state.selectedId);
    if (!bundle || index < 0 || index >= bundle.items.length) return;
    const current = position();
    if (current.index !== index) { current.index = index; current.revealed = false; }
    renderItem();
    if (focus) ui.QuestionHeading.focus();
  }
  function renderItem() {
    const bundle = state.cache.get(state.selectedId);
    const current = position();
    const item = bundle.items[current.index];
    [...ui.Items.children].forEach((li, index) => { li.firstChild.setAttribute('aria-current', String(index === current.index)); });
    ui.ItemPosition.textContent = '小問 ' + item.sourceItemNumber;
    ui.NavigationPosition.textContent = (current.index + 1) + ' / ' + bundle.items.length;
    ui.Previous.disabled = current.index === 0;
    ui.Next.disabled = current.index === bundle.items.length - 1;
    ui.ItemLevels.replaceChildren(...strings(item.levels).map(level => element('span', 'oral-tag', 'LEVEL ' + level)));
    ui.Subheading.hidden = !item.subheading;
    ui.Subheading.textContent = item.subheading || '';
    ui.QuestionHeading.textContent = item.question;
    ui.Prompts.replaceChildren();
    presentedPrompts(item.prompts).forEach((prompt, index) => {
      const li = element('li');
      li.dataset.itemNumber = String(index + 1);
      li.appendChild(element('span', 'oral-prompt-number', '項目 ' + (index + 1)));
      if (prompt.level) li.appendChild(element('span', 'oral-prompt-level', 'LEVEL ' + prompt.level));
      li.appendChild(element('span', '', prompt.text || ''));
      ui.Prompts.appendChild(li);
    });
    renderAnswer(item);
    renderReveal();
  }
  function renderSource(source) {
    const wrapper = element('div', 'oral-source');
    wrapper.appendChild(element('p', '', [source.type, source.title, source.reference].filter(Boolean).join(' · ')));
    const location = [];
    if (source.type === 'PAST') {
      // DOCX references are logical text locations, not invented PDF pages.
      if (source.pageCode) location.push(source.pageCode);
      else if (source.pdfPage) location.push('資料区画 ' + source.pdfPage);
    } else {
      if (source.pdfPage) location.push('PDF p.' + source.pdfPage);
      if (source.pageCode) location.push('資料ページ ' + source.pageCode);
    }
    if (source.locator) location.push(source.locator);
    if (source.revision) location.push('REV ' + source.revision);
    wrapper.appendChild(element('p', 'oral-source-meta', location.join(' · ')));
    return wrapper;
  }
  function renderPoint(entry) {
    const point = entry.point;
    const section = element('div', 'oral-answer-point');
    const heading = element('div', 'oral-point-heading');
    heading.appendChild(element('h5', '', '回答の要点'));
    const badge = element('span', 'oral-coverage');
    coverage(badge, point.coverage, provisionalPoint(point));
    heading.appendChild(badge);
    section.appendChild(heading);
    const summary = element('ul', 'oral-point-summary');
    const summaries = strings(point.summary);
    summaries.forEach(text => summary.appendChild(element('li', '', text)));
    section.appendChild(summary);
    const sources = element('div', 'oral-sources');
    if (Array.isArray(point.sources) && point.sources.length) {
      sources.setAttribute('aria-label', 'この要点の根拠資料');
      sources.appendChild(element('h5', '', '根拠資料'));
      point.sources.forEach(source => sources.appendChild(renderSource(source)));
    } else sources.appendChild(element('p', 'exam-note', 'この要点を裏付ける資料は未確認です。'));
    section.appendChild(sources);
    if (point.gap) section.appendChild(element('p', 'oral-point-gap', '未確認：' + point.gap));
    else if (!summaries.length) section.appendChild(element('p', 'oral-point-gap', 'この要点の回答を確定できる根拠が不足しています。'));
    return section;
  }
  function renderAnswer(item) {
    const answer = item.answer;
    coverage(ui.AnswerStatus, answer.status, provisionalAnswer(answer));
    ui.AnswerPoints.replaceChildren();
    const points = Array.isArray(answer.points) ? answer.points : [];
    const presentation = presentedAnswerItems(item.prompts, points);
    presentation.items.forEach(prompt => {
      const section = element('section', 'oral-answer-item');
      section.dataset.itemNumber = String(prompt.number);
      section.appendChild(element('h4', 'oral-answer-item-heading', '項目 ' + prompt.number));
      section.appendChild(element('p', 'oral-answer-item-text', prompt.text));
      prompt.points.forEach(entry => section.appendChild(renderPoint(entry)));
      figuresForItem(item, prompt).forEach(figure => section.appendChild(renderFigure(figure)));
      if (!prompt.points.length) section.appendChild(element('p', 'oral-point-gap', 'この項目に対応する回答は未確認です。根拠資料の確認が必要です。'));
      ui.AnswerPoints.appendChild(section);
    });
    if (presentation.unassigned.length) {
      const section = element('section', 'oral-answer-item');
      section.appendChild(element('h4', 'oral-answer-item-heading', '項目との対応が未確認の回答'));
      presentation.unassigned.forEach(entry => section.appendChild(renderPoint(entry)));
      ui.AnswerPoints.appendChild(section);
    }
    if (!points.length) ui.AnswerPoints.appendChild(element('p', 'oral-point-gap', '回答の要点がまだ登録されていません。根拠資料の確認が必要です。'));
    const gaps = strings(answer.gaps);
    ui.GapList.replaceChildren(...gaps.map(gap => element('li', '', gap)));
    ui.AnswerGaps.hidden = !gaps.length;
    const scopeNotes = strings(answer.scopeNotes);
    ui.ScopeNoteList.replaceChildren(...scopeNotes.map(note => element('li', '', note)));
    ui.ScopeNotes.hidden = !scopeNotes.length;
  }
  function renderReveal() {
    const revealed = position().revealed;
    ui.Answer.hidden = !revealed;
    ui.Reveal.setAttribute('aria-expanded', String(revealed));
    ui.Reveal.textContent = revealed ? '回答の要点を隠す' : '回答の要点を見る';
  }
  ui.Reveal.addEventListener('click', () => { position().revealed = !position().revealed; renderReveal(); });
  ui.Previous.addEventListener('click', () => selectItem(position().index - 1, true));
  ui.Next.addEventListener('click', () => selectItem(position().index + 1, true));
  ui.Section.addEventListener('change', () => { if (ui.Section.value) loadSection(ui.Section.value); });
  ui.Group.addEventListener('change', loadGroup);
  ui.Search.addEventListener('input', renderSelection);
  ui.Retry.addEventListener('click', () => { if (state.retry) state.retry(); });
  options(ui.Group, groups, '分野選択');
  ui.Group.disabled = false;
  ui.Workspace.hidden = true;
})();
