const reviewedByQuestion = [
  ['q_34_f76f01bf8785', ['D0-01', 'D0-03'], ['PITOT', 'STATIC PORT', 'LOCATION'], [
    'Pitot Probe は3個。Captain Pitot は機体左側、F/O Pitot と Auxiliary Pitot は機体右側にある。',
    'Static Port は6個。Captain、F/O、Alternate の各 Static Port が左右両側に1個ずつある。',
    'Alternate Static Port は左右1個ずつの計2個で、Alternate Static 系に使用される。'
  ]],
  ['q_34_94788f959f49', ['D0-01', 'D1-03', 'D1-04'], ['ADM', 'AIR DATA MODULE', 'PITOT', 'STATIC'], [
    'ADM は Air Data Module。Pitot/Static 圧力を電気信号、ARINC 429 Data に変換して ADIRU へ送る。',
    'Pitot Pressure ADM は Forward Equipment Compartment にある。',
    'Static Pressure ADM は Forward Cargo Compartment の Ceiling Panel にある。'
  ]],
  ['q_34_c51718d66f74', ['D0-01', 'D0-04'], ['ALTERNATE', 'ISFD', 'CABIN DIFFERENTIAL'], [
    'Alternate Pitot、つまり Auxiliary Pitot からの Pitot Pressure は ISFD に送られる。',
    'Alternate Static Port からの Static Pressure は ISFD と Cabin Differential Pressure Indicator に送られる。'
  ]],
  ['q_34_0a498ca7523b', ['D0-02', 'D0-04', 'D0-05'], ['DRAIN', 'BAYONET', 'GRAVITY'], [
    'Captain/F/O Pitot Line と各 Static Line には Drain Fitting がある。Auxiliary Pitot は Probe が最低点のため専用 Drain はない。',
    'Drain は Bayonet Cap を外し、Cap Depressor を Valve に入れて、液体を Gravity Drain させる。',
    'Captain/F/O Pitot Drain は Forward Equipment Compartment Access Door 付近、Alternate Static Drain は E/E Compartment E5 Rack 下方にある。'
  ]],
  ['q_34_bf722f01b039', ['D1-01', 'D1-13', 'D1-22'], ['ADIRU', 'ADR', 'IR'], [
    'ADIRU は ADR Section と IR Section を持つ。',
    'ADR Section は Pitot/Static、TAT、AOA、Baro Correction などから Airspeed、Altitude、Temperature などの Air Data を計算する。',
    'IR Section は Accelerometer と Laser Gyro により Attitude、Heading、Groundspeed、Present Position などの Inertial Reference Data を計算する。'
  ]],
  ['q_34_e579f9a28714', ['D1-02', 'D1-03', 'D1-04'], ['LOCATION', 'ADIRU', 'E/E'], [
    'Left/Right ADIRU は E/E Compartment にある。',
    '関連Componentとして、ISDU、MSU、IRS Master Caution Unit は Flight Compartment 側、Pitot ADM は Forward Equipment Compartment、Static ADM は Forward Cargo Compartment Ceiling Panel にある。',
    'AOA Sensor は機体左右、TAT Probe は機体左側にある。'
  ]],
  ['q_34_f1854f952252', ['D1-01', 'D1-09', 'D1-13'], ['ADR', 'INPUT', 'PITOT', 'STATIC', 'TAT', 'AOA'], [
    'ADR Section への主な入力は、Pitot Pressure、Static Pressure、TAT、AOA、CDS からの Barometric Correction、IR Data。',
    '設問が5つ指定なら、Pitot Pressure、Static Pressure、TAT、AOA、Barometric Correction を答えればよい。'
  ]],
  ['q_34_9365b06ef2cb', ['D1-01', 'D1-13', 'D1-22'], ['IR', 'INPUT', 'ACCELEROMETER', 'GYRO'], [
    'IR Section への主な入力は、3個の Accelerometer、3個の Laser Gyro、Initial Present Position、Heading Data。',
    'さらに計算補助として ADR からの Air Data も使用される。'
  ]],
  ['q_34_73f510d4c90c', ['D1-01', 'D1-03', 'D1-09'], ['ALTERNATE VMO/MMO', 'GEAR DOWN'], [
    'Alternate VMO/MMO Switch は E/E Compartment にある。',
    'Landing Gear Down and Locked で Dispatch する場合に使用し、ADIRU へ入力して Gear Down 状態用の VMO/MMO Curve に切り替え、Overspeed Warning を使用可能にする。'
  ]],
  ['q_34_8b25faf9203f', ['D1-08', 'D1-14'], ['IRS MASTER CAUTION', 'FAULT', 'ON DC'], [
    'IRS Master Caution Unit は ADIRS の Fault、ON DC、DC FAIL などを Monitor する。',
    'ADIRU から Fail/ON DC Discrete を受け、MSU、Master Caution Annunciator、Master Caution Light へ Warning/Annunciation を出す。'
  ]],
  ['q_34_e5cd4ecb58ce', ['D1-06'], ['DC POWER', 'LEFT ADIRU', 'RIGHT ADIRU'], [
    'ADIRU の通常電源は AC Power。AC Power が使えない場合は Battery DC Power で作動する。',
    'Left ADIRU は 28V DC Sw Hot Battery Bus で、Battery が18V DC未満になるまで作動を継続する。',
    'Right ADIRU は IFSAU 内の Time Delay Circuit 経由で DC Power を受けるが、DC Operation 継続5分後に Relay が De-energize し、Right ADIRU は Battery 消費を抑えるため切り離される。'
  ]],
  ['q_34_3d69c4106fd6', ['D1-07'], ['GROUND CREW HORN', 'ON DC', 'COOLING'], [
    'Ground Crew Call Horn は、機体が地上にあり、ADIRU が DC Power で作動している時に作動する。',
    'また、地上で Equipment Cooling Air Flow が Fail した場合にも、IFSAU の Logic により Crew Call Horn が作動する。',
    'いずれも Discrete が20秒Delay後に AND Logic へ入り、Air/Ground Relay が Ground Position の時に Horn Relay を励磁する。'
  ]],
  ['q_34_c43767f6e1ea', ['D1-13', 'D1-35', 'D1-36'], ['ISDU', 'DSPL SEL', 'TEST', 'TK/GS', 'PPOS', 'WIND', 'HDG/STS'], [
    'TEST は ISDU/ADIRU の Test 表示用。',
    'TK/GS は Track と Ground Speed、PPOS は Present Position、WIND は Wind Data を表示する。',
    'HDG/STS は Heading と Status を表示し、Alignment 中は残り時間や Maintenance/Status Code の確認にも使用する。'
  ]],
  ['q_34_94bc7bede788', ['D1-14'], ['MSU', 'ALIGN', 'NAV', 'ATT'], [
    'ALIGN は ADIRU Alignment を開始する Position。',
    'NAV は Alignment 完了後、ADIRU を Navigation Mode に入れる Position。',
    'ATT は Attitude Mode として使用する Position。'
  ]],
  ['q_34_6c1d7e90a2b4', ['D1-14'], ['MSU', 'FAULT', 'IR FUNCTION'], [
    'MSU の FAULT Light は ADIRU の IR Function Fail を示す Amber Light。'
  ]],
  ['q_34_cc21bf6c985d', ['D1-27'], ['STD', 'BAROMETRIC', '29.92', '1013'], [
    'EFIS Control Panel の STD Switch を押すと、Barometric Standard の 29.92 inHg、1013 hPa が Set される。',
    'PFD の Altitude Tape 下方に Standard Barometric Correction として STD が表示される。',
    'Transition Altitude +300 ft 以下では Yellow Boxed STD になる条件がある。新しい Baro 値を Set して再度 STD を押すと STD が解除され、その値が Active になる。'
  ]],
  ['q_34_312823f8cc17', ['D1-29', 'D1-30', 'D1-31', 'D1-32', 'D1-33', 'D1-34'], ['ALIGNMENT', 'PRESENT POSITION', 'LAST POS', 'GPS', 'ISDU'], [
    'MSU Mode Selector を OFF から NAV に動かすと Alignment Mode が開始する。',
    'Present Position は、FMC CDU の LAST POS Line から Transfer、REF AIRPORT/Gate Position から Transfer、CDU Keyboard による Scratchpad 入力で Set できる。',
    'さらに CDU POS REF Page の GPS L/R Position を Transfer する方法、ISDU Keyboard で Latitude/Longitude を入力する方法がある。'
  ]],
  ['q_34_ed317e422748', ['D2-01', 'D2-02'], ['OVERSPEED', 'VMO', 'MMO', 'CLACKER'], [
    'Overspeed Warning System の目的は、機体が VMO または MMO を超えた時に Flight Crew へ Aural Warning を与えること。',
    'ADIRU が Overspeed Signal を出し、Aural Warning Module が Clacker Sound を発生させる。'
  ]],
  ['q_34_ff8ee8a47961', ['D2-02', 'D2-03'], ['OVERSPEED', 'ADIRU', 'AURAL WARNING MODULE', 'TEST SWITCH'], [
    '主要Componentは ADIRU、Aural Warning Module、Mach Airspeed Warning Test Switch。',
    'Test Switch は Flight Recorder/Mach Airspeed Warning Panel の一部で、No.1 は Left ADIRU、No.2 は Right ADIRU の Overspeed Warning Circuit を Test する。',
    'Aural Warning Module は Forward Electronics Panel Bottom、Test Panel は Aft Overhead Panel にある。'
  ]],
  ['q_34_4bd73e74e5a9', ['D3-01', 'D3-02'], ['RADIO ALTIMETER', 'VERTICAL DISTANCE', '2500', 'E3'], [
    'RA System の目的は、Airplane から Ground までの Vertical Distance、つまり Radio Altitude を計測して Flight Compartment Display と他Systemへ供給すること。',
    '作動Rangeは -20 ft から 2,500 ft。',
    'RA Receiver/Transmitter は E/E Compartment の E3 Rack にある。'
  ]],
  ['q_34_f6287c8a120b', ['D3-01', 'D3-04'], ['RA DATA', 'FCC', 'GPWC', 'TCAS', 'WXR', 'DEU'], [
    'RA Data を使用する主なSystemは、FCC A/B、DEU 1/2、Weather Radar R/T、GPWC、FDAU、HUD/HGS Computer、TCAS Computer の7つ。',
    'FCC は Approach/Low Altitude/Autothrottle 計算、WXR は PWS、GPWC は Warning Logic、TCAS は Sensitivity/Intruder 判定、DEU は表示に使用する。'
  ]],
  ['q_34_d8d9d8064329', ['D3-01', 'D3-02', 'D3-05'], ['RA ANTENNA', 'TRANSMIT', 'RECEIVE'], [
    'RA Antenna は機体下部にある。',
    'RA System は4個の Antenna を使用し、各 R/T に専用の Transmit Antenna と Receive Antenna がある。',
    'System 1 の Altitude は Captain Display、System 2 の Altitude は First Officer Display に表示される。'
  ]],
  ['q_34_1b3f65910c84', ['D3-06', 'D3-07'], ['RA DISPLAY', 'RADIO MINIMUMS', 'RISING RUNWAY'], [
    'Radio Altitude は -20 ft から 2,500 ft の間で White 表示され、2,500 ft 以上では表示されない。',
    'Radio Minimums は Digital RA Display の下に Green で表示され、選択値に達すると RA と Minimums が Amber で3秒点滅し、その後 Amber 表示が継続する。',
    'Radio Altitude が2,500 ft未満で ILS Localizer Deviation が表示されている時、Rising Runway Symbol が ADI Bottom に表示される。',
    'Invalid RA Data では Amber RA Flag が表示され、Rising Runway は消える。'
  ]],
  ['q_34_6e5cd9aa5e07', ['D3-05'], ['RA ANTENNA', 'DO NOT PAINT', 'O-RING'], [
    'RA Antenna の Radiation Surface または Back Plate に Paint してはいけない。Paint は RF Signal の送受信を妨げる。',
    'Antenna には FWD と DO NOT PAINT の Red Marking がある。',
    'Coax Connector 周りの O-ring Seal は Moisture Protection 用なので、取扱い時に損傷させない。'
  ]],
  ['q_34_d2cabc84b204', ['D4-01'], ['WXR', 'WEATHER', 'WINDSHEAR', 'LAND CONTOUR'], [
    'WXR System が検知・表示するものは、Weather Condition、Windshear Event、Land Contour の3つ。'
  ]],
  ['q_34_3ac405863a3d', ['D4-03', 'D4-09', 'D4-10'], ['WXR COMPONENT', 'CONTROL PANEL', 'ANTENNA', 'R/T'], [
    '主要Componentは WXR Control Panel、WXR Receiver/Transmitter、R/T Mount、WXR Antenna、L/R EFIS Control Panel など。',
    'WXR Control Panel は P8 Aft Electronic Panel、L/R EFIS CP は P7、WXR R/T と Mount は Forward Equipment Compartment にある。',
    'WXR Antenna は Nose Radome 内、Forward Bulkhead 後方にある。'
  ]],
  ['q_34_e0f82dbd90cc', ['D4-04', 'D4-07', 'D4-11', 'D4-14', 'D4-15'], ['WXR ON', 'EFIS', 'PWS'], [
    'WXR を作動させる方法は、どちらかの EFIS Control Panel の WXR Map Switch を押すこと。',
    'PWS は Takeoff 中、On Ground で Thrust Lever が53度TRAを超えるなどの条件で自動的に Active になる。',
    'Approach 中は、2,300 ft Radio Altitude 以下へ降下すると PWS が自動的に Active になる。'
  ]],
  ['q_34_8fee352f5bf2', ['D4-07', 'D4-11', 'D4-14', 'D4-15'], ['WXR OFF', 'TERR', 'DEACTIVE'], [
    'WXR R/T の作動停止は、両方の EFIS Control Panel の WXR Map Switch を Off にする。',
    'EFIS Control Panel の TERR Switch を選ぶと、表示系は Terrain Data 側に切り替わり WXR Data 表示は外れる。',
    'PWS は Takeoff 後 2,300 ft AGL 以上、または Approach 後の Landing/Climb 条件などで自動的に Deactive になる。'
  ]],
  ['q_34_e21066425fda', ['D4-02', 'D13-06'], ['TERR/WXR RELAY', 'TERRAIN DATA'], [
    'WXR Radar Echo と GPWC Terrain Data は同じND上で同時重ね表示する方式ではなく、Terrain/Weather Relay によりどちらのDataをDEUへ送るか切り替える。',
    'TERR が選択された時、または Terrain Caution/Warning の Pop Up 時は Terrain Data が表示され、通常位置では WXR Data が表示される。'
  ]],
  ['q_34_1f8a6d43c2e7', ['D4-04'], ['WXR R/T', 'MOUNT FAN', 'TEST SWITCH'], [
    'WXR R/T Mount Fan は WXR R/T のCooling用で、R/Tが作動すると115V ACでFanが作動する。Mount の Test Switch でFan Testもできる。'
  ]],
  ['q_34_df6829c89450', ['D4-13', 'D4-14', 'D4-15'], ['PWS', 'PREDICTIVE WINDSHEAR'], [
    'PWS は Predictive Windshear Mode の略。',
    '0.5 NM から3 NM 前方の Windshear Threat を検知し、位置、距離、Takeoff/Approach Phase により Caution または Warning を出す。',
    'PWS は WXR Mode なしでも作動でき、WXR Mode と Time Share でも作動できる。PWS中は最適検知のため Antenna Tilt が自動制御される。'
  ]],
  ['q_34_bed81341c1af', ['D4-10'], ['WXR', 'RADOME', 'MICROWAVE', 'WARNING'], [
    'Wind が15 ktを超える時は Nose Radome を開けない。',
    'System 作動中で Radome が開いている場合、Weather Radar Antenna に近づかない。',
    'Antenna が Microwave Energy を送信している間、Antenna Surface に触れない。Antenna 動作による挟まれ、接触にも注意する。'
  ]],
  ['q_34_5654a698948a', ['D4-09', 'D4-12'], ['WXR FAULT', 'TEST', 'DEU'], [
    'WXR R/T は Fault Status と Test Data を DEU に送り、Display Unit に WXR System Message や Test Pattern を表示できる。',
    'R/T Front Panel には Coax Test Connector と Test Connector があり、System Operation Test と Monitor を行う。',
    'したがって不具合状況は、ND/DU の WXR Message/Test 表示および WXR R/T のTest/BITEで確認する。'
  ]],
  ['q_34_1623960d11e7', ['D4-10'], ['DISABLE SWITCH', 'ELEVATION', 'SCAN'], [
    'WXR Antenna Pedestal には Elevation Disable Switch と Scan Disable Switch がある。',
    'これらは Elevation Motor と Scan Motor への Power を取り除き、Maintenance 中に Antenna が動かないようにするためのSwitch。',
    'ただし、これらの Switch では WXR R/T からの RF Transmission は停止しない。'
  ]],
  ['q_34_2b94a1dd9592', ['D5-01'], ['ILS', 'LOCALIZER', 'GLIDESLOPE'], [
    'ILS は Runway Approach のために Localizer による水平誘導と Glideslope による垂直誘導を与える System。',
    'MMR の ILS Function が Localizer/Glideslope 信号を受け、Approach と Landing のGuidance/Displayに使用する。'
  ]],
  ['q_34_7e1033d512fd', ['D5-01', 'D5-02'], ['ILS COMPONENT', 'MMR', 'LOCALIZER', 'GLIDESLOPE'], [
    '主要Componentは MMR 1/2、Glideslope Antenna、Localizer Antenna、VOR/LOC Antenna、LOC Antenna Switch、NAV Control Panel、EFIS/DU/ACP など。',
    'MMR 1 は E/E Compartment E1-2、MMR 2 は E1-4 にある。',
    'Glideslope Antenna と Localizer Antenna は Nose Radome 内、VOR/LOC Antenna は Vertical Stabilizer 上部にある。'
  ]],
  ['q_34_6623a69898ee', ['D5-04', 'D5-05'], ['ILS DISPLAY', 'DEU', 'ISFD'], [
    'ILS 情報は CDS の PFD/ND に Localizer/Glideslope Deviation として表示される。',
    'ISFD でも APP Mode 選択時に Localizer と Glideslope Deviation が表示される。',
    'DEU は ILS Display Data を処理し、FCC/FMC/GPWC なども ILS Data を使用する。'
  ]],
  ['q_34_7bdd0f4e4653', ['D5-02', 'D5-05'], ['VOR/LOC', 'LOC ANTENNA SWITCH'], [
    'ILS Localizer Source は、通常 VOR/LOC Antenna と Localizer Antenna の切替で使用される。',
    '主要Componentは LOC Antenna Switch、VOR/LOC Antenna、Localizer Antenna、MMR。',
    'VHF NAV Source Select Switch は表示Sourceを切り替えるもので、NORMALでは MMR1 が Captain、MMR2 が F/O、BOTH ON 1/2 で片側MMRを両側表示に使う。'
  ]],
  ['q_34_71eb8cfe70c8', ['D6-01'], ['VOR', 'MAGNETIC BEARING'], [
    'VOR は VOR Station からの Magnetic Bearing Data を受信し、自機から見た航法局方位を得るための System。',
    'VOR/MB Receiver は Morse Identifier/Audio も処理し、Bearing Data を DEU、REU、FCC、FMC へ送る。'
  ]],
  ['q_34_2e9134919b9d', ['D6-02'], ['VOR COMPONENT', 'VOR/MB', 'POWER DIVIDER'], [
    '主要Componentは VOR/MB Receiver 1/2、VOR/LOC Antenna、RF Power Divider、NAV Control Panel、EFIS/DU/ACP、VHF NAV Transfer Switch。',
    'VOR/LOC Antenna は Vertical Stabilizer 上部、RF Power Divider は E1 Rack Side、VOR/MB Receiver 1 は E1-2、Receiver 2 は E1-4 にある。'
  ]],
  ['q_34_0cf2bdba445f', ['D6-01', 'D6-07'], ['VOR DISPLAY', 'DEU', 'ND'], [
    'VOR 情報は DEU を通じて Navigation Display に Bearing/Deviation/TO-FROM などとして表示される。',
    'Source Select が NORMAL なら Captain 側は VOR/MB Receiver 1、F/O 側は Receiver 2 を使う。BOTH ON 1/2 で片側Receiverを両側表示に使う。'
  ]],
  ['q_34_2d71c6c5d134', ['D6-05', 'D6-06'], ['VOR FAIL', 'LED', 'FAIL'], [
    'VOR/MB Receiver の不具合は Receiver Front Panel の LED/Test Switch で確認できる。',
    'NAV Control Panel Failure では Active/Standby Frequency Window に FAIL が表示される。',
    'Display 側では VOR Data が Invalid の場合、VOR Flag/Fail 表示として確認する。'
  ]],
  ['q_34_752faf5e3ed6', ['D7-01'], ['MARKER BEACON', 'VISUAL', 'AURAL'], [
    'Marker Beacon System は、飛行機が Runway Marker Beacon Transmitter 上を通過する時、Visual と Aural の Indication を与える System。',
    'VOR/MB Receiver 1 が Marker Beacon Signal を処理し、DEU へ表示Data、REUへAudioを送る。'
  ]],
  ['q_34_58206a3a5039', ['D7-01', 'D7-02'], ['MARKER BEACON COMPONENT', 'ANTENNA', 'VOR/MB'], [
    '主要Componentは Marker Beacon Antenna と VOR/Marker Beacon Receiver 1。',
    'Marker Beacon Antenna は Fuselage Bottom、VOR/MB Receiver 1 は E/E Compartment E1-2 にある。',
    'Marker Beacon Function は VOR/MB Receiver 1 のみで作動する。'
  ]],
  ['q_34_6baad94de240', ['D7-02', 'D7-04'], ['MARKER BEACON DISPLAY', 'PFD', 'OM', 'MM', 'IM'], [
    'Marker Beacon 情報は Left/Right Outboard Display Unit、PFD に表示される。',
    'Outer Marker は Cyan の OM、Middle Marker は Yellow の MM、Inner/Back Course/Airway Marker は White の IM として表示される。'
  ]],
  ['q_34_8f713626a713', ['D7-04'], ['MARKER BEACON FAIL', 'NCD'], [
    'Marker Beacon Data が Fail または NCD の場合、Marker Beacon 表示はされない。',
    'Audio は ACP で Marker Beacon Audio を選択して確認する。Test は NAV Control Panel から VOR/MB Receiver Test として行う。'
  ]],
  ['q_34_bc1b69aab186', ['D8-01', 'D8-05'], ['DME', 'SLANT RANGE'], [
    'DME System の役割は、飛行機と地上局間の斜め距離、つまり Slant Range Distance を供給すること。',
    'DME Interrogator は地上局へ質問し、Reply を受信して距離を計算し、Station Audio Identifier も受信する。'
  ]],
  ['q_34_08f4936ad121', ['D8-01', 'D8-02', 'D8-05'], ['DME COMPONENT', 'INTERROGATOR', 'ANTENNA'], [
    '主要Componentは DME Interrogator 1/2、DME Antenna 1/2、NAV Control Panel、EFIS/DU/ACP、FMC Source Select Switch など。',
    'DME Interrogator 1/2 は E/E Compartment、DME Antenna 1/2 は機体外部にある。',
    'DME と ATC Antenna は同じL-Band Antennaで互換性がある。'
  ]],
  ['q_34_9704850d23c0', ['D8-06', 'D8-07'], ['DME DISPLAY', 'PFD', 'ND'], [
    'DME 情報は PFD と ND に表示される。',
    'Left PFD は DME 1、Right PFD は DME 2 Data を表示する。',
    'NDでは Expanded/Centered VOR、Expanded/Centered ILS の Top Right に DME Distance が表示され、VOR/ADF Switch を VOR にすると Lower Left/Right に DME 1/2 も表示される。'
  ]],
  ['q_34_534417b2121a', ['D8-07', 'D8-08'], ['DME FAIL', 'NCD', 'FLAG'], [
    'DME Distance が NCD の場合、Number は Amber Dash に置き換わる。',
    'DME が Fail すると DME Distance は Amber の DME Flag に置き換わる。',
    'Ground Test/Self Test では、Fail Condition、NCD Condition、Normal Condition の順にDisplayが変化する。'
  ]],
  ['q_34_df17a5ee6171', ['D8-04', 'D11-06'], ['SUPPRESSION TEE', 'DME', 'ATC', 'TCAS'], [
    'Coax Suppression Tee は、DME、ATC、TCAS のいずれかが送信する時、Suppression Pulse を他のUnitへ分配する。',
    'これにより同じ周波数帯で動く他LRUの受信を止め、Receiver Circuit の Damage や自機搭載Equipmentからの不要応答を防ぐ。'
  ]],
  ['q_34_91bc2125c44e', ['D9-01'], ['ADF', 'AM', 'BEARING'], [
    'ADF System は航法援助装置で、地上局からの AM Signal を使い、機体 Longitudinal Axis から見た ADF Station の方位を算定する。',
    '通常の AM Radio 放送も受信できる。'
  ]],
  ['q_34_e319a1c4f354', ['D9-01', 'D9-02', 'D9-05', 'D9-06'], ['ADF COMPONENT', 'RECEIVER', 'ANTENNA', 'CONTROL PANEL'], [
    '主要Componentは ADF Control Panel、ADF Receiver 1/2、ADF Antenna Assembly 1/2、EFIS/DU/ACP。',
    'ADF Control Panel は P8 Aft Electronics Panel、ADF Receiver 1/2 は E/E Compartment E3-1 Shelf にある。',
    'ADF Antenna は Fuselage Top にあり、ADF Antenna 1 は STA 694、ADF Antenna 2 は STA 727。'
  ]],
  ['q_34_c378758c3cf5', ['D9-06', 'D9-07'], ['ADF DISPLAY', 'ND', 'BEARING POINTER'], [
    'ADF 情報は Captain/F/O Navigation Display の VOR、APP、MAP Mode に表示される。',
    'EFIS Control Panel の VOR/ADF Switch を ADF にすると、Cyan の Bearing Pointer と Source/Frequency/Identifier が ND Bottom Corner に表示される。'
  ]],
  ['q_34_e40bf7437ae1', ['D9-07'], ['ADF FAIL', 'FLAG'], [
    'ADF Receiver が Fail すると、ND の Lower Corner に Amber の ADF Fail Flag が表示される。',
    'ADF Data が NCD、または VOR/ADF Switch が OFF の場合、Bearing Pointer は表示されない。'
  ]],
  ['q_34_9bea865315a4', ['D9-04', 'D9-06'], ['BFO', 'BEAT FREQUENCY OSCILLATOR', 'TONE'], [
    'BFO は Beat Frequency Oscillator のこと。',
    'ADF局の中には Morse Identifier を送るため送信をOn/Offする形式があり、そのSignalを処理するため Receiver を BFO Mode にする。',
    'ADF Control Panel の Tone Selector により BFO の作動を Enable する。'
  ]],
  ['q_34_96ec25fb4c1a', ['D9-06'], ['ANT MODE', 'ADF MODE'], [
    'ADF Mode Selector の ADF Position では、Receiver は Bearing Data と Station Audio を送る。',
    'ANT Mode では、Receiver は Station Audio のみを送る。Bearing 表示は得られない。',
    'つまり ADF は方位+Audio、ANT は受信Audio確認用のMode。'
  ]],
  ['q_34_3ccdc350a5dd', [], ['TIRE', 'WHEEL', 'CROSS ATA32'], [
    'この設問はATA34ではなくATA32 Tire/Wheel項目の内容。',
    'Tire取り外し前、および Tie Bolt 取り外し前には Tire を必ず Deflate する。',
    'Inflation Valve を外す時は Valve 延長線上に人がいないことを確認する。',
    'Tire を Over Inflate しない。Inflation は Nitrogen を使用し、Dry Air 使用時は酸素5%以下を確認する。',
    'Pressure Gage は正確に調整された適切なものを使用する。',
    'Axle Bearing 間に Grease を塗布しない。',
    'MLG/NLG Wheel and Tire Assembly は一度に1本ずつ取り外すことが推奨される。'
  ], 'reviewed_draft_cross_ata', 'ATA34のStudy Guide内に該当根拠がないため、ATA32 Tire/Wheel設問として回答。'],
  ['q_34_d8e5802aaee4', ['D10-01'], ['GPS', 'POSITION', 'SATELLITE'], [
    'GPS System の役割は Navigation Satellite を使用して Airplane System と Flight Crew に Airplane Position を供給すること。',
    'GPS は Latitude、Longitude、Altitude、Accurate Time、Ground Speed を計算する。'
  ]],
  ['q_34_8aa4b0f25830', ['D10-01', 'D10-02', 'D10-03'], ['GPS COMPONENT', 'MMR', 'ANTENNA'], [
    '主要Componentは MMR 1/2 内の GPS Receiver、GPS Antenna 1/2、CDU、IRS Master Caution Unit、IRS Mode Select Unit など。',
    'MMR 1 は E/E Compartment E1-2 Shelf、MMR 2 は E1-4 Shelf にある。',
    'GPS Antenna は Fuselage Top にある。'
  ]],
  ['q_34_f4d4bd1e94d3', ['D10-08'], ['GPS DISPLAY', 'CDU', 'POS REF'], [
    'GPS Data は CDU に表示される。',
    'POS REF Page に GPS L(1) と GPS R(2) の Position が表示され、POS SHIFT Page には FMC Position から見た GPS Position の Bearing/Distance が表示される。'
  ]],
  ['q_34_3a7cac18fd88', ['D10-09', 'D10-10'], ['GPS FAIL', 'FMC SENSOR STATUS'], [
    'GPS Failure は、IRS Mode Select Panel の GPS Fail Light、System Status Annunciator の IRS Light、Master Caution Light で分かる。',
    '1系統Failでは Recall 時に GPS Light 等が点灯し、2系統Failでは自動的に Annunciation する。',
    'FMC SENSOR STATUS Page では MMR Failure が表示され、SENSOR DATA Page では MMR Internal Failure のEngineering Dataを確認できる。'
  ]],
  ['q_34_a9ff27c995a7', ['D10-03'], ['GPS ANTENNA', 'L-BAND', 'PREAMPLIFIER'], [
    'GPS Antenna は L-Band の 1,575.42 MHz Signal を受信して MMR へ送る。',
    '各 Antenna には Signal Level を増加させる Integrated Preamplifier があり、MMR内Power Supplyから12V DCを受ける。',
    'Antenna は Fuselage Top にある。'
  ]],
  ['q_34_869986768e87', ['D10-04', 'D10-07'], ['GPS ACQUISITION', 'ADIRU', 'PRESENT POSITION'], [
    'GPSを早く捕捉するには、ADIRU Data、特に Present Position と Altitude が有効に使える状態にする。',
    'GPS は Acquisition Mode で ADIRU Data と Internal Database により使用可能Satelliteを推定する。',
    'ADIRU Data が Available なら捕捉は約75秒、Available でない場合は全Satellite探索となり約4分、最大10分かかる。'
  ]],
  ['q_34_2fc896930d66', ['D11-01'], ['ATC', 'TRANSPONDER', 'SSR'], [
    'ATC System の役割は、ATC地上局やTCASからの質問に対し、ATC/Mode S Transponder が Code化したPulseで応答すること。',
    '地上局は航空機の Radar Return、Altitude、4桁のIdentity Codeなどを確認できる。',
    'Mode Sでは Maximum Airspeed、TCAS Coordination、Altitude、Mode A Code、24-bit Addressなども扱う。'
  ]],
  ['q_34_a60a97072bd7', ['D11-01', 'D11-02', 'D11-08'], ['ATC COMPONENT', 'TRANSPONDER', 'ANTENNA', 'COAX SWITCH'], [
    '主要Componentは Top/Bottom ATC Antenna、ATC Coaxial Switch 2個、ATC/TCAS Control Panel、ATC Transponder 1/2。',
    'ATC/TCAS Control Panel は P8 Aft Electronics Panel にある。',
    'ATC Transponder、Program Switch Module、Top/Bottom ATC Coax Switch は E/E Compartment、Top ATC Antenna は STA 430.25、Bottom ATC Antenna は STA 355 にある。'
  ]],
  ['q_34_e6594204b005', ['D11-07'], ['ATC DISPLAY', 'CONTROL PANEL', 'LCD'], [
    'ATC の選択System、Identity Code、Mode、Altitude Source、XPNDR FAIL などは ATC/TCAS Control Panel で表示・確認する。',
    '選択された ATC System はControl PanelのLCDに表示される。',
    'XPNDR FAIL Light は Transponder、Antenna、Control Data、Altitude Input Failure で点灯する。'
  ]],
  ['q_34_84828706add0', ['D11-07'], ['ATC/TCAS CONTROL PANEL', 'XPNDR', 'ALT RPTG OFF'], [
    'ATCとして通常利用する場合、Transponder Select Switch で使用する ATC Transponder 1 または 2 を選択する。',
    'Mode Selector は通常 XPNDR Position とし、Active Transponder がATC質問に応答し、Mode C/Mode S Altitudeを含めて送信する。',
    'Altitude Reportを出さない場合は ALT RPTG OFF、停止時は STBY、Test時はTESTを使用する。'
  ]],
  ['q_34_f7e077c829a3', ['D12-01', 'D12-02'], ['TCAS', 'TRAFFIC', 'COLLISION AVOIDANCE'], [
    'TCAS は、ATC Transponder 装備機との安全なTraffic Separation維持を助ける機上System。',
    '他機へInterrogationを送り、応答からRange、Bearing、Altitudeを計算して Target を分類する。',
    '必要に応じて Traffic Advisory(TA) と Resolution Advisory(RA) をVisual/Auralで出し、TCAS装備機同士では回避ManeuverをCoordinationする。'
  ]],
  ['q_34_494613c7a900', ['D12-02', 'D12-03', 'D12-07'], ['TCAS COMPONENT', 'COMPUTER', 'ANTENNA'], [
    '主要Componentは TCAS Computer、Top/Bottom TCAS Directional Antenna、ATC/TCAS Control Panel。',
    'TCAS Computer は E/E Compartment にある。',
    'Top TCAS Directional Antenna は Fuselage Top STA385、Bottom TCAS Directional Antenna は Fuselage Bottom STA305 にある。'
  ]],
  ['q_34_84b0ca80cc85', ['D12-10', 'D12-11', 'D12-12', 'D12-13'], ['TCAS DISPLAY', 'ND', 'AI', 'VSI'], [
    'TCAS Traffic は ND に表示される。TFC Switch を押すと TFC Message と Target Symbol が表示される。',
    'Other Traffic は White Open Diamond、Proximate は Solid White Diamond、TA は Amber Circle、RA は Red Square。',
    'RAのVertical Guidanceは AI と VSI に表示され、RA/TA Message、TCAS FAIL、TCAS OFF、TA ONLYなどもNDに表示される。'
  ]],
  ['q_34_5db12ff9abb8', ['D12-07'], ['TCAS ANTENNA', 'DO NOT PAINT', 'CABLE'], [
    'TCAS Antenna の Radiation Surface または Backplate は Paint しない。Paint は電波の送受信を妨げる。',
    'Antenna Cableを取り付ける時は、各Coaxial Cableを同じColor BandのArray Element Connectorに接続する。',
    'Antenna CableへのDamageを防ぐため、Cableを引っ張らない。誤接続や抵抗値異常はAntenna Faultになる。'
  ]],
  ['q_34_9215eeb6b503', ['D12-07', 'D12-10', 'D12-12'], ['TA ONLY', 'RA'], [
    'TA ONLY は Traffic Advisory のみを使用したい時のModeで、RA Traffic Symbol、RA Advisory、RA Aural Messageを出さない。',
    'ATC/TCAS Control PanelのFunction Selectorを TA ONLY にすると、NDにはCyanのTA ONLY Messageが表示される。'
  ]],
  ['q_34_7b2e9c51d4a8', ['D12-06', 'D12-12'], ['TCAS FAIL', 'TCAS TEST FAIL', 'FAULT LED'], [
    'TCAS不具合は NDの Amber TCAS FAIL Message、Test時の TCAS TEST FAIL、また TCAS Computer Front Panel LEDの FAIL/XPNDR/ANT/RAD ALT/HDNG等で確認できる。'
  ]],
  ['q_34_639e8499b1a9', ['D13-01'], ['EGPWS', 'GROUND PROXIMITY', 'TERRAIN'], [
    'EGPWS/GPWS の役割は、地上に近いUnsafe Condition、Windshear、Early Descent、Terrain ConflictをFlight Crewへ警告すること。',
    'Aural Message、Light、PFD/ND Displayを使ってAlertを出し、Enhanced FunctionではGPSとTerrain/Runway Databaseを使ってTerrain AwarenessとTCFを提供する。'
  ]],
  ['q_34_73c58aec5ffd', ['D13-01', 'D13-07', 'D13-09'], ['GPWS COMPONENT', 'GPWC', 'GPWM'], [
    '主要Componentは Ground Proximity Warning Computer(GPWC)、Ground Proximity Warning Module(GPWM)、Terrain/Weather Relay、関連Input System(RA、ADIRS、MMR/GPS、FMCS、SMYD、WXR、DEUなど)。',
    'GPWC は GPWSのMain Componentで、Warning Conditionを判定する。',
    'GPWM は Flightcrew と GPWS 間の Interfaceで、INOP Light、Test、Flap/Gear/Terrain Inhibit Switchを持つ。'
  ]],
  ['q_34_8073c8cfdf38', ['D13-01', 'D13-10', 'D13-11', 'D13-12', 'D13-13', 'D13-14', 'D13-15', 'D13-16', 'D13-20'], ['GPWS MODE', 'TCF', 'TERRAIN AWARENESS'], [
    'Mode 1: Excessive Descent Rate。Mode 2: Excessive Terrain Closure Rate。Mode 3: Takeoff/Missed Approach後のAltitude Loss。',
    'Mode 4: Gear/FlapがLanding Configurationでない状態でのUnsafe Terrain Clearance。Mode 5: Glideslope Deviation。Mode 6: Altitude/Minimums/Bank AngleなどのCallout。Mode 7: Windshear Warning。',
    'Enhanced Function は Terrain Clearance Floor(TCF)、Runway Field Clearance Floor(RFCF)、Terrain Awareness Display/Alert の3つとして整理できる。'
  ]],
  ['q_34_296561c42b11', ['D13-09', 'D13-19', 'D13-21'], ['GPWS INOP', 'TERR FAIL'], [
    'EGPWS/GPWS の不具合は GPWM の Amber INOP Light で確認する。GPWC Failure、Critical Input Failure、Windshear計算不可などで点灯する。',
    'NDには TERR POS、TERR INHIBIT、TERR FAIL、TERR RANGE DISAGREE、MAP/TERR RANGE DISAGREE などのNon-Normal Messageが表示される。',
    'GPWC Front Panel の External Fault、Computer OK、Computer Fail LEDやSelf Testでも確認できる。'
  ]],
  ['q_34_e2be5dd59db2', ['D13-09'], ['INHIBIT SWITCH', 'FLAP', 'GEAR', 'TERRAIN'], [
    'Flap Inhibit Switch は GPWCへFlap Down ConditionをSimulateし、Flap Up Approach時の Mode 4「TOO LOW FLAP」Warningを防ぐ。',
    'Gear Inhibit Switch は GPWCへGear Down ConditionをSimulateし、Gear Up Approach時の Mode 4「TOO LOW GEAR」Warningを防ぐ。',
    'Terrain Inhibit Switch は TCF と Terrain Awareness(TA) のCaution/WarningをInhibitし、両NDに Amber TERR INHIBIT Messageを表示する。Mode 1-7自体には影響しない。'
  ]],
  ['q_34_93f1b13a9090', ['D13-15'], ['TCF', 'TERRAIN CLEARANCE FLOOR'], [
    'TCF は Terrain Clearance Floor の略。',
    'Approach中に機体が低すぎる降下をした場合、Airplane PositionとRunway Databaseを使ってAlertを出すEnhanced GPWS Function。',
    'Runway周囲にClearance Envelopeを作り、機体がそのFloorを下回ると「TOO LOW TERRAIN」や「PULL UP」を出す。'
  ]],
  ['q_34_4bec7c746de7', ['D13-16'], ['RFCF', 'RUNWAY FIELD CLEARANCE FLOOR'], [
    'RFCF は Runway Field Clearance Floor の略。',
    'Approach中、Approach Pathより下のTerrainに対してRunway Elevationが高い場合などに、改良されたClearance Alertを与えるEnhanced GPWS Function。',
    'Selected Runway中心のCircular Bandを使い、Runway Endから5 NM、Runway上方300 ftまでのEnvelopeで判定する。'
  ]],
  ['q_34_a5db205263fb', ['D13-14', 'D13-17'], ['PRIORITY', 'MODE 7', 'WINDSHEAR'], [
    'EGPWC Computer のWarning優先順位で最も高いものは Mode 7 Windshear Warning。',
    'Mode 7 Warning は Siren と「WINDSHEAR WINDSHEAR WINDSHEAR」Aural Message、PFDのRed WINDSHEAR Messageを出し、Highest Priorityを持つ。'
  ]],
  ['q_34_6dbb6fab0374', ['D14-01'], ['STANDBY MAGNETIC COMPASS', 'BACKUP'], [
    'Standby Magnetic Compass の目的は、Backup の Magnetic Heading Reference を提供すること。',
    'P5 Forward Overhead Panel下にあり、地球磁束線にCompassをAlignさせて磁方位を示す。'
  ]],
  ['q_34_0d5d1b18cb4d', ['D14-01'], ['STANDBY COMPASS', 'NON MAGNETIC', 'COMPASS SWING'], [
    'Standby Magnetic Compass の取付・取外しや調整には Non Magnetic Tool と Non Magnetic Screw のみを使用する。',
    'N-S/E-W Compensation Screw は Magnetic Deviation修正用で、Non Magnetic Toolで回す。',
    'Compass交換後は Compass Swing を行う。補正しきれないSmall Errorは Compass Correction Cardに記載する。'
  ]],
  ['q_34_8ab744435c04', ['D15-03', 'D15-05', 'D15-08'], ['ISFD', 'STANDBY FLIGHT DISPLAY'], [
    'ISFD は Standby Attitude Reference System の中心Componentで、Flight CrewにStandbyの統合表示を提供する。',
    'Pitch/Roll Attitude、Indicated Airspeed、Altitude、Heading、Localizer/Glideslope Deviationを表示する。',
    '内部SensorでAttitude/Airspeed/Altitudeを計算し、ADIRUからHeading、MMRからILS Deviationを受ける。'
  ]],
  ['q_34_85701460c07c', ['D15-05'], ['ISFD DISPLAY', 'PITCH', 'ROLL', 'AIRSPEED', 'ALTITUDE', 'HEADING'], [
    'ISFD が表示するDataは、Pitch and Roll Attitude、Indicated Airspeed、Altitude、Heading、Localizer Deviation、Glideslope Deviation。'
  ]],
  ['q_34_6d6406b57007', ['D15-04', 'D15-07', 'D15-08', 'D15-09'], ['ISFD POWER', 'BATTERY', 'PITOT', 'STATIC'], [
    '通常表示に最低限必要なのは、ISFDへの28V DC Power、Alternate Pitot Pressure、Alternate Static Pressure、ISFD内部のInertial Sensor。',
    'Heading表示には Left ADIRU からの Magnetic Heading Data が必要。',
    'ISFD Dedicated Battery/Charger は Battery Busが使えない時、内部Batteryで最大150分 ISFDへPowerを供給できる。'
  ]],
  ['q_34_92900532525a', ['D15-04', 'D15-05', 'D15-08'], ['ISFD INTERFACE', 'PITOT STATIC', 'MMR', 'ADIRU'], [
    'ISFDの表示Data用Interfaceは、ISFD Dedicated Battery/ChargerからのPower、Alternate Pitot Probe、Alternate Static Port。',
    'MMR 1 から Localizer/Glideslope Deviation、Left ADIRU から Inertial Reference/Magnetic Heading Dataを受ける。',
    'Master Dim and Test CircuitからFront Panel Light用5V ACも受ける。'
  ]],
  ['q_34_8cbe3471ee10', ['D15-03', 'D15-07'], ['ISFD BATTERY', 'E4-1'], [
    'ISFD Dedicated Battery/Charger は E/E Compartment の E4 Rack、Shelf E4-1 上にある。'
  ]],
  ['q_34_80b243df40e3', ['D15-06'], ['ATT RST', 'ATTITUDE RESET'], [
    'ISFD の ATT RST Switch は Attitude Reset Switch。',
    'Attitude Display の Alignment を手動でControl、Resetするために使用する。'
  ]],
  ['q_34_75569493c776', ['D16-01', 'D16-02'], ['HGS', 'HUD', 'HEAD UP'], [
    'HGS/HUD の役割は、Flight InformationとGuidance SymbolをPilot前方のCombinerに投影し、外景と重ねてHead Upで操縦できるようにすること。',
    'Low Visibility Takeoff、Enroute、Approach、LandingなどでPrimary Flight/Guidance表示を提供する。'
  ]],
  ['q_34_b7ff3aecc978', ['D16-01'], ['CAT IIIA', 'AIII'], [
    'HGS装備により対応するCAT運航レベルは Category IIIa。',
    'CAT IIIa は Zero Decision Height または100 ft未満のDH、かつ RVR 700 ft以上での精密計器進入・着陸。'
  ]],
  ['q_34_f16f2270a62c', ['D16-01', 'D16-02', 'D16-14'], ['HGS FUNCTION', 'LOW VISIBILITY', 'AIII', 'VMC'], [
    'HGSの機能は、Primary Flight Display類似表示、Category III Approach/Flare/Rollout Guidance、ILS Approach Display、Visual Approach Display。',
    'さらに Low Visibility Takeoff Display、Unusual Attitude Display、Tailstrike Advisory Display の計7つ。'
  ]],
  ['q_34_93ab9434bad5', ['D16-02', 'D16-03', 'D16-04', 'D16-11'], ['HGS COMPONENT', 'COMPUTER', 'OHU', 'COMBINER'], [
    '主要Componentは HGS/HUD Computer、Overhead Unit(OHU)、Combiner、MCDU(Control Panel)、HUD Annunciator Panel、Program Switch Module。',
    'HUD Computer は E/E Compartment E4-1 Shelf、OHU は Captain頭上のCombiner後方、Combiner は L1 Windshield Upper Frame側にある。',
    'MCDU は P9 Forward Electronics Panel、HUD Annunciator Panel は P3-3 First Officer Instrument Panel にある。'
  ]],
  ['q_34_889273d43b9e', ['D16-09', 'D16-10', 'D16-11', 'D16-19', 'D16-42'], ['HGS FAIL', 'LED', 'MCDU'], [
    'HGS不具合は HUD Computer Front Panel のLEDで確認できる。HC、OHU、HCP、COMB のRed LEDが各Component Failを示す。',
    'BITE Fault は Computer Front Panel と MCDU に表示され、AIII Capability Lossの原因は HGS Test MenuのRecorded Faults Pageで確認できる。',
    'AIII Mode で500 ft AGL未満のHUD Failは F/O側HUD Annunciator Panelの HGS FAIL Lightでも表示される。'
  ]],
  ['q_34_fb6e35fcaa4d', ['D16-14'], ['HGS MODE', 'PRI', 'AIII', 'IMC', 'VMC'], [
    'HGSのModeは PRI、AIII、IMC、VMC の4つ。',
    'PRIはPrimary Mode、AIIIはCategory IIIa Approach/Landing、IMCはInstrument Meteorological ConditionsでのApproach/Landing、VMCはVisual Approach/Landing用。'
  ]],
  ['q_34_9720c1c11e67', ['D17-01', 'D17-23', 'D17-25'], ['FMCS PERFORMANCE', 'ECON', 'N1'], [
    'FMCSのPerformance Functionは、Airplane/Engine Modelと入力Dataを使い、最適なVertical Profile、Speed、Thrustを計算する機能。',
    'Gross Weight、Cruise Altitude、Cost Indexなどを使い、Economy Speed、Best Flight Altitude、Top of Descent、Speed/N1 Target、N1 Limitなどを計算する。',
    'ECON ModeではFuel CostとTime Costのバランスに基づき、Climb/Cruise/Descentの経済的Profileを作る。'
  ]],
  ['q_34_57b827400e39', ['D18-02'], ['CDU CAUTION', 'NON-BITE', 'DELETE'], [
    'CDUのNon-BITE Pageで行ったFMC入力は、整備作業完了時に消去する。',
    'これは整備作業中の入力がFMC Flight Operationへ思わぬ影響を与えるのを防ぐため。',
    '入力の消去は DELETE Key を使用するか、FMC Powerを少なくとも10秒切ることで行う。'
  ]],
  ['q_34_c1a6c42933a9', ['D17-23', 'D18-01', 'D18-32'], ['ASA', 'FMC LIGHT', 'ALERTING MESSAGE'], [
    'ASAのFMC Lightは、FMC Failure、または Flight Crew Awareness/Crew Action が必要な FMC Alerting Message があることを示す。',
    'Primary FMC Fail、Secondary FMC FailでTransfer SwitchがNormalの場合などでもFMC Warning Lightが点灯する。',
    'Alerting Messageでは ASA上のFMC Warning LightとCDU MSG Annunciatorが点灯する。'
  ]],
  ['q_34_5981bc9572b5', ['D17-02', 'D17-03', 'D17-05', 'D17-12'], ['FMCS COMPONENT', 'FMC', 'CDU', 'TRANSFER RELAY'], [
    'FMCSの主要Componentは FMC 1/2、MCDU/CDU 1/2、FMC Source Select Switch、Airborne Data Loader、Data Loader Control Panel、BITE Printer Receptacle、Program Switch Module、FMCS Transfer Relay 1/2。',
    'CDU 1/2 は P9 Forward Electronics Panel、FMC Source Select Switch は P5-28、Airborne Data Loader/Data Loader Control Panel は P61、BITE Printer Receptacle は P18後方Coat Roomにある。',
    'FMC 1/2、Portable CDU Receptacle、Program Switch Modules、Transfer Relays は E/E Compartment E5-2 Shelf にある。'
  ]],
  ['q_34_ea97cf1358b2', ['D17-22'], ['FMCS SOFTWARE', 'OFP', 'NDB', 'PDDB', 'MEDB', 'AADD'], [
    'FMCSのSoftware/Data Baseは、Operational Flight Program(OFP/OPS)、Navigation Data Base(NDB)、Performance Default Data Base(PDDB)。',
    'さらに Model/Engine Performance Data Base(MEDB)、ACARS Adaptable Datalink Data Base(AADD)、Software Options Data Base の6つ。'
  ]],
  ['q_34_eec87630b072', ['D17-01', 'D17-02', 'D17-23'], ['FMCS FUNCTION', 'NAVIGATION', 'PERFORMANCE', 'GUIDANCE', 'BITE'], [
    'FMCSの機能は Navigation、Performance、Guidance、BITE/Other Functions の4つとして整理できる。',
    'NavigationはPosition計算、Flight Plan表示、Radio Autotuneを行う。',
    'PerformanceはSpeed/Thrust/Optimum Profileを計算し、GuidanceはDFCS/A/TへLNAV/VNAV Commandを送る。',
    'BITE/Other Functionsとして、CDUから他SystemのBITE Access、ACARS、Display、Alert Functionも扱う。'
  ]],
  ['q_34_e5e1332b37ce', ['D17-01'], ['BITE', 'DFCS', 'ADIRU', 'FQIS'], [
    'FMCS CDUからBITEをControlできるSystemは、DFCS、Autothrottle(A/T)、ADIRU、CDS、EEC、APU ECU、FQIS の7つ。'
  ]],
  ['q_34_4d7a2c96e1f3', ['D17-23', 'D17-24'], ['FMCS NAVIGATION', 'FMC POSITION', 'ANP'], [
    'FMCSのNavigation Functionは、FMC Position、Lateral/Vertical Position、Actual Navigation Performance(ANP)を計算し、DME AutotuneとNAV STATUS表示用Radio Tuning Dataも提供する。',
    'Position Updateは優先順に ADIRU/GPS、ADIRU/DME/DME、ADIRU/DME/VOR、ADIRU/DME/LOC、ADIRU ONLY を使う。'
  ]],
  ['q_34_b6a0ea314d87', ['D17-23', 'D17-26', 'D17-27'], ['FMCS GUIDANCE', 'LNAV', 'VNAV'], [
    'FMCSのGuidance Functionは、DFCSとAutothrottleへ Flight Path と Steering Command を送る機能。',
    'LNAVではActive RouteとFMC Positionを比較し、Roll Steering CommandをDFCSへ送る。',
    'VNAVではSpeed、Vertical Speed Target、N1 Thrust/Speed Targetを計算し、DFCSとA/Tが計算されたFlight Pathを維持できるようにする。'
  ]]
];

module.exports = Object.fromEntries(
  reviewedByQuestion.map(([questionId, evidence_page_codes, evidence_terms, answer_lines, status, problem_reason]) => [
    questionId,
    {
      evidence_page_codes,
      evidence_terms,
      answer_lines,
      ...(status ? { status } : {}),
      ...(problem_reason ? { problem_reason } : {})
    }
  ])
);
