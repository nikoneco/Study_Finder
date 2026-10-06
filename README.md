# 737-800勉強

737-800資格勉強のためのPWA。トップで「筆記試験」「口頭試験」を選ぶ。

- 筆記試験：これまでの737 Study Finder。標準問題集のATA別・ランダム出題、SGを根拠にした回答、関連図、略語辞書を提供する。
- 口頭試験：評価シートREV-3の大問（照査項目）を選び、その中の小問を順に確認する。AMM・SG等を根拠にした回答の要点、資料ページ、根拠不足の箇所を表示する。

- 作業ルート：`D:\アプリ開発\737-800勉強`
- [公開PWA](https://nikoneco.github.io/Study_Finder/)
- [GitHub](https://github.com/nikoneco/Study_Finder)
- Google側の保存先・GAS・Sheetは従来どおり。管理先はローカル設定とObsidianの申し送りで確認する。
- 申し送り：`D:\Dropbox\Obsidian\1.Application\Projects\737 Study Finder.md`

## 構成

| 場所 | 役割 |
| --- | --- |
| `gas/` | GASバックエンドと画面ソース。claspのrootDir |
| `web/` | Pages専用の試験選択・口頭学習画面とモード切替。GAS直表示版には適用しない |
| `assets/answer-figures/` | 質問IDに紐付く回答図 |
| `scripts/` | PDF抽出、CSV同期・生成、質問境界・整合検証 |
| `tools/` | 独立したPages生成と公開構成の検証 |
| `docs/` | このリポジトリのPages生成物。直接編集しない |
| `data/` | ATA別の派生CSV。Git管理対象外 |
| `data/oral/` | 原文索引、非公開資料のページ抽出、レビュー用解答、初回登録用データ。Git／Pagesへの公開禁止 |
| `Study_Guide/`、`標準問題集/` | 根拠となるPDFと補助教材。PDF・Wordとも公開禁止 |
| `.clasp.json` | 既存GASへの接続設定。Git管理対象外 |
| `Codex 申し送り.txt` | 初期設計の履歴資料。現行仕様の正本ではない |

公開運用データの正本はGoogle SheetsのStudy737_DB。筆記の質問は標準問題集、回答・略語はSGで裏取りする。口頭の質問・条件は評価シートREV-3、回答は収集AMM・SG等で裏取りする。質問IDと回答・根拠の対応を守り、Sheetで直接編集されたデータを古いローカル生成物で上書きしない。

## 作業コマンド

以下は新ルートで実行する。生成・同期系の詳細は`scripts/README.md`を参照。

```powershell
node scripts\validate_study_data.js
python scripts\validate_question_extractor.py "標準問題集\737-800標準問題集(2012.03.13).pdf" --data-dir data
node tools\build-pages.js
node tools\check-project.js
python -X utf8 scripts\prepare_oral_assessment.py
python -X utf8 scripts\test_oral_assessment.py
python -X utf8 scripts\prepare_oral_sources.py
node scripts\build_oral_data.js --partial
# 全279小問の根拠・条件・資料ハッシュの検証後に初回登録用JSONを生成
node scripts\build_oral_data.js
```

`clasp`も新ルートで実行する。移動に伴うGAS・Drive・SheetのID変更や再デプロイは不要。

## GitHubとPages

2026-10-04にコード・教材・データ212ファイルと専用スクリプト33ファイルの実体をこのルートへ移動した。移動前後の全245ファイルのSHA-256一致を確認した後、スクリプトの参照パスを新ルートへ修正した。

このルートは独立したGitリポジトリで、`origin`は`nikoneco/Study_Finder`。新リポジトリの履歴は移行時の現行コードのスナップショットから開始する。従来の履歴は趣味HUBリポジトリに残る（Study Finderの画面・GASの移行元は`8cfb98f`）。

```powershell
git status --short
node tools\build-pages.js
node tools\check-project.js
# 確認後、変更対象だけcommit/pushする
```

Pagesは`main`ブランチの`/docs`から公開する。Actionsは再ビルド・公開構成・コミット済み生成物との一致を検証する。依存ライブラリのインストールは不要。

趣味HUBの旧入口`/hobby-hub/737-study-finder/`は新PWAをiframeで表示する中継ページになる。GAS直表示版が利用する旧回答画像URLも互換配信を維持する。

PWAのmanifestとService Workerのscopeは`/Study_Finder/`。キャッシュ削除は`study-finder-pwa-`だけに限定し、他の同一ドメインのPWAを巻き込まない。Google側へのコード反映・データ更新はGitHubへのpushとは別工程。

トップは`/Study_Finder/`、筆記は`#written`、口頭は`#oral`。モード切替では同じDOMを表示切替するため、読み込んだ筆記問題・回答を保持する。PWAの名前は「737-800勉強」、manifest ID・scope・公開URLは従来と同じ。トップと口頭を開いた段階では口頭APIを呼ばず、「分野選択」で待機する。REV-3の9分野の名称だけをナビゲーションとしてローカル保持し、「すべての分野」は設けない。分野選択後、`apiGetOralGroupBundle`でその分野の全大問・小問・回答・根拠情報を同じSheet snapshotからまとめて取得する。分野内の大問切替と読み込み済み分野への復帰はページ内メモリから即表示し、大問・小問・回答開示の位置を保持する。検索は選択分野内だけ。同一分野の実行中取得は共有し、後着応答で別分野を上書きしない。全bundleの対応を検証してからまとめてキャッシュへ登録する。

JSONPが3秒で返らない場合、読み取り専用のHtmlService frame経路を1本だけ並行開始し、先に返った応答を使う。origin・nonce・API名・iframe ancestryを照合し、後着応答を無視して資源を片付ける。frame経路にはbootstrap／保存／importを許可しない。従来のJSONP再試行は保持する。`Study API timing`のdebugログはAPI名・経路・総時間・GAS内部時間だけを記録する。Sheetの直接修正を即再確認できるよう、再読み込みをまたぐ回答キャッシュは導入しない。

評価シートの「照査項目」を大問、その中の番号付き項目を小問として扱う。55大問・279小問（小問内の補足を別問題と数えない）。LEVELの混在、番号重複・欠番、機種条件、ATA28(47)を保持する。各回答の要点を評価項目と根拠資料へ対応付け、根拠がない箇所は推測せず不足点を明示する。Hand Pump、Manual Procedure、65-degree maintenance position等の類似手順を勝手に同一視しない。

口頭の選択は学習分野・大問検索・大問一覧で行う（ATA選択は筆記だけ）。ATA情報は大問の説明と検索対象に残す。原本の「・」だけの4行は画面に表示せず、同じLEVELの連続した折り返し47か所は文をつなぐ。これは表示処理だけで、原条件714行・質問ID・回答の`prompt_indexes`は保持する。回答側の「対応する評価項目」も同じ表示処理を使う。

追加取得資料は`標準問題集/追加MM,EPM資料/`に別保管し、既存`口頭MM/`と混ぜない。受験者資料`口頭MM/過去資料/`は、一次マニュアルで取れない部分の暫定回答に採用できる（2026-10-06ユーザー指示）。その回答は「裏付け中」と表示し、AMM・SG等で確認済みとは扱わない。一次資料を優先し、旧手順・数値・適用条件の相違を混在させず、原本・抽出本文・画像は非公開のまま保持する。Word資料の根拠はページでなく原文段落番号を表示する。

## 口頭データと更新境界

- 専用タブは`oral_sections`（大問）、`oral_questions`（小問・原条件）、`oral_answers`（要点・不足点）、`oral_sources`（資料メタデータ）。筆記の既存タブへ混ぜない。
- `gas/OralService.gs`の公開APIは`apiGetOralGroupBundle`、互換用の`apiGetOralStart`、`apiGetOralSections`、`apiGetOralSectionBundle`の読み取りのみ。公開側から保存・インポートはできない。分野bundleにも既存の資料ホワイトリストと根拠不足への格下げ処理を適用する。
- 回答は`supported`（根拠確認済み）、`partial`（一部不足）、`insufficient`（根拠不足）。資料ID・ページ・評価項目との対応が壊れた回答を確認済み扱いしない。
- 公開画面には要点・資料名・ページ・所在箇所だけを渡す。元PDF、抽出全文、レビュー用引用、ローカルパス、認証情報は含めない。
- ローカルの`build_oral_data.js`は検証と初回登録用JSONの生成だけを行う。Sheetへの自動上書きはしない。運用開始後の更新は、対象タブの最新データを取得・バックアップしてから、変更するID／セルだけを更新する。
- Sheetを直接編集した後はPWAを再読み込みする。`points_json`の`prompt_indexes`は同じ小問の評価項目を指す0始まりの番号であり、質問や資料の対応を崩さない。資料が変わった場合は本文・適用性を再レビューする。
