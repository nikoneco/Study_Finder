module.exports = {
  q_33_6de7db27f3b6: {
    evidence_page_codes: ['D1-02', 'D1-03', 'D1-04', 'D1-09'],
    evidence_terms: ['INSTRUMENT', 'PANEL', 'OFF-BRIGHT', 'TRANSFER BUS', 'STANDBY'],
    answer_lines: [
      'Instrument and Panel Light は、Flight Compartment 内の switch、selector、indicator、instrument face などを照明する。',
      'Panel light の主な種類は Light Plate、Indicator Light、Instrument Light、Lighted Push-Button Switch である。',
      '通常時は 28V AC Transfer Bus 1 または 2 から電源を受ける。OFF-BRIGHT control により lamp brightness を調整する。',
      'P1/P2/P7 では OFF-BRIGHT control が variable transformer として働き、Lighting Module 内の fixed transformer を介して最大 5V AC を instrument/panel light へ供給する。',
      'Flight safety に重要な instrument light は Standby Light System に接続され、Transfer Bus power が失われると Standby Bus から standby transformer 経由で 5V AC を受けて点灯する。'
    ]
  },
  q_33_b3fba8d45aac: {
    evidence_page_codes: ['D1-05'],
    evidence_terms: ['INDICATOR', 'GROUND TYPE', 'POWER TYPE', 'RED', 'AMBER', 'BLUE', 'GREEN', 'WHITE'],
    answer_lines: [
      'Indicator Light Assembly には Ground Type と Power Type の 2 種類がある。',
      'Ground Type は output terminal に ground を得た時に点灯する。Power Type は input terminal に 16/28V DC を得た時に点灯する。',
      'どちらの type にも Press-To-Test switch circuit があり、lamp test ができる。',
      'Lens 色の意味は、Red: Warning、Amber: Caution、Blue: Position、Green: Power On、White: Information である。'
    ]
  },
  q_33_fa760a4a5fec: {
    evidence_page_codes: ['D1-03', 'D1-09', 'D1-11'],
    evidence_terms: ['STANDBY', 'P1', 'P2', 'P3', 'P8', 'STANDBY BUS'],
    answer_lines: [
      'Standby Light は、飛行の安全に不可欠な instrument/panel を照明するための system である。',
      'Standby Instrument Panel Light は、Transfer Bus power が失われた時に Standby Bus から transformer を介して P1、P2、P3 の instrument/panel light へ 5V AC を供給する。',
      'Study Guide では P8 panel の standby circuit も示されており、Transfer Bus 2 が供給できない場合は Standby Bus から standby transformer T362 経由で P8 の standby light に 5V AC を供給する。',
      'したがって、回答としては P1、P2、P3 を中心に、P8 など WDM 指定の standby circuit 対象 panel も含む。'
    ]
  },
  q_33_ad2ae94e4ab1: {
    evidence_page_codes: ['D1-07'],
    evidence_terms: ['MASTER CAUTION', 'RECALL', 'RESET', 'ANNUNCIATOR'],
    answer_lines: [
      'System annunciator のいずれかに fault があると、対応する annunciator と左右 2 つの MASTER CAUTION light が点灯する。',
      'MASTER CAUTION light を押すと Push-To-Reset として働き、MASTER CAUTION light と annunciator light を消灯できる。',
      'Annunciator block を押すと、fault が残っている system の annunciator light を Recall できる。',
      'Annunciator block を押す操作は、全 annunciator と MASTER CAUTION light の test にも使用される。'
    ]
  },
  q_33_564730c5085a: {
    evidence_page_codes: ['D1-16'],
    evidence_terms: ['DOME', 'P6', 'P18', 'EMERGENCY'],
    answer_lines: [
      'Cockpit dome light は 2 個あり、1 つは P6 panel、もう 1 つは P18 panel にある。',
      'どちらも P5 panel の 3 position switch（OFF/DIM/BRIGHT）で control され、28V DC Battery Bus から電源を受ける。',
      'OFF では電源供給なし、DIM では resistor により電圧を下げて dim 点灯、BRIGHT では 28V DC が lamp に供給され bright 点灯する。',
      '違いは P18 panel 側の dome light には 2 つの lamp assembly があり、そのうち 1 つは Flight Compartment Emergency Light として Emergency Light System により点灯する点である。'
    ]
  },
  q_33_b0371a8aae55: {
    evidence_page_codes: ['D1-24', 'D1-25'],
    evidence_terms: ['MASTER DIM', 'TEST', 'BRT', 'DIM', 'R33', 'R34'],
    answer_lines: [
      'Master Dim and Test system は、Flight Compartment の annunciator と lighted push-button switch の test、および bright/dim mode の設定を行う。',
      'MD&T switch は P1 Main Instrument Panel にある TEST/BRT/DIM switch で、P1、P2、P3、P5、P7、P8、P9 の light を control する。',
      'BRT position では relay R33/R34 が de-energize し、ground seeking light の ground と power seeking light の power line が通常経路に接続され、bright mode となる。',
      'DIM position では R34 が energize し、power または ground が zener diode を介して与えられ dim mode となる。',
      'TEST position では R33 が energize し、全 indicating light に power または ground を与えて bright に点灯させる。'
    ]
  },
  q_33_92e420096643: {
    evidence_page_codes: ['D2-03', 'D2-04'],
    evidence_terms: ['WINDOW', 'BALLAST', 'DIM', 'BRT', '115V AC'],
    answer_lines: [
      'Window Light は passenger compartment 内の stowage bin 下側付近、PSU と window 上部 sidewall panel の間を照明する fluorescent light である。',
      '構成は Ballast Assembly、Fluorescent Lamp Tube、Lens で、ballast assembly は lamp support assembly 内にある。',
      'Ballast assembly は自分の lamp assembly と隣接する lamp assembly の fluorescent lamp に電源を供給する。',
      'Forward Attendant Panel の rotary selector で OFF/BRT/DIM を選択する。DIM または BRT で Window Light Relay R427 が energize し、115V AC が ballast assembly に供給され、forward zone の window light が点灯する。',
      'DIM では dim mode 用の electrical ground、BRT では bright mode 用の open discrete が ballast assembly に送られる。'
    ]
  },
  q_33_d030b23aac0f: {
    evidence_page_codes: ['D2-05', 'D2-06'],
    evidence_terms: ['CEILING', 'BIN', 'RECESSED', 'NIGHT', 'BALLAST'],
    answer_lines: [
      'Ceiling Light は passenger compartment の stowage bin と aisle 上側を照明する。',
      'Ceiling Light には Bin Ceiling Light と Recessed Ceiling Light の 2 種類がある。Bin Ceiling Light は fluorescent lamp と incandescent lamp の assembly、Recessed Ceiling Light は fluorescent lamp である。',
      'どちらも同じ type の ballast assembly を使用する。Bin Ceiling Light は stowage bin 上部、Recessed Ceiling Light は forward/aft ceiling panel 内にある。',
      'Forward または Aft Attendant Panel の 5 position selector（OFF/NIGHT/BRT/DIM/MED）で control する。',
      'DIM または MED で Master Lighting Switch が enable の場合、Ceiling Light Relay R120 が energize し、115V AC が ballast assembly に送られる。NIGHT position では 28V AC により incandescent lamp が点灯する。'
    ]
  },
  q_33_59ee94d39f17: {
    evidence_page_codes: ['D2-07', 'D2-08'],
    evidence_terms: ['FASTEN SEAT BELT', 'AUTO', 'FLAP', 'GEAR DOWN', 'RETURN TO SEAT'],
    answer_lines: [
      'FASTEN SEAT BELT switch が AUTO position の時、Trailing Edge Flap Limit Switch が NOT UP position になると FASTEN SEAT BELT sign と RETURN TO SEAT sign が点灯する。',
      'AUTO position で Landing Gear Lever Switch が GEAR DOWN position の時も、FASTEN SEAT BELT sign と RETURN TO SEAT sign が点灯する。',
      'AUTO position では、landing gear down、oxygen indication relay energized、または TE flap not up の条件により relay R25/R26 が作動し、passenger sign light が点灯する。'
    ]
  },
  q_33_4719c6b7f338: {
    evidence_page_codes: ['D2-08'],
    evidence_terms: ['OXYGEN', 'FASTEN SEAT BELT', 'AUTO', 'OXYGEN INDICATION RELAY'],
    answer_lines: [
      'Passenger Oxygen System は Passenger Sign System と interface している。',
      'FASTEN SEAT BELT switch が AUTO position にあり、oxygen mask drop に伴って Oxygen Indication Relay が energize すると、FASTEN SEAT BELT sign が点灯する。',
      'Study Guide の記述上、oxygen indication relay による direct indication は FASTEN SEAT BELT sign である。'
    ]
  },
  q_33_db08756073b8: {
    evidence_page_codes: ['D2-12', 'D2-13'],
    evidence_terms: ['PASSENGER CALL', 'LAVATORY CALL', 'BLUE', 'AMBER', 'PINK', 'CHIME'],
    answer_lines: [
      'Passenger/Lavatory Call Light は、旅客または乗員が客室乗務員へ用件や援助要求を知らせるための light である。',
      'Blue lens は passenger が PSU の passenger call switch を押した時に点灯する。Passenger call では forward または aft exit locator の blue light、high chime、PSU call light が作動し、call light/reset switch で reset する。',
      'Amber lens は lavatory 内の call switch を押した時に点灯する。Lavatory call では relay R1 が latch し、high chime、lavatory call light/reset switch、forward/aft exit locator の amber light が作動し、reset button で消灯する。',
      'Pink lens は乗員または客室乗務員が他の乗務員を呼ぶ時に点灯する。'
    ]
  },
  q_33_02a1b81486d0: {
    evidence_page_codes: ['D2-14', 'D2-15'],
    evidence_terms: ['ENTRY', 'OFF', 'DIM', 'BRIGHT', 'THRESHOLD', 'EXTERNAL POWER'],
    answer_lines: [
      'Entry Light は airplane entry area を照明し、forward/aft passenger cabin end、entry/service entry door 近くの ceiling にある。Threshold Light は forward entry door windscreen にある。',
      'P13 Forward Attendant Panel の 3 position rotary switch（OFF/DIM/BRIGHT）で control する。',
      'OFF では external power 供給時を除き全 light は消灯する。External power が供給されている場合は Hot Battery Bus power により incandescent の Dim Entry Light が点灯する。',
      'DIM では fluorescent light が dim 点灯する。BRIGHT では fluorescent light が bright 点灯し、Threshold Light も点灯する。',
      'Switch を OFF から動かすと、115V AC Ground Service Bus power が entry light ballast assembly に供給され、ballast の control logic により OFF/DIM/BRT mode が決まる。'
    ]
  },
  q_33_e148eae80178: {
    evidence_page_codes: ['D3-02', 'D3-03'],
    evidence_terms: ['WHEEL WELL', 'P5', 'P19', 'MAIN WHEEL WELL', 'NOSE'],
    answer_lines: [
      'Wheel Well Light は Nose および Main Landing Gear wheel well 内を照明する incandescent light である。',
      'Cockpit の P5 Forward Overhead Panel にある Wheel Well Light Switch を ON にすると、nose と main を含む全 wheel well light が点灯する。',
      'Left Main Wheel Well forward bulkhead 外側の 2-position toggle switch は、main wheel well 内の 4 つの light だけを control する。',
      'P19 External Power Panel の 2-position toggle switch は、nose gear wheel well 内の 1 つの light だけを control する。',
      '外部 switch を使用した場合は、その switch に関連する wheel well light だけが点灯する。外部 switch は、点灯させる時以外は通常 Normal/Off position にしておく。電源は 28V AC Ground Service Bus である。'
    ]
  },
  q_33_80e8220343da: {
    evidence_page_codes: ['D3-08', 'D3-09'],
    evidence_terms: ['CARGO DOOR', 'CARGO LIGHT', 'PSEU', 'DOOR CLOSE'],
    answer_lines: [
      'Cargo Compartment Light は cargo door が open しており、Cargo Light Switch が ON position の時に点灯する。',
      'Cargo door が close している時、Cargo Light は点灯しない。',
      'Cargo Door Warning Switch が locked position でない、または PSEU が door close failure を検知する場合、door が open しても cargo light は消灯したままとなる。'
    ]
  },
  q_33_6fc26f72b821: {
    evidence_page_codes: ['D3-08', 'D3-09'],
    evidence_terms: ['LENS', 'MICRO SWITCH', 'CARGO', 'PARALLEL'],
    answer_lines: [
      'Cargo Compartment Light には micro switch があり、lens が light assembly に取り付けられていない時は light circuit を open にする。',
      'したがって lens cover が外れている、または正しく取り付いていない状態では、その cargo light は点灯しない。',
      'Cargo compartment light は並列回路なので、1 つの lamp が球切れしても他の lamp の点灯には影響しない。'
    ]
  },
  q_33_dec76937818b: {
    evidence_page_codes: ['D4-01', 'D4-02'],
    evidence_terms: ['EXTERIOR', 'LANDING', 'ANTI-COLLISION', 'POSITION', 'TAXI', 'LOGO'],
    answer_lines: [
      'Exterior Light の種類は、Wing Illumination Light、Landing Light、White Anti-Collision Light、Red Anti-Collision Light、Position Light、Taxi and Runway Turnoff Light、Logo Light である。',
      'Position Light は white、red、green の light を含む。',
      'これらの exterior light は主に P5 Forward Overhead Panel lower edge の exterior lighting control switches で control される。'
    ]
  },
  q_33_fd340a21d555: {
    evidence_page_codes: ['D4-11', 'D4-12'],
    evidence_terms: ['TAXI', 'NOSE GEAR', 'DOWN', 'LOCK'],
    answer_lines: [
      'Nose Gear Taxi Light は nose landing gear strut 前面、nose wheel steering actuator 下部にあり、P5 Forward Overhead Panel の Taxi Light switch で control される。',
      '点灯条件としては、Taxi Light switch により点灯指令があり、nose landing gear が down and locked position にあることが必要である。',
      'Study Guide では Nose Gear Taxi Light が OFF になる条件として、Nose Landing Gear switch が Auto、または Nose Landing Gear が Down & Lock position でない場合が示されている。',
      '連続点灯は避け、5 分以上 operation しないこと。点灯させた時間と同程度、OFF にして冷却する。'
    ]
  },
  q_33_82c6d5553360: {
    evidence_page_codes: ['D4-04', 'D4-05'],
    evidence_terms: ['LANDING LIGHT', 'FIXED', 'RETRACTABLE', 'ON', 'EXTEND', 'RETRACT'],
    answer_lines: [
      'Landing Light には Fixed Landing Light と Retractable Landing Light がある。目的は takeoff/landing 時の runway 視認性を向上させることである。',
      'Fixed Landing Light は左右 wing root 付近にあり、P5 の 2-position switch で control する。Switch ON で 115V AC が step down transformer に送られ、28V に下げられて lamp が点灯する。',
      'Retractable Landing Light は fuselage の ram air inlet panel 横にあり、P5 の 3-position switch（RETRACT/EXTEND/ON）で control する。',
      'RETRACT では light は retract して消灯、EXTEND では aircraft water line と平行になるまで extend、ON では extend して full extension の 5 度以内になると light が点灯する。',
      'Retractable landing light の extend/retract motor には 115V AC が使用され、light は switch が ON position の時だけ点灯する。'
    ]
  },
  q_33_2c633a1e402a: {
    evidence_page_codes: ['D5-01', 'D5-08', 'D5-09'],
    evidence_terms: ['EMERGENCY', 'ARM', '12V', 'DC BUS', 'AUTOMATIC'],
    answer_lines: [
      'P5 Emergency Exit Light Switch が ARM position の時、system は automatic operation の準備状態になる。',
      'ARM position で 28V DC Bus 1 の voltage が 12V 以下になる、つまり aircraft DC power が失われた状態になると、Emergency Light は automatic に点灯する。',
      'D5-08 の記述では、P5 switch が ARM position の場合でも Attendant Panel Emergency Exit Switch を ON にすると power supply により Emergency Light が点灯する。'
    ]
  },
  q_33_b19bde9db2b2: {
    evidence_page_codes: ['D5-08', 'D5-09'],
    evidence_terms: ['MANUAL', 'P5', 'ATTENDANT', 'ON', 'TEST SWITCH'],
    answer_lines: [
      'Emergency Light を manual に点灯させる方法は、P5 Forward Overhead Panel の Emergency Exit Light Switch を ON position にする方法である。',
      'もう 1 つは Attendant Panel の Emergency Exit Switch を ON position にする方法である。Attendant switch を使用すると、P5 switch が OFF でも Emergency Light を点灯できる。',
      '整備/点検目的では、各 power supply の battery test switch を押すと、その power supply circuit に接続された emergency light が約 1 分間点灯する。'
    ]
  },
  q_33_e77770eceb44: {
    evidence_page_codes: ['D5-02', 'D5-08', 'D5-09'],
    evidence_terms: ['NOT ARMED', 'MASTER CAUTION', 'OVERHEAD', 'ANNUNCIATOR'],
    answer_lines: [
      'P5 Forward Overhead Panel の Emergency Exit Light Switch を ON または OFF position にすると、Emergency Exit Light NOT ARMED light が点灯する。',
      'NOT ARMED light は、Emergency Light system が ARM されておらず automatic operation の準備状態ではないことを示す。',
      '同時に Master Caution Light と OVERHEAD annunciator light も点灯する。',
      'この質問の ANN L/T は、Master Caution system 側の OVERHEAD annunciator light を指すと考えればよい。'
    ]
  },
  q_33_fd7f9c395616: {
    evidence_page_codes: ['D5-01', 'D5-02', 'D5-03', 'D5-04', 'D5-05', 'D5-06', 'D5-07'],
    evidence_terms: ['COMPONENT', 'LOCATION', 'FUNCTION', 'POWER SUPPLY', 'EXIT SIGN', 'AISLE', 'SLIDE'],
    answer_lines: [
      'P5 Emergency Exit Light Switch は P5 Forward Overhead Panel にあり、Emergency Light の ON/ARM/OFF control を行う。',
      'P5 NOT ARMED light は P5 switch が ON または OFF の時に点灯し、system が armed でないことを示す。',
      'Attendant Panel の Exit Light Switch は P14 Aft Attendant Panel にあり、ON/NORMAL control を行う。',
      'Power Supply は forward/aft entry area の ceiling panel 裏側、および floor 近くの side structure にあり、internal battery を充電状態に保ち、automatic または switch command により Emergency Light へ 6.1V DC を供給する。',
      'Exit Sign Light は passenger door、service door、overwing hatch、aisle ceiling にあり、exit 位置を示す。',
      'Aisle Light は passenger cabin 前方から後方までの bullnose ceiling panel にあり、通路付近を照明する。',
      'Floor Proximity Light は exit 近くの sidewall と left side seat 側にあり、floor level で exit 方向を示す。',
      'Slide Light は aircraft exterior surface の各 exit 後方にあり、機外 exit 付近を照明する。'
    ]
  },
  q_33_7e64f70651d7: {
    evidence_page_codes: ['D5-01', 'D5-03', 'D5-04', 'D5-05', 'D5-06'],
    evidence_terms: ['EMERGENCY', 'EXIT SIGN', 'AISLE', 'FLOOR PROXIMITY', 'SLIDE'],
    answer_lines: [
      'Emergency Lighting System の light 種類は、Exit Sign Light、Aisle Light、Floor Proximity Light、Slide Light である。',
      'Exit Sign Light は exit の位置を示す。Aisle Light は通路付近を照明する。',
      'Floor Proximity Light は床面で exit 方向を示す。Slide Light は機体外部の exit 付近を照明する。',
      'System 全体としては機内外と exit path を照明し、非常時の passenger/crew evacuation を補助する。'
    ]
  }
};
