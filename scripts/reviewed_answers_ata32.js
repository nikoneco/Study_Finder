module.exports = {
  q_32_3fd39140dfa6: {
    evidence_page_codes: ['D0-02', 'F0-02'],
    answer_lines: [
      'L/G GND Lock Pin は、Main Gear では各 MLG Downlock Strut に、Nose Gear では NLG Lock Link Pin Hole に挿入する。',
      'Tail Skid Lock Pin は Stabilizer Trim Access Door から Lock Link に Access して挿入し、Tail Skid を Retract または Extend 位置で Lock する。',
      '挿入前は Landing Gear の不用意な Retraction を防ぐ目的を理解し、Gear が安定した状態であること、周囲の人員・器材が Clear であることを確認する。'
    ]
  },
  q_32_5b6d512206b9: {
    evidence_page_codes: ['D0-01', 'D1-01', 'D2-01', 'D8-01', 'D13-01'],
    answer_lines: [
      'Landing Gear は、Landing 時の衝撃を吸収し、地上で機体重量を支持する。',
      'MLG は Braking Force を機体構造へ伝達し、NLG は機体前部を支持し Nose Wheel Steering により地上での方向制御を行う。',
      'L/G Extension/Retraction System は Gear を格納・展開し、Position Indicating/Warning System は Gear 位置表示と Gear Not Down Warning を行う。',
      'Brake System は MLG Brake の Hydraulic Pressure を制御し、機体の減速・停止を行う。'
    ]
  },
  q_32_81e45408d396: {
    evidence_page_codes: ['D1-01', 'D1-02', 'D1-03'],
    answer_lines: [
      'Main L/G は、Wheel Assembly、Shock Strut、Drag Strut、Side Strut、Gas/Oil Charging Valve、Walking Beam、Reaction Link、Torsion Link、Shimmy Damper、Axle Assembly、Jack Pad、MLG Door、Wheel Well Seal で構成される。',
      'Shock Strut は主支持部材で Landing Shock を吸収する。Drag Strut は前後位置を固定し、Side Strut は Extended Position を保持する。',
      'Reaction Link は Side Load を Shock Strut 上端へ伝え、Torsion Link は Inner Shock Strut の回転を防ぎ上下動を許す。',
      'Shimmy Damper は振動を減少させ、Axle/Wheel は機体重量と Brake Force を受ける。',
      'Extension/Retraction 系として MLG Actuator、Downlock/Uplock Mechanism、Downlock/Uplock Actuator があり、Gear を Up/Down させ Lock する。'
    ]
  },
  q_32_532eb5208c67: {
    evidence_page_codes: ['D1-04', 'F1-04'],
    answer_lines: [
      'Shock Strut Seal は、Inner Cylinder と Outer Cylinder 間の Air/Oil を Seal する Static Seal と Dynamic Seal で構成される。',
      'MLG Shock Strut には Active Static Seal、Active Dynamic Seal に加え、Spare Static Seal 2 個、Spare Dynamic Seal 2 個がある。',
      'Excluder Ring は汚れ/Ozone から Spare Seal を保護し、Scraper Ring は Inner Cylinder の異物から Strut Component を保護する。'
    ]
  },
  q_32_f7ec4a9eaca0: {
    evidence_page_codes: ['D1-02', 'D1-07', 'F1-07'],
    answer_lines: [
      'Main Gear Shimmy Damper の目的は、High Speed Taxi および Heavy Brake 使用時に Inner Cylinder と Outer Cylinder 間に発生する Vibration/Shimmy を減少させること。',
      'Damper は Upper Torsion Link と Lower Torsion Link を接続し、Piston の動きで Hydraulic Fluid を Damping Orifice に通して振動を抑える。',
      'Hydraulic Source は Landing Gear Return Line で、Landing Gear Selector Valve と Landing Gear Transfer Valve の間の Return Line に接続される。Compensator は Damper 内 Pressure を 18-33 psi に維持する。'
    ]
  },
  q_32_915fc8772e58: {
    evidence_page_codes: ['D2-01', 'D2-02', 'D5-01'],
    answer_lines: [
      'Nose L/G は、Shock Strut、Drag Strut、Lock Link、Gas/Oil Charging Valve、Torsion Link、Integral Axle、Tow Fitting、Jack Pad、NLG Door、Wheel Assembly で構成される。',
      'Shock Strut は機体前部を支持し衝撃を吸収する。Centering Cam は Extension/Retraction 時に Nose Wheel を直進位置に保持する。',
      'Drag Strut と Lock Mechanism は NLG を Extend/Retract 位置に保持し、Lock Actuator は Sequence 開始時に Unlock し、完了時に Lock する。',
      'Torsion Link は Steering Force を Inner Cylinder へ伝え、Axle/Wheel は機体前部の重量を支える。'
    ]
  },
  q_32_b894c6c4c531: {
    evidence_page_codes: ['D3-03', 'D3-04'],
    answer_lines: [
      'Gear Lever Lock は、機体が地上にある時に Landing Gear Lever が誤って UP Position に操作されることを防ぐ。',
      'Landing Gear Control Lever は Mechanical Lever Lock により UP 方向へ Lockout される。',
      '条件が成立すると PSEU が Ground を作り、Battery Bus 28V DC により Lever Lock Solenoid が Energize して Retract し、Lever Lock を Not Locked Position にして UP 操作を可能にする。',
      'Solenoid が Release しない場合は、Lever Lock Override Trigger を引いて Control Lever を UP Position へ動かすことができる。'
    ]
  },
  q_32_91a6d4f3fc0c: {
    evidence_page_codes: ['D3-01', 'D3-06', 'D3-07'],
    answer_lines: [
      'Landing Gear Transfer Valve は、Alternate Landing Gear Retraction および Alternate Nose Wheel Steering 時に Pressure Source を Hydraulic System A から Hydraulic System B へ切り替える。',
      'Automatic Operation で Alternate Position へ切り替わる条件は、Airplane が Air Mode、Landing Gear Lever が Not Down、いずれかの Main Landing Gear が Not Up、Left Engine N2 が 50%以下、Hydraulic System B Pressure が供給されていること。',
      'Manual Operation では、地上で Alternate Nose Wheel Steering Switch を ALT にし、System B Reservoir Quantity が Normal、Nose Air/Ground System が Ground Mode の時に切り替え可能。'
    ]
  },
  q_32_f41d9e653115: {
    evidence_page_codes: ['D0-01', 'D3-01', 'D4-01', 'D5-01'],
    answer_lines: [
      '通常、Landing Gear Extension/Retraction の Hydraulic Power Source は Hydraulic System A。',
      'Hydraulic System B は Alternate Pressure として Retraction のみに使用され、Landing Gear Transfer Valve が System A/B の Pressure Source を切り替える。',
      'Nose Wheel Steering は Landing Gear Extension Pressure から供給され、通常は System A、Alternate Nose Wheel Steering では Transfer Valve により System B が供給される。'
    ]
  },
  q_32_7c9ea94f2067: {
    evidence_page_codes: ['D4-08', 'D4-10', 'D4-04', 'D4-05'],
    answer_lines: [
      'Main L/G Extension は、Gear UP & Locked 状態から Gear Lever を DN にすると Selector Valve が Down Pressure を供給して始まる。',
      'Down Pressure は Transfer Cylinder を動かし、Uplock Actuator が Uplock Mechanism を Unlock するための Time Delay を作る。',
      'Uplock Actuator が Retract して Uplock Mechanism を Unlock し、その後 MLG Actuator Rod End Pressure が上昇して Actuator が Retract する。',
      'MLG は Actuator Force、自重、Airload により Extend し、Downlock Actuator が Retract、Downlock Spring とともに Downlock Mechanism を Locked Position にして Down Lock する。'
    ]
  },
  q_32_e37718b301c4: {
    evidence_page_codes: ['D5-05', 'D5-06', 'D5-03', 'D5-04'],
    answer_lines: [
      'Nose L/G Extension は、Gear UP & Locked 状態から Gear Lever を DN にすると Selector Valve が Down Pressure を供給して始まる。',
      'Down Pressure は Transfer Cylinder を動かし、Lock Actuator が Lock Mechanism を Unlock するための Time Delay を作る。',
      'Lock Actuator が Extend して Lock Mechanism を Unlock し、その後 NLG Actuator Rod End Pressure が上昇して Actuator が Retract する。',
      'NLG は Actuator Force、自重、Airload により Extend し、Down Position 到達後、Lock Actuator と Lock Spring が Lock Link を Locked Position にして Extended Position で Lock する。'
    ]
  },
  q_32_80360c501742: {
    evidence_page_codes: ['D4-08', 'D4-09', 'D4-10'],
    answer_lines: [
      'Main L/G Retraction は、Gear DN & Locked 状態から Gear Lever を UP にすると Selector Valve が Up Pressure を供給して始まる。',
      'Up Pressure Line の Flow Limiter は MLG Actuator への Flow を 8 gpm に制限し、他 System 用の Hydraulic Pressure を確保する。',
      'Up Pressure は Transfer Cylinder を動かし、Downlock Actuator が Extend して Downlock Mechanism を Unlock するための Time Delay を作る。',
      'Transfer Cylinder が End に達すると MLG Actuator Head End Pressure が上昇し、Actuator が Extend して MLG を Retract する。',
      'Uplock Roller が Uplock Hook と Engage し、Uplock Mechanism が Locked Position になる。Up Pressure は Gear Retract Brake System にも送られ Wheel Rotation を止める。'
    ]
  },
  q_32_ae539e6ac558: {
    evidence_page_codes: ['D5-05', 'D5-06', 'D5-03'],
    answer_lines: [
      'Nose L/G Retraction は、Gear DN & Locked 状態から Gear Lever を UP にすると Selector Valve が Up Pressure を供給して始まる。',
      'Up Pressure は Transfer Cylinder を動かし、Lock Actuator が Lock Link を Unlock するまで NLG Actuator の Full 加圧を遅らせる。',
      'Lock Actuator が Retract して Lock Mechanism を Unlock し、NLG Actuator Head End Pressure が上昇して Actuator が Extend することで NLG を Retract する。',
      'NLG が Up Position になると Lock Actuator と Lock Spring が Lock Link を Overcenter させ、Retracted Position で Lock する。'
    ]
  },
  q_32_9e1f6be992eb: {
    evidence_page_codes: ['D4-01', 'D4-09', 'D5-05'],
    answer_lines: [
      'Main Gear には Frangible Fitting 作動後の Hydraulic Fluid Loss を防ぐ Fuse があり、Frangible Fitting からの Flow が 180-250 in3 になると Up Pressure Line の Volume Fuse が閉じる。',
      'Nose Gear では Extension 側に Down Pressure Line の Rate Fuse があり、Hydraulic Flow が 10 gpm に増加すると閉じて Leak 時の Fluid Loss を防ぐ。',
      'Nose Gear Retraction 側には Up Pressure Line の Volume Fuse があり、Flow が 100-140 in3 に増加すると閉じて Leak 時の Fluid Loss を防ぐ。'
    ]
  },
  q_32_30e9f9d084fa: {
    evidence_page_codes: ['D3-02', 'D11-01', 'D11-02'],
    answer_lines: [
      'EXT/RET 系に関係する Flight Compartment の Indication は、Landing Gear Panel の Primary Position Light（3 Green/3 Red）と、P5 Aft Overhead Panel の Auxiliary Landing Gear Position Light（3 Green）。',
      'Green Light は各 Gear が Down and Locked になった時に点灯する。',
      'Red Light は Lever/Gear Position Disagree または Gear Not Down Warning の Visual Warning として点灯する。'
    ]
  },
  q_32_bfa2420ebed5: {
    evidence_page_codes: ['D5-04', 'D5-05'],
    answer_lines: [
      'Nose Gear Valve Manifold は、NLG Lock Actuator への Extension/Retraction Hydraulic Fluid を Control する。',
      '2 つの Restrictor と 2 つの Pressure Relief Valve を持ち、Lock Actuator への Flow を 0.4 gpm に制限して Lock Link に加わる力を減少させる。',
      'Pressure Relief Valve は NLG Backdrive によって Lock Actuator に発生する Excess Pressure を逃がし、3,150 psi で開く。'
    ]
  },
  q_32_d9713a9450a7: {
    evidence_page_codes: ['D4-06', 'D5-04'],
    answer_lines: [
      'L/G Transfer Cylinder は、Extension/Retraction Sequence 中に Time Delay を与える Component。',
      'MLG では Main Gear Actuator が Gear を動かす前に Downlock または Uplock Actuator が Unlock できるようにする。',
      'NLG では NLG Actuator を加圧する前に Lock Actuator が NLG を Unlock できるようにする。',
      'Up または Down Pressure が掛かると Cylinder 内の Piston が反対側へ移動し、その間 Gear Actuator の加圧開始を遅らせる。'
    ]
  },
  q_32_08a10f9dc9fd: {
    evidence_page_codes: ['D5-03', 'D5-06'],
    answer_lines: [
      'Nose L/G は Lock Mechanism が Over Center Device と 2 つの Bungee Spring を使って Up または Down Position で Lock する。',
      'Retraction 前に Lock Actuator が Retract して Lock Mechanism を Unlock し、NLG が Up Position になると Lock Actuator と Bungee Spring が Lock Link を Overcenter させ、Retracted Position で Lock する。',
      'Extension 前に Lock Actuator が Extend して Lock Mechanism を Unlock し、NLG が Down Position になると Lock Actuator と Lock Spring が Lock Link を Locked Position にして Extended Position で Lock する。'
    ]
  },
  q_32_1248004fb6d7: {
    evidence_page_codes: ['D6-01', 'D6-02', 'D6-03', 'D6-04'],
    answer_lines: [
      'Main L/G Manual EXT SYS の主要 Component は、Control Mechanism、Extension Linkage、Control Cable。Extension Linkage は Quadrant、Return Spring、Control Rod、Lever、Upper/Lower Lock Link で構成される。'
    ]
  },
  q_32_6a1f24c8d3e7: {
    evidence_page_codes: ['D7-01', 'D7-02'],
    answer_lines: [
      'Nose L/G Manual EXT SYS の主要 Component は、Release Mechanism と Control Cable。Release Mechanism は Quadrant、Cam、Cam Roller、Release Roller で構成される。',
    ]
  },
  q_32_9c4e17b2a6d8: {
    evidence_page_codes: ['D6-03', 'D6-04', 'D7-01', 'D7-02'],
    answer_lines: [
      'Manual EXT 用 Access Door を開くと Access Door Position Switch が Close し、Battery Bus 28V DC が Selector Valve の Manual Extend Solenoid Valve に送られる。',
      'Manual Extend Solenoid Valve は Bypass Valve を Bypass Position に動かし、Landing Gear Hydraulic Component を Hydraulic System Return に接続して Hydraulic Lock を防ぐ。',
      'Handle を引くと MLG は Uplock Mechanism が Unlock、NLG は Lock Link が Release され、Airload と自重で Downlock Position まで Extend する。'
    ]
  },
  q_32_c7846db4e5ee: {
    evidence_page_codes: ['D8-01', 'D8-02', 'D8-05', 'D8-06'],
    answer_lines: [
      'Nose Wheel Steering の主要 Component は、Alternate Nose Wheel Steering Switch、Steering Wheel、Control Cable、Rudder Pedal Steering Mechanism、Rudder Pedal Steering Rotary Actuator、Summing Mechanism、Steering Metering Valve Module、Steering Actuator、Nose Wheel Steering Collar。',
      '機械的には Steering Wheel/Rudder Pedal の Input が Cable Loop と Summing Mechanism を介して Metering Valve に入り、Hydraulic Flow が Steering Actuator へ送られる。Actuator Force は Steering Collar、Torsion Link、Inner Cylinder を介して Nose Wheel を旋回させる。'
    ]
  },
  q_32_3e8a61d7c2b5: {
    evidence_page_codes: ['D8-05', 'D8-06'],
    answer_lines: [
      'Steering Wheel Full Travel では Nose Wheel は左右 78°、Rudder Pedal Full Travel では左右 7°まで動く。',
    ]
  },
  q_32_8b2d57a4e1c9: {
    evidence_page_codes: ['D8-07', 'D8-08'],
    answer_lines: [
      'Alternate Nose Wheel Steering Switch は、地上で System B Reservoir Quantity が Normal、Nose Air/Ground が Ground Mode の時、Transfer Valve を Alternate Position にして Steering Pressure Source を System B に切り替えるために装備されている。'
    ]
  },
  q_32_af467f0240da: {
    evidence_page_codes: ['D8-03', 'D8-04', 'D8-08'],
    answer_lines: [
      'Rudder Pedal Steering Rotary Actuator は、Nose Gear が On Ground の時 Rudder Pedal Steering を Engage し、In Air になると Disengage する。',
      'Air/Ground Signal により Rotary Actuator が Eccentric Drum/Cam を動かし、Air Position では Clutch Arm が Steering Crank から離れて Rudder Pedal Input が Steering Cable へ伝わらない。',
      'Ground Position では Clutch Arm が Steering Crank Stop に接触し、Rudder Pedal の動きが Steering Quadrant へ伝わる。',
      'PSEU から Nose-On-Ground Signal がなくなると、Air/Ground Relay は 5 秒後に Air Position へ切り替わり Rotary Actuator を Disengage 側へ動かす。'
    ]
  },
  q_32_3670436842c9: {
    evidence_page_codes: ['D8-09'],
    answer_lines: [
      'Towing Lever を Tow Position にし、Lever Pin を挿入して保持する。',
      'Nose Wheel を 78°以上旋回させる場合は Torsion Link を切り離し、Lower Torsion Link を保持する。',
      'Nose Wheel を 90°以上旋回させる場合は Taxi Light Wire Bundle を切り離す。',
      'Tow Vehicle、Tow Bar、Nose/Main Wheel 周辺の危険領域に人を入れず、人・器材との間隔を最低 10 ft (3 m) 保つ。',
      'Hydraulic System A が加圧されている場合は NLG に近づかない。',
      'Nose Gear Steering Lockout Pin がない場合は、牽引前に Hydraulic System A Pressure が完全に抜けていることを確認する。',
      '正規の Pin を使用する。',
      'Sharp Turn 前には機体を前進させ、急な Start/Stop をしない。',
      'Towbarless Towing では Brake を掛けたり Oversteer しない。Abnormal Load 条件では該当 Task を参照する。'
    ]
  },
  q_32_ebe00e4d3c2a: {
    evidence_page_codes: ['D9-01', 'D9-02'],
    answer_lines: [
      'Two Position Tail Skid は、Takeoff または Landing 中に Over-Rotation が生じた場合、Aft Fuselage Structure と機体の気圧調節部分を Runway 接触から保護するために装備されている。',
      'Landing Configuration では Extend し、On-Ground、Takeoff、Cruise Configuration では Retract する。',
      'Tail Strike 時は Wear Shoe が滑走路に接触し、Cartridge Assembly が Energy を吸収する。大きな力では Cartridge が Crush し、さらに大きい力では Fuse Pin が Shear して構造損傷を防ぐ。'
    ]
  },
  q_32_2c9dfc84f99d: {
    evidence_page_codes: ['D9-02', 'D9-03'],
    answer_lines: [
      'Tail Skid に関する Flight Deck Indication はない。',
      'Inspection 上の Indication としては、Wear Shoe の 4 つの Wear Dimple と Skirt Fairing Aft Surface の Warning Placard がある。',
      'Wear Shoe の Material が Wear Dimple の Level まで摩耗した場合は Wear Shoe を交換する。',
      'Warning Placard は Cartridge の Crush 量を示し、Green 部分が見えなければ Cartridge が Limit まで Crush されているため直ちに交換する。'
    ]
  },
  q_32_9523d84063b2: {
    evidence_page_codes: ['D9-03', 'D9-04', 'D9-05'],
    answer_lines: [
      'Maintenance 目的で Tail Skid を Extend するには、E/E Compartment 内 J23 Junction Box 前方の Tail Skid Extend Switch を EXTEND Position に Hold する。',
      'Switch は通常 RETRACT Position に Guard されており、Guard が Close していると RETRACT Position になる。',
      'Tail Skid Actuator Solenoid Valve が Engage すると Actuator は Retract して Tail Skid を Extend し、Lock Link を Extended Position で Lock する。',
      '作動時は Tail Area の人員・器材が Clear であることを確認する。'
    ]
  },
  q_32_36e80e4dac28: {
    evidence_page_codes: ['D9-02', 'D9-03'],
    answer_lines: [
      'Tail Skid Inspection では Wear Shoe、Cartridge Assembly、Lock Pin/Lock Link、Warning Placard を確認する。',
      'Paint が Wear Shoe から擦り落とされている場合は Cartridge Assembly を点検し、Wear Shoe を Repaint する。',
      'Wear Shoe が Wear Dimple Level まで摩耗していれば Wear Shoe を交換する。',
      'Warning Placard の Green 部分が見えなければ Cartridge が Limit まで Crush されているため、直ちに Cartridge を交換する。',
      'Tail Skid を Retracted/Extended Position で Lock する場合は Ground Lock Pin を Lock Link に Install する。'
    ]
  },
  q_32_86b861cd74a3: {
    evidence_page_codes: ['D10-01', 'D10-02', 'D10-09'],
    answer_lines: [
      'Air/Ground System は、機体各 System へ Air Mode/Ground Mode の Discrete Signal と Relay Signal を供給するための System。',
      'PSEU が Landing Gear Compressed Sensor からの Signal を処理し、Air/Ground Relay を作動させ、各 System に Ground Mode/Air Mode、Left/Right/Nose Gear On Ground、Parking Brake Set On Ground などの情報を送る。',
      'この情報は Landing Gear Transfer Valve、L/G Position Indication/Warning、Speedbrake、Takeoff Warning、Door Warning など多くの System で使用される。'
    ]
  },
  q_32_7a0cb92ba19f: {
    evidence_page_codes: ['D10-01', 'D10-05', 'D10-06'],
    answer_lines: [
      'PSEU は Forward Equipment Compartment にあり、NLG Wheel Well 前方の Access Door から Access する。',
      'PSEU が Control/Monitor する主な System/Component は、Landing Gear Transfer Valve、Landing Gear Position Indicating and Warning、Speedbrake Deployed Indication、Takeoff Warning、Door Warning、Air/Ground Relay。',
      'さらに Air/Ground Sensor を Monitor し、Air/Ground Discrete Signal と Air/Ground Relay 情報を多くの機体 System へ供給し、Fault Indication と Maintenance BITE も提供する。'
    ]
  },
  q_32_559562e595d8: {
    evidence_page_codes: ['D10-02', 'D10-08', 'D10-09', 'D10-11'],
    answer_lines: [
      'PSEU Light は、PSEU の Fault、または Air/Ground System Override Mode を示す Amber Light。',
      'No-Dispatch Fault では、PSEU が Fault を検知し、Both Thrust Lever が 53°未満、Landing 後 30 秒以上で P5 Panel の Amber PSEU Light が点灯する。Fault が解消すると消灯する。',
      'Dispatch Fault でも同条件で点灯するが、Engine Shut Down または Parking Brake Set で消灯するため、PSEU BITE で確認が必要。',
      'Air/Ground System が Air Mode の時は、PSEU の Air Red Light と Overhead の PSEU Amber Light が点灯する。'
    ]
  },
  q_32_95afd7c716bf: {
    evidence_page_codes: ['D10-03', 'D10-10'],
    answer_lines: [
      'Air/Ground System の Sensor は、各 MLG に 2 つ、NLG に 2 つの Landing Gear Compressed Sensor。',
      'MLG Compressed Sensor は Right Outboard S1010、Right Inboard S1011、Left Outboard S1012、Left Inboard S1013。',
      'NLG Compressed Sensor は Left S1014、Right S1015。'
    ]
  },
  q_32_5d9a23e7b4c1: {
    evidence_page_codes: ['D10-10'],
    answer_lines: [
      'PSEU 前面 Placard の主な記載は、Sensor Rigging Aid、Instruction、BITE Menu Tree、Warning、Replacement Test Input Cycling Sequence。',
      'BITE Menu の主項目は Existing Faults、Fault History、Ground Tests、Air/Ground Override、Other Functions。'
    ]
  },
  q_32_4658291d4dd4: {
    evidence_page_codes: ['D11-01', 'D11-02'],
    answer_lines: [
      'L/G Position Indicating and Warning System の目的は、Flight Compartment に Landing Gear Position を表示し、着陸時に Gear が下がっていない場合 Pilot に Warning を与えること。',
      'PSEU は Gear Position Sensor、Control Lever Position、FCC Radio Altimeter、TE Flap、Horn Reset、Autothrottle Switch Pack などの Input を処理する。',
      'Gear が Intransit または Gear Not Down Warning の時は Red Position Light が点灯し、Gear が Down and Locked になると Primary/Auxiliary Green Light が点灯する。'
    ]
  },
  q_32_5e32c40a6a31: {
    evidence_page_codes: ['D11-01', 'D11-02', 'D11-04', 'D11-05', 'D11-06', 'D11-07'],
    answer_lines: [
      'MLG は Left/Right Main Gear Up and Locked Sensor 4 個、Left/Right Main Gear Downlock Sensor 4 個を使用する。',
      'NLG は Nose Gear Up/Down Lock Sensor 2 個、Nose Gear Down Sensor 2 個を使用する。'
    ]
  },
  q_32_7f1c46a9d2e8: {
    evidence_page_codes: ['D11-01', 'D11-02', 'D11-04', 'D11-05', 'D11-06', 'D11-07'],
    answer_lines: [
      'Flight Compartment では P2 Landing Gear Panel の Primary Position Light が 3 Green/3 Red、P5 Aft Overhead Panel の Auxiliary Position Light が 3 Green で表示される。',
      'Green は Gear Down and Locked、Red は Lever/Gear Position Disagree または Gear Not Down Warning を示す。'
    ]
  },
  q_32_f156399ccefc: {
    evidence_page_codes: ['D11-02', 'D11-04', 'D11-06'],
    answer_lines: [
      'Main Gear の LEFT GEAR Green Light は、Left MLG が Down and Locked Position になり、Downlock Sensor の Target が Sensor に近づくと点灯する。',
      'System 1 は Primary Position Green Light を作動し、System 2 は Auxiliary Position Green Light を作動する。',
      'Green Light は Gear が Down and Locked であることを Pilot に示す。'
    ]
  },
  q_32_350a86d18627: {
    evidence_page_codes: ['D11-02', 'D11-04', 'D11-06'],
    answer_lines: [
      'Main Gear の LEFT GEAR Red Light は、Control Lever と Gear Position が一致しない時、または Gear Not Down Warning の時に点灯する。',
      '具体的には、Lever Not Down で Gear Not Up and Locked の Retraction 中、または Lever Down で Gear Not Down and Locked の Extension 中に点灯する。',
      'さらに Gear が Not Down and Locked で、Control Lever Down、または Altitude 800 ft 未満かつ Left/Right Thrust Lever が 44°未満の Warning 条件でも点灯する。'
    ]
  },
  q_32_bf794019865d: {
    evidence_page_codes: ['D11-09', 'D11-10'],
    answer_lines: [
      'L/G Config Warning は、1 つ以上の Gear が Not Down and Locked で、Landing Gear Control Lever が Not Down の時に TE Flap/Altitude/Engine Thrust 条件で Steady Horn を作動させる。',
      '条件1: TE Flap <10 unit、Both Engine Idle または One Engine Not Run & Other Engine TRA 64 以下、Altitude 800-200 ft。この場合は Horn Reset 可能。',
      '条件2: TE Flap <10 unit、同じ Engine 条件、Altitude 200 ft 未満。この場合は Horn Reset 不可。',
      '条件3: TE Flap 15-25 unit、TE Flap Landing Warning Switch >10 unit、SMYD が 15-25 unit Signal、Engine Idle/Not Run 条件。この場合は Horn Reset 不可。',
      '条件4: TE Flap >25 unit、TE Flap Landing Warning Switch >10 unit、両 SMYD が >25 unit Signal、さらに Gear Lever Up 12 sec 以上または Engine Idle/Not Run 条件。この場合も Horn Reset 不可。'
    ]
  },
  q_32_48fc83945bf1: {
    evidence_page_codes: ['D12-01', 'D12-02', 'D12-03'],
    answer_lines: [
      'Tire 取り外し前には Tire から空気を抜く。',
      'Inflation Valve を外す時は、Valve 延長線上に人がいないことを確認する。',
      'Tire を規定以上に Inflate しない。',
      'Tie Bolt を外す前に Tire から空気を抜く。',
      'Tire Inflation には Nitrogen を使用する。Dry Air 使用時は酸素 5%以下を確認する。',
      '直読 Gage は正しく調整され、適切な目盛りであることを確認する。',
      'Axle Bearing 間に Grease を塗布しない。MLG/NLG とも Wheel and Tire Assembly は一度に1本ずつ取り外すことが推奨される。'
    ]
  },
  q_32_b56fbb854466: {
    evidence_page_codes: ['D12-02', 'D12-03'],
    answer_lines: [
      'MLG/NLG から一度に取り外す Tire and Wheel Assembly は 1 本とすることが推奨される。2 本同時に外すと Jack が外れた場合に構造損傷や人身傷害の恐れがある。',
      'MLG Wheel 取付時は、Wheel が Brake と同じ製造者であることを確認する。',
      'Brake Rotor が一線であることを確認し、Wheel Drive Key が Rotor と接触して損傷しないようにする。',
      'MLG Wheel 組立時は Outer Wheel Half の Ventilation Hole と Inner Wheel Half の Inflation Valve が一直線になることを確認する。'
    ]
  },
  q_32_a85a161cdffa: {
    evidence_page_codes: ['D12-02', 'D12-03'],
    answer_lines: [
      'Pressure Protection は Over Pressure Relief Valve で行う。MLG/NLG とも Outer Wheel Half にあり、Tire Pressure が 375-450 psi に上昇すると Pressure を逃がす。作動後は Relief Valve を交換する。',
      'Temperature Protection は MLG Wheel の Thermal Fuse Plug で行う。Inner Wheel Half に 4 個あり、Hot Brake による Tire 破裂を防ぐ。',
      'Thermal Fuse Plug は 380°F (192°C) で溶け、Tire Pressure を逃がす。溶けた場合は Fuse Plug を交換する。'
    ]
  },
  q_32_204a2cdafd09: {
    evidence_page_codes: ['D13-01', 'D13-05', 'D13-06', 'D13-07', 'D13-15'],
    answer_lines: [
      'Manual Braking System の主要 Component は、Brake Pedal Bus Mechanism、Brake Cable、Brake Metering Valve Assembly、Brake Shuttle Valve、Brake Assembly、および Normal/Alternate/Accumulator の Source 選択系。',
      'Brake Pedal を踏むと、Pedal の動きは Vertical Control Rod、Lower Bellcrank、Fore-Aft Control Rod、Brake Pedal Bus Crank Assembly、Cable Quadrant、Brake Cable を介して Brake Metering Valve へ伝わる。',
      'Metering Valve Input Shaft が回転し、Metering Valve Spool が作動して Brake と Feedback Chamber に Pressure を送る。',
      'この Pressure により Brake が掛かり、Feedback Force が Cable を通じて Brake Pedal に戻るため Pedal Feeling が発生する。',
      'Pedal を Release すると Spring が Spool を Closed Position に戻し、Brake Pressure は Return Line に戻って Brake が Release する。',
      'Normal Brake は Hydraulic System B、Alternate Brake は System B Pressure がない時に Hydraulic System A、Accumulator Brake は System A/B Pressure がない時に Accumulator Pressure を使用する。'
    ]
  },
  q_32_204db17de426: {
    evidence_page_codes: ['D13-01', 'D13-09', 'D13-11', 'D13-15'],
    answer_lines: [
      'Brake Press Indicator (P3) は Brake Pressure Transducer からの Signal により Brake Pressure を Monitor する。',
      'Normal Brake System 用 Transducer は、Autobrake Shuttle Valve 下流、Antiskid Valve 手前の Normal Metered Brake Pressure を測定する。',
      'Alternate Brake System 用 Transducer は、Alternate Brake Selector Valve 下流、Alternate Antiskid Valve 手前の Alternate Metered Brake Pressure を測定する。',
      'Accumulator Brake では、Accumulator Pressure が Normal Brake Metering Valve へ送られ、その Metered Pressure が Normal 側 Transducer/Indicator 系で確認される。'
    ]
  },
  q_32_4a7d19c6e3b2: {
    evidence_page_codes: ['D13-15'],
    answer_lines: [
      'Retraction Brake は、Landing Gear Retraction 中に Landing Gear Retract Pressure が Gear Retract Braking Actuator を加圧し、Alternate Metering Valve Spool を動かして Main Wheel の回転を止める。'
    ]
  },
  q_32_baf33caba7c1: {
    evidence_page_codes: ['D13-06', 'D13-07'],
    answer_lines: [
      'Brake Metering Valve は、Brake Pedal からの機械的 Input を受け、Brake に送る Hydraulic Pressure を調圧する Valve。',
      'Normal Metering Valve は Hydraulic System B または Accumulator Pressure を Normal Brake System に使用する。',
      'Hydraulic System B Pressure がない場合、Alternate Metering Valve は Hydraulic System A Pressure を Alternate Brake System に使用する。',
      'Retraction 中は Landing Gear Retract Pressure で Gear Retract Braking Actuator が Alternate Metering Valve を動かし、Main Wheel の回転を止めるため Brake Pressure を送る。'
    ]
  },
  q_32_489bcdf441c5: {
    evidence_page_codes: ['D12-01', 'D12-02', 'D12-03'],
    answer_lines: [
      'Tire/Wheel 取扱いでは、Tire 取り外し前および Tie Bolt 取り外し前に Tire を必ず Deflate する。',
      'Inflation Valve 取り外し時は Valve 延長線上に人がいないことを確認する。',
      'Tire を Over Inflate しない。Inflation は Nitrogen を使用し、Dry Air 使用時は酸素 5%以下を確認する。',
      'Pressure Gage は正確に調整された適切なものを使用する。',
      'Axle Bearing 間に Grease を塗布しない。',
      'MLG/NLG Wheel and Tire Assembly は一度に1本ずつ取り外すことが推奨される。',
      'MLG 取付時は Wheel と Brake の製造者、Brake Rotor の Align、Valve と Ventilation Hole の Align を確認する。'
    ]
  },
  q_32_4dca3fa3519c: {
    evidence_page_codes: ['D13-08', 'D13-09', 'D13-15'],
    answer_lines: [
      'Alternate Brake Selector Valve は、Normal Brake System へ Hydraulic System B Pressure を送るか、Alternate Brake System へ Hydraulic System A Pressure を送るかを選択する。',
      'Hydraulic System A/B が同圧の場合、System B Pressure は Alternate System への System A Pressure 供給を防ぎ、Normal Brake が使用される。',
      'Hydraulic System B Pressure がない場合、Alternate Brake Selector Valve が動き、Alternate Brake System へ System A Pressure を供給する。',
      'Accumulator Isolation Valve は、Alternate Brake System が Pressure を得た時に Close し、Brake Accumulator Pressure を保持する。',
      'System A/B Pressure がない場合、Accumulator Isolation Valve は Open し、Accumulator Pressure を Normal Brake Metering Valve へ送る。'
    ]
  },
  q_32_af0777763fb3: {
    evidence_page_codes: ['D14-02', 'D14-03', 'D14-04'],
    answer_lines: [
      'BTMS の主要 Component は、Brake Temperature Sensor 4 個、Brake Temperature Monitoring Unit (BTMU)、Brake Temperature Display (Lower Center Display Unit)、BRAKE TEMP Light。',
      'Brake Temperature Sensor は各 MLG Brake Housing に1個ずつ、各 Brake の 5:00 Position に取り付く。',
      'BTMU は E/E Compartment の E1-3 Shelf にある。',
      'Brake Temperature Display は Lower Center Display Unit に表示され、BRAKE TEMP Light は P3 Panel にある。'
    ]
  },
  q_32_72ade0c2385c: {
    evidence_page_codes: ['D14-02', 'D14-03', 'D14-05'],
    answer_lines: [
      'BRAKE TEMP Light は、いずれかの Brake Temperature Indication が 5.0 以上になると点灯する。',
      'すべての Brake Temperature が 3.5 未満に下がると Light は消灯する。',
      'SYS Display では Lower Center Display Unit に各 MLG Wheel の Brake Temperature が 0.0 (100°F) から 9.9 (1,200°F) の2桁で表示される。',
      '2.5 以上 5.0 未満では Solid White Warm Brake Symbol、5.0 以上では Amber Number と Solid Amber Symbol で Hot Brake Condition を示す。',
      'Display は P2 Panel の SYS Display Button を Push して確認する。'
    ]
  },
  q_32_5d508fd63c6b: {
    evidence_page_codes: ['D14-04'],
    answer_lines: [
      'Brake Temperature Sensor は Bi-Metal Thermocouple Type。',
      'Sensor Assembly は Bi-Metal Thermocouple、Mounting Flange、Connector で構成される。',
      '測定範囲は 100°F から 1,200°F。Sensor は Brake 間で Interchangeable で、調整はできない。'
    ]
  },
  q_32_4e955561bd26: {
    evidence_page_codes: ['D15-01', 'D15-02', 'D15-03', 'D15-04'],
    answer_lines: [
      'Parking Brake System の主要 Component は、Parking Brake Lever、Parking Brake Linkage、Parking Brake Switch、Parking Brake Shutoff Valve、Parking Brake Light、Parking Brake Repeater Light、Parking Brake Close Sense Relay。',
      'Parking Brake Lever は Control Stand にあり、Parking Brake Linkage は Captain Brake Pedal 下側の Forward Equipment Compartment にある。',
      'Parking Brake Shutoff Valve は MLG Wheel Well の Aft Bulkhead にある。',
      'Red Parking Brake Light は Control Stand 付近にあり、Repeater Light は External Power Panel にある。'
    ]
  },
  q_32_c929b3936084: {
    evidence_page_codes: ['D15-02', 'D15-04', 'D15-05'],
    answer_lines: [
      'Control Stand/P8 側の Red Parking Brake Light は、Parking Brake Shutoff Valve の Position Switch によって Valve が Closed Position になったことを Monitor する。',
      'P19 External Power Panel の Parking Brake Repeater Light は、Parking Brake Switch が Set Position になったことを Monitor する。',
      'Parking Brake Switch は PSEU に Lever Set/Not Set Signal も送り、Takeoff Warning および Parking Brake Set On Ground Signal に使用される。'
    ]
  },
  q_32_485743d35d8d: {
    evidence_page_codes: ['D15-01', 'D15-04', 'D15-05', 'D16-16'],
    answer_lines: [
      'Parking Brake System は Normal Hydraulic Brake System を使用し、Brake Pedal を Apply Position に機械的に保持して Brake Metering Valve を Open Position に Lock する。',
      'PSEU へは Parking Brake Set Signal を送り、Takeoff Warning と Parking Brake Set On Ground Signal に関係する。',
      'Antiskid/Autobrake System へは Parking Brake Shutoff Valve Position が Parking Brake Close Sense Relay を介して送られ、AACU BITE Card が Parking Brake Shutoff Valve Failure/Disagree を Monitor する。',
      'Parking Brake Shutoff Valve が Commanded Position にない、または Open しない場合、Antiskid Fault として ANTI SKID INOP Light が点灯する。'
    ]
  },
  q_32_fe6b18e13d28: {
    evidence_page_codes: ['D16-01', 'D16-02'],
    answer_lines: [
      'Antiskid System の目的は、Brake 使用時に Wheel Skid を防ぐように Brake Pressure を Control すること。',
      'Hydraulic Brake System からの Metered Brake Pressure または Autobrake Pressure を制御し、全ての Runway Condition で Skid させずに最大 Brake Force を得る。',
      'AACU は Wheel Speed Data と Ground Speed/Air-Ground 情報を使い、Skid Condition では Antiskid Valve に Signal を送り Brake Pressure を Release する。'
    ]
  },
  q_32_e793057d46a7: {
    evidence_page_codes: ['D16-01', 'D16-15'],
    answer_lines: [
      'Antiskid System の機能は、Skid Control、Locked Wheel Protection、Touchdown Protection、Touchdown/Hydroplane Protection、Gear Retract Braking Inhibit の5つ。',
      'Skid Control は Wheel 減速度が大きすぎる時 Brake Pressure を Release する。',
      'Locked Wheel Protection は左右同種 Wheel の Speed を比較し、遅い Wheel 側の Brake Pressure を Release する。',
      'Touchdown Protection は In Air/接地直後に Brake Pressure を Release し、Touchdown/Hydroplane Protection は Wheel Speed が Ground Speed より大きく低い場合に Release する。',
      'Gear Retract Braking Inhibit は Retraction 中に Alternate Antiskid を一時不作動にし、Gear Retract Brake による Wheel Stop を妨げない。'
    ]
  },
  q_32_fd86f9a60f11: {
    evidence_page_codes: ['D16-01', 'D16-15'],
    answer_lines: [
      'Skid Control: 計算 Wheel Speed と実 Wheel Deceleration を比較し、減速度が大きすぎる時 Brake Pressure を Release する。8 kt 未満では作動しない。',
      'Locked Wheel Protection: Inboard/Outboard Pair の Wheel Speed を比較し、遅い Wheel が速い Wheel より30%以上低下すると遅い Wheel の Brake Pressure を Release する。25 kt 未満では不作動。',
      'Touchdown Protection: In Air 中、および Wheel Spin Up 70 kt から0.5秒または Ground Mode 3秒連続まで Wheel 2/4 の Brake Pressure を Release する。',
      'Hydroplane Protection: Wheel Speed が ADIRU Ground Speed より50 kt以上低い時 Brake Pressure を Release する。Wheel 1/3 に Protection を与える。',
      'Gear Retract Braking Inhibit: Gear Lever UP 後12.5秒間 Alternate Antiskid を不作動にし、Gear Retract Braking 中の Brake Release を防ぐ。'
    ]
  },
  q_32_84f81a7e199f: {
    evidence_page_codes: ['D16-02', 'D16-05', 'D16-06', 'D16-07', 'D16-09'],
    answer_lines: [
      'Antiskid Control System の主要 Component は、Antiskid Valve 6 個、Wheel Speed Transducer 4 個、Landing Gear Lever Up Switch、Alternate Brake Pressure Switch S811、AACU、ANTI SKID INOP Light。',
      'AACU は E/E Compartment E1-3 Shelf にある。',
      'Normal Antiskid Valve は MLG Wheel Well Aft Bulkhead に4個、Alternate Antiskid Valve は MLG Wheel Well 天井 Outboard Side に2個ある。',
      'Transducer は各 Main Landing Gear Axle Adapter Assembly に1個ずつある。',
      'ANTI SKID INOP Light は Flight Compartment P2 Panel にある。'
    ]
  },
  q_32_e1d6d52f8170: {
    evidence_page_codes: ['D16-02', 'D16-06', 'D16-16'],
    answer_lines: [
      'Antiskid の不具合は、AACU の BITE Card が Fault を検知し、Flight Compartment の Amber ANTI SKID INOP Light を点灯させることで分かる。',
      'Fault 対象は Inboard/Outboard Antiskid Card Fault、Antiskid Power Fault、Normal Antiskid Valve Fault、Speed Switch Fault、Transducer Fault、Parking Brake Lever/Shutoff Valve Disagree、Display Test Active など。',
      'Alternate Brake Selector Valve が加圧される場合は、Alternate Antiskid Valve Fault や Transducer/Card/Power Fault も ANTI SKID INOP Light 点灯条件になる。',
      'AACU の BITE Function で Fault 表示と Antiskid/Autobrake System Test が実施できる。Antiskid Fault がある場合 Autobrake は作動しない。'
    ]
  },
  q_32_06c192d35891: {
    evidence_page_codes: ['D16-01', 'D16-03', 'D16-17'],
    answer_lines: [
      'Autobrake System の目的は、着陸後または Rejected Takeoff (RTO) 時に、選択された減速率または Full Pressure で Brake Pressure を自動制御し機体を停止させること。',
      'Landing では AUTO BRAKE Select Switch の 1/2/3/MAX で選択した Deceleration を維持するよう Metered Pressure を Control する。',
      'RTO では Pilot が 88 kt 以上の Ground Speed で Rejected Takeoff を行った場合、Wheel Brake に Full Pressure を加えて機体を停止させる。',
      'Autobrake は Normal Brake System を使用し、Alternate Hydraulic Brake System では作動しない。'
    ]
  },
  q_32_b159b1628df9: {
    evidence_page_codes: ['D16-18', 'D16-19', 'D16-20', 'D16-21'],
    answer_lines: [
      'Landing Mode 1/2/3/MAX は、AUTO BRAKE Select Switch を Deceleration Position にし、Air/Ground/Thrust Lever/ADIRU/Antiskid/Autobrake Fault/Normal Metered Pressure 条件が揃うと Arm する。',
      'Landing Application は、Landing Autobrake Armed、Both Thrust Lever Idle、Air/Ground Ground Mode 0.2 sec以上、Wheel Spin Up Detection または Spin Up Latch Set で Brake をかける。',
      '減速率/最大 Pressure は、1: 4 ft/sec2・1285 psi、2: 5 ft/sec2・1500 psi、3: 7.2 ft/sec2・2000 psi、MAX: 14 ft/sec2 (>80 kt) / 12 ft/sec2 (<80 kt)・3000 psi。',
      'RTO は、Switch RTO、Faultなし、両 Air/Ground Ground、平均 Wheel Speed 60 kt未満、Normal Antiskid Faultなし、両 Thrust Lever Idle、Solenoid/Control Valve Pressure 1000 psi未満で Arm する。',
      'RTO Application は、RTO Armed、両 Thrust Lever Idle、平均 Wheel Speed 88 kt以上、Normal Antiskid Faultなし、Normal Metered Pressure 750 psi未満で Full Hydraulic Pressure を送る。'
    ]
  },
  q_32_c8f8fece9b1c: {
    evidence_page_codes: ['D16-03', 'D16-04', 'D16-05', 'D16-06', 'D16-11', 'D16-13'],
    answer_lines: [
      'Autobrake System の主要 Component は、AACU、Autobrake Select Switch、Autobrake Pressure Control Module、Autobrake Shuttle Valve 2 個、AUTO BRAKE DISARM Amber Light。',
      'Autobrake Select Switch、AUTO BRAKE DISARM Light、ANTI SKID INOP Light は Flight Compartment P2 Panel にある。',
      'AACU は E/E Compartment E1-3 Shelf にある。',
      'Autobrake Pressure Control Module は MLG Wheel Well の天井にある。',
      'Autobrake Shuttle Valve 2 個は MLG Wheel Well の Aft Bulkhead にある。'
    ]
  },
  q_32_ba65ad60ccd1: {
    evidence_page_codes: ['D16-03', 'D16-12', 'D16-17', 'D16-19', 'D16-21', 'D16-22'],
    answer_lines: [
      'Autobrake の不具合は、AACU BITE Card/Autobrake Card が Fault Signal を出し、AUTO BRAKE DISARM Amber Light が点灯することで分かる。',
      'Autobrake Pressure Control Module の Solenoid Valve Pressure Switch と Control Valve Pressure Switch は Valve 作動を Monitor し、Fault 時は AACU が Autobrake を Disarm する。',
      'AUTO BRAKE DISARM Light は Autobrake System Fault、Antiskid System Fault、Manual Disarm、Landing/RTO Disarm Logic True、Arming Fault、Light Test などで点灯する。',
      'Landing Disarm 条件には OFF、Normal Metered Pressure 750 psi以上、接地後3秒以降の Thrust Lever Advance、Speedbrake Down、Normal Antiskid Fault、Autobrake Fault、ADIRU Input Invalid がある。',
      'RTO Disarm 条件には OFF、両 Air/Ground Air Mode、Normal Metered Pressure 750 psi以上、Thrust Lever Advance、Autobrake/Antiskid Fault、Speedbrake Down がある。'
    ]
  },
  q_32_5e187c5cdd5e: {
    evidence_page_codes: ['D16-06', 'D16-14', 'D16-15', 'D16-16', 'D16-17', 'D16-22'],
    answer_lines: [
      'AACU は Antiskid/Autobrake Control Unit で、Antiskid、Autobrake、および関連 BITE Function の Circuit Card を持つ。',
      'Card は Outboard Antiskid Card、Inboard Antiskid Card、Autobrake Card、BITE Card で構成される。',
      'Antiskid では Wheel Speed/ADIRU/Air-Ground 等の Input を使い、Antiskid Valve へ Brake Release Input を送る。',
      'Autobrake では Select Switch、Thrust Lever、PSEU、ADIRU、Pressure Switch 等の Input を使い、Autobrake Pressure Control Module へ Brake Application Input を送る。',
      'Fault Monitor、ANTI SKID INOP/AUTO BRAKE DISARM の制御、Built In Test による Fault 表示と System Test も行う。'
    ]
  },
  q_32_20d5a32a39dc: {
    evidence_page_codes: ['D3-02', 'D13-02', 'D13-03', 'D13-04', 'D16-05'],
    answer_lines: [
      '問題文に「下記図面番号」とあるが、CSV化された設問には図面番号のリストが抽出されていないため、番号別の正式名称を一意に確定できない。',
      '参照すべき Component Location は、Landing Gear Control/Indication では D3-02、Hydraulic Brake では D13-02/D13-03/D13-04、Antiskid/Autobrake では D16-05。',
      '代表例として、Landing Gear Control Lever は P2 Center Forward Panel、PSEU は Forward Equipment Compartment、Selector Valve/Transfer Valve は MLG Wheel Well、Brake Pressure Indicator は P3、Brake Metering Valve/Alternate Brake Selector/Accumulator Isolation Valve/Brake Transducer/Shuttle Valve は MLG Wheel Well、AACU は E/E Compartment E1-3、Autobrake Pressure Control Module は MLG Wheel Well 天井にある。',
      'Webアプリ上で元図の番号が確認できたら、その番号ごとに Component Name / Location / Function を追記する。'
    ],
    status: 'reviewed_draft_needs_figure'
  }
};
