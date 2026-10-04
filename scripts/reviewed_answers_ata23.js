function answer(evidencePageCodes, ...answerLines) {
  return {
    evidence_page_codes: evidencePageCodes,
    answer_lines: answerLines
  };
}

module.exports = {
  q_23_d0f057bd346f: answer(['D1-01', 'D1-02', 'D1-03', 'D1-08', 'D1-09', 'D1-10'],
    'FI SystemはFlight Crew相互、Ground Crewとの交信、Communication SystemへのAccess、Navigation ReceiverのMonitorに使用する。',
    '主要ComponentはACP、REU、Remote MIC Switch、Control Wheel MIC Switch、Flight Interphone Speaker、Hand/Oxygen/Boom MIC Jack、Headphone Jack。REUはE4-1 Rack、External Flight Interphone JackはP19 External Power Panelにある。',
    'CrewがACPでTransmitter/Receiver/Volume/PTTを選び、MIC AudioとPTTはREU経由でCommunication Transceiverへ、受信AudioはREUからHeadset/Headphone/Speakerへ送られる。'),

  q_23_6fa9166a6c7a: answer(['D1-15', 'D1-16'],
    'REUはCaptain/F/O/ObserverのStation CardとAAU Cardにより、Flight Interphone、Service Interphone、PA、Communication/Navigation Audio、Alert Toneを選択・合成・増幅・分配する。'),

  q_23_ba8a614b38c4: answer(['D1-12', 'D1-13'],
    'ACPでALTを選ぶとEmergency Modeとなり通常回路をBypassする。Captain/ObserverはVHF-1、F/OはVHF-2に直接接続され、PTTのR/Tのみで送受信する。Hand MICは使用できない。'),

  q_23_854d9dc03b77: answer(['D1-01', 'D1-06'],
    'Navigation Alert Audioの4つは、GPWS/GPWC、Weather Radar Windshear、TCAS、FCCのAltitude Alert/Altitude Window Alert。'),

  q_23_145ee54e2d4f: answer(['D2-01', 'D2-02', 'D2-03', 'D2-04', 'D2-05'],
    'SI SystemはFlight Crew、Cabin Attendant、Ground Crew間のService Interphone通話に使用する。',
    '主要Component/Locationは、P5 Aft Overhead PanelのService Interphone Switch、P8 Aft Electronic Panel aft faceのHandset Interphone Jack、Forward/Aft Attendant StationのAttendant Handset、機体各部のService Interphone Jack。',
    'REUのAAU CardがFlight Compartment MIC/Handset、Attendant Handset、Service Interphone JackのAudioをMix/Amplifyし、Flight Crew Headset/Speaker、Service Headset、Attendant Handsetへ送る。'),

  q_23_709bc1feb618: answer(['D2-02'],
    'SI JackはE/E Compartment、Fueling Station、Right Wheel Well forward fairing exterior前、Left Wheel Well forward fairing exterior前、Aft Cabin Attendant Station上方天井、APU Service AreaのSection 48 Access Door近傍にある。'),

  q_23_a2607fbf85d0: answer(['D2-01', 'D2-04', 'D2-05'],
    'P5 Aft Overhead PanelのService Interphone SwitchをONにすると、External Service Interphone JackのMicrophone InputをService Interphoneに接続し、Ground CrewがFlight Crew/Attendant/Ground Crew間で通話できる。'),

  q_23_0f1051338709: answer(['D3-01', 'D3-02'],
    'P5 Passenger Sign PanelのGRD CALL Switchを押すと、Nose Wheel Well forward wallのGround Crew Call Hornが鳴る。Switchを離すとHornは停止する。'),

  q_23_fe45efbb377c: answer(['D3-03', 'D3-04', 'D3-05', 'D4-01', 'D4-04', 'D4-05', 'D4-06'],
    'GNDからはP19 External Power PanelのPILOT CALL Switchを押すと、ACPのINT Call Lightが点灯しFlight CompartmentでHI Chimeが鳴る。',
    'CBNからはAttendant Handsetの2 ButtonでPilot Callすると、ACPのCABIN Call Lightが点灯しHI Chimeが鳴る。RESET ButtonまたはHandsetをCradleに戻すと解除される。'),

  q_23_b55819d2f5f9: answer(['D4-01', 'D4-02', 'D4-04', 'D4-05', 'D4-06'],
    '呼出側がAttendant Handsetの5 Buttonを押すと、Encoded SignalがHandset Logic Control CardのTone Decoderへ入る。',
    '相手側Attendant StationのCall Lightが点灯し、PA AmplifierへのDiscreteでCabin SpeakerからHI/LO Chimeが鳴る。相手がHandsetを取るかRESETすると消灯する。'),

  q_23_32e5be43f528: answer(['D4-04'],
    'Forward/Aft Attendant Panel内のCardはHandset Logic Control Cardで、Crew Call CircuitとCabin Interphone Circuitを扱う。'),

  q_23_19c3b2e59824: answer(['D5-01'],
    'PA Systemの4機能は、PA Announcement、Chime、Boarding Music、Pre Recorded Announcement。'),

  q_23_ea3d04e42510: answer(['D5-03', 'D5-04'],
    '主要Component/Locationは、E1-3 ShelfのPA Amplifier、P5 Forward Overhead PanelのPassenger Sign Panel、P8 Aft Electronic PanelのPA MIC Connector/PA Hand MIC、Forward Lavatory wallのPRAM、Forward/Aft Attendant StationのAttendant Handset、Passenger CabinのPSU/Cabin/Lavatory/Attendant Speaker。'),

  q_23_736bace9945b: answer(['D5-15', 'D5-16'],
    'PA Amplifierは入力AudioのPriorityを判定し、最優先Audioを増幅してPSU/Lavatory/Attendant SpeakerやPES/REUへ送る。',
    'その他にChime生成、Side Tone送出、Speaker Network/Output Level/Test、Gain Controlを行う。'),

  q_23_3040abd0088f: answer(['D5-05', 'D5-10', 'D5-15'],
    'Priorityは高い順に、1 Flight Compartment Announcement、2 Attendant Announcement、3 Pre Recorded Announcement、4 Video Entertainment Audio、5 Boarding Music。ChimeはPriority Logicに左右されず他Audioと同時に流れる。'),

  q_23_0e4df080c2cd: answer(['D5-05', 'D5-06', 'D5-10', 'D5-15'],
    'REUはEngine Running Relay入力を受け、Engine 1または2が作動するとPA Amplifier Gainを6 dB上げる。Decompression時はOxygen Indicator Relayによりさらに3 dB上げる。',
    'Master Gain Control Potentiometerで基本Gainを調整し、LEVEL positionで70.7 Vに合わせる。'),

  q_23_2f14945bd648: answer(['D5-01', 'D5-05', 'D5-06', 'D5-18'],
    'Captain Mic/Boom/Oxygen/Hand MicでPAを選択しPTTを押す → ACP/REU経由でPA AmplifierへFlight Compartment AudioとPTT → Priority 1で増幅 → PSU、Lavatory、Cabin/Attendant Speakerへ送られる。',
    'Side ToneはPA AmplifierからREUへ戻り、Flight Crew Headset/Flight Compartment SpeakerでMonitorできる。'),

  q_23_67a8598753b6: answer(['D6-01', 'D6-02', 'D6-03', 'D6-04'],
    'VHF Systemは118.000〜136.975 MHzで、航空機間および地上局と見通し距離のVoice/Data Communicationを行う。',
    '主要ComponentはRCP、VHF Transceiver、VHF Antenna。RCPはP8、Transceiver 1はE1-3、2はE1-5、3はE3-3 Shelf、AntennaはFuselage top/bottom center line上にある。'),

  q_23_4830dd957c66: answer(['D6-04', 'D7-04', 'D7-05'],
    'VHF AntennaはFuselageのTopおよびBottomのCenter Line上。HF AntennaはVertical Stabilizer Leading Edge、HF Antenna CouplerはVertical Stabilizer内部にある。'),

  q_23_aa2243903242: answer(['D7-01', 'D7-03', 'D7-04', 'D7-05', 'D7-06'],
    'HF Systemは2.000〜29.999 MHzを使い、地表面/電離層反射による長距離Voice Communicationを航空機間および航空機−地上局間で行う。',
    '主要ComponentはRCP、HF Transceiver、HF Antenna Coupler、HF Antenna。RCPはP8、TransceiverはE6-2 Shelf、CouplerはVertical Stabilizer内、AntennaはVertical Stabilizer Leading Edgeにある。'),

  q_23_07c949aa27ac: answer(['D6-08', 'D6-09'],
    'RCP内部故障ではActive Frequency IndicatorにFAILが表示され、Standby Frequency IndicatorはBlankになる。',
    '故障RCPのPort Select Discreteが切り替わり、他RCPからCrosstalk/Output Tune Bus経由で該当TransceiverをTuningできる。'),

  q_23_ac44c01ea721: answer(['D7-10', 'D7-12', 'D7-14', 'D7-15', 'D7-17', 'D7-18'],
    'HF CouplerはTransceiverの50 Ω Output Impedanceと選択FrequencyでのAntenna Impedanceを整合させ、VSWRを1.3:1以下にする。',
    'Transmit前のTune ModeでResonance/Load/VSWRを調整する。Tune中は1 kHz toneが聞こえ、通常2〜4秒、最大7秒で完了する。'),

  q_23_4e6bf8bafaa8: answer(['D6-09'],
    'Off Side Controlは、あるRCPから本来のOn Side以外のTransceiverを選択してControlする機能。',
    'Off Side Radioを選ぶと、使用する側のRCPと選択を行ったRCPの2箇所でOff Side Tuning Lightが点灯する。RCPは同時に1 Transceiverのみ選択できる。'),

  q_23_15bfa3e82f63: answer(['D7-14', 'D7-16'],
    'RCPでHF Frequency/Modeを選びMICをKeyingすると、PTTがREUからTransceiverとCouplerへ送られる。初回PTTでCouplerのTune Sequenceが始まる。',
    'CouplerがTransceiverと50 ΩにImpedance整合しTune完了後にReceive/Operate Modeへ入る。その後PTTでTransmit Modeとなり、MIC Audioで変調されたRFがCouplerを通ってAntennaから送信される。'),

  q_23_c7b4c67b70e4: answer(['D8-01', 'D8-02', 'D8-03', 'D8-04'],
    'SELCAL SystemはAirline地上局からの呼出しをVisual/AuralでFlight Crewに知らせ、Company Communication Channelの常時Monitorを不要にする。',
    '主要ComponentはSELCAL Decoder、SELCAL Program Switch Module、SELCAL Aural Warning Relay。DecoderとProgram Switch ModuleはE/E Compartment E4 Rack（ModuleはDecoderの裏側）、Aural Warning RelayはNose Wheel Well左側J22 Panelにある。'),

  q_23_5d5419c3366e: answer(['D8-05', 'D8-07'],
    'SELCAL Program Switch Moduleの4つのDIP Switch Groupで4 Letter Codeを設定する。各Letterは異なるAudio Toneに対応する。'),

  q_23_53846d40362a: answer(['D8-01', 'D8-05', 'D8-08'],
    '該当VHF/HF Transmitter SelectorのACP Call Lightが点灯し、Aural Warning ModuleがHI/LO Chimeを1回鳴らす。Control Wheel MIC SwitchまたはACP RT/IC SwitchでResetする。'),

  q_23_23e067943823: answer(['D9-01', 'D9-02', 'D9-03', 'D9-04'],
    'SATCOM Systemは航空機とGround Earth Station/Satellite Network間で長距離Voice/Data Communicationを行うMobile Communication System。',
    '主要Component/Locationは、Aft Cargo Compartment E6 RackのSDU、HPA、Program Switch Module、Fan、Cabin Ceiling上のLNA/DIP、Fuselage上部のHGA、Flight CompartmentのCDU/ACP。'),

  q_23_89babf1cd5fa: answer(['D9-04', 'D9-05', 'D9-07', 'D9-17'],
    'HGAはFuselage上部にあり、AircraftとSatellite間のRF Signalを送受信する。',
    '電気的Phased ArrayによりBeamをSatelliteへ向け、RXとTXの異なるBandを同時に扱うFull Duplex Operationができる。Beam SteeringはSDU/HPA経由のControlで行う。'),

  q_23_6c41a88381fc: answer(['D9-04', 'D9-06', 'D9-07'],
    'LNAはAntennaで受信した低LevelのSatellite RF Signalを増幅する。DiplexerとTransmit/Receive Switchは送信と受信の経路を分け、TransmitはHPAからAntennaへ、ReceiveはAntennaからLNA/SDUへ通す。'),

  q_23_4784d229ad41: answer(['D10-01', 'D10-03', 'D10-04', 'D10-05', 'D10-07', 'D10-08'],
    'ACARSは航空機とAirline地上局間のDatalink Communication Systemで、Uplink/Downlink、OOOI、Engine Performance、Flight Status、Maintenance Item等を扱いCrew Workloadを低減する。',
    '主要Component/LocationはP9のCDU/Printer、P8/P5のRCP/ACP、E4-1 ShelfのACARS MUとその裏側のProgram Switch Module/APM。VHF 3、PSEU、FMCS、FDAU、Data Loader、SDUともInterfaceする。'),

  q_23_e18ae3bd2901: answer(['D11-01', 'D11-02', 'D11-03'],
    'Voice Recorder SystemはFlight Crew Communication、Flight Compartment Sound、Timeを連続記録し、最新120分をMemoryに保持する。REUとArea MicrophoneからAudioを受ける。',
    '主要ComponentはP5 Forward OverheadのCockpit Voice Recorder PanelとAft Cargo Compartment E6 RackのVoice Recorder Unit。ULBはRecorder Unit Front Panelにある。'),

  q_23_ae9f5c4ecf1c: answer(['D11-03', 'D11-08'],
    'AirplaneにPowerがありVoice Recorder Circuit BreakerがCloseしている間、Voice Recorderは連続作動する。'),

  q_23_32f9a3154496: answer(['D11-01', 'D11-03', 'D11-09'],
    'Bulk EraseはAirplane On GroundかつParking Brake Set時のみ可能。ERASE Switchを1.5秒保持するとMemory内の全Audio Dataを消去し、Erase中はHeadphone Jackで400 Hz toneが約5秒聞こえる。'),

  q_23_b63c14ea4033: answer(['D11-01', 'D11-03', 'D11-08'],
    '最新120分間を4 Channelで記録する。Channel 1〜3はCaptain、F/O、First ObserverのMicrophone/Headphone Audio、Channel 4はCockpit Voice Recorder PanelのArea MicrophoneによるFlight Compartment Audio。'),

  q_23_aea476dce294: answer(['D11-01', 'D11-03', 'D11-08'],
    'Cockpit Voice Recorder PanelのHeadphone JackまたはP28 APU Ground Control PanelのCVR Monitor JackにHeadsetを接続し、4 ChannelをMixしたRecorded AudioをMonitorする。'),

  q_23_c8c2293bfc89: answer(['D11-03', 'D11-08', 'D11-09', 'D11-11'],
    'Voice RECのOFF LightはRecorderが正常に記録できない状態を示す。SGのBITE/Test記載では、正常時はGreen Status Indicatorが一瞬点灯しBITE IndicatorはOff、Fail時はStatus IndicatorがOffのままでBITE Indicatorが点灯する。'),

  q_23_3e6e83d619cd: answer(['D12-01', 'D12-02', 'D12-03'],
    'ELTは急激な機速変化を検知しEmergency Signalを送信し、Search/Rescue CrewへHoming SignalとSatellite用Digital Distress Signalを提供する。',
    '主要Component/LocationはP5 Aft OverheadのELT Control Panel、Aft Passenger Cabin Ceiling Access Panel上部STA 794のELT Transmitter、Fuselage上部STA 797のELT Antenna。'),

  q_23_fed84fcd33c3: answer(['D12-04', 'D12-05', 'D12-07'],
    '自動はControl PanelとTransmitter Front PanelがARMEDの状態で、G Switch/Acceleration Sensorが過大な速度変化を検知すると作動する。',
    '手動はELT Control Panel SwitchまたはTransmitter Front Panel SwitchをONにすると作動する。'),

  q_23_d3860b5a7039: answer(['D12-01', 'D12-03', 'D12-04', 'D12-05', 'D12-06'],
    '121.5 MHzと243.0 MHzはVHF/UHF Emergency ChannelのSwept Tone/Homing Signalで、406 MHz送信中以外は連続送信し位置精度は約20 km。',
    '406 MHzはCOSPAS/SARSAT向けDigital Distress Signalで、約50秒ごとに約440 msec送信する。ELT/aircraft識別情報を含み位置精度は約2 km。'),

  q_23_18633cd26ad7: answer(['D12-03', 'D12-04', 'D12-05', 'D12-06', 'D12-07', 'D12-08'],
    'Self TestはON後50秒以内に行い、誤送信を避けてTest後はSwitchをOFF/RESETしARMEDへ戻す。Emergency使用後、使用時間不明、1時間以上使用、交換期限、Leak/Corrosion/消耗時はBatteryを交換する。',
    '手動作動後は作動に使ったControl PanelまたはELT Front Panel SwitchをOFF/RESETにして送信を停め、ARMEDへ戻す。'),

  q_23_9ab5dd8fcb63: answer(['D13-01'],
    'Static Dischargerは機体に帯電した静電気を機体から離れた位置で放電し、無線通信機器や受信Antennaへの干渉を最小にする。'),

  q_23_340b17e85387: answer(['D14-01', 'D14-02', 'D14-03', 'D14-04'],
    'PES Audioは各Passenger SeatへRecorded Entertainment AudioとPassenger Address Audioを送り、Passengerが複数Channelから1つを選ぶSystem。',
    '主要Component/LocationはE/E CompartmentのAEPとAMUX、Passenger CompartmentのBITE Panel、SEB、PCU。AMUXがAnalog AudioをDigitalに変換し各ColumnのSEBへ配信、SEBが選択ChannelをAudioに戻しPCU Headphone Jackへ送る。'),

  q_23_db91d96190d7: answer(['D14-04'],
    'Audio BITE PanelはAMUXへCommandを送り、Seat Configurationの変更、PES Audio Testの開始、Memory内FaultのReviewを行う。AMUXから受けたDataをPanelに表示する。'),

  q_23_ce9eacc91f55: answer(['D15-02', 'D15-09'],
    'DIUはAirshowとしてPassengerにFlight Informationを提供する。ADIRUからAirspeed/Altitude/Temperature/Heading/Ground Speed等、FMCからPresent Position等を受け、Video SignalをVSCUへ送る。DIUはDigital Media Server（DMS）とも呼ばれる。'),

  q_23_fc4b2f3373c4: answer(['D16-01'],
    '1. 全席個人DisplayでAVODとDigital Broadcast Video/Audioを提供。',
    '2. Overhead Videoは装備せず、Business ClassのPre-Flight Safety Demoは客室乗務員が実演。',
    '3. Game機能を提供。',
    '4. PRAM/BMMとMoving Map（iXplor）をIFE LRUから提供。',
    '5. 2台のHi-8 VCPでShort Programを提供。',
    '6. IFE Seat Network経由でPC用電源を提供。',
    '7. Cameraと座席電話は装備しない。',
    '8. Business Class SeatにPC用電源を利用する専用Reading Lightを装備。',
    '9. Reading Light/Attendant Call等のPSSと独立し、PCUにPSS Buttonはない。'),

  q_23_75b788e9fe02: answer(['D16-02', 'D16-03', 'D16-04'],
    'Head EndはFwd Lavatory aft sideのCP/Data Port、Business Class left stowage binのVCC（2 VCP/2 ME）、E/E Bay E8 RackのSCと3 FS。',
    'Distribution/Seat LRUはCabin前後CeilingのADBとMCU、Seat下のVSEB、Business Class armrest/Economy seat backのSM、SeatのPCU、PC Power装備SeatのISPS、Seat armのRJU。'),

  q_23_f22b8be31d5f: answer(['D16-01', 'D16-04', 'D16-06'],
    'Video/AudioはEthernet Distribution NetworkでDigital AVODまたはDigital Broadcastとして配信される。Digital VideoはMPEG1、Digital AudioはMP3 Encoding。',
    'VideoはSMでDemodulateして個人Displayに表示、Video/AudioのAudioはSMでAnalogに戻しVSEB経由でRJU/Headphoneへ送る。'),

  q_23_e7a3d3ce2c6b: answer(['D16-08'],
    'Fwd Attendant PanelのIFE/PC POWER SwitchをONにするとCPがLoadingを開始する。Software VersionとBlink Cursorが約1分30秒表示される間は、PowerのRecycleやScreenへのTouchをしない。約5分後、Welcome Screenが出ればPower Up完了。'),

  q_23_3f4cfd02c8ea: answer(['D17-01', 'D17-02', 'D17-03'],
    'FDEVSSは3つのNear-Infrared/Black and White Camera、VIU、Camera Control Panel、表示先のLower Center MFDで構成される。',
    'CPはP8 Aft Electronic Panel、MFDはFlight Compartment、VIUはPassenger Cabin STA 336.47 LBL9.60のCeiling Panel Frame、Camera 1/2/3はFlight Deck Door近辺のCeilingにある。'),

  q_23_8d1419a9b489: answer(['D17-02', 'D17-04'],
    '作動にはPowerとCDS/MFD Interfaceが不可欠。VIUは115 V AC Transfer Bus 1をP6 CCB経由で受け、各Cameraへ12 V DCを供給する。CameraはVIUへ白黒Video Signalを送り、CDSのLower Center MFDに表示する。'),

  q_23_60ffdf58f819: answer(['D17-02', 'D17-04', 'D17-05'],
    '表示場所はLower Center Multi-Function Display。Camera Control Panelの3-Position Rotary SwitchでCamera 1（L）/2（C）/3（R）を選び、DSPL Buttonを押すと選択Camera映像が表示される。同時表示は1 Cameraのみ。')
};
