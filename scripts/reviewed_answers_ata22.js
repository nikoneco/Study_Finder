module.exports = {
  q_22_a6947b8fa37c: {
    evidence_page_codes: ['D0-01', 'D0-02', 'D2-01', 'D2-02', 'D2-03', 'D2-04', 'D2-05', 'D2-06', 'D2-07', 'D2-08', 'D3-01', 'D4-05'],
    answer_lines: [
      'DFCSのSub Systemは6つ: Autopilot、Flight Director、Altitude Alert、Speed Trim、Mach Trim、Autothrottle。',
      '主要Component/Location: MCPはP7 Glareshield、FCC AはE1-1 Shelf、FCC BはE1-4 Shelf、IFSAUはE1-1 Shelf、FCC Program Switch ModuleはE1 Rack。',
      'Flight Deck関連: A/P Disengage SwitchはCaptain/First Officer Control Wheel、TO/GA SwitchはThrust Lever、A/P Stab Trim Cutout SwitchはControl Stand、STAB OUT OF TRIM/ASAはP1-3/P3-1。',
      'Actuator/Sensor関連: Elevator A/P ActuatorとElevator Position SensorはTailcone、A/P Aileron ActuatorとAileron Position SensorはMain Gear Wheel Well、Spoiler Position SensorはWing Rear Spar、Rudder Rollout Guidance ActuatorとRudder Position SensorはVertical Fin。',
      'Force Transducer: Captain/FO Pitch CWS Force TransducerはForward Equipment CompartmentのControl Column系統、Roll CWS Force TransducerはCaptain Control Column下。',
      'FCC C/B取り扱い: 整備後の電源投入ではAFCS A/B FCC DC Circuit Breakerを最後にCloseする。MCP DCより先にFCC DCをCloseするとFCCがIn-Air ModeでPower-Upし、Power-Up Test Failの原因になる。',
      'FCC本体取り扱い: FCC Pinに触れる前に静電気放電手順を行う。Software Load中はSystem Powerを外さない。外すと再Loadが必要になる。'
    ]
  },
  q_22_ed2ed479a5e6: {
    evidence_page_codes: ['D4-01', 'D4-02', 'D4-03', 'D4-04'],
    answer_lines: [
      'Course Selector/Display 1・2: ILS/VOR Courseを選択・表示する。#1はCaptain側、#2はF/O側。',
      'F/D Switch: FCCのFlight Director機能をON/OFFする。Captain側はFCC A/Captain Display、F/O側はFCC B/F/O Display。',
      'A/T Arm Switch/Light: A/TをArmする。OFFでA/TをDisconnectし、LightはA/T Arm Modeを示す。',
      'IAS/MACH Selector/Display/C/O: Target AirspeedまたはMachを設定・表示し、C/OでIAS/MACH表示を切り替える。Speed InterventionはVNAV中のFMC Target Speed表示・変更に使う。',
      'Heading Selector/Display/Bank Angle Selector: Selected Headingを設定・表示し、Bank Angle SelectorでVOR/HDG SEL時の最大Bank Angleを制限する。',
      'Altitude Selector/Display/Altitude Intervention: DFCS Reference Altitudeを設定・表示する。VNAV中のAltitude InterventionはFMC Target Altitude/制約処理に使う。',
      'Vertical Speed Thumbwheel/Display: Vertical Speedを設定・表示する。',
      'A/P Engage Switch: CMDまたはCWSでAutopilotをEngageする。Pre-engage logicが正常な時にEngageできる。',
      'A/P Disengage Bar: DownにするとAutopilotをDisengageする。',
      'Mode Selector Switches: N1、SPEED、LVL CHG、HDG SEL、APP、VNAV、LNAV、VOR/LOC、ALT HOLD、V/SなどのDFCS Modeを選択する。点灯中のSwitchを再度押すとCancelできる。',
      'Master Light/Light Sensor: Master LightはMode SelectionをControlするFCCを示し、Light SensorはLCD輝度を調整する。'
    ]
  },
  q_22_1ff3e39a6750: {
    evidence_page_codes: ['D3-01', 'D3-03', 'D3-16', 'D3-17', 'D3-18', 'D4-05', 'D4-06', 'D4-07', 'D4-08'],
    answer_lines: [
      'FCC取り扱い注意: FCC Pinは静電気に弱いため、触れる前にStatic Discharge Sensitive手順を実施する。Software Loading中はSystem Powerを外さない。',
      'C/B注意: DFCS電源投入ではAFCS A/B FCC DC Circuit Breakerを最後にCloseする。先にCloseするとIn-Air ModeでPower-UpしPower-Up Test Failとなる可能性がある。',
      'Position Sensor Type: Stabilizer Position Sensor BのみSingle Synchro Sensor。Aileron、Elevator、Elevator Neutral Shift、Rudder、Spoiler 4/9、Stabilizer Sensor AはDual Synchro Sensor。',
      'Roll系Sensor: Aileron Position SensorはAileron Input Torque Tubeの動き、Spoiler Position SensorはSpoiler 4/9の動き、Roll CWS Force TransducerはControl Wheelを回す力を測る。',
      'Pitch系Sensor: Elevator Position SensorはElevator Lower Input Torque Tube、Elevator Neutral Shift SensorはFeel and Centering Unit、Stabilizer Position SensorはHorizontal Stabilizer位置を測る。',
      'Pitch CWS Force Transducer: Captain/F/O Control Columnへ加える力に比例した信号をFCCへ送る。',
      'Yaw/Rollout系Sensor: Rudder Position SensorはRudder Input Torque Tubeの動きを測る。Rudder Servo Tachometer FeedbackはOnside FCC Laneへ送られる。',
      'Actuator Feedback: Aileron/Elevator A/P ActuatorのPosition DataはLVDTからOnside FCCへ入る。'
    ]
  },
  q_22_0516836dd2c2: {
    evidence_page_codes: ['D4-08', 'D4-09', 'D4-10', 'D4-11', 'D4-12', 'D4-16', 'D4-18', 'D5-01', 'D5-02', 'D6-01', 'D6-03', 'D6-04', 'D6-05'],
    answer_lines: [
      'Force Transducer: 操縦輪/操縦桿へ加えた力に比例するElectrical SignalをFCCへ送る。種類はCaptain Pitch CWS、F/O Pitch CWS、Roll CWS。PitchはControl Column力、RollはControl Wheel力を測る。',
      'Force Transducer Location: Pitch CWS Force TransducerはCaptain/F/O Control Column lower control quadrant付近、Roll CWS Force TransducerはCaptain Control Column下。',
      'A/P PCU Power Source: Aileron/Elevator Actuator AはFCC AからElectrical Signalを受けHydraulic System Aで作動、Actuator BはFCC BからElectrical Signalを受けHydraulic System Bで作動する。',
      'IFSAUの働き: DFCSと機体System間のInterface。A1 Cardは26VAC Sensor Power、FCC Mach Trim Selection、DC Bus Isolation、Navigation Transfer、Autoland Transferを扱う。A2 CardはVOR/ILS Test Inhibit、ADIRU Warning/Crew Call Horn、Right ADIRU 5 Minute Power Off Delay、Isolation Diodeを扱う。',
      'TO/GA Switch信号: A/T、SMYD、DFCSへTakeoffまたはGo-Around Mode信号を送る。',
      'A/P機能7つ: A/P Roll Control、A/P Pitch Control、A/P Yaw Control、Autoland、Engage Interlock、Warning and Annunciator、Stabilizer Trim。',
      'A/P Engage条件: Stab Trim Cutout Normal、Manual Stab Trimなし、A/P Disengage Switch未操作、Actuator Pressure Switch/Sync正常、FCC 115VAC/28VDC/Internal Power正常、FCC test正常、Control Wheel Force 3 lb以下、Control Column Force 5 lb以下、ADIRU/Air Data/Baro/Flap/SMYDなど必要DataがValid。',
      'A/P Actuator Synchronization: Engage時、MCP信号でActuator Solenoidを励磁し、FCCがControl Surface Positionに合わせMain PistonをInternal Output Crank位置へ動かす。同期後にDetent Solenoidを励磁し、急なControl Surface movementを防ぐ。',
      'Approach on Course: APP選択後のDual Approachで2つ目のCMDをEngageし、2系統目Actuatorが同期する。AircraftがApproach-on-CourseになるとDetent Pistonが作動し、Dual A/PによるApproach/Autoland制御へ入る。'
    ]
  },
  q_22_7572174a6166: {
    evidence_page_codes: ['D5-02', 'D6-10', 'D6-11', 'D12-16'],
    answer_lines: [
      'A/P Systemの不具合表示は主にASA、CDS/DEU、Flight Control Panel、MCP IAS/MACH Indicator、STAB OUT OF TRIM Annunciator、BITEに出る。',
      'A/P Disengage時はASAのRed A/P LightがFlashingし、Aural Warningが作動する。ASA A/P LightまたはControl Wheel A/P Disengage SwitchでResetできる。',
      'BITE/FCC mismatch/Power-Up Fail/Pitch unavailableなどはASA Red A/P LightのSteady表示になる。',
      'CMDからCWSへ移行するようなCWS WarningはASA Amber Flashing A/P Lightで表示される。'
    ]
  },
  q_22_ffa9674ef018: {
    evidence_page_codes: ['D6-12', 'D6-13', 'D6-14', 'D12-01', 'D12-02', 'D12-03', 'D12-04', 'D12-05', 'D12-06', 'D12-07'],
    answer_lines: [
      'ILS Deviation Warning: ILS ApproachでLocalizerまたはGlideslopeから大きく外れると、FCCがDEUへWarningを送り、Scale ColorがWhiteからAmberへ変わりPointerが4 HzでFlashする。',
      'ILS Deviation Test: 通常運航ではAPP選択、LOC/GS engaged、A/P CMD、RA 1500 ft通過後3秒でFCC Aが2秒間Testし、その後FCC BがTestする。',
      'MCP Airspeed Flag目的: Alpha Floor、Gear/Flap Placard、VMO/MMO、Performance Limitなどの速度Envelope Limit/Annunciationを出し、A/T SpeedまたはSpeed-on-Elevator Commandを制限する。',
      'MCP Altitude Flag目的: Stored AltitudeがSelector操作なしに変化、またはMCP Displayと5秒以内に一致しない場合に警告する。Aural WarningとAmber表示、MCP Altitude 50,000 ft表示で知らせる。',
      'A/P Pitch Control Mode: MCP Speed、VNAV、LVL CHG、Altitude Acquire、Altitude Hold、V/S、G/S、Flare、Go-Aroundなど。',
      'A/P Roll Control Mode: HDG SEL、LNAV、VOR/LOC、Approach/Rollout系、Roll CWSなど。',
      'A/P Yaw Control Mode: Dual Channel Approach/Landing/Rollout/Go-AroundでRunway alignmentとRolloutをControlする。',
      'Synchronization: Engage時にFCCがActuator Main PistonをControl Surface位置へ合わせ、Detent Engage前の急な舵面移動を防ぐ。',
      'Initialization: 7秒以上のDC Power Interruption後などにDFCSはInitial Power Setupへ初期化される。Power-Up時にはFCC test/logicが正常であることが必要。',
      'Equalization: Dual A/PやChannel間でOnside Position Dataを相互に渡し、Command/Position差を合わせてからDual動作させる。差が大きい場合はEngage/継続できない。'
    ]
  },
  q_22_93ee2b4a2e08: {
    evidence_page_codes: ['D6-03', 'D7-01', 'D7-02'],
    answer_lines: [
      'A/Pを手動Disengageする方法: Captain/F/O Control WheelのA/P Disengage Switchを押す、MCPのA/P Engage SwitchをOFF側へ操作する、MCPのA/P Disengage BarをDownにする。',
      'FDの機能4つ: F/D Roll Control、F/D Pitch Control、F/D Command Bias Out of View (BOV)、Fault Detection。',
      'BOV: FCCが異常やNCDを検出した時、CDS上のF/D Command Barを視界から消す機能。必要によりF/D Flagも表示され、誤ったGuidanceをCrewに見せない。'
    ]
  },
  q_22_34cbc29de044: {
    evidence_page_codes: ['D1-02', 'D2-01', 'D2-03', 'D4-01', 'D8-01'],
    answer_lines: [
      '目的: FCCがMCP Selected AltitudeとBaro Corrected Altitudeを比較し、選択高度への接近または逸脱をCrewへ知らせる。',
      '作動: Selected Altitudeの900 ft以内に接近すると1秒AuralとCDS White Box表示。Selected Altitudeから200 ft以上離れると1秒AuralとCDS Amber Flashing Box表示。',
      '構成/Location: MCP Altitude Selector/DisplayはP7 Glareshield、FCC A/BはE/E Compartment、Altitude SourceはADIRU/Baro、AuralはREU、VisualはCDSに出る。',
      '制御FCC選択: 通常はFCC AがAltitude AlertをControlする。FCC A Baro Invalid時、FCC B A/P CMDかFCC B FD OnlyかつFCC B Baro Validの時はFCC BがControlする。',
      '不具合表示: 両方のBaro Altitudeを喪失するとReference AltitudeとMCP Displayが50,000 ftとなり、CDS Visual FlashingとAural Warningが出る。片側が正常ならWarningは停止しMCP Altitude変更可能。'
    ]
  },
  q_22_f9876d9f4aa1: {
    evidence_page_codes: ['D9-01', 'D9-03', 'D9-04', 'D9-05', 'D9-06', 'D9-07'],
    answer_lines: [
      'Speed Trim目的: Low Speed/High ThrustでPositive Speed Stabilityを保つため、FCCがHorizontal Stabilizerへ自動Trim Commandを出す。A/P Engage中は作動しない。',
      'Speed Trim作動: CAS増加でNose Up、CAS減少でNose Down方向のStabilizer TrimをCommandする。Roll Angle 40度以上、Limit、Column Cutoutなどで停止する。',
      'Speed Trim構成Component: FCC A/B、Column Switching Module、A/P Stab Trim Cutout Switch、Stab Up/Down Limit Switch、Stabilizer Trim Electric Actuator、関連Position/ADIRU/DEU/Flap/RA入力。',
      'Speed Trim不具合表示: 両FCC FailでFlight Control PanelのSpeed Trim Fail Annunciatorが点灯する。片側FCC FailはMaster Caution Recallで表示できる。',
      'A/P H/S Trim: A/P Engage中、FCCがElevator Command/Authority Ratioを小さくしElevatorをLimitに近づけないため、Stabilizer Trim Electric ActuatorへA/P Stabilizer Trim Commandを出す。'
    ]
  },
  q_22_3dc1f8974f24: {
    evidence_page_codes: ['D9-01', 'D9-03'],
    answer_lines: [
      'Speed Trimとして作動するFCCは1つだけ。',
      'Power-Up時はFCC AがSpeed Trim Commandを出す。',
      '電源が継続している場合、PSEUのGround Mode Signalを使い、LandingごとにFCC A/Bの選択を交互に切り替える。'
    ]
  },
  q_22_fa0ea43452f2: {
    evidence_page_codes: ['D10-01', 'D10-02', 'D10-03', 'D10-04'],
    answer_lines: [
      'Mach Trim目的: Mach 0.615以上で発生するMach Tuck/High Speed Nose Down傾向を打ち消すため、ElevatorをNose Up方向へ動かす。Takeoff時のFCNSEでもElevator Nose-Up能力を増やす。',
      'Mach Trim作動: ADIRU MachをFCCが受け、IFSAU経由でMach Trim ActuatorへCommandする。Mach Trim ActuatorはElevator Feel and Centering Unitを動かし、Elevator入力を変える。',
      '構成Component: FCC A/B、IFSAU、Mach Trim Actuator、Flight Control Panel、ADIRU、Elevator Feel and Centering Unit/NSS関連。',
      '不具合表示: 両FCCのMach Trim FailでFlight Control PanelのMach Trim Fail Annunciatorが点灯する。片側FCC FailはMaster Caution Recallで表示できる。',
      'A/Pとの関係: A/P Disengaged時はFeel and Centering Unit経由でElevator PCUを動かす。A/P Engaged時はA/P Elevator ActuatorがInput Torque TubeをLockするため、FCCがNSS変化とElevator Positionを見てA/P Elevator ActuatorへCommandし、結果的にElevatorを動かす。',
      'FCC選択: Mach Trimを実際にControlできるFCCは1つだけ。Power-Up時はFCC A、以後Landingごとに切替。Active FCC Fail時は反対側FCCがControlする。'
    ]
  },
  q_22_7e0924908268: {
    evidence_page_codes: ['D14-01', 'D14-02', 'D14-03', 'D14-04', 'D14-05', 'D14-06', 'D14-09', 'D14-10', 'D14-11'],
    answer_lines: [
      'Yaw Damper目的: Yaw Axisを安定させ、Dutch RollやTurbulenceによるYaw Motionを減らすため、Yaw Momentと反対方向のRudder Commandを出す。',
      '作動: SMYDがADIRU/FMC/Flap/AOA等のDataを使い、Yaw Damper Solenoid Valve/EHSV/Actuatorを通してMain Rudder PCUを動かす。Rudder Pedal入力とは機械的にSummingされる。',
      '構成Component: SMYD 1/2、Yaw Damper Engage Switch、Yaw Damper Disengage Light、Yaw Damper Indicator、Main Rudder PCU内のYaw Damper Solenoid Valve/EHSV/LVDT/Actuator、ADIRU/FMC/Flap Up Limit Switch等。',
      'Location: Engage Switch/Disengage LightはP5 Flight Control Panel、Yaw Damper IndicatorはP2、SMYD 1/2はE3-2 Shelf、PCU ComponentsはVertical StabilizerのMain Rudder PCU。',
      '不具合表示: Engageできない、Hydraulic B/FLT CONTROL B条件不成立、SMYD Fault/SMYD間MismatchなどではYaw DamperがDisengageし、Yaw Damper Disengage Lightが点灯する。',
      'PRIM/STBY: Primary Yaw Damperは通常SMYD 1が担当し、SMYD 2は比較監視に必要。SMYD 2はWTRIS/Standby Yaw Dampingを担当する。SMYD間の計算不一致ではPrimary Yaw DamperがDisengageする。'
    ]
  },
  q_22_502f752f8231: {
    evidence_page_codes: ['D15-01', 'D15-02', 'D15-03', 'D15-04', 'D15-05', 'D15-06', 'D15-07', 'D15-16', 'D15-17', 'D15-18', 'D15-19'],
    answer_lines: [
      'A/T目的: FCC AのA/T機能がSensor Dataを使って必要Thrustを計算し、MCP/Flight Deck Switch/FMC Mode Requestに従ってEngine Thrustを制御する。TakeoffからTouchdownまで使用される。',
      '作動: MCP A/T ArmでArmし、N1/Speed ModeまたはDFCS/FMC/TO-GA要求でModeを選択する。FCC AがASMへThrust Rate Commandを送り、Servo/Gearbox/Clutch/TR Pack/LinkageでThrust Leverを動かす。',
      '主要Component/Location: A/T Software FunctionはFCC A(E1-1 Shelf)、A/T Program Switch ModuleはE1-1右側、MCP/ASA/TO-GA/A/T Disconnect SwitchはFlight Deck、ASMはP10 Control Stand下のForward Equipment Compartment。',
      'その他構成: A/T Servomotor ASM、Thrust Resolver TR Pack、Friction Brake and Clutch Gearbox、Mechanical Linkage、MCP A/T Arm/N1/Speed Switch、Thrust Lever TO/GA Switch、Thrust Lever A/T Disconnect Switch。',
      'A/T Mode 6つ: N1、Speed、Arm、Retard、Throttle Hold、Go-Around。Ground Testは地上用Modeとして別扱い。',
      '不具合表示: A/T Disconnect時はASA Red A/T LightがFlashingする。BITE/FaultではSteady表示。FMAにはA/T Modeが表示される。FMC N1 invalidなどではEngine DisplayにA/T LIMが出る。',
      '手動Disengage: MCP A/T Arm SwitchをOFF、またはThrust LeverのA/T Disconnect Switchを押す。Warning ResetはASA Red A/T Light、A/T Disconnect Switch再押し、または再Engageで行う。'
    ]
  }
};
