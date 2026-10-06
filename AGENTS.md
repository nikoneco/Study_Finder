# 737-800勉強

## 対象と正本

- ローカル作業ルート：`D:\アプリ開発\737-800勉強`。既存の学習アプリ名は737 Study Finder。
- 学習モードは筆記試験（既存のStudy Finder）と口頭試験。口頭は評価シートREV-3の55大問・279小問を、大問ごとに確認する。
- 申し送り：`D:\Dropbox\Obsidian\1.Application\Projects\737 Study Finder.md`。
- このディレクトリの`README.md`、`scripts\README.md`と、アカウント共通ルールを読む。
- 筆記画面・GASソースは`gas\`、Pages専用のトップ・モード切替・口頭学習画面は`web\`、専用スクリプトは`scripts\`、画像は`assets\answer-figures\`。
- Google側のフォルダ・GAS・Sheetはローカル移動前と同じ。`.clasp.json`を保持し、対象を確認してから操作する。

## データを守る条件

- 公開運用データの正本はGoogle SheetsのStudy737_DB。ローカルCSVは派生データ。
- 問題の区切り・質問内容は標準問題集、回答・略語の正式名称／Location／機能はSGで裏取りする。
- 質問ID、質問、回答、候補ページ、画像の対応と因果関係を維持する。生成し直すだけで既存データを上書きしない。
- Sheetで直接修正されたデータを巻き戻さない。再生成前に対象ATAをSheet exportから同期・検証する。
- SG／標準問題集PDF、補助教材のWord、CSV、認証情報、ローカル設定はGitHubやPagesに公開しない。
- 回答は本回答として表示する。DRAFT ANSWERや回答変更用Promptを再導入しない。
- 略語はATAをまたいで参照できるが、異なる定義を曖昧なまま自動リンクしない。
- 口頭の問題・条件の正本は`標準問題集\737-800 評価シート (REV-3).pdf`。「照査項目」を大問、その中の番号付き項目を小問として扱い、補足・条件を勝手に別問へ分割しない。回答は`標準問題集\口頭MM`および別保管の`標準問題集\追加MM,EPM資料`のAMM/EPM等と`Study_Guide`のSGで裏取りする。資料フォルダを混ぜない。2026-10-06のユーザー指示により、一次資料から取れない部分は`口頭MM\過去資料`を暫定根拠として採用できるが、PAST判定・partial・「裏付け中」を必須とする。一次資料の矛盾、類似手順・機種適用・改訂差を混同せず、不足は明記する。`data\oral\`の原文索引・抽出全文・レビュー引用はローカル専用で公開しない。
- 口頭の運用正本はStudy737_DBの`oral_sections`、`oral_questions`、`oral_answers`、`oral_sources`。既存筆記タブへ混ぜない。初回登録後、古いローカル生成物で全行を再上書きせず、最新Sheet取得・バックアップ・差分確認の上で対象ID／セルだけ変更する。

## Git・公開の移行状態（2026-10-04）

- このルートに独立した`.git`がある。GitHubは`nikoneco/Study_Finder`、公開PWAは`https://nikoneco.github.io/Study_Finder/`。
- Git操作はこのルートで行う。従来の履歴は趣味HUBに保持し、新リポジトリは移行時スナップショットから開始する。
- 旧`D:\アプリ開発\趣味HUB\737_Study_Finder`と旧`scripts`の移行用ジャンクションは公開確認後に除去済み。コード・教材・データの実体はこのルートに保持する。
- スクリプトはこのリポジトリの`scripts/`で追跡する。
- Pages生成定義・生成先はこのルートの`tools\build-pages.js`・`docs\`。生成物を恒久修正先にしない。
- Pagesは`main`の`/docs`から公開。push前に再ビルド・`tools\check-project.js`を実行する。Actionsでも生成物との一致を検証する。
- manifest/SWのscopeは`/Study_Finder/`。キャッシュ削除はアプリ固有prefixに限定し、趣味HUB等のキャッシュを消さない。
- GAS公開、Sheet更新、GitHubへのpush、Pages公開は別工程。今回の分離ではGoogle側を変更しない。
- 趣味HUBの旧入口は新PWAをiframeで表示する中継ページ。GAS直表示版用の旧画像URLはHUB側で維持する。
- このプロジェクトは趣味HUB本体やLifeBoardを担当しない。親リポジトリの無関係な変更を保持する。
- Pagesトップは試験選択、`#written`は既存筆記、`#oral`は口頭学習。同じDOMの表示切替で筆記状態を保持する。GAS直表示版のトップは変更していない。口頭の匿名公開APIは選択分野bundleと互換用の大問一覧／選択大問bundleの読み取りだけに限定する。
- 口頭初期は「分野選択」でAPIなしの待機。「すべての分野」は設けず、REV-3の9分野名だけをローカルのナビゲーションとして保持する。選択後に`apiGetOralGroupBundle`でその分野の全大問・小問・回答・根拠を同一Sheet snapshotから取得する。全bundleを検証してからページ内メモリへ登録し、分野内の大問切替は追加通信なし。互換用`apiGetOralStart`は保持する。遅いJSONPには3秒後にread-only HtmlService frameを1本だけ併走させる。固定origin／nonce／API／iframe ancestry照合と後着応答・資源のcleanupを維持する。永続回答cacheで直接Sheet修正を隠さない。

## ローカル検証

```powershell
# 新ルートで実行
node scripts\validate_study_data.js
python scripts\validate_question_extractor.py "標準問題集\737-800標準問題集(2012.03.13).pdf" --data-dir data

node tools\build-pages.js
node tools\check-project.js
python -X utf8 scripts\prepare_oral_assessment.py
python -X utf8 scripts\test_oral_assessment.py
```

GAS操作の作業ディレクトリはこのルート、`rootDir`は`gas`。親の趣味HUB用`.clasp.json`と混同しない。
