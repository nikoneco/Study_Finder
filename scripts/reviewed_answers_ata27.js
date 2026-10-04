const answers = {};

function put(questionId, evidence_page_codes, answer_lines, extra = {}) {
  answers[questionId] = {
    evidence_page_codes,
    answer_lines,
    ...extra
  };
}

put('q_27_2057d6da8e86', ['D0-01', 'D0-02'], [
  'Flight Control Systemは、Flight中に必要な姿勢へ機体を保持/変化させるSystemで、PrimaryとSecondaryに分かれる。',
  '- Primary Flight Control: Aileron、Elevator、Rudderにより、Lateral / Longitudinal / Vertical Axis周りの姿勢をControlする。',
  '- Secondary Flight Control: Leading Edge Device、Trailing Edge Flap、Spoiler / Speedbrake、Horizontal Stabilizerにより、Lift、Drag、Handling、Pitch Trimを補助する。',
  '作動概要は、PilotがCable/LinkageでManualにInputを与え、AutopilotはActuatorやFCC経由でAutomaticにInputを与える。Hydraulic PowerやElectric Motorにより各Control Surfaceを作動させる。'
]);

put('q_27_a6de596ebb82', ['D0-01'], [
  'Primary Flight Control Systemを構成するControl Surfaceは次の3系統。',
  '- Aileron: 2枚。',
  '- Elevator: 2枚。',
  '- Rudder: 1枚。'
]);

put('q_27_6e86403927a4', ['D1-15', 'D4-12', 'D3-13'], [
  '各Control Surfaceの操舵角は次の通り。',
  '- Aileron: 20度 Up、15度 Down。Control Wheel Center時は1度 Downrig。',
  '- Elevator: 24.3度 Up、18.1度 Down。Stabilizer Neutral時は4度 Downrig。',
  '- Rudder: Left / Right 各29度。'
]);

put('q_27_396eac5efc81', ['D0-07'], [
  'Flight Control Hydraulic Modular Packageは、Primary Flight ControlおよびFlight SpoilerへのHydraulic PressureをControlするManifold Assembly。',
  '構成Componentは次の3つ。',
  '- Flight Control Shutoff Valve.',
  '- Spoiler Shutoff Valve.',
  '- Low Pressure Warning Switch.',
  'LocationはMain Landing Gear Wheel WellのForward Bulkheadで、System A Packageは左側、System B Packageは右側にある。'
]);

put('q_27_40d0b6cecf11', ['D0-08', 'D2-10'], [
  '- Flight Control Shutoff Valve: Aileron PCU、Elevator PCU、Elevator Feel Computer、Main Rudder PCUへのSystem A/B PressureをShutoffする。',
  '- Spoiler Shutoff Valve: Flight Spoiler SystemへのSystem A/B PressureをShutoffする。',
  '- System A Spoiler Shutoff Valve: Spoiler 2、4、9、11へのSystem A Hydraulic Powerを止める。',
  '- System B Spoiler Shutoff Valve: Spoiler 3、5、8、10へのSystem B Hydraulic Powerを止める。'
]);

put('q_27_d39d8c5cdc6b', ['D1-03', 'D1-04', 'D1-05'], [
  'Aileron & Aileron Trim Control Systemの主要Component / Location / Functionは次の通り。',
  '- Flight Compartment: Aileron Control Wheel、Aileron/Rudder Trim PanelのTrim Switch。Pilot Roll InputとTrim Inputを与える。',
  '- Forward Equipment Compartment: Aileron Control Wheel Drum、Aileron Transfer Mechanism。Control Wheel InputをCableへ伝え、片側Jamming時のLoad Pathを確保する。',
  '- Body: Input Cable。Control Wheelの動きをAileron Control Quadrantへ伝える。',
  '- Main Landing Gear Wheel Well: Autopilot Actuator、Input Shaft、Aileron Feel and Centering Unit、Aileron Trim Actuator、Aileron PCU、Aileron Body Quadrant。Feel/Centering、Trim、Hydraulic Power Controlを行う。',
  '- Wing: Output Cable、Aileron Wing Quadrant、Balance Panel、Aileron、Aileron Balance Tab。Aileronを作動し操舵力を軽減する。'
]);

put('q_27_a589c44aee17', ['D1-17', 'D1-18'], [
  'Manual ReversionでControl Wheelを左側へ操作すると、Control Wheel InputがCable / Linkageを介してAileron PCUへMechanical Inputとして入る。',
  'Hydraulic Pressureが無い場合、PCU内のInput CrankがMechanical Stopに当たった後、Pilot ForceでPCU Housingを動かす。',
  'PCU Housingの動きがAileron Body Quadrantを動かし、Wing CableとWing Quadrantを介してAileronを動かす。',
  'Manual Reversionでも作動順序はNormalとほぼ同じだが、Aileronを動かす力はPilotが供給する。'
]);

put('q_27_bf188c661eb5', ['D1-03', 'D1-10', 'D1-12'], [
  'Aileron Input Shaftに取り付く/接続される主なComponentは次の通り。',
  '- Aileron Control Quadrant.',
  '- Aileron Feel and Centering Unit.',
  '- Aileron Trim Actuator.',
  '- Aileron PCU Input Pogo / PCU Input Crank.',
  'Input ShaftはLeft Body Cableからの動きをFeel and Centering UnitおよびAileron PCUへ伝える。'
]);

put('q_27_de210d578581', ['D1-04', 'D1-16'], [
  'Aileron Balance Panel & Tabの目的は、In FlightでAileronを動かすために必要な操舵力をAerodynamic Forceで軽減すること。',
  'Aileronが動くと差圧によりBalance PanelがAileronの動きと反対方向へ動き、Balance Tabの動きによりAileron後部にDifferential Forceが発生する。',
  'このForceがAileronを動かすPower Sourceを助け、特にManual Control時の操舵力軽減に有効となる。'
]);

put('q_27_db1753c35522', ['D1-08'], [
  'Aileron Transfer Mechanismの目的は、Roll ControlのLoad Pathを供給し、Normal Operationで左右どちらのPilotからでもRoll Controlできるようにすること。',
  '片側Control WheelがJammingした場合でも、他方のControl WheelによりAileronまたはFlight Spoilerを使ったRoll Controlを継続できるようにする。'
]);

put('q_27_aa001599c651', ['D1-08', 'D1-17'], [
  'Lost Motion Deviceは、片側Control Wheelが動かない場合に、一定量のControl Wheel Movement後にFlight SpoilerだけをControlできるようにする機構。',
  'Right Control Wheel側のLost Motion DeviceはControl Wheelの動き12度でEngageし、その後Spoiler Control Drumを回してRight Body Cableを動かす。',
  'これにより、Left Control WheelがJammedした場合でもFirst Officer側からFlight Spoiler Controlが可能になる。'
]);

put('q_27_f309774f9f2a', ['D1-08', 'D1-17'], [
  'Captain Control WheelがJammingした場合、Captain側のCableは動かない。',
  'First OfficerはRight Control Wheelを操作し、Torsion SpringおよびSpring CartridgeのForceをOverrideする。',
  'Control Wheelが約12度動いた後、Lost Motion DeviceがEngageしてRight Body Cableを動かし、Flight Spoiler ActuatorをControlする。',
  'この場合はAileronではなく、Flight Spoiler主体でRoll Controlを行う。'
]);

put('q_27_5304606ee47d', ['D2-01', 'D2-02', 'D2-11'], [
  'Flight SpoilerはAileronの補助としてRoll Controlを行う。',
  'Control WheelまたはAutopilot InputによりAileron PCUが動くと、そのInputがSpoiler Mixer and Ratio Changerを介してFlight Spoiler Actuatorへ伝わる。',
  'Roll Controlでは片翼側のFlight SpoilerだけがUpし、反対側SpoilerはDownのままとなる。',
  'Control Wheelを大きく回すほどFlight SpoilerがUpし、AileronによるRollを補助する。'
]);

put('q_27_0209ccfe1ead', ['D2-03', 'D2-06', 'D2-07'], [
  'Ratio Changerは、Spoiler Control QuadrantおよびSpeedbrake LeverからInputを受け、CommandをSpoiler Mixerへ送る。',
  'Spoiler Mixerから戻るCommandは、Ratio Changerを介してFlight Spoiler Actuator Quadrantへ送られる。',
  'Speedbrake LeverがUpに動くと、Roll Control用Flight Spoilerの作動量を減少させるRatio Changeを行う。'
]);

put('q_27_13d692a5b344', ['D2-03', 'D2-06', 'D2-07'], [
  'Spoiler Mixer & Ratio Changerは、Control WheelとSpeedbrake LeverからのInputをまとめ、Flight SpoilerおよびGround Spoiler Control ValveへCommandを送る。',
  '- Spoiler Mixer: Control Wheel InputとSpeedbrake Lever Inputを合成し、Flight Spoiler CommandをRatio Changerへ戻し、Ground Spoiler CommandをGround Spoiler Control Valveへ送る。',
  '- Ratio Changer: Control Wheel / Speedbrake Inputの比率を変え、Flight Spoiler Actuator QuadrantへCommandを送る。',
  'これによりRoll ControlとSpeedbrake Operationを同じSpoiler Surfaceで両立させる。'
]);

put('q_27_f5935343c04a', ['D2-01', 'D2-02', 'D2-16', 'D2-30'], [
  'Speed Brakeとしては、Speedbrake Leverを動かすことでSpoiler Mixer and Ratio ChangerへMechanical Inputを与える。',
  'In AirではFlight Spoilerだけが左右対称にUpし、Dragを増やす。',
  'On GroundではFlight SpoilerとGround Spoilerが作動し、Liftを減少させDragを増加させる。',
  'TE Flap Up中はSpeedbrake Lever StopによりFlight Detentを超えられず、TE Flap DownではFull Upまで動かせる。'
]);

put('q_27_8692f2d3a1ae', ['D2-03', 'D2-04', 'D2-10', 'D2-11'], [
  'Flight Spoiler Control Systemの主要Componentは次の通り。',
  '- Spoiler Control Quadrant: MLG Wheel Well上方。Aileron PCU / Control Wheel Inputを受けRatio Changerへ送る。',
  '- Spoiler Mixer and Ratio Changer: MLG Wheel Well Forward Bulkhead。Roll InputとSpeedbrake Inputを合成/配分する。',
  '- Flight Spoiler Actuator Quadrant: Wing Fixed TE。CommandをActuatorへ送る。',
  '- Flight Spoiler Actuator: Wing Fixed TE。Hydraulic PowerでFlight Spoilerを動かす。',
  '- Spoiler Shutoff Valve: 各Hydraulic Modular Package左側。Flight SpoilerへのHydraulic PressureをControlする。',
  '- Flight Spoiler: Engine StrutとAileron間のWing Fixed TE。Roll ControlとSpeedbrakeに使われる。'
]);

put('q_27_3eb125c4c02e', ['D2-14', 'D2-24', 'D2-26', 'D2-30'], [
  'Ground Spoilerは、Airplane On Ground時にSpeedbrake Leverが動かされた時だけ作動する。',
  'Speedbrake Leverが動くと、Spoiler MixerがGround Spoiler Control Valveを動かし、System A PressureをGround Spoiler Interlock Valveへ送る。',
  'Right MLGがCompressされるとInterlock ValveがGround Modeに動き、Hydraulic PowerがGround Spoiler Actuatorへ行く。',
  'Ground Spoiler 1、6、7、12は60度Upとなり、Landing / RTOでLiftを減少しDragを増加させる。'
]);

put('q_27_6a6619431583', ['D2-24'], [
  'Ground Spoiler Interlock Valveの機能は、Airplane On Groundの時だけGround Spoilerを作動できるようにすること。',
  'Right Main Landing GearがCompressされるとPush/Pull CableによりValveがGround Modeに動き、Ground Spoiler Control ValveからGround Spoiler ActuatorへSystem A Pressureを送る。',
  'Air ModeではSpring Loadedで閉じるため、Ground SpoilerへのHydraulic Powerを防ぐ。'
]);

put('q_27_c61e320eb36b', ['D2-23'], [
  'Ground Spoiler Control ValveのLocationは、Main Landing Gear Wheel Well Forward Bulkhead。',
  'Spoiler Mixer and Ratio Changerの右側にある。'
]);

put('q_27_61fc3c7b82b1', ['D2-14', 'D2-27', 'D2-30'], [
  'Manual Operationでは、Speedbrake Leverの動きがSpeedbrake Cableを介してSpoiler Mixer and Ratio Changerへ入り、Ground Spoiler Control Valveを動かす。',
  'Ground Spoiler Control ValveはSystem A PressureをGround Spoiler Interlock Valveへ送り、機体On Ground時にInterlock ValveがOpenしてGround Spoiler ActuatorへPressureを送る。',
  'Auto Operationでは、Auto Speedbrake ModuleがLandingまたはRTO条件成立時にAuto Speedbrake ActuatorへCommandを出し、ActuatorがSpeedbrake LeverをFullへ動かす。',
  'その後のCable / Mixer / Valve / Interlock Valve / Actuatorの流れはManual Operationと同じで、全SpoilerをUpさせる。'
]);

put('q_27_ceebb2c8fa60', ['D2-14', 'D2-16', 'D2-28', 'D2-29'], [
  'Speedbrake系Indicationは、P1のGreen SPEEDBRAKE ARMED Light、Amber SPEEDBRAKE DO NOT ARM Light、P3のAmber SPEEDBRAKES EXTENDED Light。',
  'Spoiler角度は次の通り。',
  '- Speedbrake Lever ARMED 4度: Spoiler 0度。',
  '- Lever 29度以上: Ground Spoiler 1/6/7/12は60度、Flight Spoilerは0から20/22.5度付近。',
  '- Flight Detent 35.5度: Flight Spoiler 2/3/10/11は19.5度、4/5/8/9は24.5度、Ground Spoilerは60度。',
  '- Full Up 48度: Flight Spoiler 2/3/10/11は56度、4/5/8/9は65度、Ground Spoilerは60度。'
]);

put('q_27_3c8e06035137', ['D2-28'], [
  'SPEEDBRAKE DO NOT ARM Lightは、Speedbrake SystemのAutomatic Operationが正常にArmされない時に点灯する。',
  '点灯条件は、Speedbrake LeverがARMED Detent、またはThrust LeverがReverseで、かつ次のいずれかがある場合。',
  '- Antiskid Systemが作動していない。',
  '- Auto Speedbrake ActuatorがRetractしていない。',
  '- Wheel Spin SpeedとAir/Ground SignalにDisagreeがある。',
  '- Auto Speedbrake Module Internal Faultがある。',
  'Landing時、Wheel Speed 60 kt未満でSpeedbrake HandleがUPなら点灯するが、これはNormal OperationでSystem Faultではない。'
]);

put('q_27_fd350ed0be84', ['D2-28'], [
  'SPEEDBRAKE ARMED Lightは、Speedbrake SystemのAutomatic Operationが正常にArmされた時に点灯する。',
  '条件は、Speedbrake LeverがARMED DetentまたはThrust LeverがReverseで、次の全てが成立すること。',
  '- 1個以上のAntiskid Channelが作動している。',
  '- Auto Speedbrake ActuatorがRetractしている。',
  '- Wheel Spin SpeedとAir/Ground SignalにDisagreeがない。',
  'また、Auto Speedbrake ModuleがLift CommandをAuto Speedbrake Relayへ送っている時も点灯する。'
]);

put('q_27_bc68837c100f', ['D2-29'], [
  'Air Modeでは、次の全てが成立するとSPEEDBRAKES EXTENDED Lightが点灯する。',
  '- Airplane In Air.',
  '- Speedbrake Leverが7.5度以上。',
  '- TE Flapが10 unit以上、またはAltitudeが800 ft以下。',
  'Ground Modeでは、次の全てが成立すると点灯する。',
  '- Airplane On Ground.',
  '- Ground Spoiler Interlock Valve Pressure Switchが750 psi以上を検知。',
  '- Speedbrake LeverがDown Position。',
  'GroundでDown PositionなのにPressureがある場合はFailure Conditionを示す。'
]);

put('q_27_56c1f6d7c1d2', ['D2-11', 'D2-16'], [
  'Flight Spoilerの作動角は、In AirとOn Ground / Auto Speedbrakeで異なる。',
  '- In Air Maximum: Spoiler 2/3/10/11は33度Up、Spoiler 4/5/8/9は38度Up。',
  '- On Ground Auto Speedbrake中: Spoiler 2/3/10/11は56度Up、Spoiler 4/5/8/9は65度Up。',
  '- Speedbrake Lever Flight Detent 35.5度では、2/3/10/11が19.5度、4/5/8/9が24.5度。'
]);

put('q_27_9a0f6f0bb1e0', ['D2-11', 'D2-21', 'D2-27'], [
  'Flight Spoiler ActuatorのSolenoid Operated Valveは、LandingまたはRTOでAuto Speedbrakeが作動する時にActiveになる。',
  'Auto Speedbrake ModuleはRelayを介してSOVへCommandを送り、Flight Spoilerを通常より大きいFull Up Positionへ動かす。',
  'On Ground Auto Speedbrake中、SOV ActiveによりFlight Spoiler 2/3/10/11は56度、4/5/8/9は65度までUpする。',
  'Wheel Speedが60 kt以下になるとSOVはInactiveとなり、Spoilerは少し戻ってNormal Positionになる。'
]);

put('q_27_c512035ae123', ['D2-14', 'D2-17', 'D2-18', 'D2-19', 'D2-22', 'D2-23', 'D2-24', 'D2-26'], [
  'Speedbrake Control Systemの主要Component / Location / Functionは次の通り。',
  '- Speedbrake Lever: P10 Control Stand。PilotがSpoilerをManual Commandする。',
  '- Speedbrake Lever Brake / Forward Drum / Arming Switch / Lever Position Switch / Position Sensor / Auto Speedbrake Actuator: Flight Compartment Floor下方。Lever Motion、Auto Arm、Position Signal、Auto Deployを扱う。',
  '- Speedbrake RTO Switch / Takeoff Warning Switch: P10 Control Stand。RTOとTakeoff Warning信号を出す。',
  '- Auto Speedbrake Module: E/E Compartment E4-2 Rack。Auto Speedbrake FunctionとARM/DONOT ARM LightをControlする。',
  '- Ground Spoiler Control Valve: MLG Wheel Well Forward Bulkhead。Ground Spoiler Interlock ValveへSystem A Pressureを送る。',
  '- Ground Spoiler Interlock Valve: MLG Wheel Well Upper Right Corner Forward。On Ground時のみGround SpoilerへPressureを通す。',
  '- Ground Spoiler: Wing Fixed TE。Landing/RTOでLiftを減らしDragを増やす。'
]);

put('q_27_1531bf39e47f', ['D2-22'], [
  'Auto Speed Brake ModuleのLocationは、Electronic Equipment CompartmentのE4-2 Rack。'
]);

put('q_27_860d912f6d1f', ['D3-01', 'D3-02', 'D3-03'], [
  'Rudder & Rudder Trim Control Systemは、Vertical Axis周りのYaw Controlを行うSystem。',
  'ManualではRudder Pedal InputがForward Quadrant、Control Cable、Aft Quadrant、Feel and Centering Unit、Main Rudder PCUを介してRudderを動かす。',
  'TrimではRudder Trim ControlがRudder Trim Actuatorを動かし、Feel and Centering UnitのNeutral Positionを変えてRudder / PedalのNeutralを変える。',
  'Yaw Damper、WTRIS、Standby Rudder SystemもRudder ControlへInputを与える。'
]);

put('q_27_10f46d677d3a', ['D3-03', 'D3-04'], [
  'Rudder Systemの主要Component / Location / Functionは次の通り。',
  '- Flight Compartment: Rudder Pedal、Aileron/Rudder Trim PanelのRudder Trim Control / Indicator。Yaw InputとTrim Inputを与える。',
  '- Forward Equipment Compartment: Rudder Forward Quadrant、Control Rod、Bus Rod。Pedal InputをCableへ送る。',
  '- Vertical Stabilizer: Rudder Aft Quadrant、Pedal Force Transducer、Torque Tube、Feel and Centering Unit、Trim Actuator、Main Rudder PCU、Standby Rudder PCU、Rudder、Rudder Position Sensor。InputをPCUへ伝え、Hydraulic PowerでRudderを動かす。'
]);

put('q_27_cce11f93bb1b', ['D3-07'], [
  'Rudder Pedalを操作すると、Rudder Feel and Centering UnitのCamがShaftと共に回り、Rollerを持ち上げる。',
  'この動きでSpringが縮み、PilotへArtificial Feel Forceを与える。',
  'PilotがPedalをReleaseするとSpring ForceがRollerをCam Detentへ戻し、SystemをNeutral Trim Positionへ戻す。これがCentering作用。'
]);

put('q_27_760aae5c81e6', ['D3-02', 'D3-03', 'D3-06', 'D3-09'], [
  'Rudder Pedalを踏むと、PedalがForward Control RodとBus Rodを動かし、Rudder Forward Quadrantを動かす。',
  'Forward QuadrantはRA/RB Rudder Control Cableを動かし、Rudder Aft Control QuadrantへInputを伝える。',
  'Aft QuadrantはOutput Rod、Torque Tube、Crankを動かし、Rudder Feel and Centering UnitとMain / Standby Rudder PCU Input RodへInputを与える。',
  'Main Rudder PCUではInput Crank / Summing LeverがControl Valveを動かし、Hydraulic PressureでTandem Actuator / RudderをCommand Positionまで動かす。'
]);

put('q_27_504752a157f3', ['D3-11', 'D8-15'], [
  'Standby Rudder Systemは、手動または自動でStandby Hydraulic PressureがStandby Rudder PCUへ供給される時に作動する。',
  'Manualでは、System AまたはBのFLT CONTROL SwitchをSTBY RUD PositionにするとStandby Pumpが作動し、Standby Rudder PCUがPressurizeされる。',
  'Automaticでは、FLT CONTROL AまたはBがON、Airplane In AirまたはWheel Speed 60 kt以上、TE Flap Not Up、System AまたはB Flight Control Pressure Lowの全条件成立でStandby PumpがStandby Rudder PCUへPressureを供給する。',
  'WTRIS / Standby Yaw DampingはManual Reversion中、FLT CONTROL A/BがOFFで少なくとも1つがSTBY RUD、Yaw Damper Switch ONの時に使用される。'
]);

put('q_27_7effbb392a59', ['D4-01', 'D4-02', 'D4-03', 'D4-04'], [
  'Elevator & Tab Control Systemは、Lateral Axis周りのPitch AttitudeをControlするSystem。',
  'ManualではControl Column InputがCable / Linkageを介してElevator Input Torque Tubeへ行き、Elevator PCUがHydraulic PressureでOutput Torque Tubeを動かしてElevatorを作動させる。',
  'AutopilotではAutopilot ActuatorがMechanical InputをElevator PCUへ与える。',
  'Elevator Feel ComputerはAirspeed、Hydraulic Pressure、Stabilizer Positionに応じてFeel Forceを変化させる。',
  'Elevator Tabは、TE Flap Up時はBalance Mode、TE Flap Not Up時はAnti-Balance Modeで作動する。'
]);

put('q_27_a7ffd9fb6841', ['D4-07', 'D4-09', 'D4-21'], [
  'Manual ReversionでControl Columnを操作すると、Control ColumnがForward Input Torque Tube、Elevator Forward Control Quadrant、Elevator Control Cableを動かす。',
  'CableはElevator Aft Control Quadrantを動かし、Elevator Input Torque TubeへMechanical Inputを与える。',
  'Hydraulic Pressureが無い場合でも、PCU InputがMechanical Stopへ当たった後、Pilot ForceでPCU Housing / Output Torque Tubeを動かす。',
  'Output Torque TubeはElevator Control Rodを介してElevatorを動かす。'
]);

put('q_27_820d4eaacce9', ['D4-03', 'D4-05'], [
  'Elevator & Tab Control Systemの主要Component / Location / Functionは次の通り。',
  '- Flight Compartment: Control Column、FEEL DIFF PRESS Light。Pitch InputとFeel System監視を行う。',
  '- Forward Equipment Compartment: Elevator Forward Control Quadrant、Balance Weight、Breakout Mechanism。Column InputをCableへ送る。',
  '- Empennage: Elevator Aft Control Quadrant、Input Torque Tube、Elevator PCU、Output Torque Tube、Feel and Centering Unit、Tab Mechanism Solenoid Control Valve。Elevator作動とFeel/Centeringを行う。',
  '- Vertical Stabilizer: Feel System Pitot Tube。Airspeed情報をFeel Computerへ供給する。',
  '- Stabilizer Jackscrew Compartment: Elevator Feel Computer。Dual Feel ActuatorへのPressureをControlする。',
  '- Horizontal Stabilizer: Elevator、Balance Panel、Elevator Tab Control Mechanism、Elevator Tab。Pitch Controlと操舵力軽減を行う。'
]);

put('q_27_bed34ce7d179', ['D4-06'], [
  'Elevator Breakout Mechanismの目的は、片側Control ColumnがJammingした場合に左右のForward Input Torque Tubeを分離し、反対側ColumnでElevator Controlを継続可能にすること。',
  'Normal Operationでは両Torque Tubeを一緒に作動させ、Jam時はBreakout Forceに打ち勝つことで他方Columnが作動できる。'
]);

put('q_27_b52d7cb13252', ['D4-17', 'D4-18', 'D4-21'], [
  'Balance ModeはTE Flap Up時のModeで、Elevator Tab ActuatorはRetractし、Elevator TabはElevatorの動きと反対方向へ動く。',
  'Balance Modeの目的は、ElevatorをAerodynamicにBalanceさせ、操舵力を軽減すること。TabはElevator 1度に対して約0.75度動く。',
  'Anti-Balance ModeはTE Flap Not UpかつHydraulic Power On時のModeで、Solenoid Control ValveがEnergizeしActuatorがExtendする。',
  'Anti-Balance ModeではElevator TabがElevatorと同じ方向へ動き、Airplane Nose Up Controlを増加させる。TabはElevator 1度に対して約0.50度動く。'
]);

put('q_27_25b68e4fc839', ['D4-06'], [
  'Captain Control ColumnがJammingした場合、Elevator Breakout Mechanismにより左右のForward Input Torque Tubeを分離する。',
  'First Officer側のColumnは、Breakout MechanismのSpring Forceに打ち勝った後、Elevator Forward Control QuadrantとCableを動かせる。',
  'Breakoutには追加で約31 lbのForceが必要で、100 lb加えられるとElevatorは約4度動く。',
  'これにより、Jammed側Columnを切り離して反対側ColumnでPitch Controlを継続する。'
]);

put('q_27_0772760b80c4', ['D5-01', 'D5-02', 'D5-03', 'D5-04'], [
  'Horizontal Stabilizer Trim Control Systemは、Horizontal StabilizerでPitch TrimをControlするSystem。',
  'ManualではStabilizer Trim WheelがForward/Aft Cable Drumを動かし、GearboxとJackscrewを介してStabilizerを動かす。',
  'Main ElectricではControl Wheel外側のStabilizer Trim SwitchがTrim ActuatorをControlし、Gearbox/Jackscrewを動かす。',
  'AutopilotではDFCS / FCCがStabilizer Trim ActuatorへCommandを送り、Manual Electricとは異なるRateでStabilizerを作動させる。',
  'Stabilizerが動くとNeutral Shift Rodを介してElevatorにもMechanical Inputを与える。'
]);

put('q_27_9835b5590526', ['D5-02', 'D5-10'], [
  'Manual Electric Trimは、PilotがControl Wheel外側のStabilizer Trim Switchを操作してStabilizer Trim Actuatorを動かす。',
  'Manual ElectricのTrim SpeedはFlap Upで0.2 unit/sec、Flap Not Upで0.4 unit/sec。',
  'FCC / AutopilotによるH/STAB作動は、DFCSがStabilizer Trim ActuatorへElectric Inputを与えて自動Controlする。',
  'Autopilot Electric Trim SpeedはFlap Upで0.09 unit/sec、Flap Not Upで0.27 unit/sec。'
]);

put('q_27_893f5773e05c', ['D5-02', 'D5-07', 'D5-10'], [
  'Column Cutout Switchの機能は、Stabilizer Electric Trim Operation中に、PilotがTrim Directionと反対方向へControl Columnを動かした場合、その方向のElectric Trimを停止すること。',
  'Column Cutout Switch ModuleにはMain Electric用とAutopilot用のSwitch Setがあり、反対方向のColumn InputでTrim ActuatorへのCommandをCutoutする。',
  'これにより、PilotのColumn InputでRunawayや不要なElectric Trimを止められる。'
]);

put('q_27_8ca7d6a81685', ['D5-02', 'D5-07'], [
  'Stabilizer Trim Override Switchの目的は、Column Cutout Switch ModuleをBypassすること。',
  'Column Cutout Switchの一方または両方がFailした場合でも、PilotがMain Electric Trimを操作できるようにするために使用する。',
  'LocationはAisle Stand / P8 Aft Electronic Panel側。'
]);

put('q_27_63f9cabda2b2', ['D5-03', 'D5-04', 'D5-05', 'D5-08'], [
  'Horizontal Stabilizer Trim Control Systemの主要Component / Location / Functionは次の通り。',
  '- Flight Compartment: Stabilizer Trim Control Switch、Trim Wheel、Trim Cutout Switch、Trim Override Switch、Trim Indicator。Manual/Electric Trim操作と表示を行う。',
  '- Forward Equipment Compartment: Column Cutout Switch、Stabilizer Forward Control Mechanism。Column CutoutとManual Trim Wheel InputをCableへ伝える。',
  '- Tail Area / Section 48: Stabilizer Trim Actuator、Aft Cable Drum、Jackscrew、Ball Nut、Jackscrew Gearbox、Trim Limit Switch、Horizontal Stabilizer。Stabilizer Leading Edgeを動かす。',
  '- Stabilizer Trim Limit Switch: Stabilizer Motion RangeとTakeoff Warning Rangeを制限/監視する。'
]);

put('q_27_34c48c604104', ['D5-09'], [
  'Stabilizer Trim Limit Switchは、Horizontal Stabilizer Motion Rangeを制限し、Takeoffで不適切なStabilizer Positionを警告する目的で使われる。',
  '5個構成Shipでは次のSwitchがある。',
  '- S145: Nose Down Autopilot and Flap Not Up Electric Limit、0.05 unit。',
  '- S546: Nose Down Takeoff Warning、2.40 unit。',
  '- S844: Nose Down Flap Up Electric Limit、3.95 unit。',
  '- S132: Nose Up Takeoff Warning、8.75 unit。',
  '- S144: Nose Up Autopilot Limit、14.50 unit。',
  '7個構成Shipでは、Takeoff Warning用としてS1183とS1184が追加される。'
]);

put('q_27_9f7987234713', ['D6-01', 'D6-02', 'D6-03'], [
  'Trailing Edge Flap Systemは、翼面積とCamberを増やし、離着陸性能を向上させるSystem。',
  'Normal OperationではFlap LeverがCommandを決定し、System B Hydraulic PowerがPriority Valve、Flow Limiter、Flap Control Unit、Bypass Valveを通ってFlap PDUへ行く。',
  'PDUはTorque Tube、Angle Gearbox、Transmission、Ballscrew、Gimbalを介してTE Flapを動かす。',
  'Alternate OperationではALTERNATE FLAPS SwitchによりBypass ValveをBypass Positionへ動かし、Electric MotorでTE Flapを作動させる。',
  'ProtectionとしてLoad Relief、Skew / Asymmetry Detection、Uncommanded Motion Detectionがあり、FSEUが監視/制御する。'
]);

put('q_27_bbe88a551498', ['D6-02', 'D6-07', 'D6-10', 'D6-11', 'D6-22'], [
  'Flap Leverを25にSetすると、Flap Lever CableがFlap Control Quadrantを動かし、MLG Wheel Well内のFlap Control UnitへMechanical Inputを送る。',
  'Flap Control UnitのInput Rod / Summing LeverがTE Flap Control Valveを動かし、System B Hydraulic PowerをBypass Valve経由でFlap PDUへ送る。',
  'Flap PDUのHydraulic MotorがTorque Tubeを回し、Transmission / Ballscrew / Gimbalを介してTE Flapを25 Positionへ動かす。',
  'Flap Drive Systemが動くとFollow-Up CableがFollow-Up Drumを動かし、Command Positionに達するとSumming Leverを反対方向へ動かしてControl ValveをNeutralに戻す。',
  'Control ValveがNeutralになるとPDUへのHydraulic Powerが止まり、TE FlapはCommand Positionで停止する。'
]);

put('q_27_e56f1b638293', ['D6-03', 'D6-04', 'D6-05', 'D6-10', 'D6-12', 'D6-13', 'D6-14'], [
  'TE Flap Systemの主要Component / Location / Functionは次の通り。',
  '- Flight Compartment: Flap Lever、Position Sensor/Switch、Alternate Flaps Switch、Flap Position Indicator。CommandとIndicationを行う。',
  '- E/E Compartment E1-1 Shelf: FSEU。Position Indication、Load Relief、Skew/Asymmetry、UCM、BITEを行う。',
  '- MLG Wheel Well: Flap Control Unit、PDU、Bypass Valve、Torque Tube、Tee Angle Gearbox、Priority Valve、Flow Limiter。Hydraulic Power制御とDriveを行う。',
  '- Wing: Torque Tube、Support、Angle Gearbox、Transmission、Drive Mechanism、TE Flap、Fairing。Flap Surfaceを実際に動かす。'
]);

put('q_27_f241d28b2c5d', ['D6-01', 'D6-23', 'D6-24', 'D6-25', 'D6-26'], [
  'T/E Flap Protectionは主にFSEUとTE Flap Bypass Valveで行う。',
  '- Skew Detection: 左右のFlap Skew Sensorを比較し、Skew検知時にBypass ValveをBypass Positionへ動かしてHydraulic Operationを停止する。',
  '- Asymmetry Detection: 左右TE Flap Position Transmitterを比較し、9 Resolver Degree以上の差でAsymmetryとして停止する。Resetには差7.5度未満、Nose On Ground、Airspeed 60 kt未満が必要。',
  '- UCM Detection: Flap Lever Position SensorとSkew Sensor 1/8を比較し、Command外の動きを検知すると停止する。60 kt以上ではBypass Valveを作動、60 kt未満ではPSEUへTakeoff Warning Signal。',
  '- Load Relief: 過大Airspeed時にFlapを1段階Retractさせ、TE FlapとSupport Structureを保護する。'
]);

put('q_27_1d4230a8e065', ['D6-04'], [
  'FSEUのLocationは、Electronic Equipment CompartmentのE1-1 Shelf。'
]);

put('q_27_b82ee4a68816', ['D6-28', 'D6-31', 'D6-04'], [
  'T/E Flap Indication Systemは、2個のFlap Position Transmitter、FSEU、Flap Position Indicatorで構成される。',
  'Flap Position TransmitterはTE Flap Position SignalをFSEU、FCC、SMYDなどへ送る。',
  'FSEUはこのDataを使ってP2 Center Instrument PanelのFlap Position Indicator左右PointerをControlする。',
  'Flap Position Transmitterは各3個のInternal Resolverを持ち、FSEU、SMYD 1/2、FCC A/B、IFSAUとInterfaceする。',
  'TE Flap Skew時にはFSEUがPointerのSignalを変化させ、左右Pointerが15度離れた表示になる。'
]);

put('q_27_c827125ff3ba', ['D7-01', 'D7-02', 'D7-03'], [
  'Leading Edge Flap & Slat Systemの目的は、翼面積とCamberを増加させ、離着陸性能とStall Marginを改善すること。',
  '各Wingには2個のKrueger Flapと4個のSlatがあり、合計12個のLE Deviceがある。',
  'Normal OperationではTE Flap SystemからのCommandを受け、System B Hydraulic PowerでLE Flap / Slat Actuatorを作動させる。',
  'Alternate OperationではALTERNATE FLAPS SwitchによりStandby Hydraulic SystemからPressureを供給し、LE DeviceをExtendさせる。ただしAlternateではRetractできない。',
  'Cruise Depressurization、LE UCM Detection、Autoslat、Position IndicationをFSEU/SMYDなどが制御/監視する。'
]);

put('q_27_be200ebb120f', ['D7-02', 'D7-04', 'D6-10'], [
  'Flap Leverを30にSetすると、TE Flap SystemのFollow-Up / Flap Control UnitがLE Flap and Slat Control ValveへMechanical Inputを与える。',
  'LE Flap and Slat Control ValveはLE Cruise Depressurization ValveからHydraulic System B Pressureを受ける。',
  'ValveはAutoslat Control Valveを介してLE Flap and Slat ActuatorへHydraulic Powerを送る。',
  'ActuatorがLE Flap / SlatをCommand Positionへ動かし、LE Device Proximity SensorがFSEUへPosition Signalを送る。',
  'FSEUはP5 LE Device Annunciator Panel、P2 LE FLAPS TRANSIT / EXT LightへIndicationを出す。'
]);

put('q_27_76394140d1c1', ['D7-02', 'D7-03', 'D7-04', 'D7-05', 'D7-07', 'D7-09', 'D7-10', 'D7-11'], [
  'LE Flap & Slat Systemの主要Component / Location / Functionは次の通り。',
  '- Flight Compartment: LE Device Annunciator Panel、LE FLAPS TRANSIT / EXT Light。Position Indicationを表示する。',
  '- MLG Wheel Well: LE Flap and Slat Control Valve、LE Cruise Depressurization Valve、LE Standby Shutoff Valve、Flow Limiting Valve、Hydraulic Fuse。Hydraulic Powerの供給/遮断/流量制御を行う。',
  '- Right Wing-to-Body Fairing: LE UCM Shutoff Valve。UCM時にRetract Lineを止める。',
  '- Wing: LE Flap / Slat、LE Flap Actuator、LE Slat Actuator、Slat Track。LE Deviceを作動させる。'
]);

put('q_27_2b3fdb1a5dfb', ['D7-05', 'D7-06'], [
  'LE Cruise Depressurization Valveの目的は、Cruise中にLE Flap and SlatがExtensionするのを防止すること。',
  '通常はOpenで、Hydraulic System B PressureをLE Flap and Slat Control Valveへ流す。',
  'FSEUが条件成立時にSolenoid Operated ValveをEnergizeするとPressure Operated Valveが作動し、LE Flap and Slat Control ValveへのSystem B Pressureを止める。',
  '作動条件は、Flap Lever Up、全LE Flap Retract、少なくとも7個のLE Slat Retractが5秒継続すること。',
  'Flap Lever Not Up、ALTERNATE FLAPS Arm、On Groundでは作動しない。'
]);

put('q_27_f2a7833d2f6b', ['D7-07', 'D7-08'], [
  'LE UCM Shutoff Valveの目的は、2個以上のLE Flapまたは3個以上のLE SlatがCommand Position外に作動した時、LE Flap and Slatの動きを止めること。',
  '通常はOpenで、LE Flap / Slat ActuatorのRetract LineへSystem B Pressureを流す。',
  'FSEUがUCMを検知するとSolenoid Operated ValveをEnergizeし、Pressure Operated Valveを作動させてRetract LineへのSystem B Pressureを止める。',
  'Retract Pressureが無くなるとActuatorのSystem Blocking ValveがCloseし、Hydraulic LockでLE Deviceの作動を防止する。',
  'LE UCM発生時はP2 PanelのLE FLAPS TRANSIT Lightが点灯する。'
]);

put('q_27_a811fa727839', ['D8-01', 'D8-03', 'D8-13'], [
  'Stall Warning Systemの目的は、機体がStallに近づいた時にControl Column Stick Shakerを作動させ、Crewへ警告すること。',
  '構成ComponentはSMYD、Control Column Shaker、Elevator Feel Shift Module、Stall Warning Test Panel。',
  'SMYDはAOA、ADIRU、Flap Position、FSEU、PSEUなどのDataを使ってStall Managementを計算し、On-Side Stick Shakerを作動させる。',
  'Stall時にはEFSMを作動させ、Elevator Feel Forceを増加させてElevator Up操作に抵抗を与える。',
  'SMYDはStall Warningのほか、Autoslat、Performance Data、Yaw Damping、WTRISも計算する。'
]);

put('q_27_42d133defabc', ['D8-01', 'D8-13'], [
  'Stall Warningの種類は大きく2つ。',
  '- Stick Shaker Warning: Airspeed / AOAがStallに近づくとSMYDがOn-Side Control Column Shaker Motorを作動させ、Control ColumnをShakeする。',
  '- Elevator Feel Shift / Stall Identification: Stall時にSMYDがEFSMを作動させ、Elevator Feel Computer下流のDual Feel ActuatorへPressureを与えてElevator Feel Forceを増加させる。',
  'Stick Shakerは警告、Elevator Feel ShiftはElevator Up操作に抗するFeel Force増加という違いがある。'
]);

put('q_27_6b8fd0160525', ['D8-01', 'D8-02', 'D8-04'], [
  'Stall Warning Systemの主要Component / Location / Functionは次の通り。',
  '- Stall Warning Test Panel: P5 Aft Overhead Panel。Stick Shaker Testを開始する。',
  '- Control Column Shaker: Control Column前方。Stall Warning時にControl ColumnをShakeする。',
  '- SMYD: E/E Compartment E3-2 Shelf。Stall Management、Autoslat、Performance Data、Yaw Damping、WTRISを計算する。',
  '- EFSM: Section 48 Stabilizer Compartment Aft Bulkhead左側。Stall時にElevator Feel Pressureを増加させる。'
]);

put('q_27_9eb78a22c8ac', ['D8-03', 'D8-04', 'D8-13', 'D8-14', 'D8-15'], [
  'SMYDの5つの機能と作動概要は次の通り。',
  '- Stall Warning / EFS: Stall接近時にStick Shakerを作動し、EFSMでElevator Feel Forceを増加させる。',
  '- Autoslat: Flap 1/2/5/10/15/25でStall Marginが小さい時、LE SlatをExtendからFull ExtendへCommandする。',
  '- Performance Data: PLI、Vmin/Vmax、Vmvr、Vf、Veoなどを計算しCDSへ送る。',
  '- Primary Yaw Damping / Turn Coordination: SMYD 1がHydraulic System BとMain Rudder PCUでNormal時のYawを減衰する。',
  '- WTRIS / Standby Yaw Damping: SMYD 2がManual Reversion時にStandby Rudder PCUへCommandし、Control Wheel Inputに応じた小さなRudder MovementでTurnを補助する。'
]);

put('q_27_f247a5aab421', ['D8-15', 'D9-01', 'D9-02'], [
  'WTRISは、Flight Control A/B HydraulicがOffでStandby SystemがOnのManual Reversion中に、旋回を補助するSystem。',
  'SMYD 2がCaptain Control Wheel Position SensorからAileron Inputを受け、Standby Rudder PCUへ小さなRudder Movement Commandを送る。',
  'Engageには、FLT CONTROL A/B SwitchがOFF、少なくとも1つがSTBY RUD、Yaw Damper Switch ON、Standby Hydraulic Pressureが必要。',
  'WTRISはMach 0.4未満で作動し、Mach 0.3未満でFull Gain、Mach 0.4以上でGain 0となる。'
]);

put('q_27_9d707bb8688c', ['D4-15', 'D8-01', 'D8-13'], [
  'Elevator Feel Shift Module (EFSM)の目的は、Stall時にElevator Feel Forceを増加させ、Control ColumnのElevator Up操作に抵抗を与えること。',
  'SMYDがStallを計算するとEFSMを作動させる。',
  'EFSMはSystem A Pressureを最大850 psiにModulateし、Elevator Feel Computer下流のDual Feel Actuatorへ供給する。',
  'これによりElevator Feel and Centering UnitでのFeel Forceが増え、Stall時のNose Up操作を重くする。',
  '作動時のFlight Compartment Indicationはない。'
]);

put('q_27_1326fbdcb56a', ['D8-02'], [
  'Elevator Feel Shift Module (EFSM)のLocationは、Section 48 Stabilizer CompartmentのAft Bulkhead左側。'
]);

put('q_27_b54238b5e76e', ['F1-02', 'D1-02', 'D1-05'], [
  'Aileron and Aileron Trim Control System図の番号Componentは次の通り。',
  '- 1: Flight Control Computer (FCC) (2). Location: E/E Compartment。Function: Roll CWS Force TransducerやAileron Position Sensor等のSignalを使い、Autopilot / DFCSのRoll Control Commandを扱う。',
  '- 2: Aileron Autopilot Actuator (2). Location: Main Landing Gear Wheel Well。Function: FCC CommandによりFeel and Centering UnitへMechanical Inputを与え、Aileron PCUを動かす。',
  '- 3: Aileron Feel and Centering Unit. Location: Main Landing Gear Wheel Well、Aileron Input Shaft底部。Function: PilotへFeel Forceを与え、No Input時にControl WheelをNeutralへ戻し、Trim Actuator InputをAileron PCUへ伝える。',
  '- 4: Aileron PCU (2). Location: Main Landing Gear Wheel Well。Function: Hydraulic PowerでAileron Body Quadrant / Wing Cableを動かしAileronを作動させる。',
  '- 5: Flight Data Acquisition Unit (FDAU). Location: E/E Compartment。Function: Control Wheel Position、Aileron Position TransmitterなどのFlight Dataを記録用に受ける。'
], {
  problem_reason: 'Question-bank page uses numbered figure labels; numbers were verified against Study Guide figure F1-02.'
});

module.exports = answers;
