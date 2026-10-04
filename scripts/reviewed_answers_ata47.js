module.exports = {
  q_47_de326496f487: {
    evidence_page_codes: ['D0-01', 'D0-02'],
    answer_lines: [
      'Nitrogen Generation System (NGS) の目的は、Center Tank 内の燃焼性が高い Mixture Air の酸素含有量を下げること。',
      '作動概要:',
      '- Left Pneumatic Manifold から Bleed Air を使用する。',
      '- NGS Shutoff Valve が System への Bleed Air Flow / Pressure を Control する。',
      '- Ozone Converter が Ozone を酸素に変換する。',
      '- Heat Exchanger と Ram Air Valve が Bleed Air Temperature を 160 +/- 10 F に Control する。',
      '- Filter が ASM へ入る Air から不純物を除去する。',
      '- ASM が酸素を分離し、Nitrogen Enriched Air (NEA) を作る。',
      '- High Flow Valve と NEADS が NEA を Center Tank へ送る。'
    ]
  },
  q_47_7ffb829cb1e3: {
    evidence_page_codes: ['D0-01'],
    answer_lines: [
      'Nitrogen Generation System の 7 つの Function は次の通り。',
      '- Air Pressure の Control。',
      '- 空気中の Ozone を酸素に変える。',
      '- Air Temperature を減少させる。',
      '- 空気中から不純物を取り除く。',
      '- 空気中から酸素を取り除く。',
      '- Center Tank へ Nitrogen Enriched Air を供給する。',
      '- System Performance Check を行う。'
    ]
  },
  q_47_d99a4b9dc31f: {
    evidence_page_codes: ['D0-01', 'D0-03'],
    answer_lines: [
      'NGS の構成 Component / Location / 機能は次の通り。',
      '- Thermal Control Unit (TCU): Left Air Conditioning Compartment / Left Ram Air Duct Compartment。Bleed Air Pressure と Temperature を Control する。',
      '- Nitrogen Generation Component: Left Ram Air Duct Compartment。ASM で Oxygen を分離し NEA を作る。',
      '- NEADS: Left Ram Air Duct Compartment, Center Tank, Surge Tank, Left Wheel Well。NEA を Center Tank へ Distribution する。',
      '- NGS Controller: Forward Cargo Compartment 後方。System Data を集め、NGS Component を Control する。',
      '- BITE Display Unit: Right Air Conditioning Compartment。Troubleshooting / Test 用。',
      '- Operability Indicator: APU Remote Control Panel 近くの Right Wheel Well。System Condition を表示する。'
    ]
  },
  q_47_9147179745c1: {
    evidence_page_codes: ['D0-02', 'D1-01', 'D1-04', 'D1-15', 'D1-18', 'D2-01', 'D2-02'],
    answer_lines: [
      'NGS SOV から Center Fuel Tank への流れは次の Component 順。',
      '- NGS Shutoff Valve.',
      '- Ozone Converter.',
      '- Heat Exchanger.',
      '- Air Filter.',
      '- Overtemperature Shutoff Valve.',
      '- Air Separation Module (ASM).',
      '- High Flow Valve.',
      '- NEADS Duct / Backflow Prevention Check Valve.',
      '- Flame Arrestor / Ejector Nozzle.',
      '- Center Tank.'
    ]
  },
  q_47_ddd88a417906: {
    evidence_page_codes: ['D1-11'],
    answer_lines: [
      'Temperature Sensor は ASM に入る前の Air Temperature を計測し、NGS Controller へ送る。',
      '- Controller は Ram Air Valve Torque Motor を Control し、Air Temperature を 160 +/- 10 F (71 +/- 6 C) に保つ。',
      '- Air Temperature が 225 +/- 10 F (107 +/- 6 C) を超えると、Controller は NGS Shutoff Valve と Overtemperature Shutoff Valve への Power を取り除く。',
      '- 両 Valve は Close となり、System は Deactive になる。'
    ]
  },
  q_47_00cfffffb516: {
    evidence_page_codes: ['D1-02'],
    answer_lines: [
      'Bleed Pressure Sensor は Bleed Air Inlet Pressure を Monitor する。',
      '- Bleed Air Pressure が 67 psi (462 kPa) 以上になると Signal を NGS Controller へ送る。',
      '- NGS Controller は NGS Shutoff Valve と Overtemperature Shutoff Valve を Close させる。',
      '- これにより ASM と Center Tank の損傷を防止する。'
    ]
  },
  q_47_757aed8f9474: {
    evidence_page_codes: ['D1-12', 'D1-13', 'D1-14'],
    answer_lines: [
      'Thermal Switch は ASM Overtemperature 防止用の Backup Device。',
      '- 通常は Close。',
      '- Air Temperature が 270 +/- 10 F (132 +/- 6 C) に達すると Open する。',
      '- NGS Controller を介さず直接 Overtemperature Shutoff Valve を Close させる。',
      '- Temperature が低下すると Thermal Switch は Close し、Overtemperature Shutoff Valve を Open させる。'
    ]
  },
  q_47_3e3a2bad9639: {
    evidence_page_codes: ['D1-15', 'D1-16'],
    answer_lines: [
      'Air Separation Module (ASM) の構造:',
      '- Aluminum Housing 内に、何千もの薄い Polymer Fiber を持つ透過性繊維 Module。',
      '- Housing は Insulation Foam で覆われ、Overheat から保護される。',
      '機能:',
      '- Cooled Bleed Air (160 +/- 10 F / 71 +/- 6 C) から Oxygen、Carbon Dioxide、水分を取り除く。',
      '- Oxygen Enriched Air (OEA) は OEA Exhaust Duct から排出する。',
      '- 残った Nitrogen Enriched Air (NEA) を Center Tank へ送る。'
    ]
  },
  q_47_8568340da29f: {
    evidence_page_codes: ['D1-10', 'D4-01'],
    answer_lines: [
      'Filter Differential Pressure Switch は Air Filter Servicing が必要なことを表示する。',
      '- Filter 差圧が 1.2 psid (8.3 kPa) 以上になると Switch Close。',
      '- Controller に Cleaning / Replacement が必要な Signal を送る。',
      '- Controller は BITE Display Unit と Operability Indicator に Signal を送る。',
      '- 差圧が 0.3 psid (2.1 kPa) まで低下すると Switch Open し、Indication はなくなる。'
    ]
  },
  q_47_0cdf639b1163: {
    evidence_page_codes: ['D1-17', 'D1-18'],
    answer_lines: [
      'High Flow Valve の Location は Left Ram Air Duct Compartment。',
      '作動:',
      '- Center Tank への Low Flow Volume / High Flow Volume を Control する。',
      '- Low Flow Mode は Climb / Cruise で作動し、Valve は Close。Bleed Air 節約、Heat Exchanger 保護、ASM Life 向上が目的。',
      '- High Flow Mode は Descent で作動し、Valve Open。Center Tank 加圧に必要な NEA Flow を増やし、Surge Tank Vent から入る Ambient Air を減らす。',
      '- Solenoid De-Energize: Spring により Valve Gate Close、Air は Low Flow Orifice を通る。',
      '- Solenoid Energize: Inlet Air Pressure が Piston に送られ、Spring に勝って Valve Open。'
    ]
  },
  q_47_c7fa9c6d950a: {
    evidence_page_codes: ['D2-01', 'D2-04'],
    answer_lines: [
      'Cross Vent Check Valve (CVCV) の目的は、Descent 中に Right Surge Tank から Ambient Air が Center Tank に入り、Center Tank の窒素濃度を薄めることを防ぐこと。',
      '- Location: Right Surge Tank。',
      '- 通常 Close。',
      '- Descent では Center Tank Pressure を外気圧と等しくする必要があるが、CVCV は外気流入を防ぎ、NGS が NEA で Center Tank を加圧できるようにする。',
      '- Overfill 状態では Fuel を Surge Tank へ流すために Open する。'
    ]
  },
  q_47_84c7d57b8c3c: {
    evidence_page_codes: ['D3-01', 'D3-02'],
    answer_lines: [
      'NGS Controller の主な機能は次の通り。',
      '- ASM に入る Air Temperature を Control するため Ram Air Valve を作動させる。',
      '- NGS Shutoff Valve の Open / Close Command を出す。',
      '- Overtemperature Shutoff Valve の Open / Close Command を出す。',
      '- Overtemperature 状態を Monitor する。',
      '- BITE Display Unit に Indication Signal を送る。',
      '- Decreased Flow 状態を検知する。',
      '- Differential Pressure Sensor Data を受け取る。',
      '- Electrical Built-In-Test を行う。',
      '- RS422 Communication により Software Download / Controller Data Monitor を行う。',
      '- Operability Indicator と Interface し System Status Indication を行う。',
      '- Non-Volatile Memory に Flight Data を記録する。',
      '- Oxygen Sensor で ASM Performance Test を Monitor する。'
    ]
  },
  q_47_2270e5b42e88: {
    evidence_page_codes: ['D1-17', 'D1-18'],
    answer_lines: [
      'NGS Flow Mode Change の目的は、Flight Phase に応じて Center Tank へ送る NEA 量を最適化すること。',
      '- Low Flow: Climb / Cruise で使用。Bleed Air を節約し、Heat Exchanger を保護し、ASM Operation Life を向上させる。',
      '- High Flow: Descent で使用。Center Tank を NEA で加圧するため Flow を増やし、Surge Tank Vent から入る Ambient Air 量を減らす。',
      '- Controller は Differential Pressure、Altitude、Airplane System Data を使って Valve Position を決める。'
    ]
  },
  q_47_72893c831278: {
    evidence_page_codes: ['D1-18'],
    answer_lines: [
      'Oxygen Sensor は ASM 出口の酸素濃度と絶対圧を Monitor し、NGS Controller へ送る。',
      '- ASM からの Oxygen Content と Absolute Pressure を計測する Solid State Sensor。',
      '- Oxygen 濃度に比例した 4-20 mA Signal を Controller へ送る。',
      '- Absolute Pressure も 4-20 mA Signal に変換して送る。',
      '- 各 Flight Leg ごとに Controller Command で作動する。',
      '- Self Check Fault 時は 2 mA を Output し、Fault 確認までは Last Valid 値を保持する。'
    ]
  },
  q_47_fa8a23f3d136: {
    evidence_page_codes: ['D4-01'],
    answer_lines: [
      'Operability Indicator の各 Light の意味は次の通り。',
      '- OPERATIONAL (Green): System が正常に作動し、Maintenance 不要。',
      '- DEGRADED (Blue): System は Serviceable だが Decreased Capacity で作動。Maintenance は不要だが Release 前に Fault 記録が必要。',
      '- INOP (Amber): System は Serviceable ではない。NGS SOV を Manual Close and Lock し、Release 前に Fault 記録が必要。',
      '- Light が全て点灯しない場合: Operability Indicator が Not Serviceable。BDU で原因確認する。'
    ]
  },
  q_47_736a9ec7df85: {
    evidence_page_codes: ['D0-03', 'D4-02'],
    answer_lines: [
      'BITE Display Unit (BDU) の Location は Right Air Conditioning Compartment の Forward Bulkhead。',
      '- Air Conditioning Compartment 前方の Right 41 Beam 部にある。',
      '- Pneumatic Ground Connector Access Door / Right Air Conditioning Compartment Door から Access できる。'
    ]
  },
  q_47_4ae050c41339: {
    evidence_page_codes: ['F0-02', 'D0-02', 'D0-03', 'D1-02', 'D1-03', 'D1-05', 'D1-07', 'D1-11', 'D1-12', 'D1-13', 'D1-18', 'D2-01', 'D2-02', 'D3-01', 'D4-02'],
    answer_lines: [
      '図面番号 Component は次の対応。',
      '- 1: NGS Shutoff Valve。Location: Left Air Conditioning Compartment 前方。機能: NGS への Bleed Air Flow / Pressure を Control。',
      '- 2: Ozone Converter。Location: Left Air Conditioning Compartment 前方。機能: Ozone を酸素に変換し、ASM を Ozone 酸化から保護。',
      '- 3: Ram Air Valve。Location: Left Ram Air Duct Compartment。機能: Heat Exchanger の Ram Air を調整し、ASM 入口 Air Temperature を一定に保つ。',
      '- 4: Temperature Sensor。Location: Left Ram Air Duct Compartment。機能: ASM 入口前 Air Temperature を計測し、Controller に送る。',
      '- 5: Thermal Switch。Location: Left Ram Air Duct Compartment、ASM 上流で Temperature Sensor 隣。機能: Overtemperature Backup、270 +/- 10 F で OTSOV を Close。',
      '- 6: OEA Exhaust。Location: ASM から機外排出側。機能: ASM で分離された Oxygen Enriched Air を排出する。',
      '- 7: Oxygen Sensor。Location: Left Ram Air Duct Compartment 前方 / ASM Outlet Line。機能: ASM 出口の酸素濃度と絶対圧を Monitor。',
      '- 8: High Flow Valve。Location: Left Ram Air Duct Compartment。機能: Center Tank への NEA Low / High Flow を Control。',
      '- 9: Overtemperature Shutoff Valve。Location: Left Ram Air Duct Compartment。機能: Controller Fail 時の ASM Backup Protection、Overtemperature 時に Air Flow を Shutoff。',
      '- 10: High Flow Orifice。Location: High Flow Valve 内 / NEA Line。機能: Low Flow 時に Valve Gate 周りの Flow を制限して NEA Flow を作る。',
      '- 11: BITE Display Unit (BDU)。Location: Right Air Conditioning Compartment Forward Bulkhead。機能: NGS Troubleshooting / Test。',
      '- 12: NGS Controller。Location: Forward Cargo Compartment 後方。機能: Airplane Data を集め、NGS Components を Control / Monitor。',
      '- 13: Center Fuel Tank。Location: Fuselage と Left / Right Wing Inboard Section。機能: NEA を受けて酸素濃度を低下させる対象 Tank。'
    ]
  }
};
